import { jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useEffect } from "react";
const AddressContext = createContext(void 0);
const AddressProvider = ({ children }) => {
  const [pickupAddress, setPickupAddressState] = useState(null);
  const [destinationAddress, setDestinationAddressState] = useState(null);
  const [utmData, setUtmData] = useState({});
  const [source, setSource] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedPickup = sessionStorage.getItem("pickupAddress");
      const savedDestination = sessionStorage.getItem("destinationAddress");
      if (savedPickup) {
        setPickupAddressState(JSON.parse(savedPickup));
      }
      if (savedDestination) {
        setDestinationAddressState(JSON.parse(savedDestination));
      }
    }
  }, []);
  const setPickupAddress = (address) => {
    setPickupAddressState(address);
    if (typeof window !== "undefined") {
      if (address) {
        sessionStorage.setItem("pickupAddress", JSON.stringify(address));
      } else {
        sessionStorage.removeItem("pickupAddress");
      }
    }
  };
  const setDestinationAddress = (address) => {
    setDestinationAddressState(address);
    if (typeof window !== "undefined") {
      if (address) {
        sessionStorage.setItem("destinationAddress", JSON.stringify(address));
      } else {
        sessionStorage.removeItem("destinationAddress");
      }
    }
  };
  return /* @__PURE__ */ jsx(AddressContext.Provider, { value: { setPickupAddress, pickupAddress, setDestinationAddress, destinationAddress, setUtmData, utmData, source, setSource }, children });
};
const useAddress = () => {
  const context = useContext(AddressContext);
  if (!context) {
    throw new Error("useAddress must be used within an AddressProvider");
  }
  return context;
};
export {
  AddressProvider,
  useAddress
};
