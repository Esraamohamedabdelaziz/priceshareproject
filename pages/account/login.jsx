import React from 'react';

import Router from 'next/router';

import BreadCrumb from '~/components/elements/BreadCrumb';

import Login from '~/components/partials/account/Login';

import PageContainer from '~/components/layouts/PageContainer';

import FooterDefault from '~/components/shared/footers/FooterDefault';

import Newletters from '~/components/partials/commons/Newletters';

import { connect } from 'react-redux';
import useTranslation from '~/config/lang';

const LoginPage = (props) => {
    const { Translate: t } = useTranslation();
    const breadCrumb = [
        {
            text: 'Home',

            url: '/',
        },

        {
            text: t('login'),
        },
    ];

    if (props.auth.isLoggedIn || props.auth.user != null) {
        // console.log('entered');

        Router.push('/');
    }

    // React.useEffect(() => {

    //     console.log('from login ', props);

    // }, []);

    return (
        <>
            <PageContainer footer={<FooterDefault />} title="Login">
                <div className="ps-page--my-account">
                    <BreadCrumb breacrumb={breadCrumb} />

                    <Login />
                </div>

                {/* <Newletters layout="container" /> */}
            </PageContainer>
        </>
    );
};

function mapStateToProps(state) {
    return {
        auth: state.auth,
    };
}

export default connect(mapStateToProps)(LoginPage);
