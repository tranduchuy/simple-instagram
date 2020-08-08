import React, {ChangeEvent} from 'react';
import * as API from '../../constants/api';
import {Container, Row, Col, Form, Button} from 'react-bootstrap';
import {Link, RouteComponentProps} from 'react-router-dom';
import axios, {AxiosResponse} from 'axios';

interface RegisterProps extends RouteComponentProps{

};

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
                alert(res.data.message);
                this.props.history.push('/');
            })
            .catch((err) => {
                if(err.response.data.message) {
                    alert(err.response.data.message);

                } else {
                    alert(err);
                }
            })
    };

    onClickedReset = () => {
        this.setState({
            email: '',
            password: '',
            confirmPassword: '',
            name: ''
        });
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
            onClickedReset,
            handleChangeEmailInput,
            handleChangePasswordInput,
            handleChangeConfirmPassInput,
            handleChangeNameInput,
            state,
        } = this;
        return (
            <Container fluid={true}>
                <Row>
                    <Col sm={{offset: 4, span: 4}}>
                        <h3 className="text-center mt-5">
                            Register
                        </h3>

                        <Form onSubmit={onSubmit}>
                            <Form.Group controlId="email">
                                <Form.Label>Email</Form.Label>

                                <Form.Control type="text"
                                              value={state.email}
                                              onChange={handleChangeEmailInput}
                                              placeholder="Enter Email"/>
                            </Form.Group>

                            <Form.Group controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password"
                                              value={state.password}
                                              onChange={handleChangePasswordInput}
                                              placeholder="Password"/>
                            </Form.Group>

                            <Form.Group controlId="confirmPass">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password"
                                              value={state.confirmPassword}
                                              onChange={handleChangeConfirmPassInput}
                                              placeholder="Confirm Password"/>
                            </Form.Group>

                            <Form.Group controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text"
                                              value={state.name}
                                              onChange={handleChangeNameInput}
                                              placeholder="Name"/>
                            </Form.Group>

                            <div className="text-center">
                                <Button variant="secondary"
                                        onClick={onClickedReset}>
                                    Reset
                                </Button>

                                <Button variant="primary"
                                        className="ml-5"
                                        type="submit">
                                    Register
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