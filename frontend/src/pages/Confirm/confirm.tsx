import axios, { AxiosResponse } from 'axios';
import queryString from 'query-string';
import React from 'react';
import {
    Container, Alert, Col, Form,
} from 'react-bootstrap';
import { RouteComponentProps } from 'react-router-dom';
import * as API from '../../constants/api';

type ConfirmProps = RouteComponentProps

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
            successMessage: '',
            errorMessage: '',
        };
    }

    componentDidMount(): void {
        this.handleVerifyEmail();
    }

    handleVerifyEmail = () => {
        const value = queryString.parse(this.props.location.search);
        const query: string = value.tokenRegister as string;
        if (!query) {
            this.props.history.push('/');
        }

        const formData: ConfirmFormData = {
            tokenRegister: query,
        };

        axios.post<ConfirmResSuccess, AxiosResponse<ConfirmResSuccess>>(API.Confirm, formData)
            .then((res) => {
                this.setState({
                    successMessage: res.data.message,
                });
                setTimeout(() => this.props.history.push('/'), 2000);
            })
            .catch((err) => {
                if (err.response.data.message) {
                    this.setState({
                        errorMessage: err.response.data.message,
                    });
                } else {
                    alert(err);
                }
            });
    };

    render(): React.ReactElement {
        return (
            <Container fluid>
                <Form>
                    <Form.Row className="align-items-center">
                        <Col sm={{ offset: 4, span: 'auto' }}>
                            {this.state.successMessage ? (
                                <Alert variant="success" className="mt-5">
                                    <p>{this.state.successMessage}</p>
                                </Alert>
                            ) : (
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
