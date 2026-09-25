import { Sequelize } from "sequelize";
import path from "node:path"
import { fileURLToPath } from "node:url";
import "dotenv/config";

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: path.resolve(__dirname, "..", "..", process.env.DB_STORAGE || "database.sqlite"),
    logging: false,
    define: {
        timestamps: true,
        underscored: false
    }
})

const testConnection = async () => {

    try {
        await sequelize.authenticate();
        console.log("Database connection successful")
    } catch (error) {
        console.erro("Database connection error", error)
        process.exit(1)
    }

}

const syncDatabase = async (force = false) => {

    try {
        await sequelize.sync({ force })
        console.log("Success synchronizing database")
    } catch (error) {
        console.error("Error synchronizing database", error)
    }

}

export {
    sequelize,
    testConnection,
    syncDatabase
}