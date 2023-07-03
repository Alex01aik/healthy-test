import mongoose from 'mongoose';

const Appointment = new mongoose.Schema({
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  from: {
    type: Date,
    required: true,
  },
  till: {
    type: Date,
    required: true,
  },
});

export default mongoose.model('Appointment', Appointment);
