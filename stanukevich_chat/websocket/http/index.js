const axios = require("axios")
const SERVER_API_URL = require("../utils/consts")

const $host = axios.create({
    baseURL: SERVER_API_URL
})

module.exports = $host