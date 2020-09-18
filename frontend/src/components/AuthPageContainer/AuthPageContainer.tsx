import React from 'react';
import { Footer } from '../Footer';
import styles from './AuthPageContainer.module.css';

export const AuthPageContainer = (props: any): JSX.Element => {
    const { children } = props;
    return (
        <div className={styles.container}>
            <div className={styles.main}>
                {children}
            </div>
            <Footer />
        </div>
    );
};
