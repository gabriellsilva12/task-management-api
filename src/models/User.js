import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js"

const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,

        validate: {
            is: {
                args: /^[A-Za-zÀ-ÖØ-öø-ÿ ]+$/,
                msg: "Name must contain only letters and spaces"
            }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,

        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: "users"
})

export default User