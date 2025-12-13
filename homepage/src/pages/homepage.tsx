import { useEffect, useState } from "react";
import Header from "../components/header";
import MainSearchContent from "../components/mainSearchContent";
import DomesticCarousel from "../components/domesticCarouselImage";
import Footer from "../components/footer";
import AvionFlyGabon from '/src/assets/images/bg-plane-flygabon.jpg'
import AvionFlyGabonFace from '/src/assets/images/bg-plane-flygabon-face.jpg'
import SalonFlyGabon from '/src/assets/images/bg-lounge-flygabon.jpg'
import OiseauxGabon from '/src/assets/images/bg-oiseaux-gabon.png'
import TerminalFlyGabon from '/src/assets/images/bg-terminal-flygabon.jpg'
import CheckinFlyGabon from '/src/assets/images/bg-flygabon-checkin.jpg'
import A320_Cabine from '/src/assets/images/A320_Cabine.jpg'
import A320_Siege from '/src/assets/images/A320_Siege.jpg'
import A320_Couloir from '/src/assets/images/A320_Couloir.jpg'
import A320_Repas from '/src/assets/images/A320_Repas.jpg'
import { motion } from 'framer-motion';

const homepage = () => {

    const images = [
        {
            src: AvionFlyGabon,
            alt: 'Avion FlyGabon',
            styleClasses: 'object-cover object-bottom'
        },
        {
            src: AvionFlyGabonFace,
            alt: 'Avion FlyGabon de face',
            styleClasses: 'object-cover object-center'
        },
        {
            src: TerminalFlyGabon,
            alt: 'Terminal FlyGabon',
            styleClasses: 'object-cover object-center'
        },
         {
            src: CheckinFlyGabon,
            alt: 'Checkin FlyGabon',
            styleClasses: 'object-cover object-center'
        },
        {
            src: SalonFlyGabon,
            alt: 'Salon FlyGabon',
            styleClasses: 'object-cover object-center'
        },
        {
            src: A320_Cabine,
            alt: 'A320 Cabine',
            styleClasses: 'object-cover object-center'
        },
        {
            src: A320_Repas,
            alt: 'Repas FlyGabon',
            styleClasses: 'object-cover object-center'
        },
        {
            src: A320_Couloir,
            alt: 'A320 Couloir',
            styleClasses: 'object-cover object-center'
        },
        {
            src: A320_Siege,
            alt: 'A320 Siege',
            styleClasses: 'object-cover object-top'
        },
        {
            src: OiseauxGabon,
            alt: 'Oiseaux du Gabon',
            styleClasses: 'object-cover object-top'
        },
    ];

    const transitionDuration = 1;
    const displayDuration = 3;
    const totalSets = 50;
    const totalImages = images.length;   
    const totalSlides = totalImages * totalSets;
    const slides = [...images, ...images, ...images, ...images, ...images, ...images,
        ...images, ...images, ...images,
        ...images, ...images, ...images,
        ...images, ...images, ...images,
        ...images, ...images, ...images,
        ...images, ...images, ...images,
        ...images, ...images, ...images,
        ...images, ...images, ...images,
        ...images, ...images, ...images,
        ...images, ...images, ...images,
        ...images, ...images, ...images,
        ...images, ...images, ...images,
        ...images, ...images, ...images,
        ...images, ...images, ...images,
        ...images, ...images, ...images,
        ...images, ...images, ...images,
        ...images, ...images, ...images,
        ...images, ...images, ...images,
        ...images, ...images
    ];
    const [currentIndex, setCurrentIndex] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => prevIndex + 1);
        }, (transitionDuration + displayDuration) * 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (currentIndex === totalSlides) {
            const timeout = setTimeout(() => {
                setCurrentIndex(0); // On revient instantanément à 0
            }, transitionDuration * 1000); // Laisser la transition vers l'image dupliquée se terminer

            return () => clearTimeout(timeout);
        }
    }, [currentIndex, totalImages]);


    return (

        <div>
            <Header />
            <div className="carousel-container w-full h-150 relative overflow-hidden">
                
                <motion.div
                    className="carousel-track h-full flex flex-nowrap"
                    animate={{
                        x: `-${currentIndex * 100}%`
                    }}
                    transition={{
                        type: "tween",
                        duration: transitionDuration,
                        ease: "easeInOut"
                    }}
                >
                    {slides.map((img, index) => (
                        <img
                            key={index}
                            src={img.src}
                            alt={img.alt}
                            className={`
                                flex-shrink-0 
                                h-140 
                                w-full
                                object-cover 
                                ${img.styleClasses}
                            `}
                        />
                    ))}
                </motion.div>
            </div>

            <div className="-mt-40 relative z-10">
                <MainSearchContent />
            </div>

            <div className="py-10">
                <DomesticCarousel />
            </div>

            <footer>
                <Footer />
            </footer>

        </div>

    );
};

export default homepage;