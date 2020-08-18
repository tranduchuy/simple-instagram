import React from 'react';
import './style.css';
import {Footer} from '../../components/';
import {RouteComponentProps} from 'react-router-dom';
import * as API from '../../constants/api';
import axios, {AxiosResponse} from "axios";
import Cookies from "js-cookie";
import * as CookieNames from '../../constants/cookie';

interface LoginProps extends RouteComponentProps {

}

type LoginState = {
    email: string;
    password: string;
    errMessage: string
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
            errMessage: ''
        };
    }

    onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const {email, password} = this.state;
        const formData: LoginFormData = {
            email: email,
            password: password
        };

        axios.post<LoginResSuccess>(API.Login, formData)
            .then((res: AxiosResponse) => {
                this.saveCookieToken(res.data.token);
                this.props.history.push('/');
            })
            .catch(err => {
                if (err.response.data.message) {
                    this.setState({
                        errMessage: err.response.data.message
                    })
                } else {
                    alert(err);
                }
            })
    };

    saveCookieToken = (token: string) => {
        Cookies.set(CookieNames.Token, token, {expires: 1});
    };

    handleEmailInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            email: event.target.value
        });
    };

    handlePasswordInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            password: event.target.value
        });
    };

    render(): React.ReactElement {
        const {onSubmit, handleEmailInputChange, handlePasswordInputChange, state} = this;
        return (
            <div>
                <div className="main">
                    <div className="wrapper">
                        <div className="left-content">
                            <div className="slide-images">
                                <img className="list-img" src="https://www.instagram.com/static/images/homepage/screenshot2.jpg/2d9d7248af43.jpg" id="1" alt=""/>
                                <img className="list-img" src="../../images/backgroundSlide_2.jpg" id="2" alt=""/>
                                <img className="list-img" src="../../images/backgroundSlide_3.jpg" id="3" alt=""/>
                                <img className="list-img" src="../../images/backgroundSlide_4.jpg" id="4" alt=""/>
                                <img className="list-img" src="../../images/backgroundSlide_5.jpg" id="5" alt=""/>
                            </div>
                        </div>
                        <div className="right-content">
                            <div className="form-login">
                                <div className="logo"></div>
                                <div className="form-login-child">
                                    <form className="form-input" onSubmit={onSubmit}>
                                        <div className="form-input-child">
                                            <div className="mg-input">
                                                <div className="input-login">
                                                    <input aria-label="Phone number, username, or email"
                                                           placeholder="Phone number, username, or email"
                                                           name="username"
                                                           type="text" className="input-text" value={state.email}
                                                           onChange={handleEmailInputChange}/>
                                                </div>
                                            </div>
                                            <div className="mg-input">
                                                <div className="input-login">
                                                    <input placeholder="Password"
                                                           name="username"
                                                           type="password" className="input-text" value={state.password}
                                                           onChange={handlePasswordInputChange}/>
                                                </div>
                                            </div>
                                            <div className="btn-login">
                                                <button type="submit" className="btn-login-submit">Log in</button>
                                            </div>
                                            <div className="submit-bottom">
                                                <div className="break-line"></div>
                                                <div className="or-text">or</div>
                                                <div className="break-line"></div>
                                            </div>
                                            <div className="fb-login">
                                                <button type="button" className="fb-login-btn">
                                                    <span className="fb-logo"></span>
                                                    <span className="fb-login-text" >Login with Facebook</span>
                                                </button>
                                            </div>
                                            {
                                                state.errMessage ? (
                                                    <div className="err-message">
                                                        <p aria-atomic="true" role="alert">{state.errMessage}</p>
                                                    </div>
                                                ) : (<div></div>)
                                            }
                                            <a href="" className="forgot-pass">Forgot password?</a>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="form-login">
                                <div className="register-form">
                                    <p className="quest-sign-up">
                                        Don't have an account?
                                        <a href="/register">
                                            <span className="sign-up">Sign up</span>
                                        </a>
                                    </p>
                                </div>
                            </div>
                            <div className="get-app">
                                <p className="get-app-text">Get the app.</p>
                                <div className="app-logo">
                                    <a href="https://itunes.apple.com/app/instagram/id389801252?pt=428156&amp;ct=igweb.loginPage.badge&amp;mt=8&amp;vt=lo"
                                       target="_blank">
                                        <img alt="Available on the App Store"
                                             className="ios-logo "
                                             src="https://www.instagram.com/static/images/appstore-install-badges/badge_ios_english-en.png/4b70f6fae447.png"/>
                                    </a>
                                    <a href="https://play.google.com/store/apps/details?id=com.instagram.android&amp;referrer=utm_source%3Dinstagramweb%26utm_campaign%3DloginPage%26ig_mid%3D04F99221-4061-4F36-A4E0-DB770A8F1A31%26utm_content%3Dlo%26utm_medium%3Dbadge"
                                       target="_blank">
                                        <img alt="Available on Google Play"
                                             className="android-logo "
                                             src="https://www.instagram.com/static/images/appstore-install-badges/badge_android_english-en.png/e9cd846dc748.png"/>
                                    </a>
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