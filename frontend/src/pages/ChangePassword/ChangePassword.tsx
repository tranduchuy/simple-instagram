import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styles from './ChangePassword.module.scss';

type ChangePasswordProps = RouteComponentProps;

type ChangePasswordState = {
    password: string;
    confirmPassword: string;
    errorMessage: string;
};

type ChangePasswordFormData = {
    password: string;
    confirmPassword: string;
};

export class ChangePassword extends React.Component<ChangePasswordProps, ChangePasswordState> {
    render(): JSX.Element {
        return (
            <div className={styles.wrapper}>
                Wrapper
                <div className={styles.content}>
                    <div className={styles.header}>Header</div>
                    <div className={styles.main}>Main</div>
                </div>
                <div className={styles.footer}>Footer</div>
            </div>
        );
    }
}
