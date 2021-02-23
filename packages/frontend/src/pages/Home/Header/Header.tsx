import React from 'react';
import { ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import {
    FaRegHeart,
    FaHome,
    FaRegUserCircle,
    FaRegBookmark,

} from 'react-icons/fa';
import { RiSettings5Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { UserInfoContext } from '../../../context/userInfo.context';
import styles from './Header.module.scss';

const urlLogo = '/home-logo.png';

export class Header extends React.Component<{}, {}> {
    render(): JSX.Element {
        return (
            <UserInfoContext.Consumer>
                {
                    (value) => (
                        <div className={styles.wrap}>
                            <div className={styles.content}>
                                <div className={styles.logo}>
                                    <Link to="/">
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
                                        {/* <div className={styles.fa}>*/}
                                        {/*    <Link to="/">*/}
                                        {/*        <FaRegPaperPlane className={styles.faSize} />*/}
                                        {/*    </Link>*/}
                                        {/* </div>*/}
                                        {/* <div className={styles.fa}>*/}
                                        {/*    <Link to="/">*/}
                                        {/*        <FaRegCompass className={styles.faSize} />*/}
                                        {/*    </Link>*/}
                                        {/* </div>*/}
                                        <div className={styles.fa}>
                                            <Link to="/">
                                                <FaRegHeart className={styles.faSize} />
                                            </Link>
                                        </div>
                                        <div className={styles.fa} style={{ display: 'flex' }}>
                                            <div className={styles.avatar}>
                                                <img
                                                    src={value.info?.avatar || urlLogo}
                                                    alt=""
                                                    className={styles.avatarImg}
                                                />
                                            </div>
                                            <DropdownButton
                                                className={styles.btnAvatar}
                                                as={ButtonGroup}
                                                key="down"
                                                id="dropdown-button-drop-down"
                                                drop="down"
                                                variant="secondary"
                                                title=""
                                                alignRight
                                            >
                                                <Link to="/login" className={styles.dropdownItem}>
                                                    <FaRegUserCircle className={styles.subIcons} />
                                                    Profile
                                                </Link>
                                                <Link to="/" className={styles.dropdownItem}>
                                                    <FaRegBookmark className={styles.subIcons} />
                                                    Saved
                                                </Link>
                                                <Link to="/" className={styles.dropdownItem}>
                                                    <RiSettings5Line className={styles.subIcons} />
                                                    Setting
                                                </Link>
                                                <hr className={styles.hrLine} />
                                                <Dropdown.Item onClick={() => {
                                                    value.logout && value.logout();
                                                }}
                                                >
                                                    Log Out
                                                </Dropdown.Item>
                                            </DropdownButton>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </UserInfoContext.Consumer>
        );
    }
}
