/**
 * adminStore — persistence for the Winshot Photography admin portal.
 *
 * Browser-only (localStorage), namespaced by SITE_KEY, all access funnelled
 * through this one module so it can later be swapped for a shared backend
 * (the multi-tenant WaaS / hosting step) without touching the admin UI.
 *
 * Limitation: inquiries save on the browser where the booking form was
 * submitted, so a real client's inquiry lands in their browser, not the
 * studio's. That's why bookings also hand off to Formspree, WhatsApp and
 * Google Calendar today. Cross-device capture comes with the backend.
 */

export const SITE_KEY = 'winshot';
const NS = `eko_waas:${SITE_KEY}`;
const INQUIRIES_KEY = `${NS}:inquiries`;
const AUTH_KEY = `${NS}:auth`;
const SESSION_KEY = `${NS}:session`;

export const DEFAULT_ADMIN_PASSWORD = 'winshot2026';

export type InquiryStatus = 'new' | 'contacted' | 'booked' | 'archived';

export interface StoredInquiry {
  id: string;
  createdAt: string;
  status: InquiryStatus;
  fullName: string;
  email: string;
  phone: string;
  serviceType: string;
  packageTier?: string;
  preferredDate?: string;
  isDateFlexible?: boolean;
  location?: string;
  guestCount?: string;
  budgetRange?: string;
  preferredContact?: string;
  creativeNotes?: string;
  source?: string;
}

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function listInquiries(): StoredInquiry[] {
  const items = safeParse<StoredInquiry[]>(localStorage.getItem(INQUIRIES_KEY), []);
  return [...items].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export function saveInquiry(data: Omit<StoredInquiry, 'id' | 'createdAt' | 'status'>): StoredInquiry {
  const record: StoredInquiry = {
    ...data,
    id:
      typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `inq_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
    status: 'new',
  };
  const all = safeParse<StoredInquiry[]>(localStorage.getItem(INQUIRIES_KEY), []);
  all.push(record);
  try {
    localStorage.setItem(INQUIRIES_KEY, JSON.stringify(all));
  } catch (err) {
    console.error('Failed to persist inquiry', err);
  }
  return record;
}

export function updateInquiry(id: string, patch: Partial<StoredInquiry>): void {
  const all = safeParse<StoredInquiry[]>(localStorage.getItem(INQUIRIES_KEY), []);
  localStorage.setItem(INQUIRIES_KEY, JSON.stringify(all.map((i) => (i.id === id ? { ...i, ...patch } : i))));
}

export function deleteInquiry(id: string): void {
  const all = safeParse<StoredInquiry[]>(localStorage.getItem(INQUIRIES_KEY), []);
  localStorage.setItem(INQUIRIES_KEY, JSON.stringify(all.filter((i) => i.id !== id)));
}

export function inquiriesToCSV(items: StoredInquiry[]): string {
  const cols: (keyof StoredInquiry)[] = [
    'createdAt', 'status', 'fullName', 'email', 'phone', 'serviceType', 'packageTier',
    'preferredDate', 'location', 'guestCount', 'budgetRange', 'preferredContact', 'creativeNotes',
  ];
  const esc = (v: unknown) => `"${(v == null ? '' : String(v)).replace(/"/g, '""')}"`;
  return [cols.join(','), ...items.map((i) => cols.map((c) => esc(i[c])).join(','))].join('\n');
}

/* ------------------------------- Auth ------------------------------- */

async function sha256(text: string): Promise<string> {
  const data = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, '0')).join('');
}

async function ensureAuth(): Promise<{ passwordHash: string }> {
  const existing = safeParse<{ passwordHash: string } | null>(localStorage.getItem(AUTH_KEY), null);
  if (existing?.passwordHash) return existing;
  const cfg = { passwordHash: await sha256(DEFAULT_ADMIN_PASSWORD) };
  localStorage.setItem(AUTH_KEY, JSON.stringify(cfg));
  return cfg;
}

export async function isUsingDefaultPassword(): Promise<boolean> {
  const cfg = await ensureAuth();
  return cfg.passwordHash === (await sha256(DEFAULT_ADMIN_PASSWORD));
}

export async function verifyPassword(password: string): Promise<boolean> {
  const cfg = await ensureAuth();
  return cfg.passwordHash === (await sha256(password));
}

export async function setPassword(newPassword: string): Promise<void> {
  localStorage.setItem(AUTH_KEY, JSON.stringify({ passwordHash: await sha256(newPassword) }));
}

/* ----------------------------- Session ------------------------------ */

export function startSession(): void {
  sessionStorage.setItem(SESSION_KEY, String(Date.now()));
}
export function endSession(): void {
  sessionStorage.removeItem(SESSION_KEY);
}
export function hasSession(): boolean {
  return !!sessionStorage.getItem(SESSION_KEY);
}
