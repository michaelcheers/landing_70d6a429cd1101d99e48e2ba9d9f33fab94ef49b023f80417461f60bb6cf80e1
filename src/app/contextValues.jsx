
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface Address {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  }



interface AddressContextType {
    pickupAddress: Address | null;
    setPickupAddress: (address: Address | null) => void;
    destinationAddress: Address | null;
    setDestinationAddress: (address: Address | null) => void;
    utmData: Record<string, string | null>;
    setUtmData: (data: Record<string, string | null>) => void;
    source: string;
    setSource: (data: string) => void;
}

const AddressContext = createContext<AddressContextType | undefined>(undefined);

export const AddressProvider = ({ children }: { children: ReactNode }) => {
    // Initialize state without sessionStorage (prevents hydration mismatch)
    const [pickupAddress, setPickupAddressState] = useState<Address | null>(null);
    const [destinationAddress, setDestinationAddressState] = useState<Address | null>(null);
    const [utmData, setUtmData] = useState<Record<string, string | null>>({});
    const [source, setSource] = useState<string>("");

    // Load from sessionStorage after component mounts (client-side only)
    useEffect(() => {
      if (typeof window !== 'undefined') {
        const savedPickup = sessionStorage.getItem('pickupAddress');
        const savedDestination = sessionStorage.getItem('destinationAddress');

        if (savedPickup) {
          setPickupAddressState(JSON.parse(savedPickup));
        }
        if (savedDestination) {
          setDestinationAddressState(JSON.parse(savedDestination));
        }
      }
    }, []);

    // Wrapper functions to save to sessionStorage
    const setPickupAddress = (address: Address | null) => {
      setPickupAddressState(address);
      if (typeof window !== 'undefined') {
        if (address) {
          sessionStorage.setItem('pickupAddress', JSON.stringify(address));
        } else {
          sessionStorage.removeItem('pickupAddress');
        }
      }
    };

    const setDestinationAddress = (address: Address | null) => {
      setDestinationAddressState(address);
      if (typeof window !== 'undefined') {
        if (address) {
          sessionStorage.setItem('destinationAddress', JSON.stringify(address));
        } else {
          sessionStorage.removeItem('destinationAddress');
        }
      }
    };

  return (
    <AddressContext.Provider value={{ setPickupAddress, pickupAddress, setDestinationAddress, destinationAddress, setUtmData, utmData, source, setSource}}>
      {children}
    </AddressContext.Provider>
  );
};

export const useAddress = () => {
  const context = useContext(AddressContext);
  if (!context) {
    throw new Error("useAddress must be used within an AddressProvider");
  }
  return context;
};