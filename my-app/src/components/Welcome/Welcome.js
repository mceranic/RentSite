import React, { Component } from "react";
import Modal from "react-modal";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { withRouter, Redirect } from "react-router-dom";
import "./Welcome.css"
import config from "../../config";
import axios from "axios";
class Welcome extends React.Component {
    constructor() {
        super();
        this.state = {
            modalIsOpen: false
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    openModal() {
        this.setState({ modalIsOpen: true });
    }
    closeModal() {
        this.setState({ modalIsOpen: false });
    }
    render() {
        return (
            <div className="header-welcome " id="home">


                <div className="container">
                    <h1 style={{fontSize: "60px", padding: "0", margin: "0" }}>Dobrodošli nazad </h1>
                    <h1 style={{ fontSize: "40px", padding: "0", marginTop: "20px" }}>Hana</h1>
                    <a className=" btn login-static modal-trigger" style={{ marginTop: "50px" }}  onClick={this.openModal}>
                        Dodaj oglas
					</a>
                    <br></br>
                    <a className=" btn login-static modal-trigger" style={{ marginTop: "50px" }} href="http://localhost:3000/">
                        LOGOUT
					</a>
                </div>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                >
                    <div className="row">
                        <a href="#" class="close" onClick={this.closeModal}></a>
                        <Formik
                            initialValues={{
                                firstName: "",
                                lastName: "",
                                phone:"",
                                email:"",
                                faculty:"",
                                address:""
                            }}
                            onSubmit={(values, { setSubmitting }) => {
                                axios
                                    .post("http://localhost:9000/api/roommates", values, {
                                        headers: {
                                            "Content-Type": "application/json",
                                            Authorization: config.token
                                        }
                                    })
                                    .then(resp => {
                                        console.log(config.token);
                                        console.log(resp.data);
                                    })
                                    .catch(err => {
                                        console.log(err);

                                    });

                            }}
                        >
                            {({ errors, touched }) => (
                                <Form>
                                    <div className="input-field">
                                        <Field
                                            name="firstName"
                                            id="firstName"
                                            type="text"
                                        />
                                        <label htmlFor="firstName">First Name</label>
                                    </div>
                                    <div className="input-field">
                                        <Field
                                            name="lastName"
                                            id="lastName"
                                            type="text"
                                        />
                                        <label htmlFor="lastName">Last Name</label>
                                    </div>
                                    <div className="input-field">
                                        <Field
                                            name="phone"
                                            id="phone"
                                            type="text"
                                        />
                                        <label htmlFor="phone">Phone</label>
                                    </div>
                                    <div className="input-field">
                                        <Field
                                            name="email"
                                            id="email"
                                            type="text"
                                        />
                                        <label htmlFor="email">Email</label>
                                    </div>
                                    <div className="input-field">
                                        <Field
                                            name="faculty"
                                            id="faculty"
                                            type="text"
                                        />
                                        <label htmlFor="faculty">Faculty</label>
                                    </div>
                                    <div className="input-field">
                                        <Field
                                            name="address"
                                            id="address"
                                            type="text"
                                        />
                                        <label htmlFor="address">Address</label>
                                    </div>
                                    <div id="loginbtn">
                                        <button type="submit" className=" btn ">
                                            Objavi
                                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </Modal>
            </div>

        );
    }
}

export default withRouter(Welcome);










