import Logo from "../assets/images/logo-Flygabon-white.png";

const lmsUrl = import.meta.env.VITE_URL_LMS;
const cclUrl = import.meta.env.VITE_URL_CCL;
const agenceUrl = import.meta.env.VITE_URL_AGENCE;
const dataUrl = import.meta.env.VITE_URL_DATA_PROTECTION;
const mentionUrl = import.meta.env.VITE_URL_MENTION_LEGALE;
const conditionUrl = import.meta.env.VITE_URL_CONDITION;

const footer = () => {
    return (
        <div className="footer py-10 bg-[#5E5E5D]">
            <div className="part1 py-8 mx-12 border-b border-[#CED4DA] flex justify-between items-center">
                <div className="pl-10">
                    <a href="#">
                        <img src={Logo} alt="Logo FlyGabon" className="w-100" />
                    </a>
                    <p className="text-white uppercase"><i className="fa-solid fa-envelope"></i> Reservation@flygabon</p>
                </div>
                <div className="flex pr-17">
                    <a href={lmsUrl} target="_blank" className="cursor-pointer text-white mx-4 hover:underline" rel="noopener noreferrer">
                        <h5 className="uppercase flex text-[18px]"> Mon compte</h5>
                    </a>
                    <a href={agenceUrl} target="_blank" className="cursor-pointer mr-4 hover:underline" rel="noopener noreferrer">
                        <h5 className="uppercase flex text-[18px]"> Nos agences</h5>
                    </a>
                    <a href={cclUrl} target="_blank" className="cursor-pointer text-white hover:underline" rel="noopener noreferrer">
                        <h5 className="uppercase flex text-[18px]"> Nous-Contactez</h5>
                    </a>
                </div>
            </div>
            <div className="part2 py-8 mx-12 mt-3 flex justify-between items-center">
                <div className="pl-10">
                    <span>© Tous droits réservés FlyGabon</span>
                </div>
                <div className="flex pr-10">
                    <a href={dataUrl} target="_blank" className="cursor-pointer mx-8 hover:underline" rel="noopener noreferrer">
                        <h5 className="uppercase flex text-[12px]">Data Protection</h5>
                    </a>
                    <a href={mentionUrl} target="_blank" className="cursor-pointer mx-8 hover:underline" rel="noopener noreferrer">
                        <h5 className="uppercase flex text-[12px]">Mention Legales</h5>
                    </a>
                    <a href={conditionUrl} target="_blank" className="cursor-pointer mx-8 hover:underline" rel="noopener noreferrer">
                        <h5 className="uppercase flex text-[12px]">Termes et Conditions</h5>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default footer