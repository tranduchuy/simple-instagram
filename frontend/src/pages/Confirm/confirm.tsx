import React from 'react';
import {RouteComponentProps} from "react-router-dom";
import {Container} from "react-bootstrap";
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

    componentDidMount(): void {
        this.handleVerifyEmail();
    }

    handleVerifyEmail = () => {
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
            </Container>
        );
    }
}