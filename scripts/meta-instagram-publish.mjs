#!/usr/bin/env node

import { readFile } from "node:fs/promises";

const DEFAULT_API_VERSION = "v26.0";
const VALID_TYPES = new Set(["post", "story", "reel"]);
const args = process.argv.slice(2);

function getArg(name) {
  const index = args.indexOf(name);
  return index === -1 ? undefined : args[index + 1];
}

function fail(message) {
  console.error(`Erreur: ${message}`);
  process.exit(1);
}

function assertPublicHttpsUrl(value, field) {
  let url;
  try {
    url = new URL(value);
  } catch {
    fail(`${field} doit être une URL valide.`);
  }
  if (url.protocol !== "https:") fail(`${field} doit utiliser HTTPS.`);
  if (["localhost", "127.0.0.1", "::1"].includes(url.hostname)) {
    fail(`${field} doit être accessible publiquement par Meta.`);
  }
}

function validateManifest(manifest) {
  if (!manifest || typeof manifest !== "object") fail("le manifeste JSON est invalide.");
  if (!VALID_TYPES.has(manifest.type)) fail('type doit être "post", "story" ou "reel".');

  const hasImage = typeof manifest.image_url === "string" && manifest.image_url.length > 0;
  const hasVideo = typeof manifest.video_url === "string" && manifest.video_url.length > 0;
  if (hasImage === hasVideo) fail("indiquez exactement un champ image_url ou video_url.");
  if (manifest.type === "post" && !hasImage) fail("une publication post doit utiliser image_url.");
  if (manifest.type === "reel" && !hasVideo) fail("un reel doit utiliser video_url.");
  if (manifest.type !== "story" && typeof manifest.caption !== "string") {
    fail("une légende caption est obligatoire pour une publication ou un reel.");
  }
  if (typeof manifest.caption === "string" && manifest.caption.length > 2200) {
    fail("la légende dépasse 2 200 caractères.");
  }

  if (hasImage) assertPublicHttpsUrl(manifest.image_url, "image_url");
  if (hasVideo) assertPublicHttpsUrl(manifest.video_url, "video_url");
}

async function graphRequest(path, { method = "GET", body, token, host, version }) {
  const response = await fetch(`${host}/${version}/${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(body ? { "Content-Type": "application/json" } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok || payload.error) {
    const detail = payload?.error?.message || `${response.status} ${response.statusText}`;
    throw new Error(`Meta API: ${detail}`);
  }
  return payload;
}

async function waitUntilReady(containerId, config) {
  for (let attempt = 1; attempt <= 30; attempt += 1) {
    const status = await graphRequest(`${containerId}?fields=status_code`, config);
    if (status.status_code === "FINISHED") return;
    if (["ERROR", "EXPIRED"].includes(status.status_code)) {
      throw new Error(`Le conteneur Meta est en état ${status.status_code}.`);
    }
    await new Promise((resolve) => setTimeout(resolve, 5000));
  }
  throw new Error("Délai dépassé pendant la préparation du média par Meta.");
}

const manifestPath = getArg("--manifest");
if (!manifestPath) fail("utilisez --manifest <fichier.json>.");

let manifest;
try {
  manifest = JSON.parse(await readFile(manifestPath, "utf8"));
} catch (error) {
  fail(`impossible de lire ${manifestPath}: ${error.message}`);
}

validateManifest(manifest);

if (!args.includes("--publish")) {
  console.log(`Validation réussie: ${manifest.type} prêt pour @ice4riches.`);
  process.exit(0);
}

if (getArg("--confirm") !== "ice4riches") {
  fail("publication bloquée: ajoutez --confirm ice4riches après validation humaine.");
}

const token = process.env.META_ACCESS_TOKEN;
const igUserId = process.env.META_IG_USER_ID;
if (!token || !igUserId) fail("META_ACCESS_TOKEN et META_IG_USER_ID sont obligatoires.");

const config = {
  token,
  host: process.env.META_GRAPH_HOST || "https://graph.instagram.com",
  version: process.env.META_API_VERSION || DEFAULT_API_VERSION,
};
const container = {
  ...(manifest.image_url ? { image_url: manifest.image_url } : {}),
  ...(manifest.video_url ? { video_url: manifest.video_url } : {}),
  ...(manifest.type !== "story" ? { caption: manifest.caption } : {}),
  ...(manifest.type === "story" ? { media_type: "STORIES" } : {}),
  ...(manifest.type === "reel" ? { media_type: "REELS" } : {}),
};

try {
  const account = await graphRequest(`${igUserId}?fields=id,username`, config);
  if (account.username?.toLowerCase() !== "ice4riches") {
    throw new Error(
      `Compte refusé: le jeton cible @${account.username || "inconnu"}, pas @ice4riches.`,
    );
  }
  const created = await graphRequest(`${igUserId}/media`, {
    ...config,
    method: "POST",
    body: container,
  });
  await waitUntilReady(created.id, config);
  const published = await graphRequest(`${igUserId}/media_publish`, {
    ...config,
    method: "POST",
    body: { creation_id: created.id },
  });
  console.log(`Publication réussie pour @ice4riches. ID Instagram: ${published.id}`);
} catch (error) {
  fail(error.message);
}
