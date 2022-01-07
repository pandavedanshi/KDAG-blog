import React, { useState } from "react";
import Navbar from "../Common/Navbar/Navbar";
import "./CertificateGeneration.css";
import "./Header/Header.css";
import certificates from "./certificates";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CertificateGeneration = () => {
  const [email, setEmail] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const found = certificates.find((element) => element.Gmail === email);
    if (found) {
      window.open(found["Certificate Link"]);
      setEmail("");
    } else {
      toast.error("Enter registered email!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div>
      <Navbar />
      <div class="resources-list-header certificate">
        <div class="resources-list-header-title certificate">
          CERTIFICATE GENERATION
          <div className="certificate-search">
            <form
              className="certificate-content certificate-search-form"
              onSubmit={handleSubmit}
            >
              <input
                type="email"
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CertificateGeneration;
