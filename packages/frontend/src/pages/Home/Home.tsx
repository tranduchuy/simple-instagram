import Cookies from 'js-cookie';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import * as CookieNames from '../../constants/cookie';
import { initUserInfo, UserInfoContext, UserInfoContextProps } from '../../context/userInfo.context';
import { Body } from './Body';
import { Header } from './Header';
import styles from './Home.module.scss';
import { RightSideBar } from './RightSideBar';

type HomeProps = RouteComponentProps;

type State = {
    validToken: boolean;
    userInfoContentValue: UserInfoContextProps;
}

export class Home extends React.Component<HomeProps, State> {
    state: State = {
        validToken: false,
        userInfoContentValue: initUserInfo,
    }

    componentDidMount() {
        this.handleCheckToken();
    }

    logout = (): void => {
        const { userInfoContentValue } = this.state;
        this.setState({
            userInfoContentValue: {
                ...userInfoContentValue,
                info: null,
            },
        }, () => {
            Cookies.remove(CookieNames.Token);
            this.props.history.push('/login');
        });
    }

    handleCheckToken = (): void => {
        const token: string | undefined = Cookies.get(CookieNames.Token);
        const userInfo: string | undefined = Cookies.get(CookieNames.UserInfo);

        if (!token) {
            this.props.history.push('/login');
        } else {
            // TODO call api check valid token
            this.setState({
                validToken: true,
                userInfoContentValue: {
                    info: JSON.parse(userInfo || ''),
                    logout: this.logout,
                },
            });
        }
    }

    render(): JSX.Element {
        const { validToken, userInfoContentValue } = this.state;
        return (
            <UserInfoContext.Provider value={userInfoContentValue}>
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
            </UserInfoContext.Provider>
        );
    }
}
