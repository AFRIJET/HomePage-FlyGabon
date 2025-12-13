import React, { useState } from 'react';
// Importez tous vos composants et icônes
import FlightSearchForm from './flightSearchForm';
import FindReservationForm from './findReservationForm';
import CheckInForm from './checkInForm';
import {
    PropertySearchIcon,
    CheckListIcon,
} from 'hugeicons-react';
import { useTranslation } from 'react-i18next';

const MainSearchContent = () => {

    const {t} = useTranslation();

    // --- État Global pour la Navigation ---
    const [selectedOption, setSelectedOption] = useState('flight');

    // --- Définition des options de recherche ---
    const options: { id: string; label: string; icon: any; component: React.ComponentType<any>; }[] = [
        { id: 'flight', label: t('option-reservation'), icon: <i className="fa-solid fa-plane-departure mr-3 lg:text-[20px] xl:text-[25px]"></i>, component: FlightSearchForm },
        { id: 'reservation', label: t('option-search-reservation'), icon: <PropertySearchIcon size={26} className="ml-8 md:ml-0 mr-2" />, component: FindReservationForm },
        { id: 'checkin', label: t('option-checkin'), icon: <CheckListIcon size={26} className="mr-2" />, component: CheckInForm },
    ];

    // --- Logic & States pour BOOK FLIGHT ---
    const [tripType, setTripType] = useState('Roundtrip');
    const initialRoute = {
        id: 1,
        from: '',
        to: '',
        departDate: '',
        returnDate: '',
    };

    // État local pour gérer les valeurs du formulaire
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [departDate, setDepartDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    // État pour le total passagers
    const [passengersDisplay, setPassengersDisplay] = useState('1 Passager');
    const [passengerDetails, setPassengerDetails] = useState({ adults: 1, children: 0, babies: 0 });

    // Gestionnaire qui reçoit les données du sélecteur
    const handlePassengersChange = (displayValue: React.SetStateAction<string>, details: React.SetStateAction<{ adults: number; children: number; babies: number; }>) => {
        setPassengersDisplay(displayValue);
        setPassengerDetails(details);
    };

    // Fonction pour permuter les valeurs "From" et "To"
    const swapDestinations = () => {
        setFrom(to);
        setTo(from);
    };

    // Fonction qui permet de changer le type de trajet
    const handleTripTypeChange = (type: React.SetStateAction<string>) => {
        setTripType(type);

        // Logique d'initialisation spécifique au mode Multi-route
        if (type === 'Multi-route') {
            if (routes.length === 1) {
                setRoutes(prevRoutes => {
                    if (prevRoutes.length === 1) {
                        const newId = prevRoutes[0].id + 1;
                        return [...prevRoutes, { id: newId, from: '', to: '', departDate: '', returnDate: '' }];
                    }
                    return prevRoutes;
                });
            }
        } else {
            if (routes.length > 1) {
                setRoutes(prevRoutes => [prevRoutes[0]]);
            }
        }
    };

    // Gerer l'état pour les trajets multiples (Multi-Route)
    const [routes, setRoutes] = useState([initialRoute]);

    const updateRoute = (id: number, field: any, value: any) => {
        setRoutes(prevRoutes => prevRoutes.map(route =>
            route.id === id ? { ...route, [field]: value } : route
        ));
    };

    const removeRoute = (id: number) => {
        if (routes.length > 1) {
            setRoutes(routes.filter(route => route.id !== id));
        }
    };

    const addRoute = () => {
        if (routes.length < 7) {
            // Le nouvel ID est toujours basé sur le max + 1
            const newId = routes.length > 0 ? Math.max(...routes.map(r => r.id)) + 1 : 1;
            setRoutes([...routes, { id: newId, from: '', to: '', departDate: '', returnDate: '' }]);
        }
    };

    // Fonction de soumission (placeholder)
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Logique de recherche de v ici
    };

    const flightFormProps = {
        // Trip Type
        tripType, setTripType, handleTripTypeChange,
        // Destinations
        from, setFrom, to, setTo, swapDestinations,
        // Dates
        departDate, setDepartDate, returnDate, setReturnDate,
        // Passagers
        passengersDisplay, passengerDetails, handlePassengersChange,
        // Multi-route
        routes, updateRoute, removeRoute, addRoute,
        // Soumission
        handleSubmit,
    };

    // Nous devons trouver le composant à afficher
    const CurrentForm = options.find(opt => opt.id === selectedOption)?.component;


    return (
        <div className="search-container w-[90vw] mx-auto shadow-2xl rounded-lg mb-10">

            {/* --- 1. Onglets de Navigation --- */}
            <div className="search-option flex">

                {options.map((option) => (
                    <div
                        key={option.id}
                        onClick={() => setSelectedOption(option.id)}
                        // Classes de base pour tous les onglets
                        className={`section-option flex items-center flex-1 md:flex-none justify-center md:justify-start md:px-8 lg:px-6 xl:px-15 py-3 uppercase cursor-pointer transition text-white
                            ${option.id === 'flight' ? 'rounded-tl-lg border-r border-gray-600' : ''}
                            ${option.id === 'reservation' ? 'border-r border-gray-600' : ''}
                            ${option.id === 'checkin' ? 'rounded-tr-lg sm:rounded-none' : ''}
                            ${option.id === selectedOption
                                ? 'bg-[#919191]'
                                : 'bg-[#4764B2] hover:bg-[#919191]'
                            }
                        `}
                    >
                        {option.icon}
                        <h4 className='text-[0px] sm:text-[14px] lg:text-[16px] xl:text-[18px]'>{option.label}</h4>
                    </div>
                ))}

            </div>

            {/* --- 2. Contenu du Formulaire (Appel Conditionnel) --- */}
            <div className="form-content">
                {CurrentForm && (
                    selectedOption === 'flight' ? (
                        <CurrentForm {...flightFormProps} />
                    ) : (
                        // Les autres formulaires n'ont pas besoin de ces props
                        <CurrentForm />
                    )
                )}
            </div>

        </div>
    );
}

export default MainSearchContent;
