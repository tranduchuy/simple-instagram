import React from 'react';
import { Body } from './Body';
import { Header } from './Header';
import styles from './Home.module.scss';
import { RightSideBar } from './RightSideBar';

export class Home extends React.Component<{}, {}> {
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
