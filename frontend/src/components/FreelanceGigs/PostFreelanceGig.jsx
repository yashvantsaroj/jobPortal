// // frontend/src/components/FreelanceGigs/PostFreelanceGig.jsx
// import React, { useState } from 'react';
// import axios from 'axios';

// const PostFreelanceGig = () => {
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     budget: '',
//     duration: '',
//     skillsRequired: ''
//   });

//   const { title, description, budget, duration, skillsRequired } = formData;

//   const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

//   const onSubmit = async e => {
//     e.preventDefault();
//     const newGig = {
//       title,
//       description,
//       budget,
//       duration,
//       skillsRequired: skillsRequired.split(',')
//     };
//     try {
//       await axios.post('/api/freelance-gigs/create', newGig);
//       alert('Freelance gig posted successfully!');
//     } catch (err) {
//       console.error('Error posting gig', err);
//     }
//   };

//   return (
//     <div>
//       <h1>Post a Freelance Gig</h1>
//       <form onSubmit={onSubmit}>
//         <input
//           type="text"
//           placeholder="Title"
//           name="title"
//           value={title}
//           onChange={onChange}
//           required
//         />
//         <textarea
//           placeholder="Description"
//           name="description"
//           value={description}
//           onChange={onChange}
//           required
//         />
//         <input
//           type="number"
//           placeholder="Budget"
//           name="budget"
//           value={budget}
//           onChange={onChange}
//           required
//         />
//         <input
//           type="text"
//           placeholder="Duration (e.g., 2 weeks, 1 month)"
//           name="duration"
//           value={duration}
//           onChange={onChange}
//           required
//         />
//         <input
//           type="text"
//           placeholder="Skills Required (comma separated)"
//           name="skillsRequired"
//           value={skillsRequired}
//           onChange={onChange}
//           required
//         />
//         <button type="submit">Post Gig</button>
//       </form>
//     </div>
//   );
// };

// export default PostFreelanceGig;

import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
const PostFreelanceGig = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [skillsRequired, setSkillsRequired] = useState("");
  const [budget, setBudget] = useState();

  const { isAuthorized, user } = useContext(Context);

  const handlePostFreelance = async (e) => {
    e.preventDefault();
    await axios
      .post(
        "http://localhost:4000/api/v1/freelancegig/create",
         
        { 
              title,
              description,
              budget,
              skillsRequired,
              duration
            },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setTitle(""),
        setDescription(""),
        setDuration(""),
        setSkillsRequired(""),
        setBudget(""),
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const navigateTo = useNavigate();
  if (!isAuthorized || (user && user.role !== "Employer")) {
    navigateTo("/");
  }

  return (
    <>
      <div className="job_post page">
        <div className="container">
          <h3>POST NEW FREELANCEGIG</h3>
          <form onSubmit={handlePostFreelance}>
            <div className="wrapper">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="freelancegig Title"
              />
            </div>
            <div className="wrapper">
              <input
                type="text"
                value={skillsRequired}
                onChange={(e) => setSkillsRequired(e.target.value)}
                placeholder="skills"
              />
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="stipend in dollars"
              />
              <input
              type="text"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="duration of the freelancegig"
            />
            </div>
            <textarea
              rows="10"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="freelancegig Description"
            />
            <button type="submit">Create Freelancegig</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PostFreelanceGig;

