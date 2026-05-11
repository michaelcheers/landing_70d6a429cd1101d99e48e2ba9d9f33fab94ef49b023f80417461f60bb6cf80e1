
import Review from "/src/app/components/review.jsx"
import "../../landing.css"
import { useState,} from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useAddress } from "/src/app/contextValues.jsx";
import {useRouter} from "/src/router/Router.jsx"


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
  MoveSize?: string; // Added MoveSize field
  ReferralSource: string;
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
  City?: string;
  CompanyLocationId?: number;
}
export default function CalCallBack() {

  const today = new Date();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    moveSize: "", // Added moveSize to formData
  });

  const {utmData} = useAddress();
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 360);

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
    const handleSubmit = (e: React.FormEvent) => {
        setIsLoading(true)
        e.preventDefault();

        if (!isValidPhoneNumber(formData.phone)) {
            alert("Please enter a valid phone number. ex. 000-000-0000");
            setIsLoading(false)
            return;
        }

        // Send lead data to the API
        sendLeadData();

    };

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

        const from = getTrafficSource(utmData)

        let referralsource = ""
        if (from == "Other"){
        referralsource = `Organic - Calgary`
        }else if (from ==  "Pmax"){
        referralsource = from
        }else if (from ==  "Google"){
        referralsource = "Google Residential Calgary"
        }else if (from == "Meta"){
        referralsource = from + ` - Calgary`
        }else{
        referralsource = from + ` - Residential`
        }

        const leadData: LeadData = {
        FullName: formData.name,
        Email: formData.email,
        PhoneNumber: formData.phone,
        ReferralSource: referralsource,
        BranchId: "98a3854c-cb46-4025-b0a1-b265013b069e",
        City: "calgary",
        CompanyLocationId: 37,
        UtmMedium: utmData?.utm_medium,
        UtmKeyword: utmData?.utm_keyword,
        UtmCampaign: utmData?.utm_campaign,
        UtmSource: utmData?.utm_source,
        UtmContent: utmData?.utm_content,
        };

        if (utmData?.utm_campaign) {leadData.Campaign = utmData.utm_campaign;} else if (utmData?.campaign){ leadData.Campaign = utmData.campaign;}
        if (utmData?.utm_source) leadData.Source = utmData.utm_source;

    try {
      // Fire the API call without waiting for response
      const { buildService1Payload, SERVICE1_BASE } = await import('/src/api/endpoints.js');
      const apiPromise = fetch(SERVICE1_BASE + '/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(buildService1Payload(leadData)),
        keepalive: true,
      });

      // Handle the API response in the background (optional error logging)
      apiPromise
        .then(async (response) => {
          if (!response.ok) {
            console.error('Lead submission failed:', response.status, await response.text());
          } else {
            console.log('Lead submitted successfully');
          }
        })
        .catch((error) => {
          console.error('Lead submission error:', error);
          // Optional: You could implement retry logic here
        });



      // Immediately redirect to thank you page
      router.push(`/thankyou`);

    } catch (error) {
      // Only catch synchronous errors (like JSON.stringify failures)
      console.error('Error preparing lead data:', error);
      setIsLoading(false);
      alert('There was an error preparing your request. Please try again.');
    }
    };


    return (
        <div className="flex flex-col items-center mt-13 md:mt-20">
            <div className="text-xl md:text-3xl text-center font-bold my-5">
                <h1 className="text-tertiary">We will give you a call back right away.</h1>
                <h2>Please enter your details below for a call back.</h2>
            </div>

            <form className="w-full max-w-md px-4" onSubmit={handleSubmit}>
                <div className="space-y-6">
                    <div>
                        <label htmlFor="fullname" className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
                            placeholder="Enter your full name"
                        />
                    </div>

                    <div>
                        <label htmlFor="phonenumber" className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
                            placeholder="Enter your phone number"
                        />
                    </div>

                    <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-tertiary text-white py-2 px-4  hover:bg-tertiary focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rainbow-button !rounded-xl"
                            >
                        {isLoading ? (
                            <>
                                Processing...
                            </>
                            ) : (
                            <>Call Me Back</>
                            )}
                    </button>
                </div>
            </form>

            <div className="flex flex-col items-center mt-10 md:mt-15 w-full">
                <Review/>
            </div>
        </div>
    )
}
