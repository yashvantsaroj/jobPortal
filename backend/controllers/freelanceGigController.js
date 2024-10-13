// backend/controllers/freelanceGigController.js
import {FreelanceGig} from '../models/freelanceGigSchema.js';

export const createFreelanceGig = async (req, res) => {
  try {
    const { title, description, budget, duration, skillsRequired } = req.body;
    const newGig = await FreelanceGig.create({
      title,
      description,
      employer: req.user._id,
      budget,
      duration,
      skillsRequired
    });
    
    await newGig.save();
    return res.json({
      success:true,
      message:"FreelanceGig created successfully!",
      newGig
    });
  } catch (err) {
    console.log(err);
  }
};

export const getAllFreelanceGigs = async (req, res) => {
  try {
    const gigs = await FreelanceGig.find().populate('employer', ['name', 'email']);
    res.json(gigs);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

export const getFreelanceGigById = async (req, res) => {
  const { id } = req.params;
  try {
    const freelancegig = await FreelanceGig.findById(id);
    if (!freelancegig) {
      return next(new ErrorHandler("Job not found.", 404));
    }
    res.status(200).json({
      success: true,
      freelancegig,
    });
  } catch (error) {
    return next(new ErrorHandler(`Invalid ID / CastError`, 404));
  }
};

export const filterFreelanceGigs = async (req, res) => {
  const { skills } = req.query;
  try {
    const gigs = await FreelanceGig.find({
      skillsRequired: { $in: skills.split(',') }
    });
    res.json(gigs);
  } catch (err) {
    res.status(500).send('Server error');
  }
};
// Apply for a freelance gig
export const applyForGig = async (req, res) => {
  try {
    const { message } = req.body;
    const gig = await FreelanceGig.findById(req.params.id);
    gig.applications.push({ freelancerId: req.user.id, message }); // assuming req.user.id has the freelancer's ID
    await gig.save();
    res.status(200).json({ message: 'Application submitted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error applying for gig', error });
  }
};

// Select freelancers for a gig
export const selectFreelancers = async (req, res) => {
  try {
    const { selectedFreelancerIds } = req.body; // Expect an array of freelancer IDs
    const gig = await FreelanceGig.findById(req.params.id);
    gig.selectedFreelancers = selectedFreelancerIds; // Add this field to your schema
    await gig.save();
    res.status(200).json({ message: 'Freelancers selected successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error selecting freelancers', error });
  }
};

