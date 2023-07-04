import React, { useState, useContext } from "react";
import { Form, FormGroup, Col, Label, Input, Container } from "reactstrap";
import { Button } from "reactstrap";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import RefreshIcon from "@mui/icons-material/Refresh";
import "../styles/Register.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth, db } from "../contexts/FirebaseContext";
import { doc, setDoc } from "firebase/firestore";
import { ChatContext } from "../contexts/ChatContext";

const initFormValue = {
    userName: "",
    email: "",
    password: "",
};

export default function Register() {
    const [formValue, setFormValue] = useState(initFormValue);
    const { dispatch } = useContext(ChatContext);
    const navigate = useNavigate();

    const confirmPassword = document.querySelector("#confirmPassword");
    const handleChange = (e) => {
        const { value, name } = e.target; // value và name lấy trong ô input
        setFormValue({
            ...formValue,
            [name]: value,
        });
    };

    // Tao ma captcha --------------------------------------------------------------------------
    const randomString = Math.random().toString(36).slice(8);
    const [captcha, setCaptcha] = useState(randomString);
    const captchaText = document.querySelector("#captcha-text");
    const captchaActive = document.querySelector("#captcha");

    const refreshString = () => {
        setCaptcha(Math.random().toString(36).slice(8));
    };
    const [checkUser, setCheckUser] = useState([]);

    //-------------------------------------------------------------------------------------------------------------------
    const handleSubmit = async (e) => {
        e.preventDefault();
        // validate email
        const pattern =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        // validate username
        const usernameRegex = /^[a-zA-Z0-9_-]{4,16}$/;

        if (
            formValue.userName == "" ||
            formValue.email == "" ||
            formValue.password == "" ||
            confirmPassword.value == ""
        ) {
            toast("Please fill full information!");
        } else if (captchaActive.textContent !== captchaText.value) {
            toast("Enter wrong captcha, please fill again");
        } else if (!formValue.email.match(pattern)) {
            toast("Email not valid");
        } else if (!formValue.userName.match(usernameRegex)) {
            toast("Username not valid");
        } else if (formValue.password !== confirmPassword.value) {
            toast("Password and confirm password not match");
        } else {
            try {
                await createUserWithEmailAndPassword(
                    auth,
                    formValue.email,
                    formValue.password
                ).then(async () => {
                    const user = auth.currentUser;
                    await updateProfile(user, {
                        displayName: formValue.userName,
                    });
                    const userRef = doc(db, "users", user.uid);
                    await setDoc(userRef, {
                        ban: [],
                        ban_chat: [],
                        email: user.email,
                        id: user.uid,
                        photoURL: "https://picsum.photos/200/300?random=1",
                        point: 100,
                        username: formValue.userName,
                    });
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
                marginTop: "100px",
            }}
        >
            <Form onSubmit={handleSubmit} id="form-container">
                <Label id="name-page">Register Account</Label>
                <FormGroup
                    row
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Label
                        for="exampleEmail"
                        sm={3}
                        className="name-input"
                        size="lg"
                    >
                        Username
                    </Label>
                    <Col sm={8}>
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
                <FormGroup
                    row
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Label for="exampleEmail2" className="name-input" sm={3}>
                        Email
                    </Label>
                    <Col sm={8}>
                        <Input
                            type="text"
                            name="email"
                            className="exampleEmail2"
                            onChange={handleChange}
                            value={formValue.email}
                        />
                    </Col>
                </FormGroup>
                <FormGroup
                    row
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Label for="exampleEmail2" className="name-input" sm={3}>
                        Password
                    </Label>
                    <Col sm={8}>
                        <Input
                            type="password"
                            name="password"
                            className="exampleEmail2"
                            onChange={handleChange}
                            value={formValue.password}
                        />
                    </Col>
                </FormGroup>
                <FormGroup
                    row
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Label for="exampleEmail2" className="name-input" sm={3}>
                        Confirm Password
                    </Label>
                    <Col sm={8}>
                        <Input
                            type="password"
                            id="confirmPassword"
                            className="exampleEmail2"
                        />
                    </Col>
                </FormGroup>

                <FormGroup
                    row
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Label className="name-input" sm={3}>
                        Validate
                    </Label>
                    <Col sm={3}>
                        <Input
                            style={{ width: "100%" }}
                            type="text"
                            id="captcha-text"
                            className="exampleEmail2"
                        />
                    </Col>
                    <Label
                        id="captcha"
                        for="exampleEmail2"
                        className="name-input"
                        sm={2}
                    >
                        {captcha}
                    </Label>
                    <Col
                        sm={3}
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Button
                            id="btn-refresh"
                            onClick={() => refreshString()}
                            color="primary"
                            outline
                        >
                            <RefreshIcon />
                        </Button>
                    </Col>
                </FormGroup>

                <Button id="btn-register" color="primary" outline>
                    Register
                </Button>
            </Form>
            <div>
                <ToastContainer style={{ fontSize: "20px" }} />
            </div>
        </Container>
    );
}
