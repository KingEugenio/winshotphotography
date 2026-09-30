import React, { useEffect, useMemo, useState } from 'react';
import {
  Lock, Loader2, Eye, EyeOff, LayoutDashboard, Inbox, Settings as SettingsIcon,
  UserCog, LogOut, Menu, X, Download, RefreshCw, Trash2, ChevronDown, Mail,
  Save, Check, KeyRound, ShieldAlert, ExternalLink, Calendar,
} from 'lucide-react';
import { WhatsAppIcon } from '../components/common/WhatsAppIcon';
import {
  verifyPassword, setPassword, isUsingDefaultPassword, startSession, endSession, hasSession,
  DEFAULT_ADMIN_PASSWORD, inquiriesToCSV, type StoredInquiry, type InquiryStatus,
} from '../lib/adminStore';
import { fetchBookings, updateBookingStatus, removeBooking, fetchTenantSettings, saveTenantSettings, isSupabaseConfigured } from '../lib/tenantStore';
import { supabase } from '../lib/supabaseClient';
import {
  siteSettings, baseSiteSettings, saveSettingsOverlay, resetSettingsOverlay,
} from '../data/portfolioData';
import { generateGoogleCalendarUrl, downloadICS } from '../lib/calendarUtils';
import type { SiteSettings } from '../types';

type SectionKey = 'dashboard' | 'inquiries' | 'settings' | 'account';

const STATUS_META: Record<InquiryStatus, { label: string; cls: string }> = {
  new: { label: 'New', cls: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
  contacted: { label: 'Contacted', cls: 'bg-amber-100 text-amber-800 border-amber-300' },
  booked: { label: 'Booked', cls: 'bg-sky-100 text-sky-800 border-sky-300' },
  archived: { label: 'Archived', cls: 'bg-neutral-100 text-neutral-600 border-neutral-300' },
};

/* =========================== Login =========================== */

const AdminLogin: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPw] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    if (isSupabaseConfigured) {
      const { error: authErr } = await supabase.auth.signInWithPassword({ email, password });
      setBusy(false);
      if (!authErr) {
        onLogin();
      } else {
        setError('Incorrect email or password.');
        setPw('');
      }
      return;
    }
    const ok = await verifyPassword(password);
    setBusy(false);
    if (ok) {
      startSession();
      onLogin();
    } else {
      setError('Incorrect password. Please try again.');
      setPw('');
    }
  };

  const canSubmit = isSupabaseConfigured ? !!email && !!password : !!password;

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <span className="block font-display text-xl uppercase tracking-[0.2em] text-black font-bold">
            {siteSettings.brandTitle}
          </span>
          <span className="block text-[10px] tracking-[0.3em] uppercase text-neutral-500 font-mono mt-2">
            Studio Admin Portal
          </span>
        </div>
        <div className="bg-white border border-neutral-300 p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <Lock size={16} />
            <h1 className="text-sm font-display uppercase tracking-widest font-bold">Sign in</h1>
          </div>
          <form onSubmit={submit} className="space-y-5" noValidate>
            {isSupabaseConfigured && (
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-600 mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); if (error) setError(''); }}
                  autoFocus
                  className="w-full bg-white border border-neutral-300 px-4 py-3 text-sm focus:border-black outline-none"
                  placeholder="you@example.com"
                />
              </div>
            )}
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-600 mb-2">Password</label>
              <div className="relative">
                <input
                  type={show ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setPw(e.target.value); if (error) setError(''); }}
                  autoFocus={!isSupabaseConfigured}
                  className="w-full bg-white border border-neutral-300 px-4 py-3 pr-11 text-sm focus:border-black outline-none"
                  placeholder="Enter admin password"
                />
                <button type="button" onClick={() => setShow((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-black cursor-pointer">
                  {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {error && <p className="text-[11px] text-rose-600 mt-2 font-mono">{error}</p>}
            </div>
            <button type="submit" disabled={busy || !canSubmit}
              className="w-full flex items-center justify-center gap-2 bg-black text-white py-3 text-xs uppercase tracking-[0.2em] font-semibold hover:bg-neutral-800 cursor-pointer disabled:opacity-50">
              {busy ? <Loader2 size={16} className="animate-spin" /> : null}
              {busy ? 'Checking…' : 'Enter Portal'}
            </button>
          </form>
          {!isSupabaseConfigured && (
            <p className="mt-6 text-[10px] leading-relaxed text-neutral-500 font-mono border-t border-neutral-200 pt-4">
              Default password: <span className="text-black">{DEFAULT_ADMIN_PASSWORD}</span><br />
              Change it under Account after signing in.
            </p>
          )}
          {isSupabaseConfigured && (
            <p className="mt-6 text-[10px] leading-relaxed text-neutral-500 font-mono border-t border-neutral-200 pt-4">
              This site is connected to the EKO PIXELS platform. Use the login sent to you when your account was created.
            </p>
          )}
        </div>
        <a href="#" className="mt-6 mx-auto flex w-fit items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-neutral-500 hover:text-black">
          ← Back to website
        </a>
      </div>
    </div>
  );
};

/* =========================== Dashboard =========================== */

const Dashboard: React.FC<{ onGo: (s: SectionKey) => void }> = ({ onGo }) => {
  const [inquiries, setInquiries] = useState<StoredInquiry[]>([]);
  useEffect(() => { fetchBookings().then(setInquiries); }, []);
  const now = new Date();
  const thisMonth = inquiries.filter((i) => {
    const d = new Date(i.createdAt);
    return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
  }).length;
  const stats = [
    { label: 'Total inquiries', value: inquiries.length },
    { label: 'New / unread', value: inquiries.filter((i) => i.status === 'new').length },
    { label: 'Booked', value: inquiries.filter((i) => i.status === 'booked').length },
    { label: 'This month', value: thisMonth },
  ];
  const recent = inquiries.slice(0, 5);

  return (
    <div>
      <Head title="Dashboard" sub={`Overview of ${siteSettings.brandTitle}.`} />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="bg-white border border-neutral-300 p-4">
            <p className="text-3xl font-display font-bold leading-none">{s.value}</p>
            <p className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 mt-2">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="bg-white border border-neutral-300 p-5 sm:p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-600">Recent inquiries</h2>
          <button onClick={() => onGo('inquiries')} className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 hover:text-black cursor-pointer">View all →</button>
        </div>
        {recent.length === 0 ? (
          <p className="text-xs text-neutral-500 py-6 text-center">No inquiries yet. Leads from the booking form appear here.</p>
        ) : (
          <ul className="divide-y divide-neutral-200">
            {recent.map((i) => (
              <li key={i.id} className="py-3 flex items-center gap-3">
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-black truncate">{i.fullName || 'Unnamed'}</p>
                  <p className="text-[11px] text-neutral-500 truncate">{i.serviceType}{i.packageTier ? ` • ${i.packageTier}` : ''}</p>
                </div>
                <span className={`text-[10px] font-mono uppercase px-2 py-0.5 border ${STATUS_META[i.status].cls}`}>{STATUS_META[i.status].label}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

/* =========================== Inquiries =========================== */

const Inquiries: React.FC = () => {
  const [items, setItems] = useState<StoredInquiry[]>([]);
  const [filter, setFilter] = useState<InquiryStatus | 'all'>('all');
  const [expanded, setExpanded] = useState<string | null>(null);
  const refresh = async () => setItems(await fetchBookings());
  useEffect(() => { refresh(); }, []);
  const filtered = filter === 'all' ? items : items.filter((i) => i.status === filter);

  const exportCSV = () => {
    const blob = new Blob([inquiriesToCSV(items)], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `winshot-inquiries-${new Date().toISOString().split('T')[0]}.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  const filters: (InquiryStatus | 'all')[] = ['all', 'new', 'contacted', 'booked', 'archived'];

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold tracking-wider">INQUIRIES</h1>
          <p className="text-xs text-neutral-500 mt-1">Booking leads captured from the website.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={refresh} className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase border border-neutral-300 px-3 py-2 text-neutral-600 hover:text-black cursor-pointer"><RefreshCw size={13} /> Refresh</button>
          <button onClick={exportCSV} disabled={!items.length} className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase border border-neutral-300 px-3 py-2 text-neutral-600 hover:text-black cursor-pointer disabled:opacity-40"><Download size={13} /> CSV</button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {filters.map((f) => {
          const count = f === 'all' ? items.length : items.filter((i) => i.status === f).length;
          return (
            <button key={f} onClick={() => setFilter(f)}
              className={`text-[11px] font-mono uppercase px-3 py-1.5 border cursor-pointer ${filter === f ? 'bg-black text-white border-black' : 'border-neutral-300 text-neutral-600 hover:text-black'}`}>
              {f} ({count})
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white border border-dashed border-neutral-300 p-10 text-center">
          <Inbox size={26} className="mx-auto text-neutral-400 mb-3" />
          <p className="text-sm text-black font-medium">No inquiries here yet.</p>
          <p className="text-xs text-neutral-500 mt-2">Submit a test booking on the site to see the loop working.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((i) => (
            <InquiryCard key={i.id} inquiry={i}
              expanded={expanded === i.id}
              onToggle={() => setExpanded(expanded === i.id ? null : i.id)}
              onStatus={(s) => { setItems((prev) => prev.map((it) => it.id === i.id ? { ...it, status: s } : it)); updateBookingStatus(i.id, s); }}
              onDelete={() => { if (confirm('Delete this inquiry?')) { setItems((prev) => prev.filter((it) => it.id !== i.id)); removeBooking(i.id); } }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const InquiryCard: React.FC<{
  inquiry: StoredInquiry; expanded: boolean; onToggle: () => void;
  onStatus: (s: InquiryStatus) => void; onDelete: () => void;
}> = ({ inquiry, expanded, onToggle, onStatus, onDelete }) => {
  const waNumber = (inquiry.phone || '').replace(/[^0-9]/g, '');
  const wa = waNumber ? `https://wa.me/${waNumber.startsWith('0') ? '233' + waNumber.slice(1) : waNumber}` : undefined;
  const gcal = generateGoogleCalendarUrl({
    service: inquiry.serviceType, packageTier: inquiry.packageTier, date: inquiry.preferredDate || '',
    location: inquiry.location || '', clientName: inquiry.fullName, clientEmail: inquiry.email,
    clientPhone: inquiry.phone, notes: inquiry.creativeNotes, studioName: siteSettings.brandTitle, studioEmail: siteSettings.contactEmail,
  });

  return (
    <div className="bg-white border border-neutral-300">
      <div className="flex items-start gap-3 p-4">
        <button onClick={onToggle} className="flex-1 text-left cursor-pointer min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-semibold text-black truncate">{inquiry.fullName || 'Unnamed inquiry'}</span>
            <span className={`text-[10px] font-mono uppercase px-2 py-0.5 border ${STATUS_META[inquiry.status].cls}`}>{STATUS_META[inquiry.status].label}</span>
          </div>
          <p className="text-xs text-neutral-500 mt-1 truncate">
            {inquiry.serviceType}{inquiry.packageTier ? ` • ${inquiry.packageTier}` : ''}{inquiry.preferredDate ? ` • ${inquiry.preferredDate}` : ''}
          </p>
          <p className="text-[10px] text-neutral-400 font-mono mt-1">{new Date(inquiry.createdAt).toLocaleString()}</p>
        </button>
        <ChevronDown size={18} onClick={onToggle} className={`shrink-0 mt-1 text-neutral-400 cursor-pointer transition-transform ${expanded ? 'rotate-180' : ''}`} />
      </div>

      {expanded && (
        <div className="border-t border-neutral-200 p-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-xs">
            <F label="Email" v={inquiry.email} />
            <F label="Phone" v={inquiry.phone} />
            <F label="Location" v={inquiry.location} />
            <F label="Budget" v={inquiry.budgetRange} />
            <F label="Preferred contact" v={inquiry.preferredContact} />
            <F label="Guests" v={inquiry.guestCount} />
          </div>
          {inquiry.creativeNotes && (
            <div>
              <p className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 mb-1">Notes</p>
              <p className="text-xs text-black leading-relaxed whitespace-pre-wrap">{inquiry.creativeNotes}</p>
            </div>
          )}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-neutral-200">
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 mr-1">Status:</span>
            {(Object.keys(STATUS_META) as InquiryStatus[]).map((s) => (
              <button key={s} onClick={() => onStatus(s)}
                className={`text-[10px] font-mono uppercase px-2.5 py-1 border cursor-pointer ${inquiry.status === s ? STATUS_META[s].cls : 'border-neutral-300 text-neutral-500 hover:text-black'}`}>
                {STATUS_META[s].label}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <a href={gcal} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase border border-neutral-300 px-3 py-2 text-neutral-700 hover:bg-neutral-50 cursor-pointer"><Calendar size={13} /> Google Calendar</a>
            {wa && <a href={wa} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase border border-neutral-300 px-3 py-2 text-emerald-700 hover:bg-neutral-50 cursor-pointer"><WhatsAppIcon className="w-3.5 h-3.5" /> WhatsApp</a>}
            {inquiry.email && <a href={`mailto:${inquiry.email}`} className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase border border-neutral-300 px-3 py-2 text-neutral-600 hover:text-black cursor-pointer"><Mail size={13} /> Email</a>}
            <button onClick={onDelete} className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase border border-neutral-300 px-3 py-2 text-rose-600 hover:bg-rose-50 cursor-pointer ml-auto"><Trash2 size={13} /> Delete</button>
          </div>
        </div>
      )}
    </div>
  );
};

const F: React.FC<{ label: string; v?: string }> = ({ label, v }) =>
  v ? (<div><p className="text-[10px] font-mono uppercase tracking-wider text-neutral-500">{label}</p><p className="text-black break-words">{v}</p></div>) : null;

/* =========================== Settings =========================== */

const SETTINGS_FIELDS: { key: keyof SiteSettings; label: string; area?: boolean }[] = [
  { key: 'photographerName', label: 'Photographer name' },
  { key: 'brandTitle', label: 'Brand title' },
  { key: 'tagline', label: 'Tagline' },
  { key: 'availabilityNotice', label: 'Availability notice' },
  { key: 'statement', label: 'Statement', area: true },
  { key: 'contactEmail', label: 'Contact email' },
  { key: 'phoneNumber', label: 'Phone number' },
  { key: 'whatsappNumber', label: 'WhatsApp number' },
  { key: 'whatsappUrl', label: 'WhatsApp URL' },
  { key: 'studioAddress', label: 'Studio address' },
  { key: 'instagramHandle', label: 'Instagram handle' },
  { key: 'instagramUrl', label: 'Instagram URL' },
  { key: 'tiktokHandle', label: 'TikTok handle' },
  { key: 'tiktokUrl', label: 'TikTok URL' },
  { key: 'facebookHandle', label: 'Facebook handle' },
  { key: 'facebookUrl', label: 'Facebook URL' },
];

const Settings: React.FC = () => {
  const [draft, setDraft] = useState<SiteSettings>({ ...siteSettings });
  const [saved, setSaved] = useState(false);
  const dirty = SETTINGS_FIELDS.some((f) => draft[f.key] !== siteSettings[f.key]);

  const save = () => {
    saveSettingsOverlay(draft);
    saveTenantSettings(draft).catch((err) => console.error('Failed to sync settings to Supabase', err));
    setSaved(true);
    setTimeout(() => window.location.reload(), 700);
  };
  const reset = () => {
    if (!confirm('Reset all settings to defaults?')) return;
    resetSettingsOverlay();
    saveTenantSettings(baseSiteSettings).catch((err) => console.error('Failed to reset settings on Supabase', err));
    window.location.reload();
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold tracking-wider">SITE SETTINGS</h1>
          <p className="text-xs text-neutral-500 mt-1">Brand details, contact info and social links. Changes apply after a reload.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={reset} className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase border border-neutral-300 px-3 py-2 text-neutral-600 hover:text-black cursor-pointer">Reset</button>
          <button onClick={save} disabled={!dirty} className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase bg-black text-white px-4 py-2 hover:bg-neutral-800 cursor-pointer disabled:opacity-40">
            {saved ? <Check size={13} /> : <Save size={13} />}{saved ? 'Saved' : 'Save'}
          </button>
        </div>
      </div>
      <div className="bg-white border border-neutral-300 p-5 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
          {SETTINGS_FIELDS.map((f) => (
            <div key={String(f.key)} className={f.area ? 'sm:col-span-2' : ''}>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-600 mb-1.5">{f.label}</label>
              {f.area ? (
                <textarea rows={2} value={String(draft[f.key] ?? '')} onChange={(e) => { setDraft({ ...draft, [f.key]: e.target.value }); setSaved(false); }}
                  className="w-full bg-white border border-neutral-300 px-3 py-2 text-sm focus:border-black outline-none resize-y" />
              ) : (
                <input type="text" value={String(draft[f.key] ?? '')} onChange={(e) => { setDraft({ ...draft, [f.key]: e.target.value }); setSaved(false); }}
                  className="w-full bg-white border border-neutral-300 px-3 py-2 text-sm focus:border-black outline-none" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* =========================== Account =========================== */

const Account: React.FC = () => {
  const [current, setCurrent] = useState(''); const [next, setNext] = useState(''); const [confirmPw, setConfirmPw] = useState('');
  const [msg, setMsg] = useState<{ t: 'ok' | 'err'; m: string } | null>(null);
  const [busy, setBusy] = useState(false); const [usingDefault, setUsingDefault] = useState(false);
  useEffect(() => { isUsingDefaultPassword().then(setUsingDefault); }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setMsg(null);
    if (next.length < 6) return setMsg({ t: 'err', m: 'New password must be at least 6 characters.' });
    if (next !== confirmPw) return setMsg({ t: 'err', m: 'Passwords do not match.' });
    setBusy(true);
    if (!(await verifyPassword(current))) { setBusy(false); return setMsg({ t: 'err', m: 'Current password is incorrect.' }); }
    await setPassword(next); setBusy(false); setCurrent(''); setNext(''); setConfirmPw('');
    setUsingDefault(await isUsingDefaultPassword());
    setMsg({ t: 'ok', m: 'Password updated successfully.' });
  };
  const input = 'w-full bg-white border border-neutral-300 px-3 py-2.5 text-sm focus:border-black outline-none';

  return (
    <div>
      <Head title="Account" sub="Manage your admin sign-in credentials." />
      {usingDefault && (
        <div className="flex items-start gap-3 bg-amber-50 border border-amber-300 p-4 mb-6">
          <ShieldAlert size={18} className="text-amber-600 shrink-0 mt-0.5" />
          <div><p className="text-sm font-medium">You're still using the default password.</p>
            <p className="text-xs text-neutral-600 mt-1">Change it from <span className="font-mono">{DEFAULT_ADMIN_PASSWORD}</span> to something private.</p></div>
        </div>
      )}
      <div className="bg-white border border-neutral-300 p-5 sm:p-6 max-w-md">
        <div className="flex items-center gap-2 mb-5"><KeyRound size={15} /><h2 className="text-[11px] font-mono uppercase tracking-[0.2em] font-bold">Change password</h2></div>
        <form onSubmit={submit} className="space-y-4" noValidate>
          <div><label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-600 mb-1.5">Current password</label><input type="password" value={current} onChange={(e) => setCurrent(e.target.value)} className={input} /></div>
          <div><label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-600 mb-1.5">New password</label><input type="password" value={next} onChange={(e) => setNext(e.target.value)} className={input} /></div>
          <div><label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-600 mb-1.5">Confirm new password</label><input type="password" value={confirmPw} onChange={(e) => setConfirmPw(e.target.value)} className={input} /></div>
          {msg && <div className={`flex items-center gap-2 text-xs font-mono ${msg.t === 'ok' ? 'text-emerald-600' : 'text-rose-600'}`}>{msg.t === 'ok' ? <Check size={14} /> : <ShieldAlert size={14} />}{msg.m}</div>}
          <button type="submit" disabled={busy || !current || !next || !confirmPw} className="w-full inline-flex items-center justify-center gap-2 bg-black text-white py-2.5 text-xs uppercase tracking-[0.2em] font-semibold hover:bg-neutral-800 cursor-pointer disabled:opacity-40">Update password</button>
        </form>
        <p className="mt-5 text-[10px] leading-relaxed text-neutral-500 font-mono border-t border-neutral-200 pt-4">Client-side gate stored in your browser. Server-verified login arrives with the backend step.</p>
      </div>
    </div>
  );
};

const Head: React.FC<{ title: string; sub: string }> = ({ title, sub }) => (
  <div className="mb-6"><h1 className="text-2xl sm:text-3xl font-display font-bold tracking-wider uppercase">{title}</h1><p className="text-xs text-neutral-500 mt-1">{sub}</p></div>
);

/* =========================== Shell =========================== */

const NAV: { key: SectionKey; label: string; icon: React.ElementType }[] = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'inquiries', label: 'Inquiries', icon: Inbox },
  { key: 'settings', label: 'Site Settings', icon: SettingsIcon },
  { key: 'account', label: 'Account', icon: UserCog },
];

export const AdminApp: React.FC = () => {
  const [authed, setAuthed] = useState<boolean>(() => (isSupabaseConfigured ? false : hasSession()));
  const [checked, setChecked] = useState(!isSupabaseConfigured);
  const [section, setSection] = useState<SectionKey>('dashboard');
  const [mobileNav, setMobileNav] = useState(false);

  useEffect(() => { window.scrollTo({ top: 0 }); }, [section]);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    supabase.auth.getSession().then(({ data }) => { setAuthed(!!data.session); setChecked(true); });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => setAuthed(!!session));
    return () => sub.subscription.unsubscribe();
  }, []);

  if (isSupabaseConfigured && !checked) return null;
  if (!authed) return <AdminLogin onLogin={() => setAuthed(true)} />;

  const go = (k: SectionKey) => { setSection(k); setMobileNav(false); };
  const backToSite = () => { window.location.hash = ''; window.location.reload(); };
  const logout = () => { if (isSupabaseConfigured) { supabase.auth.signOut(); } else { endSession(); } setAuthed(false); };

  const NavList = (
    <nav className="flex flex-col gap-1">
      {NAV.map((item) => (
        <button key={item.key} onClick={() => go(item.key)}
          className={`flex items-center gap-3 px-4 py-2.5 text-xs uppercase tracking-wider font-mono cursor-pointer text-left ${section === item.key ? 'bg-black text-white' : 'text-neutral-600 hover:text-black hover:bg-neutral-100'}`}>
          <item.icon size={16} />{item.label}
        </button>
      ))}
    </nav>
  );

  return (
    <div className="min-h-screen bg-neutral-50 text-black flex">
      <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r border-neutral-300 bg-white sticky top-0 h-screen">
        <div className="px-6 py-6 border-b border-neutral-200">
          <span className="block font-display text-base uppercase tracking-[0.15em] font-bold">{siteSettings.brandTitle}</span>
          <span className="block text-[9px] tracking-[0.3em] uppercase text-neutral-500 font-mono mt-1">Studio Admin</span>
        </div>
        <div className="flex-1 py-4 px-2 overflow-y-auto">{NavList}</div>
        <div className="p-2 border-t border-neutral-200 space-y-1">
          <button onClick={backToSite} className="w-full flex items-center gap-3 px-4 py-2.5 text-xs uppercase tracking-wider font-mono text-neutral-600 hover:text-black cursor-pointer"><ExternalLink size={16} /> View site</button>
          <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-2.5 text-xs uppercase tracking-wider font-mono text-rose-600 hover:bg-rose-50 cursor-pointer"><LogOut size={16} /> Sign out</button>
        </div>
      </aside>

      <div className="lg:hidden fixed top-0 inset-x-0 z-40 flex items-center justify-between px-4 h-14 bg-white border-b border-neutral-300">
        <span className="font-display text-sm uppercase tracking-wider font-bold">{siteSettings.brandTitle} Admin</span>
        <button onClick={() => setMobileNav(true)} className="p-2 cursor-pointer"><Menu size={22} /></button>
      </div>
      {mobileNav && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileNav(false)} />
          <div className="relative ml-auto w-72 max-w-[85%] h-full bg-white border-l border-neutral-300 flex flex-col">
            <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-200"><span className="font-display text-sm uppercase font-bold">Menu</span><button onClick={() => setMobileNav(false)} className="p-1 cursor-pointer"><X size={20} /></button></div>
            <div className="flex-1 py-4 px-2 overflow-y-auto">{NavList}</div>
            <div className="p-2 border-t border-neutral-200 space-y-1">
              <button onClick={backToSite} className="w-full flex items-center gap-3 px-4 py-2.5 text-xs uppercase font-mono text-neutral-600 cursor-pointer"><ExternalLink size={16} /> View site</button>
              <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-2.5 text-xs uppercase font-mono text-rose-600 cursor-pointer"><LogOut size={16} /> Sign out</button>
            </div>
          </div>
        </div>
      )}

      <main className="flex-1 min-w-0 px-5 sm:px-8 py-8 pt-20 lg:pt-8 max-w-5xl mx-auto w-full">
        {section === 'dashboard' && <Dashboard onGo={go} />}
        {section === 'inquiries' && <Inquiries />}
        {section === 'settings' && <Settings />}
        {section === 'account' && <Account />}
      </main>
    </div>
  );
};
