import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fafafa",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          gap: "10px",
          width: "300px",
          padding: "5px 8px 1rem",
          border: "1px solid lightgray",
          borderRadius: "10px",
          height: "85vh",
          backgroundColor: "f7f8f9",
        }}
      >
        <h1>Welcome to PopX</h1>
        <p style={{ fontSize: "17px", opacity: "0.7" }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit
        </p>
        <Button
          variant="contained"
          size="large"
          style={{
            backgroundColor: "#6c25ff",
            textTransform: "capitalize",
            marginTop: "2rem",
            fontSize: "15px",
          }}
          onClick={() => navigate("/signup")}
        >
          Create Account
        </Button>
        <Button
          variant="contained"
          size="large"
          style={{
            backgroundColor: "#cebafb",
            textTransform: "capitalize",
            color: "black",
            fontSize: "15px",
          }}
          onClick={() => navigate("/login")}
        >
          Already Registered? Login
        </Button>
      </div>
    </div>
  );
};

export default Home;
