import React from 'react';
import { Article } from './Article';
import styles from './Body.module.scss';
import { InputPost } from './InputPost';
import { Story } from './Story';

export class Body extends React.Component<{ }, { }> {
    render(): JSX.Element {
        return (
            <div className={styles.wrap}>
                <Story />
                <InputPost />
                <Article />
            </div>
        );
    }
}
