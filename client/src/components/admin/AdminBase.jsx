// AdminBase.jsx
import React from 'react';

import { useAuth } from '../auth/AuthProvider';


const AdminBase = ({ children }) => {
  const { user } = useAuth();

  if (!user || user.roles[0] !== "ROLE_ADMIN") {
    return (
      <div className="redirect-message">
        <p>Anasayfaya yönlendiriliyorsunuz... Lütfen bekleyiniz.</p>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Yükleniyor... </span>
        </div>
      </div>
    );
  }
  return <div>{children}</div>;
};

export default AdminBase;
