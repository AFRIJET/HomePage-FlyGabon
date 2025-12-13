import { useState, useRef, useEffect, useMemo, type ChangeEvent } from 'react';


type GroupedDestination = {
    country: string;
    cities: Array<City>;
};

type City = {
    code?: string;
    name?: string;
};

type SelectProps = {
    t: any;
    initialValue: City | null;
    onSelect: (city: City | null) => void;
    label: string;
    destinationsData: GroupedDestination[];
};

// Composant Custom
const DestSelectedBox = ({ t, initialValue, onSelect, label, destinationsData }: SelectProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState(initialValue ? initialValue.name : '');
    const [selectedCity, setSelectedCity] = useState(initialValue || null);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node | null;
            if (dropdownRef.current && target && !dropdownRef.current.contains(target)) {
                setIsOpen(false);
                if (selectedCity) {
                    setSearchTerm(selectedCity.name);
                } else {
                    setSearchTerm('');
                }
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [selectedCity]);

    const filteredDestinations = useMemo(() => {
        if (!searchTerm) {
            return destinationsData;
        }

        const lowerCaseSearchTerm = searchTerm.toLowerCase();

        return destinationsData
            .map(countryGroup => ({
                ...countryGroup,
                cities: countryGroup.cities.filter(city =>
                    (city.name && city.name.toLowerCase().includes(lowerCaseSearchTerm)) ||
                    (city.code && city.code.toLowerCase().includes(lowerCaseSearchTerm))
                ),
            }))
            .filter(countryGroup => countryGroup.cities.length > 0);
    }, [searchTerm, destinationsData]);
    
    const handleSelectCity = (city: City) => {
        setSelectedCity(city);
        setSearchTerm(city.name || '');
        setIsOpen(false);
        onSelect(city);
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setIsOpen(true);
        setSelectedCity(null);
    };

    const handleInputClick = () => {
        setIsOpen(true);
        if (selectedCity) {
            setSearchTerm(selectedCity.name || '');
        }
    };

    // Affichage de la valeur finale dans l'input
    const displayValue = selectedCity ? `${selectedCity.name} (${selectedCity.code})` : searchTerm;

    return (
        <div className="relative sm:flex-1" ref={dropdownRef}>
            <label
                className={`absolute top-2 text-xs font-semibold text-gray-500 z-10 ${label === t('from') ? 'left-4' : 'sm:left-8 left-4'}`}
            >
                {label}
            </label>

            {/* Input de recherche/affichage */}
            <input
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                onClick={handleInputClick}
                placeholder={selectedCity ? displayValue : ""}
                className={`focus:outline-none rounded-lg h-16 w-full ${label === t('from') ? 'input-from mr-1 pt-6 pb-2 px-4' : 'input-to sm:ml-1 pt-6 pb-2 px-4 sm:px-7'}`}
                readOnly={!isOpen}
            />

            {/* Dropdown de sélection avec la recherche */}
            {isOpen && (
                <div className="absolute z-[9999] top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-y-auto">
                    {filteredDestinations.length === 0 ? (
                        <div className="p-4 text-gray-500">
                            {t('no_results')}
                        </div>
                    ) : (
                        filteredDestinations.map((countryGroup) => (
                            <div key={countryGroup.country}>
                                <div className="px-4 py-2 text-sm text-gray-600 bg-[#F8FAFB] sticky top-0 border-b border-gray-100">
                                    <p>{countryGroup.country}</p>
                                </div>
                                {countryGroup.cities.map((city) => (
                                    <div
                                        key={city.code}
                                        className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex justify-between items-center"
                                        onClick={() => handleSelectCity(city)}
                                    >
                                        <span className='font-semibold text-sm text-[#333333]'>{city.name}</span>
                                        <span className="font-semibold text-[#333333]">{city.code}</span>
                                    </div>
                                ))}
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default DestSelectedBox;