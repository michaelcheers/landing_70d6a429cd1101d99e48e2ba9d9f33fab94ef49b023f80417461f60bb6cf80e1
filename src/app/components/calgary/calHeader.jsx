
import { Bars4Icon, ChevronDownIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { useState, useRef, useEffect } from 'react';
import Link from "/src/components/Link.jsx";
import headerLogow from '/src/images/headerlogonew.svg'
import Image from "/src/components/Image.jsx"
import { usePathname } from "/src/router/Router.jsx";

// Define the prop types for the Header component
interface HeaderProps {
  section?: 'residential' | 'commercial';
}

export default function Header({ section = 'residential' }: HeaderProps) {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const pathname = usePathname();

    // Determine if we're using the commercial theme
    const isCommercial = section === 'commercial';

    // Determine the correct finalstep URL based on the current path or section prop
    const getFinalstepUrl = () => {
        // Check if we're on a commercial page based on path
        const isCommercialPath = pathname?.includes('/commercial') ||
                                pathname?.includes('/service/warehouse') ||
                                pathname?.includes('/service/office') ||
                                pathname?.includes('/service/specialEquipment') ||
                                pathname?.includes('/service/art') ||
                                pathname?.includes('/service/lastmile');

        // If we're on a commercial page or the section prop is set to commercial,
        // go to commercial finalstep
        if (pathname?.includes('/storage')){
            return '/calgary/finalstep/storage'
        }
        return (isCommercialPath || isCommercial) ? '/calgary/finalstep/commercial' : '/calgary/finalstep/residential';
    };

    // Create the finalstep URL for the quote button
    const finalstepUrl = getFinalstepUrl();

    // Set the styles based on the section prop
    const bgColor = isCommercial ? 'bg-primary' : 'bg-[#F8F5EC]';
    const textColor = isCommercial ? 'text-white' : 'text-primary';
    const butTextColor = isCommercial ? 'text-white' : 'text-tertiary'
    const borderColor = isCommercial ? 'border-white' : 'border-primary';
    const hoverTextColor = isCommercial ? 'hover:text-tertiary' : 'hover:text-white';
    const hoverBackgd = isCommercial ? 'hover:bg-white' : 'hover:bg-tertiary'
    const buttonBgColor = isCommercial ? 'bg-tertiary text-white' : 'bg-tertiary text-white';
    const phoneBorderColor = isCommercial ? 'border-tertiary' : 'border-tertiary';
    const phoneIconColor = isCommercial ? 'text-tertiary' : 'text-tertiary';
    const dropdownBgColor = isCommercial ? 'bg-primary' : 'bg-white';
    const dropdownTextColor = isCommercial ? 'text-white' : 'text-primary';
    const dropdownBorderColor = isCommercial ? 'border-white' : 'border-primary';
    const headerlogo = isCommercial ? headerLogow : headerLogow;

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current &&
                buttonRef.current &&
                !menuRef.current.contains(event.target as Node) &&
                !buttonRef.current.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className={`transition-all duration-300 ${bgColor} border-b-1`}>
        {/* Desktop Header */}
            <div className="hidden md:flex justify-center">
                <div className="h-20 flex md:w-[1300px]">
                <div className="flex items-center h-20 w-70">
                    <Link href="/calgary" className="flex items-center">
                        <Image src={headerlogo} alt="Moving Papa Logo" priority />
                    </Link>
                </div>
                <div className={`flex w-full items-center font-bold justify-end ${textColor}`}>
                    <div className='flex  justify-between items-center text-lg'>
                        <div className={`flex gap-x-8`}>
                            <div className="group relative">
                                <div className="flex">
                                Service
                                <ChevronDownIcon className="h-6 w-6 m-1 transform transition-transform duration-200 group-hover:rotate-180" strokeWidth={3} />
                                </div>
                                <div className="absolute hidden group-hover:block z-1000">
                                <div className={`space-y-2 mt-2 ${dropdownBgColor} ${dropdownTextColor} p-3 border-2 ${dropdownBorderColor} rounded-md shadow-lg w-60 flex flex-col`}>
                                    {/* Residential Services */}
                                    <div className="font-bold border-b border-gray-300 pb-2 mb-2">Residential</div>
                                    <Link href="/calgary/service/residential" className="hover:pl-2 transition-all duration-200 no-underline hover:underline ml-2">Residential Moving</Link>
                                    <Link href="/calgary/service/packing" className="hover:pl-2 transition-all duration-200 no-underline hover:underline ml-2">Packing</Link>
                                    <Link href="/calgary/service/storage" className="hover:pl-2 transition-all duration-200 no-underline hover:underline ml-2">Storage</Link>

                                    {/* Commercial Services */}
                                    <div className="font-bold border-b border-gray-300 pb-2 mb-2 mt-3">Commercial</div>
                                    <Link href="/calgary/commercial" className="hover:pl-2 transition-all duration-200 no-underline hover:underline ml-2 font-semibold">Commercial Overview</Link>
                                    <Link href="/calgary/service/warehouse" className="hover:pl-2 transition-all duration-200 no-underline hover:underline ml-2">Warehouse</Link>
                                    <Link href="/calgary/service/office" className="hover:pl-2 transition-all duration-200 no-underline hover:underline ml-2">Office</Link>
                                    <Link href="/calgary/service/specialEquipment" className="hover:pl-2 transition-all duration-200 no-underline hover:underline ml-2">Special Equipment</Link>
                                    <Link href="/calgary/service/art" className="hover:pl-2 transition-all duration-200 no-underline hover:underline ml-2">Art</Link>
                                    <Link href="/calgary/service/lastmile" className="hover:pl-2 transition-all duration-200 no-underline hover:underline ml-2">Last Mile</Link>
                                </div>
                                </div>
                            </div>
                            <Link href="/calgary/areas-of-service" className='hover:underline'>Areas of Service</Link>
                            <Link href="/calgary/reviews" className='hover:underline'>Reviews</Link>
                            <Link href="/calgary/blog" className='hover:underline'>Blogs</Link>
                            <Link href="/calgary/company" className='hover:underline'>Company</Link>
                        </div>
                        <div className="flex items-end gap-x-5 ml-5">
                            <div className={`flex-col w-40 border-r-3 pr-4 ${borderColor}`}>
                                <Link href={`tel:5878125952`}>
                                    <button className={`w-full h-10 flex justify-center items-center hover:cursor-pointer border-2 border-tertiary rounded-xl text-sm ${bgColor} ${butTextColor} ${hoverTextColor} ${hoverBackgd}`}>
                                    587-812-5952
                                    </button>
                                </Link>
                            </div>
                            <div className="flex-col w-35 justify-center items-center">
                                <Link href={finalstepUrl}>
                                    <button className={`w-full h-10 flex justify-center !rounded-lg items-center p-2 ${buttonBgColor} font-bold text-sm hover:cursor-pointer`}>
                                    GET A QUOTE
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>

            {/* Mobile Header */}
            <div className={`flex md:hidden items-center px-4 py-2 ${bgColor} ${textColor}`}>
                <div className="flex items-center h-13 w-40">
                    <Link href="/calgary">
                        <Image src={headerlogo} alt="Moving Papa Logo" priority />
                    </Link>
                </div>
                <div className='flex-grow flex justify-end items-center gap-x-2'>
                    <a href="tel:5878125952">
                        <button className={`${phoneBorderColor} border-1 flex justify-center items-center p-1 rounded-md ${bgColor}`}>
                            <PhoneIcon className={`h-5 w-5 ${phoneIconColor}`} strokeWidth={2} />
                        </button>
                    </a>
                    <Link href={finalstepUrl}>
                        <button>
                            <div className={`flex items-center rounded-md !font-bold justify-center ${buttonBgColor} text-[10px] px-3 py-2`}>
                                GET A QUOTE
                            </div>
                        </button>
                    </Link>

                    <button
                    ref={buttonRef}
                    className={textColor}
                    onClick={() => setMenuOpen(!menuOpen)}
                    >
                    <Bars4Icon className="h-8 w-8" strokeWidth={2} />
                    </button>
                </div>
            </div>

            {/* Dropdown Menu */}
            {menuOpen && (
                <div ref={menuRef} className={`bg-primary text-white ml-4 px-4 py-2 border-1 border-white rounded-md absolute z-10 w-9/10 pb-4`}>
                <div className="mb-4">
                    <div className="font-bold border-b-2 pb-2">Services</div>

                    {/* Residential Services */}
                    <div className="mt-3 mb-3">
                        <div className="font-semibold text-sm text-gray-200 mb-2">Residential</div>
                        <ul className="ml-4 space-y-2 flex flex-col">
                            <Link href="/calgary/service/residential" onClick={() => setMenuOpen(false)}>Residential Moving</Link>
                            <Link href="/calgary/service/packing" onClick={() => setMenuOpen(false)}>Packing</Link>
                            <Link href="/calgary/service/storage" onClick={() => setMenuOpen(false)}>Storage</Link>
                        </ul>
                    </div>

                    {/* Commercial Services */}
                    <div className="border-t border-gray-400 pt-3">
                        <div className="font-semibold text-sm text-gray-200 mb-2">Commercial</div>
                        <div className="mb-2">
                            <Link href="/calgary/commercial" onClick={() => setMenuOpen(false)} className="font-bold ml-4">
                                Commercial Overview
                            </Link>
                        </div>
                        <ul className="ml-4 space-y-2 flex flex-col">
                            <Link href="/calgary/service/warehouse" onClick={() => setMenuOpen(false)}>Warehouse</Link>
                            <Link href="/calgary/service/office" onClick={() => setMenuOpen(false)}>Office</Link>
                            <Link href="/calgary/service/specialEquipment" onClick={() => setMenuOpen(false)}>Special Equipment</Link>
                            <Link href="/calgary/service/art" onClick={() => setMenuOpen(false)}>Art</Link>
                            <Link href="/calgary/service/lastmile" onClick={() => setMenuOpen(false)}>Last Mile</Link>
                        </ul>
                    </div>
                </div>

                <div className="mb-4 border-t border-gray-400 pt-3">
                    <Link href="/calgary/areas-of-service" onClick={() => setMenuOpen(false)} className="font-bold">Areas of Service</Link>
                </div>
                <div className="mb-4">
                    <Link href="/calgary/reviews" onClick={() => setMenuOpen(false)} className="font-bold">Reviews</Link>
                </div>
                <div className="mb-4">
                    <Link href="/calgary/blog" onClick={() => setMenuOpen(false)} className="font-bold">Blogs</Link>
                </div>
                <div>
                    <Link href="/calgary/company" onClick={() => setMenuOpen(false)} className="font-bold">Company</Link>
                </div>
                </div>
            )}
        </div>
    );
}
