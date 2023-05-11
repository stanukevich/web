import {makeAutoObservable} from "mobx"

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._user = {}
        this._messages = {}
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }

    setUser(user) {
        this._user = user
    }

    setMessages(messages) {
        this._messages = messages
    }

    get isAuth() {
        return this._isAuth
    }

    get getUser() {
        return this._user
    }

    get getMessages() {
        return this._messages
    }
}