import {PhoneIcon, ClockIcon, MapPinIcon, EnvelopeIcon} from "@heroicons/react/24/outline"
import Link from "/src/components/Link.jsx"
import Image from "/src/components/Image.jsx"
import Mascot from '/src/images/mascot.webp'

export default function Footer() {

    return (
        <>
        <div className="hidden md:flex justify-center flex-wrap pt-6 bg-[#06170e]">
            <div className="grid grid-cols-1 md:grid-cols-3 md:w-[1200px]">
                <div className="col-span-1">
                    <div className="flex items-center justify-center">
                        <Image src={Mascot} alt="" width={189} height={252} loading="lazy"/>
                    </div>
                </div>
                <div className="col-span-1 md:col-span-2 text-white text-sm">
                    <div className="mb-6">
                        <h3 className="font-bold pb-2 border-b-2 pl-2 border-white">
                        Services
                        </h3>
                        <ul className="mt-4 space-y-2  pl-2 flex gap-x-20 text-regular">
                        <Link href="/calgary/service/residential">Residential Moving</Link>
                        <Link href="/calgary/service/packing">Packing</Link>
                        <Link href="/calgary/service/storage">Storage</Link>
                        </ul>
                    </div>
                    <div className="mb-6">
                        <h3 className="font-bold pb-2 border-b-2 pl-2 border-white">
                        <Link href="/calgary/commercial">Commercial Moving</Link>
                        </h3>
                        <ul className="mt-4 space-y-2  pl-2 flex gap-x-20 text-regular">
                        <Link href="/calgary/service/warehouse">Warehouse</Link>
                        <Link href="/calgary/service/office">Office</Link>
                        <Link href="/calgary/service/specialEquipment">Special Equipment</Link>
                        <Link href="/calgary/service/art">Art</Link>
                        <Link href="/calgary/service/lastmile">Last Mile</Link>
                        </ul>
                    </div>

                    {/* Company Section */}
                    <div>
                        <h3 className="font-bold pb-2 border-b-2 pl-2 border-white">
                        Company
                        </h3>
                        <ul className="mt-4 space-y-2 pl-2 flex gap-x-20">
                        <Link href="/calgary/company">About Us</Link>
                        <Link href="/calgary/reviews">Reviews</Link>
                        </ul>
                    </div>
                    <div className="flex">
                        <div className="flex flex-col gap-y-5 my-5 pl-2 text-sm text-[13px] w-full">
                            <div className="flex items-center">
                                <ClockIcon className="h-5 w-5"/>
                                <div className="pl-1">
                                    <div>Mon-Fri: 8am - 8pm</div>
                                    <div>Sat-Sun: 8am - 6pm</div>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <MapPinIcon className="h-5 w-5"/>
                                <span className="pl-1">123 17th Avenue SW, Calgary, AB T2S 0A1</span>
                            </div>
                            <div className="flex items-center">
                                <Link href={`tel:5878125952`} className="flex">
                                    <PhoneIcon className="h-5 w-5"/>
                                    <span className="pl-1">(587) 812-5952</span>
                                </Link>
                            </div>
                            <div className="flex items-center">
                                <Link href={`mailto:calgary@movingpapa.com`} className="flex">
                                    <EnvelopeIcon className="h-5 w-5"/>
                                    <span className="pl-1">calgary@movingpapa.com</span>
                                </Link>
                            </div>
                            <div className="bg-tertiary/10 p-2 rounded-md">
                                <div className="text-xs text-white font-bold mb-2">MULTI-CITY SERVICE</div>
                                <div className="flex flex-wrap gap-2">
                                    <Link href="/toronto" className="text-sm hover:text-tertiary">Toronto</Link>
                                    <span className="text-white/50">|</span>
                                    <Link href="/vancouver" className="text-sm hover:text-tertiary">Vancouver</Link>
                                    <span className="text-white/50">|</span>
                                    <Link href="/ottawa" className="text-sm hover:text-tertiary">Ottawa</Link>
                                    <span className="text-white/50">|</span>
                                    <Link href="/edmonton" className="text-sm hover:text-tertiary">Edmonton</Link>
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex justify-end">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2508.4022576878707!2d-114.07117768431407!3d51.04473497956244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x53716fe8c8e5e8a3%3A0x5a8f5b8a7d4b0b0!2s17%20Ave%20SW%2C%20Calgary%2C%20AB!5e0!3m2!1sen!2sca!4v1234567890123!5m2!1sen!2sca" width="400" height="200" style={{border:0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                    </div>

                    <div className="flex items-center py-2 pl-2 gap-x-10 text-[12px] pt-10">
                        <div className="flex ">
                            <div className="relative">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M15 9.354C14.4626 8.7447 13.7523 8.31351 12.9638 8.11779C12.1753 7.92208 11.3458 7.97112 10.5859 8.2584C9.8259 8.54568 9.17143 9.05757 8.70954 9.72596C8.24765 10.3943 8.00024 11.1875 8.00024 12C8.00024 12.8125 8.24765 13.6057 8.70954 14.274C9.17143 14.9424 9.8259 15.4543 10.5859 15.7416C11.3458 16.0289 12.1753 16.0779 12.9638 15.8822C13.7523 15.6865 14.4626 15.2553 15 14.646" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                            <span className="pl-2 flex items-center">{`Copyright ${new Date().getFullYear()}. Moving Papa. All rights reserved`}</span>
                        </div>
                        <div className="border-l-1 pl-10">
                                <Link href="/calgary/privacy-policy">
                                    Privacy Policy
                                </Link>
                            </div>
                            <div className="border-l-1 pl-10">
                            <Link href="/calgary/terms-and-condition">
                                Terms and Condition
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div className="sm:hidden bg-[#06170e] flex justify-center flex-wrap pt-6 pl-2">
            <div className="grid grid-cols-1 md:grid-cols-3 md:w-[1200px] w-full px-4">
                {/* Left Section */}
                <div className="col-span-1 text-white text-sm mb-6 md:mb-0">
                <h3 className="font-bold pb-2 border-b-2 border-white">
                    Services
                </h3>
                <ul className="mt-4 space-y-2 flex flex-col">
                    <Link href="/calgary/service/residential">Residential Moving</Link>
                    <Link href="/calgary/service/packing">Packing</Link>
                    <Link href="/calgary/service/storage">Storage</Link>

                </ul>
                </div>
                <div className="col-span-1 text-white text-sm mb-6 md:mb-0">
                <h3 className="font-bold pb-2 border-b-2 border-white">
                    Commercial Moving
                </h3>
                <ul className="mt-4 space-y-2 flex flex-col">
                    <Link href="/calgary/service/warehouse">Warehouse</Link>
                    <Link href="/calgary/service/office">Office</Link>
                    <Link href="/calgary/service/specialEquipment">Special Equipment</Link>
                    <Link href="/calgary/service/art">Art</Link>
                    <Link href="/calgary/service/lastmile">Last Mile</Link>
                </ul>
                </div>

                {/* Middle Section */}
                <div className="col-span-1 text-white text-sm mb-6 md:mb-0 ">
                    <h3 className="font-bold pb-2 border-b-2 border-white">
                        Company
                    </h3>
                    <ul className="mt-4 space-y-2 flex flex-col">
                    <Link href="/calgary/company">About Us</Link>
                    <Link href="/calgary/reviews">Reviews</Link>
                    </ul>
                </div>

                {/* Right Section */}
                <div className="col-span-1 text-white text-sm pb-6 border-t-2 pt-5">
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <ClockIcon className="h-5 w-5" />
                            <div className="pl-2">
                                <div>Mon-Fri: 8am - 8pm</div>
                                <div>Sat-Sun: 8am - 6pm</div>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <MapPinIcon className="h-5 w-5" />
                            <span className="pl-2">
                                123 17th Avenue SW, Calgary, AB T2S 0A1
                            </span>
                        </div>
                        <div className="flex items-center">
                            <Link href={`tel:5878125952`} className="flex">
                                <PhoneIcon className="h-5 w-5"/>
                                <span className="pl-1">(587) 812-5952</span>
                            </Link>
                        </div>
                        <div className="flex items-center">
                            <Link href={`mailto:calgary@movingpapa.com`} className="flex">
                                <EnvelopeIcon className="h-5 w-5"/>
                                <span className="pl-1">calgary@movingpapa.com</span>
                            </Link>
                        </div>
                        <div className="bg-tertiary/10 p-2 rounded-md">
                            <div className="text-xs text-white font-bold mb-2">MULTI-CITY SERVICE</div>
                            <div className="flex flex-wrap gap-2">
                                <Link href="/toronto" className="text-sm hover:text-tertiary">Toronto</Link>
                                <span className="text-white/50">|</span>
                                <Link href="/vancouver" className="text-sm hover:text-tertiary">Vancouver</Link>
                                <span className="text-white/50">|</span>
                                <Link href="/ottawa" className="text-sm hover:text-tertiary">Ottawa</Link>
                                <span className="text-white/50">|</span>
                                <Link href="/edmonton" className="text-sm hover:text-tertiary">Edmonton</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="pb-5">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2508.4022576878707!2d-114.07117768431407!3d51.04473497956244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x53716fe8c8e5e8a3%3A0x5a8f5b8a7d4b0b0!2s17%20Ave%20SW%2C%20Calgary%2C%20AB!5e0!3m2!1sen!2sca!4v1234567890123!5m2!1sen!2sca" width="300" height="200" style={{border:0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
                {/* Bottom Section */}
            <div className="w-full bg-[#06170e] text-white text-xs px-4 py-4 border-t border-white">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <div className="flex items-center">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    >
                    <path
                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                        stroke="#F3F3F3"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M15 9.354C14.4626 8.7447 13.7523 8.31351 12.9638 8.11779C12.1753 7.92208 11.3458 7.97112 10.5859 8.2584C9.8259 8.54568 9.17143 9.05757 8.70954 9.72596C8.24765 10.3943 8.00024 11.1875 8.00024 12C8.00024 12.8125 8.24765 13.6057 8.70954 14.274C9.17143 14.9424 9.8259 15.4543 10.5859 15.7416C11.3458 16.0289 12.1753 16.0779 12.9638 15.8822C13.7523 15.6865 14.4626 15.2553 15 14.646"
                        stroke="#F3F3F3"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    </svg>
                    <span className="pl-2">
                    {`Copyright ${new Date().getFullYear()}. Moving Papa. All rights reserved.`}
                    </span>
                </div>
                    <div className="flex ">
                        <Link href="/calgary/privacy-policy" className="pr-5">
                            Privacy Policy
                        </Link>
                        <Link href="/calgary/terms-and-condition" className="border-l-1 pl-5">
                            Terms and Condition
                        </Link>
                    </div>
                </div>
            </div>
        </div>
        </>


    )
}
