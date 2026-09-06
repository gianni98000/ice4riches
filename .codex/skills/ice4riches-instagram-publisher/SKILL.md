---
name: ice4riches-instagram-publisher
description: Préparer, contrôler et publier des posts, stories ou reels sur le compte Instagram professionnel @ice4riches avec l’intégration Meta du dépôt ICE4riches. Utiliser pour le contenu social ICE4riches, pas pour d’autres marques ou comptes.
---

# ICE4riches Instagram Publisher

Publier du contenu conforme à la marque sur `@ice4riches` en utilisant le script officiel du dépôt et ses garde-fous.

## Avant de préparer un contenu

- Lire le `AGENTS.md` à la racine du dépôt et respecter sa ligne éditoriale et ses règles de sécurité.
- Vérifier que le média appartient à ICE4riches ou que son utilisation est autorisée.
- Choisir une URL HTTPS publique et stable que Meta peut télécharger sans connexion.
- Ne jamais demander, afficher, copier ou enregistrer un jeton, une clé secrète ou un code d’authentification dans le chat ou dans Git.

## Préparation

Créer un manifeste dans `social/queue/` avec un nom descriptif :

```json
{
  "type": "post",
  "image_url": "https://ice4riches.com/social/exemple.jpg",
  "caption": "Légende validée"
}
```

Types pris en charge :

- `post` : une image JPEG et une légende ;
- `story` : une image ou une vidéo, sans légende API ;
- `reel` : une vidéo et une légende.

Rédiger principalement en français, avec un ton premium, précis et sobre. Employer Monaco, Cannes, Saint-Tropez, Nice ou Antibes seulement si la publication concerne réellement la zone. Garder les hashtags utiles et limités.

## Contrôle

Exécuter :

```bash
npm run instagram:check -- --manifest social/queue/<fichier>.json
```

Présenter ensuite à l’utilisateur le média, la légende exacte, le format et la zone ciblée. Obtenir sa validation explicite avant de publier. Une demande générale de stratégie ou de préparation n’autorise pas l’envoi.

## Publication

Après validation du contenu exact, utiliser l’une de ces voies :

```bash
npm run instagram:publish -- \
  --manifest social/queue/<fichier>.json \
  --confirm ice4riches
```

ou déclencher manuellement le workflow GitHub Actions « Publier sur Instagram » avec la même confirmation.

Le script doit conserver ses contrôles : secrets présents, confirmation exacte et correspondance du compte API avec `@ice4riches`. Ne jamais les contourner. Ne déclarer la publication réussie que si l’API renvoie un identifiant Instagram.

## Après publication

- Communiquer l’identifiant retourné et le type de contenu publié.
- Déplacer le manifeste dans `social/published/` par un commit séparé, en ajoutant la date et l’identifiant si le projet adopte ce suivi.
- En cas d’erreur Meta, transmettre le message utile sans exposer les secrets et ne pas relancer en boucle.

