import { useState } from "react";
import FloatingInput from "./floatInput";
import { useTranslation } from "react-i18next";

const CheckInForm = () => {

    const {t} = useTranslation();
    const [ticketRef, setTicketRef] = useState('');
    const [lastName, setLastName] = useState('');

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        // Logique de recherche...
    }
    return (
        <div>
            {/* Formulaire de Recherche de Réservation */}
            <form onSubmit={handleSubmit} className="search-form md:rounded-r-lg rounded-b-lg p-8 space-y-8 ">

                <h4 className="text-[18px] md:text-[20px] text-white uppercase">{t('enregistrement')}</h4>

                <div className="flex-none space-y-4 md:space-y-0 sm:flex sm:space-x-4 lg:w-[70%] w-[100%]">

                    {/* Champ 1 : Référence de Réservation */}
                    <FloatingInput
                        placeholder={t('numero-ticket')}
                        onChange={(e) => setTicketRef(e.target.value)}
                        initialValue={ticketRef}
                        className="w-1/2"
                    />

                    {/* Champ 2 : Nom de Famille */}
                    <FloatingInput
                        placeholder={t('nom-famille')}
                        onChange={(e) => setLastName(e.target.value)}
                        initialValue={lastName}
                        className="w-1/2"
                    />

                </div>

                <div className="col-span-3 mt-5 md:w-[100vw] h-16">
                    <div className='h-15 w-full md:w-70 sm:flex-1 '>
                        <button
                            type="submit"
                            className="search-button uppercase rounded-lg w-full h-full text-white text-[18px] transition flex items-center justify-center cursor-pointer"
                        >
                            {t('check-in')} &gt;
                        </button>

                    </div>
                </div>
            </form>
        </div>
    );
};

export default CheckInForm;