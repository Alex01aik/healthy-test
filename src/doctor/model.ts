import mongoose from 'mongoose';

const workingHoursSchema = new mongoose.Schema({
  from: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  }
});


const Doctor = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  working_hours: {
    type: Map,
    of: workingHoursSchema
  }
});

export default mongoose.model('Doctor', Doctor);
