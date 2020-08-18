import React from 'react';
import './forgotPassword.css';
import {RouteComponentProps} from 'react-router-dom';
import {Footer} from "../../components";

interface ForgotPasswordProps extends RouteComponentProps {

}type ForgotPasswordState = {
    email: string;
};

type ForgotPasswordFormData = {
    email: string;
};

type ForgotPasswordResSuccess = {
    message: string;
};

type ForgotPasswordError = {
    message: string;
};


export class ForgotPassword extends React.Component<ForgotPasswordProps, any> {
    constructor(props: ForgotPasswordProps) {
        super(props);
        this.state = {
            email: ''
        }
    }

    onSubmit = () => {

    };

    handleChangeEmailInput = () => {

    };
    render(): React.ReactElement {
        const {onSubmit, handleChangeEmailInput, state} = this;
        return (
            <div>
                <div className="main">
                    <div className="wrapper-sign-up">
                        <div className="right-content">
                            <div className="form-forgot-pass">
                                <div className="logo">
                                    <span className="block-logo"></span>
                                </div>
                                <div className="form-forgot-pass-child">
                                    <form className="form-forgot-input" onSubmit={onSubmit}>
                                        <h4 className="trouble-log-in">Trouble Logging In?</h4>
                                        <div className="description-forgot">
                                            Enter your username or email and we'll send you a link to get back into your account.
                                        </div>
                                        <div className="mg-input">
                                            <div className="input-forgot-pass">
                                                <input aria-label="Mobile number or email"
                                                       placeholder="Email, Phone, or Username"
                                                       name="email"
                                                       type="text"
                                                       className="input-text"
                                                       value={state.email}
                                                       onChange={handleChangeEmailInput}
                                                />
                                            </div>
                                        </div>
                                        <div className="btn-forgot-pass">
                                            <button type="submit" className="btn-forgot-pass-submit">Send Login Link</button>
                                        </div>
                                        <div className="submit-bottom">
                                            <div className="break-line"></div>
                                            <div className="or-text">or</div>
                                            <div className="break-line"></div>
                                        </div>
                                        <div className="sign-up-link">
                                            <a href="/register">Create New Account</a>
                                        </div>
                                    </form>
                                    <div className="back-log-in">
                                        <div className="back-log-in-child">
                                            <a href="/login">Back To Login</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}