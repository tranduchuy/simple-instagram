import axios, { AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';
import React from 'react';
import * as API from '../../../constants/api';
import { Article } from './Article';
import styles from './Body.module.scss';
import { InputPost } from './InputPost';
import { Story } from './Story';

type GetListPostResSuccess = {
    listPost: ListPostData[];
    message: string;
}

type GetListPostResErr = {
    message: string;
}

type ListDataState = {
    listData: ListPostData[];
}

type ListPostData = {
    user: {
        name: string;
    };
    title: string;
    images: string[];
};

export class Body extends React.Component<{ }, ListDataState> {
    state = {
        listData: [],
    }

    componentDidMount(): void {
        this.handleGetListPost();
    }

    handleGetListPost = (): void => {
        const token: string | undefined = Cookies.get('token');
        const config: AxiosRequestConfig = {
            headers: {
                token,
            },
        };

        axios.get<GetListPostResSuccess | GetListPostResErr>(API.PostImg, config)
            .then((res) => {
                if (res.status === 200) {
                    const db = res.data as GetListPostResSuccess;
                    this.setState((state) => {
                        const listData = state.listData.concat(db.listPost);

                        return {
                            listData,
                        };
                    });
                } else {
                    const err = res.data as GetListPostResErr;
                    console.log(err.message);
                }
            });
    };

    render(): JSX.Element {
        const { listData } = this.state;
        return (
            <div className={styles.wrap}>
                <Story />
                <InputPost />
                {listData.map((l: ListPostData) => {
                    console.log(l.user);
                    return <Article key={Date.now()} user={l.user} title={l.title} images={l.images} />
                })}
            </div>
        );
    }
}
