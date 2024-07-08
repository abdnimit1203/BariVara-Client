import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-neutral text-base-100 py-6 flex flex-col  items-center justify-center end-0 absolute w-full gap-4">
      <div className="text-sm">
        Developed by{" "}
        <Link
          to={"https://abdullah-portfolio-frontend.netlify.app/"}
          target="__blank"
          className="font-semibold text-secondary"
        >
          ABD NIMIT
        </Link>{" "}
        | © {currentYear} - All right reserved
      </div>
      
      <div className="flex gap-2 text-xl ">
       
        <Link to={'https://www.facebook.com/abd.nimit'} target="__blank" className="hover:text-secondary ">
          <FaFacebook />
        </Link>
        <Link to={'https://www.instagram.com/abd_nimit'} target="__blank" className="hover:text-secondary ">
          <FaInstagram />
        </Link>
        <Link to={'https://github.com/abdnimit1203'} target="__blank" className="hover:text-secondary ">
          <FaGithub />
        </Link>
        <Link to={'https://www.linkedin.com/in/abdullah-ibne-ali'} target="__blank" className="hover:text-secondary ">
          <FaLinkedin />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
