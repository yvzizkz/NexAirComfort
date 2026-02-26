import {
  pgTable,
  serial,
  text,
  timestamp,
  boolean,
  integer,
  numeric,
  jsonb,
  index,
} from 'drizzle-orm/pg-core';

// ─── Users ───────────────────────────────────────────────────────────────────

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  password_hash: text('password_hash'),
  name: text('name').notNull(),
  phone: text('phone'),
  address_street: text('address_street'),
  address_city: text('address_city'),
  address_state: text('address_state'),
  address_zip: text('address_zip'),
  profile_photo: text('profile_photo'),
  language: text('language').default('en'),
  role: text('role').default('customer'),
  google_id: text('google_id'),
  ghl_contact_id: text('ghl_contact_id'),
  stripe_customer_id: text('stripe_customer_id'),
  email_verified: boolean('email_verified').default(false),
  email_verify_token: text('email_verify_token'),
  password_reset_token: text('password_reset_token'),
  password_reset_expires: timestamp('password_reset_expires'),
  two_factor_enabled: boolean('two_factor_enabled').default(false),
  two_factor_phone: text('two_factor_phone'),
  communication_prefs: jsonb('communication_prefs'),
  preferred_contact: text('preferred_contact').default('email'),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
  deleted_at: timestamp('deleted_at'),
});

// ─── Leads ───────────────────────────────────────────────────────────────────

export const leads = pgTable('leads', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email'),
  phone: text('phone'),
  address: text('address'),
  service_needed: text('service_needed'),
  preferred_date: text('preferred_date'),
  message: text('message'),
  source: text('source'),
  language: text('language').default('en'),
  ghl_contact_id: text('ghl_contact_id'),
  status: text('status').default('new'),
  created_at: timestamp('created_at').defaultNow(),
});

// ─── Members ─────────────────────────────────────────────────────────────────

export const members = pgTable('members', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  address: text('address'),
  plan: text('plan').notNull(),
  billing_cycle: text('billing_cycle').default('monthly'),
  stripe_customer_id: text('stripe_customer_id'),
  stripe_subscription_id: text('stripe_subscription_id'),
  status: text('status').default('active'),
  nuve_thermostat_id: text('nuve_thermostat_id'),
  language: text('language').default('en'),
  created_at: timestamp('created_at').defaultNow(),
  canceled_at: timestamp('canceled_at'),
});

// ─── Blog Posts ──────────────────────────────────────────────────────────────

export const blogPosts = pgTable('blog_posts', {
  id: serial('id').primaryKey(),
  title_en: text('title_en').notNull(),
  title_es: text('title_es'),
  slug: text('slug').notNull().unique(),
  content_en: text('content_en').notNull(),
  content_es: text('content_es'),
  excerpt_en: text('excerpt_en'),
  excerpt_es: text('excerpt_es'),
  featured_image: text('featured_image'),
  category: text('category'),
  author: text('author'),
  published: boolean('published').default(false),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});

// ─── Chat Sessions ───────────────────────────────────────────────────────────

export const chatSessions = pgTable('chat_sessions', {
  id: serial('id').primaryKey(),
  session_id: text('session_id').notNull().unique(),
  lead_id: integer('lead_id'),
  messages: jsonb('messages').default([]),
  language: text('language').default('en'),
  status: text('status').default('active'),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});

// ─── Form Submissions ────────────────────────────────────────────────────────

export const formSubmissions = pgTable('form_submissions', {
  id: serial('id').primaryKey(),
  form_type: text('form_type').notNull(),
  data: jsonb('data').notNull(),
  lead_id: integer('lead_id'),
  ghl_synced: boolean('ghl_synced').default(false),
  email_sent: boolean('email_sent').default(false),
  created_at: timestamp('created_at').defaultNow(),
});

// ─── Appointments ────────────────────────────────────────────────────────────

export const appointments = pgTable('appointments', {
  id: serial('id').primaryKey(),
  user_id: integer('user_id'),
  lead_id: integer('lead_id'),
  service_type: text('service_type').notNull(),
  description: text('description'),
  property_type: text('property_type'),
  system_brand: text('system_brand'),
  system_model: text('system_model'),
  system_year: integer('system_year'),
  preferred_date: text('preferred_date').notNull(),
  preferred_time: text('preferred_time'),
  address_street: text('address_street'),
  address_city: text('address_city'),
  address_state: text('address_state'),
  address_zip: text('address_zip'),
  status: text('status').default('pending'),
  technician_name: text('technician_name'),
  technician_id: integer('technician_id'),
  notes: text('notes'),
  photos: jsonb('photos'),
  ghl_appointment_id: text('ghl_appointment_id'),
  rating: integer('rating'),
  rating_comment: text('rating_comment'),
  canceled_at: timestamp('canceled_at'),
  completed_at: timestamp('completed_at'),
  created_at: timestamp('created_at').defaultNow(),
});

// ─── Service Records ─────────────────────────────────────────────────────────

export const serviceRecords = pgTable('service_records', {
  id: serial('id').primaryKey(),
  user_id: integer('user_id'),
  appointment_id: integer('appointment_id'),
  service_type: text('service_type').notNull(),
  description: text('description'),
  technician_name: text('technician_name'),
  parts_used: jsonb('parts_used'),
  labor_hours: numeric('labor_hours'),
  cost: numeric('cost'),
  invoice_id: integer('invoice_id'),
  photos_before: jsonb('photos_before'),
  photos_after: jsonb('photos_after'),
  warranty_until: timestamp('warranty_until'),
  notes: text('notes'),
  completed_at: timestamp('completed_at'),
});

// ─── Invoices ────────────────────────────────────────────────────────────────

export const invoices = pgTable('invoices', {
  id: serial('id').primaryKey(),
  user_id: integer('user_id'),
  appointment_id: integer('appointment_id'),
  stripe_invoice_id: text('stripe_invoice_id'),
  invoice_number: text('invoice_number'),
  type: text('type'),
  description: text('description'),
  line_items: jsonb('line_items'),
  subtotal: numeric('subtotal'),
  tax: numeric('tax'),
  discount: numeric('discount'),
  total: numeric('total'),
  status: text('status').default('pending'),
  paid_at: timestamp('paid_at'),
  due_date: timestamp('due_date'),
  pdf_url: text('pdf_url'),
  created_at: timestamp('created_at').defaultNow(),
});

// ─── Referrals ───────────────────────────────────────────────────────────────

export const referrals = pgTable('referrals', {
  id: serial('id').primaryKey(),
  referrer_id: integer('referrer_id').notNull(),
  referral_code: text('referral_code').notNull().unique(),
  referral_link: text('referral_link'),
  referred_name: text('referred_name'),
  referred_email: text('referred_email'),
  referred_phone: text('referred_phone'),
  referred_user_id: integer('referred_user_id'),
  status: text('status').default('pending'),
  reward_type: text('reward_type'),
  reward_amount: numeric('reward_amount'),
  credited_at: timestamp('credited_at'),
  created_at: timestamp('created_at').defaultNow(),
});

// ─── Referral Credits ────────────────────────────────────────────────────────

export const referralCredits = pgTable('referral_credits', {
  id: serial('id').primaryKey(),
  user_id: integer('user_id').notNull(),
  amount: numeric('amount').notNull(),
  source: text('source'),
  referral_id: integer('referral_id'),
  invoice_id: integer('invoice_id'),
  description: text('description'),
  created_at: timestamp('created_at').defaultNow(),
});

// ─── Nuve Devices ────────────────────────────────────────────────────────────

export const nuveDevices = pgTable('nuve_devices', {
  id: serial('id').primaryKey(),
  user_id: integer('user_id').notNull(),
  nuve_device_id: text('nuve_device_id').notNull(),
  nickname: text('nickname'),
  install_date: timestamp('install_date'),
  system_brand: text('system_brand'),
  system_model: text('system_model'),
  filter_last_changed: timestamp('filter_last_changed'),
  filter_change_interval_days: integer('filter_change_interval_days').default(90),
  last_status: text('last_status'),
  last_status_detail: text('last_status_detail'),
  last_indoor_temp: numeric('last_indoor_temp'),
  last_outdoor_temp: numeric('last_outdoor_temp'),
  last_humidity: numeric('last_humidity'),
  last_system_mode: text('last_system_mode'),
  last_sync: timestamp('last_sync'),
  created_at: timestamp('created_at').defaultNow(),
});

// ─── Promotions ──────────────────────────────────────────────────────────────

export const promotions = pgTable('promotions', {
  id: serial('id').primaryKey(),
  title_en: text('title_en').notNull(),
  title_es: text('title_es'),
  description_en: text('description_en'),
  description_es: text('description_es'),
  cta_text_en: text('cta_text_en'),
  cta_text_es: text('cta_text_es'),
  cta_link: text('cta_link'),
  banner_color: text('banner_color'),
  active: boolean('active').default(true),
  start_date: timestamp('start_date'),
  end_date: timestamp('end_date'),
  created_at: timestamp('created_at').defaultNow(),
});

// ─── Estimate Requests ───────────────────────────────────────────────────────

export const estimateRequests = pgTable('estimate_requests', {
  id: serial('id').primaryKey(),
  user_id: integer('user_id'),
  lead_id: integer('lead_id'),
  service_type: text('service_type').notNull(),
  property_type: text('property_type'),
  property_sqft: integer('property_sqft'),
  property_year: integer('property_year'),
  current_system_type: text('current_system_type'),
  current_system_brand: text('current_system_brand'),
  current_system_age: integer('current_system_age'),
  photos: jsonb('photos'),
  budget_range: text('budget_range'),
  wants_financing: boolean('wants_financing').default(false),
  urgency: text('urgency'),
  notes: text('notes'),
  status: text('status').default('pending'),
  estimate_amount: numeric('estimate_amount'),
  estimate_pdf: text('estimate_pdf'),
  created_at: timestamp('created_at').defaultNow(),
});

// ─── Sessions (for connect-pg-simple) ────────────────────────────────────────

export const sessions = pgTable(
  'sessions',
  {
    sid: text('sid').primaryKey(),
    sess: jsonb('sess').notNull(),
    expire: timestamp('expire').notNull(),
  },
  (table) => ({
    expireIdx: index('IDX_session_expire').on(table.expire),
  })
);
