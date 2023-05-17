import React from 'react';
import Link from 'next/link';

const MenuDropdown = ({ source }) => {
    return (
        <li className="menu-item-has-children dropdown">
            {
                <Link href={source.url}>
                    <a
                        style={{
                            color:
                                source.text === t('home') ? 'white' : 'black',
                            textTransform:
                                source.text === t('home')
                                    ? 'Uppercase'
                                    : 'none',
                        }}
                    >
                        {source.text}
                    </a>
                </Link>
            }
            {source.subMenu && (
                <ul className={source.subClass}>
                    {source.subMenu.map((subMenuItem, index) => (
                        <MenuDropdown source={subMenuItem} key={index} />
                    ))}
                </ul>
            )}
        </li>
    );
};

export default MenuDropdown;
