import {
    Add01Icon
} from 'hugeicons-react';
import CustomDatePicker from './customerDateInput';
import PassengerSelector from './passagerSelector';
import MultiRouteRow from './multiRouteRow';

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
} : Props) => {


    return (
        <div>

            {/* --- Contenu du Formulaire --- */}
            <form onSubmit={handleSubmit} className="search-form rounded-r-lg rounded-b-lg p-8">

                {/* Sélecteur Roundtrip / One-way */}
                <div className="flex items-center space-x-4 mb-6 text-white text-sm">
                    {['One-way', 'Roundtrip', 'Multi-route'].map(type => (
                        <label key={type} className="flex items-center cursor-pointer">
                            <input
                                type="radio"
                                name="tripType"
                                value={type}
                                checked={tripType === type}
                                onChange={() => handleTripTypeChange(type)}
                                className="form-radio h-3 w-3 rounded-full cursor-pointer"
                            />
                            <p className="ml-2 text-[16px]">{type}</p>
                        </label>
                    ))}
                </div>

                {/* Grille des Champs de Saisie */}
                <div className="flex w-full items-center">

                    {/* Champ From */}
                    <div className="relative col-span-2 relative z-10">
                        <label
                            className="absolute top-2 left-4 text-xs font-semibold text-gray-500 pointer-events-none z-10"
                        >
                            From
                        </label>
                        <input
                            type="text"
                            value={from}
                            onChange={(e) => setFrom(e.target.value)}
                            className="input-from w-70 mr-1 pt-6 pb-2 px-4 border-r-0 focus:outline-none rounded-lg h-16"
                        />
                    </div>

                    {/* Icône de Permutation */}
                    <div className="col-span-1 flex justify-center items-center">
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
                    <div className="relative col-span-2">
                        <label
                            className="absolute top-2 left-8 text-xs font-semibold text-gray-500 pointer-events-none z-10"
                        >
                            To
                        </label>
                        <input
                            type="text"
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
                            className="input-to w-70 ml-1 pt-6 pb-2 px-8 border-r border-gray-400 focus:outline-none rounded-lg h-16"
                        />
                    </div>

                    {/* Champ Depart Date */}
                    <div className="relative w-1/5 col-span-3 mx-2 h-16">
                        <CustomDatePicker
                            placeholder="DÉPART"
                            value={departDate}
                            onChange={setDepartDate}
                        />
                    </div>


                    {/* Champ Return Date */}
                    <div
                        className={`w-1/5 col-span-3 rounded-lg h-16 ${tripType === 'One-way' || tripType === 'Multi-route' ? 'bg-gray-400 opacity-60' : 'bg-gray-400 bg-opacity-80'}`}
                    >
                        <CustomDatePicker
                            placeholder="RETURN"
                            value={returnDate}
                            onChange={setReturnDate}
                            disabled={tripType === 'One-way'} // Désactivé si One-way
                        />

                    </div>

                    {/* Champ Passengers */}
                    <div className="relative w-1/5 col-span-3 mx-2 h-16">
                        <PassengerSelector
                            placeholder="PASSAGERS"
                            onChange={handlePassengersChange} // Passe le gestionnaire
                        />
                    </div>
                </div>

                {/* 3. Routes Supplémentaires (Affiches SEULEMENT en mode Multi-route) */}
                {tripType === 'Multi-route' && (
                    <div className="mt-6 space-y-4">

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

                {/* Bouton de Recherche */}
                <div className="col-span-3 flex justify-end mt-5 w-[85vw] h-16">
                    <div className='h-15 w-60 '>
                        <button
                            type="submit"
                            className="search-button rounded-lg w-full h-full text-white text-[18px] transition flex items-center justify-center cursor-pointer"
                        >
                            FIND FLIGHTS &gt;
                        </button>

                    </div>
                </div>

            </form>

        </div>
    );
};

export default flightSearchForm;