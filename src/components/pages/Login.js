import React, { Component } from "react";
import Field from "../Common/Field";
import { withFormik } from "formik";
import { connect } from "react-redux";
import * as Yup from "yup";
import * as AuthActions from "../../store/actions/authActions";

const fields = [
  {
    name: "email",
    elementName: "input",
    type: "text",
    placeholder: "Your Email",
  },
  {
    name: "password",
    elementName: "input",
    type: "password",
    placeholder: "Your Password",
  },
];

class Login extends Component {
  render() {
    return (
      <div className="login-page">
        <div className="container">
          <div className="login-form">
            <div className="row">
              <h1>Login</h1>
            </div>
            <div>
              <form
                className="row"
                onSubmit={(e) => {
                  e.preventDefault();
                  this.props.login(
                    this.props.values.email,
                    this.props.values.password
                  );
                }}
              >
                {fields.map((f, i) => {
                  return (
                    <div className="col-md-12" key={i}>
                      <Field
                        key={i}
                        {...f}
                        value={this.props.values[f.name]}
                        name={f.name}
                        onChange={this.props.handleChange}
                        onBlur={this.props.handleBlur}
                        touched={this.props.touched[f.name]}
                        errors={this.props.errors[f.name]}
                      />
                    </div>
                  );
                })}
                <div className="col-md-12">
                  <button type="submit" className="btn btn-primary">
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToPros = (dispatch) => {
  return {
    login: (email, pass) => {
      dispatch(AuthActions.login(email, pass));
    },
  };
};

export default connect(mapStatetoProps, mapDispatchToPros)(withFormik({
  mapPropsToValues: () => ({
    email: "",
    password: "",
  }),
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email("Email is invalid")
      .required("You need to login with email address"),
    password: Yup.string().required("You need to enter your password."),
  }),
  handleSubmit: (values, { setSubmitting }, login) => {
    console.log("Login attempt", values);
    // login(values.email, values.password);
  },
})(Login));
