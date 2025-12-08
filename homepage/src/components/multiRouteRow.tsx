import React from 'react';
import CustomDateInput from './customerDateInput';
import { Delete01Icon } from 'hugeicons-react';

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

const SimpleDestinationInput = ({ value, onChange, placeholder }: SimpleDestinationInputProps) => (
    <div className="relative col-span-2 relative z-10">
        <label
            className={`absolute top-2 text-xs font-semibold text-gray-500 pointer-events-none z-10 ${placeholder === 'To' ? 'left-8' : 'left-4'}`}
        >
            {placeholder}
        </label>
        <input
            type="text"
            value={value}
            onChange={onChange}
            className="input-from w-70 mr-1 pt-6 pb-2 px-4 border-r-0 focus:outline-none rounded-lg h-16"
        />
    </div>
);


const MultiRouteRow = ({ route, updateRoute }: MultiRouteFormProps) => {

    return (
        <div className="rounded-lg">

            {/* Grille du Trajet Supplémentaire */}
            <div className="flex w-full items-center">

                {/* Ville de Départ */}
                <div className="col-span-2">
                    <SimpleDestinationInput
                        placeholder="From"
                        value={route.from}
                        onChange={(e) => updateRoute(route.id, 'from', e.target.value)}
                    />
                </div>

                {/* Icône de Permutation */}
                <div className="col-span-1 flex justify-center items-center">
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
                <div className="relative col-span-2">
                    <SimpleDestinationInput
                        placeholder="To"
                        value={route.to}
                        onChange={(e) => updateRoute(route.id, 'to', e.target.value)}
                    />
                </div>

                {/* Date de Départ */}
                <div className="relative w-1/5 col-span-2 mx-2 h-16">
                    <CustomDateInput
                        placeholder="DÉPART"
                        value={route.departDate}
                        onChange={(date) => updateRoute(route.id, 'departDate', date)}
                    />
                </div>

                {/* Espace */}
                <div className="relative w-1/5 col-span-2 h-16">
                    
                </div>

                {/* Espace */}
                <div className="relative w-1/5 col-span-2 mx-2 h-16">
                    
                </div>
                
            </div>
        </div>
    );
};

export default MultiRouteRow;