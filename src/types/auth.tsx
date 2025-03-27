type submitType  = {
    name: string;
    email: string;
    phone: string;
    password: string;
    rePassword: string;
    location: string;
}
type loginType  = {
    email: string;
    password: string;
}
type forgetPasswordType = {
    email: string
}
type resetPasswordType  = {
    token:string,
    password: string;
    rePassword: string;
}


export type { submitType,loginType, forgetPasswordType,resetPasswordType };