import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./components/home/HomePage";
import LoginPage from "./components/login/LoginPage";
import EditPosts from "./components/loginEdit/EditPosts";
import Nav from "./components/layout/Nav";
import { AuthProvider } from "./context/AuthContext";
import "./App.css";
import PostWikiPage from "./components/loginEdit/posts/PostWikiPage";
import AddWikiPost from "./components/loginEdit/posts/AddWikiPost";
import EditWikiPost from "./components/loginEdit/posts/EditWikiPost";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Nav />

        <div className="container coco">
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/editPosts" exact>
              <EditPosts />
            </Route>
            <Route path="/loginEdit/posts" exact>
              <PostWikiPage />
            </Route>
            <Route path="/loginEdit/posts/add">
              <AddWikiPost />
            </Route>
            <Route path="/loginEdit/posts/edit/:id">
              <EditWikiPost />
            </Route>
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
