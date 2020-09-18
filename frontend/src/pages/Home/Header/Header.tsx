import React from 'react';
import {
    FaRegPaperPlane,
    FaRegHeart,
    FaRegCompass,
    FaHome,
    FaRegUserCircle,
    FaRegBookmark,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

const urlLogo = '/home-logo.png';

export class Header extends React.Component<{ }, { }> {
    render(): JSX.Element {
        return (
            <div className={styles.wrap}>
                <div className={styles.content}>
                    <div className={styles.logo}>
                        <Link to="/login">
                            <div className={styles.logoWrap}>
                                <img src={urlLogo} alt="" />
                            </div>
                        </Link>
                    </div>
                    <div className={styles.search}>
                        <input className={styles.inputSearch} type="text" placeholder="Search" />
                    </div>
                    <div className={styles.icons}>
                        <div className={styles.iconsFa}>
                            <div className={styles.fa}>
                                <Link to="/">
                                    <FaHome className={styles.faSize} />
                                </Link>
                            </div>
                            <div className={styles.fa}>
                                <Link to="/">
                                    <FaRegPaperPlane className={styles.faSize} />
                                </Link>
                            </div>
                            <div className={styles.fa}>
                                <Link to="/">
                                    <FaRegCompass className={styles.faSize} />
                                </Link>
                            </div>
                            <div className={styles.fa}>
                                <Link to="/">
                                    <FaRegHeart className={styles.faSize} />
                                </Link>
                            </div>
                            <div className={styles.fa}>
                                <div className={styles.avatar}>
                                    <img src={urlLogo} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
