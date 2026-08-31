import { SeoLandingPage } from "@/components/seo-landing-page";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  path: "/glacons-pour-cocktails",
  title: "Glaçons transparents pour cocktails",
  description:
    "Quel glaçon transparent choisir pour un cocktail ? Comparez cube, Old Fashioned, Collins et sphère selon le verre, la recette et le service.",
  socialTitle: "Glaçons transparents pour cocktails : guide des formats",
  socialDescription:
    "Le guide Ice4Riches pour associer chaque cocktail à un format de glace cristalline.",
});

const faq = [
  {
    question: "Quel glaçon utiliser pour un Old Fashioned ?",
    answer:
      "Un grand cube ou un format Old Fashioned convient bien à un verre bas. Il occupe le verre sans multiplier les petites surfaces de contact et accompagne une dégustation progressive.",
  },
  {
    question: "Quel format choisir pour un highball ou un Collins ?",
    answer:
      "Un glaçon Collins, long et rectangulaire, est conçu pour les verres hauts. Sa forme suit le verre et laisse de la place à la boisson et à la garniture.",
  },
  {
    question: "Une sphère fond-elle forcément moins vite qu’un cube ?",
    answer:
      "À volume comparable, la sphère présente une surface extérieure réduite. En pratique, la vitesse de dilution dépend aussi de la masse de glace, de sa température, de celle de la boisson et du verre.",
  },
  {
    question: "La transparence suffit-elle à ralentir la dilution ?",
    answer:
      "Non. La transparence améliore d’abord l’apparence. Pour la dilution, la taille et la forme du glaçon comptent davantage : un grand format expose proportionnellement moins de surface que plusieurs petits glaçons.",
  },
  {
    question: "Comment choisir la bonne taille de glaçon ?",
    answer:
      "Mesurez l’ouverture et la hauteur utile du verre, puis tenez compte du volume du cocktail. Le glaçon doit entrer facilement, laisser circuler la boisson et permettre un service confortable.",
  },
];

export default function GlaconsPourCocktailsPage() {
  return (
    <SeoLandingPage
      path="/glacons-pour-cocktails"
      serviceName="Glaçons transparents pour cocktails"
      eyebrow="Guide cocktails"
      title="Quel glaçon transparent choisir pour chaque cocktail ?"
      intro="Le bon format équilibre le verre, la température, la dilution et la mise en scène du cocktail. Voici comment choisir entre Collins, Old Fashioned, grand cube et sphère."
      highlights={[
        { value: "Collins", label: "Pour highballs et verres hauts" },
        { value: "Grand cube", label: "Pour cocktails courts et spiritueux" },
        { value: "Sphère", label: "Pour un service visuel dans un verre bas" },
      ]}
      sections={[
        {
          title: "Le Collins pour les cocktails allongés",
          paragraphs: [
            "Avec ses dimensions de 4 × 4 × 12 cm, le glaçon Collins suit la hauteur d’un verre highball. Il structure visuellement les cocktails allongés, les long drinks et les recettes complétées avec du soda, du tonic ou une autre boisson pétillante.",
            "Avant de le choisir, vérifiez la largeur intérieure du verre. Le format doit pouvoir être placé et retiré sans forcer, tout en laissant assez d’espace pour verser le cocktail.",
          ],
        },
        {
          title: "Old Fashioned et Deluxe Cube pour les verres bas",
          paragraphs: [
            "Les formats Old Fashioned 5 × 5 × 7 cm et Deluxe Cube 5 × 5 × 5 cm sont adaptés aux verres rocks. Ils conviennent aux cocktails courts et aux spiritueux servis sur glace, lorsque l’on souhaite une pièce centrale plutôt qu’une accumulation de petits glaçons.",
            "Le cube offre un équilibre géométrique classique. Le format Old Fashioned, plus haut, crée davantage de présence dans les verres qui disposent d’un volume utile suffisant.",
          ],
          bullets: [
            "Old Fashioned, Negroni ou Boulevardier",
            "Whisky, rhum ou autre spiritueux sur glace",
            "Cocktails courts servis dans un verre rocks",
            "Présentation nette avec une seule grande pièce",
          ],
        },
        {
          title: "La sphère pour une présence sculpturale",
          paragraphs: [
            "La sphère Ice4Riches de 5,5 cm crée un point focal dans le verre. Sa forme convient aux dégustations où la simplicité du service et l’esthétique de la glace participent pleinement à l’expérience.",
            "Comme pour le cube, le diamètre du verre reste déterminant. Il faut également préserver suffisamment de volume pour la boisson et éviter un verre rempli au-delà de sa capacité confortable.",
          ],
        },
        {
          title: "Taille, température et dilution : les vrais critères",
          paragraphs: [
            "La glace refroidit une boisson en fondant : refroidissement et dilution sont liés. Un grand glaçon peut diluer plus progressivement que plusieurs petits morceaux de masse comparable, car sa surface totale exposée est proportionnellement plus faible.",
            "La transparence ne remplace donc pas le choix du format. Pour un résultat régulier, associez la bonne forme au verre, conservez la glace à température stable et préparez le service au plus près de la dégustation.",
          ],
        },
      ]}
      faq={faq}
      relatedLinks={[
        {
          href: "/glace-cristalline-paris",
          title: "Glace cristalline à Paris",
          description:
            "Découvrez l’offre locale Ice4Riches et le fonctionnement de la commande.",
        },
        {
          href: "/professionnels-evenements",
          title: "Glaçons premium pour les professionnels",
          description:
            "Organisez vos formats et quantités pour un établissement ou une réception.",
        },
      ]}
    />
  );
}
