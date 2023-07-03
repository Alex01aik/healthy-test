import mongoose from 'mongoose';

export const UserModel = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
});
export default mongoose.model('User', UserModel);
