// Service1 CRM heartbeat tracker for Moving Papa Vancouver pages.
// On /vancouver/* routes:
//   1. Posts to /api/bookings/anon-start to create a Service1 anonymous Customer
//      and obtain a portalToken.
//   2. Sends /api/lead-tracking/heartbeat every 15s while the tab is open
//      (the Service1 CRM dashboard shows the visitor as "LeadIn" / "CxLive" in real time).
//   3. Sends /api/lead-tracking/drop when the user navigates away or hides the tab.
// Token is stored in sessionStorage so it's reused across internal /vancouver page
// navigations (no duplicate anon Customer per page).

import { useEffect, useRef } from 'react';
import { usePathname } from "/src/router/Router.jsx";

const SERVICE1_API_BASE = 'https://helloservice1.com';
const SERVICE1_COMPANY_ID = 23; // Moving Papa's Service1 company id (matches /api/finalstep route)
const HEARTBEAT_INTERVAL_MS = 15000;
const TOKEN_STORAGE_KEY = 'mp_vancouver_s1_token';
const SESSION_STORAGE_KEY = 'mp_vancouver_s1_session';

function readStored(key: string): string | null {
  try {
    return sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStored(key: string, value: string): void {
  try {
    sessionStorage.setItem(key, value);
  } catch {
    // Ignore — Safari in private mode, etc.
  }
}

function newSessionId(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

async function startAnonSession(sessionId: string): Promise<string | null> {
  try {
    const params = new URLSearchParams(window.location.search);
    const res = await fetch(SERVICE1_API_BASE + '/api/bookings/anon-start', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        companyId: SERVICE1_COMPANY_ID,
        sessionId,
        pageUrl: window.location.href,
        referrerUrl: document.referrer || null,
        utmSource: params.get('utm_source'),
        utmMedium: params.get('utm_medium'),
        utmCampaign: params.get('utm_campaign'),
      }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return (data && typeof data.portalToken === 'string') ? data.portalToken : null;
  } catch {
    return null;
  }
}

function sendHeartbeat(portalToken: string, sessionId: string): void {
  fetch(SERVICE1_API_BASE + '/api/lead-tracking/heartbeat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      portalToken,
      sessionId,
      pageUrl: window.location.href,
    }),
    keepalive: true,
  }).catch(() => {});
}

function sendDrop(portalToken: string, sessionId: string, reason: string): void {
  const body = JSON.stringify({ portalToken, sessionId, reason });
  const url = SERVICE1_API_BASE + '/api/lead-tracking/drop';
  if (navigator.sendBeacon) {
    const blob = new Blob([body], { type: 'application/json' });
    navigator.sendBeacon(url, blob);
  } else {
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
      keepalive: true,
    }).catch(() => {});
  }
}

export default function VancouverHeartbeatTracker(): null {
  const pathname = usePathname();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const tokenRef = useRef<string | null>(null);
  const sessionRef = useRef<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const isVancouver = pathname != null && pathname.startsWith('/vancouver');
    if (!isVancouver) return;

    let cancelled = false;

    const init = async () => {
      // Reuse an existing session/token across internal /vancouver navigations.
      let sessionId = readStored(SESSION_STORAGE_KEY);
      if (!sessionId) {
        sessionId = newSessionId();
        writeStored(SESSION_STORAGE_KEY, sessionId);
      }
      sessionRef.current = sessionId;

      let token = readStored(TOKEN_STORAGE_KEY);
      if (!token) {
        token = await startAnonSession(sessionId);
        if (token) writeStored(TOKEN_STORAGE_KEY, token);
      }

      if (cancelled || !token) return;

      tokenRef.current = token;

      // Fire one immediately so the server sees page-change activity,
      // then poll at HEARTBEAT_INTERVAL_MS.
      sendHeartbeat(token, sessionId);
      intervalRef.current = setInterval(() => {
        if (tokenRef.current && sessionRef.current) {
          sendHeartbeat(tokenRef.current, sessionRef.current);
        }
      }, HEARTBEAT_INTERVAL_MS);
    };

    const handleUnload = () => {
      if (tokenRef.current && sessionRef.current) {
        sendDrop(tokenRef.current, sessionRef.current, 'tab_closed');
      }
    };

    const handleVisibility = () => {
      if (document.visibilityState === 'hidden'
          && tokenRef.current && sessionRef.current) {
        sendDrop(tokenRef.current, sessionRef.current, 'tab_hidden');
      }
    };

    window.addEventListener('beforeunload', handleUnload);
    document.addEventListener('visibilitychange', handleVisibility);

    void init();

    return () => {
      cancelled = true;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      window.removeEventListener('beforeunload', handleUnload);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [pathname]);

  return null;
}
