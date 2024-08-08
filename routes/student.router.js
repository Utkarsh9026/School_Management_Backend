import express from "express";
import { getData, savedata } from "../controllers/student.controll.js";
import { uploadFile } from "../controllers/student.controll.js";

export const studentRoutes = express.Router();

studentRoutes.post("/savedata", uploadFile, savedata);
studentRoutes.get("/getdata", getData);
