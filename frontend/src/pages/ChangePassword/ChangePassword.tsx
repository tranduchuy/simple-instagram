import React from 'react';
import {
    Col, Container, Form, Button,
} from 'react-bootstrap';
import { Link, RouteComponentProps } from 'react-router-dom';
import styles from './ChangePassword.module.scss';

type ChangePasswordProps = RouteComponentProps;

type ChangePasswordState = {
    password: string;
    confirmPassword: string;
    errorMessage: string;
};

type ChangePasswordFormData = {
    password: string;
    confirmPassword: string;
};

type ChangePasswordResSuccess = {
    message: string;
};

export class ChangePassword extends React.Component<ChangePasswordProps, ChangePasswordState> {
    render(): JSX.Element {
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
                                    <Form>
                                        <Form.Row className="align-items-center">
                                            <Col sm={{ offset: 1, span: '7' }}>
                                                <Form.Group controlId="formBasicEmail">
                                                    <Form.Label>New password:</Form.Label>
                                                    <Form.Control
                                                        type="password"
                                                    />
                                                </Form.Group>
                                                <Form.Group controlId="formBasicPassword">
                                                    <Form.Label>New password confirmation:</Form.Label>
                                                    <Form.Control
                                                        type="password"
                                                    />
                                                </Form.Group>
                                                <Button variant="primary" type="submit">
                                                    Change Password
                                                </Button>
                                            </Col>
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
