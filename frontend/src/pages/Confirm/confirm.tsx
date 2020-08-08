import React from 'react';
import {Link, RouteComponentProps} from "react-router-dom";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import axios, {AxiosResponse} from "axios";
import *as API from "../../constants/api";
import queryString from 'query-string';

interface ConfirmProps extends RouteComponentProps {

}

type ConfirmFormData = {
    tokenRegister: string;
};

type ConfirmResSuccess = {
    message: string;
};

export class Confirm extends React.Component<ConfirmProps, any> {
    constructor(props: ConfirmProps) {
        super(props);
    };

    onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const value = queryString.parse(this.props.location.search);
        const query: string = value.tokenRegister as string;

        const formData: ConfirmFormData = {
            tokenRegister: query
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

    render(): React.ReactElement {
        return (
            <Container fluid={true}>
                <Row>
                    <Col sm={{offset: 4, span: 4}}>

                        <div className="text-center mt-5">
                            <Form onSubmit={this.onSubmit}>
                                <Form.Row className="align-items-center text">
                                    <Col xs="auto" className="my-1">
                                        <Button type="submit">Confirm</Button>
                                    </Col>
                                </Form.Row>
                            </Form>
                        </div>

                        <div>
                            <Link to="/register" className="pr-4 text-decoration-none">
                                Go to register page.
                            </Link>
                            <Link to="/Login" className="text-decoration-none">
                                Go to login page.
                            </Link>
                        </div>

                    </Col>
                </Row>
            </Container>
        );
    }
}