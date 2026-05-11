import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useImperativeHandle, forwardRef, useCallback } from "react";
import Script from "/src/shims/script.js";
const LocationAutocomplete = forwardRef(
  ({ onPlaceSelected, apiKey, placeholder = "Enter a location", location }, ref) => {
    const inputRef = useRef(null);
    const autocompleteRef = useRef(null);
    const initializeAutocomplete = useCallback(() => {
      if (!inputRef.current || autocompleteRef.current) {
        return;
      }
      autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
        fields: ["address_components", "geometry", "formatted_address"],
        componentRestrictions: { country: "ca" }
      });
      autocompleteRef.current.addListener("place_changed", () => {
        const place = autocompleteRef.current?.getPlace();
        if (place && onPlaceSelected) {
          onPlaceSelected(place);
        }
      });
    }, [onPlaceSelected]);
    useImperativeHandle(ref, () => ({
      reset: () => {
        if (inputRef.current) {
          inputRef.current.value = "";
        }
        initializeAutocomplete();
      }
    }));
    useEffect(() => {
      if (window.google && window.google.maps && window.google.maps.places) {
        initializeAutocomplete();
      }
    }, [initializeAutocomplete]);
    const handleGoogleMapsLoad = () => {
      initializeAutocomplete();
    };
    const handleInputFocus = useCallback(() => {
      if (!autocompleteRef.current && window.google?.maps?.places) {
        initializeAutocomplete();
      }
    }, [initializeAutocomplete]);
    useEffect(() => {
      return () => {
        if (autocompleteRef.current) {
          google.maps.event.clearInstanceListeners(autocompleteRef.current);
          autocompleteRef.current = null;
        }
      };
    }, []);
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        Script,
        {
          src: `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`,
          onLoad: handleGoogleMapsLoad
        }
      ),
      /* @__PURE__ */ jsx(
        "input",
        {
          ref: inputRef,
          type: "text",
          placeholder,
          className: location,
          onFocus: handleInputFocus,
          autoComplete: "off",
          autoCapitalize: "off",
          autoCorrect: "off",
          spellCheck: "false",
          inputMode: "text"
        }
      )
    ] });
  }
);
LocationAutocomplete.displayName = "LocationAutocomplete";
var locationautocomplete_default = LocationAutocomplete;
export {
  locationautocomplete_default as default
};
