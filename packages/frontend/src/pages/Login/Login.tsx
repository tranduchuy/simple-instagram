import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import React from 'react';
import './Login.css';
import { Link, RouteComponentProps } from 'react-router-dom';
import { AuthPageContainer } from '../../components/AuthPageContainer';
import * as API from '../../constants/api';
import * as CookieNames from '../../constants/cookie';

const url = '/backgroundSlide_1.jpg';

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

export type UserInfo = {
    _id: string;
    name: string;
    avatar: string;
};

type LoginResSuccess = {
    message: string;
    token: string;
    user: UserInfo;
};

export class Login extends React.Component<LoginProps, LoginState> {
    state = {
        email: '',
        password: '',
        errMessage: '',
    };

    componentDidMount(): void {
        this.handleCheckToken();
    }

    handleCheckToken = (): void => {
        const Token: string | undefined = Cookies.get('token');
        if (Token) {
            this.props.history.push('/');
        }
    }

    onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const { email, password } = this.state;
        const formData: LoginFormData = {
            email,
            password,
        };

        axios.post<LoginResSuccess>(API.Login, formData)
            .then((res: AxiosResponse) => {
                this.saveCookieToken(res.data.token, res.data.userInfo);
                this.props.history.push('/');
            })
            .catch((err) => {
                if (err.response.data.message) {
                    this.setState({
                        errMessage: err.response.data.message,
                    });
                }
                this.setState({
                    errMessage: 'Something error',
                });
            });
    };

    saveCookieToken = (token: string, user: UserInfo): void => {
        Cookies.set(CookieNames.Token, token, { expires: 1 });
        Cookies.set(CookieNames.UserInfo, user, { expires: 1 });
    };

    handleEmailInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({
            email: event.target.value,
        });
    };

    handlePasswordInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({
            password: event.target.value,
        });
    };

    render(): React.ReactElement {
        const {
            onSubmit,
            handleEmailInputChange,
            handlePasswordInputChange,
            state,
        } = this;
        return (
            <AuthPageContainer>
                <div className="wrapper">
                    <div className="left-content">
                        <div className="slide-images">
                            <img className="list-img" src={url} alt="" />
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
                                                    autoComplete="off"
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
                                                    autoComplete="off"
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
                                        {
                                            state.errMessage ? (
                                                <div className="err-message">
                                                    <p aria-atomic="true" role="alert">{state.errMessage}</p>
                                                </div>
                                            ) : (<></>)
                                        }
                                        <Link to="/forgot-password" className="forgot-pass">Forgot password?</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="form-login">
                            <div className="register-form">
                                <p className="quest-sign-up">
                                    Don&apos;t have an account?
                                    <Link to="/register">
                                        <span className="sign-up">Sign up</span>
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthPageContainer>
        );
    }
}
