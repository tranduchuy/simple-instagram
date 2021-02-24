import axios, { AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';
import React from 'react';
import { Link } from 'react-router-dom';
import * as API from '../../../../constants/api';
import smallAvatar from '../../RightSideBar/RightSide.module.scss';
import styles from './InputPost.module.scss';

const urlLogo = '/home-logo.png';

type PreviewFile = {
    file: File;
    imageContent: string;
    id: number;
}
type selectedImagesState = {
    selectedImages: PreviewFile[];
    title: string;
    errorMessage: string;
}

type UploadResSuccess = {
    message: string;
}

type UploadResErr = {
    message: string;
}

export class InputPost extends React.Component<{ }, selectedImagesState> {
    state = {
        selectedImages: [],
        title: '',
        errorMessage: '',
    }

    inputFileRef: React.RefObject<HTMLInputElement> = React.createRef();

    onSubmitUploadPost = (event: React.FormEvent<HTMLFormElement>): void => {
        const { selectedImages, title } = this.state;
        event.preventDefault();
        const token: string | undefined = Cookies.get('token');
        const formData = new FormData();
        selectedImages.forEach((file: PreviewFile) => {
            formData.append('images[]', file.file);
        });

        formData.append('title', title);

        const config: AxiosRequestConfig = {
            headers: {
                token,
            },
        };

        axios.post<UploadResSuccess | UploadResErr>(API.GetPostsUrl, formData, config)
            .then(() => {
                this.setState({
                    selectedImages: [],
                    title: '',
                });
            })
            .catch((err) => {
                if (err.response.data.message) {
                    this.setState({
                        errorMessage: err.response.data.message,
                    });
                }
                this.setState({
                    errorMessage: 'Something error',
                });
            });
    }

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

    handleOnSubmit = async (): Promise<void> => {
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

        const imageStrings: PreviewFile [] = [];
        await Promise.all(Array.from(files).map(async (file) => {
            const img = await this.loadPreviewImages(file);
            imageStrings.push({
                file,
                imageContent: img,
                id: Math.random() * 100,
            });
        }));

        this.setState({ selectedImages: imageStrings });
    }

    handleRemovePreImage = (item: number): void => {
        const arrImagesContent = [...this.state.selectedImages];
        const newArrImages = arrImagesContent.filter((img: PreviewFile) => img.id !== item);
        this.setState({ selectedImages: newArrImages });
    }

    handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({
            title: event.target.value,
        });
    }

    render(): JSX.Element {
        const { selectedImages, errorMessage, title } = this.state;
        const {
            handleRemovePreImage,
            handleInputChange,
            handleOnSubmit,
            onSubmitUploadPost,
            handleBtnClick,
            inputFileRef,
        } = this;
        return (
            <div className={styles.wrapInputPost}>
                <form action="" onSubmit={onSubmitUploadPost}>
                    <div className={styles.createPost}>
                        <div className={smallAvatar.sWrapImg}>
                            <Link to="/" className={smallAvatar.sLinkImg}>
                                <img src={urlLogo} alt="" className={smallAvatar.imgWi} />
                            </Link>
                        </div>
                        <div className={styles.wInputPost}>
                            <input
                                type="text"
                                className={styles.inputPost}
                                placeholder="Bạn đang nghĩ gì ?"
                                autoComplete="off"
                                name="title"
                                value={title}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className={styles.inputLogoImg}>
                            <input
                                type="file"
                                className={styles.inputFile}
                                multiple
                                ref={inputFileRef}
                                onChange={handleOnSubmit}
                            />
                            <div
                                role="button"
                                tabIndex={0}
                                className={styles.wrapLogoImg}
                                onClick={handleBtnClick}
                                onKeyPress={(e: React.KeyboardEvent): void => {
                                    if (e.keyCode === 13) {
                                        handleBtnClick();
                                    }
                                }}
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
                                    selectedImages.map((img: PreviewFile) => (
                                        img ? (
                                            <div className={styles.imgView} key={img.id}>
                                                <img
                                                    className={styles.viewSide}
                                                    src={img.imageContent}
                                                    alt=""
                                                />
                                                <div
                                                    className={styles.clearImg}
                                                    onClick={(): void => {
                                                        handleRemovePreImage(img.id);
                                                    }}
                                                    onKeyPress={(e: React.KeyboardEvent): void => {
                                                        if (e.keyCode === 13) {
                                                            handleRemovePreImage(img.id);
                                                        }
                                                    }}
                                                    role="button"
                                                    tabIndex={0}
                                                >
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
                        <button
                            type="submit"
                            disabled={selectedImages.length === 0 && title.trim() === ''}
                            className={styles.btnUpload}
                        >
                            Đăng
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}
