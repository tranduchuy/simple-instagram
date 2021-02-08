import axios, { AxiosResponse } from 'axios';
import queryString from 'query-string';
import React, { ChangeEvent } from 'react';
import {
    Col, Container, Form, Button, Alert,
} from 'react-bootstrap';
import { Link, RouteComponentProps } from 'react-router-dom';
import * as API from '../../constants/api';
import styles from './ResetPassword.module.scss';

type ResetPasswordProps = RouteComponentProps;

type ResetPasswordState = {
    password: string;
    confirmPassword: string;
    errorMessage: string;
    errorTokenMessage: string;
};

type ResetPasswordFormData = {
    forgotPasswordToken: string;
    password: string;
    confirmPassword: string;
};

type ResetPasswordResSuccess = {
    message: string;
};

export class ResetPassword extends React.Component<ResetPasswordProps, ResetPasswordState> {
    state: ResetPasswordState = {
        password: '',
        confirmPassword: '',
        errorMessage: '',
        errorTokenMessage: '',
    };

    componentDidMount(): void {
        this.handleCheckToken();
    }

    handleCheckToken = (): void => {
        const value = queryString.parse(this.props.location.search);
        const query: string = value.forgotPasswordToken as string;

        const formDataCheckToken: object = {
            forgotPasswordToken: query,
        };

        axios.post<ResetPasswordResSuccess, AxiosResponse<ResetPasswordResSuccess>>(API.ResetPass, formDataCheckToken)
            .catch((err) => {
                if (err.response.data.message) {
                    this.setState({
                        errorTokenMessage: err.response.data.message,
                    });
                }
            });
    };

    onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const { password, confirmPassword } = this.state;
        const value = queryString.parse(this.props.location.search);

        const formData: ResetPasswordFormData = {
            forgotPasswordToken: value.forgotPasswordToken as string,
            password,
            confirmPassword,
        };

        axios.post<ResetPasswordResSuccess, AxiosResponse<ResetPasswordResSuccess>>(API.ResetPass, formData)
            .then(() => {
                setTimeout(() => this.props.history.push('/login'), 1000);
            })
            .catch((err) => {
                if (err.response.data.message) {
                    this.setState({
                        errorMessage: err.response.data.message,
                    });
                }
            });
    };

    handleInputChange = (key: keyof ResetPasswordState, value: string): void => {
        this.setState((prevState) => ({
            ...prevState,
            [key]: value,
        }));
    };

    render(): JSX.Element {
        const {
            state,
            onSubmit,
            handleInputChange,
        } = this;
        const hasError = !!(state.errorTokenMessage || state.errorMessage);
        const showContent = (
            <>
                {
                    hasError && (
                        <Col sm={{ offset: 1, span: '7' }}>
                            <Alert variant="danger">
                                <p className="mb-0">{state.errorTokenMessage || state.errorMessage}</p>
                            </Alert>
                        </Col>
                    )
                }

                {
                    !state.errorTokenMessage && (
                        <Col sm={{ offset: 1, span: '7' }}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>New password:</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={state.password}
                                    onChange={(event: ChangeEvent<HTMLInputElement>): void => {
                                        handleInputChange('password', event.currentTarget.value);
                                    }}
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>New password confirmation:</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={state.confirmPassword}
                                    onChange={(event: ChangeEvent<HTMLInputElement>): void => {
                                        handleInputChange('confirmPassword', event.currentTarget.value);
                                    }}
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Change Password
                            </Button>
                        </Col>
                    )
                }
            </>
        );

        return (
            <div className={styles.pageBody}>
                <div className={styles.content}>
                    <div className={styles.topBar}>
                        <div className={styles.logo}>
                            <Link className={styles.link} to="/">Instagram</Link>
                        </div>
                    </div>
                    <div className={styles.main}>
                        <div className={styles.wrapper}>
                            <div className={styles.sidebar} />
                            <div className={styles.mainContent}>
                                <Container fluid>
                                    <Form onSubmit={onSubmit}>
                                        <Form.Row className="align-items-center">
                                            {showContent}
                                        </Form.Row>
                                    </Form>
                                </Container>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.footer}>
                    <div className={styles.pageFooter}>
                        <ul className="-cx-PRIVATE-Footer__navItems -cx-PRIVATE-Footer__navItems__">
                            <li>
                                <a href="https://www.instagram.com/about/us/">About us</a>
                            </li>
                            <li>
                                <a href="https://help.instagram.com/">Support</a>
                            </li>
                            <li>
                                <a href="https://about.instagram.com/blog/">Press</a>
                            </li>
                            <li>
                                <a href="https://www.instagram.com/developer/">API</a>
                            </li>
                            <li>
                                <a href="https://www.instagram.com/about/jobs/">Jobs</a>
                            </li>
                            <li>
                                <a href="https://www.instagram.com/legal/privacy/">Privacy</a>
                            </li>
                            <li>
                                <a href="https://www.instagram.com/legal/terms/">Terms</a>
                            </li>
                        </ul>
                        <p className={styles.copyright}>© 2020 Instagram</p>
                    </div>
                </div>
            </div>
        );
    }
}
