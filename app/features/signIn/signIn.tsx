import React, { useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router';
import { company } from './companyData';

function SignIn() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Check credentials against mock data
    const user = company.find(
      (u) =>
        u.username === credentials.username && u.password === credentials.password
    );

    if (user) {
      console.log("Login successful");
      localStorage.setItem("isAuthenticated", "true");
      navigate("/");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <MDBContainer fluid className="flex justify-center items-center min-h-screen">
      <MDBCard className="text-black m-5 w-[600px]" style={{ borderRadius: '25px' }}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol
              md="10"
              lg="6"
              className="order-2 order-lg-1 d-flex flex-column align-items-center"
            >
              {/* Sign In Title */}
              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign In</p>

              {/* Form */}
              <form onSubmit={handleLogin}>
                {/* Username Input */}
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="envelope me-3" size="lg" />
                  <MDBInput
                    label="Your Username"
                    id="form2"
                    type="text"
                    value={credentials.username}
                    onChange={(e) =>
                      setCredentials({ ...credentials, username: e.target.value })
                    }
                  />
                </div>

                {/* Password Input */}
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="lock me-3" size="lg" />
                  <MDBInput
                    label="Password"
                    id="form3"
                    type="password"
                    value={credentials.password}
                    onChange={(e) =>
                      setCredentials({ ...credentials, password: e.target.value })
                    }
                  />
                </div>

                {/* Sign In Button */}
                <MDBBtn type="submit" className="mb-4" size="lg">
                  Login
                </MDBBtn>
              </form>

              {/* Error Message */}
              {error && <p className="text-danger">{error}</p>}
            </MDBCol>

            {/* Image */}
            <MDBCol md="10" lg="6" className="order-1 order-lg-2 d-flex align-items-center">
              <MDBCardImage
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                fluid
              />
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default SignIn;
