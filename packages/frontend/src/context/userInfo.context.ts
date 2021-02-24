import React from 'react';
import { UserInfo } from '../pages/Login';

export type UserInfoContextProps = {
    info: UserInfo | null;
    update?(value: UserInfo): void;
    logout?(): void;
}

export const initUserInfo: UserInfoContextProps = {
    info: null,
};

export const UserInfoContext = React.createContext<UserInfoContextProps>(initUserInfo);
