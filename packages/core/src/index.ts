export * from './dtos';


export type Person = {
    username: string;
}

export const demo = (): Person => {
    return {
        username: 'huy@zmp.vn'
    }
}