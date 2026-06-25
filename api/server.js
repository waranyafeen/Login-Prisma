//const express = require('express'); // เขียน express แบบดั้งเดิม // type: commonjs
// type: module
import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRoute from "./routes/authRoute.js";

const app = express();
const PORT = 8000;

// Middlewares
app.use(cors()); // เอาไว้อนุญาติให้ต่าง domain เข้าถึง endpoint ของ server
app.use(morgan("dev")); // เอาไว้ show log ของ routing
app.use(express.json()) // เอาไว้อ่าน json

// เรียกใช้งาน Route
app.use("/auth", authRoute);

// error handing เมื่อมี error ก็จะมาเรียกใช้ตรงนี้
app.use((err, req, res, next) => {
  //console.log(err);
  res
    .status(err.code || 500) // ถ้ามีข้อความส่งมาให้ทำ err.code ถ้าไม่ก็แสดง 500
    .json({ message: err.message || "Something wrong!!!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
