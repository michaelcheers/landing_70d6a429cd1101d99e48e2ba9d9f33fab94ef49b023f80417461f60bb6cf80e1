const CITY_SUBDOMAINS = ["calgary", "edmonton", "ottawa", "vancouver"];
function detectCity() {
  const host = (typeof location !== "undefined" ? location.hostname : "") || "";
  for (const city of CITY_SUBDOMAINS) {
    if (host.startsWith(city + ".")) return city;
  }
  return null;
}
function applySubdomainRewrite(pathWithSearch) {
  const city = detectCity();
  if (!city) {
    const [p2, q2] = splitPathQuery(pathWithSearch);
    if (p2 === "/toronto") return "/" + (q2 ? q2 : "");
    if (p2.startsWith("/toronto/")) return p2.replace("/toronto", "") + (q2 ? q2 : "");
    return pathWithSearch;
  }
  const [p, q] = splitPathQuery(pathWithSearch);
  if (p === "/" || p === "") return "/" + city + (q ? q : "");
  if (p.startsWith("/" + city)) return pathWithSearch;
  return "/" + city + p + (q ? q : "");
}
function splitPathQuery(s) {
  const i = s.indexOf("?");
  if (i < 0) return [s, ""];
  return [s.slice(0, i), s.slice(i)];
}
export {
  applySubdomainRewrite,
  detectCity
};
