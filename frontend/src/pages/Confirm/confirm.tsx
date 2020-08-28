import axios, { AxiosResponse } from 'axios';
import queryString from 'query-string';
import React from 'react';
import {
    Container, Alert, Col, Form,
} from 'react-bootstrap';
import { RouteComponentProps } from 'react-router-dom';
import * as API from '../../constants/api';

type ConfirmProps = RouteComponentProps

type ResponseMessageState = {
    successMessage?: string;
    errorMessage?: string;
}

type ConfirmFormData = {
    tokenRegister: string;
};

type ConfirmResSuccess = {
    message: string;
};

export class Confirm extends React.Component<ConfirmProps, ResponseMessageState> {
    state: ResponseMessageState = {
        successMessage: '',
        errorMessage: '',
    };

    componentDidMount(): void {
        this.handleVerifyEmail();
    }

    handleVerifyEmail = (): void => {
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
                    console.log(err);
                }
            });
    };

    render(): React.ReactElement {
        const { successMessage, errorMessage } = this.state;
        return (
            <Container fluid>
                <Form>
                    <Form.Row className="align-items-center">
                        <Col sm={{ offset: 4, span: 'auto' }}>
                            {successMessage ? (
                                <Alert variant="success" className="mt-5">
                                    <p>{successMessage}</p>
                                </Alert>
                            ) : (
                                <Alert variant="danger" className="mt-5">
                                    <p>{errorMessage}</p>
                                </Alert>
                            )}
                        </Col>
                    </Form.Row>
                </Form>
            </Container>
        );
    }
}
