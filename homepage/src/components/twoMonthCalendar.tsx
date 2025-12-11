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

// Types pour MonthView (inchangé)
type MonthViewProps = {
    monthIndex: number;
    year: number;
    onDateClick: (date: Date) => void;
    selectedDate: Date | null;
    className?: string;
};

// Composant pour un seul mois (Mise à Jour de la Largeur)
const MonthView = ({ monthIndex, year, onDateClick, selectedDate, className }: MonthViewProps) => {
    const days = getDaysInMonth(year, monthIndex);
    const dayNames = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

    return (
        // Changement 3: w-full par défaut (mobile), sm:w-1/2 à partir de sm
        // Retrait de 'ml-2' pour le mobile, ajout de 'sm:ml-2' si nécessaire (ou laisser un petit padding sur le parent)
        <div className={`w-full p-2 ${className || ''}`}>
            <h3 className="text-center mb-2 text-gray-700">
                {formatDateHeader(new Date(year, monthIndex))}
            </h3>

            {/* Jours de la semaine (inchangé) */}
            <div className="grid grid-cols-7 text-xs text-[15px] mb-1">
                {dayNames.map(name => (
                    <div key={name} className="text-center"><p>{name}</p></div>
                ))}
            </div>

            {/* Grille des jours (inchangé) */}
            <div className="grid grid-cols-7 gap-2">
                {days.map((day, index) => {
                    // ... Logique des jours (inchangé) ...
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);

                    const isDisabled = !!day && day < today;
                    const isToday = !!day && day.toDateString() === new Date().toDateString();
                    const isSelected = !!day && !!selectedDate && day.toDateString() === selectedDate.toDateString();

                    if (!day) {
                        return <div key={index} className="h-6"></div>;
                    }

                    const baseClasses = 'h-6 text-sm flex items-center justify-center rounded-sm p-3 cursor-pointer transition-colors text-[16px]';
                    let dayClasses = '';

                    if (isDisabled) {
                        dayClasses = 'bg-gray-300 text-white cursor-not-allowed';
                    } else if (isSelected) {
                        dayClasses = 'bg-red-500 text-white hover:bg-red-600';
                    } else if (isToday) {
                        dayClasses = 'bg-[#4764B2] text-white';
                    } else {
                        dayClasses = 'bg-gray-100 text-gray-700 hover:bg-gray-300';
                    }

                    return (
                        <button
                            key={index}
                            onClick={() => onDateClick(day)}
                            className={`${baseClasses} ${dayClasses}`}
                            disabled={isDisabled}
                        >
                            {day.getDate()}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

// Composant principal TwoMonthCalendar (Mise à Jour)
const TwoMonthCalendar = ({ onSelect, leg }: { onSelect: (date: Date) => void; leg: any }) => {
    const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const nextMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);

    const navigateMonth = (direction: number) => {
        const newMonth = new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth() + direction,
            1
        );
        setCurrentMonth(newMonth);
    };

    const handleDateClick = (date: Date) => {
        setSelectedDate(date);
        onSelect(date);
    };

    return (
        // Changement 1: w-full par défaut, sm:w-[650px] à partir de sm
        <div className="z-[9999] flex flex-col bg-white w-full sm:w-[650px]">

            {/* Barres de navigation (inchangé) */}
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

            {/* Vue des mois */}
            <div className="flex p-2">
                {/* Premier Mois (Toujours visible) */}
                <MonthView
                    monthIndex={currentMonth.getMonth()}
                    year={currentMonth.getFullYear()}
                    onDateClick={handleDateClick}
                    selectedDate={selectedDate}
                    className="flex-1"
                />

                {/* Deuxième Mois */}
                {/* Changement 2: hidden par défaut (mobile), sm:flex pour l'afficher à partir de sm */}
                <MonthView
                    monthIndex={nextMonth.getMonth()}
                    year={nextMonth.getFullYear()}
                    onDateClick={handleDateClick}
                    selectedDate={selectedDate}
                    className="hidden sm:block flex-1"
                />
            </div>
        </div>
    );
};

export default TwoMonthCalendar;