import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Form, FormGroup, Col, Label, Input, Container } from "reactstrap";
import { Button } from "reactstrap";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Login.css";
import { auth } from "../contexts/FirebaseContext";
import { ChatContext } from "../contexts/ChatContext";

const iniFormValue = {
    userName: "",
    password: "",
};

export default function Login() {
    const [formValue, setFormValue] = useState(iniFormValue);
    const { dispatch } = useContext(ChatContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { value, name } = e.target;
        setFormValue({
            ...formValue,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formValue.userName == "" || formValue.password == "") {
            toast("Please provide complete information.");
        } else {
            try {
                await signInWithEmailAndPassword(
                    auth,
                    formValue.userName,
                    formValue.password
                ).then(() => {
                    dispatch({ type: "RESET" });
                    navigate("/");
                });
            } catch (error) {
                toast(error.message);
            }
        }
    };

    return (
        <Container
            style={{
                display: "flex",
                justifyContent: "center",
                padding: "5rem",
            }}
        >
            <Form onSubmit={handleSubmit} id="form-container">
                <Label id="name-page">Login Page</Label>
                <FormGroup row>
                    <Label
                        for="exampleEmail"
                        sm={2}
                        className="name-input"
                        size="lg"
                    >
                        Username
                    </Label>
                    <Col sm={10}>
                        <Input
                            type="text"
                            name="userName"
                            className="exampleEmail2"
                            bsSize="lg"
                            onChange={handleChange}
                            value={formValue.userName}
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="exampleEmail2" className="name-input" sm={2}>
                        Password
                    </Label>
                    <Col sm={10}>
                        <Input
                            type="password"
                            name="password"
                            className="exampleEmail2"
                            onChange={handleChange}
                            value={formValue.password}
                        />
                    </Col>
                </FormGroup>
                <Button id="btn-register" color="primary" outline>
                    Login
                </Button>
            </Form>
            <div>
                <ToastContainer style={{ fontSize: "20px" }} />
            </div>
        </Container>
    );
}
