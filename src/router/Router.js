import { jsx, jsxs } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useState, useMemo, useCallback } from "react";
import { ROUTES, matchRoute } from "/src/router/routes.js";
import { applySubdomainRewrite } from "/src/router/subdomain.js";
import Head from "/src/components/Head.js";
import Layout from "/src/components/Layout.js";
const SERVICE_SLUG_MAP = {
  residential: "local-move",
  packing: "packing",
  storage: "storage",
  warehouse: "warehouse-move",
  office: "office-move",
  specialEquipment: "special-equipment-move",
  art: "art-move",
  lastmile: "last-mile"
};
function legacyServiceAreaRedirect(pathname) {
  if (!pathname.startsWith("/service-area/")) return null;
  const parts = pathname.split("/");
  if (parts.length !== 4) return null;
  const city = parts[2];
  const oldService = parts[3];
  const newSlug = SERVICE_SLUG_MAP[oldService] || oldService;
  return "/service-areas/" + newSlug + "-" + city;
}
const RouterContext = createContext({
  pathname: "/",
  search: "",
  params: {},
  push: () => {
  },
  replace: () => {
  },
  back: () => {
  }
});
function useRouter() {
  const ctx = useContext(RouterContext);
  return {
    push: ctx.push,
    replace: ctx.replace,
    back: ctx.back,
    refresh: () => {
    },
    prefetch: () => {
    }
  };
}
function usePathname() {
  return useContext(RouterContext).pathname;
}
function useSearchParams() {
  const { search } = useContext(RouterContext);
  return useMemo(() => new URLSearchParams(search), [search]);
}
function useParams() {
  return useContext(RouterContext).params;
}
function Router() {
  const initialUrl = useMemo(() => {
    const rewritten = applySubdomainRewrite(location.pathname + location.search);
    if (rewritten && rewritten !== location.pathname + location.search) {
      history.replaceState(null, "", rewritten);
    }
    const legacy = legacyServiceAreaRedirect(location.pathname);
    if (legacy) {
      history.replaceState(null, "", legacy + location.search);
    }
    return location.pathname + location.search;
  }, []);
  const [url, setUrl] = useState(initialUrl);
  useEffect(() => {
    const onPop = () => setUrl(location.pathname + location.search);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [url]);
  const navigate = useCallback((to, replaceMode) => {
    let target = to;
    const legacy = legacyServiceAreaRedirect(target.split("?")[0]);
    if (legacy) {
      const qs = target.includes("?") ? target.slice(target.indexOf("?")) : "";
      target = legacy + qs;
    }
    if (replaceMode) history.replaceState(null, "", target);
    else history.pushState(null, "", target);
    setUrl(location.pathname + location.search);
  }, []);
  const pathname = url.split("?")[0];
  const search = url.includes("?") ? url.slice(url.indexOf("?")) : "";
  const match = useMemo(() => matchRoute(pathname), [pathname]);
  const PageComp = match ? match.route.component : ROUTES.notFound;
  const params = match ? match.params : {};
  const meta = match && match.route.meta ? match.route.meta : null;
  const ctxValue = useMemo(() => ({
    pathname,
    search,
    params,
    push: (to) => navigate(to, false),
    replace: (to) => navigate(to, true),
    back: () => history.back()
  }), [pathname, search, params, navigate]);
  return /* @__PURE__ */ jsxs(RouterContext.Provider, { value: ctxValue, children: [
    /* @__PURE__ */ jsx(Head, { meta, pathname }),
    /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsx(PageComp, { params }) })
  ] });
}
export {
  Router as default,
  useParams,
  usePathname,
  useRouter,
  useSearchParams
};
