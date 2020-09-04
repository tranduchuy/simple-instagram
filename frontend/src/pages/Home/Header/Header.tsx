import React from 'react';
import styles from './Header.module.scss';

export class Header extends React.Component<{ }, { }> {
    render(): JSX.Element {
        return (
            <div className={styles.wrap}>
                <div className={styles.content}>
                    Header
                </div>
            </div>
        );
    }
}
