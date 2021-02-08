import axios, { AxiosResponse } from 'axios';
import React, { ChangeEvent } from 'react';
import './ForgotPassword.css';
import { Link, RouteComponentProps } from 'react-router-dom';
import { AuthPageContainer } from '../../components/AuthPageContainer';
import * as API from '../../constants/api';

type ForgotPasswordProps = RouteComponentProps

type ForgotPasswordState = {
    email: string;
    successMessage: string;
    errorMessage: string;
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

export class ForgotPassword extends React.Component<ForgotPasswordProps, ForgotPasswordState> {
    state = {
        email: '',
        successMessage: '',
        errorMessage: '',
    };

    onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const formData: ForgotPasswordFormData = {
            email: this.state.email,
        };

        axios.post<ForgotPasswordResSuccess, AxiosResponse<ForgotPasswordResSuccess | ForgotPasswordError>>(API.ForgotPass, formData)
            .then((res) => {
                this.setState({
                    successMessage: res.data.message,
                });

                setTimeout(() => this.props.history.push('/login'), 3000);
            })
            .catch((err) => {
                if (err) {
                    this.setState({
                        errorMessage: err.response.data.message,
                    });
                }
            });
    };

    handleChangeEmailInput = (event: ChangeEvent<HTMLInputElement>): void => {
        this.setState({
            email: event.target.value,
        });
    };

    render(): React.ReactElement {
        const { onSubmit, handleChangeEmailInput, state } = this;
        return (
            <AuthPageContainer>
                <div className="wrapper-sign-up">
                    <div className="right-content">
                        <div className="form-forgot-pass">
                            <div className="logo">
                                <span className="block-logo" />
                            </div>
                            <div className="form-forgot-pass-child">
                                <form className="form-forgot-input" onSubmit={onSubmit}>
                                    <h4 className="trouble-log-in">Trouble Logging In?</h4>
                                    <div className="description-forgot">
                                        Enter your username or email and we&apos;ll send you a link to get back into your
                                        account.
                                    </div>
                                    <div className="mg-input">
                                        <div className="input-forgot-pass">
                                            <input
                                                aria-label="Mobile number or email"
                                                placeholder="Email, Phone, or Username"
                                                name="email"
                                                type="text"
                                                className="input-text"
                                                autoComplete="off"
                                                value={state.email}
                                                onChange={handleChangeEmailInput}
                                            />
                                        </div>
                                    </div>
                                    <div className="btn-forgot-pass">
                                        <button type="submit" className="btn-forgot-pass-submit">
                                            Send Login Link
                                        </button>
                                    </div>
                                    {
                                        state.errorMessage ? (
                                            <div className="err-message">
                                                <p aria-atomic="true" role="alert">{state.errorMessage}</p>
                                            </div>
                                        ) : (
                                            <div className="success-message">
                                                <p aria-atomic="true" role="alert">{state.successMessage}</p>
                                            </div>
                                        )
                                    }
                                    <div className="submit-bottom">
                                        <div className="break-line" />
                                        <div className="or-text">or</div>
                                        <div className="break-line" />
                                    </div>
                                    <div className="sign-up-link">
                                        <Link to="/register">Create New Account</Link>
                                    </div>
                                </form>
                                <div className="back-log-in">
                                    <div className="back-log-in-child">
                                        <Link to="/login">Back To Login</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthPageContainer>
        );
    }
}
