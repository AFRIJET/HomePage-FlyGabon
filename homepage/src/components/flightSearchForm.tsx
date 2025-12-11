import {
    Add01Icon
} from 'hugeicons-react';
import CustomDatePicker from './customerDateInput';
import PassengerSelector from './passagerSelector';
import MultiRouteRow from './multiRouteRow';
import { useTranslation } from 'react-i18next';

// Declaration des proprietes de FlightSearchForm
type Props = {
    // --- Trip Type ---
    tripType: string;
    setTripType: React.Dispatch<React.SetStateAction<string>>;
    handleTripTypeChange: (type: string) => void;
    // --- Destinations ---
    from: string;
    setFrom: React.Dispatch<React.SetStateAction<string>>;
    to: string;
    setTo: React.Dispatch<React.SetStateAction<string>>;
    swapDestinations: () => void;
    // --- Dates ---
    departDate: string;
    setDepartDate: React.Dispatch<React.SetStateAction<string>>;
    returnDate: string;
    setReturnDate: React.Dispatch<React.SetStateAction<string>>;
    // --- Passagers ---
    passengersDisplay: string;
    passengerDetails: {
        adults: number;
        children: number;
        babies: number;
    };
    handlePassengersChange: (totalDisplay: string, counts: { adults: number; children: number; babies: number }) => void;
    // --- Multi-route ---
    routes: {
        id: number;
        from: string;
        to: string;
        departDate: string;
        returnDate: string;
    }[];
    updateRoute: (id: number, field: string, value: string) => void;
    removeRoute: (id: number) => void;
    addRoute: () => void;
    // --- Soumission ---
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};


const flightSearchForm = ({
    // --- Trip Type ---
    tripType,
    handleTripTypeChange,

    // --- Destinations ---
    from,
    setFrom,
    to,
    setTo,
    swapDestinations,

    // --- Dates ---
    departDate,
    setDepartDate,
    returnDate,
    setReturnDate,

    // --- Passagers ---
    handlePassengersChange,

    // --- Multi-route ---
    routes,
    updateRoute,
    removeRoute,
    addRoute,

    // --- Soumission ---
    handleSubmit,
}: Props) => {

    const { t } = useTranslation();


    return (
        <div>

            {/* --- Contenu du Formulaire --- */}
            <form onSubmit={handleSubmit} className="search-form md:rounded-r-lg rounded-b-lg p-4 md:p-6 lg:p-8">

                {/* Sélecteur Roundtrip / One-way */}
                <div className="flex items-center space-x-2 sm:space-x-4 mb-6 text-white text-sm">
                    {[t('one-way'), t('roundtrip'), t('Multi-route')].map(type => (
                        <label key={type} className="flex items-center cursor-pointer">
                            <input
                                type="radio"
                                name="tripType"
                                value={type}
                                checked={tripType === type}
                                onChange={() => handleTripTypeChange(type)}
                                className="form-radio h-3 w-3 rounded-full cursor-pointer"
                            />
                            <p className="ml-2 text-[13px] sm:text-[16px]">{type}</p>
                        </label>
                    ))}
                </div>

                <div className='flex flex-col w-full'>
                    {/* Grille des Champs de Saisie */}
                    <div className="lg:flex md:grid sm:grid-col-1 md:gap-6 lg:gap-0 w-full items-center">

                        {/* Champ pour la recherche des destinations */}
                        <div className='space-y-1 sm:space-y-2 w-[100%] sm:flex md:w-[98%] lg:w-[80%] mr-1'>
                            {/* Champ From */}
                            <div className="relative z-10 md:flex-1">
                                <label
                                    className="absolute top-2 left-4 text-xs font-semibold text-gray-500 pointer-events-none z-10"
                                >
                                    {t('from')}
                                </label>
                                <input
                                    type="text"
                                    value={from}
                                    onChange={(e) => setFrom(e.target.value)}
                                    className="input-from w-full mr-1 pt-6 pb-2 px-4 focus:outline-none rounded-lg h-16"
                                />
                            </div>

                            {/* Icône de Permutation */}
                            <div className="flex justify-end sm:justify-center mr-8 sm:mr-0 items-center">
                                <button
                                    type="button"
                                    onClick={swapDestinations}
                                    className="exchange-button absolute z-10 p-1 rounded-full cursor-pointer transition focus:outline-none"
                                    aria-label="Permuter les destinations"
                                >
                                    <div className='icon-div p-2 rounded-full'>
                                        <i className="fa-solid fa-arrows-rotate text-[24px] icon-exchange"></i>
                                    </div>
                                </button>
                            </div>

                            {/* Champ To */}
                            <div className="relative md:flex-1">
                                <label
                                    className="absolute top-2 left-4 sm:left-8 text-xs font-semibold text-gray-500 pointer-events-none z-10"
                                >
                                    {t('to')}
                                </label>
                                <input
                                    type="text"
                                    value={to}
                                    onChange={(e) => setTo(e.target.value)}
                                    className="input-to w-full sm:ml-1 pt-6 pb-2 px-7 focus:outline-none rounded-lg h-16"
                                />
                            </div>
                        </div>

                        {/* Champ pour la recherche des dates et passagers */}
                        <div className='sm:flex mt-2 sm:mt-0 space-y-2 w-full'>
                            {/* Champ Depart Date */}
                            <div className="relative sm:w-2/5 col-span-3 lg:mx-2 sm:mr-2 h-16">
                                <CustomDatePicker
                                    placeholder={t('depart')}
                                    value={departDate}
                                    onChange={setDepartDate}
                                />
                            </div>


                            {/* Champ Return Date */}
                            <div
                                className={`sm:w-2/5 col-span-3 rounded-lg h-16 ${tripType === t('one-way') ? 'bg-gray-400 opacity-60 sm:flex' : 'bg-gray-400 bg-opacity-80'} ${tripType === 'Multi-route' ? 'bg-gray-400 opacity-60 hidden sm:flex' : 'bg-gray-400 bg-opacity-80'}`}
                            >
                                <CustomDatePicker
                                    placeholder={t('return')}
                                    value={returnDate}
                                    onChange={setReturnDate}
                                    disabled={tripType === 'One-way'} // Désactivé si One-way
                                />

                            </div>

                            {/* Champ Passengers */}
                            <div className={`relative w-5/5 sm:w-2/5 col-span-3 sm:mx-2 h-16 ${tripType === 'Multi-route' ? 'hidden sm:flex' : 'sm:flex'}`}>
                                <PassengerSelector
                                    placeholder={t('passagers')}
                                    onChange={handlePassengersChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* 3. Routes Supplémentaires (Affiches SEULEMENT en mode Multi-route) */}
                    {tripType === 'Multi-route' && (
                        <div className="sm:mt-6 space-y-2">

                            {/* Affichage des routes au-delà du premier (ID > 1) */}
                            {routes.slice(1).map((route, index) => (
                                <MultiRouteRow
                                    key={route.id}
                                    route={route}
                                    index={index + 2} // Le numéro de la route (commence à 2)
                                    updateRoute={updateRoute}
                                    removeRoute={removeRoute}
                                />
                            ))}
                            {/* Champ Passengers */}
                            <div className={`relative w-5/5 sm:w-2/5 col-span-3 sm:mx-2 h-16 ${tripType === 'Multi-route' ? 'sm:hidden flex' : 'sm:flex'}`}>
                                <PassengerSelector
                                    placeholder={t('passagers')}
                                    onChange={handlePassengersChange}
                                />
                            </div>

                            {/* Bouton Ajouter une Route */}
                            <div className="text-center pt-2">
                                <button
                                    type="button"
                                    onClick={addRoute}
                                    disabled={routes.length >= 6}
                                    className="btn-add-flight flex justify-start rounded-lg bg-[#4764B2] text-white p-4 text-[16px] transition cursor-pointer"
                                >
                                    <Add01Icon size={22} className='mx-2' /> Ajouter un vol
                                </button>
                            </div>

                        </div>
                    )}
                </div>

                {/* Bouton de Recherche */}
                <div className="col-span-3 flex justify-end mt-5 w-[85vw] h-16">
                    <div className='h-15 w-60 mr-4 xl:mr-0'>
                        <button
                            type="submit"
                            className="search-button uppercase rounded-lg w-full h-full text-white text-[18px] transition flex items-center justify-center cursor-pointer"
                        >
                            {t('search-flight')} &gt;
                        </button>

                    </div>
                </div>

            </form>

        </div>
    );
};

export default flightSearchForm;