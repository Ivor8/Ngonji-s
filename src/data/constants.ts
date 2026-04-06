export const IMAGES = {
  hero: 'https://d64gsuwffb70l.cloudfront.net/69c66f87f5e9783de8c69538_1774613003046_08f66873.jpg',
  lawyer: 'https://d64gsuwffb70l.cloudfront.net/69c66f87f5e9783de8c69538_1774612656570_48295670.png',
  foundation: 'https://d64gsuwffb70l.cloudfront.net/69c66f87f5e9783de8c69538_1774612980332_9e3f2454.jpg',
  properties: [
    'https://d64gsuwffb70l.cloudfront.net/69c66f87f5e9783de8c69538_1774612748669_6e7f0d81.jpg',
    'https://d64gsuwffb70l.cloudfront.net/69c66f87f5e9783de8c69538_1774612759839_22037dc8.jpg',
    'https://d64gsuwffb70l.cloudfront.net/69c66f87f5e9783de8c69538_1774612955105_644f3c06.jpg',
    'https://d64gsuwffb70l.cloudfront.net/69c66f87f5e9783de8c69538_1774612955407_45e3dc38.jpg',
    'https://d64gsuwffb70l.cloudfront.net/69c66f87f5e9783de8c69538_1774612956321_1fd4d362.jpg',
    'https://d64gsuwffb70l.cloudfront.net/69c66f87f5e9783de8c69538_1774612957826_adc34c93.jpg',
  ],
  team: [
    'https://d64gsuwffb70l.cloudfront.net/69c66f87f5e9783de8c69538_1774612780404_aca2deeb.jpg',
    'https://d64gsuwffb70l.cloudfront.net/69c66f87f5e9783de8c69538_1774612780920_844131e4.jpg',
    'https://d64gsuwffb70l.cloudfront.net/69c66f87f5e9783de8c69538_1774612781000_76da4886.jpg',
    'https://d64gsuwffb70l.cloudfront.net/69c66f87f5e9783de8c69538_1774612781695_45a1b700.jpg',
    'https://d64gsuwffb70l.cloudfront.net/69c66f87f5e9783de8c69538_1774612788196_76fc7ecf.jpg',
    'https://d64gsuwffb70l.cloudfront.net/69c66f87f5e9783de8c69538_1774612788532_1de1dbab.jpg',
  ],
};

export type EntityKey = 'law' | 'realestate' | 'foundation' | 'credit';

export interface EntityConfig {
  key: EntityKey;
  name: string;
  tagline: string;
  description: string;
  color: string;
  colorLight: string;
  colorDark: string;
  gradient: string;
  whatsapp: string;
  phone: string;
  email: string;
  address: string;
}

export const ENTITIES: Record<EntityKey, EntityConfig> = {
  law: {
    key: 'law',
    name: "Ngonji's Law Firm",
    tagline: 'Justice. Integrity. Excellence.',
    description: 'Premier legal services with a commitment to justice and client advocacy. Our experienced attorneys provide comprehensive legal solutions across corporate, family, criminal, and immigration law.',
    color: '#d4af37',
    colorLight: '#f5e6b8',
    colorDark: '#a68829',
    gradient: 'from-amber-600 to-yellow-500',
    whatsapp: '+237600000001',
    phone: '+237 233 000 001',
    email: 'law@ngonjis.com',
    address: 'Bonanjo, Douala, Cameroon',
  },
  realestate: {
    key: 'realestate',
    name: 'Eagle Company',
    tagline: 'Building Dreams. Creating Value.',
    description: 'Leading real estate development company specializing in premium residential and commercial properties. From concept to completion, we deliver excellence in every project.',
    color: '#10b981',
    colorLight: '#d1fae5',
    colorDark: '#059669',
    gradient: 'from-emerald-600 to-green-500',
    whatsapp: '+237600000002',
    phone: '+237 233 000 002',
    email: 'realestate@ngonjis.com',
    address: 'Akwa, Douala, Cameroon',
  },
  foundation: {
    key: 'foundation',
    name: 'Foundation Pro Bono',
    tagline: 'Empowering Communities. Changing Lives.',
    description: 'A charitable organization dedicated to uplifting underserved communities through education, healthcare, legal aid, and sustainable development programs across Africa.',
    color: '#f97316',
    colorLight: '#fed7aa',
    colorDark: '#ea580c',
    gradient: 'from-orange-500 to-amber-500',
    whatsapp: '+237600000003',
    phone: '+237 233 000 003',
    email: 'foundation@ngonjis.com',
    address: 'Bastos, Yaoundé, Cameroon',
  },
  credit: {
    key: 'credit',
    name: 'Crédit Immobilier Intercontinental',
    tagline: 'Financing Your Future.',
    description: 'Specialized financial institution providing competitive mortgage and construction loans to fuel property development and homeownership across the continent.',
    color: '#14b8a6',
    colorLight: '#ccfbf1',
    colorDark: '#0d9488',
    gradient: 'from-teal-600 to-cyan-500',
    whatsapp: '+237600000004',
    phone: '+237 233 000 004',
    email: 'credit@ngonjis.com',
    address: 'Bonapriso, Douala, Cameroon',
  },
};

export const ENTITY_LIST: EntityKey[] = ['law', 'realestate', 'foundation', 'credit'];

export const TEAM_MEMBERS = [
  { name: 'Maître Jean Ngonji', role: 'Founder & Managing Partner', entity: 'law', image: IMAGES.team[0] },
  { name: 'Dr. Amina Egle', role: 'CEO, Egle Company', entity: 'realestate', image: IMAGES.team[1] },
  { name: 'Marie-Claire Fotso', role: 'Director, Foundation Pro Bono', entity: 'foundation', image: IMAGES.team[2] },
  { name: 'Emmanuel Tchinda', role: 'MD, Crédit Immobilier', entity: 'credit', image: IMAGES.team[3] },
  { name: 'Patricia Mbeki', role: 'Head of Legal Operations', entity: 'law', image: IMAGES.team[4] },
  { name: 'David Okonkwo', role: 'Chief Investment Officer', entity: 'credit', image: IMAGES.team[5] },
];

export const STATS = [
  { label: 'Years of Excellence', value: '25+' },
  { label: 'Clients Served', value: '10,000+' },
  { label: 'Projects Completed', value: '500+' },
  { label: 'Team Members', value: '150+' },
];
