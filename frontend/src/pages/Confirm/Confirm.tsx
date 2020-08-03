import React from 'react';
import {Link, RouteComponentProps} from "react-router-dom";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import axios, {AxiosResponse} from "axios";
import *as API from "../../constants/api";

interface ConfirmProps extends RouteComponentProps {

}

type ConfirmState = {
    tokenRegister: string;
};

type ConfirmFormData = {
    tokenRegister: string;
};

type ConfirmResSuccess = {
    message: string;
};

export class Confirm extends React.Component<ConfirmProps, any> {
    constructor(props: ConfirmProps) {
        super(props);
        this.state = {
            tokenRegister: ''
        }
    };

    onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const {tokenRegister} = this.state;
        const formData: ConfirmFormData = {
            tokenRegister: tokenRegister
        };

        axios.post<ConfirmResSuccess, AxiosResponse<ConfirmResSuccess>>(API.Confirm, formData)
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

    handleConfirmInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            tokenRegister: event.target.value
        })
    };

    render(): React.ReactElement {
        const {onSubmit, handleConfirmInputChange, state} = this;
        return (
            <Container fluid={true}>
                <Row>
                    <Col sm={{offset: 4, span: 4}}>

                        <div className="text-center mt-5">
                            <Form onSubmit={onSubmit}>
                                <Form.Row className="align-items-center">
                                    <Col sm={8} className="my-1">
                                        <Form.Label
                                            htmlFor="inlineFormInputName"
                                            srOnly>
                                            Name
                                        </Form.Label>
                                        <Form.Control
                                            id="inlineFormInputName"
                                            value={state.tokenRegister}
                                            onChange={handleConfirmInputChange}
                                            placeholder="Token Register"
                                        />
                                    </Col>

                                    <Col xs="auto" className="my-1">
                                        <Button type="submit">Send</Button>
                                    </Col>
                                </Form.Row>
                            </Form>
                        </div>

                        <div>
                            <Link to="/register" className="pr-4 pl-2">
                                Go to register page.
                            </Link>
                            <Link to="/Login">
                                Go to login page.
                            </Link>
                        </div>

                    </Col>
                </Row>
            </Container>
        );
    }
}