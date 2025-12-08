import { useState } from 'react';
import { ArrowLeft01Icon, ArrowRight01Icon } from 'hugeicons-react'; // Icônes de navigation

// Helper pour formater la date en 'Mois Année' (ex: Décembre 2025)
const formatDateHeader = (date: Date) => {
    return date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
};

// Helper pour générer un tableau des jours du mois
const getDaysInMonth = (year: number, month: number) => {
    const date = new Date(year, month, 1);
    const days = [];

    // Remplir les jours vides au début (Lundi=0, Dimanche=6)
    // Nous allons ajuster pour un début de semaine au Lundi (1)
    const startDayIndex = (date.getDay() === 0 ? 6 : date.getDay() - 1);
    for (let i = 0; i < startDayIndex; i++) {
        days.push(null);
    }

    // Remplir les jours du mois
    while (date.getMonth() === month) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }
    return days;
};

// Types pour MonthView
type MonthViewProps = {
    monthIndex: number;
    year: number;
    onDateClick: (date: Date) => void;
    selectedDate: Date | null;
};

// Composant pour un seul mois
const MonthView = ({ monthIndex, year, onDateClick, selectedDate }: MonthViewProps) => {
    const days = getDaysInMonth(year, monthIndex);
    const dayNames = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

    return (
        <div className="w-1/2 p-2 ml-2">
            <h3 className="text-center mb-2 text-gray-700">
                {formatDateHeader(new Date(year, monthIndex))}
            </h3>

            {/* Jours de la semaine */}
            <div className="grid grid-cols-7 text-xs text-[15px] mb-1">
                {dayNames.map(name => (
                    <div key={name} className="text-center"><p>{name}</p></div>
                ))}
            </div>

            {/* Grille des jours */}
            <div className="grid grid-cols-7 gap-2">
                {days.map((day, index) => {
                    const today = new Date();
                    // Pour comparer seulement la date, on met l'heure d'aujourd'hui à minuit.
                    today.setHours(0, 0, 0, 0);

                    // Vérifie si le jour est dans le passé (strictement avant aujourd'hui)
                    const isDisabled = !!day && day < today;

                    const isToday = !!day && day.toDateString() === new Date().toDateString();
                    const isSelected = !!day && !!selectedDate && day.toDateString() === selectedDate.toDateString();

                    if (!day) {
                        return <div key={index} className="h-6"></div>; // Jour vide
                    }

                    const baseClasses = 'h-6 text-sm flex items-center justify-center rounded-sm p-3 cursor-pointer transition-colors text-[16px]';

                    let dayClasses = '';

                    if (isDisabled) {
                        // Style des jours passés (désactivés, faible opacité)
                        dayClasses = 'bg-gray-300 text-white cursor-not-allowed';
                    } else if (isSelected) {
                        // Style de la date sélectionnée (couleur accentuée)
                        dayClasses = 'bg-red-500 text-white hover:bg-red-600';
                    } else if (isToday) {
                        // Style d'aujourd'hui (couleur accentuée, bordure)
                        dayClasses = 'bg-[#4764B2] text-white';
                    } else {
                        // Style des jours disponibles (texte blanc sur fond sombre)
                        dayClasses = 'bg-gray-100 text-gray-700 hover:bg-gray-300';
                    }

                    return (
                        <button
                            key={index}
                            onClick={() => onDateClick(day)}
                            className={`${baseClasses} ${dayClasses}`}
                            disabled={isDisabled} // Désactive le bouton si la date est passée
                        >
                            {day.getDate()}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

// Composant principal TwoMonthCalendar
const TwoMonthCalendar = ({ onSelect, leg }: { onSelect: (date: Date) => void; leg: any }) => {
    // État gérant le mois affiché (le premier mois)
    const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    // Date du deuxième mois
    const nextMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);

    // Fonction de navigation
    const navigateMonth = (direction: number) => {
        const newMonth = new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth() + direction,
            1
        );
        setCurrentMonth(newMonth);
    };

    // Gestion du clic sur une date
    const handleDateClick = (date: Date) => {
        setSelectedDate(date);
        onSelect(date); // Renvoyer la date sélectionnée au composant parent
    };

    return (
        <div className="flex flex-col bg-white w-[650px]">

            {/* Barres de navigation */}
            <div className="flex justify-between items-center px-4 py-2">
                <button
                    onClick={() => navigateMonth(-1)}
                    className="p-2 rounded-full hover:bg-gray-100 transition"
                    aria-label="Mois précédent"
                >
                    <ArrowLeft01Icon size={20} />
                </button>
                <div className="flex space-x-4 text-sm font-semibold text-gray-800">
                    <h2>{leg}</h2>
                </div>
                <button
                    onClick={() => navigateMonth(1)}
                    className="p-2 rounded-full hover:bg-gray-100 transition"
                    aria-label="Mois suivant"
                >
                    <ArrowRight01Icon size={20} />
                </button>
            </div>

            {/* Vue des deux mois */}
            <div className="flex p-2">
                <MonthView
                    monthIndex={currentMonth.getMonth()}
                    year={currentMonth.getFullYear()}
                    onDateClick={handleDateClick}
                    selectedDate={selectedDate}
                />
                <MonthView
                    monthIndex={nextMonth.getMonth()}
                    year={nextMonth.getFullYear()}
                    onDateClick={handleDateClick}
                    selectedDate={selectedDate}
                />
            </div>
        </div>
    );
};

export default TwoMonthCalendar;