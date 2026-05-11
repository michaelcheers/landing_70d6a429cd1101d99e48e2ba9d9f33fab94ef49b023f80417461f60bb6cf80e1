const SERVICE_AREAS = {
  // Ontario Service Areas - Toronto Branch
  "toronto": {
    city: "Toronto",
    province: "ON",
    region: "City of Toronto",
    branch: "toronto",
    phone: "647-251-8188",
    coordinates: { lat: 43.2557, lng: -79.8711 },
    serviceRadius: 30,
    branchId: "b8164028-c730-4fc4-912c-b1f4016f1130"
  },
  "hamilton": {
    city: "Hamilton",
    province: "ON",
    region: "Golden Horseshoe",
    branch: "toronto",
    phone: "647-251-8188",
    coordinates: { lat: 43.2557, lng: -79.8711 },
    serviceRadius: 30,
    branchId: "842b7c75-275a-484a-86ed-b260010a7f19"
  },
  "oakville": {
    city: "Oakville",
    province: "ON",
    region: "Greater Toronto Area",
    branch: "toronto",
    phone: "647-251-8188",
    coordinates: { lat: 43.4675, lng: -79.6877 },
    serviceRadius: 20,
    branchId: "b8164028-c730-4fc4-912c-b1f4016f1130"
  },
  "barrie": {
    city: "Barrie",
    province: "ON",
    region: "Simcoe County",
    branch: "toronto",
    phone: "647-251-8188",
    coordinates: { lat: 44.3894, lng: -79.6903 },
    serviceRadius: 35,
    branchId: "b8164028-c730-4fc4-912c-b1f4016f1130"
  },
  "oshawa": {
    city: "Oshawa",
    province: "ON",
    region: "Durham Region",
    branch: "toronto",
    phone: "647-251-8188",
    coordinates: { lat: 43.8971, lng: -78.8658 },
    serviceRadius: 25,
    branchId: "b8164028-c730-4fc4-912c-b1f4016f1130"
  },
  "mississauga": {
    city: "Mississauga",
    province: "ON",
    region: "Greater Toronto Area",
    branch: "toronto",
    phone: "647-251-8188",
    coordinates: { lat: 43.589, lng: -79.6441 },
    serviceRadius: 25,
    branchId: "b8164028-c730-4fc4-912c-b1f4016f1130"
  },
  "pickering": {
    city: "Pickering",
    province: "ON",
    region: "Durham Region",
    branch: "toronto",
    phone: "647-251-8188",
    coordinates: { lat: 43.8384, lng: -79.0868 },
    serviceRadius: 20,
    branchId: "b8164028-c730-4fc4-912c-b1f4016f1130"
  },
  "vaughan": {
    city: "Vaughan",
    province: "ON",
    region: "Greater Toronto Area",
    branch: "toronto",
    phone: "647-251-8188",
    coordinates: { lat: 43.8361, lng: -79.4985 },
    serviceRadius: 25,
    branchId: "b8164028-c730-4fc4-912c-b1f4016f1130"
  },
  "scarborough": {
    city: "Scarborough",
    province: "ON",
    region: "Greater Toronto Area",
    branch: "toronto",
    phone: "647-251-8188",
    coordinates: { lat: 43.7764, lng: -79.2318 },
    serviceRadius: 25,
    branchId: "b8164028-c730-4fc4-912c-b1f4016f1130"
  },
  "caledon": {
    city: "Caledon",
    province: "ON",
    region: "Peel Region",
    branch: "toronto",
    phone: "647-251-8188",
    coordinates: { lat: 43.8667, lng: -79.9833 },
    serviceRadius: 25,
    branchId: "b8164028-c730-4fc4-912c-b1f4016f1130"
  },
  "brampton": {
    city: "Brampton",
    province: "ON",
    region: "Greater Toronto Area",
    branch: "toronto",
    phone: "647-251-8188",
    coordinates: { lat: 43.7315, lng: -79.7624 },
    serviceRadius: 25,
    branchId: "b8164028-c730-4fc4-912c-b1f4016f1130"
  },
  "milton": {
    city: "Milton",
    province: "ON",
    region: "Halton Region",
    branch: "toronto",
    phone: "647-251-8188",
    coordinates: { lat: 43.5183, lng: -79.8774 },
    serviceRadius: 20,
    branchId: "b8164028-c730-4fc4-912c-b1f4016f1130"
  },
  "st-catharines": {
    city: "St. Catharines",
    province: "ON",
    region: "Niagara Region",
    branch: "toronto",
    phone: "647-251-8188",
    coordinates: { lat: 43.1594, lng: -79.2469 },
    serviceRadius: 30,
    branchId: "b8164028-c730-4fc4-912c-b1f4016f1130"
  },
  "london": {
    city: "London",
    province: "ON",
    region: "Southwestern Ontario",
    branch: "toronto",
    phone: "647-251-8188",
    coordinates: { lat: 42.9849, lng: -81.2453 },
    serviceRadius: 40,
    branchId: "b8164028-c730-4fc4-912c-b1f4016f1130"
  },
  "kingston": {
    city: "Kingston",
    province: "ON",
    region: "Eastern Ontario",
    branch: "toronto",
    phone: "647-251-8188",
    coordinates: { lat: 44.2312, lng: -76.486 },
    serviceRadius: 35,
    branchId: "b8164028-c730-4fc4-912c-b1f4016f1130"
  },
  "burlington": {
    city: "Burlington",
    province: "ON",
    region: "Greater Toronto Area",
    branch: "toronto",
    phone: "647-251-8188",
    coordinates: { lat: 43.3255, lng: -79.799 },
    serviceRadius: 20,
    branchId: "b8164028-c730-4fc4-912c-b1f4016f1130"
  },
  "markham": {
    city: "Markham",
    province: "ON",
    region: "Greater Toronto Area",
    branch: "toronto",
    phone: "647-251-8188",
    coordinates: { lat: 43.8561, lng: -79.337 },
    serviceRadius: 25,
    branchId: "b8164028-c730-4fc4-912c-b1f4016f1130"
  },
  "richmond-hill": {
    city: "Richmond Hill",
    province: "ON",
    region: "Greater Toronto Area",
    branch: "toronto",
    phone: "647-251-8188",
    coordinates: { lat: 43.8828, lng: -79.4403 },
    serviceRadius: 20,
    branchId: "b8164028-c730-4fc4-912c-b1f4016f1130"
  },
  "newmarket": {
    city: "Newmarket",
    province: "ON",
    region: "York Region",
    branch: "toronto",
    phone: "647-251-8188",
    coordinates: { lat: 43.8867, lng: -79.4648 },
    serviceRadius: 20,
    branchId: "b8164028-c730-4fc4-912c-b1f4016f1130"
  },
  "aurora": {
    city: "Aurora",
    province: "ON",
    region: "York Region",
    branch: "toronto",
    phone: "647-251-8188",
    coordinates: { lat: 44.0065, lng: -79.4504 },
    serviceRadius: 20,
    branchId: "b8164028-c730-4fc4-912c-b1f4016f1130"
  },
  "kitchener": {
    city: "Kitchener",
    province: "ON",
    region: "Waterloo Region",
    branch: "toronto",
    phone: "647-251-8188",
    coordinates: { lat: 43.4516, lng: -80.4925 },
    serviceRadius: 30,
    branchId: "b8164028-c730-4fc4-912c-b1f4016f1130"
  },
  "waterloo": {
    city: "Waterloo",
    province: "ON",
    region: "Waterloo Region",
    branch: "toronto",
    phone: "647-251-8188",
    coordinates: { lat: 43.4643, lng: -80.5204 },
    serviceRadius: 25,
    branchId: "b8164028-c730-4fc4-912c-b1f4016f1130"
  },
  "bradford": {
    city: "Bradford",
    province: "ON",
    region: "Simcoe County",
    branch: "toronto",
    phone: "647-251-8188",
    coordinates: { lat: 44.1167, lng: -79.6167 },
    serviceRadius: 20,
    branchId: "b8164028-c730-4fc4-912c-b1f4016f1130"
  },
  "etobicoke": {
    city: "Etobicoke",
    province: "ON",
    region: "Greater Toronto Area",
    branch: "toronto",
    phone: "647-251-8188",
    coordinates: { lat: 43.6205, lng: -79.5132 },
    serviceRadius: 25,
    branchId: "b8164028-c730-4fc4-912c-b1f4016f1130"
  },
  "north-york": {
    city: "North York",
    province: "ON",
    region: "Greater Toronto Area",
    branch: "toronto",
    phone: "647-251-8188",
    coordinates: { lat: 43.7615, lng: -79.4111 },
    serviceRadius: 30,
    branchId: "b8164028-c730-4fc4-912c-b1f4016f1130"
  },
  "york": {
    city: "York",
    province: "ON",
    region: "Greater Toronto Area",
    branch: "toronto",
    phone: "647-251-8188",
    coordinates: { lat: 43.689, lng: -79.4467 },
    serviceRadius: 25,
    branchId: "b8164028-c730-4fc4-912c-b1f4016f1130"
  },
  // British Columbia Service Areas - Vancouver Branch
  "vancouver": {
    city: "Vancouver",
    province: "BC",
    region: "Lower Mainland",
    branch: "vancouver",
    phone: "604-373-5582",
    coordinates: { lat: 49.2827, lng: -123.1207 },
    serviceRadius: 50,
    branchId: "98a3854c-cb46-4025-b0a1-b265013b069e"
  },
  "burnaby": {
    city: "Burnaby",
    province: "BC",
    region: "Lower Mainland",
    branch: "vancouver",
    phone: "604-373-5582",
    coordinates: { lat: 49.2488, lng: -122.9805 },
    serviceRadius: 25,
    branchId: "98a3854c-cb46-4025-b0a1-b265013b069e"
  },
  "richmond": {
    city: "Richmond",
    province: "BC",
    region: "Lower Mainland",
    branch: "vancouver",
    phone: "604-373-5582",
    coordinates: { lat: 49.1666, lng: -123.1336 },
    serviceRadius: 25,
    branchId: "98a3854c-cb46-4025-b0a1-b265013b069e"
  },
  "surrey": {
    city: "Surrey",
    province: "BC",
    region: "Lower Mainland",
    branch: "vancouver",
    phone: "604-373-5582",
    coordinates: { lat: 49.1913, lng: -122.849 },
    serviceRadius: 30,
    branchId: "98a3854c-cb46-4025-b0a1-b265013b069e"
  },
  "kelowna": {
    city: "Kelowna",
    province: "BC",
    region: "Okanagan Valley",
    branch: "vancouver",
    phone: "604-373-5582",
    coordinates: { lat: 49.888, lng: -119.496 },
    serviceRadius: 40,
    branchId: "b8164028-c730-4fc4-912c-b1f4016f1130"
  },
  "victoria": {
    city: "Victoria",
    province: "BC",
    region: "Vancouver Island",
    branch: "vancouver",
    phone: "604-373-5582",
    coordinates: { lat: 48.4284, lng: -123.3656 },
    serviceRadius: 30,
    branchId: "b8164028-c730-4fc4-912c-b1f4016f1130"
  },
  "vancouver-island": {
    city: "Vancouver Island",
    province: "BC",
    region: "Vancouver Island",
    branch: "vancouver",
    phone: "604-373-5582",
    coordinates: { lat: 49.7016, lng: -125.4615 },
    serviceRadius: 100,
    branchId: "b8164028-c730-4fc4-912c-b1f4016f1130"
  },
  // Other Provinces - All Toronto Branch
  "ottawa": {
    city: "Ottawa",
    province: "ON",
    region: "National Capital Region",
    branch: "toronto",
    phone: "647-251-8188",
    coordinates: { lat: 45.4215, lng: -75.6972 },
    serviceRadius: 40,
    branchId: "b8164028-c730-4fc4-912c-b1f4016f1130"
  },
  "gatineau": {
    city: "Gatineau",
    province: "QC",
    region: "National Capital Region",
    branch: "toronto",
    phone: "647-251-8188",
    coordinates: { lat: 45.4765, lng: -75.7013 },
    serviceRadius: 30,
    branchId: "b8164028-c730-4fc4-912c-b1f4016f1130"
  },
  "saskatoon": {
    city: "Saskatoon",
    province: "SK",
    region: "Central Saskatchewan",
    branch: "toronto",
    phone: "647-251-8188",
    coordinates: { lat: 52.1332, lng: -106.67 },
    serviceRadius: 50,
    branchId: "b8164028-c730-4fc4-912c-b1f4016f1130"
  },
  "halifax": {
    city: "Halifax",
    province: "NS",
    region: "Halifax Regional Municipality",
    branch: "toronto",
    phone: "647-251-8188",
    coordinates: { lat: 44.6488, lng: -63.5752 },
    serviceRadius: 40,
    branchId: "b8164028-c730-4fc4-912c-b1f4016f1130"
  },
  "regina": {
    city: "Regina",
    province: "SK",
    region: "Southern Saskatchewan",
    branch: "toronto",
    phone: "647-251-8188",
    coordinates: { lat: 50.4452, lng: -104.6189 },
    serviceRadius: 50,
    branchId: "b8164028-c730-4fc4-912c-b1f4016f1130"
  },
  "calgary": {
    city: "Calgary",
    province: "AB",
    region: "Southern Alberta",
    branch: "toronto",
    phone: "587-812-5952",
    coordinates: { lat: 51.0447, lng: -114.0719 },
    serviceRadius: 60,
    branchId: "b8164028-c730-4fc4-912c-b1f4016f1130"
  },
  "edmonton": {
    city: "Edmonton",
    province: "AB",
    region: "Central Alberta",
    branch: "toronto",
    phone: "368-210-0125",
    coordinates: { lat: 53.5461, lng: -113.4938 },
    serviceRadius: 60,
    branchId: "b8164028-c730-4fc4-912c-b1f4016f1130"
  },
  "new-brunswick": {
    city: "New Brunswick",
    province: "NB",
    region: "Maritime Provinces",
    branch: "toronto",
    phone: "647-251-8188",
    coordinates: { lat: 46.5653, lng: -66.4619 },
    serviceRadius: 100,
    branchId: "b8164028-c730-4fc4-912c-b1f4016f1130"
  }
};
function getServiceAreaBySlug(slug) {
  return SERVICE_AREAS[slug] || null;
}
function getServiceAreasByBranch(branch) {
  return Object.fromEntries(
    Object.entries(SERVICE_AREAS).filter(([, area]) => area.branch === branch)
  );
}
function getOntarioServiceAreas() {
  return Object.fromEntries(
    Object.entries(SERVICE_AREAS).filter(([, area]) => area.province === "ON")
  );
}
export {
  SERVICE_AREAS,
  getOntarioServiceAreas,
  getServiceAreaBySlug,
  getServiceAreasByBranch
};
