import dns from 'node:dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);

import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { testConnection, syncDatabase } from "./config/database.js"
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import errorMiddleware from './middlewares/errorMiddleware.js';
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 3000;
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100
});

app.use(helmet())
app.use(limiter)

app.use(express.json({
  limit: "10kb"
}));

app.use("/auth", authRoutes)
app.use("/tasks", taskRoutes)

app.get("/", (req, res) => {
  res.status(200).json({ message: "API to-do-list running" })
})

app.use(errorMiddleware)

const startServer = async () => {

  try {

    await testConnection()

    await syncDatabase(false)

//==========================================================================
  // DEVELOPMENT / DATABASE TESTS 

  // Delete multiple users
  // await User.destroy({
  //       where: {
  //             id: [43,44,45,46,47,48,49,50,51,52,53]
  //         }
  //     });

  // await Task.destroy({
  //       where: {
  //             id: [20,21,22]
  //         }
  //     });
//==========================================================================
    
    app.listen(PORT, () => {
      console.log(`Server running => PORT: ${PORT}`)
    })
  } catch (error) {
    console.error("Error connection Database: ", error)
  }

}

startServer()



// {
// 	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTQsImVtYWlsIjoicm96ZW5vQGdtYWlsLmNvbSIsImlhdCI6MTc5MDM2MDYxNiwiZXhwIjoxNzkwOTY1NDE2fQ.8o_Q5Qo5lFLKKl7AZX0vhheKsuLl4jUKZV46W88sHoc",
// 	"user": {
// 		"id": 54,
// 		"name": "Rozeno Silva",
// 		"email": "rozeno@gmail.com"
// 	}
// }
// {
// 	"email": "Rozeno@gmail.com",
// 	"password": "Ga1234567@"
// }
///////////////////////////////////////////////////////////////////////


// {
// 	"email": "Ramon@gmail.com",
// 	"password": "Ga1234567@"
// }
// {
// 	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTUsImVtYWlsIjoicmFtb25AZ21haWwuY29tIiwiaWF0IjoxNzkwMzYwNjk5LCJleHAiOjE3OTA5NjU0OTl9.Afj73hJV2al7LTI1cnCCzczCmhaj_tIQdZ5_3ympm-4",
// 	"user": {
// 		"id": 55,
// 		"name": "Ramon",
// 		"email": "ramon@gmail.com"
// 	}
// }