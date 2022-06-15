import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container, Row, Col, Card } from "react-bootstrap";
import Axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

const RegisterComp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const formDataHandler = (e) => {
    e.preventDefault();
    const userData = {
      fullName,
      email,
      password,
    };

    Axios.post("/api/auth/register", userData)
      .then((result) => {
        if (result.data.success) {
          toast.success(result.data.success);
          localStorage.setItem("auth_token", result.data.token);
        } else if (result.data.error) {
          toast.error(result.data.error);
        }
      })
      .catch((err) => {
        toast.error(err.response.data.error);
      });
  };
  return (
    <div>
      <Toaster />
      <Container className="py-4 mt-4">
        <Row>
          <Col className="mx-auto" md={8}>
            <Card className="p-4 shadow">
              <h3 className="py-2 text-center">Register Here</h3>
              <Form onSubmit={formDataHandler}>
                <Form.Group className="mb-3">
                  <Form.Label>FullName</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter fullname"
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </Form.Group>
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
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Form.Group>
                <p>
                  Already have an account? <Link to="/login">Login</Link>
                </p>
                <Button variant="primary" type="submit">
                  Register
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RegisterComp;
