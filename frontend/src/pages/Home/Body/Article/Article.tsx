import React from 'react';
import {
    ButtonGroup, Carousel, Dropdown, DropdownButton,
} from 'react-bootstrap';
import {
    FaRegPaperPlane,
    FaRegHeart,
    FaRegComment,
    FaHeart,
    FaRegUserCircle,
    FaRegBookmark,
} from 'react-icons/fa';
import { GoKebabHorizontal } from 'react-icons/go';
import { VscBookmark } from 'react-icons/vsc';
import { Link } from 'react-router-dom';
import { timeAgo } from '../../../../utils/time';
import smallAvatar from '../../RightSideBar/RightSide.module.scss';
import { ListPostData } from '../Body';
import styles from './Article.module.scss';

const urlLogo = '/home-logo.png';

type ListPostProps = ListPostData;

export class Article extends React.Component<ListPostProps, { }> {
    render(): JSX.Element {
        const {
            user,
            title,
            images,
            createdAt,
        } = this.props;
        const newDateData: number = new Date(createdAt).getTime();
        const listImages = Array.from(images);
        return (
            <div className={styles.article}>
                <div className={styles.post}>
                    <div className={styles.header}>
                        <div className={smallAvatar.sWrapImg} style={{ marginRight: '14px' }}>
                            <Link to="/" className={smallAvatar.sLinkImg}>
                                <img src={urlLogo} alt="" className={smallAvatar.imgWi} />
                            </Link>
                        </div>
                        <div className={smallAvatar.wrapName}>
                            <div>
                                <Link to="/" className={smallAvatar.userName}>{user.name}</Link>
                            </div>
                        </div>
                    </div>
                    <div className={styles.optionals}>
                        <button className={styles.optBtn} type="button">
                            <GoKebabHorizontal />
                        </button>
                        <DropdownButton
                            as={ButtonGroup}
                            className={styles.btnDeleteAndEdit}
                            key="down"
                            id="dropdown-button-drop-down"
                            drop="down"
                            variant=""
                            title=""
                            alignRight
                        >
                            <Link to="/login" className={styles.btnDelete}>
                                <Dropdown>
                                    Edit
                                </Dropdown>
                            </Link>
                            <hr className={styles.hrLine} />
                            <Link to="/" className={styles.btnDelete}>
                                <Dropdown>
                                    Delete
                                </Dropdown>
                            </Link>
                        </DropdownButton>
                    </div>
                    <div className={styles.contentImg}>
                        {
                            listImages.length > 1 && (
                                <Carousel className={styles.carousel} interval={null}>
                                    {
                                        listImages.map((img) => (
                                            <Carousel.Item className={styles.carouselItem} key={img}>
                                                <img src={`${process.env.REACT_APP_API_URL}/${img}`} alt="" className={smallAvatar.imgWi} />
                                            </Carousel.Item>
                                        ))
                                    }
                                </Carousel>
                            )
                        }

                        {
                            listImages.length === 1
                            && <img src={`${process.env.REACT_APP_API_URL}/${listImages[0]}`} alt="" className={smallAvatar.imgWi} />
                        }
                    </div>
                    <div className={styles.comments}>
                        <div className={styles.wrapIcon}>
                            <div className={styles.mgHeart}>
                                <button type="button" className={styles.cmtIcon}>
                                    <FaHeart className={styles.iconSize} color="#ed5455" />
                                </button>
                            </div>
                            <button type="button" className={styles.cmtIcon}>
                                <FaRegComment className={styles.iconSize} />
                            </button>
                            <button type="button" className={styles.cmtIcon}>
                                <FaRegPaperPlane className={styles.iconSize} />
                            </button>
                            <div className={styles.bookmark}>
                                <button type="button" className={styles.cmtIcon}>
                                    <VscBookmark className={styles.iconSize} />
                                </button>
                            </div>
                        </div>
                        <div className={styles.countLike}>
                            <button type="button" className={styles.btnLike}>like</button>
                        </div>
                        <div className={styles.wrapComment}>
                            <div className={styles.mgCmt}>
                                <Link to="/" className={styles.username}>{user.name}</Link>
                                &nbsp;
                                <div className={styles.comment}>{title}</div>
                            </div>
                        </div>
                        <div className={styles.timeStamp}>
                            <Link to="/" className={styles.wrapTime}>
                                <time className={styles.time}>{timeAgo(newDateData)}</time>
                            </Link>
                        </div>
                        <div className={styles.wrapInput}>
                            <form className={styles.inputText} action="" method="POST">
                                <textarea className={styles.textArea} placeholder="Add a comment..." />
                                <button type="submit" className={styles.btnPost}>Post</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
