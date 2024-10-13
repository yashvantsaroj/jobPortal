import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
const FreelancegigDetails = () => {
  const { id } = useParams();
  const [freelancegig, setFreelancegig] = useState({});
  const navigateTo = useNavigate();

  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/freelancegig/get/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setFreelancegig(res.data.freelancegig);
      })
      .catch((error) => {
        navigateTo("/notfound");
      });
  }, []);

  if (!isAuthorized) {
    navigateTo("/login");
  }

  return (
    <section className="jobDetail page">
      <div className="container">
        <h3>Freelancegig Details</h3>
        <div className="banner">
          <p>
            Title: <span> {freelancegig.title}</span>
          </p>
          <p>
            Skills required: <span>{freelancegig.skillsRequired}</span>
          </p>
          <p>
            Stipend: <span>{freelancegig.budget}</span>
          </p>
          <p>
            Duration: <span>{freelancegig.duration}</span>
          </p>
          <p>
            Description: <span>{freelancegig.description}</span>
          </p>
      </div>
      </div>
    </section>
  );
};

export default FreelancegigDetails;