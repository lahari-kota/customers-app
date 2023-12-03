import React from "react";

function LoginPage() {
  return (
    <div className="login-container">
      <div className="login-container-center wrapper">
        <h1>Login Page</h1>
        <div className="login-form">
          <div className="input-container">
            <input type="text" placeholder="login id" />
          </div>
          <div className="input-container">
            <input type="text" placeholder="password" />
          </div>
          <div className="btn-container">
            <button className="login-submit">Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
