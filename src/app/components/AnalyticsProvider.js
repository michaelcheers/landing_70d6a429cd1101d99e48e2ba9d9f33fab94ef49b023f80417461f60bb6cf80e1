import { useEffect } from "react";
import { usePathname, useSearchParams } from "/src/router/Router.js";
import { useAddress } from "/src/app/contextValues.js";
import { detectUserLocation, trackLocationEvent } from "/src/app/utils/comprehensiveLocationTracking.js";
function AnalyticsProvider() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { pickupAddress, destinationAddress, utmData } = useAddress();
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log("Analytics tracking disabled in development");
      return;
    }
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
    }
    const performLocationDetection = async () => {
      try {
        const locationData = await detectUserLocation(
          pickupAddress,
          destinationAddress,
          utmData
        );
        trackLocationEvent("location_detected", locationData, {
          page_path: pathname,
          page_title: document.title,
          utm_source: utmData?.utm_source,
          utm_campaign: utmData?.utm_campaign,
          utm_medium: utmData?.utm_medium
        });
        if (typeof window !== "undefined") {
          window.dataLayer.push({
            event: "location_page_view",
            page_location: window.location.href,
            page_title: document.title,
            detected_location: locationData.detectedLocation,
            market_area: locationData.marketArea,
            branch_id: locationData.branchId,
            detection_confidence: locationData.confidence,
            detection_method: locationData.detectionMethod,
            is_toronto_user: locationData.detectedLocation === "toronto",
            is_vancouver_user: locationData.detectedLocation === "vancouver",
            utm_source: utmData?.utm_source,
            utm_campaign: utmData?.utm_campaign,
            utm_medium: utmData?.utm_medium
          });
        }
        const serviceMap = {
          "/": "homepage",
          "/service/residential": "residential",
          "/service/commercial": "commercial",
          "/service/storage": "storage",
          "/service/packing": "packing",
          "/service/office": "office",
          "/service/warehouse": "warehouse",
          "/service/lastmile": "lastmile",
          "/service/art": "art",
          "/service/specialEquipment": "special_equipment"
        };
        const serviceName = serviceMap[pathname];
        if (serviceName && typeof window !== "undefined") {
          window.dataLayer.push({
            event: "location_service_view",
            service_name: serviceName,
            detected_location: locationData.detectedLocation,
            market_area: locationData.marketArea,
            branch_id: locationData.branchId,
            target_market: locationData.detectedLocation === "toronto" ? "GTA" : locationData.detectedLocation === "vancouver" ? "Vancouver" : "Other"
          });
          if (window.fbq) {
            window.fbq("track", "ViewContent", {
              content_type: "service",
              content_name: serviceName,
              custom_data: {
                detected_location: locationData.detectedLocation,
                market_area: locationData.marketArea,
                branch_id: locationData.branchId
              }
            });
          }
        }
      } catch (error) {
        console.error("Location detection failed:", error);
      }
    };
    performLocationDetection();
    const handlePhoneClick = async (event) => {
      const target = event.target;
      const phoneLink = target.closest('a[href^="tel:"]');
      if (phoneLink && !phoneLink.getAttribute("data-tracked")) {
        phoneLink.setAttribute("data-tracked", "true");
        const locationData = await detectUserLocation(pickupAddress, destinationAddress, utmData);
        if (typeof window !== "undefined") {
          window.dataLayer.push({
            event: "location_phone_call",
            detected_location: locationData.detectedLocation,
            market_area: locationData.marketArea,
            branch_id: locationData.branchId,
            phone_number: phoneLink.href,
            page_location: window.location.href
          });
        }
        if (typeof window !== "undefined" && window.fbq) {
          window.fbq("track", "Contact", {
            custom_data: {
              detected_location: locationData.detectedLocation,
              contact_method: "phone"
            }
          });
        }
      }
    };
    const handleEmailClick = async (event) => {
      const target = event.target;
      const emailLink = target.closest('a[href^="mailto:"]');
      if (emailLink && !emailLink.getAttribute("data-tracked")) {
        emailLink.setAttribute("data-tracked", "true");
        const locationData = await detectUserLocation(pickupAddress, destinationAddress, utmData);
        if (typeof window !== "undefined") {
          window.dataLayer.push({
            event: "location_email_click",
            detected_location: locationData.detectedLocation,
            market_area: locationData.marketArea,
            branch_id: locationData.branchId,
            email_address: emailLink.href,
            page_location: window.location.href
          });
        }
        if (typeof window !== "undefined" && window.fbq) {
          window.fbq("track", "Contact", {
            custom_data: {
              detected_location: locationData.detectedLocation,
              contact_method: "email"
            }
          });
        }
      }
    };
    if (typeof document !== "undefined") {
      document.addEventListener("click", handlePhoneClick);
      document.addEventListener("click", handleEmailClick);
    }
    return () => {
      if (typeof document !== "undefined") {
        document.removeEventListener("click", handlePhoneClick);
        document.removeEventListener("click", handleEmailClick);
      }
    };
  }, [pathname, searchParams, pickupAddress, destinationAddress, utmData]);
  return null;
}
export {
  AnalyticsProvider as default
};
