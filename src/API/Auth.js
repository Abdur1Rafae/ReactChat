import { AxiosBase } from "./AxiosBase";

const UserLogin = async(data) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    const response = await AxiosBase.post(
        "user/login",
        data,
        config
    );

    return response
}

const UserRegister = async(data)=> {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    const response = await AxiosBase.post(
        "user/register",
        data,
        config
    )
    return response
}

export {UserLogin, UserRegister}