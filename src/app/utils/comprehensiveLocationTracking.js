const MARKET_CONFIG = {
  TORONTO: {
    branchId: "b8164028-c730-4fc4-912c-b1f4016f1130",
    // Your actual Toronto branch ID
    name: "Toronto Branch",
    marketArea: "GTA",
    cities: [
      "toronto",
      "north york",
      "scarborough",
      "etobicoke",
      "york",
      "mississauga",
      "brampton",
      "markham",
      "vaughan",
      "richmond hill",
      "oakville",
      "burlington",
      "milton",
      "ajax",
      "pickering",
      "whitby",
      "oshawa",
      "newmarket",
      "aurora",
      "king city",
      "concord",
      "thornhill",
      "woodbridge",
      "maple",
      "kleinburg",
      "caledon",
      "halton hills"
    ],
    postalPrefixes: ["M1", "M2", "M3", "M4", "M5", "M6", "M7", "M8", "M9", "L4", "L5", "L6", "L7", "L9", "L0"]
  },
  VANCOUVER: {
    branchId: "98a3854c-cb46-4025-b0a1-b265013b069e",
    // Your actual Vancouver branch ID
    name: "Vancouver Branch",
    marketArea: "Greater Vancouver",
    cities: [
      "vancouver",
      "burnaby",
      "richmond",
      "surrey",
      "coquitlam",
      "langley",
      "north vancouver",
      "west vancouver",
      "new westminster",
      "port moody",
      "maple ridge",
      "delta",
      "white rock",
      "port coquitlam",
      "pitt meadows",
      "anmore",
      "belcarra",
      "lions bay",
      "bowen island",
      "tsawwassen",
      "ladner",
      "cloverdale",
      "newton",
      "guildford",
      "fleetwood"
    ],
    postalPrefixes: ["V5", "V6", "V7", "V3", "V4", "V2", "V1", "V0"]
  }
};
const detectUserLocation = async (pickupAddress, destinationAddress, utmData) => {
  if (pickupAddress?.city) {
    const addressResult = detectFromAddress(pickupAddress);
    if (addressResult.detectedLocation !== "other") {
      return { ...addressResult, confidence: "high", detectionMethod: "address" };
    }
  }
  if (pickupAddress?.zipCode) {
    const postalResult = detectFromPostalCode(pickupAddress.zipCode);
    if (postalResult.detectedLocation !== "other") {
      return { ...postalResult, confidence: "high", detectionMethod: "postal" };
    }
  }
  if (utmData) {
    const utmResult = detectFromUTM(utmData);
    if (utmResult.detectedLocation !== "other") {
      return { ...utmResult, confidence: "medium", detectionMethod: "utm" };
    }
  }
  const ipResult = await detectFromIP();
  if (ipResult.detectedLocation !== "other") {
    return { ...ipResult, confidence: "low", detectionMethod: "ip" };
  }
  return {
    detectedLocation: "other",
    marketArea: "Other Canada",
    branchId: "b8164028-c730-4fc4-912c-b1f4016f1130",
    confidence: "low",
    detectionMethod: "default"
  };
};
const detectFromAddress = (address) => {
  const city = address.city?.toLowerCase().trim() || "";
  if (MARKET_CONFIG.TORONTO.cities.some((torontoCity) => city.includes(torontoCity) || torontoCity.includes(city))) {
    return {
      detectedLocation: "toronto",
      marketArea: MARKET_CONFIG.TORONTO.marketArea,
      branchId: MARKET_CONFIG.TORONTO.branchId,
      specificCity: address.city,
      province: address.state
    };
  }
  if (MARKET_CONFIG.VANCOUVER.cities.some((vancouverCity) => city.includes(vancouverCity) || vancouverCity.includes(city))) {
    return {
      detectedLocation: "vancouver",
      marketArea: MARKET_CONFIG.VANCOUVER.marketArea,
      branchId: MARKET_CONFIG.VANCOUVER.branchId,
      specificCity: address.city,
      province: address.state
    };
  }
  return {
    detectedLocation: "other",
    marketArea: "Other Canada",
    branchId: "DEFAULT_BRANCH",
    specificCity: address.city,
    province: address.state
  };
};
const detectFromPostalCode = (postalCode) => {
  const postal = postalCode.toUpperCase().replace(/\s/g, "");
  if (MARKET_CONFIG.TORONTO.postalPrefixes.some((prefix) => postal.startsWith(prefix))) {
    return {
      detectedLocation: "toronto",
      marketArea: MARKET_CONFIG.TORONTO.marketArea,
      branchId: MARKET_CONFIG.TORONTO.branchId
    };
  }
  if (MARKET_CONFIG.VANCOUVER.postalPrefixes.some((prefix) => postal.startsWith(prefix))) {
    return {
      detectedLocation: "vancouver",
      marketArea: MARKET_CONFIG.VANCOUVER.marketArea,
      branchId: MARKET_CONFIG.VANCOUVER.branchId
    };
  }
  return {
    detectedLocation: "other",
    marketArea: "Other Canada",
    branchId: "DEFAULT_BRANCH"
  };
};
const detectFromUTM = (utmData) => {
  const campaign = (utmData.utm_campaign || "").toLowerCase();
  const content = (utmData.utm_content || "").toLowerCase();
  const term = (utmData.utm_term || "").toLowerCase();
  const allUtm = `${campaign} ${content} ${term}`;
  if (allUtm.includes("toronto") || allUtm.includes("gta") || allUtm.includes("ontario") || allUtm.includes("mississauga") || allUtm.includes("brampton") || allUtm.includes("markham")) {
    return {
      detectedLocation: "toronto",
      marketArea: MARKET_CONFIG.TORONTO.marketArea,
      branchId: MARKET_CONFIG.TORONTO.branchId
    };
  }
  if (allUtm.includes("vancouver") || allUtm.includes("burnaby") || allUtm.includes("richmond") || allUtm.includes("surrey") || allUtm.includes("bc") || allUtm.includes("lower_mainland")) {
    return {
      detectedLocation: "vancouver",
      marketArea: MARKET_CONFIG.VANCOUVER.marketArea,
      branchId: MARKET_CONFIG.VANCOUVER.branchId
    };
  }
  return {
    detectedLocation: "other",
    marketArea: "Other Canada",
    branchId: "DEFAULT_BRANCH"
  };
};
const detectFromIP = async () => {
  try {
    const response = await fetch("https://ipapi.co/json/");
    const data = await response.json();
    if (data.country_code !== "CA") {
      return {
        detectedLocation: "other",
        marketArea: "Other Canada",
        branchId: "DEFAULT_BRANCH"
      };
    }
    const city = (data.city || "").toLowerCase();
    const region = (data.region || "").toLowerCase();
    if (region.includes("ontario") && (city.includes("toronto") || city.includes("mississauga") || city.includes("brampton") || city.includes("markham"))) {
      return {
        detectedLocation: "toronto",
        marketArea: MARKET_CONFIG.TORONTO.marketArea,
        branchId: MARKET_CONFIG.TORONTO.branchId,
        specificCity: data.city,
        province: data.region
      };
    }
    if (region.includes("british columbia") && (city.includes("vancouver") || city.includes("burnaby") || city.includes("richmond") || city.includes("surrey"))) {
      return {
        detectedLocation: "vancouver",
        marketArea: MARKET_CONFIG.VANCOUVER.marketArea,
        branchId: MARKET_CONFIG.VANCOUVER.branchId,
        specificCity: data.city,
        province: data.region
      };
    }
    return {
      detectedLocation: "other",
      marketArea: region.includes("ontario") ? "Other Ontario" : region.includes("british columbia") ? "Other BC" : "Other Canada",
      branchId: "DEFAULT_BRANCH",
      specificCity: data.city,
      province: data.region
    };
  } catch (error) {
    console.log(error);
    return {
      detectedLocation: "other",
      marketArea: "Other Canada",
      branchId: "DEFAULT_BRANCH"
    };
  }
};
const trackLocationEvent = (eventName, locationData, additionalData = {}) => {
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      location_detected: locationData.detectedLocation,
      market_area: locationData.marketArea,
      branch_id: locationData.branchId,
      detection_confidence: locationData.confidence,
      detection_method: locationData.detectionMethod,
      specific_city: locationData.specificCity,
      province: locationData.province,
      ...additionalData
    });
  }
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "ViewContent", {
      content_type: "location_detection",
      content_name: locationData.marketArea,
      custom_data: {
        detected_location: locationData.detectedLocation,
        market_area: locationData.marketArea,
        confidence: locationData.confidence
      }
    });
  }
};
const createLocationReferralSource = (utmData, locationData, serviceType) => {
  const baseSource = getTrafficSource(utmData);
  const locationSuffix = locationData.detectedLocation === "toronto" ? "Toronto" : locationData.detectedLocation === "vancouver" ? "Vancouver" : "Other";
  return `${baseSource} - ${serviceType.charAt(0).toUpperCase() + serviceType.slice(1)} - ${locationSuffix}`;
};
const getTrafficSource = (utmData) => {
  if (utmData.gclid || utmData.gbraid || utmData.wbraid) return "Google Ads";
  if (utmData.fbclid) return "Facebook Ads";
  if (utmData.msclkid) return "Microsoft Ads";
  if (utmData.utm_source?.toLowerCase().includes("google")) return "Google";
  if (utmData.utm_source?.toLowerCase().includes("facebook")) return "Facebook";
  return "Organic";
};
export {
  MARKET_CONFIG,
  createLocationReferralSource,
  detectUserLocation,
  trackLocationEvent
};
