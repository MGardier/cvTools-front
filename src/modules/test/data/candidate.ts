import type { TCandidate } from "../types";

export const CANDIDATE: TCandidate = {
  firstName: "Marie",
  lastName: "Dupont",
  title: "Développeuse Full-Stack Senior",
  tagline:
    "Je conçois des applications web performantes et des interfaces qui ont du sens.",
  location: "Paris, France",
  email: "marie@example.com",
  phone: "+33 6 12 34 56 78",
  linkedin: "linkedin.com/in/mariedupont",
  github: "github.com/mariedupont",
  story: [
    "Il était une fois un hobbit qui s'ennuyait en cours jusqu'au jour où un magicien lui révéla l'art des applications web. Ce fut la révélation : l'étincelle de la passion s'alluma, suivie par celle de la curiosité qui, tel un dragon réveillé par l'odeur de l'or, commença à faire son chemin.",
    "Deux années d'exploration au BTS SIO lui firent découvrir ses premières armes : les langages du web et un aperçu des frameworks. Assez pour confirmer que cette voie était la sienne.",
    "Vint alors le temps de la forge. Deux ans d'alternance : d'abord chez HerdiaLab, à reconstruire seul une application RH depuis les cendres d'un Symfony 2, puis chez Debshop, à reprendre un site e-commerce laissé inachevé par un prestataire et le rendre vivant. Deux royaumes très différents, mais une même leçon : le code n'a de valeur que s'il répond au besoin de ceux qui l'utilisent.",
    "Après une pause d'un an, le hobbit revint avec une curiosité nouvelle. L'écosystème Node.js l'attirait — sa philosophie, sa liberté, ses possibilités. Il forgea de nouvelles compétences sur React et TypeScript, puis une opportunité se présenta : sa première vraie équipe de développeurs chez l'Incubateur Tech Alt,. La découverte du travail collectif, des architectures modernes, et la confirmation que ce métier est une aventure sans fin.",
    "Puis un passage chez Bloom Alternance, à plonger dans la complexité des contrats officiels d'alternance, une quête courte mais riche en enseignements, notamment sur l'importance de communiquer aussi bien avec son équipe qu'avec son code.",
    "Aujourd'hui, ce qui anime ce hobbit chaque matin c'est : la soif d'apprendre de nouveaux sujets, concevoir et créer des applications, faire des choix techniques, mais aussi voir concrètement le résultat de son travail simplifier le quotidien de ceux qui l'utilisent. Chaque projet reste une quête et chaque bug un mystère à résoudre.",
    "L'aventure continue. Ce hobbit-développeur cherche aujourd'hui une équipe de développeurs avec qui forger des applications. Peut-être croiserez-vous bientôt sa route.",
  ].join("\n\n"),
  techSkills: [
    "React",
    "TypeScript",
    "Node.js",
    "Next.js",
    "PostgreSQL",
    "Tailwind CSS",
    "Docker",
    "AWS",
  ],
  experiences: [
    { company: "Bloom", role: "Développeur Fullstack", period: "2025" },
    { company: "Alt", role: "Développeur Fullstack", period: "2024-2025" },
    { company: "Debshop", role: "Développeur Fullstack", period: "2022-2023" },
    { company: "Herdia", role: "Développeur Fullstack", period: "2022" },
  ],
  projects: [
    { name: "TaskFlow", tech: "React · Node · Socket.io" },
    { name: "DevMetrics", tech: "Next.js · D3.js · Supabase" },
  ],
  softSkills: ["Leadership", "Communication", "Problem-solving", "Mentorat"],
  education: [
    { degree: "Master Informatique", school: "Paris-Saclay", year: "2019" },
    { degree: "DUT Informatique", school: "IUT Orsay", year: "2017" },
  ],
  passions: ["Open source", "Design UI/UX", "Randonnée", "Photographie"],
};
