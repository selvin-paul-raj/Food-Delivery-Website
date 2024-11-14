import React from "react";
import logo from "/logo.png";
import { RiInstagramLine,RiFacebookBoxLine,RiYoutubeLine, RiTwitterLine } from "react-icons/ri";

const Footer = () => {
  return (
    <div className="section-container">
      <footer className="footer text-base-content p-10">
        <aside>
          <img src={logo} alt="" />
          <p>
            Savor the artistry where
            <br /> every dish is a culinary <br /> masterpiece
          </p>
        </aside>
        <nav>
          <h6 className="footer-title">Useful links</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Events</a>
          <a className="link link-hover">Blogs</a>
          <a className="link link-hover">FAQ</a>
        </nav>
        <nav>
          <h6 className="footer-title">Main Menu</h6>
          <a className="link link-hover">Home</a>
          <a className="link link-hover">Offers</a>
          <a className="link link-hover">Menus</a>
          <a className="link link-hover">Reservation</a>
        </nav>
        <nav>
          <h6 className="footer-title">Contact Us</h6>
          <a className="link link-hover">Email: example@email.com</a>
          <a className="link link-hover">Phone No.: +64 958 248 966</a>
          <a className="link link-hover">Social media</a>
        </nav>
      </footer>

      <hr />

      <footer className="footer text-neutral-content items-center p-4 ">
      <nav className="flex gap-4">
        <a href="#">
          <RiInstagramLine className="text-4xl bg-[#EDFFEF] p-2 rounded-full text-black hover:bg-green hover:text-white" />
        </a>
        <a href="#">
          <RiYoutubeLine className="text-4xl bg-[#EDFFEF] p-2 rounded-full text-black hover:bg-green hover:text-white" />
        </a>
        <a href="#">
          <RiFacebookBoxLine className="text-4xl bg-[#EDFFEF] p-2 rounded-full text-black hover:bg-green hover:text-white" />
        </a>
        <a href="#">
          <RiTwitterLine className="text-4xl bg-[#EDFFEF] p-2 rounded-full text-black hover:bg-green hover:text-white" />
        </a>
      </nav>
      <aside className="ml-auto text-[#555555]">
        <p>Copyright © {new Date().getFullYear()} - All rights reserved</p>
      </aside>
    </footer>
    </div>
  );
};

export default Footer;
