import React from 'react';

import Router from 'next/router';

import BreadCrumb from '~/components/elements/BreadCrumb';

import PageContainer from '~/components/layouts/PageContainer';

import FooterDefault from '~/components/shared/footers/FooterDefault';

import Newletters from '~/components/partials/commons/Newletters';

import { connect } from 'react-redux';
import ResetPasswordUid from '~/components/partials/account/ResetPasswordUid';

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

                    <ResetPasswordUid />
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
