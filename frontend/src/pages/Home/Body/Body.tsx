import React from 'react';
import {
    FaRegPaperPlane,
    FaRegHeart,
    FaRegComment,
} from 'react-icons/fa';
import { GoKebabHorizontal } from 'react-icons/go';
import { VscBookmark } from 'react-icons/vsc';
import { Link } from 'react-router-dom';
import smallAvatar from '../RightSideBar/RightSide.module.scss';
import styles from './Body.module.scss';

const urlLogo = '/home-logo.png';
const urlCircleStory = '/circle-story.png';
const background = '/kitty.jpg';

export class Body extends React.Component<{ }, { }> {
   inputFileRef: React.RefObject<HTMLInputElement> = React.createRef();

    handleBtnClick = (): void => {
        this.inputFileRef.current.click();
    }

    render(): JSX.Element {
        return (
            <div className={styles.wrap}>
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
                <div className={styles.wrapInputPost}>
                    <div className={styles.createPost}>
                        <div className={smallAvatar.sWrapImg}>
                            <Link to="/" className={smallAvatar.sLinkImg}>
                                <img src={urlLogo} alt="" className={smallAvatar.imgWi} />
                            </Link>
                        </div>
                        <div className={styles.wInputPost}>
                            <input type="text" className={styles.inputPost} />
                        </div>
                        <div className={styles.inputLogoImg}>
                            <input type="file" className={styles.inputFile} multiple ref={this.inputFileRef} />
                            <div
                                role="button"
                                tabIndex={0}
                                className={styles.wrapLogoImg}
                                onClick={this.handleBtnClick}
                                onKeyUp={this.handleBtnClick}
                            >
                                <i className={styles.logoImg} />
                                <div className={styles.inputTextImg}>Thêm Ảnh/video</div>
                            </div>
                        </div>
                    </div>
                </div>
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
                                    <Link to="/" className={smallAvatar.userName}>Username</Link>
                                </div>
                            </div>
                        </div>
                        <div className={styles.optionals}>
                            <button className={styles.optBtn} type="button">
                                <GoKebabHorizontal />
                            </button>
                        </div>
                        <div className={styles.contentImg}>
                            <img src={background} alt="" className={smallAvatar.imgWi} />
                        </div>
                        <div className={styles.comments}>
                            <div className={styles.wrapIcon}>
                                <div className={styles.mgHeart}>
                                    <button type="button" className={styles.cmtIcon}>
                                        <FaRegHeart className={styles.iconSize} />
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
                                    <Link to="/" className={styles.username}>username</Link>
                                    &nbsp;
                                    <div className={styles.comment}>content aaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
                                </div>
                            </div>
                            <div className={styles.timeStamp}>
                                <Link to="/" className={styles.wrapTime}>
                                    <time className={styles.time}>time stamp</time>
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
            </div>
        );
    }
}
