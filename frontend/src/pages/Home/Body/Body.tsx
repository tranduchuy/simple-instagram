import React from 'react';
import styles from './Body.module.scss';

export class Body extends React.Component<{ }, { }> {
    render(): JSX.Element {
        return (
            <div className={styles.wrap}>
                Body
            </div>
        );
    }
}
