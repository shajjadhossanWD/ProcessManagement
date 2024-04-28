import mongoose, { Schema, Document } from 'mongoose';

interface Process extends Document {
  PID: string;
  creationTime: string[]; 
}

const ProcessSchema: Schema = new Schema({
  PID: { 
    type: String, 
    required: true ,
    unique: true,
  },

  creationTime: [{ 
    type: String,
    required: true
  }],
});

export default mongoose.model<Process>('Process', ProcessSchema);