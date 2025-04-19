
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";

const app = express();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(cookieParser());

/* auth routes */
import authRoutes from "./routes/auth/auth.routes.js"

app.use("/api/v1/auth", authRoutes);
/* /auth routes */

/* user routes */
import bloodRequestRoutes from "./routes/user/bloodRequest.routes.js"
import userRecordRoutes from "./routes/user/record.routes.js"

app.use("/api/v1/user/request", bloodRequestRoutes);
app.use("/api/v1/user/record", userRecordRoutes);
/* /user routes */

/* admin routes */
import analyticsRoutes from "./routes/admin/analytics.routes.js"

app.use("/api/v1/admin/analytics", analyticsRoutes);
/* /admin routes */

app.get("/", (req, res) => {
    res.send("Welcome...");
});

app.use(errorHandler);

export { app };