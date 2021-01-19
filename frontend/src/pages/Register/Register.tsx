import axios, { AxiosResponse } from 'axios';
import React, { ChangeEvent } from 'react';
import './Register.css';
import { Link, RouteComponentProps } from 'react-router-dom';
import { AuthPageContainer } from '../../components/AuthPageContainer';
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
    state = {
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        errMessage: '',
    };

    onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
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
                }
                this.setState({
                    errMessage: 'Something error',
                });
            });
    };

    handleInputChange = (key: keyof RegisterState, value: string): void => {
        this.setState((prevState) => ({
            ...prevState,
            [key]: value,
        }));
    };

    render(): React.ReactElement {
        const {
            onSubmit,
            handleInputChange,
            state,
        } = this;
        return (
            <AuthPageContainer>
                <div className="wrapper-sign-up">
                    <div className="right-content">
                        <div className="form-sign-up">
                            <div className="logo" />
                            <div className="form-sign-up-child">
                                <form className="form-input" onSubmit={onSubmit}>
                                    <h2 className="description-sign-up">Sign up to see photos and videos from your friends.</h2>
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
                                                    autoComplete="off"
                                                    value={state.email}
                                                    onChange={
                                                        (event: ChangeEvent<HTMLInputElement>): void => {
                                                            handleInputChange('email', event.currentTarget.value);
                                                        }
                                                    }
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
                                                    autoComplete="off"
                                                    value={state.name}
                                                    onChange={
                                                        (event: ChangeEvent<HTMLInputElement>): void => {
                                                            handleInputChange('name', event.currentTarget.value);
                                                        }
                                                    }
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
                                                    autoComplete="off"
                                                    value={state.password}
                                                    onChange={
                                                        (event: ChangeEvent<HTMLInputElement>): void => {
                                                            handleInputChange('password', event.currentTarget.value);
                                                        }
                                                    }
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
                                                    autoComplete="off"
                                                    value={state.confirmPassword}
                                                    onChange={
                                                        (event: ChangeEvent<HTMLInputElement>): void => {
                                                            handleInputChange('confirmPassword', event.currentTarget.value);
                                                        }
                                                    }
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
                                            ) : (<></>)
                                        }
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="form-login">
                            <div className="register-form">
                                <p className="quest-log-in">
                                    Have an account?
                                    <Link to="/login">
                                        <span className="log-in">Log in</span>
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
