import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";

const Profile = () => {
  const { getProfile, logout } = useContext(UserContext); 
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await getProfile();
      setProfile(data);
    };
    fetchProfile();
  }, [getProfile]);

  if (!profile) {
    return <p>Cargando perfil...</p>;
  }

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">Perfil del Usuario</h2>
        <p><strong>Email:</strong> {profile.email}</p>
        <button className="btn btn-danger w-100 mt-3" onClick={logout}>
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default Profile;