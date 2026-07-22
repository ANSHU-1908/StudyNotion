import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserDetailsAPI, updateProfileAPI } from "../services/profileAPI";
import toast from "react-hot-toast";

const Profile = () => {
  const { token } = useSelector((s) => s.auth);
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({ firstName: "", lastName: "", bio: "" });
  const [profilePicture, setProfilePicture] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUserDetailsAPI(token)
      .then((res) => {
        setProfile(res.data.user);
        setForm({ firstName: res.data.user.firstName, lastName: res.data.user.lastName, bio: res.data.user.bio || "" });
      });
  }, [token]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([k, v]) => formData.append(k, v));
      if (profilePicture) formData.append("profilePicture", profilePicture);
      const res = await updateProfileAPI(formData, token);
      setProfile(res.data.user);
      toast.success("Profile updated!");
    } catch (err) {
      toast.error("Update failed");
    }
    setLoading(false);
  };

  if (!profile) return <div style={{ padding: "3rem", textAlign: "center", color: "var(--text-secondary)" }}>Loading...</div>;

  return (
    <div style={{ padding: "2rem 5%", maxWidth: "800px", margin: "0 auto" }}>
      <h1 className="section-title">My Profile</h1>
      <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "16px", padding: "2rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "2rem" }}>
          <img src={profile.profilePicture || `https://ui-avatars.com/api/?name=${profile.firstName}+${profile.lastName}&background=F6C90E&color=000`} alt="Profile" style={{ width: 80, height: 80, borderRadius: "50%", objectFit: "cover", border: "3px solid var(--primary)" }} />
          <div>
            <h2>{profile.firstName} {profile.lastName}</h2>
            <p style={{ color: "var(--text-secondary)" }}>{profile.email}</p>
            <span className="badge badge-info">{profile.role}</span>
          </div>
        </div>

        <form onSubmit={handleUpdate}>
          <div className="form-row">
            <div className="form-group">
              <label>First Name</label>
              <input type="text" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input type="text" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
            </div>
          </div>
          <div className="form-group">
            <label>Bio</label>
            <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} placeholder="Tell us about yourself..." />
          </div>
          <div className="form-group">
            <label>Profile Picture</label>
            <input type="file" accept="image/*" onChange={(e) => setProfilePicture(e.target.files[0])} />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
