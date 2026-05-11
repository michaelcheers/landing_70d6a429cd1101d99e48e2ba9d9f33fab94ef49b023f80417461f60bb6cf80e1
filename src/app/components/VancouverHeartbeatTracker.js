import { useEffect, useRef } from "react";
import { usePathname } from "/src/router/Router.js";
const SERVICE1_API_BASE = "https://helloservice1.com";
const SERVICE1_COMPANY_ID = 23;
const HEARTBEAT_INTERVAL_MS = 15e3;
const TOKEN_STORAGE_KEY = "mp_vancouver_s1_token";
const SESSION_STORAGE_KEY = "mp_vancouver_s1_session";
function readStored(key) {
  try {
    return sessionStorage.getItem(key);
  } catch {
    return null;
  }
}
function writeStored(key, value) {
  try {
    sessionStorage.setItem(key, value);
  } catch {
  }
}
function newSessionId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}
async function startAnonSession(sessionId) {
  try {
    const params = new URLSearchParams(window.location.search);
    const res = await fetch(SERVICE1_API_BASE + "/api/bookings/anon-start", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        companyId: SERVICE1_COMPANY_ID,
        sessionId,
        pageUrl: window.location.href,
        referrerUrl: document.referrer || null,
        utmSource: params.get("utm_source"),
        utmMedium: params.get("utm_medium"),
        utmCampaign: params.get("utm_campaign")
      })
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data && typeof data.portalToken === "string" ? data.portalToken : null;
  } catch {
    return null;
  }
}
function sendHeartbeat(portalToken, sessionId) {
  fetch(SERVICE1_API_BASE + "/api/lead-tracking/heartbeat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      portalToken,
      sessionId,
      pageUrl: window.location.href
    }),
    keepalive: true
  }).catch(() => {
  });
}
function sendDrop(portalToken, sessionId, reason) {
  const body = JSON.stringify({ portalToken, sessionId, reason });
  const url = SERVICE1_API_BASE + "/api/lead-tracking/drop";
  if (navigator.sendBeacon) {
    const blob = new Blob([body], { type: "application/json" });
    navigator.sendBeacon(url, blob);
  } else {
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true
    }).catch(() => {
    });
  }
}
function VancouverHeartbeatTracker() {
  const pathname = usePathname();
  const intervalRef = useRef(null);
  const tokenRef = useRef(null);
  const sessionRef = useRef(null);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const isVancouver = pathname != null && pathname.startsWith("/vancouver");
    if (!isVancouver) return;
    let cancelled = false;
    const init = async () => {
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
      sendHeartbeat(token, sessionId);
      intervalRef.current = setInterval(() => {
        if (tokenRef.current && sessionRef.current) {
          sendHeartbeat(tokenRef.current, sessionRef.current);
        }
      }, HEARTBEAT_INTERVAL_MS);
    };
    const handleUnload = () => {
      if (tokenRef.current && sessionRef.current) {
        sendDrop(tokenRef.current, sessionRef.current, "tab_closed");
      }
    };
    const handleVisibility = () => {
      if (document.visibilityState === "hidden" && tokenRef.current && sessionRef.current) {
        sendDrop(tokenRef.current, sessionRef.current, "tab_hidden");
      }
    };
    window.addEventListener("beforeunload", handleUnload);
    document.addEventListener("visibilitychange", handleVisibility);
    void init();
    return () => {
      cancelled = true;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      window.removeEventListener("beforeunload", handleUnload);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [pathname]);
  return null;
}
export {
  VancouverHeartbeatTracker as default
};
