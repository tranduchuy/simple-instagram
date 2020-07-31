import React, {SyntheticEvent} from 'react';
import * as API from '../../constants/api';
import {Container, Row, Col, Form, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import axios, {AxiosResponse} from 'axios';

type RegisterProps = {};

type RegisterFormData = {
    userName: string,
    password: string,
    confirmPassword: string,
    name: string
};

type RegisterResSuccess = {
    message: string
};

type RegisterResError = {
    message: string
};

export default class Register extends React.Component<RegisterProps, any> {
    userNameInputRef = React.createRef<HTMLInputElement>();

    constructor(props: RegisterProps) {
        super(props);

    }

    onSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        console.log(event);
        const formData: RegisterFormData = {
            userName: event.currentTarget.elements.password.value,
            password: event.currentTarget.elements.password.value,
            confirmPassword: event.currentTarget.elements.confirmPassword.value,
            name: event.currentTarget.elements.name.value
        }

        axios.post<RegisterResSuccess, AxiosResponse<RegisterResSuccess | RegisterResError>>(API.Register, formData)
            .then((res) => {
                console.log(res);
            })
            .catch(err => {
                if(err.response.data.message) {
                    alert(err.response.data.message);
                } else {
                    alert(err);
                }
            })
    }

    onClickedReset = () => {
        this.userNameInputRef.value = '';
        this.passwordInputRef.current.value = '';
        this.confirmPassInputRef.current.value = '';
        this.nameInputRef.current.value = '';
    }
    render(): React.ReactElement {
        return (
            <Container fluid={true}>
                <Row>
                    <Col sm={{offset: 4, span: 4}}>
                        <h3 className="text-center mt-5">
                            Login
                        </h3>

                        <Form onSubmit={this.onSubmit}>
                            <Form.Group controlId="username">
                                <Form.Label>Username</Form.Label>

                                <Form.Control type="text"
                                              ref={this.userNameInputRef}
                                              placeholder="Enter username"/>

                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password"
                                              ref={this.passwordInputRef}
                                              placeholder="Password"/>
                            </Form.Group>

                            <Form.Group controlId="confirmPass">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password"
                                              ref={this.confirmPassInputRef}
                                              placeholder="Confirm Password"/>
                            </Form.Group>

                            <Form.Group controlId="name">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="text"
                                              ref={this.nameInputRef}
                                              placeholder="Name"/>
                            </Form.Group>

                            <div className="text-center">
                                <Button variant="secondary"
                                >
                                    Reset
                                </Button>

                                <Button variant="primary"
                                        className="ml-5"
                                        type="submit">
                                    Submit
                                </Button>
                            </div>

                            <div className="text-center">
                                <Link to="/Login">
                                    Go to login page.
                                </Link>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}