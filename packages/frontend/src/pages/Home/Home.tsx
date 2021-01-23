import Cookies from 'js-cookie';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Body } from './Body';
import { Header } from './Header';
import styles from './Home.module.scss';
import { RightSideBar } from './RightSideBar';

type HomeProps = RouteComponentProps;

export class Home extends React.Component<HomeProps, {validToken: boolean}> {
    state = {
        validToken: false,
    }

    componentDidMount() {
        this.handleCheckToken();
    }

    handleCheckToken = (): void => {
        const Token: string | undefined = Cookies.get('token');
        if (!Token) {
            this.props.history.push('/login');
        } else {
            this.setState({
                validToken: true,
            });
        }
    }

    render(): JSX.Element {
        const { validToken } = this.state;
        return (
            <div>
                {
                    validToken && (
                        <>
                            <Header />
                            <div className={styles.content}>
                                <Body />
                                <RightSideBar />
                            </div>
                        </>
                    )
                }
            </div>
        );
    }
}
