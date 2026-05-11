// Vanilla port of LocationAutocomplete.tsx — attaches a Google Places
// Autocomplete (CA, address components) to an <input>, parses the picked
// place into {street, city, state, zipCode}, and calls back.

const GOOGLE_MAPS_API_KEY = 'AIzaSyCZ_uVVdMynV2SkdCsFbQXlws4feeHPO3E';
const GOOGLE_MAPS_SRC = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;

let loaderPromise = null;
export function loadGoogleMaps() {
  if (window.google?.maps?.places) return Promise.resolve();
  if (loaderPromise) return loaderPromise;
  loaderPromise = new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = GOOGLE_MAPS_SRC;
    s.async = true;
    s.defer = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error('Failed to load Google Maps'));
    document.head.appendChild(s);
  });
  return loaderPromise;
}

function parsePlace(place) {
  let street = '', city = '', state = '', zipCode = '';
  (place.address_components || []).forEach((c) => {
    if (c.types.includes('street_number')) street = c.long_name;
    else if (c.types.includes('route')) street += (street ? ' ' : '') + c.long_name;
    else if (c.types.includes('locality')) city = c.long_name;
    else if (c.types.includes('administrative_area_level_1')) state = c.short_name;
    else if (c.types.includes('postal_code')) zipCode = c.long_name;
  });
  return { street, city, state, zipCode };
}

// Attach autocomplete to an <input>. Calls onPick(address) with the parsed
// {street,city,state,zipCode}. Safe to call before Google Maps has loaded —
// it queues until the API is ready.
export function attachAutocomplete(input, onPick) {
  if (!input || input.dataset.gpAttached) return;
  input.dataset.gpAttached = '1';
  loadGoogleMaps().then(() => {
    const ac = new google.maps.places.Autocomplete(input, {
      fields: ['address_components', 'geometry', 'formatted_address'],
      componentRestrictions: { country: 'ca' },
    });
    ac.addListener('place_changed', () => {
      const place = ac.getPlace();
      if (place) onPick(parsePlace(place));
    });
  });
}
