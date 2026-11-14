import type { SiteContent } from './types';

export const en: SiteContent = {
	meta: {
		title: 'MENO — AI Creative Studio for Brands & E-Commerce',
		description:
			'AI-powered reels, product ads and cinematic campaigns, produced end to end for brands and e-commerce businesses.',
		ogAlt: 'MENO — AI creative studio'
	},

	nav: {
		links: [
			{ label: 'Work', href: '#work' },
			{ label: 'Services', href: '#services' },
			{ label: 'Process', href: '#process' },
			{ label: 'About', href: '#about' },
			{ label: 'FAQ', href: '#faq' }
		],
		cta: 'Get Quote',
		openMenu: 'Open menu',
		closeMenu: 'Close menu',
		language: 'Language',
		skipToContent: 'Skip to content'
	},

	hero: {
		eyebrow: 'AI Creative Studio',
		headline: ['Made to be', 'watched.'],
		kicker: 'And built to sell.',
		lead: 'MENO is an AI creative studio. We produce reels, product ads and cinematic campaigns for brands and e-commerce — concept, direction, generation, sound, final cut.',
		ctaPrimary: 'Get a quote',
		ctaSecondary: 'View our work',
		specialities: ['AI Reels', 'Product Ads', 'E-Commerce', 'Cinematic Campaigns'],
		scroll: 'Scroll',
		reelLabel: 'Showreel'
	},

	work: {
		eyebrow: 'Selected work',
		title: ['Made with AI.', 'Directed by humans.'],
		lead: 'Vertical first, because that is where the attention is. Every frame below was concepted, directed, generated and cut in-house.',
		filterAll: 'All',
		filterLabel: 'Filter work by category',
		swipe: 'Swipe for more →',
		categories: {
			'ai-product-film': 'AI Product Film',
			'cinematic-reel': 'Cinematic Reel',
			'ecommerce-ad': 'E-Commerce Ad',
			'ai-creator-ad': 'AI Creator Ad',
			'brand-film': 'Brand Film',
			'product-visual': 'Product Visual'
		},
		note: 'Talent, environments and voices in AI creator work are synthetic. Nothing here is presented as a real customer testimonial.',
		cta: 'Start a project'
	},

	brands: {
		title: 'Trusted by brands that care how they look',
		note: 'Client marks appear here as partnerships go live.'
	},

	services: {
		eyebrow: 'What we create',
		title: ['Six ways', 'to be seen.'],
		lead: 'Pick one, or let us build the whole creative system around your product.',
		items: [
			{
				index: '01',
				title: 'AI Reels & Short-Form',
				body: 'Vertical content designed for Reels, TikTok and Shorts. Hook first, held to the last frame, cut for the platform it lives on.',
				tags: ['9:16', 'Hooks', 'Captions', 'Sound design']
			},
			{
				index: '02',
				title: 'E-Commerce Product Ads',
				body: 'Product-led advertising that makes the object feel desirable. Built for paid placement, made to survive a feed at speed.',
				tags: ['Paid social', 'Variants', 'Product-led']
			},
			{
				index: '03',
				title: 'Cinematic Brand Films',
				body: 'Storytelling with the visual ambition of traditional production — locations, scale and light that a shoot budget would not allow.',
				tags: ['16:9', 'Narrative', 'Score']
			},
			{
				index: '04',
				title: 'AI Creator Ads',
				body: 'Creator-style advertising with AI-generated talent and environments. Fully synthetic, clearly disclosed, and never presented as a real person endorsing your brand.',
				tags: ['Synthetic talent', 'Disclosed', 'Scripted']
			},
			{
				index: '05',
				title: 'AI Product Visuals',
				body: 'Campaign imagery, product environments, lifestyle sets and visual concepts. An entire photoshoot without a studio booking.',
				tags: ['Stills', 'Campaign', 'Lifestyle']
			},
			{
				index: '06',
				title: 'Creative Campaigns',
				body: 'Concepts, scripts, hooks, visual direction and variant systems — the strategy layer that decides what gets made in the first place.',
				tags: ['Strategy', 'Scripts', 'Systems']
			}
		]
	},

	value: {
		eyebrow: 'The model',
		title: ['Big production', 'energy. Without', 'the overhead.'],
		lead: 'We did not remove the craft. We removed the logistics that used to sit between an idea and the final cut.',
		oldLabel: 'Traditional production',
		oldItems: [
			'Location scouting',
			'Casting',
			'Camera crew',
			'Equipment rental',
			'Travel',
			'Set build',
			'Reshoots',
			'Production coordination'
		],
		newLabel: 'The MENO pipeline',
		newItems: ['Concept', 'Direction', 'Generation', 'Edit', 'Deliver'],
		unlocks: [
			{
				title: 'Environments that do not exist',
				body: 'A rooftop in fog, a desert at golden hour, an underwater set. Scouting stops being a budget line.'
			},
			{
				title: 'More concepts, not fewer',
				body: 'When a version costs hours instead of a shoot day, we test three directions before committing to one.'
			},
			{
				title: 'Consistency at volume',
				body: 'The same product, the same visual language, across an entire campaign and every format it runs in.'
			},
			{
				title: 'Iteration that keeps up',
				body: 'A hook that is not landing gets recut this week — not next quarter, when the budget resets.'
			}
		],
		footnote: 'This is not one-click generation. It is a production pipeline that happens to run on AI.'
	},

	craft: {
		eyebrow: 'Our craft',
		title: ['AI is the engine.', 'Direction is', 'the difference.'],
		lead: 'Anyone can generate. The work is knowing what should be generated, what should be discarded, and what earns a place in the final cut.',
		layers: [
			{ index: '01', label: 'Research', detail: 'Category, competitors, what the feed is already tired of.' },
			{ index: '02', label: 'Concept', detail: 'The angle. Why this idea and not the obvious one.' },
			{ index: '03', label: 'Hook', detail: 'The first 1.5 seconds, written and tested before anything is made.' },
			{ index: '04', label: 'Script', detail: 'Beat by beat, timed to the format it will run in.' },
			{ index: '05', label: 'Storyboard', detail: 'Every shot decided before a single frame is generated.' },
			{ index: '06', label: 'Visual direction', detail: 'Lens, light, palette, texture, reference.' },
			{ index: '07', label: 'Generation', detail: 'Many takes. Most of them discarded.' },
			{ index: '08', label: 'Voice', detail: 'Casting a voice, not accepting the first one offered.' },
			{ index: '09', label: 'Sound design', detail: 'Score, foley, and silence where silence works harder.' },
			{ index: '10', label: 'Editing', detail: 'Rhythm, cut points, the pacing a feed rewards.' },
			{ index: '11', label: 'Color', detail: 'Grade and grain, so a campaign looks like one campaign.' },
			{ index: '12', label: 'Delivery', detail: 'Every ratio, every platform, captions burned or separate.' }
		],
		note: 'Twelve layers. Most of them have nothing to do with a prompt.',
		trackLabel: 'Production timeline'
	},

	process: {
		eyebrow: 'How it works',
		title: ['Four steps.', 'No friction.'],
		steps: [
			{
				index: '01',
				title: 'Brief',
				body: 'Send the product, the site, your references and what you need the content to do.'
			},
			{
				index: '02',
				title: 'Concept',
				body: 'We come back with the angle, the hook, the script and the visual direction.'
			},
			{
				index: '03',
				title: 'Create',
				body: 'We generate, direct, animate, edit, score and grade the whole thing.'
			},
			{
				index: '04',
				title: 'Deliver',
				body: 'Platform-ready assets in every ratio you need, with revision rounds set by your package.'
			}
		]
	},

	ecom: {
		eyebrow: 'Built for e-commerce',
		title: ['One product.', 'Nine ways', 'to sell it.'],
		lead: 'A product does not need one ad. It needs a creative system — enough angles to keep a paid account alive for a quarter.',
		productLabel: 'Your product',
		formats: [
			{ name: 'Product Reveal', note: 'The hero moment' },
			{ name: 'Lifestyle Reel', note: 'In context, in use' },
			{ name: 'Problem / Solution', note: 'The conversion workhorse' },
			{ name: 'Feature Ad', note: 'One benefit, hard' },
			{ name: 'Cinematic Film', note: 'Brand-level ambition' },
			{ name: 'Creator-Style Ad', note: 'Synthetic talent, scripted' },
			{ name: 'Launch Teaser', note: 'Short, withholding' },
			{ name: 'Retargeting Creative', note: 'For the ones who hesitated' },
			{ name: 'Product Visuals', note: 'Stills for the whole funnel' }
		],
		footnote: 'Same product. Same brand language. Enough variation to keep testing.',
		cta: 'Get a quote'
	},

	engagement: {
		eyebrow: 'Engagement',
		title: ['Three ways', 'to work with us.'],
		lead: 'Every project is quoted on scope. Tell us what you need and we will price it properly.',
		featuredBadge: 'Most chosen',
		tiers: [
			{
				id: 'start',
				name: 'Start',
				tagline: 'For brands testing AI creative',
				body: 'A single campaign or reel, produced end to end. The way to see how we work before committing to more.',
				points: [
					'One-off campaign or reel',
					'Full concept and direction',
					'Delivered in every ratio you need'
				],
				featured: false
			},
			{
				id: 'grow',
				name: 'Grow',
				tagline: 'For brands that need a steady flow',
				body: 'A consistent monthly output of creative, with a visual language that stays coherent from one month to the next.',
				points: [
					'Monthly content flow',
					'Consistent campaign direction',
					'Multiple formats and ratios',
					'Priority production slots'
				],
				featured: true
			},
			{
				id: 'scale',
				name: 'Scale',
				tagline: 'For e-commerce and creative teams',
				body: 'Multiple concepts, campaigns and variant sets every month — built for paid accounts that need volume without losing taste.',
				points: [
					'Multiple concepts per month',
					'Variant systems for paid testing',
					'Full campaign ecosystems',
					'Dedicated creative direction'
				],
				featured: false
			}
		],
		cta: 'Get quote',
		note: 'No fixed price list. Scope decides the number, and we would rather quote it honestly.'
	},

	faq: {
		eyebrow: 'FAQ',
		title: ['Questions,', 'answered.'],
		items: [
			{
				q: 'What exactly do you create?',
				a: 'Reels and short-form video, product ads, cinematic brand films, creator-style ads, campaign stills and full creative campaigns. We handle strategy, concept, script, generation, voice, sound, edit and delivery.'
			},
			{
				q: 'Is everything generated with AI?',
				a: 'The imagery and motion are AI-generated. The strategy, writing, art direction, editing, sound design and colour are human decisions. AI is the production infrastructure, not the creative director.'
			},
			{
				q: 'Do I need to provide footage?',
				a: 'No. If you have product photography, brand assets or existing footage we can work them in, but nothing is required to start beyond a brief and a product.'
			},
			{
				q: 'Can you create ads for physical products?',
				a: 'Yes — that is most of what we do. Clear product references let us keep the object accurate across every shot in a campaign.'
			},
			{
				q: 'Can you match my existing brand style?',
				a: 'Yes. Send your guidelines, past campaigns or a few references and we build the visual direction around them.'
			},
			{
				q: 'Which formats do you deliver?',
				a: '9:16, 1:1, 4:5 and 16:9, in the resolution and codec your platforms need. Captions burned in or delivered as a separate file.'
			},
			{
				q: 'Can you create content every month?',
				a: 'Yes. Grow and Scale are built for exactly that, with production slots reserved in advance.'
			},
			{
				q: 'Can I use the videos for paid ads?',
				a: 'Yes. Commercial usage rights for paid media are agreed in writing with your quote, so the scope is clear before we start.'
			},
			{
				q: 'How long does a project take?',
				a: 'It depends on scope and the number of concepts. We commit to a timeline in the quote rather than promising a number here.'
			},
			{
				q: 'How does the quote work?',
				a: 'Send the brief through the form. We review your brand and come back with a creative direction and a price for the scope you actually need.'
			}
		]
	},

	finalCta: {
		title: ['Your next', 'campaign does not', 'need a camera.'],
		lead: 'Tell us what you are selling. We will figure out how it should look.',
		cta: 'Start a project',
		note: 'Written brief in, creative direction back.'
	},

	footer: {
		tagline: 'AI Creative Studio',
		blurb: 'Reels, product ads and cinematic campaigns for brands and e-commerce.',
		navLabel: 'Studio',
		links: [
			{ label: 'Work', href: '#work' },
			{ label: 'Services', href: '#services' },
			{ label: 'Process', href: '#process' }
		],
		contactLabel: 'Contact',
		social: 'Instagram',
		email: 'Email',
		legalLabel: 'Legal',
		privacy: 'Privacy',
		terms: 'Terms',
		rights: 'All rights reserved.',
		backToTop: 'Back to top'
	},

	quote: {
		open: 'Get a quote',
		close: 'Close',
		title: 'Request a quote',
		subtitle: 'Five short steps. Under two minutes.',
		stepLabel: 'Step',
		of: 'of',
		next: 'Continue',
		back: 'Back',
		submit: 'Request my quote',
		submitting: 'Sending',
		required: 'This field is required.',
		invalidEmail: 'Enter a valid email address.',
		selectOne: 'Select at least one option.',
		steps: {
			brand: { title: 'Your brand', hint: 'So we know who we are talking to.' },
			needs: { title: 'What do you need?', hint: 'Select as many as apply.' },
			volume: { title: 'Content volume', hint: 'A rough idea is enough.' },
			budget: { title: 'Budget', hint: 'This shapes the scope we propose, nothing else.' },
			project: { title: 'The project', hint: 'The more context, the sharper the direction.' }
		},
		fields: {
			name: 'Name',
			namePlaceholder: 'Your name',
			email: 'Work email',
			emailPlaceholder: 'you@brand.com',
			company: 'Brand / company',
			companyPlaceholder: 'Brand name',
			url: 'Website or Instagram',
			urlPlaceholder: 'brand.com or @brand',
			brief: 'What are you trying to create?',
			briefPlaceholder: 'The product, the goal, anything you already have in mind.',
			deadline: 'Deadline',
			deadlineOptional: 'Optional'
		},
		success: {
			title: 'Request received',
			body: 'Give us a little time to review your brand. We will come back with the right creative direction and a quote for the scope you need.',
			action: 'Close'
		},
		error: {
			title: 'That did not send',
			body: 'Something went wrong on the way out. Try again, or email us directly.',
			tooMany: 'That is a few requests in a row. Give it a minute, then try again.',
			retry: 'Try again'
		}
	},

	legal: {
		back: 'Back to site',
		privacy: {
			title: 'Privacy',
			updated: 'Placeholder text — review before launch',
			sections: [
				{
					h: 'What we collect',
					p: 'When you submit the quote form we receive the name, email, brand, link, project details and any deadline you choose to share. Nothing else is collected on this site.'
				},
				{
					h: 'How we use it',
					p: 'Only to review your request and reply with a creative direction and quote. We do not sell it or share it with third parties for marketing.'
				},
				{
					h: 'Where it goes',
					p: 'Form submissions are processed by our hosting provider and stored in the studio inbox.'
				},
				{
					h: 'Your rights',
					p: 'Write to us and we will remove your data from our records on request.'
				},
				{
					h: 'YouTube API Services',
					p: 'The studio runs an internal tool, Meno Station Uploader, that uses YouTube API Services to upload and schedule videos on the studio’s own YouTube channel. It is not offered to the public. By using it you agree to be bound by the YouTube Terms of Service (https://www.youtube.com/t/terms), and Google’s handling of data is described in the Google Privacy Policy (https://policies.google.com/privacy).'
				},
				{
					h: 'What the uploader accesses',
					p: 'Only permission to upload videos and set their details (title, description, tags, thumbnail, visibility and publish time) on the authorised channel, plus the basic channel information needed to confirm which channel is authorised. It does not access or store viewer data, comments, analytics or any information about other YouTube users. Its access credential is stored privately, used for nothing else, and never sold or shared.'
				},
				{
					h: 'Revoking access',
					p: 'Access granted to the uploader can be revoked at any time from the Google security settings page (https://security.google.com/settings/security/permissions). Once revoked, the stored credential stops working and is deleted.'
				}
			]
		},
		terms: {
			title: 'Terms',
			updated: 'Placeholder text — review before launch',
			sections: [
				{
					h: 'About this site',
					p: 'This site presents the studio and its work. Nothing on it constitutes a binding offer; scope, timeline and price are agreed in a written quote.'
				},
				{
					h: 'Work shown',
					p: 'Visual work on this site is produced by the studio. Where content is AI-generated it may include synthetic talent, voices and environments. Synthetic talent is never presented as a real person endorsing a product.'
				},
				{
					h: 'Rights and usage',
					p: 'Ownership and usage rights for commissioned work, including paid media use, are defined in the quote and agreement for each project.'
				},
				{
					h: 'Contact',
					p: 'Questions about these terms can be sent to the studio email in the footer.'
				}
			]
		}
	},

	notFound: {
		title: 'Nothing here',
		body: 'That page does not exist. The work does.',
		cta: 'Back to the studio'
	}
};
