import React from 'react';
import styles from './RightSide.module.scss';

export class RightSideBar extends React.Component<{ }, { }> {
    render(): JSX.Element {
        return (
            <div className={styles.wrap}>
                Side bar
            </div>
        );
    }
}
