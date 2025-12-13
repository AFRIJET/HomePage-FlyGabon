import { useState, useRef, useEffect } from 'react';
import { Calendar03Icon } from 'hugeicons-react';
// Imaginez que ce composant vienne d'une bibliothèque de calendrier personnalisée
import TwoMonthCalendar from './twoMonthCalendar'; 

type Props = {
    placeholder?: string;
    value: string;
    onChange: (date: string) => void;
    disabled?: boolean;
    type?: string
}

const CustomDateInput = ({ placeholder, value, onChange, disabled, type }: Props) => {
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);

    // Gère le clic à l'extérieur pour fermer le pop-up
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsCalendarOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Gère la sélection d'une date
    const handleDateSelect = (date: Date) => {
        // Formate la date en chaîne (exemple: JJ/MM/AAAA)
        const formattedDate = date.toLocaleDateString('fr-FR'); 
        onChange(formattedDate);
        setIsCalendarOpen(false); // Ferme le calendrier après la sélection
    };

    // Détermine si le label doit être flottant
    const isLabelFloating = isCalendarOpen || !!value; 

    return (
        <div 
            className={`relative w-full h-16 bg-white border-r border-gray-400 rounded-lg ${disabled ? 'bg-gray-200' : ''}`}
            ref={containerRef}
        >
            {/* 1. Étiquette Flottante/Statique */}
            <label 
                className={`absolute left-4 transition-all duration-300 pointer-events-none z-10 
                    ${isLabelFloating 
                        ? 'top-2 text-xs font-semibold text-gray-500' // Flottant
                        : 'top-1/2 -translate-y-1/2 text-gray-700'  // Statique
                    }
                `}
                htmlFor={placeholder}
            >
                {placeholder}
            </label>
            
            {/* 2. Champ d'Affichage (Input qui ouvre le pop-up) */}
            <input 
                id={placeholder}
                type="text" 
                value={value}
                readOnly
                disabled={disabled}
                onClick={() => setIsCalendarOpen(true)} // Ouvre le pop-up au clic
                // Padding pour la position du label flottant
                className={`date-input w-full  xl:w-full h-full pt-6 pb-2 px-4 rounded-lg focus:outline-none text-base ${isLabelFloating ? '' : 'pt-4 pb-4'}`}
            />

            {/* 3. Icône Calendrier */}
            <Calendar03Icon size={20} className="absolute right-4 top-1/2 -translate-y-1/2" />

            {/* 4. Pop-up Calendrier (Position Absolue) */}
            {isCalendarOpen && !disabled && (
                <div className={`absolute top-full z-[9999] mt-2 shadow-2xl rounded-lg bg-white p-4 border border-gray-200 ${type === 'depart' ? 'lg:-left-80 xl:-left-50' : 'md:-left-50 lg:-left-75'}`}>
                    <TwoMonthCalendar onSelect={handleDateSelect} leg={placeholder} />
                </div>
            )}
        </div>
    );
};

export default CustomDateInput;