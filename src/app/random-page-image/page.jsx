import Image from "/src/components/Image.jsx"
import fimg from "/src/images/random-page-image.png"

export default function Contact() {
    return (
        <div className="flex flex-col items-center">
            <Image src={fimg} alt="alt" />
        </div>
    )
}