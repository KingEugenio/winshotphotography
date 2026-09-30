/**
 * tenantStore — Supabase-aware layer for winshot, mirroring freddieshotit's
 * pattern exactly. Every function is async and safe whether or not this
 * deployment is connected to the EKO PIXELS platform.
 */

import { supabase, isSupabaseConfigured, TENANT_ID } from './supabaseClient';
import {
  listInquiries as localListInquiries,
  saveInquiry as localSaveInquiry,
  updateInquiry as localUpdateInquiry,
  deleteInquiry as localDeleteInquiry,
  type StoredInquiry,
  type InquiryStatus,
} from './adminStore';
import { baseSiteSettings } from '../data/portfolioData';
import type { SiteSettings } from '../types';

export { isSupabaseConfigured };

/* ------------------------------------------------------------------ */
/* Bookings / inquiries                                                */
/* ------------------------------------------------------------------ */

function rowToStoredInquiry(row: any): StoredInquiry {
  return {
    id: row.id,
    createdAt: row.created_at,
    status: row.status,
    fullName: row.full_name,
    email: row.email,
    phone: row.phone,
    serviceType: row.service,
    packageTier: row.package_tier,
    preferredDate: row.preferred_date || undefined,
    location: row.location,
    budgetRange: row.budget_range,
    creativeNotes: row.notes,
    ...row.details, // isDateFlexible, guestCount, preferredContact, source
  };
}

/** Submit a booking. Public — no login required. */
export async function submitBooking(inquiry: Omit<StoredInquiry, 'id' | 'createdAt' | 'status'>): Promise<StoredInquiry> {
  if (!isSupabaseConfigured) {
    return localSaveInquiry(inquiry);
  }

  const { isDateFlexible, guestCount, preferredContact, source, ...rest } = inquiry as any;

  const { data, error } = await supabase
    .from('bookings')
    .insert({
      tenant_id: TENANT_ID,
      full_name: inquiry.fullName,
      email: inquiry.email,
      phone: inquiry.phone,
      service: inquiry.serviceType,
      package_tier: inquiry.packageTier,
      preferred_date: inquiry.preferredDate || null,
      location: inquiry.location,
      budget_range: inquiry.budgetRange,
      notes: inquiry.creativeNotes,
      source: source || 'winshot',
      status: 'new',
      details: { isDateFlexible, guestCount, preferredContact, ...rest },
    })
    .select()
    .single();

  if (error || !data) {
    console.error('Supabase booking insert failed, falling back to local save', error);
    return localSaveInquiry(inquiry);
  }
  return rowToStoredInquiry(data);
}

export async function fetchBookings(): Promise<StoredInquiry[]> {
  if (!isSupabaseConfigured) return localListInquiries();

  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('tenant_id', TENANT_ID)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Supabase booking fetch failed, falling back to local list', error);
    return localListInquiries();
  }
  return (data || []).map(rowToStoredInquiry);
}

export async function updateBookingStatus(id: string, status: InquiryStatus): Promise<void> {
  if (!isSupabaseConfigured) {
    localUpdateInquiry(id, { status });
    return;
  }
  const { error } = await supabase.from('bookings').update({ status }).eq('id', id);
  if (error) console.error('Supabase booking status update failed', error);
}

export async function removeBooking(id: string): Promise<void> {
  if (!isSupabaseConfigured) {
    localDeleteInquiry(id);
    return;
  }
  const { error } = await supabase.from('bookings').delete().eq('id', id);
  if (error) console.error('Supabase booking delete failed', error);
}

/* ------------------------------------------------------------------ */
/* Site settings                                                       */
/* ------------------------------------------------------------------ */

export async function fetchTenantSettings(localDefaults: SiteSettings): Promise<SiteSettings> {
  if (!isSupabaseConfigured) return localDefaults;

  const { data, error } = await supabase.from('tenants').select('settings').eq('id', TENANT_ID).maybeSingle();
  if (error || !data?.settings || Object.keys(data.settings).length === 0) {
    return localDefaults;
  }
  return { ...baseSiteSettings, ...localDefaults, ...(data.settings as Partial<SiteSettings>) };
}

export async function saveTenantSettings(settings: SiteSettings): Promise<boolean> {
  if (!isSupabaseConfigured) return true;
  const { error } = await supabase.from('tenants').update({ settings }).eq('id', TENANT_ID);
  if (error) {
    console.error('Supabase settings save failed', error);
    return false;
  }
  return true;
}
