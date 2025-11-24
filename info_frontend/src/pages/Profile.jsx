import React, { useEffect, useState } from "react";

export default function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    occupation: "",
    ezeraaId: "",
    currency: ""
  });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const savedProfile = localStorage.getItem("userProfile");
    if (savedProfile) setProfile(JSON.parse(savedProfile));
  }, []);

  const handleChange = (e) => setProfile({ ...profile, [e.target.name]: e.target.value });
  const handleSave = () => {
    localStorage.setItem("userProfile", JSON.stringify(profile));
    setEditing(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Profile</h2>
      <div style={{
        background: "#fff", padding: "20px", borderRadius: "10px", width: "350px"
      }}>
        {!editing ? (
          <>
            <p><strong>Name:</strong> {profile.name || "Not updated"}</p>
            <p><strong>Email:</strong> {profile.email || "Not updated"}</p>
            <p><strong>Phone:</strong> {profile.phone || "Not updated"}</p>
            <p><strong>Occupation:</strong> {profile.occupation || "Not updated"}</p>
            <p><strong>Ezeraa ID:</strong> {profile.ezeraaId || "Not updated"}</p>
            <p><strong>Currency:</strong> {profile.currency || "Not selected"}</p>
            <button onClick={() => setEditing(true)}>Edit Profile</button>
          </>
        ) : (
          <>
            <input name="name" value={profile.name} onChange={handleChange} placeholder="Name"/>
            <input name="email" value={profile.email} onChange={handleChange} placeholder="Email"/>
            <input name="phone" value={profile.phone} onChange={handleChange} placeholder="Phone"/>
            <input name="occupation" value={profile.occupation} onChange={handleChange} placeholder="Occupation"/>
            <input name="ezeraaId" value={profile.ezeraaId} onChange={handleChange} placeholder="Ezeraa ID"/>
            <select name="currency" value={profile.currency} onChange={handleChange}>
              <option value="">Select Currency</option>
              <option value="INR ₹">INR ₹</option>
              <option value="USD $">USD $</option>
              <option value="EUR €">EUR €</option>
              <option value="GBP £">GBP £</option>
            </select>
            <button onClick={handleSave}>Save Profile</button>
          </>
        )}
      </div>
    </div>
  );
}
