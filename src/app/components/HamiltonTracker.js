import { useEffect } from "react";
function HamiltonTracker({ slug }) {
  useEffect(() => {
    const currentLocation = slug.includes("hamilton") ? "hamilton" : "other";
    sessionStorage.setItem("currentLocation", currentLocation);
  }, [slug]);
  return null;
}
export {
  HamiltonTracker as default
};
