import { AxiosBase } from "./AxiosBase";

const FetchMessages = async(chatID) => {
    const token = localStorage.getItem("token")
    const config = {
        headers: {
            "authorization": `Bearer ${token}`
        }
    };

    try {
        const response = await AxiosBase.get(`/msgs/getMessages/${chatID}`,config)

        return response.data
    } catch(error) {

    }
}

const SendMessage = async(chatID, message) => {
    console.log(chatID)
    const token = localStorage.getItem("token")
    const config = {
        headers: {
            "authorization": `Bearer ${token}`
        }
    };
    const body= {
        content: message
    }

    try{
        const response = await AxiosBase.post(`/msgs/sendMessage/${chatID}`, body, config)

        return response.data
    }
    catch(error) {

    }

    
}

export {FetchMessages, SendMessage}