import { useEffect, useRef, useImperativeHandle, forwardRef, useCallback } from "react";
import Script from "/src/shims/script.js";

interface LocationAutocompleteProps {
  onPlaceSelected: (place: google.maps.places.PlaceResult) => void;
  apiKey: string;
  placeholder?: string;
  location?: string;
}

export interface LocationAutocompleteRef {
  reset: () => void; // Expose a reset method
}

const LocationAutocomplete = forwardRef<LocationAutocompleteRef, LocationAutocompleteProps>(
  ({ onPlaceSelected, apiKey, placeholder = "Enter a location", location}, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null); // Store the autocomplete instance

    // Initialize the Autocomplete instance
    const initializeAutocomplete = useCallback(() => {
      if (!inputRef.current || autocompleteRef.current) {
        return;
      }
      autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
        fields: ["address_components", "geometry", "formatted_address"],
        componentRestrictions: { country: "ca" },
      });
    
      autocompleteRef.current.addListener("place_changed", () => {
        const place = autocompleteRef.current?.getPlace();
        if (place && onPlaceSelected) {
          onPlaceSelected(place);
        }
      });
    }, [onPlaceSelected]);

    // Expose the reset method to the parent component
    useImperativeHandle(ref, () => ({
      reset: () => {
        if (inputRef.current) {
          inputRef.current.value = ""; // Clear the input field
        }
        initializeAutocomplete(); // Reinitialize the Autocomplete instance
      },
    }));

    useEffect(() => {
      if (window.google && window.google.maps && window.google.maps.places) {
        initializeAutocomplete();
      }
    }, [initializeAutocomplete]);

    // Handle Google Maps script load
    const handleGoogleMapsLoad = () => {
      initializeAutocomplete();
    };

    // Mobile-specific: Re-initialize on focus if not working
    const handleInputFocus = useCallback(() => {
      // On mobile, sometimes autocomplete doesn't attach properly
      if (!autocompleteRef.current && window.google?.maps?.places) {
        initializeAutocomplete();
      }
    }, [initializeAutocomplete]);

    // Cleanup the Autocomplete instance on unmount
    useEffect(() => {
      return () => {
      if (autocompleteRef.current) {
        google.maps.event.clearInstanceListeners(autocompleteRef.current);
        autocompleteRef.current = null; // Reset the reference
      }
      };
    }, []);

    return (
      <>
        {/* Google Maps Script */}
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`}
          onLoad={handleGoogleMapsLoad}
        />

        {/* Input for the Autocomplete */}
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          className={location}
          onFocus={handleInputFocus}
          // Mobile-specific attributes
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck="false"
          inputMode="text"
        />
      </>
    );
  }
);

LocationAutocomplete.displayName = "LocationAutocomplete";

export default LocationAutocomplete;