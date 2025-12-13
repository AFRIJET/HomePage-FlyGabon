import React from 'react';
import CustomDateInput from './customerDateInput';
import { useTranslation } from 'react-i18next';

type MultiRouteFormProps = {
    route: {
        id: number;
        from: string;
        to: string;
        departDate: string;
    };
    index: number;
    updateRoute: (id: number, field: string, value: string) => void;
    removeRoute: (id: number) => void;
};

type SimpleDestinationInputProps = {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
}

const SimpleDestinationInput = ({ value, onChange, placeholder }: SimpleDestinationInputProps) => {

    const { t } = useTranslation();
    const translatedTo = t('to');
    const isToPlaceholder = placeholder === translatedTo;
    return (
        <div className="relative z-10 md:flex-1">
            <label
                className={`absolute top-2 text-xs font-semibold text-gray-500 pointer-events-none z-10 ${isToPlaceholder ? 'sm:left-8 left-4' : 'left-4'}`}
                htmlFor={placeholder}
            >
                {placeholder}
            </label>
            <input
                id={placeholder}
                type="text"
                value={value}
                onChange={onChange}
                className={`input-from w-full mr-1 pt-6 pb-2 px-4 focus:outline-none rounded-lg h-16 ${isToPlaceholder ? 'pl-4 sm:pl-8' : 'pl-4'}`}
            />
        </div>
    );
};


const MultiRouteRow = ({ route, updateRoute }: MultiRouteFormProps) => {

    const { t } = useTranslation()

    return (
        <div className="rounded-lg">

            {/* Grille du Trajet Supplémentaire */}
            <div className="sm:flex w-full space-y-1">

                <div className='space-y-1 sm:space-y-2 sm:flex sm:w-[200%] lg:w-[81%] md:mr-1'>
                    {/* Ville de Départ */}
                    <div className="md:flex-1">
                        <SimpleDestinationInput
                            placeholder={t('from')}
                            value={route.from}
                            onChange={(e) => updateRoute(route.id, 'from', e.target.value)}
                        />
                    </div>

                    {/* Icône de Permutation */}
                    <div className="flex justify-end sm:justify-center mr-8 sm:mr-0 items-center">
                        <button
                            type="button"
                            className="exchange-button absolute z-20 p-1 rounded-full transition focus:outline-none"
                            aria-label="Permuter les destinations"
                        >
                            <div className='icon-div p-2 rounded-full'>
                                <i className="fa-solid fa-arrows-rotate text-[24px] icon-exchange"></i>
                            </div>
                        </button>
                    </div>

                    {/* Destination */}
                    <div className="relative md:flex-1">
                        <SimpleDestinationInput
                            placeholder={t('to')}
                            value={route.to}
                            onChange={(e) => updateRoute(route.id, 'to', e.target.value)}
                        />
                    </div>
                </div>

                <div className='w-full md:flex'>
                    {/* Date de Départ */}
                    <div className="relative md:flex-1 sm:mx-2 lg:mx-1 mx-0 mt-2 sm:mt-0 h-16">
                        <CustomDateInput
                            placeholder={t('depart')}
                            value={route.departDate}
                            onChange={(date) => updateRoute(route.id, 'departDate', date)}
                        />
                    </div>
                    {/* Espace */}
                    <div className="relative hidden lg:flex md:flex-1 h-16">

                    </div>

                    {/* Espace */}
                    <div className="relative hidden lg:flex md:flex-1 mx-2 h-16">

                    </div>
                </div>

            </div>
        </div>
    );
};

export default MultiRouteRow;