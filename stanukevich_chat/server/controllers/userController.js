const ApiError = require("../error/ApiError")
const { User, Message } = require("../models/models")

class UserController {
    async registration(req, res, next) {
        const {username, password} = req.body
        if(!username || !password) {
            return next(ApiError.badRequest("Некорректный username или password!"))
        }
        const candidate = await User.findOne({where: {username}})
        if(candidate) {
            return next(ApiError.badRequest("Пользователь с таким username уже существует"))
        }
        await User.create({username, password})
        return res.json({message: "Пользователь " + username + " успешно зарегестрирован!"})
    }

    async login(req, res, next) {
        const {username, password} = req.body
        if(!username || !password) {
            return next(ApiError.badRequest("Некорректный username или password!"))
        }
        const authCandidate = await User.findOne({where: {username, password}})
        if(!authCandidate) {
            return next(ApiError.internal("Неверное имя пользователя или пароль!"))
        }
        return res.json({status: true})
    }

    async getAuthUser(req, res, next){
        const {username, password} = req.body
        if(!username || !password) {
            return next(ApiError.badRequest("Некорректный username или password!"))
        }
        const authCandidate = await User.findOne({where: {username, password}})
        if(!authCandidate) {
            return next(ApiError.internal("Неверное имя пользователя или пароль!"))
        }
        return res.json(authCandidate)
    }

    async createMessage(req, res, next){
        const {userId, value} = req.body
        const checkUserId = await User.findOne({where: {id: userId}})
        if(!checkUserId) {
            return next(ApiError.badRequest("Неккоректный userId у сообщения!"))
        }
        if(!value) {
            return next(ApiError.badRequest("Неккоректное value у сообщения!"))
        }
        const senderName = checkUserId.dataValues.username
        await Message.create({userId, senderName, value})
        return res.json({message: "Сообщение " + value + " успешно добавлено!"})
    }

    async getMessages(req, res, next){
        const messages = await Message.findAll({attributes: ["userId","senderName","createdAt","value","id"]});
        if(!messages) {
            return next(ApiError.badRequest("В бд нет сообщений!"))
        }
        return res.json(messages)
    }

    async deleteMessage(req, res){
        const {messageID} = req.body
        await Message.destroy({where : {id: messageID}})
    }
}

module.exports = new UserController()