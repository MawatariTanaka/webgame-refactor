import React, { useState } from "react";
import { Form, FormGroup, Col, Label, Input, Container } from "reactstrap";
import { Button } from "reactstrap";
import RefreshIcon from "@mui/icons-material/Refresh";
import "../styles/Register.css";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notify = () => toast();

const iniFormValue = {
    userName: "",
    email: "",
    password: "",
};

export default function Register() {
    const [formValue, setFormValue] = useState(iniFormValue);
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
    const handleSubmit = (e) => {
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
            // Get data from API --------------------------------------
            fetch("https://64917a7f2f2c7ee6c2c84970.mockapi.io/User", {
                method: "GET",
                headers: { "content-type": "application/json" },
            })
                .then((res) => {
                    if (res.ok) {
                        return res.json();
                    }
                })
                .then((tasks) => {
                    function checkNameExists(array) {
                        return array.some(
                            (item) => item.userName === formValue.userName
                        );
                    }
                    if (checkNameExists(tasks)) {
                        toast("Username already exists");
                    } else {
                        // ghép ở đây. Sau khi đăng ký thành công thì về trang home
                        toast("Register successful");
                        fetch(
                            "https://64917a7f2f2c7ee6c2c84970.mockapi.io/User",
                            {
                                method: "POST",
                                headers: { "content-type": "application/json" },
                                body: JSON.stringify(formValue),
                            }
                        )
                            .then((res) => {
                                if (res.ok) {
                                    return res.json();
                                }
                            })
                            .then((task) => {
                                console.log(task);
                            })
                            .catch((error) => {});
                    }
                })
                .catch((error) => {});
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
                <Label id="name-page">Register Account</Label>
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
                        Email
                    </Label>
                    <Col sm={10}>
                        <Input
                            type="text"
                            name="email"
                            className="exampleEmail2"
                            onChange={handleChange}
                            value={formValue.email}
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
                <FormGroup row>
                    <Label for="exampleEmail2" className="name-input" sm={2}>
                        Confirm Password
                    </Label>
                    <Col sm={10}>
                        <Input
                            type="password"
                            id="confirmPassword"
                            className="exampleEmail2"
                        />
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <Label
                        id="captcha"
                        for="exampleEmail2"
                        className="name-input"
                        sm={2}
                    >
                        {captcha}
                        <Button
                            id="btn-refresh"
                            onClick={() => refreshString()}
                        >
                            <RefreshIcon />
                        </Button>
                    </Label>
                    <Col sm={10}>
                        <Input
                            type="text"
                            id="captcha-text"
                            className="exampleEmail2"
                        />
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
