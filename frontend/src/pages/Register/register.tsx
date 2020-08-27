import axios, { AxiosResponse } from 'axios';
import React, { ChangeEvent } from 'react';
import './register.css';
import { RouteComponentProps } from 'react-router-dom';
import { Footer } from '../../components/footer';
import * as API from '../../constants/api';

type RegisterProps = RouteComponentProps

type RegisterState = {
    email: string;
    password: string;
    confirmPassword: string;
    name: string;
    errMessage: string;
};

type RegisterFormData = {
    email: string;
    password: string;
    confirmPassword: string;
    name: string;
};

type RegisterResSuccess = {
    message: string;
};

type RegisterResError = {
    message: string;
};

export class Register extends React.Component<RegisterProps, RegisterState> {
    constructor(props: RegisterProps) {
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            name: '',
            errMessage: '',
        };
    }

    onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const {
            email, password, confirmPassword, name,
        } = this.state;
        const formData: RegisterFormData = {
            email,
            password,
            confirmPassword,
            name,
        };

        axios.post<RegisterResSuccess, AxiosResponse<RegisterResSuccess | RegisterResError>>(API.Register, formData)
            .then(() => {
                this.props.history.push('/');
            })
            .catch((err) => {
                if (err.response.data.message) {
                    this.setState({
                        errMessage: err.response.data.message,
                    });
                } else {
                    alert(err);
                }
            });
    };

    handleChangeEmailInput = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            email: event.target.value,
        });
    };

    handleChangePasswordInput = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            password: event.target.value,
        });
    };

    handleChangeConfirmPassInput = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            confirmPassword: event.target.value,
        });
    };

    handleChangeNameInput = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            name: event.target.value,
        });
    };

    render(): React.ReactElement {
        const {
            onSubmit,
            handleChangeEmailInput,
            handleChangePasswordInput,
            handleChangeConfirmPassInput,
            handleChangeNameInput,
            state,
        } = this;
        return (
            <div>
                <div className="main">
                    <div className="wrapper-sign-up">
                        <div className="right-content">
                            <div className="form-sign-up">
                                <div className="logo" />
                                <div className="form-sign-up-child">
                                    <form className="form-input" onSubmit={onSubmit}>
                                        <h2 className="description-sign-up">Sign up to see photos and videos from your friends.</h2>
                                        <div className="btn-sign-up">
                                            <button type="submit" className="btn-sign-up-submit">
                                                <span className="fb-logo-sign-up" />
                                                Login with Facebook
                                            </button>
                                        </div>
                                        <div className="submit-bottom">
                                            <div className="break-line" />
                                            <div className="or-text">or</div>
                                            <div className="break-line" />
                                        </div>
                                        <div>
                                            <div className="mg-input">
                                                <div className="input-sign-up">
                                                    <input
                                                        aria-label="Mobile number or email"
                                                        placeholder="Mobile number or email"
                                                        name="email"
                                                        type="text"
                                                        className="input-text"
                                                        value={state.email}
                                                        onChange={handleChangeEmailInput}
                                                    />
                                                </div>
                                            </div>
                                            <div className="mg-input">
                                                <div className="input-sign-up">
                                                    <input
                                                        placeholder="Full name"
                                                        name="fullname"
                                                        type="text"
                                                        className="input-text"
                                                        value={state.name}
                                                        onChange={handleChangeNameInput}
                                                    />
                                                </div>
                                            </div>
                                            <div className="mg-input">
                                                <div className="input-sign-up">
                                                    <input
                                                        placeholder="Username"
                                                        name="username"
                                                        type="text"
                                                        className="input-text"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mg-input">
                                                <div className="input-sign-up">
                                                    <input
                                                        placeholder="Password"
                                                        name="password"
                                                        type="password"
                                                        className="input-text"
                                                        value={state.password}
                                                        onChange={handleChangePasswordInput}
                                                    />
                                                </div>
                                            </div>
                                            <div className="mg-input">
                                                <div className="input-sign-up">
                                                    <input
                                                        placeholder="Confirm Password"
                                                        name="confirm password"
                                                        type="password"
                                                        className="input-text"
                                                        value={state.confirmPassword}
                                                        onChange={handleChangeConfirmPassInput}
                                                    />
                                                </div>
                                            </div>
                                            <div className="btn-sign-up">
                                                <button type="submit" className="btn-sign-up-submit">Sign up</button>
                                            </div>
                                            {
                                                state.errMessage ? (
                                                    <div className="err-message">
                                                        <p aria-atomic="true" role="alert">{state.errMessage}</p>
                                                    </div>
                                                ) : (<div />)
                                            }
                                            <p className="policy">
                                                By signing up, you agree to our
                                                {' '}
                                                <a href="https://help.instagram.com/581066165581870">Terms</a>
                                                ,
                                                {' '}
                                                <a href="https://help.instagram.com/519522125107875">Data Policy</a>
                                                {' '}
                                                and
                                                {' '}
                                                <a href="https://help.instagram.com/1896641480634370?ref=ig">Cookies Policy</a>
                                                {' '}
                                                .
                                            </p>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="form-login">
                                <div className="register-form">
                                    <p className="quest-log-in">
                                        Have an account?
                                        <a href="/login">
                                            <span className="log-in">Log in</span>
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}
