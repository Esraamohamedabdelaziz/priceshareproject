import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { useDispatch } from 'react-redux';
import { loginModelController, logOut } from '~/store/auth/action';
import useTranslation from '~/config/lang';

const AccountMenuSidebar = ({ data }) => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const { Translate: t } = useTranslation();
    useEffect(() => {
        if (
            JSON.parse(localStorage.getItem('userData')) &&
            JSON.parse(localStorage.getItem('userData'))['username']
        ) {
            setUsername(
                JSON.parse(localStorage.getItem('userData'))['username']
            );
        } else {
            dispatch(loginModelController(true));
        }
    }, []);

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logOut());
        dispatch(loginModelController(true));
    };

    return (
        <aside className="ps-widget--account-dashboard">
            <div className="ps-widget__header">
                <figure>
                    <figcaption>Hello</figcaption>
                    <p style={{ color: 'black' }}>{username}</p>
                </figure>
            </div>
            <div className="ps-widget__content">
                <ul>
                    {data.map((link) => (
                        <li
                            key={link.text}
                            className={link.active ? 'active' : ''}
                        >
                            <Link href={link.url}>
                                <a style={{ color: 'black' }}>
                                    <i className={link.icon}></i>
                                    {link.text}
                                </a>
                            </Link>
                        </li>
                    ))}
                    <li>
                        <li>
                            <a
                                style={{ color: '#000' }}
                                onClick={(e) => handleLogout(e)}
                            >
                                {t('logout')}
                            </a>
                        </li>
                    </li>
                </ul>
            </div>
        </aside>
    );
};

export default AccountMenuSidebar;
