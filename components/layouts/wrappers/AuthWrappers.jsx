import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginModelController } from '~/store/auth/action';

const AuthWrappers = ({ children }) => {
    const [showChildren, setShowChildren] = useState(false);
    const dispatch = useDispatch();
    const isLoginModelOpen = useSelector(
        (state) => state.auth.isLoginModelOpen
    );
    useEffect(() => {
        if (window != 'undefined' && !isLoginModelOpen) {
            const token = JSON.parse(localStorage.getItem('userData'))?.token;
            if (!token || token == 'undefined') {
                dispatch(loginModelController(true));
            } else {
                setShowChildren(true);
            }
        }
    }, [isLoginModelOpen]);
    return <div>{showChildren && <>{children}</>}</div>;
};

export default AuthWrappers;
