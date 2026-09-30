/**
 * Google Calendar integration for Winshot Photography bookings.
 *
 * This is a client-side, no-OAuth integration: it builds a pre-filled Google
 * Calendar "create event" link and an .ics file the client (and photographer)
 * can add to any calendar app. True two-way auto-sync to the studio's own
 * Google Calendar requires OAuth + a backend, which is the later system step.
 */

export interface CalendarBooking {
  service: string;
  packageTier?: string;
  date: string; // YYYY-MM-DD (may be empty)
  location: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  notes?: string;
  studioName?: string;
  studioEmail?: string;
}

const DEFAULT_START = '090000';
const DEFAULT_END = '120000';

function safeDate(date: string): string {
  if (date && /^\d{4}-\d{2}-\d{2}$/.test(date)) return date.replace(/-/g, '');
  return new Date().toISOString().split('T')[0].replace(/-/g, '');
}

function buildTitle(b: CalendarBooking): string {
  const studio = b.studioName || 'Winshot Photography';
  const pkg = b.packageTier ? ` — ${b.packageTier}` : '';
  return `${studio}: ${b.service}${pkg}`;
}

function buildDescription(b: CalendarBooking): string {
  return [
    `Photography session with ${b.studioName || 'Winshot Photography'}.`,
    ``,
    `Service: ${b.service}`,
    b.packageTier ? `Package: ${b.packageTier}` : '',
    `Client: ${b.clientName}`,
    b.clientEmail ? `Email: ${b.clientEmail}` : '',
    b.clientPhone ? `Phone: ${b.clientPhone}` : '',
    b.notes ? `Notes: ${b.notes}` : '',
    ``,
    `This is a tentative booking hold. Winshot Photography will confirm final availability.`,
  ]
    .filter(Boolean)
    .join('\n');
}

/** Pre-filled Google Calendar event creation link. */
export function generateGoogleCalendarUrl(b: CalendarBooking): string {
  const day = safeDate(b.date);
  const dates = `${day}T${DEFAULT_START}/${day}T${DEFAULT_END}`;
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: buildTitle(b),
    dates,
    details: buildDescription(b),
    location: b.location || 'Studio (Accra)',
    ctz: 'Africa/Accra',
  });
  if (b.studioEmail) params.append('add', b.studioEmail);
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/** Build an .ics file body for the booking. */
export function generateICS(b: CalendarBooking): string {
  const day = safeDate(b.date);
  const dtStart = `${day}T${DEFAULT_START}`;
  const dtEnd = `${day}T${DEFAULT_END}`;
  const uid = `${Date.now()}@winshot-photography`;
  const stamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const esc = (s: string) => s.replace(/\\/g, '\\\\').replace(/,/g, '\\,').replace(/;/g, '\\;').replace(/\n/g, '\\n');

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Winshot Photography//Booking//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${esc(buildTitle(b))}`,
    `DESCRIPTION:${esc(buildDescription(b))}`,
    `LOCATION:${esc(b.location || 'Studio (Accra)')}`,
    b.studioEmail ? `ORGANIZER;CN=${esc(b.studioName || 'Winshot Photography')}:mailto:${b.studioEmail}` : '',
    b.clientEmail ? `ATTENDEE;CN=${esc(b.clientName)}:mailto:${b.clientEmail}` : '',
    'STATUS:TENTATIVE',
    'END:VEVENT',
    'END:VCALENDAR',
  ]
    .filter(Boolean)
    .join('\r\n');
}

/** Trigger a download of the .ics file. */
export function downloadICS(b: CalendarBooking): void {
  const blob = new Blob([generateICS(b)], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `winshot-booking-${safeDate(b.date)}.ics`;
  a.click();
  URL.revokeObjectURL(url);
}
