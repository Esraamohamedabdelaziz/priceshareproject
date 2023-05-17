import React from 'react';
import Link from 'next/link';
import MenuDropdown from '~/components/elements/menu/MenuDropdown';
import MegaMenu from '~/components/elements/menu/MegaMenu';
import { useRouter } from 'next/router';

const Menu = ({ source, className }) => {
    const router = useRouter();
    const lang = router.locale;
    const getTextLang = (item) => {
        if (lang == 'ar') {
            return item.text_ar;
        }

        return item.text;
    };
    // Views
    let menuView;
    if (source) {
        menuView = source.map((item) => {
            console.log(item);
            if (item.subMenu) {
                return <MenuDropdown source={item} key={getTextLang(item)} />;
            } else if (item.megaContent) {
                return <MegaMenu source={item} key={getTextLang(item)} />;
            } else if (item.mainTitle) {
                return (
                    <li key={getTextLang(item)} className="menu__item">
                        <Link href={item.url}>
                            <a
                                style={{
                                    color: '#FFFFFF',
                                    textTransform: 'Uppercase',
                                }}
                            >
                                {item.icon && <i className={item.icon}></i>}
                                {getTextLang(item)}
                            </a>
                        </Link>
                    </li>
                );
            } else {
                console.log(getTextLang(item));
                return (
                    <li key={getTextLang(item)}>
                        <Link href={item.url}>
                            <a style={{ color: '#000' }}>
                                {item.icon && <i className={item.icon}></i>}
                                {getTextLang(item)}
                            </a>
                        </Link>
                    </li>
                );
            }
        });
    } else {
        menuView = (
            <li>
                <a href="#" onClick={(e) => e.preventDefault()}>
                    No menu item.
                </a>
            </li>
        );
    }
    return <ul className={className}>{menuView}</ul>;
};

export default Menu;
