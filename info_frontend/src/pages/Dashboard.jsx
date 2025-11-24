import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    occupation: "",
    ezeraaId: "",
    currency: ""
  });

  const [editing, setEditing] = useState(false);

  // Load profile from localStorage
  useEffect(() => {
    const savedProfile = localStorage.getItem("userProfile");
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // Save profile to localStorage
  const handleSave = () => {
    localStorage.setItem("userProfile", JSON.stringify(profile));
    setEditing(false);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>My Profile</h2>

      {/* PROFILE CARD — Only ONE */}
      <div style={styles.card}>
        {!editing ? (
          <>
            <p><strong>Name:</strong> {profile.name || "Not updated"}</p>
            <p><strong>Email:</strong> {profile.email || "Not updated"}</p>
            <p><strong>Phone:</strong> {profile.phone || "Not updated"}</p>
            <p><strong>Occupation:</strong> {profile.occupation || "Not updated"}</p>
            <p><strong>Ezeraa ID:</strong> {profile.ezeraaId || "Not updated"}</p>
            <p><strong>Currency:</strong> {profile.currency || "Not selected"}</p>

            <button style={styles.button} onClick={() => setEditing(true)}>
              Edit Profile
            </button>
          </>
        ) : (
          <>
            <input
              style={styles.input}
              type="text"
              name="name"
              placeholder="Name"
              value={profile.name}
              onChange={handleChange}
            />
            <input
              style={styles.input}
              type="email"
              name="email"
              placeholder="Email"
              value={profile.email}
              onChange={handleChange}
            />
            <input
              style={styles.input}
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={profile.phone}
              onChange={handleChange}
            />
            <input
              style={styles.input}
              type="text"
              name="occupation"
              placeholder="Occupation"
              value={profile.occupation}
              onChange={handleChange}
            />
            <input
              style={styles.input}
              type="text"
              name="ezeraaId"
              placeholder="Ezeraa ID"
              value={profile.ezeraaId}
              onChange={handleChange}
            />

            {/* Currency Added Here */}
            <select
              style={styles.input}
              name="currency"
              value={profile.currency}
              onChange={handleChange}
            >
              <option value="">Select Currency</option>
              <option value="INR ₹">INR ₹</option>
              <option value="USD $">USD $</option>
              <option value="EUR €">EUR €</option>
              <option value="GBP £">GBP £</option>
            </select>

            <button style={styles.saveButton} onClick={handleSave}>
              Save Profile
            </button>
          </>
        )}
      </div>
    </div>
  );
};

// ------------------------------------------
// STYLES
// ------------------------------------------
const styles = {
  container: {
    padding: "20px",
    width: "100%",
  },
  heading: {
    textAlign: "left",
    color: "#333",
  },
  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    width: "350px",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "8px 0",
    borderRadius: "8px",
    border: "1px solid gray",
  },
  button: {
    background: "green",
    color: "white",
    padding: "10px",
    width: "100%",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "10px",
  },
  saveButton: {
    background: "blue",
    color: "white",
    padding: "10px",
    width: "100%",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "10px",
  },
};

export default Dashboard;
