import React from 'react';
import { RightSideBar } from './RightSideBar';
import { Header } from './Header';
import { Body } from './Body';
import styles from './Home.module.scss';

export class Home extends React.Component<{}, {}> {
    render(): JSX.Element {
        return (
            <div>
                <Header/>
                <div className={styles.content}>
                    <Body/>
                    <RightSideBar/>
                </div>
            </div>
        );
    }
}
