import dns from 'node:dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);

import "dotenv/config";
import app from "./app.js"
import { syncDatabase, testConnection } from "./config/database.js"

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await testConnection()

    await syncDatabase(false)

    app.listen(PORT, () => {
      console.log(`Server running => PORT: ${PORT}`)
    })
  } catch (error) {
    console.error("Error connection Database: ", error)
  }
}

startServer()