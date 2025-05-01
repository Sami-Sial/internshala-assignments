import { Stack } from "@mui/material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
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
      }}
    >
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "300px",
          padding: "1rem 10px",
          border: "1px solid lightgrey",
          borderRadius: "10px",
          height: "85vh",
        }}
      >
        <h1 style={{ lineHeight: "2rem" }}>Signin to your PopX Account</h1>
        <p style={{ fontSize: "18px", opacity: "0.5", margin: "10px 0" }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit
        </p>
        <Stack id="form" spacing={2.5} sx={{ marginTop: "2rem" }}>
          <div className="input">
            <label htmlFor="email">
              Email Address<span style={{ color: "red" }}>*</span>
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

          <Button
            type="submit"
            variant="contained"
            size="large"
            style={{
              backgroundColor: "#6c25ff",
              textTransform: "capitalize",
              marginTop: "3rem",
            }}
            onClick={handleSubmit}
          >
            Create Account
          </Button>
        </Stack>
      </form>
    </div>
  );
};

export default LogIn;
