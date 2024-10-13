// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const FreelanceGigs = () => {
//   const [gigs, setGigs] = useState([]);

//   // Fetch gigs on page load
//   useEffect(() => {
//     const fetchGigs = async () => {
//       try {
//         const response = await axios.get('http://localhost:4000/api/v1/gigs');
//         setGigs(response.data);
//       } catch (error) {
//         console.error('Error fetching freelance gigs', error);
//       }
//     };
//     fetchGigs();
//   }, []);

//   return (
//     <div className="freelance-gigs-page">
//       <h1>Freelance Gigs</h1>
//       {gigs.length > 0 ? (
//         <div className="gigs-list">
//           {gigs.map((gig) => (
//             <div className="gig-item" key={gig._id}>
//               <h3>{gig.title}</h3>
//               <p>{gig.description}</p>
//               <button>View Details</button>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="no-gigs">
//           <p>No freelance gigs available right now. Please check back later!</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FreelanceGigs;

import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";

const  FreelanceGigs = () => {
  const [freelancegig, setFreelancegig] = useState([]);
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();
  useEffect(() => {
    try {
      axios
        .get("http://localhost:4000/api/v1/freelancegig/getall", {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res.data);
          setFreelancegig(res.data);
          console.log(freelancegig);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  if (!isAuthorized) {
    navigateTo("/");
  }

  return (
    <section className="jobs page">
      <div className="container">
        <h1>ALL AVAILABLE FREELANCE GIG</h1>
        <div className="banner">
          {freelancegig &&
            freelancegig.map((element) => {
              return (
                <div className="card" key={element._id}>
                  <p>{element.title}</p>
                  {/* <p>{element.skillsRequired}</p> */}
                  <p>{element.duration}</p>
                  <Link to={`/freelance-gig/${element._id}`}>freelancegig Details</Link>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default FreelanceGigs;