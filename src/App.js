import React, { Component } from "react";
import PageWrapper from "./components/PageWrapper";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

// Pages
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import Login from "./components/pages/Login";
import Blog from "./components/pages/Blog";
import Single from "./components/pages/Single";
import Signup from "./components/pages/Signup";

// Admin Pages
import Dashboard from "./components/pages/Admin/Dashboard";
import Posts from "./components/pages/Admin/Posts";
import AddPost from "./components/pages/Admin/AddPost";
import Users from "./components/pages/Admin/Users";

import AdminWrapper from "./components/AdminWrapper";
import LoginWrapper from "./components/LoginWrapper";

class App extends Component {
  render() {
    return (
      <Router>
        <Route
          path="/admin/users"
          render={(props) => {
            return (
              <div>
                {this.props.auth.token ? (
                  <AdminWrapper>
                    <Users />
                  </AdminWrapper>
                ) : (
                  <LoginWrapper>
                    <Login />
                  </LoginWrapper>
                )}
              </div>
            );
          }}
        />
        <Route
          exact={true}
          path="/admin/posts/:view/:id"
          render={(props) => {
            return (
              <div>
                {this.props.auth.token ? (
                  <AdminWrapper>
                    <AddPost />
                  </AdminWrapper>
                ) : (
                  <LoginWrapper>
                    <Login />
                  </LoginWrapper>
                )}
              </div>
            );
          }}
        />
        <Route
          exact={true}
          path="/admin/posts/:view"
          render={(props) => {
            return (
              <div>
                {this.props.auth.token ? (
                  <AdminWrapper>
                    <AddPost />
                  </AdminWrapper>
                ) : (
                  <LoginWrapper>
                    <Login />
                  </LoginWrapper>
                )}
              </div>
            );
          }}
        />
        <Route
          exact={true}
          path="/admin/posts"
          render={(props) => {
            return (
              <div>
                {this.props.auth.token ? (
                  <AdminWrapper>
                    <Posts />
                  </AdminWrapper>
                ) : (
                  <LoginWrapper>
                    <Login />
                  </LoginWrapper>
                )}
              </div>
            );
          }}
        />
        <Route
          exact={true}
          path="/signup"
          render={(props) => {
            if (this.props.auth.token) {
              return <Redirect to="/" />;
            } else {
              return (
                <LoginWrapper>
                  <Signup />
                </LoginWrapper>
              );
            }
          }}
        />
        <Route
          exact={true}
          path="/login"
          render={(props) => {
            if (this.props.auth.token) {
              return <Redirect to="/" />;
            } else {
              return (
                <LoginWrapper>
                  <Login />
                </LoginWrapper>
              );
            }
          }}
        />
        <Route
          exact={true}
          path="/admin"
          render={(props) => {
            return (
              <div>
                {this.props.auth.token ? (
                  <AdminWrapper>
                    <Dashboard />
                  </AdminWrapper>
                ) : (
                  <LoginWrapper>
                    <Login />
                  </LoginWrapper>
                )}
              </div>
            );
          }}
        />
        <Route
          exact={true}
          path="/"
          render={(props) => (
            <PageWrapper>
              <Home {...props} />
            </PageWrapper>
          )}
        />
        <Route
          exact={true}
          path="/blog/:slug"
          render={(props) => (
            <PageWrapper>
              <Single {...props} />
            </PageWrapper>
          )}
        />
        <Route
          exact={true}
          path="/blog"
          render={(props) => (
            <PageWrapper>
              <Blog {...props} />
            </PageWrapper>
          )}
        />
        <Route
          path="/about"
          render={(props) => (
            <PageWrapper>
              <About {...props} />
            </PageWrapper>
          )}
        />
        <Route
          path="/contact"
          render={(props) => (
            <PageWrapper>
              <Contact {...props} />
            </PageWrapper>
          )}
        />
      </Router>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
