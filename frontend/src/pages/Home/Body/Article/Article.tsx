import axios from 'axios';
import Cookies from 'js-cookie';
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
import * as API from '../../../../constants/api';
import { timeAgo } from '../../../../utils/time';
import { UserInfo } from '../../../Login';
import smallAvatar from '../../RightSideBar/RightSide.module.scss';
import { PostData } from '../Body';
import styles from './Article.module.scss';

const urlLogo = '/home-logo.png';

type ArticleProps = PostData & {
   onFinishDeleting: () => void;
    onRefreshGetListPost: () => void;
};

type ArticleResSuccess = {
    message: string;
}

type ArticleResErr = {
    message: string;
}

type LikeFormData = {
    postId: string;
}

type GetListLikeResSuccess = {
    listLike: LikeData[];
    message: string;
}

type LikeData = {
    _id: string;
    user: {
        name: string;
        avatar: string;
    };
    createdAt: string;
}

type ArticleState = {
    like: boolean;
    countLike: number;
}

const token: string | undefined = Cookies.get('token');
const userInfo: string | undefined = Cookies.get('user_info');
let userObj: UserInfo;
if (userInfo) {
    userObj = JSON.parse(userInfo);
}
const config = {
    headers: {
        token,
    },
};

export class Article extends React.Component<ArticleProps, ArticleState> {
    state: ArticleState = {
        like: this.props.userIdLike.indexOf(userObj._id) !== -1, // replace by user id who logging in
        countLike: this.props.userIdLike.length,
    }

    onSubmitDeletePost = (): void => {
        const postId = this.props._id;

        axios.delete<ArticleResSuccess | ArticleResErr>(`${API.DeleteImg}/${postId}`, config)
            .then((res) => {
                if (res.status === 200) {
                    this.props.onFinishDeleting();
                } else {
                    alert(res.data.message);
                }
            });
    }

    confirmDeletingPost = (): void => {
        // eslint-disable-next-line no-restricted-globals
        const confirmMessage: boolean = confirm('Are you sure ?');
        if (confirmMessage) {
            this.onSubmitDeletePost();
        }
    }

    onClickLikePost = (): void => {
        const postId = this.props._id;
        const data: LikeFormData = {
            postId,
        };

        axios.post<ArticleResSuccess | ArticleResErr>(API.LikePost, data, config)
            .then((res) => {
                if (res.status === 200) {
                    this.props.onRefreshGetListPost();
                } else {
                    alert(res.data.message);
                }
            });
    }

    // onClickShowListLike = (): void => {
    //     axios.get<GetListLikeResSuccess | ArticleResErr>(API.LikePost, config)
    //         .then((res) => {
    //             console.log(res.data.message);
    //         });
    // }

    render(): JSX.Element {
        const {
            user,
            title,
            images,
            createdAt,
        } = this.props;
        const { confirmDeletingPost, onClickLikePost, state } = this;
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

                            <Dropdown.Item className={styles.btnDelete}>
                                Edit
                            </Dropdown.Item>
                            <hr className={styles.hrLine} />

                            <Dropdown.Item className={styles.btnDelete} onClick={confirmDeletingPost}>
                                Delete
                            </Dropdown.Item>
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
                                <button type="button" className={styles.cmtIcon} onClick={onClickLikePost}>
                                    {
                                        state.like
                                            ? (<FaHeart className={styles.iconSize} color="#ed5455" />)
                                            : (<FaRegHeart className={styles.iconSize} />)
                                    }
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
                            <button type="button" className={styles.btnLike}>
                                {state.countLike}
                                like
                            </button>
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
