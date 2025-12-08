import { useState } from "react";
import FloatingInput from "./floatInput";

const FindReservationForm = () => {

    const [reservationRef, setReservationRef] = useState('');
    const [lastName, setLastName] = useState('');

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        // Logique de recherche...
    }

    return (
        <div>
            {/* Formulaire de Recherche de Réservation */}
            <form onSubmit={handleSubmit} className="search-form rounded-r-lg rounded-b-lg p-8 space-y-8 ">

                <h4 className="text-[20px] text-white uppercase">Rechercher une Réservation</h4>

                <div className="flex space-x-4 w-[80%]">

                    {/* Champ 1 : Référence de Réservation */}
                    <FloatingInput
                        placeholder="RÉFÉRENCE DE RÉSERVATION"
                        onChange={(e) => setReservationRef(e.target.value)}
                        initialValue={reservationRef}
                        className="w-1/2"
                    />

                    {/* Champ 2 : Nom de Famille */}
                    <FloatingInput
                        placeholder="NOM DE FAMILLE"
                        onChange={(e) => setLastName(e.target.value)}
                        initialValue={lastName}
                        className="w-1/2"
                    />

                </div>

                <div className="col-span-3 mt-5 w-[85vw] h-16">
                    <div className='h-15 w-60 '>
                        <button
                            type="submit"
                            className="search-button rounded-lg w-full h-full text-white text-[18px] transition flex items-center justify-center cursor-pointer"
                        >
                            RECHERCHER &gt;
                        </button>

                    </div>
                </div>
            </form>
        </div>
    );

};

export default FindReservationForm;