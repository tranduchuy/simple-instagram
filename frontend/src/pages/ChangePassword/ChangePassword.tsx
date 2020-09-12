import axios, { AxiosResponse } from 'axios';
import queryString from 'query-string';
import React from 'react';
import {
    Col, Container, Form, Button, Alert,
} from 'react-bootstrap';
import { Link, RouteComponentProps } from 'react-router-dom';
import * as API from '../../constants/api';
import styles from './ChangePassword.module.scss';

type ChangePasswordProps = RouteComponentProps;

type ChangePasswordState = {
    password: string;
    confirmPassword: string;
    errorMessage: string;
    errorTokenMessage: string;
};

type ChangePasswordFormData = {
    forgotPasswordToken: string;
    password: string;
    confirmPassword: string;
};

type ChangePasswordResSuccess = {
    message: string;
};

export class ChangePassword extends React.Component<ChangePasswordProps, ChangePasswordState> {
    state: ChangePasswordState = {
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

        axios.post<ChangePasswordResSuccess, AxiosResponse<ChangePasswordResSuccess>>(API.ChangePass, formDataCheckToken)
            .then()
            .catch((err) => {
                if (err.response.data.message) {
                    this.setState({
                        errorTokenMessage: err.response.data.message,
                    });
                }
            });
    };

    onSubmit = (event: React.FormEvent<HTMLInputElement>): void => {
        event.preventDefault();
        const { password, confirmPassword } = this.state;
        const value = queryString.parse(this.props.location.search);
        const query: string = value.forgotPasswordToken as string;

        const formData: ChangePasswordFormData = {
            forgotPasswordToken: query,
            password,
            confirmPassword,
        };

        if (password.length < 6) {
            this.setState({
                errorMessage: 'Create a password at least 6 characters long.',
            });
            return;
        }

        axios.post<ChangePasswordResSuccess, AxiosResponse<ChangePasswordResSuccess>>(API.ChangePass, formData)
            .then(() => {
                setTimeout(() => this.props.history.push('/'), 1000);
            })
            .catch((err) => {
                if (err.response.data.message) {
                    this.setState({
                        errorMessage: err.response.data.message,
                    });
                }
            });
    }

    handlePasswordInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({
            password: event.target.value,
        });
    };

    handleConfirmPasswordInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({
            confirmPassword: event.target.value,
        });
    };

    render(): JSX.Element {
        const {
            state,
            onSubmit,
            handlePasswordInputChange,
            handleConfirmPasswordInputChange,
        } = this;
        const showContentInput = (
            <Col sm={{ offset: 1, span: '7' }}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>New password:</Form.Label>
                    <Form.Control
                        type="password"
                        value={state.password}
                        onChange={handlePasswordInputChange}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>New password confirmation:</Form.Label>
                    <Form.Control
                        type="password"
                        value={state.confirmPassword}
                        onChange={handleConfirmPasswordInputChange}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Change Password
                </Button>
            </Col>
        );
        let showContent;
        if (state.errorTokenMessage) {
            showContent = (
                <Col sm={{ offset: 1, span: '7' }}>
                    <Alert variant="danger">
                        <p className="mb-0">{state.errorTokenMessage}</p>
                    </Alert>
                </Col>
            );
        } else if (state.errorMessage) {
            showContent = (
                <>
                    <Col sm={{ offset: 1, span: '7' }}>
                        <Alert variant="danger">
                            <p className="mb-0">{state.errorMessage}</p>
                        </Alert>
                    </Col>
                    {showContentInput}
                </>
            );
        } else {
            showContent = showContentInput;
        }
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
