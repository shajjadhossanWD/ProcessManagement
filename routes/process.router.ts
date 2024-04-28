import express from "express";
import {
    CreateProcess,
    getAllProcessData,
    getSingleProcessLogs,
    DeleteProcessByPID
} from "../controllers/process.controller";

const ProcessRouter = express.Router();

 ProcessRouter.post("/create-process", CreateProcess);
 ProcessRouter.get("/get/all", getAllProcessData);
 ProcessRouter.get("/get/:PID", getSingleProcessLogs);
 ProcessRouter.delete("/delete/:PID", DeleteProcessByPID);


export default ProcessRouter;