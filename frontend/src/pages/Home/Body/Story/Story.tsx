import React from 'react';
import styles from './Story.module.scss';

const urlLogo = '/home-logo.png';
const urlCircleStory = '/circle-story.png';

export class Story extends React.Component<{ }, { }> {
    render(): JSX.Element {
        return (
            <div className={styles.wrapStory}>
                <div className={styles.story}>
                    <ul className={styles.ulStory}>
                        <li className={styles.liStory} style={{ transform: 'translateX(10px)' }}>
                            <div className={styles.wrapButton}>
                                <button className={styles.btn} type="button">
                                    <div className={styles.wrapImg}>
                                        <img src={urlCircleStory} alt="" className={styles.circleStory} />
                                        <img src={urlLogo} alt="" className={styles.urlImg} />
                                    </div>
                                    <div className={styles.storyName}>username</div>
                                </button>
                            </div>
                        </li>
                        <li className={styles.liStory} style={{ transform: 'translateX(90px)' }}>
                            <div className={styles.wrapButton}>
                                <button className={styles.btn} type="button">
                                    <div className={styles.wrapImg}>
                                        <img src={urlCircleStory} alt="" className={styles.circleStory} />
                                        <img src={urlLogo} alt="" className={styles.urlImg} />
                                    </div>
                                    <div className={styles.storyName}>username</div>
                                </button>
                            </div>
                        </li>
                        <li className={styles.liStory} style={{ transform: 'translateX(170px)' }}>
                            <div className={styles.wrapButton}>
                                <button className={styles.btn} type="button">
                                    <div className={styles.wrapImg}>
                                        <img src={urlCircleStory} alt="" className={styles.circleStory} />
                                        <img src={urlLogo} alt="" className={styles.urlImg} />
                                    </div>
                                    <div className={styles.storyName}>username</div>
                                </button>
                            </div>
                        </li>
                        <li className={styles.liStory} style={{ transform: 'translateX(250px)' }}>
                            <div className={styles.wrapButton}>
                                <button className={styles.btn} type="button">
                                    <div className={styles.wrapImg}>
                                        <img src={urlCircleStory} alt="" className={styles.circleStory} />
                                        <img src={urlLogo} alt="" className={styles.urlImg} />
                                    </div>
                                    <div className={styles.storyName}>username</div>
                                </button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}