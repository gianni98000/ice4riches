# Publication Instagram via l’API Meta

Cette intégration publie sur `@ice4riches` via l’API Instagram officielle. Elle fonctionne pour une image dans le fil, une story image ou vidéo et un reel vidéo.

## Configuration Meta

1. Créer une app Meta de type Instagram et ajouter « API Instagram ».
2. Relier le compte professionnel `@ice4riches` avec Business Login for Instagram.
3. Autoriser uniquement `instagram_business_basic` et `instagram_business_content_publish`.
4. Générer un token d’accès utilisateur Instagram et relever l’identifiant du compte professionnel.
5. Enregistrer les valeurs dans les secrets GitHub Actions : `META_ACCESS_TOKEN` et `META_IG_USER_ID`.
6. Créer l’environnement GitHub `instagram-production` et, si disponible, activer un approbateur obligatoire.

Ne placez jamais ces valeurs dans un fichier du dépôt.

## Préparer un contenu

Copiez `social/queue/example-post.json` et choisissez un type :

- `post` : `image_url` et `caption`
- `story` : `image_url` ou `video_url`; aucune légende n’est envoyée
- `reel` : `video_url` et `caption`

L’URL du média doit être publique, en HTTPS, stable et téléchargeable par les serveurs Meta. Pour une image, utilisez un JPEG conforme aux limites Meta.

## Valider localement

```bash
npm run instagram:check -- --manifest social/queue/mon-contenu.json
```

## Publier localement

Après validation humaine explicite :

```bash
META_ACCESS_TOKEN="..." \
META_IG_USER_ID="..." \
npm run instagram:publish -- \
  --manifest social/queue/mon-contenu.json \
  --confirm ice4riches
```

## Publier avec GitHub Actions

Ouvrez l’action « Publier sur Instagram », lancez manuellement le workflow, indiquez le chemin du manifeste et saisissez exactement `ice4riches` dans le champ de confirmation.

L’API crée d’abord un conteneur, attend son statut `FINISHED`, puis appelle `media_publish`. La version par défaut est `v26.0`; elle peut être remplacée avec `META_API_VERSION` lors d’une future migration.

