import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import Input from "../../components/Inputs/Input";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";

const SignUp = ({ setCurrentPage }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext);

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    // 🔴 Frontend validation (important)
    if (!formData.name || !formData.email || !formData.password) {
      return setError("All fields are required");
    }

    if (!image) {
      return setError("Profile image is required");
    }

    try {
      // 🔥 MUST use FormData (same as Postman)
      const formDataReq = new FormData();
      formDataReq.append("name", formData.name);
      formDataReq.append("email", formData.email);
      formDataReq.append("password", formData.password);
      formDataReq.append("image", image); // MUST MATCH multer key

      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formDataReq
      );

      // Save token
      localStorage.setItem("token", response.data.token);

      // Update user context
      updateUser(response.data);

      // Navigate
      navigate("/dashboard");

    } catch (err) {
      console.error("SIGNUP ERROR:", err.response?.data);
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="w-[90vw] md:w-[33vw] p-7">
      <h3 className="text-lg font-semibold mb-2">Create Account</h3>

      <ProfilePhotoSelector
        image={image}
        setImage={setImage}
        preview={preview}
        setPreview={setPreview}
      />

      <form onSubmit={handleSignup} className="space-y-3 mt-4">
        <Input
          label="Full Name"
          type="text"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          className=""
        />

        <Input
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />

        <Input
          label="Password"
          type="password"
          value={formData.password}
          onChange={(e) => handleChange("password", e.target.value)}
        />

        {error && <p className="text-red-500 text-xs">{error}</p>}

        <button type="submit" className="btn-primary w-full">
          SIGN UP
        </button>

        <p className="text-xs mt-3">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => setCurrentPage("login")}
            className="underline"
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default SignUp;