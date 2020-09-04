import React from 'react';
import styles from './authPageContainer.module.css';
import { Footer } from '../footer';

export const AuthPageContainer = (props: any): JSX.Element => (
    <div className={styles.container}>
        <div className={styles.main}>
            {props.children}
        </div>
        <Footer />
    </div>
);
