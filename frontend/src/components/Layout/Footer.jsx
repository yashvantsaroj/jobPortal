import React, { useContext } from "react";
import { Context } from "../../main";
import { Link } from "react-router-dom";
import { FaFacebookF, FaYoutube, FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

const Footer = () => {
  const { isAuthorized } = useContext(Context);
  return (
    <footer className={isAuthorized ? "footerShow" : "footerHide"}>
      <div>&copy; All Rights Reserved By YASHVANT SAROJ.</div>
      <div>
        <Link to={"https://www.facebook.com/yashvant.saroj.52?mibextid=ZbWKwL"} target="_blank">
          <FaFacebookF />
        </Link>
        <Link to={"https://youtube.com/@ys.edits_25?si=7snUMzLtZrIqdb5d"} target="_blank">
          <FaYoutube />
        </Link>
        <Link to={"https://in.linkedin.com/in/yashvant-saroj"} target="_blank">
          <FaLinkedin />
        </Link>
        <Link to={"https://www.instagram.com/yashvant_saroj.25/"} target="_blank">
          <RiInstagramFill />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;