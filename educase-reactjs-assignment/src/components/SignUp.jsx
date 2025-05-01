import React, { useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";

const SignUp = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    const form = document.querySelector("form");
    if (form.checkValidity()) {
      navigate("/account");
    }
  };

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
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: "10px",
          width: "300px",
          padding: "1rem 10px",
          border: "1px solid lightgrey",
          borderRadius: "10px",
          height: "85vh",
          backgroundColor: "f7f8f9",
        }}
      >
        <div>
          <h1 style={{ lineHeight: "2rem" }}>Create your PopX Account</h1>
          <Stack spacing={2.5} style={{ marginTop: "2rem" }}>
            <div className="input">
              <label htmlFor="name">Full Name*</label>
              <input type="text" placeholder="Jane Doe" id="name" required />
            </div>

            <div className="input">
              <label htmlFor="phoneNo">
                Phone No<span style={{ color: "red" }}>*</span>
              </label>
              <input type="text" placeholder="Phone No" id="phoneNo" required />
            </div>

            <div className="input">
              <label htmlFor="email">
                Eamail Address<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="email"
                placeholder="example@gmail.com"
                id="email"
                required
              />
            </div>

            <div className="input">
              <label htmlFor="password">
                Password<span style={{ color: "red" }}>*</span>
              </label>
              <input type="password" id="password" required />
            </div>

            <div className="input">
              <label htmlFor="companyName">
                Company Name<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. amazon"
                id="companyName"
                required
              />
            </div>
            <span>
              <p>Are you an agency?</p>

              <input type="radio" name="radio" id="yes" required />
              <label htmlFor="yes" style={{ margin: "0 2rem 0 5px" }}>
                Yes
              </label>

              <input type="radio" name="radio" id="no" required />
              <label htmlFor="no" style={{ margin: "0 5px" }}>
                No
              </label>
            </span>
          </Stack>
        </div>

        <Button
          type="submit"
          variant="contained"
          size="large"
          style={{
            backgroundColor: "#6c25ff",
            textTransform: "capitalize",
            marginTop: "12px",
          }}
          onClick={handleSubmit}
        >
          Create Account
        </Button>
      </form>
    </div>
  );
};

export default SignUp;
