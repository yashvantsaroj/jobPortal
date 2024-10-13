import mongoose from 'mongoose';

const freelanceGigSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  employer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  budget: {
    type: Number,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  skillsRequired: {
    type: String,
    required: true,
  },
},{timestamps:true});

export const FreelanceGig = mongoose.model('FreelanceGig', freelanceGigSchema);
  // This is important for default export
