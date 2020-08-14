import React, {ChangeEvent} from 'react';
import './register.css';
import * as API from '../../constants/api';
import {RouteComponentProps} from 'react-router-dom';
import axios, {AxiosResponse} from 'axios';

interface RegisterProps extends RouteComponentProps{

}

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
    message: string
};

type RegisterResError = {
    message: string
};

export class Register extends React.Component<RegisterProps, RegisterState> {
    constructor(props: RegisterProps) {
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            name: '',
            errMessage: ''
        };
    }

    onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const {email, password, confirmPassword, name} = this.state;
        const formData: RegisterFormData = {
            email: email,
            password: password,
            confirmPassword: confirmPassword,
            name: name
        };

        axios.post<RegisterResSuccess, AxiosResponse<RegisterResSuccess | RegisterResError>>(API.Register, formData)
            .then((res) => {
                this.props.history.push('/');
            })
            .catch((err) => {
                if(err.response.data.message) {
                    this.setState({
                        errMessage: err.response.data.message
                    })

                } else {
                    alert(err);
                }
            })
    };

    handleChangeEmailInput = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            email: event.target.value
        })
    };

    handleChangePasswordInput = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            password: event.target.value
        })
    };

    handleChangeConfirmPassInput = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            confirmPassword: event.target.value
        })
    };

    handleChangeNameInput = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            name: event.target.value
        })
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
                                <div className="logo"></div>
                                <div className="form-sign-up-child">
                                    <form className="form-input" onSubmit={onSubmit}>
                                        <h2 className="description-sign-up">Sign up to see photos and videos from your friends.</h2>
                                        <div className="btn-sign-up">
                                            <button type="submit" className="btn-sign-up-submit">
                                                <span className="fb-logo-sign-up"></span>
                                                Login with Facebook
                                            </button>
                                        </div>
                                        <div className="submit-bottom">
                                            <div className="break-line"></div>
                                            <div className="or-text">or</div>
                                            <div className="break-line"></div>
                                        </div>
                                        <div>
                                            <div className="mg-input">
                                                <div className="input-sign-up">
                                                    <input aria-label="Mobile number or email"
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
                                                    <input placeholder="Full name"
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
                                                    <input placeholder="Username"
                                                           name="username"
                                                           type="text"
                                                           className="input-text"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mg-input">
                                                <div className="input-sign-up">
                                                    <input placeholder="Password"
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
                                                    <input placeholder="Confirm Password"
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
                                                ) : (<div></div>)
                                            }
                                            <p className="policy">
                                                By signing up, you agree to our{" "}
                                                <a target="_blank" href="https://help.instagram.com/581066165581870">Terms</a>,{" "}
                                                <a target="_blank" href="https://help.instagram.com/519522125107875">Data Policy</a> and{" "}
                                                <a target="_blank" href="https://help.instagram.com/1896641480634370?ref=ig" >Cookies Policy</a> .
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
        )
    }
}