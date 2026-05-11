
import { useState, useEffect, useMemo } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAddress } from "/src/app/contextValues.jsx";
import LocationAutocomplete from "/src/app/components/locationautocomplete.jsx";
import {useRouter} from "/src/router/Router.jsx"
import "../landing.css";
// import { trackFormSubmission, trackQuoteRequest } from "/src/app/utils/analytics.js";
import { detectUserLocation, trackLocationEvent } from "/src/app/utils/comprehensiveLocationTracking.js";
import CustomInput from "/src/app/components/customInput.jsx";

interface LeadData {
  FullName: string;
  Email: string;
  PhoneNumber: string;
  OriginStreet?: string;
  OriginCity?: string;
  OriginState?: string;
  OriginZipCode?: string;
  DestinationStreet?: string;
  DestinationCity?: string;
  DestinationState?: string;
  DestinationZipCode?: string;
  MoveDate: string | null;
  MoveSize?: string; // Added MoveSize field
  ReferralSource: string;
  ServiceType?: string;
  BranchId?: string;
  DetectedLocation?: string;
  MarketArea?: string;
  DetectionMethod?: string;
  DetectionConfidence?: string;
  // Add optional UTM properties
  UtmMedium?: string | null;
  UtmKeyword?: string | null;
  UtmCampaign?: string | null;
  UtmSource?: string | null;
  UtmContent?: string | null;
  Medium?: string;
  Keyword?: string;
  Campaign?: string;
  Source?: string;
  Content?: string;
  SmsOptIn?: boolean;
  SmsOptInText?: string;
  SmsOptInTimestamp?: string;
  City?: string;
  CompanyLocationId?: number;
}

interface FinalStepProps {
    from:string;
    branchNum: string;
}

const BRANCH_PHONE: Record<string, string> = {
  vancouver: '604-373-5582',
  edmonton:  '368-210-0125',
};
const branchPhoneFmt = (b: string) => {
  const p = BRANCH_PHONE[b] ?? '(647) 251-8188';
  return p.startsWith('(') ? p : `(${p.slice(0,3)}) ${p.slice(4)}`;
};

export default function FinalStepComp({ from, branchNum }: FinalStepProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    moveSize: "", // Added moveSize to formData

  });
  const [smsConsent, setSmsConsent] = useState(false);
  const [consentError, setConsentError] = useState(false);
  const showSmsConsent = from.includes("commercial");
  const SMS_CONSENT_TEXT = "I consent to receive SMS/text messages from Moving Papa at the phone number above regarding my commercial moving quote, scheduling, and follow-ups. Message and data rates may apply. Reply STOP to opt out.";
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { pickupAddress, destinationAddress, utmData, setPickupAddress, setDestinationAddress} = useAddress();
  const router = useRouter()

  // Move size options
  const moveSizeOptions = [
    "Studio",
    "1 Bedroom",
    "2 Bedroom",
    "3 Bedroom",
    "4+ Bedroom",
    "Office",
    "Other"
  ];
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

    const isResidential = (from === "moving" || from == "vancouver-moving" || from == "storage" || from == "vancouver-storage")

    const roundingClasses = isResidential ? {
        round:"rounded-lg",
        button: "!rounded-xl"
    } : {
        round:"",
        button:""
    };

  // Calculate dates in useMemo to prevent hydration mismatch
  const { today, maxDate } = useMemo(() => {
    const todayDate = new Date();
    const maxDateCalc = new Date();
    maxDateCalc.setDate(todayDate.getDate() + 360);
    return { today: todayDate, maxDate: maxDateCalc };
  }, []);
    useEffect(() => {
    const performLocationDetection = async () => {
      try {
        const detected = await detectUserLocation(pickupAddress, destinationAddress, utmData);
        
        // Track location detection for this page
        trackLocationEvent('finalstep_location_detected', detected, {
          page_type: 'finalstep_residential',
          has_pickup_address: !!pickupAddress,
          has_destination_address: !!destinationAddress
        });


      } catch (error) {
        console.error('Location detection failed:', error);
      }
    };

    performLocationDetection();
  }, [pickupAddress, destinationAddress, utmData]);
  const handlePickupPlaceSelected = (place: google.maps.places.PlaceResult) => {
    let street = "";
    let city = "";
    let state = "";
    let zipCode = "";

    // Parse address components
    place.address_components?.forEach((component: google.maps.GeocoderAddressComponent) => {
      if (component.types.includes("street_number")) {
        street = component.long_name;
      }
      if (component.types.includes("route")) {
        street += ` ${component.long_name}`;
      }
      if (component.types.includes("locality")) {
        city = component.long_name;
      }
      if (component.types.includes("administrative_area_level_1")) {
        state = component.short_name;
      }
      if (component.types.includes("postal_code")) {
        zipCode = component.long_name;
      }
    });

    // Save the pickup address to the global state
    setPickupAddress({ street, city, state, zipCode });
  };

  const handleDestinationPlaceSelected = (place: google.maps.places.PlaceResult) => {
    let street = "";
    let city = "";
    let state = "";
    let zipCode = "";

    // Parse address components
    place.address_components?.forEach((component: google.maps.GeocoderAddressComponent) => {
      if (component.types.includes("street_number")) {
        street = component.long_name;
      }
      if (component.types.includes("route")) {
        street += ` ${component.long_name}`;
      }
      if (component.types.includes("locality")) {
        city = component.long_name;
      }
      if (component.types.includes("administrative_area_level_1")) {
        state = component.short_name;
      }
      if (component.types.includes("postal_code")) {
        zipCode = component.long_name;
      }
    });

    // Save the destination address to the global state
    setDestinationAddress({ street, city, state, zipCode });
  };

  const handleSubmit = (e: React.FormEvent) => {
    setIsLoading(true)
    e.preventDefault();
    
    if (!pickupAddress && !destinationAddress ) {
     alert("Please fill in one address before submitting.");
        setIsLoading(false)
      return;
    }

    if (!isValidPhoneNumber(formData.phone)) {
      alert("Please enter a valid phone number.ex. 000-000-0000");
      setIsLoading(false)
      return;
    }

    if (showSmsConsent && !smsConsent) {
      setConsentError(true);
      alert("Please confirm SMS consent to continue.");
      setIsLoading(false);
      return;
    }

    // Send lead data to the API
    sendLeadData();
  
  };
function isValidPhoneNumber(phoneNumber: string): boolean {
    // Remove all whitespace
    const cleaned = phoneNumber.replace(/\s+/g, '');
    
    // E.164 format: +1234567890
    const e164Regex = /^\+[1-9]\d{1,14}$/;
    
    // US format with +1 prefix: +11234567890 or +1-123-456-7890
    const usE164Regex = /^\+1\d{10}$/;
    const usE164DashesRegex = /^\+1-\d{3}-\d{3}-\d{4}$/;
    
    // US format with parentheses: (123)456-7890 or (123)4567890
    const usParenthesesRegex = /^\(\d{3}\)\d{3}-?\d{4}$/;
    
    // US format with dashes: 123-456-7890
    const usDashesRegex = /^\d{3}-\d{3}-\d{4}$/;
    
    // Simple format: 1234567890 (10 digits)
    const simpleRegex = /^\d{10}$/;
    
    // Check all formats
    return (
      e164Regex.test(cleaned) ||
      usE164Regex.test(cleaned) ||
      usE164DashesRegex.test(cleaned) ||
      usParenthesesRegex.test(cleaned) ||
      usDashesRegex.test(cleaned) ||
      simpleRegex.test(cleaned)
    );
}
  const getTrafficSource = (utmData: Record<string, string | null>) => {
    // Extract utm_source to check the source
    const source = (utmData?.utm_source || "").toLowerCase();
    // For deeper analysis, check campaign and medium as well
    const medium = (utmData?.utm_medium || "").toLowerCase();
    const campaign = (utmData?.utm_campaign || "").toLowerCase();

    if (campaign.includes("pmax")){
      return "Pmax"
    }
    // Check for Google sources
    if (source.includes("google") ||
        source === "cpc" || // Sometimes Google Ads uses 'cpc' as source
        source === "organic") {
      return "Google";
    }

    // Check for Microsoft/Bing sources
    if (source.includes("bing") ||
        source.includes("microsoft") ||
        source === "msn") {
      return "Microsoft";
    }

    // Check for Meta/Facebook sources
    if (source.includes("meta") ||
        source.includes("facebook") ||
        source.includes("fb") ||
        source === "ig" || // Instagram
        source.includes("instagram")) {
      return "Meta";
    }

    // Google typically uses these mediums
    if (medium === "cpc" || medium === "ppc" || medium === "paidsearch") {
      if (campaign.includes("google") || !campaign.includes("bing")) {
        return "Google";
      }
    }

    // Microsoft/Bing typically uses these patterns
    if (medium === "cpc" && (campaign.includes("bing") || campaign.includes("msn"))) {
      return "Microsoft";
    }

    // Default return if we can't determine
    return "Other";
  }

  const sendLeadData = async () => {
    const formattedDate = selectedDate
      ? `${selectedDate.getFullYear()}${(selectedDate.getMonth() + 1)
          .toString()
          .padStart(2, "0")}${selectedDate.getDate().toString().padStart(2, "0")}`
      : null;
    
    const utminfo = getTrafficSource(utmData)
    

    // referral source
    let referralsource = ""
    const isHamilton = typeof window !== 'undefined' && sessionStorage.getItem('currentLocation') === 'hamilton';
    
    if (from.includes("moving") || from.includes("storage")){
      if (utminfo == "Other"){
        if(branchNum==="vancouver"){
          referralsource = "Organic - Vancouver"
        }else{
          referralsource = `Organic - Toronto`
        }
      }else if (utminfo ==  "Pmax"){
        referralsource = utminfo
      }else if (utminfo == "Meta"){
        if(branchNum==="vancouver"){
          referralsource = "Meta - Vancouver"
        }else{
          referralsource = "Meta - Toronto"
        }
      }else if (utminfo == "Google"){
        if (isHamilton) {
          referralsource = "Google Hamilton"
        } else if (branchNum==="vancouver"){
          referralsource = "Google - Residential Vancouver"
        }else{
          referralsource = utminfo + ` - Residential`
        }

      }else{
        if (branchNum==="vancouver"){
          referralsource = utminfo + ` - Residential Van`
        }else{
          referralsource = utminfo + ` - Residential`
        }

      }
    }else{
      if (utminfo == "Other"){
        if(branchNum==="vancouver"){
          referralsource = "Organic - Vancouver"
        }else{
          referralsource = `Organic - Toronto`
        }
      }else if (utminfo ==  "Pmax"){
        referralsource = utminfo
      }else if (utminfo == "Meta"){
        if(branchNum==="vancouver"){
          referralsource = "Meta - Vancouver"
        }else{
          referralsource = "Meta - Toronto"
        }
      }else{
        if (isHamilton) {
          referralsource = "Google Hamilton"
        } else if (branchNum==="vancouver"){
          referralsource = utminfo + ` - Commercial Van`
        }else{
          referralsource = utminfo + ` - Commercial`
        }

      }
    }

    let servicetype = ""
    if(from.includes("storage")){
      servicetype = "Storage in Bound"
    }else if(from.includes("commercial")){
      servicetype = "Commercial"
    }
    const getBranchId = (): string => {
      if (typeof window !== 'undefined') {
        const currentLocation = sessionStorage.getItem('currentLocation');
        
        if (currentLocation === 'hamilton') {
          return '842b7c75-275a-484a-86ed-b260010a7f19'; // Hamilton branch ID
        }
      }
      
      // Fall back to original logic
      return branchNum === "vancouver" ? 
        "98a3854c-cb46-4025-b0a1-b265013b069e" : 
        "b8164028-c730-4fc4-912c-b1f4016f1130";
    };

    const branch = getBranchId();

    const getCompanyLocationId = (): number => {
      switch (branchNum) {
        case "vancouver": return 25;
        case "ottawa":    return 36;
        case "calgary":   return 37;
        case "edmonton":  return 38;
        default:          return 4;
      }
    };

    const leadData: LeadData = {
      FullName: formData.name,
      Email: formData.email,
      PhoneNumber: formData.phone,
      OriginStreet: pickupAddress?.street,
      OriginCity: pickupAddress?.city,
      OriginState: pickupAddress?.state,
      OriginZipCode: pickupAddress?.zipCode,
      DestinationStreet: destinationAddress?.street,
      DestinationCity: destinationAddress?.city,
      DestinationState: destinationAddress?.state,
      DestinationZipCode: destinationAddress?.zipCode,
      ServiceType: servicetype,
      MoveSize: formData.moveSize || undefined,
      MoveDate: formattedDate,
      ReferralSource: referralsource,
      BranchId: branch,
      City: branchNum,
      CompanyLocationId: getCompanyLocationId(),
      UtmMedium: utmData?.utm_medium,
      UtmKeyword: utmData?.utm_keyword,
      UtmCampaign: utmData?.utm_campaign,
      UtmSource: utmData?.utm_source,
      UtmContent: utmData?.utm_content,
    };

    if (utmData?.utm_campaign) {leadData.Campaign = utmData.utm_campaign;}
    else if (utmData?.campaign){ leadData.Campaign = utmData.campaign;}
    if (utmData?.utm_source) leadData.Source = utmData.utm_source;

    if (showSmsConsent) {
      leadData.SmsOptIn = smsConsent;
      leadData.SmsOptInText = SMS_CONSENT_TEXT;
      leadData.SmsOptInTimestamp = new Date().toISOString();
    }

    setErrorMessage(null);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    try {
      const { buildService1Payload, SERVICE1_BASE } = await import('/src/api/endpoints.js');
      const payload = buildService1Payload(leadData);
      const response = await fetch(SERVICE1_BASE + '/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
        keepalive: true,
      });
      clearTimeout(timeoutId);

      if (response.ok || response.status === 409) {
        // 200 covers both real success and the dedupe/"already received" case
        router.push(`/thankyou`);
        return;
      }

      console.error('Lead submission failed:', response.status, await response.text().catch(() => ''));
      setErrorMessage(`We couldn't submit your request. Please try again, or call ${branchPhoneFmt(branchNum)} and we'll take it manually.`);
      setIsLoading(false);
    } catch (error) {
      clearTimeout(timeoutId);
      const isAbort = (error as { name?: string })?.name === 'AbortError';
      if (isAbort) {
        // Service1 idempotency on email/phone covers a possible resubmit; redirect optimistically.
        console.warn('Lead submission timed out — redirecting optimistically');
        router.push(`/thankyou`);
        return;
      }
      console.error('Lead submission error:', error);
      setErrorMessage(`We couldn't submit your request. Please try again, or call ${branchPhoneFmt(branchNum)} and we'll take it manually.`);
      setIsLoading(false);
    }
  };

  return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-primary">
        {/* Calendar Section */}
        <div className="bg-primary p-6  w-full max-w-md flex flex-col items-center">
          <h1 className="text-xl font-bold text-center text-tertiary">
           Final Step
          </h1>

        {/* Input Section */}
        <form onSubmit={handleSubmit} className="w-full mt-4" id="get-quote-form">
          


          {/* Pickup and Destination Address Section */}
          <div className="relative mb-4">
            
            {pickupAddress ? (
                <div className="text-white">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-bold ">Pickup Address</h2>
                  <button
                    type="button"
                    onClick={() => setPickupAddress(null)
                    } // Clear the pickup address
                    className="text-red-500 hover:text-red-700 focus:outline-none font-bold text-2xl"
                  >
                    X
                  </button>
                </div>
                <p>{pickupAddress.street}, {pickupAddress.city}, {pickupAddress.state} {pickupAddress.zipCode}</p>
              </div>
            ) : (
              <div className="relative items-center flex w-full">
                <svg className="absolute left-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-tertiary z-10" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                <LocationAutocomplete
                  apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
                  onPlaceSelected={handlePickupPlaceSelected}
                  placeholder="Enter Pickup Address"
                  location="floating-textarea rounded-lg !bg-primary !text-white !border-white pl-10"
                />
              </div>
            )}
          </div>
          {/* Destination Address Section */}
          {(from.includes("moving") || from.includes("commercial")) ?(<div className="relative mb-4">
            
            {destinationAddress ? (
                <div className="text-white">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-bold">Destination Address</h2>
                  <button
                    type="button"
                    onClick={() => setDestinationAddress(null)
                    } // Clear the pickup address
                    className="text-red-500 hover:text-red-700 focus:outline-none font-bold text-2xl"
                  >
                    X
                  </button>
                </div>
                <p>{destinationAddress.street}, {destinationAddress.city}, {destinationAddress.state} {destinationAddress.zipCode}</p>
              </div>
            ) : (
              <div className="relative items-center flex w-full">
                <svg className="absolute left-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-tertiary z-10" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                <LocationAutocomplete
                  apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
                  onPlaceSelected={handleDestinationPlaceSelected}
                  placeholder="Enter Destination Address "
                  location="floating-textarea rounded-lg !bg-primary !text-white !border-white pl-10"
                />
              </div>
            )}
          </div>):
          (
          <div className="relative mb-4">
               <div className="items-center text-white">
                  <h2 className="text-lg font-bold">Destination Address</h2>
                  <p className="text- font-bold pl-4">Moving Papa Storage</p>
                </div>
          </div>
          )}

          {/* Date Picker styled like other inputs */}
          <div className="relative mb-4">
            <svg className="absolute left-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-tertiary z-10" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 0 5.25 9h13.5A2.25 2.25 0 0 0 21 11.25v7.5" />
            </svg>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              customInput={
                <input
                  className="floating-textarea rounded-lg !bg-primary !text-white !border-white w-full pl-10"
                  readOnly
                  onFocus={(e) => e.target.blur()}
                  onMouseDown={(e) => e.preventDefault()}
                  onTouchStart={(e) => e.preventDefault()}
                />
              }
              placeholderText="Select Estimated Moving Date"
              minDate={today}
              maxDate={maxDate}
              dateFormat="MMMM d, yyyy"
            />
          </div>    
           
           
          {/* Move Size Dropdown Section */}
          {isResidential && (<div className="relative mb-4">
            <svg className="absolute left-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-tertiary z-10" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
            <select
              name="moveSize"
              value={formData.moveSize}
              onChange={handleInputChange}
              className="floating-textarea rounded-lg !bg-primary !border-white w-full pl-10 appearance-none text-white"
            >
              <option value=""  className="bg-primary text-white">Select Move Size</option>
              {moveSizeOptions.map((option) => (
                <option key={option} value={option} className="bg-primary text-white">
                  {option}
                </option>
              ))}
            </select>
            {/* Custom dropdown arrow */}
            <svg className="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-tertiary pointer-events-none" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </div>)}
          
           {/* Contact Information Section */}
          <h2 className={`text-center font-bold text-white w-full bg-[#06170e] py-2 mb-4 mt-6 ${roundingClasses.round}`}>Where should we send your Quote?</h2>

          {/* Email Input */}
          <div className="relative mb-4">
            <div className="relative items-center flex w-full">
            <CustomInput
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter Email *"
              required
              icon={
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
              }
            />
            </div>
          </div>

          {/* Phone Input */}
          <div className="relative mb-4">
            <div className="relative items-center flex w-full">
              <CustomInput
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter Phone Number *"
                required
                icon={
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                  </svg>
                }
              />
            </div>
          </div>

          {/* Name Input */}
          <div className="relative mb-4">
            <div className="relative items-center flex w-full">
              <CustomInput
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter Full Name *"
                required
                icon={
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                  </svg>
                }
              />
            </div>
          </div>
          {showSmsConsent && (
            <div className={`relative mb-4 flex gap-2 items-start text-xs leading-snug p-3 rounded ${consentError ? "border border-red-500 bg-red-50/10" : ""}`}>
              <input
                type="checkbox"
                id="sms-consent"
                checked={smsConsent}
                onChange={(e) => { setSmsConsent(e.target.checked); if (e.target.checked) setConsentError(false); }}
                className="mt-1 h-4 w-4 flex-shrink-0 accent-tertiary"
                required
              />
              <label htmlFor="sms-consent" className={consentError ? "text-red-300" : "text-white"}>
                {SMS_CONSENT_TEXT}
              </label>
            </div>
          )}
          {errorMessage && (
            <div
              role="alert"
              className="relative mb-4 flex items-center gap-3 rounded-md border border-[#c0392b] bg-[#fdecea] p-3 text-[#7b1f17]"
            >
              <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#c0392b] font-bold text-white">!</div>
              <div className="text-sm">
                <div className="font-bold">We couldn&apos;t submit your request.</div>
                <div>Please try again, or call <strong>{branchPhoneFmt(branchNum)}</strong> and we&apos;ll take it manually.</div>
              </div>
            </div>
          )}
          <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full bg-tertiary text-white py-2 px-4  hover:bg-tertiary focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rainbow-button ${roundingClasses.button}`}
                >
              {isLoading ? (
                  <>
                    Processing...
                  </>
                ) : (
                  <>Get Quote Now</>
                )}
          </button>
        </form>
        </div>
      </div>
  );
}