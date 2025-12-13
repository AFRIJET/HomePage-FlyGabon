import i18n from 'i18next'
import { initReactI18next } from 'react-i18next';

i18n
    .use(initReactI18next) // Passer i18n à react-i18next
    .init({
        resources: {
            fr: {
                translation: {
                    // Header
                    "francais": "Français",
                    "anglais": "Anglais",
                    "espagnol": "Espagnol",
                    "portugais": "Portugais",
                    "my_account": "Mon compte",
                    "agence": "Nos agences",
                    "contact": "Nous Contacter",
                    // MainSearchContent
                    "option-reservation": "Reserver un vol",
                    "option-search-reservation": "Chercher une reservation",
                    "option-checkin": "Check-in",
                    // FlightSearchForm
                    "one-way": "Aller simple",
                    "roundtrip": "Aller-Retour",
                    "multi-route": "Multi-route",
                    "from": "De",
                    "to": "À",
                    "depart": "DEPART",
                    "return": "RETOUR",
                    "passagers": "passagers",
                    "passager": "Passager",
                    "search-flight": "Recherchez un vol",
                    "adulte": "Adultes",
                    "enfant": "Enfants",
                    "bebe": "Bébés",
                    "desc-adulte": "12 ans et +",
                    "desc-enfant": "2 - 12 ans",
                    "desc-bebe": "Moins de 2 ans",
                    // FindReservationForm
                    "search-reservation": "rechercher une réservation",
                    "reference-reservation": "référence de réservation",
                    "nom-famille": "Nom de famille",
                    "search": "Rechercher",
                    // CheckinForm
                    "enregistrement": "Enregistrement",
                    "numero-ticket": "Numéro de ticket",
                    // DomesticCarousel
                    "nos-destinations": "Nos destinations",
                    "description-destination": "Découvrez les paysages à couper le souffle et la culture vibrante du Gabon",
                    "Cameroun": "Cameroun",
                    // Footer
                    "copyright": "Tous droits réservés FlyGabon",
                    "data-protection": "Data protection",
                    "mention": "Mention légales",
                    "condition": "Termes et conditions"
                }
            },
            en: {
                translation: {
                    // Header
                    "francais": "French",
                    "anglais": "English",
                    "espagnol": "Spanish",
                    "portugais": "Portugeuse",
                    "my_account": "My account",
                    "agence": "Our agencies",
                    "contact": "Contact Us",
                    // MainSearchContent
                    "option-reservation": "Book flight",
                    "option-search-reservation": "find reservation",
                    "option-checkin": "Check-in",
                    // FlightSearchForm
                    "one-way": "One-way",
                    "roundtrip": "Roundtrip",
                    "multi-route": "Multi-route",
                    "from": "From",
                    "to": "To",
                    "depart": "DEPARTURE",
                    "return": "RETURN",
                    "passagers": "passengers",
                    "passager": "Passenger",
                    "search-flight": "Find flight",
                    "adulte": "Adults",
                    "enfant": "Children",
                    "bebe": "Infants",
                    "desc-adulte": "12 years and up",
                    "desc-enfant": "2 - 12 years",
                    "desc-bebe": "Under 2 years",
                    // FindReservationForm
                    "search-reservation": "search reservation",
                    "reference-reservation": "booking reference",
                    "nom-famille": "Last name",
                    "search": "Search",
                    // CheckinForm
                    "enregistrement": "Check-in",
                    "numero-ticket": "Ticket number",
                    // DomesticCarousel
                    "nos-destinations": "Our destinations",
                    "description-destination": "Discover the breathtaking landscapes and vibrant culture of Gabon",
                    "Cameroun": "Cameroon",
                    // Footer
                    "copyright": "All rights reserved FlyGabon",
                    "data-protection": "Data protection",
                    "mention": "Legal notice",
                    "condition": "Terms and conditions"
                }
            },
            es: {
                translation: {
                    // Header
                    "francais": "Francés",
                    "anglais": "Inglés",
                    "espagnol": "Español",
                    "portugais": "Portugués",
                    "my_account": "Mi cuenta",
                    "agence": "Nuestras agencias",
                    "contact": "Contáctenos",
                    // MainSearchContent
                    "option-reservation": "Reservar un vuelo",
                    "option-search-reservation": "Buscar una reserva",
                    "option-checkin": "Check-in",
                    // FlightSearchForm
                    "one-way": "Solo ida",
                    "roundtrip": "Ida y vuelta",
                    "multi-route": "Multiruta",
                    "from": "Desde",
                    "to": "A",
                    "depart": "SALIDA",
                    "return": "REGRESO",
                    "passagers": "pasajeros",
                    "passager": "Pasajero",
                    "search-flight": "Buscar un vuelo",
                    "adulte": "Adultos",
                    "enfant": "Niños",
                    "bebe": "Bebés",
                    "desc-adulte": "12 años y más",
                    "desc-enfant": "2 - 12 años",
                    "desc-bebe": "Menos de 2 años",
                    // FindReservationForm
                    "search-reservation": "buscar una reserva",
                    "reference-reservation": "referencia de reserva",
                    "nom-famille": "Apellido",
                    "search": "Buscar",
                    // CheckinForm
                    "enregistrement": "Facturación",
                    "numero-ticket": "Número de billete",
                    // DomesticCarousel
                    "nos-destinations": "Nuestros destinos",
                    "description-destination": "Descubre los impresionantes paisajes y la vibrante cultura de Gabón",
                    "Cameroun": "Camerún",
                    // Footer
                    "copyright": "Todos los derechos reservados FlyGabon",
                    "data-protection": "Protección de datos",
                    "mention": "Aviso legal",
                    "condition": "Términos y condiciones"
                }
            },
            pt: {
                translation: {
                    // Header
                    "francais": "Francês",
                    "anglais": "Inglês",
                    "espagnol": "Espanhol",
                    "portugais": "Português",
                    "my_account": "Minha conta",
                    "agence": "Nossas agências",
                    "contact": "Fale Conosco",
                    // MainSearchContent
                    "option-reservation": "Reservar voo",
                    "option-search-reservation": "Buscar reserva",
                    "option-checkin": "Check-in",
                    // FlightSearchForm
                    "one-way": "Só ida",
                    "roundtrip": "Ida e volta",
                    "multi-route": "Multirrota",
                    "from": "De",
                    "to": "Para",
                    "depart": "PARTIDA",
                    "return": "VOLTA",
                    "passagers": "passageiros",
                    "passager": "Passageiro",
                    "search-flight": "Buscar voo",
                    "adulte": "Adultos",
                    "enfant": "Crianças",
                    "bebe": "Bebês",
                    "desc-adulte": "12 anos ou mais",
                    "desc-enfant": "2 - 12 anos",
                    "desc-bebe": "Menos de 2 anos",
                    // FindReservationForm
                    "search-reservation": "buscar uma reserva",
                    "reference-reservation": "referência da reserva",
                    "nom-famille": "Sobrenome",
                    "search": "Buscar",
                    // CheckinForm
                    "enregistrement": "Check-in",
                    "numero-ticket": "Número do bilhete",
                    // DomesticCarousel
                    "nos-destinations": "Nossos destinos",
                    "description-destination": "Descubra as paisagens deslumbrantes e a cultura vibrante do Gabão",
                    "Cameroun": "Camarões",
                    // Footer
                    "copyright": "Todos os direitos reservados FlyGabon",
                    "data-protection": "Proteção de dados",
                    "mention": "Aviso legal",
                    "condition": "Termos e condições"
                }
            }
        },
        lng: "fr", // Langue par défaut initiale
        fallbackLng: "fr",
        interpolation: {
            escapeValue: false
        }
    })