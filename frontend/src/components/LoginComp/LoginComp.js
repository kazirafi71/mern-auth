import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container, Row, Col, Card } from "react-bootstrap";
import Axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login";
import { Link, useNavigate } from "react-router-dom";

const LoginComp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const formDataHandler = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };

    Axios.post("/api/auth/login", userData)
      .then((result) => {
        if (result.data.success) {
          toast.success(result.data.success);
          localStorage.setItem("auth_token", result.data.token);
          navigate("/");
        } else if (result.data.error) {
          toast.error(result.data.error);
        }
      })
      .catch((err) => {
        toast.error(err.response.data.error);
      });
  };

  const onSuccess = (response) => {
    const { name, email } = response.profileObj;
    const userData = {
      fullName: name,
      email: email,
    };
    Axios.post("/api/auth/google-login", userData)
      .then((result) => {
        // console.log(result);
        if (result.data.success) {
          toast.success(result.data.success);
          localStorage.setItem("auth_token", result.data.token);
          navigate("/");
        } else if (result.data.error) {
          toast.error(result.data.error);
        }
      })
      .catch((err) => {
        toast.error(err.response.data.error);
      });
  };
  const onFailure = (response) => {
    console.log(response);
  };

  return (
    <div>
      <Toaster />
      <Container className="py-4 mt-4">
        <Row>
          <Col className="mx-auto" md={8}>
            <Card className="p-4 shadow">
              <h3 className="py-2 text-center">Login Here</h3>
              <div id="signInButton" className="my-3">
                {" "}
                <GoogleLogin
                  clientId="324582548581-une93ids37vbpc0qs6fgpgpcr3t8rvst.apps.googleusercontent.com"
                  buttonText="Login With Google"
                  onSuccess={onSuccess}
                  onFailure={onFailure}
                  cookiePolicy={"single_host_origin"}
                />
              </div>

              <Form onSubmit={formDataHandler}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <p>
                  Don't have an account? <Link to="/register">Register</Link>
                </p>

                <Button variant="primary" type="submit">
                  Login
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginComp;
