import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: false,
  },
});

export interface User {
  id: number;
  username: string;
  age: number;
  email: string;
  password?: string;
}

const User = mongoose.model('User', userSchema);

export default User;
  