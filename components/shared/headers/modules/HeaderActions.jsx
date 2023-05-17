import React from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import MiniCart from '~/components/shared/headers/modules/MiniCart';
import AccountQuickLinks from '~/components/shared/headers/modules/AccountQuickLinks';
import { checkAuthorization } from '../../../../store/auth/action';

const HeaderActions = ({ ecomerce, auth, dispatch }) => {
    const { compareItems, wishlistItems } = ecomerce;

    const [headerAuthView, setHeaderAuthView] = React.useState(false);

    // views
    React.useEffect(() => {
        if (auth.isLoggedIn === true) {
            setHeaderAuthView(true);
        } else {
            setHeaderAuthView(false);
        }
    }, [auth.isLoggedIn]);

    React.useEffect(() => {
        const item = window.localStorage.getItem('userData');
        if (item) {
            dispatch(checkAuthorization(JSON.parse(item)));
            // console.log(auth.user);
        }
    }, []);

    return (
        <div className="header__actions">
            {/* <Link href="/account/compare">
                <a className="header__extra">
                    <i className="icon-chart-bars"></i>
                    <span>
                        <i>{compareItems ? compareItems.length : 0}</i>
                    </span>
                </a>
            </Link> */}
            <Link href="/account/wishlist">
                <a className="header__extra">
                    <i className="icon-heart"></i>
                    <span>
                        <i>{wishlistItems ? wishlistItems.length : 0}</i>
                    </span>
                </a>
            </Link>
            <MiniCart />
            {headerAuthView ? (
                <AccountQuickLinks isLoggedIn={true} />
            ) : (
                <AccountQuickLinks isLoggedIn={false} />
            )}
        </div>
    );
};

export default connect((state) => state)(HeaderActions);
