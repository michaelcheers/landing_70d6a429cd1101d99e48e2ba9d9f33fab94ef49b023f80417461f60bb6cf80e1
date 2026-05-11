import { useEffect } from "react";
import { useSearchParams } from "/src/router/Router.js";
import { useAddress } from "/src/app/contextValues.js";
function UtmHandler() {
  const searchParams = useSearchParams();
  const { setUtmData } = useAddress();
  useEffect(() => {
    const utmFields = [
      "utm_medium",
      "utm_keyword",
      "utm_campaign",
      "utm_source",
      "utm_content",
      "campaign"
    ];
    const data = {};
    utmFields.forEach((field) => {
      const value = searchParams.get(field);
      if (value) data[field] = value;
    });
    if (searchParams.get("msclkid")) data.utm_source = "Microsoft";
    if (searchParams.get("bingid")) data.utm_source = "Microsoft";
    if (searchParams.get("gad_source")) data.utm_source = "Google";
    if (searchParams.get("gclid")) data.utm_source = "Google";
    if (searchParams.get("wbraid") || searchParams.get("gbraid")) data.utm_source = "Google";
    if (searchParams.get("fbclid")) data.utm_source = "Meta";
    if (Object.keys(data).length > 0) {
      setUtmData(data);
      if (typeof window !== "undefined") {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "utm_captured",
          ...data
        });
        localStorage.setItem("movingpapa_utm", JSON.stringify(data));
        localStorage.setItem("movingpapa_utm_timestamp", Date.now().toString());
      }
    } else {
      if (typeof window !== "undefined") {
        const storedUtm = localStorage.getItem("movingpapa_utm");
        const timestamp = localStorage.getItem("movingpapa_utm_timestamp");
        if (storedUtm && timestamp) {
          const age = Date.now() - parseInt(timestamp);
          if (age < 30 * 24 * 60 * 60 * 1e3) {
            const parsedUtm = JSON.parse(storedUtm);
            setUtmData(parsedUtm);
          }
        }
      }
    }
  }, [searchParams, setUtmData]);
  return null;
}
export {
  UtmHandler as default
};
