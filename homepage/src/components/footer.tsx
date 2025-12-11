import { useTranslation } from "react-i18next";
import Logo from "../assets/images/logo-Flygabon-white.png";

const lmsUrl = import.meta.env.VITE_URL_LMS;
const cclUrl = import.meta.env.VITE_URL_CCL;
const agenceUrl = import.meta.env.VITE_URL_AGENCE;
const dataUrl = import.meta.env.VITE_URL_DATA_PROTECTION;
const mentionUrl = import.meta.env.VITE_URL_MENTION_LEGALE;
const conditionUrl = import.meta.env.VITE_URL_CONDITION;

const footer = () => {
    const {t} = useTranslation();
    return (
        <div className="footer py-5 sm:py-10 bg-[#5E5E5D]">
            <div className="part1 py-6 sm:py-8 md:mx-0 lg:mx-12 border-b border-[#CED4DA] md:flex justify-between items-center">
                <div className="pl-10">
                    <a href="#">
                        <img src={Logo} alt="Logo FlyGabon" className="lg:w-70 xl.w-100" />
                    </a>
                    <p className="text-white lg:text-[14px] uppercase"><i className="fa-solid fa-envelope"></i> Reservation@flygabon</p>
                </div>
                <div className="flex mt-6 ml-6 sm:ml-0 sm:mt-0 md:pr-10 lg:pr-17">
                    <a href={lmsUrl} target="_blank" className="cursor-pointer text-white mx-4 hover:underline" rel="noopener noreferrer">
                        <h5 className="uppercase flex text-[14px] md:text-[16px] lg:text-[18px]">{t('my_account')}</h5>
                    </a>
                    <a href={agenceUrl} target="_blank" className="cursor-pointer mr-4 hover:underline" rel="noopener noreferrer">
                        <h5 className="uppercase flex text-[14px] md:text-[16px] lg:text-[18px]">{t('agences')}</h5>
                    </a>
                    <a href={cclUrl} target="_blank" className="cursor-pointer text-white hover:underline" rel="noopener noreferrer">
                        <h5 className="uppercase flex text-[14px] md:text-[16px] lg:text-[18px]">{t('contact')}</h5>
                    </a>
                </div>
            </div>
            <div className="part2 py-8 flex flex-col md:mx-0 lg:mx-12 sm:mt-3 sm:flex-row justify-between items-center">
                <div className="mt-3 sm:mt-0 sm:pl-10 order-2 sm:order-1">
                    <span>© {t('copyright')}</span>
                </div>
                <div className="flex space-x-4 mt-4 pl-4 md:pr-8 lg:pr-10 order-1 sm:order-2">
                    <a href={dataUrl} target="_blank" className="cursor-pointer md:mx-3 lg:mx-8 hover:underline" rel="noopener noreferrer">
                        <h5 className="uppercase flex text-[12px]">{t('data-protection')}</h5>
                    </a>
                    <a href={mentionUrl} target="_blank" className="cursor-pointer md:mx-3 lg:mx-8 hover:underline" rel="noopener noreferrer">
                        <h5 className="uppercase flex text-[12px]">{t('mention')}</h5>
                    </a>
                    <a href={conditionUrl} target="_blank" className="cursor-pointer md:mx-3 lg:mx-8 hover:underline" rel="noopener noreferrer">
                        <h5 className="uppercase flex text-[12px]">{t('condition')}</h5>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default footer