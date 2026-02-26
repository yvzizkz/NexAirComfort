// ─── Types ────────────────────────────────────────────────────────────────────

export interface ApiResponse<T = unknown> {
  data?: T
  error?: string
  success: boolean
}

export interface ContactFormData {
  name: string
  email: string
  phone: string
  service: string
  message: string
  preferred_time?: string
  language?: string
}

export interface EstimateData {
  name: string
  email: string
  phone: string
  address_street: string
  address_city: string
  address_state: string
  address_zip: string
  service_type: string
  system_age?: string
  square_footage?: string
  details?: string
  preferred_date?: string
  language?: string
}

export interface BlogPost {
  id: number
  slug: string
  title: string
  title_es?: string
  excerpt: string
  excerpt_es?: string
  content: string
  content_es?: string
  cover_image?: string
  author: string
  category: string
  tags: string[]
  published_at: string
  read_time: number
}

export interface BlogListResponse {
  posts: BlogPost[]
  total: number
  page: number
  totalPages: number
}

export interface Promotion {
  id: number
  title: string
  title_es?: string
  description: string
  description_es?: string
  discount_type: 'percentage' | 'fixed' | 'custom'
  discount_value?: number
  code?: string
  valid_from: string
  valid_until: string
  services?: string[]
  banner_image?: string
}

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export interface ChatResponse {
  reply: string
  session_id: string
}

export interface DashboardOverview {
  upcoming_appointments: Appointment[]
  recent_invoices: Invoice[]
  membership: MembershipInfo | null
  system_health: SystemHealth | null
  referral_stats: ReferralStats | null
}

export interface Appointment {
  id: number
  service_type: string
  scheduled_date: string
  scheduled_time: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  technician_name?: string
  notes?: string
  address: string
}

export interface CreateAppointmentData {
  service_type: string
  preferred_date: string
  preferred_time: string
  address_street: string
  address_city: string
  address_state: string
  address_zip: string
  notes?: string
}

export interface Invoice {
  id: number
  invoice_number: string
  amount: number
  status: 'pending' | 'paid' | 'overdue'
  due_date: string
  issued_date: string
  service_description: string
  payment_url?: string
}

export interface MembershipInfo {
  plan: string
  status: 'active' | 'cancelled' | 'past_due'
  next_billing_date: string
  billing_cycle: 'monthly' | 'annual'
}

export interface SystemHealth {
  last_maintenance: string
  next_recommended: string
  system_age_years: number
  efficiency_rating: string
}

export interface ReferralStats {
  total_referrals: number
  successful_referrals: number
  total_earned: number
  referral_code: string
  referral_link: string
}

export interface ReferralInfo extends ReferralStats {
  referral_history: {
    id: number
    referred_name: string
    status: 'pending' | 'completed' | 'expired'
    reward_amount: number
    created_at: string
  }[]
}

export interface ProfileData {
  name?: string
  phone?: string
  address_street?: string
  address_city?: string
  address_state?: string
  address_zip?: string
  language?: string
  profile_photo?: string
}

export interface CheckoutResponse {
  url: string
}

// ─── Base Fetch Helper ────────────────────────────────────────────────────────

async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    const res = await fetch(endpoint, config)
    const data = await res.json()

    if (!res.ok) {
      return {
        success: false,
        error: data.error || data.message || `Request failed with status ${res.status}`,
      }
    }

    return { success: true, data: data as T }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Network error. Please try again.',
    }
  }
}

// ─── Contact & Estimates ──────────────────────────────────────────────────────

export async function submitContactForm(
  data: ContactFormData
): Promise<ApiResponse<{ message: string }>> {
  return apiFetch<{ message: string }>('/api/contact', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export async function submitEstimate(
  data: EstimateData
): Promise<ApiResponse<{ message: string; estimate_id: number }>> {
  return apiFetch<{ message: string; estimate_id: number }>('/api/estimates', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

// ─── Membership & Checkout ────────────────────────────────────────────────────

export async function createCheckoutSession(
  plan: string,
  billingCycle: 'monthly' | 'annual'
): Promise<ApiResponse<CheckoutResponse>> {
  return apiFetch<CheckoutResponse>('/api/membership/checkout', {
    method: 'POST',
    body: JSON.stringify({ plan, billing_cycle: billingCycle }),
  })
}

// ─── Blog ─────────────────────────────────────────────────────────────────────

export async function fetchBlogPosts(
  page: number = 1
): Promise<ApiResponse<BlogListResponse>> {
  return apiFetch<BlogListResponse>(`/api/blog?page=${page}`)
}

export async function fetchBlogPost(
  slug: string
): Promise<ApiResponse<BlogPost>> {
  return apiFetch<BlogPost>(`/api/blog/${encodeURIComponent(slug)}`)
}

// ─── Promotions ───────────────────────────────────────────────────────────────

export async function fetchActivePromotion(): Promise<ApiResponse<Promotion | null>> {
  return apiFetch<Promotion | null>('/api/promotions/active')
}

// ─── Chat ─────────────────────────────────────────────────────────────────────

export async function sendChatMessage(
  sessionId: string | null,
  messages: ChatMessage[]
): Promise<ApiResponse<ChatResponse>> {
  return apiFetch<ChatResponse>('/api/chat', {
    method: 'POST',
    body: JSON.stringify({ session_id: sessionId, messages }),
  })
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

export async function fetchDashboardOverview(): Promise<ApiResponse<DashboardOverview>> {
  return apiFetch<DashboardOverview>('/api/dashboard/overview')
}

// ─── Appointments ─────────────────────────────────────────────────────────────

export async function fetchAppointments(): Promise<ApiResponse<Appointment[]>> {
  return apiFetch<Appointment[]>('/api/appointments')
}

export async function createAppointment(
  data: CreateAppointmentData
): Promise<ApiResponse<Appointment>> {
  return apiFetch<Appointment>('/api/appointments', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

// ─── Invoices ─────────────────────────────────────────────────────────────────

export async function fetchInvoices(): Promise<ApiResponse<Invoice[]>> {
  return apiFetch<Invoice[]>('/api/invoices')
}

// ─── Referrals ────────────────────────────────────────────────────────────────

export async function fetchReferralInfo(): Promise<ApiResponse<ReferralInfo>> {
  return apiFetch<ReferralInfo>('/api/referrals')
}

// ─── User Profile ─────────────────────────────────────────────────────────────

export async function updateProfile(
  data: ProfileData
): Promise<ApiResponse<{ message: string; user: ProfileData }>> {
  return apiFetch<{ message: string; user: ProfileData }>('/api/user/profile', {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

export async function changePassword(
  currentPassword: string,
  newPassword: string
): Promise<ApiResponse<{ message: string }>> {
  return apiFetch<{ message: string }>('/api/user/password', {
    method: 'PUT',
    body: JSON.stringify({
      current_password: currentPassword,
      new_password: newPassword,
    }),
  })
}
