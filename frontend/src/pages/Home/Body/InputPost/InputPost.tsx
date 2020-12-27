import React from 'react';
import { Link } from 'react-router-dom';
import smallAvatar from '../../RightSideBar/RightSide.module.scss';
import styles from './InputPost.module.scss';

const urlLogo = '/home-logo.png';
const background = '/kitty.jpg';

type selectedImagesState = {
    selectedImages: string[];
}

export class InputPost extends React.Component<{ }, selectedImagesState> {
    state = {
        selectedImages: [],
    }

    inputFileRef: React.RefObject<HTMLInputElement> = React.createRef();

    handleBtnClick = (): void => {
        if (this.inputFileRef.current) {
            this.inputFileRef.current.click();
        }
    }

    handleSelectedFile = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                this.setState({selectedImages: reader.result });

            }
        }
    }

    uploadFiles = (event: React.ChangeEvent<HTMLInputElement>): void => {
        event.preventDefault()
        console.log(this.state.file)
    }

    render(): JSX.Element {
        return (
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
                        <input
                            type="file"
                            className={styles.inputFile}
                            multiple
                            ref={this.inputFileRef}
                            onChange={this.handleSelectedFile}
                        />
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
                <div className={styles.wrapImgView}>
                    <div className={styles.imgView}>
                        <img className={styles.viewSide} src={background} alt="" />
                        <div className={styles.clearImg}>
                            <i className={styles.btnClear} />
                        </div>
                    </div>
                    <div className={styles.imgView} style={{ marginLeft: '10px' }}>
                        <img className={styles.viewSide} src={background} alt="" />
                    </div>
                </div>
                <div className={styles.uploadImg}>
                    <button type="submit" className={styles.btnUpload}>Đăng</button>
                </div>
            </div>
        );
    }
}
