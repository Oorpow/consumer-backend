import { Message } from 'element-ui'

export const notifyMessage = (type, message) => {
    Message({
        type,
        message
    })
}