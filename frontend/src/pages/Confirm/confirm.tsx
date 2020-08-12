import React from 'react';
import {RouteComponentProps} from "react-router-dom";
import {Container, Alert, Col, Row, Form} from "react-bootstrap";
import axios, {AxiosResponse} from "axios";
import *as API from "../../constants/api";
import queryString from 'query-string';

interface ConfirmProps extends RouteComponentProps {

}

type ResponseMessage = {
    successMessage?: string;
    errorMessage?: string;
}

type ConfirmFormData = {
    tokenRegister: string;
};

type ConfirmResSuccess = {
    message: string;
};

export class Confirm extends React.Component<ConfirmProps, ResponseMessage> {
    constructor(props: ConfirmProps) {
        super(props);
        this.state = {
            successMessage: "",
            errorMessage: ""
        };
    }

    componentDidMount(): void {
        this.handleVerifyEmail();
    }

    handleVerifyEmail = () => {
        const value = queryString.parse(this.props.location.search);
        const query: string = value.tokenRegister as string;
        if(!query) {
            this.props.history.push('/');
        }

        const formData: ConfirmFormData = {
            tokenRegister: query
        };

        axios.post<ConfirmResSuccess, AxiosResponse<ConfirmResSuccess>>(API.Confirm, formData)
            .then((res) => {
                this.setState({
                    successMessage: res.data.message
                });
                setTimeout(() => this.props.history.push('/'), 2000)
            })
            .catch((err) => {
                if(err.response.data.message) {
                    this.setState({
                        errorMessage: err.response.data.message
                    });
                } else {
                    alert(err);
                }
            })

    };

    render(): React.ReactElement {
        return (
            <Container fluid={true}>
                <Form>
                    <Form.Row className="align-items-center">
                        <Col sm={{ offset: 4, span: "auto" }} >
                            {this.state.successMessage ? (
                                <Alert variant="success" className="mt-5">
                                    <p>{this.state.successMessage}</p>
                                </Alert>
                            ): (
                                <Alert variant="danger" className="mt-5">
                                    <p>{this.state.errorMessage}</p>
                                </Alert>
                            )}
                        </Col>
                    </Form.Row>
                </Form>
            </Container>
        );
    }
}