import { useMemo, useRef, useState, type SetStateAction } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
// @ts-ignore: no type declarations for swiper css
import 'swiper/css';
// @ts-ignore: no type declarations for swiper css
import 'swiper/css/navigation';
// @ts-ignore: no type declarations for swiper css
import 'swiper/css/pagination';
// @ts-ignore: no type declarations for swiper css
import 'swiper/css/autoplay';
import { useTranslation } from 'react-i18next';
import Libreville from '/src/assets/images/dest-libreville.webp'
import PortGentil from '/src/assets/images/dest-port-gentil.webp'
import Franceville from '/src/assets/images/dest-franceville.webp'
import Oyem from '/src/assets/images/dest-oyem.webp'
import Douala from '/src/assets/images/dest-douala.webp'

const DomesticCarousel = () => {

    const { t } = useTranslation();
    const navigationPrevRef = useRef(null);
    const navigationNextRef = useRef(null);

    const allSlidesData = [
        { id: 1, src: Libreville, alt: 'Libreville', country: 'Gabon' },
        { id: 2, src: PortGentil, alt: 'Port-Gentil', country: 'Gabon' },
        { id: 3, src: Franceville, alt: 'Franceville', country: 'Gabon' },
        { id: 4, src: Oyem, alt: 'Oyem', country: 'Gabon' },
        { id: 5, src: Douala, alt: 'Douala', country: `${t('Cameroun')}` },
    ];

    // --- 2. GESTION DU FILTRE ---
    const [activeFilter, setActiveFilter] = useState('All');

    const uniqueCountries = useMemo(() => {
        const countries = [...new Set(allSlidesData.map(slide => slide.country))];
        return ['All', ...countries];
    }, []);

    const filteredSlides = useMemo(() => {
        if (activeFilter === 'All') {
            return allSlidesData;
        }
        return allSlidesData.filter(slide => slide.country === activeFilter);
    }, [activeFilter]);

    const handleFilterClick = (country: SetStateAction<string>) => {
        setActiveFilter(country);
    };

    return (
        <div className="carousel-container w-full px-10">

            <div className="flex justify-between items-start sm:items-center mb-6">
                {/* 1. Bouton de Navigation PRÉCÉDENT (Gauche) */}
                <div className="hidden sm:flex space-x-3 text-white">
                    <button ref={navigationPrevRef} className="p-3 rounded-full w-10 bg-[#919191] hover:bg-gray-500 transition shadow-md" aria-label="Slide précédent">
                        <i className="fas fa-chevron-left"></i>
                    </button>
                </div>

                {/* 2. Titre et Description (Centré) */}
                <div className="flex-1 sm:mx-8 text-center"> {/* Utilisation de flex-1 et text-center */}
                    <h2 className="text-[28px] font-bold text-[#333333]">{t('nos-destinations')}</h2>
                    <p className="text-lg text-[#5F5F5F]">{t('description-destination')}</p>
                </div>

                {/* 3. Bouton de Navigation SUIVANT (Droite) */}
                <div className="hidden sm:flex space-x-3 text-white">
                    <button ref={navigationNextRef} className="p-3 rounded-full w-10 bg-[#919191] hover:bg-gray-500 transition shadow-md" aria-label="Slide suivant">
                        <i className="fas fa-chevron-right"></i>
                    </button>
                </div>
            </div>

            {/* 2. BARRE DE FILTRES (TAGS) */}
            <div className="flex justify-start flex-wrap gap-4 mb-8">
                {uniqueCountries.map(country => (
                    <button
                        key={country}
                        onClick={() => handleFilterClick(country)}
                        className={`py-2 px-4 rounded-full text-sm font-semibold transition 
                            ${activeFilter === country
                                ? 'bg-[#4764B2] text-white shadow-lg cursor-pointer'
                                : 'bg-[#919191] text-white hover:bg-gray-500 cursor-pointer'
                            }
                        `}
                    >
                        {country}
                    </button>
                ))}
            </div>

            {/* 2. Composant Swiper */}
            <Swiper
                key={activeFilter}
                modules={[Navigation, Autoplay]}
                spaceBetween={30}
                slidesPerView={3}
                loop={filteredSlides.length >= 3}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                navigation={{
                    prevEl: navigationPrevRef.current,
                    nextEl: navigationNextRef.current,
                }}
                onBeforeInit={(swiper: any) => {
                    if (!swiper.params.navigation) {
                        swiper.params.navigation = {};
                    }
                    swiper.params.navigation.prevEl = navigationPrevRef.current;
                    swiper.params.navigation.nextEl = navigationNextRef.current;
                    if (swiper.navigation && typeof swiper.navigation.update === 'function') {
                        swiper.navigation.update();
                    }
                }}
                breakpoints={{
                    1024: { slidesPerView: 3, spaceBetween: 30 },
                    768: { slidesPerView: 2, spaceBetween: 20 },
                    0: { slidesPerView: 1, spaceBetween: 10 }
                }}
            >
                {filteredSlides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        {/* Contenu de chaque Slide */}
                        <div className="rounded-lg overflow-hidden mb-4 shadow-lg">
                            <img
                                src={slide.src}
                                alt={slide.alt}
                                className="w-full h-64 object-cover object-bottom"
                            />
                            <div className="p-2 bg-[#4764B2] text-white">
                                <p className="dest-caroussel text-center uppercase text-[18px]">{slide.alt}</p>
                                <p className="pays-caroussel flex justify-center w-30 mx-auto my-1 rounded-xl uppercase text-[16px]">{slide.country}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Message si aucune destination n'est trouvée pour le filtre */}
            {filteredSlides.length === 0 && (
                <div className="text-center py-10 text-xl text-gray-500">
                    Aucune destination trouvée pour "{activeFilter}".
                </div>
            )}

        </div>
    );
};

export default DomesticCarousel;