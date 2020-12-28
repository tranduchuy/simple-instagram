import React from 'react';
import { Link } from 'react-router-dom';
import smallAvatar from '../../RightSideBar/RightSide.module.scss';
import styles from './InputPost.module.scss';

const urlLogo = '/home-logo.png';

type selectedImagesState = {
    selectedImages: string[];
    errorMessage: string;
}

export class InputPost extends React.Component<{ }, selectedImagesState> {
    state = {
        selectedImages: [],
        errorMessage: '',
    }

    inputFileRef: React.RefObject<HTMLInputElement> = React.createRef();

    handleBtnClick = (): void => {
        if (this.inputFileRef.current) {
            this.inputFileRef.current.click();
        }
    }

    loadPreviewImages = (file: File): Promise<string> => new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            if (reader.result) {
                resolve(reader.result.toString());
            }
        };
        reader.readAsDataURL(file);
    })

    handleSelectedFile = async (): Promise<void> => {
        if (!this.inputFileRef.current) {
            return;
        }

        const { files } = this.inputFileRef.current;
        if (!files || files.length === 0) {
            return;
        }

        if (files.length >= 9) {
            this.setState({ errorMessage: 'Chỉ được phép đăng 8 bức ảnh một lần' });
        } else {
            this.setState({ errorMessage: '' });
        }

        const imageStrings: string [] = [];
        await Promise.all(Array.from(files).map(async (file) => {
            const img = await this.loadPreviewImages(file);
            imageStrings.push(img);
        }));
        const file = this.inputFileRef.current?.files?.item(0) || null;
        if (file) {
            this.setState({ selectedImages: imageStrings });
        }
    }

    uploadFiles = (event: React.ChangeEvent<HTMLInputElement>): void => {

    }

    render(): JSX.Element {
        const { selectedImages, errorMessage } = this.state;
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
                {
                    errorMessage ? (
                        <div className={styles.errormessage}>
                            <p aria-atomic="true" role="alert">{errorMessage}</p>
                        </div>
                    ) : (
                        <div className={styles.wrapImgView}>
                            {
                                selectedImages.map((img) => (
                                    img ? (
                                        <div className={styles.imgView}>
                                            <img className={styles.viewSide} src={img} alt="" />
                                            <div className={styles.clearImg}>
                                                <i className={styles.btnClear} />
                                            </div>
                                        </div>
                                    ) : (<></>)
                                ))
                            }
                        </div>
                    )
                }
                <div className={styles.uploadImg}>
                    <button type="submit" className={styles.btnUpload}>Đăng</button>
                </div>
            </div>
        );
    }
}
