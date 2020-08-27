import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import React from 'react';
import './style.css';
import { RouteComponentProps } from 'react-router-dom';
import { Footer } from '../../components/footer';
import * as API from '../../constants/api';
import * as CookieNames from '../../constants/cookie';

type LoginProps = RouteComponentProps

type LoginState = {
    email: string;
    password: string;
    errMessage: string;
};

type LoginFormData = {
    email: string;
    password: string;
};

type LoginResSuccess = {
    message: string;
    token: string;
};

export class Login extends React.Component<LoginProps, LoginState> {
    constructor(props: LoginProps) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errMessage: '',
        };
    }

    onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { email, password } = this.state;
        const formData: LoginFormData = {
            email,
            password,
        };

        axios.post<LoginResSuccess>(API.Login, formData)
            .then((res: AxiosResponse) => {
                this.saveCookieToken(res.data.token);
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

    saveCookieToken = (token: string) => {
        Cookies.set(CookieNames.Token, token, { expires: 1 });
    };

    handleEmailInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            email: event.target.value,
        });
    };

    handlePasswordInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            password: event.target.value,
        });
    };

    render(): React.ReactElement {
        const {
            onSubmit, handleEmailInputChange, handlePasswordInputChange, state,
        } = this;
        return (
            <div>
                <div className="main">
                    <div className="wrapper">
                        <div className="left-content">
                            <div className="slide-images">
                                <img className="list-img" src="" id="1" alt="" />
                                <img className="list-img" src="../../images/backgroundSlide_2.jpg" id="2" alt="" />
                                <img className="list-img" src="../../images/backgroundSlide_3.jpg" id="3" alt="" />
                                <img className="list-img" src="../../images/backgroundSlide_4.jpg" id="4" alt="" />
                                <img className="list-img" src="../../images/backgroundSlide_5.jpg" id="5" alt="" />
                            </div>
                        </div>
                        <div className="right-content">
                            <div className="form-login">
                                <div className="logo" />
                                <div className="form-login-child">
                                    <form className="form-input" onSubmit={onSubmit}>
                                        <div className="form-input-child">
                                            <div className="mg-input">
                                                <div className="input-login">
                                                    <input
                                                        aria-label="Phone number, username, or email"
                                                        placeholder="Phone number, username, or email"
                                                        name="username"
                                                        type="text"
                                                        className="input-text"
                                                        value={state.email}
                                                        onChange={handleEmailInputChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="mg-input">
                                                <div className="input-login">
                                                    <input
                                                        placeholder="Password"
                                                        name="username"
                                                        type="password"
                                                        className="input-text"
                                                        value={state.password}
                                                        onChange={handlePasswordInputChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="btn-login">
                                                <button type="submit" className="btn-login-submit">Log in</button>
                                            </div>
                                            <div className="submit-bottom">
                                                <div className="break-line" />
                                                <div className="or-text">or</div>
                                                <div className="break-line" />
                                            </div>
                                            <div className="fb-login">
                                                <button type="button" className="fb-login-btn">
                                                    <span className="fb-logo" />
                                                    <span className="fb-login-text">Login with Facebook</span>
                                                </button>
                                            </div>
                                            {
                                                state.errMessage ? (
                                                    <div className="err-message">
                                                        <p aria-atomic="true" role="alert">{state.errMessage}</p>
                                                    </div>
                                                ) : (<div />)
                                            }
                                            <a href="/" className="forgot-pass">Forgot password?</a>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="form-login">
                                <div className="register-form">
                                    <p className="quest-sign-up">
                                        Don&apos;t have an account?
                                        <a href="/register">
                                            <span className="sign-up">Sign up</span>
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
