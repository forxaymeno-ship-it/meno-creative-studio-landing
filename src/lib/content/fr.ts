import type { SiteContent } from './types';

export const fr: SiteContent = {
	meta: {
		title: 'MENO — Studio créatif IA pour marques et e-commerce',
		description:
			'Reels, publicités produit et campagnes cinématiques créés de bout en bout par IA, pour les marques et le e-commerce.',
		ogAlt: 'MENO — studio créatif IA'
	},

	nav: {
		links: [
			{ label: 'Réalisations', href: '#work' },
			{ label: 'Services', href: '#services' },
			{ label: 'Processus', href: '#process' },
			{ label: 'Studio', href: '#about' },
			{ label: 'FAQ', href: '#faq' }
		],
		cta: 'Devis',
		openMenu: 'Ouvrir le menu',
		closeMenu: 'Fermer le menu',
		language: 'Langue',
		skipToContent: 'Aller au contenu'
	},

	hero: {
		eyebrow: 'Studio créatif IA',
		headline: ['Conçues pour', 'être vues.'],
		kicker: 'Et pour faire vendre.',
		lead: 'MENO est un studio créatif IA. Nous produisons des reels, des publicités produit et des campagnes cinématiques pour les marques et le e-commerce — concept, direction, génération, son, montage final.',
		ctaPrimary: 'Demander un devis',
		ctaSecondary: 'Voir nos réalisations',
		specialities: ['Reels IA', 'Pubs produit', 'E-commerce', 'Campagnes cinématiques'],
		scroll: 'Défiler',
		reelLabel: 'Showreel'
	},

	work: {
		eyebrow: 'Sélection',
		title: ['Créé avec l’IA.', 'Dirigé par des humains.'],
		lead: 'Le vertical d’abord, parce que c’est là que se trouve l’attention. Chaque plan ci-dessous a été pensé, dirigé, généré et monté en interne.',
		filterAll: 'Tout',
		filterLabel: 'Filtrer par catégorie',
		swipe: 'Glissez pour voir plus →',
		categories: {
			'ai-product-film': 'Film produit IA',
			'cinematic-reel': 'Reel cinématique',
			'ecommerce-ad': 'Pub e-commerce',
			'ai-creator-ad': 'Pub créateur IA',
			'brand-film': 'Film de marque',
			'product-visual': 'Visuel produit'
		},
		note: 'Les visages, décors et voix des formats créateur IA sont entièrement synthétiques. Rien ici n’est présenté comme un vrai témoignage client.',
		cta: 'Lancer un projet'
	},

	brands: {
		title: 'Pour les marques qui soignent leur image',
		note: 'Les logos clients apparaîtront ici au fur et à mesure des partenariats.'
	},

	services: {
		eyebrow: 'Ce que nous créons',
		title: ['Six façons', 'd’être vu.'],
		lead: 'Choisissez-en une, ou laissez-nous construire tout le système créatif autour de votre produit.',
		items: [
			{
				index: '01',
				title: 'Reels IA & format court',
				body: 'Du vertical pensé pour Reels, TikTok et Shorts. L’accroche d’abord, tenue jusqu’à la dernière image, montée pour la plateforme où elle vit.',
				tags: ['9:16', 'Accroches', 'Sous-titres', 'Sound design']
			},
			{
				index: '02',
				title: 'Publicités produit e-commerce',
				body: 'De la publicité centrée produit qui rend l’objet désirable. Conçue pour le média payant, faite pour survivre à un fil qui défile vite.',
				tags: ['Social payant', 'Variantes', 'Produit']
			},
			{
				index: '03',
				title: 'Films de marque cinématiques',
				body: 'Une narration avec l’ambition visuelle d’une production traditionnelle — des décors, une échelle et une lumière qu’un budget de tournage n’autoriserait pas.',
				tags: ['16:9', 'Narration', 'Musique']
			},
			{
				index: '04',
				title: 'Publicités créateur IA',
				body: 'Le format créateur avec des visages et des décors générés par IA. Entièrement synthétique, clairement annoncé, jamais présenté comme une vraie personne qui recommande votre marque.',
				tags: ['Talents synthétiques', 'Transparent', 'Scripté']
			},
			{
				index: '05',
				title: 'Visuels produit IA',
				body: 'Images de campagne, mises en scène produit, lifestyle et concepts visuels. Un shooting complet sans réserver de studio.',
				tags: ['Photo', 'Campagne', 'Lifestyle']
			},
			{
				index: '06',
				title: 'Campagnes créatives',
				body: 'Concepts, scripts, accroches, direction visuelle et systèmes de variantes — la couche stratégique qui décide de ce qui mérite d’être produit.',
				tags: ['Stratégie', 'Scripts', 'Systèmes']
			}
		]
	},

	value: {
		eyebrow: 'Le modèle',
		title: ['L’ambition d’une', 'grosse production.', 'Sans la logistique.'],
		lead: 'Nous n’avons pas supprimé le savoir-faire. Nous avons supprimé la logistique qui séparait une idée du montage final.',
		oldLabel: 'Production traditionnelle',
		oldItems: [
			'Repérage des lieux',
			'Casting',
			'Équipe de tournage',
			'Location de matériel',
			'Déplacements',
			'Construction de décors',
			'Retournages',
			'Coordination de production'
		],
		newLabel: 'Le pipeline MENO',
		newItems: ['Concept', 'Direction', 'Génération', 'Montage', 'Livraison'],
		unlocks: [
			{
				title: 'Des décors qui n’existent pas',
				body: 'Un toit dans la brume, un désert à l’heure dorée, un plateau sous l’eau. Le repérage cesse d’être une ligne budgétaire.'
			},
			{
				title: 'Plus de concepts, pas moins',
				body: 'Quand une version coûte des heures au lieu d’un jour de tournage, on teste trois directions avant d’en choisir une.'
			},
			{
				title: 'De la cohérence à grande échelle',
				body: 'Le même produit, le même langage visuel, sur toute une campagne et dans tous les formats où elle tourne.'
			},
			{
				title: 'Une itération qui suit le rythme',
				body: 'Une accroche qui ne prend pas est remontée cette semaine — pas au prochain trimestre, quand le budget repart.'
			}
		],
		footnote: 'Ce n’est pas de la génération en un clic. C’est un pipeline de production qui tourne à l’IA.'
	},

	craft: {
		eyebrow: 'Notre métier',
		title: ['L’IA est le moteur.', 'La direction fait', 'la différence.'],
		lead: 'Tout le monde peut générer. Le travail consiste à savoir ce qu’il faut générer, ce qu’il faut jeter, et ce qui mérite sa place au montage final.',
		layers: [
			{ index: '01', label: 'Recherche', detail: 'Le marché, les concurrents, ce dont le fil est déjà fatigué.' },
			{ index: '02', label: 'Concept', detail: 'L’angle. Pourquoi cette idée et pas l’évidente.' },
			{ index: '03', label: 'Accroche', detail: 'Les 1,5 premières secondes, écrites et testées avant tout le reste.' },
			{ index: '04', label: 'Script', detail: 'Temps par temps, calé sur le format de diffusion.' },
			{ index: '05', label: 'Storyboard', detail: 'Chaque plan décidé avant la moindre image générée.' },
			{ index: '06', label: 'Direction visuelle', detail: 'Optique, lumière, palette, matière, références.' },
			{ index: '07', label: 'Génération', detail: 'Beaucoup de prises. La plupart écartées.' },
			{ index: '08', label: 'Voix', detail: 'On caste une voix, on ne prend pas la première venue.' },
			{ index: '09', label: 'Sound design', detail: 'Musique, bruitages, et le silence là où il travaille mieux.' },
			{ index: '10', label: 'Montage', detail: 'Rythme, points de coupe, la cadence que le fil récompense.' },
			{ index: '11', label: 'Étalonnage', detail: 'Colorimétrie et grain, pour qu’une campagne reste une campagne.' },
			{ index: '12', label: 'Livraison', detail: 'Tous les ratios, toutes les plateformes, sous-titres incrustés ou séparés.' }
		],
		note: 'Douze couches. La plupart n’ont rien à voir avec un prompt.',
		trackLabel: 'Ligne de production'
	},

	process: {
		eyebrow: 'Comment ça marche',
		title: ['Quatre étapes.', 'Zéro friction.'],
		steps: [
			{
				index: '01',
				title: 'Brief',
				body: 'Envoyez le produit, le site, vos références et l’objectif du contenu.'
			},
			{
				index: '02',
				title: 'Concept',
				body: 'Nous revenons avec l’angle, l’accroche, le script et la direction visuelle.'
			},
			{
				index: '03',
				title: 'Création',
				body: 'Nous générons, dirigeons, animons, montons, sonorisons et étalonnons le tout.'
			},
			{
				index: '04',
				title: 'Livraison',
				body: 'Des fichiers prêts à publier dans tous les ratios, avec les tours de révision prévus par votre formule.'
			}
		]
	},

	ecom: {
		eyebrow: 'Pensé pour le e-commerce',
		title: ['Un produit.', 'Neuf façons', 'de le vendre.'],
		lead: 'Un produit n’a pas besoin d’une publicité. Il a besoin d’un système créatif — assez d’angles pour alimenter un compte payant pendant un trimestre.',
		productLabel: 'Votre produit',
		formats: [
			{ name: 'Révélation produit', note: 'Le moment héros' },
			{ name: 'Reel lifestyle', note: 'En contexte, en usage' },
			{ name: 'Problème / Solution', note: 'Le format qui convertit' },
			{ name: 'Pub fonctionnalité', note: 'Un bénéfice, fort' },
			{ name: 'Film cinématique', note: 'Ambition de marque' },
			{ name: 'Format créateur', note: 'Talent synthétique, scripté' },
			{ name: 'Teaser de lancement', note: 'Court, qui retient' },
			{ name: 'Créa de retargeting', note: 'Pour ceux qui ont hésité' },
			{ name: 'Visuels produit', note: 'Des images pour tout le tunnel' }
		],
		footnote: 'Même produit. Même langage de marque. Assez de variation pour continuer à tester.',
		cta: 'Demander un devis'
	},

	engagement: {
		eyebrow: 'Collaboration',
		title: ['Trois façons', 'de travailler', 'ensemble.'],
		lead: 'Chaque projet est chiffré selon son périmètre. Dites-nous ce qu’il vous faut et nous le chiffrons correctement.',
		featuredBadge: 'Le plus choisi',
		tiers: [
			{
				id: 'start',
				name: 'Start',
				tagline: 'Pour tester la créa IA',
				body: 'Une campagne ou un reel unique, produit de bout en bout. La façon de voir comment nous travaillons avant d’aller plus loin.',
				points: [
					'Campagne ou reel ponctuel',
					'Concept et direction complets',
					'Livré dans tous les ratios utiles'
				],
				featured: false
			},
			{
				id: 'grow',
				name: 'Grow',
				tagline: 'Pour un flux régulier',
				body: 'Une production mensuelle constante, avec un langage visuel qui reste cohérent d’un mois à l’autre.',
				points: [
					'Flux de contenu mensuel',
					'Direction de campagne cohérente',
					'Plusieurs formats et ratios',
					'Créneaux de production prioritaires'
				],
				featured: true
			},
			{
				id: 'scale',
				name: 'Scale',
				tagline: 'Pour le e-commerce et les équipes',
				body: 'Plusieurs concepts, campagnes et jeux de variantes chaque mois — pensé pour les comptes payants qui ont besoin de volume sans perdre le goût.',
				points: [
					'Plusieurs concepts par mois',
					'Systèmes de variantes pour tester',
					'Écosystèmes de campagne complets',
					'Direction créative dédiée'
				],
				featured: false
			}
		],
		cta: 'Devis',
		note: 'Pas de grille tarifaire figée. Le périmètre décide du chiffre, et nous préférons le dire honnêtement.'
	},

	faq: {
		eyebrow: 'FAQ',
		title: ['Questions,', 'réponses.'],
		items: [
			{
				q: 'Que créez-vous exactement ?',
				a: 'Des reels et vidéos courtes, des publicités produit, des films de marque cinématiques, des formats créateur, des visuels de campagne et des campagnes créatives complètes. Nous prenons en charge stratégie, concept, script, génération, voix, son, montage et livraison.'
			},
			{
				q: 'Tout est-il généré par IA ?',
				a: 'Les images et le mouvement sont générés par IA. La stratégie, l’écriture, la direction artistique, le montage, le sound design et l’étalonnage sont des décisions humaines. L’IA est l’infrastructure de production, pas le directeur de création.'
			},
			{
				q: 'Dois-je fournir des rushes ?',
				a: 'Non. Si vous avez des photos produit, une charte ou des vidéos existantes nous pouvons les intégrer, mais rien n’est indispensable pour démarrer, à part un brief et un produit.'
			},
			{
				q: 'Pouvez-vous faire des pubs pour des produits physiques ?',
				a: 'Oui — c’est l’essentiel de notre activité. Des références produit nettes nous permettent de garder l’objet fidèle sur tous les plans d’une campagne.'
			},
			{
				q: 'Pouvez-vous reprendre le style de ma marque ?',
				a: 'Oui. Envoyez votre charte, vos campagnes passées ou quelques références et nous construisons la direction visuelle autour.'
			},
			{
				q: 'Quels formats livrez-vous ?',
				a: '9:16, 1:1, 4:5 et 16:9, dans la résolution et le codec attendus par vos plateformes. Sous-titres incrustés ou livrés à part.'
			},
			{
				q: 'Pouvez-vous produire chaque mois ?',
				a: 'Oui. Grow et Scale sont faits pour ça, avec des créneaux de production réservés à l’avance.'
			},
			{
				q: 'Puis-je utiliser les vidéos en publicité payante ?',
				a: 'Oui. Les droits d’usage commercial pour le média payant sont définis par écrit avec le devis, pour que le périmètre soit clair avant de commencer.'
			},
			{
				q: 'Combien de temps prend un projet ?',
				a: 'Cela dépend du périmètre et du nombre de concepts. Nous nous engageons sur un délai dans le devis plutôt que d’annoncer un chiffre ici.'
			},
			{
				q: 'Comment fonctionne le devis ?',
				a: 'Envoyez le brief via le formulaire. Nous étudions votre marque et revenons avec une direction créative et un prix pour le périmètre réellement utile.'
			}
		]
	},

	finalCta: {
		title: ['Votre prochaine', 'campagne n’a pas', 'besoin de caméra.'],
		lead: 'Dites-nous ce que vous vendez. Nous trouverons à quoi ça doit ressembler.',
		cta: 'Lancer un projet',
		note: 'Un brief écrit, une direction créative en retour.'
	},

	footer: {
		tagline: 'Studio créatif IA',
		blurb: 'Reels, publicités produit et campagnes cinématiques pour les marques et le e-commerce.',
		navLabel: 'Studio',
		links: [
			{ label: 'Réalisations', href: '#work' },
			{ label: 'Services', href: '#services' },
			{ label: 'Processus', href: '#process' }
		],
		contactLabel: 'Contact',
		social: 'Instagram',
		email: 'E-mail',
		legalLabel: 'Légal',
		privacy: 'Confidentialité',
		terms: 'Conditions',
		rights: 'Tous droits réservés.',
		backToTop: 'Haut de page'
	},

	quote: {
		open: 'Demander un devis',
		close: 'Fermer',
		title: 'Demander un devis',
		subtitle: 'Cinq étapes courtes. Moins de deux minutes.',
		stepLabel: 'Étape',
		of: 'sur',
		next: 'Continuer',
		back: 'Retour',
		submit: 'Envoyer ma demande',
		submitting: 'Envoi',
		required: 'Ce champ est obligatoire.',
		invalidEmail: 'Entrez une adresse e-mail valide.',
		selectOne: 'Sélectionnez au moins une option.',
		steps: {
			brand: { title: 'Votre marque', hint: 'Pour savoir à qui nous parlons.' },
			needs: { title: 'De quoi avez-vous besoin ?', hint: 'Plusieurs choix possibles.' },
			volume: { title: 'Volume de contenu', hint: 'Une estimation suffit.' },
			budget: { title: 'Budget', hint: 'Cela cadre le périmètre proposé, rien d’autre.' },
			project: { title: 'Le projet', hint: 'Plus il y a de contexte, plus la direction est juste.' }
		},
		fields: {
			name: 'Nom',
			namePlaceholder: 'Votre nom',
			email: 'E-mail professionnel',
			emailPlaceholder: 'vous@marque.com',
			company: 'Marque / société',
			companyPlaceholder: 'Nom de la marque',
			url: 'Site web ou Instagram',
			urlPlaceholder: 'marque.com ou @marque',
			brief: 'Que cherchez-vous à créer ?',
			briefPlaceholder: 'Le produit, l’objectif, tout ce que vous avez déjà en tête.',
			deadline: 'Échéance',
			deadlineOptional: 'Optionnel'
		},
		success: {
			title: 'Demande reçue',
			body: 'Laissez-nous un peu de temps pour étudier votre marque. Nous revenons vers vous avec la bonne direction créative et un devis adapté au périmètre.',
			action: 'Fermer'
		},
		error: {
			title: 'L’envoi a échoué',
			body: 'Quelque chose s’est mal passé. Réessayez, ou écrivez-nous directement.',
			tooMany: 'Cela fait plusieurs demandes d’affilée. Patientez une minute, puis réessayez.',
			retry: 'Réessayer'
		}
	},

	legal: {
		back: 'Retour au site',
		privacy: {
			title: 'Confidentialité',
			updated: 'Texte provisoire — à relire avant lancement',
			sections: [
				{
					h: 'Ce que nous collectons',
					p: 'Lorsque vous envoyez le formulaire de devis, nous recevons le nom, l’e-mail, la marque, le lien, les détails du projet et l’échéance que vous choisissez de partager. Rien d’autre n’est collecté sur ce site.'
				},
				{
					h: 'Comment nous l’utilisons',
					p: 'Uniquement pour étudier votre demande et répondre avec une direction créative et un devis. Nous ne les vendons pas et ne les partageons pas à des fins marketing.'
				},
				{
					h: 'Où vont ces données',
					p: 'Les envois de formulaire sont traités par notre hébergeur et conservés dans la boîte du studio.'
				},
				{
					h: 'Vos droits',
					p: 'Écrivez-nous et nous supprimons vos données de nos dossiers sur demande.'
				}
			]
		},
		terms: {
			title: 'Conditions',
			updated: 'Texte provisoire — à relire avant lancement',
			sections: [
				{
					h: 'À propos de ce site',
					p: 'Ce site présente le studio et son travail. Rien n’y constitue une offre ferme ; périmètre, délais et prix sont convenus dans un devis écrit.'
				},
				{
					h: 'Travaux présentés',
					p: 'Les travaux visuels présentés sont produits par le studio. Lorsque le contenu est généré par IA, il peut inclure des talents, des voix et des décors synthétiques. Un talent synthétique n’est jamais présenté comme une personne réelle recommandant un produit.'
				},
				{
					h: 'Droits et usages',
					p: 'La propriété et les droits d’usage des travaux commandés, y compris en média payant, sont définis dans le devis et le contrat de chaque projet.'
				},
				{
					h: 'Contact',
					p: 'Toute question sur ces conditions peut être envoyée à l’adresse du studio en pied de page.'
				}
			]
		}
	},

	notFound: {
		title: 'Rien par ici',
		body: 'Cette page n’existe pas. Le travail, si.',
		cta: 'Retour au studio'
	}
};
