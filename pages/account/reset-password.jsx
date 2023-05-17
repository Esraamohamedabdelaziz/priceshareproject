import React from 'react';

import Router from 'next/router';

import BreadCrumb from '~/components/elements/BreadCrumb';

import ResetPassword from '~/components/partials/account/ResetPassword';

import PageContainer from '~/components/layouts/PageContainer';

import FooterDefault from '~/components/shared/footers/FooterDefault';

import Newletters from '~/components/partials/commons/Newletters';

import { connect } from 'react-redux';

const ResetPasswordPage = (props) => {
    const breadCrumb = [
        {
            text: 'Home',

            url: '/',
        },

        {
            text: 'Reset Password',
        },
    ];

    if (props.auth.isLoggedIn || props.auth.user != null) {
        Router.push('/');
    }

    return (
        <>
            <PageContainer footer={<FooterDefault />} title="Reset Password">
                <div className="ps-page--my-account">
                    <BreadCrumb breacrumb={breadCrumb} />

                    <ResetPassword />
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

export default connect(mapStateToProps)(ResetPasswordPage);
