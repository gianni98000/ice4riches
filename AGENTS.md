# ICE4riches — règles pour les agents

## Objectif

Faire connaître ICE4riches et générer des demandes qualifiées pour la livraison de clear ice à Monaco, Cannes, Saint-Tropez, Nice et Antibes, sans jamais inventer de disponibilité, de prix, de délai, d'adresse d'accueil ou de référence client.

## Réseau social officiel

- Instagram : `@ice4riches`
- Site : `https://ice4riches.com`
- Contact : `hello@ice4riches.com`
- WhatsApp : `https://wa.me/377640622956`

## Ligne éditoriale

- Écrire principalement en français, avec un ton premium, précis et sobre.
- Mettre en avant la clarté, la lenteur de dilution, le service professionnel et les usages cocktails, hôtellerie, restauration et événements.
- Employer naturellement les zones stratégiques : Monaco, Cannes, Saint-Tropez, Nice et Antibes.
- Ne pas surcharger les textes de mots-clés ou de hashtags.
- Ne jamais publier de données personnelles, de secrets, de jetons, de captures d'écran internes ou d'informations logistiques non publiques.
- Ne jamais présenter une entreprise comme cliente sans preuve et autorisation.

## Workflow Instagram obligatoire

1. Préparer un manifeste JSON dans `social/queue/` à partir du modèle fourni.
2. Utiliser uniquement une URL HTTPS publique et stable pour le média. Meta doit pouvoir télécharger le fichier sans authentification.
3. Exécuter d'abord `npm run instagram:check -- --manifest <fichier>`.
4. Relire le visuel, la légende, la zone ciblée, l'orthographe, les droits du média et le lien d'appel à l'action.
5. Obtenir une validation humaine explicite du contenu exact avant toute publication.
6. Publier uniquement avec `npm run instagram:publish -- --manifest <fichier> --confirm ice4riches` ou avec le workflow GitHub Actions manuel.
7. Reporter l'identifiant Instagram retourné par l'API et déplacer ensuite le manifeste vers `social/published/` dans un commit séparé.

## Sécurité Meta

- Ne jamais inscrire `META_ACCESS_TOKEN`, `META_IG_USER_ID`, App Secret ou tout autre secret dans Git, un manifeste, un log ou une réponse publique.
- Conserver les secrets uniquement dans un gestionnaire de secrets ou dans GitHub Actions.
- Utiliser les autorisations minimales : `instagram_business_basic` et `instagram_business_content_publish` avec Instagram Login.
- Le mode `--publish` et la confirmation exacte `ice4riches` sont obligatoires. Aucun agent ne doit contourner ces garde-fous.
- Toute création ou rotation de jeton et toute première publication doivent être validées par le propriétaire du compte.

## SEO social

- Faire pointer les légendes vers la page locale la plus pertinente quand cela apporte une vraie information.
- Alterner les sujets : produit, geste de bar, service B2B, événement, coulisses, zone de livraison et cas d'usage.
- Préférer 3 à 8 hashtags réellement pertinents. Exemples : `#ClearIce`, `#CocktailIce`, `#Monaco`, `#Cannes`, `#SaintTropez`.
- Ne pas promettre la première place Google ni des résultats garantis.

