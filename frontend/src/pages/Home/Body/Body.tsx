import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import React from 'react';
import * as API from '../../../constants/api';
import * as Token from '../../../constants/cookie';
import { Article } from './Article';
import styles from './Body.module.scss';
import { InputPost } from './InputPost';
import { Story } from './Story';

type GetListPostResSuccess = {
    message: string;
}

type GetListPostResErr = {
    message: string;
}

type ListPostState = {
    title: string;
    images: string[];
};

export class Body extends React.Component<{ }, ListPostState> {
    state = {
        title: '',
        images: [],
    }

    componentDidMount(): void {
        this.handleGetListPost();
    }

    handleGetListPost = (): void => {
        const token: string | undefined = Token.CheckToken;
        const config: AxiosRequestConfig = {
            headers: {
                token,
            },
        };

        axios.get<GetListPostResSuccess, AxiosResponse<GetListPostResSuccess | GetListPostResErr>>(API.PostImg, config)
            .then((res) => {
                console.log(res);
            });
    };

    render(): JSX.Element {
        return (
            <div className={styles.wrap}>
                <Story />
                <InputPost />
                <Article />
            </div>
        );
    }
}
