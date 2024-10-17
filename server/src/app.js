import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express();

app.use(cors(
    {
        origin: process.env.CORS_ORIGIN,
        credentials: true,
        exposedHeaders : ["Set-Cookie"],
    }
))

app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({extended:true , limit : "10kb"}))
app.use(cookieParser())


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });


import shopRoutes from "./routes/shop.routes.js"
import customerRoutes from "./routes/customer.routes.js"
import commonRoutes from "./routes/common.routes.js"
app.use("/v1/api/shop" , shopRoutes)
app.use("/v1/api/customer" , customerRoutes)
app.use("/v1/api/common" , commonRoutes)

export {app}