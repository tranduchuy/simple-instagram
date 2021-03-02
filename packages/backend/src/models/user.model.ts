import {
    createSchema, ExtractDoc, ExtractProps, Type, typedModel,
} from 'ts-mongoose';

export const UserSchema = createSchema({
    email: Type.string(),
    passwordSalt: Type.string(),
    hashedPassword: Type.string(),
    forgetPasswordToken: Type.string(),
    address: Type.string(),
    name: Type.string(),
    age: Type.number({
        required: true
    }),
    phone: Type.number(),
    gender: Type.string(),
    avatar: Type.string(),
    role: Type.number(),
    tokenRegister: Type.string(),
    status: Type.number(),
}, { timestamps: true });

export const UserModel = typedModel('User', UserSchema, 'users');
export type UserDoc = ExtractDoc<typeof UserSchema>;
export type User = ExtractProps<typeof UserSchema>;
