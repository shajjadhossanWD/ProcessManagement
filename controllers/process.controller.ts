import { Request, Response } from 'express';
import Process from '../models/process.model';
import { CatchAsyncError } from "../middleware/catchAsyncError";
const moment = require('moment');

export const CreateProcess = CatchAsyncError(
  async (req: Request, res: Response) => {
    try {
        const {PID} = req.body;

        const newProcess = new Process({
            PID: PID,
            creationTime: [moment().format('hh:mm:ss a DD.MM.YYYY')],
        });

        await newProcess.save();
        res.status(200).json({
            success: true,
            PID: newProcess.PID,
            creationTime: moment().format('hh:mm:ss a DD.MM.YYYY')
        }); 

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
 }
);

const increaseOfCreationTime = async () => {
    try {
      const processes = await Process.find();
  
      // Loop through each process and update its creationTime
      for (const process of processes) {
        process.creationTime.push(moment().format('hh:mm:ss a DD.MM.YYYY'));
        await process.save();
      }
    } catch (err) {
      console.error('Error Increasing creationTime field:', err);
    }
  };
  
  increaseOfCreationTime();
  
  setInterval(increaseOfCreationTime, 5000);


  export const getAllProcessData = CatchAsyncError(
    async (req: Request, res: Response) => {
        try {
            const process = await Process.find();
    
            const processAllData = process.map((process) => ({
                PID: process.PID,
                creationTime: process.creationTime[0]
            }))
            res.json({ success: true, processAllData}); 
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
  );

  export const getSingleProcessLogs = CatchAsyncError(
    async (req: Request, res: Response) => {
        try {
            const {PID} = req.params
            const process = await Process.findOne({PID});
            if (!process) {
                return res.status(404).json({ error: 'Process not found' });
            }
            res.json( {
                success: true,
                allLogs: process.creationTime
            } );
           
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
  );


  export const DeleteProcessByPID = CatchAsyncError(
    async (req: Request, res: Response) => {
        try {
          const {PID} = req.params
          const ProcessDelete = await Process.findOneAndDelete({PID});
          if (!ProcessDelete) {
            return res.status(404).json({ error: 'Process not found' });
          }
          res.json(
            {   
                success: true,
                message: 'Process successfully deleted' 
            }
        ); 
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
  );
