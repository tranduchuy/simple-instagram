import React from 'react';
import './style.css';
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
                <div className="footer">
                    <div className="list-footer">
                        <nav className="list-footer-nav">
                            <ul className="list-footer-ul">
                                <li className="list-footer-li">
                                    <a href="https://about.instagram.com/"
                                       rel="nofollow noopener noreferrer"
                                       target="_blank">About</a>
                                </li>
                                <li className="list-footer-li">
                                    <a className="l93RR" href="https://help.instagram.com/">Help</a>
                                </li>
                                <li className="list-footer-li">
                                    <a className="l93RR" href="https://about.instagram.com/blog/">Press</a>
                                </li>
                                <li className="list-footer-li">
                                    <a className="l93RR" href="https://instagram.com/developer/">API</a>
                                </li>
                                <li className="list-footer-li">
                                    <a className="l93RR" href="https://instagram.com/about/jobs/">Jobs</a>
                                </li>
                                <li className="list-footer-li">
                                    <a className="l93RR" href="https://instagram.com/legal/privacy/">Privacy</a>
                                </li>
                                <li className="list-footer-li">
                                    <a className="l93RR _vfM2" href="https://instagram.com/legal/terms/">Terms</a>
                                </li>
                                <li className="list-footer-li">
                                    <a className="l93RR" href="https://instagram.com/explore/locations/">Locations</a>
                                </li>
                                <li className="list-footer-li">
                                    <a className="l93RR" href="https://instagram.com/directory/profiles/">Top Accounts</a>
                                </li>
                                <li className="list-footer-li">
                                    <a className="l93RR" href="https://instagram.com/directory/hashtags/">Hashtags</a>
                                </li>
                                <li className="list-footer-li">
                                    <span className="li-language">Language
                                        <select aria-label="Switch Display Language" className="switch-language">
                                            <option value="af">Afrikaans</option>
                                            <option value="cs">Čeština</option>
                                            <option value="da">Dansk</option>
                                            <option value="de">Deutsch</option>
                                            <option value="el">Ελληνικά</option>
                                            <option value="en">English</option>
                                            <option value="es">Español (España)</option>
                                            <option value="es-la">Español</option>
                                            <option value="fi">Suomi</option>
                                            <option value="fr">Français</option>
                                            <option value="id">Bahasa Indonesia</option>
                                            <option value="it">Italiano</option>
                                            <option value="ja">日本語</option>
                                            <option value="ko">한국어</option>
                                            <option value="ms">Bahasa Melayu</option>
                                            <option value="nb">Norsk</option>
                                            <option value="nl">Nederlands</option>
                                            <option value="pl">Polski</option>
                                            <option value="pt-br">Português (Brasil)</option>
                                            <option value="pt">Português (Portugal)</option>
                                            <option value="ru">Русский</option>
                                            <option value="sv">Svenska</option>
                                            <option value="th">ภาษาไทย</option>
                                            <option value="tl">Filipino</option>
                                            <option value="tr">Türkçe</option>
                                            <option value="zh-cn">中文(简体)</option>
                                            <option value="zh-tw">中文(台灣)</option>
                                            <option value="bn">বাংলা</option>
                                            <option value="gu">ગુજરાતી</option>
                                            <option value="hi">हिन्दी</option>
                                            <option value="hr">Hrvatski</option>
                                            <option value="hu">Magyar</option>
                                            <option value="kn">ಕನ್ನಡ</option>
                                            <option value="ml">മലയാളം</option>
                                            <option value="mr">मराठी</option>
                                            <option value="ne">नेपाली</option>
                                            <option value="pa">ਪੰਜਾਬੀ</option>
                                            <option value="si">සිංහල</option>
                                            <option value="sk">Slovenčina</option>
                                            <option value="ta">தமிழ்</option>
                                            <option value="te">తెలుగు</option>
                                            <option value="vi">Tiếng Việt</option>
                                            <option value="zh-hk">中文(香港)</option>
                                            <option value="bg">Български</option>
                                            <option value="fr-ca">Français (Canada)</option>
                                            <option value="ro">Română</option>
                                            <option value="sr">Српски</option>
                                            <option value="uk">Українська</option>
                                        </select>
                                    </span>
                                </li>
                            </ul>
                        </nav>
                        <span className="DINPA">© 2020 Instagram from Facebook</span></div>
                </div>
            </div>
        );
    }
}