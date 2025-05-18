import React from "react";
import image from "../assets/44.jpg";
import ImageIcon from "@mui/icons-material/Image";

const Account = () => {
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
          gap: "10px",
          width: "300px",
          border: "1px solid lightgrey",
          borderRadius: "10px",
          height: "85vh",
        }}
      >
        <h2
          style={{
            borderBottom: "1px solid lightgrey",
            padding: "1rem",
            backgroundColor: "white",
          }}
        >
          Account Settings
        </h2>

        <div>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              padding: "0 10px",
              alignItems: "center",
            }}
          >
            <div style={{ position: "relative" }}>
              <img
                style={{
                  width: "70px",
                  height: "70px",
                  borderRadius: "50%",
                  border: "2px solid lightgrey",
                }}
                src={image}
                alt=""
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "2px",
                  borderRadius: "50%",
                  backgroundColor: "rgb(108, 37, 225)",
                  padding: "5px 5px 0 5px",
                  right: "0",
                  zIndex: "10",
                  cursor: "pointer",
                }}
              >
                <ImageIcon sx={{ color: "white", fontSize: "20px" }} />
              </div>
            </div>
            <div>
              <p style={{ fontWeight: "500" }}>Marry Doe</p>
              <p>marrydoe@gmail.com</p>
            </div>
          </div>
          <p style={{ padding: "10px", fontSize: "15px", opacity: "0.8" }}>
            Lorem, ipsum dolor sit amet consecteturin adipisicing elit. Culpa
            reiciendis voluperin nostrum odit repellat, in quasi quodereing
            tenetur aperiam quam numquam
          </p>
        </div>

        <div
          style={{
            borderBottom: "2px dotted lightgrey",
            borderTop: "2px dotted lightgrey",
            flexGrow: "1",
            marginBottom: "2rem",
          }}
        ></div>
      </div>
    </div>
  );
};

export default Account;
