import React from "react";
import { Link } from "react-router-dom";

function FooterLink(props) {
  return (
    <a
      href={props.link.to}
      target={props.link.target ? props.link.target : ""}
      rel={props.link.rel ? props.link.rel : ""}
    >
      <article className="footer-link-container">
        <div className="footer-link-icon-container">
          <img
            src={props.link.icon}
            alt={props.link.iconAlt}
            width="50"
            height="50"
            className="footer-link-icon"
          />
        </div>
        <div className="footer-link-content">
          <h5 className="footer-link-title">{props.link.title}</h5>
          <p className="footer-link-text">{props.link.text}</p>
        </div>
      </article>
    </a>
  );
}

function FooterLinks() {
  // Defining the different links [{},{}]
  const links = [
    {
      to: "/contact/",
      icon: "/static/frontend/svg/contact.svg",
      iconAlt: "Contact Icon",
      title: "Contact",
      text: "Contact Admin",
    },
    {
      to: "https://github.com/VBoB13/TeachAdmin",
      target: "_blank",
      rel: "noreferrer noopener",
      icon: "/static/frontend/svg/kitty(small).svg",
      iconAlt: "Custom GitHub Icon",
      title: "GitHub",
      text: "View the site's GitHub repository.",
    },
  ];

  // Arrow function to generate links
  let generateLinks = (linksList) => {
    let linkComponents = linksList.map((link, index) => {
      return <FooterLink link={link} key={index} />;
    });
    return linkComponents;
  };

  return <footer className="footer">{generateLinks(links)}</footer>;
}

export default function Footer() {
  return (
    <div className="container-fluid footer-container">
      <FooterLinks />
    </div>
  );
}
