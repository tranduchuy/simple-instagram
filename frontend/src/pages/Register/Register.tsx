import React from 'react';
import * as API from '../../constants/api';
import {Container, Row, Col, Form, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import axios, {AxiosResponse} from 'axios';

type RegisterProps = {};

type RegisterState = {
    email: string;
    password: string;
    confirmPassword: string;
    name: string;
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
            name: ''
        };
    }

    onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        const {email, password, confirmPassword, name} = this.state;
        event.preventDefault();
        console.log(email);
        const formData: RegisterFormData = {
            email: email,
            password: password,
            confirmPassword: confirmPassword,
            name: name
        }

        axios.post<RegisterResSuccess, AxiosResponse<RegisterResSuccess | RegisterResError>>(API.Register, formData)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
                // if(err.response.data.message) {
                //     alert(err.response.data.message);
                // } else {
                //     alert(err);
                // }
            })
    }

    onClickedReset = () => {
        this.setState({
            email: '',
            password: '',
            confirmPassword: '',
            name: ''
        });
    }
    render(): React.ReactElement {
        return (
            <Container fluid={true}>
                <Row>
                    <Col sm={{offset: 4, span: 4}}>
                        <h3 className="text-center mt-5">
                            Register
                        </h3>

                        <Form onSubmit={this.onSubmit}>
                            <Form.Group controlId="email">
                                <Form.Label>Email</Form.Label>

                                <Form.Control type="text"
                                              onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                                                  this.setState({
                                                      email: e.target.value
                                                  })
                                              }}
                                              placeholder="Enter Email"/>
                            </Form.Group>

                            <Form.Group controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password"
                                              onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                                                  this.setState({
                                                      password: e.target.value
                                                  })
                                              }}
                                              placeholder="Password"/>
                            </Form.Group>

                            <Form.Group controlId="confirmPass">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password"
                                              onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                                                  this.setState({
                                                      confirmPassword: e.target.value
                                                  })
                                              }}
                                              placeholder="Confirm Password"/>
                            </Form.Group>

                            <Form.Group controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text"
                                              onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                                                  this.setState({
                                                      name: e.target.value
                                                  })
                                              }}
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