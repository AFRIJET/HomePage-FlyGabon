import { useState, useRef, useEffect } from 'react';
import { UserIcon, Remove01Icon, Add01Icon } from 'hugeicons-react';
import { useTranslation } from 'react-i18next'

type Props = {
    placeholder: string;
    onChange: (totalDisplay: string, counts: { adults: number; children: number; babies: number }) => void;
}

// État initial des passagers
const initialCounts = {
    adults: 1,
    children: 0,
    babies: 0,
};

const PassengerSelector = ({ placeholder, onChange }: Props) => {
    const {t} = useTranslation();
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [counts, setCounts] = useState(initialCounts);
    const containerRef = useRef<HTMLDivElement | null>(null);

    // Gère le clic à l'extérieur pour fermer le pop-up
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node | null;
            if (containerRef.current && target && !containerRef.current.contains(target)) {
                setIsPopupOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // --- LOGIQUE INTERNE ---

    // Calcule le total et met à jour l'état parent via onChange
    interface PassengerCounts {
        adults: number;
        children: number;
        babies: number;
    }

    const calculateTotal = (newCounts: PassengerCounts): string => {
        const total = newCounts.adults + newCounts.children + newCounts.babies;
        const totalDisplay = `${total} ${t('passager')}${total > 1 ? '(s)' : ''}`;

        // Appelle la fonction de mise à jour du parent
        onChange(totalDisplay, newCounts);
        return totalDisplay;
    };

    // Met à jour un type de passager
    const updateCount = (type: string, delta: number) => {
        const key = type as keyof PassengerCounts;
        const newCounts: PassengerCounts = {
            ...counts,
            [key]: Math.max(0, (counts as PassengerCounts)[key] + delta),
        };

        // Assurez-vous que le nombre de bébés ne dépasse pas le nombre d'adultes
        if (type === 'babies' && newCounts.babies > newCounts.adults) {
            newCounts.babies = newCounts.adults;
        }

        // Assurez-vous qu'il y a toujours au moins un adulte
        if (newCounts.adults === 0 && (newCounts.children > 0 || newCounts.babies > 0)) {
            newCounts.adults = 1;
        } else if (newCounts.adults === 0 && newCounts.children === 0 && newCounts.babies === 0) {
            newCounts.adults = 1; // Rétablit 1 adulte si tout est à zéro
        }

        setCounts(newCounts);
        calculateTotal(newCounts);
    };

    const totalDisplay = calculateTotal(counts);
    const isLabelFloating = isPopupOpen || totalDisplay;

    // --- RENDU ---

    type PassengerRowProps = {
        type: 'adults' | 'children' | 'babies';
        label: string;
        count: number;
        min?: number;
    };

    const PassengerRow = ({ type, label, count, min = 0 }: PassengerRowProps) => (
        <div className="flex justify-between items-center py-2">
            <div>
                <div className="font-semibold text-gray-800">{label}</div>
                <div className="text-xs text-gray-500">
                    <span>
                        {type === 'adults' && t('desc-adulte')}
                        {type === 'children' && t('desc-enfant')}
                        {type === 'babies' && t('desc-bebe')}
                    </span>
                </div>
            </div>
            <div className="flex items-center space-x-3">
                <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); updateCount(type, -1); }}
                    disabled={count <= min}
                    className={`p-1 rounded-lg transition ${count <= min ? 'bg-blue-100 text-white cursor-not-allowed' : 'bg-[#4764B2] text-white hover:bg-blue-500'}`}
                >
                    <Remove01Icon size={16} />
                </button>
                <p className="w-6 text-center font-bold text-gray-800">{count}</p>
                <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); updateCount(type, 1); }}
                    className="p-1 rounded-lg bg-[#4764B2] text-white hover:bg-blue-500 transition"
                >
                    <Add01Icon size={16} />
                </button>
            </div>
        </div>
    );

    return (
        <div
            className="relative w-full h-16 bg-white border-r border-gray-400 rounded-lg"
            ref={containerRef}
        >
            {/* Conteneur principal (Clickable) */}
            <div
                onClick={() => setIsPopupOpen(!isPopupOpen)}
                className="w-full h-full"
                
            >
                {/* 1. Étiquette Flottante/Statique */}
                <label
                    className={`absolute left-4 transition-all duration-300 pointer-events-none z-10 
                        ${isLabelFloating
                            ? 'top-2 text-xs text-gray-500 font-semibold uppercase'
                            : 'top-1/2 -translate-y-1/2 text-gray-700'
                        }
                    `}
                >
                    {placeholder}
                </label>

                {/* 2. Affichage du Total */}
                <div
                    className={`w-full h-full px-4 pt-7 text-gray-800 bg-transparent text-base ${isLabelFloating ? 'pb-2' : 'pb-4'}`}
                >
                    {totalDisplay}
                </div>

                <UserIcon size={20} className="absolute right-4 top-1/2 -translate-y-1/2" />
            </div>

            {/* 3. Pop-up de Sélection */}
            {isPopupOpen && (
                <div className="absolute top-full right-0 mt-2 z-50 shadow-2xl rounded-lg bg-white p-4 w-60 border border-gray-200">
                    <PassengerRow type="adults" label={t('adulte')} count={counts.adults} min={1} />
                    <PassengerRow type="children" label={t('enfant')} count={counts.children} />
                    <PassengerRow type="babies" label={t('bebe')} count={counts.babies} />

                    <button
                        onClick={() => setIsPopupOpen(false)}
                        className="search-passager-button mt-4 w-full py-2 rounded-md transition cursor-pointer"
                    >
                        OK
                    </button>
                </div>
            )}
        </div>
    );
};

export default PassengerSelector;