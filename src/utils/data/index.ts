import { Chapitre, bloc } from "./beans"

export const modules = [
    {
        idModule: 1,
        titre: "BUSSINESS PLAN",
        description: [
            {
                titre: 'Développez votre vision',
                texte: "Le business plan est bien plus qu’un simple document. C’est la vision concrète de votre entreprise. Apprenez à élaborer un plan solide qui guidera vos actions et vous mènera vers le succès."
            },
            {
                titre: 'Stratégie et Objectifs',
                texte: "Découvrez comment définir des objectifs clairs et les stratégies pour les atteindre. Le business plan est votre carte au trésor vers la rentabilité."
            }

        ],
        nombreChapitre: 4,
        dateAccess: "2024-03-10",
        isOk: true
    },
    {
        idModule: 2,
        titre: "AUTORENTABILITE & FONCTIONNEMENT INTERNE",
        description: [
            {
                titre: 'Les Rouages Financiers',
                texte: "Plongez dans les chiffres, les marges et les flux de trésorerie. Comprenez comment rendre votre entreprise rentable et durable."
            },
            {
                titre: 'Processus Optimisés',
                texte: " Explorez les meilleures pratiques opérationnelles. De la logistique à la gestion des stocks, découvrez comment optimiser chaque aspect de votre entreprise."
            }

        ],
        nombreChapitre: 3,
        dateAccess: "2024-03-20",
        isOk: true
    },
    {
        idModule: 3,
        titre: "MARKETING",
        description: [
            {
                titre: 'Rayonnez sur le Marché',
                texte: "Le marketing est l’art de se faire remarquer. Explorez les tactiques modernes pour promouvoir vos produits et services. Devenez un maître du marketing digital et attirez vos clients idéaux."
            },
            {
                titre: 'Storytelling Impactant',
                texte: "Apprenez à raconter votre histoire de manière captivante. Le marketing, c’est aussi l’art de toucher les cœurs et de créer des connexions durables."
            }

        ],
        nombreChapitre: 5,
        dateAccess: "2024-03-20",
        isOk: false
    },
    {
        idModule: 4,
        titre: "MANAGEMENT",
        description: [
            {
                titre: 'Leadership Éclairé',
                texte: "Le management, c’est bien plus que des chiffres et des rapports. C’est l’art de guider une équipe vers l’excellence. Découvrez les compétences essentielles pour être un leader inspirant"
            },
            {
                titre: 'Gestion du Temps et des Ressources',
                texte: "Apprenez à optimiser votre temps et à allouer vos ressources efficacement. Le management, c’est la clé pour une entreprise bien huilée."
            }

        ],
        nombreChapitre: 2,
        dateAccess: "2024-03-27",
        isOk: false
    },
]



export const chapitrec = {
    idChapitre: 2,
    titre: 'Titre chapitre',
    urlVideo: '',
    urlImage: '',
    urlPdf: '',
    texte: "",
    preanbule: '',
    objectif: ['objectif_1', 'objectif_2', 'objectif_3'],
    conclusion: '',

    blocs: [
        {
            titre: '',
            texte: '',
            urlVideo: null,
            urlImage: null,
            listePoint: [],
            sousBlocs: [
                {
                    titre: '',
                    texte: '',
                    urlVideo: null,
                    urlImage: null,
                    listePoint: [],
                }
            ],
        },
    ]
}





const bloc1: bloc = {
    titre: "Le marketing digital", // Replace with your desired title
    texte: "Le marketing digital est l'ensemble des techniques marketing mises en œuvre sur internet et les appareils mobiles. Il vise à atteindre des objectifs de notoriété, de trafic.", // Replace with your desired text content
    listPoint: [
        "Amélioration de la visibilité en ligne",
        "Augmentation du trafic web",
        "Génération de leads qualifiés",
        "Développement des ventes en ligne",
        "Fidélisation de la clientèle",
    ],
    urlVideo: "https://www.youtube.com/watch?v=exemple_video_marketing", // Replace with a relevant video URL (optional)
    urlImage: "https://via.placeholder.com/300x200", // Replace with a relevant image URL (optional)
    preanbule: "Avant de se lancer dans le marketing digital, il est important de définir une stratégie claire et d'identifier ses objectifs.", // Replace with your desired introductory text (optional)
    conclusion: "Le marketing digital est un domaine en constante évolution. Il est important de se tenir informé des dernières tendances et d'adapter sa stratégie en conséquence.", // Replace with your desired concluding text (optional)
    sousBlocs: [
        {
            titre: "Les leviers du marketing digital", // Replace with your desired title
            texte: "Il existe de nombreux leviers marketing digitaux, tels que le référencement naturel (SEO), le référencement payant (SEA), le marketing de contenu, les réseaux sociaux, l'email marketing, etc.", // Replace with your desired text content
            listPoint: [], // You can add bullet points here if needed
            urlVideo: "", // You can add a video URL here if needed (optional)
            urlImage: "", // You can add an image URL here if needed (optional)
            preanbule: "", // You can add introductory text here if needed (optional)
            conclusion: "", // You can add concluding text here if needed (optional)

        },
        {
            titre: "Le référencement naturel (SEO)",
            texte: `Le référencement naturel, également appelé SEO (Search Engine Optimization), consiste à optimiser un site web pour qu'il apparaisse en bonne position.`,
            listPoint: [
                "Optimisation du contenu textuel avec des mots clés pertinents",
                "Optimisation technique du site web (vitesse de chargement, code propre)",
                "Acquisition de backlinks de qualité",
            ],
            urlVideo: "https://www.youtube.com/watch?v=exemple_video_seo",
            urlImage: "https://via.placeholder.com/300x200",
            preanbule: `Le SEO est un processus à long terme qui nécessite une stratégie et des efforts continus.`,
            conclusion: `En investissant dans le SEO, vous pouvez améliorer la visibilité de votre site web de manière durable et rentable.`,
        },
        {
            titre: "Le marketing de contenu",
            texte: `Le marketing de contenu consiste à créer et diffuser du contenu de valeur (articles de blog, vidéos, infographies, etc.) pour attirer et fidéliser un public.`,
            listPoint: [
                "Identification des sujets qui intéressent votre audience",
                "Création de contenu de qualité et régulier",
                "Diffusion du contenu sur différents canaux (réseaux sociaux, email marketing, etc.)",
            ],
            urlVideo: "https://www.youtube.com/watch?v=exemple_video_marketing_contenu",
            urlImage: "https://via.placeholder.com/300x200",
            preanbule: `Le marketing de contenu permet d'établir une relation de confiance avec votre audience.`,
            conclusion: `En proposant du contenu de valeur, vous pouvez vous positionner en tant qu'expert dans votre domaine et générer des leads qualifiés.`,
        },
    ],
};


const bloc2: bloc = {
    titre: "5 astuces pour booster votre présence sur les réseaux sociaux",
    texte: `
    Vous souhaitez développer votre visibilité et engager votre audience sur les réseaux sociaux ? Découvrez 5 astuces clés pour booster votre présence :

    1. **Définissez vos objectifs**: Commencez par identifier vos objectifs précis (notoriété, engagement, trafic, etc.). Cela vous permettra de choisir les plateformes les plus adaptées et de créer une stratégie cohérente.
    2. **Ciblez votre audience**: Identifiez votre public cible et adaptez votre contenu à ses besoins et ses intérêts. Utilisez des personas pour mieux comprendre les attentes de votre audience.
    3. **Créez du contenu engageant**: Publiez du contenu de qualité, varié et attractif (images, vidéos, articles, stories) qui suscite l'intérêt et incite à l'interaction.
     `,
    listPoint: [
        "Définissez vos objectifs",
        "Ciblez votre audience",
        "Créez du contenu engageant",
        "Interagissez avec votre communauté",
        "Analysez vos performances",
    ],
    urlVideo: "https://youtu.be/KJPL9HsAhBU", // Replace with relevant video URL (optional)
    urlImage: "[https://via.placeholder.com/300x200](https://via.placeholder.com/300x200)", // Replace with relevant image URL (optional)
    preanbule: "Les réseaux sociaux sont un outil puissant pour développer votre activité et atteindre vos objectifs marketing.",
    conclusion: `
    En appliquant ces astuces et en adaptant votre stratégie à votre secteur d'activité, vous pouvez booster votre présence sur les réseaux sociaux et accroître votre impact auprès de votre audience.
  `,
    sousBlocs: [
        {
            titre: "Le choix des plateformes",
            texte: "Identifiez les réseaux sociaux les plus pertinents pour votre audience et vos objectifs.Identifiez les réseaux sociaux les plus pertinents pour votre audience et vos objectifs.",
            listPoint: [],
            urlVideo: "",
            urlImage: "",
            preanbule: "",
            conclusion: "",
        },
        {
            titre: "Le calendrier éditorial",
            texte: "Planifiez vos publications à l'avance pour garantir une présence régulière et cohérente.Identifiez les réseaux sociaux les plus pertinents pour votre audience et vos objectifs.",
            listPoint: [],
            urlVideo: "",
            urlImage: "",
            preanbule: "",
            conclusion: "",
        },
    ],
};

export const choixQcm1 = [
    {
        libelle: 'Quel style de leadership est le plus efficace pour une équipe autonome et expérimentée ?',
        choix: [
            {
                id: 1,
                texte: 'Leadership directif: Le leader donne des instructions précises et supervise étroitement le travail.',
                isTrue: false,
            },
            {
                id: 2,
                texte: 'Leadership participatif: Le leader consulte l\'équipe et prend des décisions en collaboration.',
                isTrue: true,
            },
            {
                id: 3,
                texte: 'Leadership délégatif: Le leader donne à l\'équipe une grande liberté et une grande responsabilité',
                isTrue: false,
            },
            {
                id: 4,
                texte: 'Leadership situationnel: Le leader adapte son style en fonction de la situation et des besoins de l\'équipe.',
                isTrue: false,
            }
        ],
        valeursJustes: [2],
    },

    {
        libelle: 'Laquelle des affirmations suivantes est la plus susceptible de démotiver un employé ?',
        choix: [
            {
                id: 1,
                texte: 'Manque de reconnaissance: Le travail de l\'employé n\'est jamais reconnu ou valorisé.',
                isTrue: false,
            },
            {
                id: 2,
                texte: 'Absence de perspectives d\'évolution: L\'employé n\'a aucune possibilité de progresser dans sa carrière.',
                isTrue: false,
            },
            {
                id: 3,
                texte: 'Mauvaises relations avec les collègues: L\'employé a des conflits ou des tensions avec ses collègues.',
                isTrue: true,
            }
        ],
        valeursJustes: [3],
    },
    {
        libelle: 'Laquelle des techniques suivantes est la plus efficace pour améliorer la communication dans une équipe ?',
        choix: [
            {
                id: 1,
                texte: 'Organiser des réunions régulières: Permettre aux membres de l\'équipe de partager des informations et de discuter des problèmes.',
                isTrue: true,
            },
            {
                id: 2,
                texte: 'Utiliser un canal de communication unique: Centraliser les communications pour éviter la confusion et les informations dispersées.',
                isTrue: true,
            },
            {
                id: 3,
                texte: 'Encourager le feedback constructif: Favoriser une communication ouverte et honnête entre les membres de l\'équipe.',
                isTrue: false,
            }
        ],
        valeursJustes: [1, 2],
    },
]




export const chapitre: Chapitre = {
    idChapitre: 2,
    titre: "Maîtriser les réseaux sociaux pour booster votre marketing digital",
    urlVideo: "https://www.youtube.com/watch?v=TvgfzI7rFYU",
    urlImage: "",
    urlPdf: "",
    texte: `Dans le chapitre précédent, nous avons exploré les fondamentaux du marketing digital. Dans ce chapitre, nous allons nous concentrer sur un levier essentiel : les réseaux sociaux.`,
    preanbule: "",
    objectifs: [
        "Définir une stratégie social media cohérente avec vos objectifs marketing",
        "Créer du contenu engageant pour votre audience",
        "Développer votre communauté et interagir avec vos followers",
        "Analyser vos performances et optimiser votre présence",
    ],
    conclusion: `En maîtrisant les réseaux sociaux et en appliquant les conseils de ce chapitre, vous pouvez booster votre marketing digital et atteindre vos objectifs commerciaux.`,
    blocs: [bloc1, bloc2],
    qcms: choixQcm1,
};



