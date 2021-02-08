import React from 'react';
import { Link } from 'react-router-dom';
import styles from './RightSide.module.scss';

const urlLogo = '/home-logo.png';

export class RightSideBar extends React.Component<{ }, { }> {
    render(): JSX.Element {
        return (
            <div className={styles.wrap}>
                <div className={styles.profile}>
                    <div className={styles.wrapImg}>
                        <Link to="/" className={styles.linkImg}>
                            <img src={urlLogo} alt="" className={styles.imgWi} />
                        </Link>
                    </div>
                    <div className={styles.wrapName}>
                        <div>
                            <Link to="/" className={styles.userName}>Username</Link>
                            <div className={styles.fullName}>Full Name</div>
                        </div>
                    </div>
                    <div className={styles.switchAcc}>
                        <button type="button" className={styles.switchButton}>
                            Switch
                        </button>
                    </div>
                </div>
                <div className={styles.wrapSuggestions}>
                    <div className={styles.suggestions}>
                        <div className={styles.suggestText}>Suggestions For You</div>
                        <Link to="/" className={styles.userName}>See All</Link>
                    </div>
                    <div className={styles.sProfile}>
                        <div className={styles.sWrapImg}>
                            <Link to="/" className={styles.sLinkImg}>
                                <img src={urlLogo} alt="" className={styles.imgWi} />
                            </Link>
                        </div>
                        <div className={styles.wrapName}>
                            <div>
                                <Link to="/" className={styles.userName}>Username</Link>
                                <div className={styles.sFullName}>Full Name</div>
                            </div>
                        </div>
                        <div className={styles.switchAcc}>
                            <button type="button" className={styles.switchButton}>
                                Follow
                            </button>
                        </div>
                    </div>
                </div>
                <div className={styles.DINPA}>
                    © 2020 Instagram from Facebook
                </div>
            </div>
        );
    }
}
