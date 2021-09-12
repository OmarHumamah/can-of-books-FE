import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Button from "react-bootstrap/Button";

function LogoutButton() {
  const {
    isAuthenticated,
    logout,
  } = useAuth0();

  return isAuthenticated && (
    <Button variant="success" style={{marginLeft : '700px'}} onClick={() => {
      logout({ returnTo: window.location.origin });
    }}>Log out</Button>
  );
}

export default LogoutButton;