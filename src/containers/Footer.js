import React from "react";
import dossierLogo from "./../assets/images/dossier-logo-blue-h_4.png";

function Footer() {
  return (
    <footer className="footer mt-auto py-3">
      <div className="container">
        <div className="footer-copyright text-center py-3">
          © 2021 Copyright
          <a href="https://www.dossier.com/">
            <img src={dossierLogo} alt="Dossier Solutions" style={{width:200, height:50}}/>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
