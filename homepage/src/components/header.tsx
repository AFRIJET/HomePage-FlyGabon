import Logo from "../assets/images/logo-flygabon-black.png";
import '../styles/mainstyle.css';
import {
    UserCircleIcon,
    Money01Icon,
} from 'hugeicons-react';
import { useTranslation } from "react-i18next";
import { useState, useEffect, useRef } from "react";

const lmsUrl = import.meta.env.VITE_URL_LMS;
const cclUrl = import.meta.env.VITE_URL_CCL;
const agenceUrl = import.meta.env.VITE_URL_AGENCE;

// Convertit le code pays (ex: FR) en drapeau emoji
const FlagImage = (countryCode: string) => {
    const flagSrc = `src/assets/images/flag/${countryCode}.png`;

    return <img src={flagSrc} alt={`Drapeau de ${countryCode}`} style={{ width: 24 }} />;
};

const header = () => {

    const { t, i18n } = useTranslation() // Gestion de la traduction

    // --- Langues ---
    const languages = [
        { code: "fr", label: t("francais"), flagCode: "FR" },
        { code: "en", label: t("anglais"), flagCode: "GB" },
        { code: "es", label: t("espagnol"), flagCode: "ES" },
    ];

    // --- Devises (Monnaie) ---
    const currencies = [
        { code: "XAF", label: "XAF", symbol: "FCFA" },
        { code: "EUR", label: "Euro", symbol: "€" },
        { code: "USD", label: "US Dollar", symbol: "$" },
    ];

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    // Langue actuelle
    const currentLanguage = languages.find((lang) => lang.code === i18n.language) || languages[0];

    // État pour gérer la devise sélectionnée
    const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);

    // État pour gérer l'ouverture/fermeture des menus (Dropdown)
    const [isLangOpen, setIsLangOpen] = useState(false);
    const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
    const langRef = useRef<HTMLDivElement | null>(null);
    const currencyRef = useRef<HTMLDivElement | null>(null);

    // 2. Logique de fermeture des pop-ups au clic extérieur
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // Si le clic n'est pas dans le sélecteur de langue et qu'il est ouvert, fermer
            if (langRef.current && !langRef.current.contains(event.target as Node)) {
                setIsLangOpen(false);
            }
            // Si le clic n'est pas dans le sélecteur de devise et qu'il est ouvert, fermer
            if (currencyRef.current && !currencyRef.current.contains(event.target as Node)) {
                setIsCurrencyOpen(false);
            }
        };

        // Ajouter l'écouteur d'événement au document
        document.addEventListener('mousedown', handleClickOutside);

        // Nettoyage : retirer l'écouteur d'événement lorsque le composant est démonté
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isLangOpen, isCurrencyOpen]);

    return (
        <div className="header">
            <div className="part1 flex justify-between items-center px-20 py-5">

                {/* Section Mon Compte */}
                <div className="my-account w-75">
                    <a href={lmsUrl} target="_blank" className="cursor-pointer" rel="noopener noreferrer">
                        <h5 className="flex items-center uppercase text-[18px]">
                            <UserCircleIcon size={28} className="mr-2" /> {t('my_account')}
                        </h5>
                    </a>
                </div>

                {/* Section Langue et Devise */}
                <div className="option flex items-center justify-around w-70">

                    {/* Sélecteur de Devise */}
                    <div className="relative" ref={currencyRef}>
                        <p
                            className="flex items-center cursor-pointer text-[18px]"
                            onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
                        >
                            <Money01Icon size={22} className="money rounded-xl p-3 mr-2" />
                            {selectedCurrency.code}
                            <i className="fas fa-chevron-down ml-2"></i>
                        </p>

                        {/* Dropdown Devise */}
                        {isCurrencyOpen && (
                            <div className='absolute right-2 left-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10'>
                                {currencies.map((currency) => (
                                    <p
                                        key={currency.code}
                                        className="currency p-2 text-[18px] cursor-pointer"
                                        onClick={() => {
                                            setSelectedCurrency(currency);
                                            setIsCurrencyOpen(false);
                                        }}
                                    >
                                        {currency.code}
                                    </p>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Sélecteur de Langue */}
                    <div className="relative" ref={langRef}>
                        <p
                            className="flex items-center text-[18px] cursor-pointer"
                            onClick={() => setIsLangOpen(!isLangOpen)}
                        >
                            {/* Affichage du drapeau */}
                            <span className="mr-2 text-xl">{FlagImage(currentLanguage.flagCode)}</span>
                            {currentLanguage.label}
                            <i className="fas fa-chevron-down ml-2"></i>
                        </p>

                        {/* Dropdown Langue */}
                        {isLangOpen && (
                            <div className='absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10'>
                                {languages.map((lang) => (
                                    <p
                                        key={lang.code}
                                        className="language p-2 text-[18px] cursor-pointer flex items-center"
                                        onClick={() => {
                                            changeLanguage(lang.code);
                                            setIsLangOpen(false);
                                        }}
                                    >
                                        <p className="mr-2 text-xl">{FlagImage(lang.flagCode)}</p>
                                        {lang.label}
                                    </p>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

            </div>
            <div className="part2 py-5 px-5 flex justify-between items-center">
                <a href="#">
                    <img src={Logo} alt="Logo FlyGabon" className="pl-8 w-100" />
                </a>
                <div className="flex pr-17">
                    <a href={agenceUrl} target="_blank" className="cursor-pointer mx-4 hover:text-[#4764B2]" rel="noopener noreferrer">
                        <h5 className="uppercase flex text-[18px]"> {t('agence')}</h5>
                    </a>
                    <a href={cclUrl} target="_blank" className="cursor-pointer" rel="noopener noreferrer">
                        <h5 className="uppercase flex text-[18px]"> {t('Nous-contactez')}</h5>
                    </a>
                </div>
            </div>
        </div>

    )
}

export default header