const $host = require(".");

const createMessage = async (value, userId) => {
    const response = await $host.post("/api/user/createMessage", {value, userId})
    return response
}

const getMessages = async () => {
    const response = await $host.get("api/user/getMessages")
    return response
}

const deleteMessage = async () => {
    const response = await $host.post("api/user/deleteMessage")
    return response
}

module.exports = {createMessage, getMessages, deleteMessage}