import React from 'react';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Container, Row, Col, Form, Button} from 'react-bootstrap';
import * as API from '../../constants/api';
import axios, {AxiosError, AxiosResponse} from "axios";
import Cookies from "js-cookie";
import * as CookieNames from '../../constants/cookie';

interface LoginProps extends RouteComponentProps {

}

type LoginState = {
    email: string;
    password: string;
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
            password: ''
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
                console.log(res);
                this.saveCookieToken(res.data.token);
                this.props.history.push('/');
            })
            .catch(err => {
                if (err.response.data.message) {
                    alert(err.response.data.message);
                } else {
                    alert(err);
                }
            })
    };

    onClickedReset = () => {
        this.setState({
            email: '',
            password: ''
        });
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
        const {onSubmit, onClickedReset, handleEmailInputChange, handlePasswordInputChange, state} = this;
        return (
            <Container fluid={true}>
                <Row>
                    <Col sm={{offset: 4, span: 4}}>
                        <h3 className="text-center mt-5">
                            Login
                        </h3>

                        <Form onSubmit={onSubmit}>
                            <Form.Group controlId="email">
                                <Form.Label>Email</Form.Label>

                                <Form.Control type="text"
                                              value={state.email}
                                              onChange={handleEmailInputChange}
                                              placeholder="Enter email"/>
                            </Form.Group>

                            <Form.Group controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password"
                                              value={state.password}
                                              onChange={handlePasswordInputChange}
                                              placeholder="Password"/>
                            </Form.Group>

                            <div className="text-center">
                                <Button variant="secondary"
                                        onClick={onClickedReset}>
                                    Reset
                                </Button>

                                <Button variant="primary"
                                        className="ml-5"
                                        type="submit">
                                    Submit
                                </Button>
                            </div>

                            <div className="text-center">
                                <Link to="/register">
                                    Go to register page.
                                </Link>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}