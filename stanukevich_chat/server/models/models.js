const sequelize = require("../database")
const {DataTypes} = require("sequelize")

const User = sequelize.define("user", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    username: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING, unique: false}
})

const Message = sequelize.define("message", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    senderName: {type: DataTypes.STRING, unique: false},
    value: {type: DataTypes.TEXT, unique: false}
})

User.hasMany(Message)
Message.belongsTo(User)

module.exports = {
    User,
    Message
}