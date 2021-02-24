export const PASSWORD_LENGTH = 6;
export const IMAGE_JPG_TYPES = 'image/jpeg';
export const IMAGE_PNG_TYPES = 'image/png';

type SystemConfigVars = {
    rootPath: string;
};

export const SystemConfig: SystemConfigVars = {
    rootPath: '',
};

export enum GetCommentType {
    Post = 'POST',
    Comment = 'COMMENT',
}
