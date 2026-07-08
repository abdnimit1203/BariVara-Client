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
    <footer className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white border-t border-cyan-500/30 py-6 flex flex-col items-center justify-center end-0 absolute w-full gap-4 shadow-2xl">
      <div className="text-sm text-slate-100">
        Developed by{" "}
        <Link
          to={"https://abdullah-portfolio-frontend.netlify.app/"}
          target="__blank"
          className="font-bold text-cyan-400 hover:text-cyan-300 underline transition"
        >
          ABD NIMIT
        </Link>{" "}
        | © {currentYear} - All right reserved
      </div>
      
      <div className="flex gap-4 text-xl text-white">
        <Link to={'https://www.facebook.com/abd.nimit'} target="__blank" className="hover:text-cyan-400 hover:scale-110 transition duration-200">
          <FaFacebook />
        </Link>
        <Link to={'https://www.instagram.com/abd_nimit'} target="__blank" className="hover:text-cyan-400 hover:scale-110 transition duration-200">
          <FaInstagram />
        </Link>
        <Link to={'https://github.com/abdnimit1203'} target="__blank" className="hover:text-cyan-400 hover:scale-110 transition duration-200">
          <FaGithub />
        </Link>
        <Link to={'https://www.linkedin.com/in/abdullah-ibne-ali'} target="__blank" className="hover:text-cyan-400 hover:scale-110 transition duration-200">
          <FaLinkedin />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
