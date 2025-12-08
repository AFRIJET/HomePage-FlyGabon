import { useEffect, useState } from "react";
import Header from "../components/header";
import MainSearchContent from "../components/mainSearchContent";
import DomesticCarousel from "../components/domesticCarouselImage";
import Footer from "../components/footer";

const homepage = () => {

    const images = [
        {
            src: './src/assets/images/bg-plane-flygabon.jpg',
            alt: 'Avion FlyGabon',
            styleClasses: 'object-cover object-bottom'
        },
        {
            src: './src/assets/images/bg-plane-flygabon-face.jpg',
            alt: 'Avion FlyGabon de face',
            styleClasses: 'object-cover object-center'
        },
        {
            src: './src/assets/images/bg-terminal-flygabon.jpg',
            alt: 'Terminal FlyGabon',
            styleClasses: 'object-cover object-center'
        },
        {
            src: './src/assets/images/bg-lounge-flygabon.jpg',
            alt: 'Salon FlyGabon',
            styleClasses: 'object-cover object-center'
        },
        {
            src: './src/assets/images/bg-oiseaux-gabon.png',
            alt: 'Oiseaux du Gabon',
            styleClasses: 'object-cover object-top'
        },
    ];

    // État pour suivre l'index de l'image actuellement affichée
    const [currentIndex, setCurrentIndex] = useState(0);
    const totalImages = images.length;

    // Logique pour le défilement automatique (Auto-Play)
    useEffect(() => {
        // Définir un intervalle pour changer l'image
        const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                (prevIndex + 1) % totalImages
            );
        }, 3000);

        // Nettoyage de l'intervalle lorsque le composant est démonté
        return () => clearInterval(intervalId);
    }, [totalImages]);

    const currentImage = images[currentIndex];


    return (

        <div>
            <Header />
            <div className="carousel-container w-full h-150 relative overflow-hidden">

                {/* 1. Affichage de l'image courante */}
                <img
                    src={currentImage.src}
                    alt={currentImage.alt}
                    // 2. Utilisation de la colonne styleClasses
                    className={`w-[100vw] h-140 transition-opacity duration-1000 ${currentImage.styleClasses}`}
                    style={{ opacity: 1 }}
                />
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