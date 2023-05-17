import en from './en.json';
import ar from './ar.json';
import { useRouter } from 'next/router';

const useTranslation = () => {
    const { locale } = useRouter();

    const Translate = (word) => {
        if (locale?.toLowerCase()?.includes('en')) return en[word];
        else return ar[word];
    };
    return { Translate, locale };
};
export default useTranslation;
