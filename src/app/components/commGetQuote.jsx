import { useState } from "react";
import { useRouter } from "/src/router/Router.jsx";
import LocationAutocomplete from "/src/app/components/locationautocomplete.jsx";
import { useAddress } from "/src/app/contextValues.jsx";
import "../landing.css";
import { trackFormSubmission, trackQuoteRequest } from "/src/app/utils/analytics.js";

interface GetQuoteProps {
  from?: 'moving' | 'home' | 'lastmile' | 'commercial' | 'vancouver-moving' | 'vancouver-home' | 'vancouver-lastmile' | 'vancouver-commercial' | 'ottawa-moving' | 'ottawa-home' | 'ottawa-lastmile' | 'ottawa-commercial' | 'calgary-moving' | 'calgary-home' | 'calgary-lastmile' | 'calgary-commercial' | 'edmonton-moving' | 'edmonton-home' | 'edmonton-lastmile' | 'edmonton-commercial';
}
const getTrafficSource = (utmData: Record<string, string | null>) => {
  // Extract utm_source to check the source
  const source = (utmData?.utm_source || "").toLowerCase();
  
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

  // For deeper analysis, check campaign and medium as well
  const medium = (utmData?.utm_medium || "").toLowerCase();
  const campaign = (utmData?.utm_campaign || "").toLowerCase();
  
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
export default function CommGetQuote({ from }: GetQuoteProps) {
    const [type, setType] = useState<string>(
      (from === "home" || from === "moving" || from == "vancouver-moving" || from == "vancouver-home" || from == "ottawa-moving" || from == "ottawa-home" || from == "calgary-moving" || from == "calgary-home" || from == "edmonton-moving" || from == "edmonton-home") ? "moving" : "lastmile" // Default value based on 'from'
    );
    const { setPickupAddress, setDestinationAddress, utmData} = useAddress();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const [lastMileData, setLastMileData] = useState({
      businessEmail: "",
      phoneNumber: "",
      firstName: "",
      lastName: "",
    });
    const [smsConsent, setSmsConsent] = useState(false);
    const SMS_CONSENT_TEXT = "I consent to receive SMS/text messages from Moving Papa at the phone number above regarding my commercial moving quote, scheduling, and follow-ups. Message and data rates may apply. Reply STOP to opt out.";


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
  
      // Save the dropoff address to the global state
      setDestinationAddress({ street, city, state, zipCode });
    };

    const handleChange = (value: string) => {
      setType(value);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setLastMileData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

    const handleSubmit = () => {
      if(from == "moving" || from == "home")
      {
        router.push("/finalstep/commercial");
      }else if(from == "ottawa-moving" || from == "ottawa-home"){
        router.push("/ottawa/finalstep/commercial");
      }else if(from == "calgary-moving" || from == "calgary-home"){
        router.push("/calgary/finalstep/commercial");
      }else if(from == "edmonton-moving" || from == "edmonton-home"){
        router.push("/edmonton/finalstep/commercial");
      }else{
        router.push("/vancouver/finalstep/commercial");
      }
    }

    const isValidPhoneNumber = (phoneNumber: string) => {
      // Regex for validating phone numbers (E.164 format: +1234567890)
      const phoneRegex = /^\+?[1-9]\d{1,14}$/;
      return phoneRegex.test(phoneNumber);
    };

    const handleSubmitLastmile = async () => {
      setIsLoading(true);
      const source = getTrafficSource(utmData)

      let referralsource = ""
      if (source == "Other" && from == "lastmile"){
        referralsource = "Organic - Toronto"
      }else if(source == "Other" && from == "vancouver-lastmile"){
        referralsource = "Organic - Vancouver"
      }else if(source == "Other" && from == "ottawa-lastmile"){
        referralsource = "Organic - Ottawa"
      }else if(source == "Other" && from == "calgary-lastmile"){
        referralsource = "Organic - Calgary"
      }else if(source == "Other" && from == "edmonton-lastmile"){
        referralsource = "Organic - Edmonton"
      }else if (source == "Meta" && from == "lastmile"){
        referralsource = "Meta - Toronto"
      }else if (source == "Meta" && from == "vancouver-lastmile"){
        referralsource = "Meta - Vancouver"
      }else if (source == "Meta" && from == "ottawa-lastmile"){
        referralsource = "Meta - Ottawa"
      }else if (source == "Meta" && from == "calgary-lastmile"){
        referralsource = "Meta - Calgary"
      }else if (source == "Meta" && from == "edmonton-lastmile"){
        referralsource = "Meta - Edmonton"
      }
      else{
        referralsource = source + " - Last Mile"
      }

      if (
        !lastMileData.businessEmail.trim() ||
        !lastMileData.phoneNumber.trim() ||
        !lastMileData.firstName.trim() ||
        !lastMileData.lastName.trim()
      ) {
        alert("Please fill in all required fields.");
        return;
      }

      if (!isValidPhoneNumber(lastMileData.phoneNumber)) {
        alert("Please enter a valid phone number.");
        return;
      }

      if (!smsConsent) {
        alert("Please confirm SMS consent to continue.");
        setIsLoading(false);
        return;
      }
      
      trackFormSubmission('initial_lastmile_quote', {
        business_name: `${lastMileData.firstName} ${lastMileData.lastName}`,
        business_email_domain: lastMileData.businessEmail.split('@')[1] || '',
      });

      trackQuoteRequest('lastmile', {
        business_name: `${lastMileData.firstName} ${lastMileData.lastName}`,
      });
      
      const bId = (from == "moving"|| from == "lastmile" || from == "home" || from == "ottawa-lastmile" || from == "ottawa-moving" || from == "ottawa-home" || from == "calgary-lastmile" || from == "calgary-moving" || from == "calgary-home" || from == "edmonton-lastmile" || from == "edmonton-moving" || from == "edmonton-home") ? "b8164028-c730-4fc4-912c-b1f4016f1130" : "98a3854c-cb46-4025-b0a1-b265013b069e"
      const fromStr = String(from || "");
      const cityFromSource: "toronto" | "vancouver" | "ottawa" | "calgary" | "edmonton" =
        fromStr.startsWith("vancouver-") ? "vancouver"
        : fromStr.startsWith("ottawa-") ? "ottawa"
        : fromStr.startsWith("calgary-") ? "calgary"
        : fromStr.startsWith("edmonton-") ? "edmonton"
        : "toronto";
      const companyLocationId = ({ toronto: 4, vancouver: 25, ottawa: 36, calgary: 37, edmonton: 38 } as const)[cityFromSource];
      const reqBody = {
        FullName: `${lastMileData.firstName} ${lastMileData.lastName}`,
        PhoneNumber: lastMileData.phoneNumber,
        Email: lastMileData.businessEmail,
        ReferralSource: referralsource,
        BranchId: bId,
        City: cityFromSource,
        CompanyLocationId: companyLocationId,
        SmsOptIn: smsConsent,
        SmsOptInText: SMS_CONSENT_TEXT,
        SmsOptInTimestamp: new Date().toISOString(),
      }

      try {
        const { buildService1Payload, SERVICE1_BASE } = await import('/src/api/endpoints.js');
        const response = await fetch(SERVICE1_BASE + "/api/bookings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(buildService1Payload(reqBody)),
        });

        if (!response.ok && response.status !== 409) {
          setIsLoading(false);
          throw new Error("Failed to submit last mile data");
          return;
        }
        
        router.push(`/thankyou?formType=lastmile_quote&businessName=${encodeURIComponent(lastMileData.firstName + ' ' + lastMileData.lastName)}`)
      } catch (error) {
        setIsLoading(false);
        console.error("Error submitting last mile data:", error);
        alert("There was an error submitting your request. Please try again.");
      }
    };

    return(
        <div className="w-full md:w-4/5 mt-5 bg-white ">
          <div className="flex flex-wrap pl-1 py-4 md:p-5 md:pl-10 gap-x-1 md:gap-x-5 border-b-1 text-[10px] md:text-[12px] gap-y-2">
              <div className="flex items-center py-1 px-2 bg-primary text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 md:w-[18px] md:h-[18px]" viewBox="0 0 10 11" fill="none">
                    <circle cx="5.02296" cy="4.26725" r="3.06172" stroke="#FFFFFF" strokeWidth="0.612417"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M5.02307 5.03289L4.12324 5.50596L4.29509 4.50398L3.56711 3.79438L4.57315 3.6482L5.02307 2.73657L5.47298 3.6482L6.47902 3.79438L5.75104 4.50398L5.92289 5.50596L5.02307 5.03289Z" stroke="#FFFFFF" strokeWidth="0.612417" strokeLinejoin="round"/>
                    <path d="M5.32959 7.32955L6.55429 9.16661L7.16664 7.9419H9.0037L7.77899 5.79868" stroke="#FFFFFF" strokeWidth="0.612417" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M4.71704 7.32955L3.49234 9.16661L2.87999 7.9419H1.04293L2.26764 5.79868" stroke="#FFFFFF" strokeWidth="0.612417" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Fully Protected
                </div>
              <div className="flex items-center py-1 px-2 bg-primary text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 md:w-[18px] md:h-[18px]"  viewBox="0 0 13 13" fill="none">
                  <path d="M5.01392 6.5652L6.20698 7.75827L8.44398 5.52127" stroke="#FFFFFF" strokeWidth="0.745665" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M5.61535 2.14432C6.12022 1.80774 6.77796 1.80774 7.28283 2.14432C8.11537 2.69935 9.05621 3.0714 10.0432 3.2359L10.5503 3.32041V4.31632C10.5503 7.27471 8.99025 10.0121 6.44909 11.5206C3.90793 10.0121 2.34793 7.27471 2.34793 4.31632V3.32041L2.855 3.2359C3.84197 3.0714 4.78281 2.69935 5.61535 2.14432Z" stroke="#FFFFFF" strokeWidth="0.745665"/>
                  </svg>
                  Background Checks
              </div>
              <div className="flex items-center py-1 px-2 bg-primary text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 md:w-[18px] md:h-[18px]"  viewBox="0 0 10 10" fill="none">
                  <path d="M7.01999 7.02724C5.15742 8.51729 3.25525 7.70296 2.38646 7.02724C1.80727 6.15845 0.938481 3.55209 3.54484 3.26249C5.58007 3.03635 6.73039 2.10411 7.59918 1.23532C8.46797 3.26249 8.46797 5.86885 7.01999 7.02724Z" stroke="#FFFFFF" strokeWidth="0.579191" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M1.22803 8.18566C1.4597 7.7223 2.09681 7.22034 2.38641 7.02727C4.41358 7.02727 6.15115 6.15849 6.44075 4.13132" stroke="#FFFFFF" strokeWidth="0.579191" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Sustainable
              </div>
          </div>
          <div className="pb-10 pl-2 md:pl-10">
              <div className="my-2 font-bold text-[18px]">
                Get Your <span className="text-tertiary" >Free Quote</span>
              </div>

              {
                (from === "home" || from === "vancouver-home" || from === "ottawa-home" || from === "calgary-home" || from === "edmonton-home") && (
              <div className="toggle-group border-1" >
                <button
                  className={`px-5 font-bold toggle-button ${type === 'moving' ? 'active' : ''}`} 
                  onClick={() => handleChange('moving')}
                >
                  Moving
                </button>
                <button
                  className={`px-5 font-bold toggle-button ${type === 'lastmile' ? 'active' : ''}`}
                  onClick={() => handleChange('lastmile')}
                >
                  Last-mile
                </button>
              </div>
                )
              }
              {
                (from != "home" && from != "vancouver-home" && from != "ottawa-home" && from != "calgary-home" && from != "edmonton-home") && (
                  <div className="w-full flex">
                  <div className="border-1 border-primary md:w-2/4 h-1/3  mb-1">
                      <div className="flex items-center justify-center gap-x-2 text-primary font-reg p-2 border-b-1 border-primary">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 34 34" fill="none">
                              <path d="M31.7893 17.5252C31.7893 16.4366 31.693 15.3898 31.5142 14.3849H17.2651V20.3306H25.4075C25.0499 22.2427 23.9771 23.8617 22.3679 24.9504V28.8165H27.278C30.1389 26.1367 31.7893 22.2008 31.7893 17.5252Z" fill="#4285F4"/>
                              <path d="M17.2642 32.5288C21.3491 32.5288 24.7739 31.161 27.2771 28.8162L22.3669 24.9501C21.019 25.8713 19.2998 26.4296 17.2642 26.4296C13.3306 26.4296 9.98836 23.7359 8.79176 20.1071H3.75781V24.0709C6.24728 29.0814 11.35 32.5288 17.2642 32.5288Z" fill="#34A853"/>
                              <path d="M8.79168 20.0912C8.4891 19.17 8.3103 18.193 8.3103 17.1741C8.3103 16.1553 8.4891 15.1783 8.79168 14.2571V10.2933H3.75773C2.72619 12.359 2.13477 14.6898 2.13477 17.1741C2.13477 19.6585 2.72619 21.9893 3.75773 24.055L7.67761 20.9565L8.79168 20.0912Z" fill="#FBBC05"/>
                              <path d="M17.2642 7.93862C19.4923 7.93862 21.4729 8.72021 23.0546 10.2276L27.3871 5.83111C24.7601 3.34676 21.3491 1.82544 17.2642 1.82544C11.35 1.82544 6.24728 5.27283 3.75781 10.2974L8.79176 14.2612C9.98836 10.6323 13.3306 7.93862 17.2642 7.93862Z" fill="#EA4335"/>
                          </svg>
                          <span className="text-xs font-bold text-primary">
                              Google Top Rated Service
                          </span>
                      </div>
                      <div className="flex flex-col items-center justify-center p-2">
                          <span className="font-bold text-priamry text-[11px]">4.9 Excellent</span>
                          <div className="flex gap-x-1" >
                          {[...Array(5)].map((_, index) => (
                              <svg key={index} xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 33 32" fill="none">
                                  <path d="M32.4135 0.238281H0.857178V31.7946H32.4135V0.238281Z" fill="#103928"/>
                                  <path d="M16.6348 21.5058L21.434 20.2895L23.4392 26.4693L16.6348 21.5058ZM27.6795 13.5181H19.2316L16.6348 5.56323L14.038 13.5181H5.59009L12.4273 18.4487L9.83047 26.4036L16.6677 21.4729L20.8752 18.4487L27.6795 13.5181Z" fill="#FEA500"/>
                              </svg>
                          ))}
                          </div>
                      </div>
                  </div>
              </div>
                )
              }


              <div className="flex-col w-full gap-2 justify-center items-center" >
                  {type === "moving" && (
                    <div>
                      {/* Pickup Point with Google Places Autocomplete */}
                      <div className="relative">
                        <div className="input-container">
                          <span className="location-icon left-4 md:left-3">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="15"
                              height="14"
                              viewBox="0 0 15 14"
                              fill="none"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M2.64819 6.15946C2.64819 3.54199 4.83548 1.42639 7.48123 1.42639C10.1344 1.42639 12.3217 3.54199 12.3217 6.15946C12.3217 7.47843 11.842 8.70295 11.0525 9.74084C10.1815 10.8857 9.10793 11.8832 7.89952 12.6661C7.62296 12.8471 7.37336 12.8607 7.06982 12.6661C5.85453 11.8832 4.78097 10.8857 3.91742 9.74084C3.12731 8.70295 2.64819 7.47843 2.64819 6.15946ZM5.88839 6.30684C5.88839 7.18369 6.6039 7.87334 7.48123 7.87334C8.35913 7.87334 9.08153 7.18369 9.08153 6.30684C9.08153 5.43682 8.35913 4.7136 7.48123 4.7136C6.6039 4.7136 5.88839 5.43682 5.88839 6.30684Z"
                                fill="#FF0000"
                              />
                            </svg>
                          </span>
                          <div className="w-19/20 md:w-14/16">
                            <LocationAutocomplete
                              apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}
                              onPlaceSelected={handlePickupPlaceSelected}
                              placeholder="Enter Location"
                              location="floating-textarea !bg-white !border-black !text-black"
                            />
                          </div>
                          <label className="floating-label !bg-white !text-black">Origin</label>
                        </div>
                      </div>
                      <div className="relative">
                        <div className="input-container">
                          <span className="location-icon left-4 md:left-3">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="15"
                              height="14"
                              viewBox="0 0 15 14"
                              fill="none"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M2.64819 6.15946C2.64819 3.54199 4.83548 1.42639 7.48123 1.42639C10.1344 1.42639 12.3217 3.54199 12.3217 6.15946C12.3217 7.47843 11.842 8.70295 11.0525 9.74084C10.1815 10.8857 9.10793 11.8832 7.89952 12.6661C7.62296 12.8471 7.37336 12.8607 7.06982 12.6661C5.85453 11.8832 4.78097 10.8857 3.91742 9.74084C3.12731 8.70295 2.64819 7.47843 2.64819 6.15946ZM5.88839 6.30684C5.88839 7.18369 6.6039 7.87334 7.48123 7.87334C8.35913 7.87334 9.08153 7.18369 9.08153 6.30684C9.08153 5.43682 8.35913 4.7136 7.48123 4.7136C6.6039 4.7136 5.88839 5.43682 5.88839 6.30684Z"
                                fill="#FF0000"
                              />
                            </svg>
                          </span>
                          <div className="w-19/20 md:w-14/16">
                            <LocationAutocomplete 
                              apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}
                              onPlaceSelected={handleDestinationPlaceSelected}
                              placeholder="Enter Location"
                              location="floating-textarea !bg-white !border-black !text-black"
                            />
                          </div>

                          <label className="floating-label !bg-white !text-black">Destination</label>
                        </div>
                      </div>
                    </div>
                  )}
                  {
                    type === "lastmile" && (
                      <form className="grid grid-cols-1 md:grid-cols-2 md:pr-8" id="lastmile-quote-form">
                      {/* Last-mile-specific inputs */}
                        <div className="relative">
                          <div className="input-container-2">
                            <input
                              className="floating-textarea-2"
                              placeholder=""
                              name="businessEmail"
                              value={lastMileData.businessEmail}
                              onChange={handleInputChange}
                            />
                            <label className="floating-label !bg-white !text-black">Business Email*
                            </label>
                          </div>
                        </div>
                        <div className="relative">
                          <div className="input-container-2">
                            <input
                              className="floating-textarea-2"
                              placeholder=""
                              name="phoneNumber"
                              value={lastMileData.phoneNumber}
                              onChange={handleInputChange}
                            />
                            <label className="floating-label !bg-white !text-black">Phone Number*</label>
                          </div>
                        </div>
                        <div className="relative">
                          <div className="input-container-2">
                            <input
                              className="floating-textarea-2"
                              placeholder=""
                              name="firstName"
                              value={lastMileData.firstName}
                              onChange={handleInputChange}
                            />
                            <label className="floating-label !bg-white !text-black">First Name*</label>
                          </div>
                        </div>
                        <div className="relativ">
                          <div className="input-container-2">
                            <input
                              className="floating-textarea-2"
                              placeholder=""
                              name="lastName"
                              value={lastMileData.lastName}
                              onChange={handleInputChange}
                            />
                            <label className="floating-label !bg-white !text-black">Last Name*</label>
                          </div>
                        </div>
                      </form>
                    )
                  }

              {type === "lastmile" && (
                <div className="flex gap-2 items-start text-xs text-black px-2 py-2 leading-snug">
                  <input
                    type="checkbox"
                    id="comm-sms-consent"
                    checked={smsConsent}
                    onChange={(e) => setSmsConsent(e.target.checked)}
                    className="mt-1 h-4 w-4 flex-shrink-0"
                  />
                  <label htmlFor="comm-sms-consent">{SMS_CONSENT_TEXT}</label>
                </div>
              )}
              <button
                onClick={type === "moving"? handleSubmit : handleSubmitLastmile}
                disabled={isLoading}
                className="rainbow-button w-19/20 md:w-7/8 flex justify-center items-center !font-bold"
              >
                {isLoading ? (
                  <>
                    Processing...
                  </>
                ) : (
                  <>Get a Quote
                  </>
                )}
              </button>
                  

              </div>
          </div>
        </div>
        
    )
}