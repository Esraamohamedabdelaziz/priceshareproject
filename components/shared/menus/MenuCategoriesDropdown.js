import React from 'react';
import menuData from '~/public/static/data/menu.json';
import Menu from '~/components/elements/menu/Menu';
import useTranslation from '~/config/lang';

const MenuCategoriesDropdown = () => {
    const { Translate: t } = useTranslation();
    return (
        <div className="menu--product-categories">
            <div className="menu__toggle">
                <i
                    className="icon-menu"
                    style={{
                        color: 'white',
                    }}
                ></i>
                <span
                    style={{
                        fontSize: '100%',
                    }}
                >
                    {t('shop_category')}
                </span>
            </div>
            <div className="menu__content">
                <Menu
                    source={menuData.product_categories}
                    className="menu--dropdown"
                />
            </div>
        </div>
    );
};

export default MenuCategoriesDropdown;
