import { AxiosBase } from "./AxiosBase";

const AddFriend = async(email) => {
    const token = localStorage.getItem("token")
    const config = {
        headers: {
            "authorization": `Bearer ${token}`
        }
    }
    const body = {
        friendEmail: email
    }

    try {
        const response = await AxiosBase.post('/user/addFriend',body, config)

        return response.data
    } catch(error) {

    }
}

export {AddFriend}