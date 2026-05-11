import Image from "/src/components/Image.jsx"
import "../../landing.css"
import {PhoneIcon} from '@heroicons/react/24/outline';
import Link from "/src/components/Link.jsx";
import BackgroundAboutUs from "/src/app/components/background/backgroundaboutus.jsx";
import Img_1 from "/src/images/elyse.webp"
import Img_2 from '/src/images/greg.webp'


export default function Contact() {
    return (
        <div className="flex flex-col items-center mt-13 md:mt-20">
            <div className="md:pb-10 w-screen flex flex-col items-center ">
                <BackgroundAboutUs>
                    <div className="flex justify-center">
                        <div className="text-white p-6 md:p-10 md:pl-20 md:h-100 md:w-[1250px] flex flex-col justify-center">
                            <h1 className="text-4xl font-bold py-8">The Moving Papa Story</h1>
                            <p className="text-regular font-bold">
                            From Your First Box to Your Final Piece, We Move With Purpose.
                            </p>
                        </div>
                    </div>
                </BackgroundAboutUs>
            </div>
            <div className="flex flex-wrap w-full md:w-[1250px] justify-center mb-10 md:my-10 ">
                    <div className="w=1/3 hidden md:flex">
                        <Image
                            src={Img_1}
                            alt=""
                            width={3024}
                            height={4032}
                            className="w-[386px] h-[419px] object-cover custom-shadow-primary rounded-lg"
                            style={{
                                objectFit: 'cover',
                                objectPosition: '80% 30%',
                            }}
                        />
                    </div>
                    <div className="md:w-2/3 md:pl-6">
                        <h2 className="text-primary font-bold text-3xl py-6 p-6">
                        Our Story-
                        <p className="text-tertiary">Built by Hard Work, Grown by Trust</p>
                        </h2>
                        <p className="text-black text-reg px-6">
                        Moving Papa started the way most good things do — small, simple, and fueled by a lot of heart.
                        <br/><br/>We didn&apos;t launch with a fleet of trucks or a fancy office. It began with just one rented truck, a few helping hands, and a promise to treat every move like it mattered.
                        <br/>No cutting corners. No disappearing halfway through. Just showing up, working hard, and doing the job right — the way we&apos;d want it done for our own families.
                        <br/><br/>In those early days, it was about more than moving boxes. It was about showing people they could actually trust their movers.
                        <br/>Word spread fast, not through ads or big campaigns, but through real people telling their friends, &quot;You should call Moving Papa. They&apos;ll take care of you.&quot;
                        <br/><br/>As we grew, we never forgot why we started.
                        <br/>Today, with a fleet of trucks, a full team of dedicated pros, and thousands of successful moves behind us, our mission is still the same:Move with care.
                        <br/>Move with purpose. Move like it matters.
                        <br/><br/>At Moving Papa, every move is personal.
                        <br/>Because we know behind every box, every truckload, and every delivery — there&apos;s someone&apos;s hard work, memories, and future.
                        <br/>And that&apos;s something we&apos;ll never take lightly.
                        </p>
                    </div>
            </div>
            <div className="flex justify-center w-full bg-primary">
                <div className="flex flex-wrap w-full md:w-[1250px] justify-center  my-10 ">
                        <div className="md:w-2/3 px-6">
                            <h2 className="text-tertiary font-bold text-3xl py-6">
                            Our Values
                            </h2>
                            <p className="text-white text-reg md:w-4/5">
                            At Moving Papa, everything we do is built on trust. We believe integrity is non-negotiable. Honest quotes, clear communication, and following through on what we promise are the foundation of how we operate — from the first phone call to the final handshake.
                            <br/><br/>
                            Reliability is more than just showing up on time. It&apos;s about being there when it matters most, handling every move with care, and making sure our customers feel confident and supported every step of the way. When we say we&apos;ll be there, we are.
                            <br/><br/>
                            We take our responsibility to the planet seriously. Sustainability isn&apos;t an afterthought — it&apos;s built into how we operate. From reusable moving materials to smarter route planning that cuts emissions, we&apos;re always looking for ways to move better for the world we share.
                            <br/><br/>
                            Our people are the heart of Moving Papa. We believe a great company starts with a great team. That&apos;s why we invest in training, create a work culture built on respect and pride, and make sure every mover knows they&apos;re valued — because when our team wins, our customers win too.
                            <br/><br/>
                            At the center of everything is the customer. No two moves are the same, and we never treat them that way. We listen first, build plans around your needs, and stay flexible when life changes. Moving is personal — and we make sure it feels that way.
                            Finally, safety is in everything we do. Protecting your belongings, your property, and our team is not negotiable. Proper equipment, careful planning, and attention to detail are just part of the job.
                            <br/><br/>
                            These are the values that built Moving Papa. They&apos;re what keep us growing. And they&apos;re what you can expect every time you move with us.
                            </p>
                        </div>
                        <div className="w=1/3 hidden md:flex">
                            <Image
                                src={Img_2}
                                alt=""
                                width={3024}
                                height={4032}
                                className="w-[386px] h-[419px] object-cover custom-shadow-white rounded-lg"
                                style={{
                                objectFit: 'cover',
                                objectPosition: '20% 30%',
                                }}
                            />
                        </div>

                </div>
            </div>

            <div className="flex flex-wrap w-full md:w-[1250px] px-6 md:px-0 mb-5 md:my-10 ">
                <div className="w-full md:w-3/5 mt-10">
                    <div>
                        <h2 className="text-primary text-2xl font-bold">Call Us Now Or Leave Us a Message</h2>
                        <p className="font-regular text-regular " >
                        We are open 24/7 365 a year, offering 7 days a week support with real people picking up the
                        phone Monday-Friday 8am - 8pm and Saturday-Sunday 8am - 6pm.
                        </p>
                    </div>
                    <div className="mt-8">
                        <h2 className="text-primary text-2xl font-bold">Get Your Free Quote Today</h2>
                        <p className="font-regular text-regular">
                        Contact us anytime to speak to our experienced moving consultants who will provide you with
                        a guaranteed flat price, obligation free, moving quote.
                        </p>
                        <div className="flex flex-wrap gap-x-10 gap-y-4 w-full justify-center mt-10">
                            <Link href="/ottawa/finalstep/residential" className="w-8/10 md:w-1/3">
                                <button className="bg-primary text-white px-10 py-4 hover:cursor-pointer w-full rainbow-button font-bold !rounded-xl">
                                    GET A FREE QUOTE
                                </button>
                            </Link>
                            <a href="tel:3435000488" className="w-8/10 md:w-1/3">
                                <button className="bg-primary text-white px-10 py-4 flex w-full justify-center hover:cursor-pointer rounded-xl">
                                    <PhoneIcon className="h-6 w-6 mr-1 text-white" fill="white" strokeWidth={2} />
                                    343-500-0488
                                </button>
                            </a>


                        </div>
                    </div>
                </div>
                <div className="w=2/5 hidden md:flex">
                    <Image
                        src={Img_1}
                        alt=""
                        width={3024}
                        height={4032}
                        className="w-[386px] h-[419px] object-cover custom-shadow-primary rounded-lg"
                        style={{
                            objectFit: 'cover',
                            objectPosition: '80% 30%',
                        }}
                    />
                </div>
            </div>
            <div className="md:w-[1300px] bg-primary rounded-lg p-6 mx-2 md:mx-0">
                <h2  className="text-tertiary text-2xl font-bold">
                Interested in joining the team
                </h2>
                <p className="font-regular text-base text-white">
                We are always looking for talent like you in our sales, marketing, admin support, operations and moving teams.
                <br/>careers@movingpapa.com
                </p>
            </div>
            <div className="md:w-[1250px] w-full my-5 px-6 md:px-0">
                <h2 className="text-primary text-2xl font-bold">
                Business Inquiries
                </h2>
                <div className="font-regular text-base md:flex">
                For all other business and inquiries please email&nbsp; <p className="text-tertiary">hello@movingpapa.com</p>
                </div>
            </div>
        </div>
    )
}
