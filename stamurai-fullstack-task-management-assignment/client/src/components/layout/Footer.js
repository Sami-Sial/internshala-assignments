import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        display: "flex",
        gap: "1rem",
        height: "2.5rem",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(000, 000, 000, 0.7",
      }}
    >
      <Link
        style={{ color: "white", textDecoration: "none" }}
        href="https://www.linkedin.com/in/sami-ullah-b536a8338/"
      >
        LinkedIn
      </Link>
      <Link
        style={{ color: "white", textDecoration: "none" }}
        href="https://sami-sial-portfolio.vercel.app"
      >
        Portfolio
      </Link>
      <Link
        style={{ color: "white", textDecoration: "none" }}
        href="https://gihub.com/Sami-Sial"
      >
        Github
      </Link>
    </footer>
  );
};

export default React.memo(Footer);
