import { AxiosBase } from "./AxiosBase";

const FetchChats = async()=>{
    const token = localStorage.getItem("token")
    const config = {
        headers: {
            "authorization": `Bearer ${token}`
        }
    };

    const response = await AxiosBase.get('/chats',config)

    return response.data
}

const FetchChat = async(chatID) => {
    const token = localStorage.getItem("token")

    const config = {
        headers: {
            "authorization": `Bearer ${token}`
        }
    };

    const body= {
        chat_id: chatID
    }

    const response = await AxiosBase.get('/chats/chat', body, config)

    return response
}

export {FetchChats, FetchChat}