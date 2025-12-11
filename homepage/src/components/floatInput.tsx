import { useState, type ChangeEvent } from 'react';

type Props = {
    placeholder: string;
    initialValue?: string;
    type?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
}

const FloatingInput = ({ placeholder, initialValue = '', type = 'text', onChange, className } : Props) => {
    // 1. État local de la valeur (pour savoir si le champ est rempli)
    const [value, setValue] = useState(initialValue);
    // 2. État local du focus (pour savoir si le champ est actif)
    const [isFocused, setIsFocused] = useState(false);

    // Détermine si le label doit être flottant (en haut)
    const isLabelFloating = isFocused || value;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setValue(newValue);
        if (onChange) {
            onChange(e); // Appel du gestionnaire passé par le parent si nécessaire
        }
    };

    return (
        // Utilisation de 'relative' pour positionner le label absolu
        <div className={`relative h-16 w-full ${className}`}>
            
            {/* 1. Le Label Flottant */}
            <label
                className={`absolute left-4 transition-all uppercase duration-300 pointer-events-none z-10 text-white
                    ${isLabelFloating
                        ? 'top-2 text-xs font-semibold text-gray-400'
                        : 'top-1/2 -translate-y-1/2 text-gray-400 text-lg'
                    }
                `}
                htmlFor={placeholder}
            >
                {placeholder}
            </label>

            {/* 2. Le Champ d'Input */}
            <input
                id={placeholder}
                type={type}
                value={value}
                onChange={handleChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className={`input-search-name w-full h-full rounded-lg focus:outline-none text-gray-800 text-base 
                    ${isLabelFloating ? 'pt-6 pb-2 px-4' : 'py-4 px-4'}
                `}
            />
        </div>
    );
};

export default FloatingInput;