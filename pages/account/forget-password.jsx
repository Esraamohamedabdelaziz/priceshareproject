import React from 'react';

import Router from 'next/router';

import BreadCrumb from '~/components/elements/BreadCrumb';

import ForgetPassword from '~/components/partials/account/ForgetPassword';

import PageContainer from '~/components/layouts/PageContainer';

import FooterDefault from '~/components/shared/footers/FooterDefault';

import Newletters from '~/components/partials/commons/Newletters';

import { connect } from 'react-redux';
import useTranslation from '~/config/lang';

const ForgetPasswordPage = (props) => {
    const { Translate: t } = useTranslation();
    const breadCrumb = [
        {
            text: 'Home',

            url: '/',
        },

        {
            text: 'Forgot Password',
        },
    ];

    if (props.auth.isLoggedIn || props.auth.user != null) {
        Router.push('/');
    }

    return (
        <>
            <PageContainer footer={<FooterDefault />} title="Forgot Password">
                <div className="ps-page--my-account">
                    <BreadCrumb breacrumb={breadCrumb} />

                    <ForgetPassword />
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

export default connect(mapStateToProps)(ForgetPasswordPage);
