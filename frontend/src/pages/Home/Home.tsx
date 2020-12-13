import Cookies from 'js-cookie';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Body } from './Body';
import { Header } from './Header';
import styles from './Home.module.scss';
import { RightSideBar } from './RightSideBar';

type LoginProps = RouteComponentProps;

export class Home extends React.Component<LoginProps, {}> {
    componentDidMount(): void {
        this.handleCheckToken();
    }

    handleCheckToken = (): void => {
        const Token: string | undefined = Cookies.get('token');
        if (!Token) {
            this.props.history.push('/login');
        }
    }

    render(): JSX.Element {
        return (
            <div>
                <Header />
                <div className={styles.content}>
                    <Body />
                    <RightSideBar />
                </div>
            </div>
        );
    }
}
