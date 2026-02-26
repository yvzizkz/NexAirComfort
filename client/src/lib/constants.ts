// ─── Company Information ──────────────────────────────────────────────────────

export const COMPANY_NAME = 'NexAir Comfort'
export const PARENT_COMPANY = 'Saddlewood Contracting LLC'
export const PHONE_NUMBER = '(480) 999-6100'
export const PHONE_LINK = 'tel:4809996100'
export const LICENSE_NUMBERS = [
  'AZ ROC #350714',
  'AZ ROC #350715',
  'AZ ROC #350716',
  'AZ ROC #305762',
]

// ─── Service Areas ────────────────────────────────────────────────────────────

export const SERVICE_AREAS = [
  'Phoenix',
  'Scottsdale',
  'Paradise Valley',
  'Tempe',
  'Mesa',
  'Chandler',
  'Gilbert',
  'Glendale',
  'Peoria',
]

// ─── Services ─────────────────────────────────────────────────────────────────

export interface ServiceInfo {
  slug: string
  slugEs: string
  name: string
  nameEs: string
  icon: string
  shortDescription: string
  shortDescriptionEs: string
  priceLabel: string
  priceLabelEs: string
}

export const SERVICES: ServiceInfo[] = [
  {
    slug: 'ac-repair',
    slugEs: 'reparacion-ac',
    name: 'AC Repair',
    nameEs: 'Reparacion de AC',
    icon: 'Wrench',
    shortDescription: 'Fast, reliable AC repair to keep you cool in the Arizona heat.',
    shortDescriptionEs: 'Reparacion de AC rapida y confiable para mantenerte fresco en el calor de Arizona.',
    priceLabel: 'Starting at $89 diagnostic',
    priceLabelEs: 'Desde $89 diagnostico',
  },
  {
    slug: 'ac-installation',
    slugEs: 'instalacion-ac',
    name: 'AC Installation',
    nameEs: 'Instalacion de AC',
    icon: 'AirVent',
    shortDescription: 'Expert AC installation with top-rated equipment and warranties.',
    shortDescriptionEs: 'Instalacion experta de AC con equipo de primera y garantias.',
    priceLabel: 'Free in-home estimate',
    priceLabelEs: 'Estimado gratuito en su hogar',
  },
  {
    slug: 'heating',
    slugEs: 'calefaccion',
    name: 'Heating Services',
    nameEs: 'Servicios de Calefaccion',
    icon: 'Flame',
    shortDescription: 'Furnace and heat pump repair, installation, and maintenance.',
    shortDescriptionEs: 'Reparacion, instalacion y mantenimiento de hornos y bombas de calor.',
    priceLabel: 'Starting at $89 diagnostic',
    priceLabelEs: 'Desde $89 diagnostico',
  },
  {
    slug: 'maintenance',
    slugEs: 'mantenimiento',
    name: 'Maintenance',
    nameEs: 'Mantenimiento',
    icon: 'ShieldCheck',
    shortDescription: 'Preventive maintenance plans to extend system life and save money.',
    shortDescriptionEs: 'Planes de mantenimiento preventivo para extender la vida del sistema y ahorrar dinero.',
    priceLabel: 'Starting at $49/visit',
    priceLabelEs: 'Desde $49/visita',
  },
  {
    slug: 'mini-splits',
    slugEs: 'mini-splits',
    name: 'Mini-Splits',
    nameEs: 'Mini-Splits',
    icon: 'Wind',
    shortDescription: 'Ductless mini-split systems for flexible, energy-efficient cooling.',
    shortDescriptionEs: 'Sistemas mini-split sin ductos para enfriamiento flexible y eficiente.',
    priceLabel: 'Free in-home estimate',
    priceLabelEs: 'Estimado gratuito en su hogar',
  },
  {
    slug: 'indoor-air-quality',
    slugEs: 'calidad-aire-interior',
    name: 'Indoor Air Quality',
    nameEs: 'Calidad del Aire Interior',
    icon: 'Sparkles',
    shortDescription: 'Air purification, filtration, and humidity control for healthier living.',
    shortDescriptionEs: 'Purificacion, filtracion y control de humedad para una vida mas saludable.',
    priceLabel: 'Free consultation',
    priceLabelEs: 'Consulta gratuita',
  },
]

// ─── Membership Plans ─────────────────────────────────────────────────────────

export interface MembershipPlan {
  id: string
  name: string
  nameEs: string
  monthlyPrice: number
  annualPrice: number
  annualSavings: number
  description: string
  descriptionEs: string
  features: string[]
  featuresEs: string[]
  highlighted: boolean
  color: string
}

export const MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: 'bronze',
    name: 'Bronze',
    nameEs: 'Bronce',
    monthlyPrice: 14.99,
    annualPrice: 149.99,
    annualSavings: 30,
    description: 'Essential protection for your HVAC system with annual tune-ups and priority scheduling.',
    descriptionEs: 'Proteccion esencial para su sistema HVAC con afinaciones anuales y programacion prioritaria.',
    features: [
      '1 annual AC tune-up',
      '1 annual heating tune-up',
      'Priority scheduling',
      '10% off all repairs',
      'No overtime charges',
      'Filter delivery reminders',
    ],
    featuresEs: [
      '1 afinacion anual de AC',
      '1 afinacion anual de calefaccion',
      'Programacion prioritaria',
      '10% de descuento en reparaciones',
      'Sin cargos por tiempo extra',
      'Recordatorios de entrega de filtros',
    ],
    highlighted: false,
    color: '#CD7F32',
  },
  {
    id: 'silver',
    name: 'Silver',
    nameEs: 'Plata',
    monthlyPrice: 29.99,
    annualPrice: 299.99,
    annualSavings: 60,
    description: 'Enhanced coverage with indoor air quality checks and extended discounts on parts and labor.',
    descriptionEs: 'Cobertura mejorada con verificaciones de calidad del aire y descuentos extendidos en piezas y mano de obra.',
    features: [
      '2 annual AC tune-ups',
      '1 annual heating tune-up',
      'Priority scheduling',
      '15% off all repairs',
      'No overtime charges',
      'Indoor air quality check',
      'Thermostat calibration',
      'Complimentary filter replacement (2x/year)',
      '$50 referral bonus',
    ],
    featuresEs: [
      '2 afinaciones anuales de AC',
      '1 afinacion anual de calefaccion',
      'Programacion prioritaria',
      '15% de descuento en reparaciones',
      'Sin cargos por tiempo extra',
      'Verificacion de calidad del aire',
      'Calibracion de termostato',
      'Reemplazo de filtro gratuito (2x/ano)',
      '$50 bono por referido',
    ],
    highlighted: true,
    color: '#C0C0C0',
  },
  {
    id: 'gold',
    name: 'Gold',
    nameEs: 'Oro',
    monthlyPrice: 49.99,
    annualPrice: 499.99,
    annualSavings: 100,
    description: 'Our premium plan with full system coverage, duct cleaning, and the best savings on every service call.',
    descriptionEs: 'Nuestro plan premium con cobertura completa del sistema, limpieza de ductos y los mejores ahorros en cada visita de servicio.',
    features: [
      '2 annual AC tune-ups',
      '2 annual heating tune-ups',
      'Same-day priority scheduling',
      '20% off all repairs',
      'No overtime charges',
      'Indoor air quality check',
      'Thermostat calibration',
      'Complimentary filter replacement (4x/year)',
      'Annual duct inspection',
      'Duct cleaning discount (25% off)',
      '$100 referral bonus',
      'Extended labor warranty (2 years)',
      'Energy efficiency audit',
    ],
    featuresEs: [
      '2 afinaciones anuales de AC',
      '2 afinaciones anuales de calefaccion',
      'Programacion prioritaria el mismo dia',
      '20% de descuento en reparaciones',
      'Sin cargos por tiempo extra',
      'Verificacion de calidad del aire',
      'Calibracion de termostato',
      'Reemplazo de filtro gratuito (4x/ano)',
      'Inspeccion anual de ductos',
      'Descuento en limpieza de ductos (25%)',
      '$100 bono por referido',
      'Garantia extendida de mano de obra (2 anos)',
      'Auditoria de eficiencia energetica',
    ],
    highlighted: false,
    color: '#FFD700',
  },
]

// ─── Navigation ───────────────────────────────────────────────────────────────

export interface NavItem {
  label: string
  labelEs: string
  href: string
  hrefEs: string
  children?: NavItem[]
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: 'Services',
    labelEs: 'Servicios',
    href: '/services',
    hrefEs: '/es/servicios',
    children: SERVICES.map(s => ({
      label: s.name,
      labelEs: s.nameEs,
      href: `/services/${s.slug}`,
      hrefEs: `/es/servicios/${s.slugEs}`,
    })),
  },
  {
    label: 'Membership',
    labelEs: 'Membresia',
    href: '/membership',
    hrefEs: '/es/membresia',
  },
  {
    label: 'Blog',
    labelEs: 'Blog',
    href: '/blog',
    hrefEs: '/es/blog',
  },
  {
    label: 'About',
    labelEs: 'Nosotros',
    href: '/about',
    hrefEs: '/es/nosotros',
  },
  {
    label: 'Contact',
    labelEs: 'Contacto',
    href: '/contact',
    hrefEs: '/es/contacto',
  },
]

// ─── Social Media ─────────────────────────────────────────────────────────────

export const SOCIAL_LINKS = {
  facebook: 'https://facebook.com/nexaircomfort',
  instagram: 'https://instagram.com/nexaircomfort',
  google: 'https://g.page/nexaircomfort',
  yelp: 'https://yelp.com/biz/nexaircomfort',
  nextdoor: 'https://nextdoor.com/pages/nexaircomfort',
}

// ─── Business Hours ───────────────────────────────────────────────────────────

export const BUSINESS_HOURS = {
  weekday: '7:00 AM - 7:00 PM',
  saturday: '8:00 AM - 5:00 PM',
  sunday: 'Emergency Only',
  emergency: '24/7 Emergency Service Available',
}

export const BUSINESS_HOURS_ES = {
  weekday: '7:00 AM - 7:00 PM',
  saturday: '8:00 AM - 5:00 PM',
  sunday: 'Solo Emergencias',
  emergency: 'Servicio de Emergencia 24/7 Disponible',
}
