import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { useActions } from "./hooks/useActions";
import Navbar from "./components/Navbar/Navbar";
import SignInPage from "./pages/SignInPage/SignInPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import Home from "./pages/Home/Home";
import WritePost from "./pages/WritePost/WritePost";
import Post from "./pages/Post/Post";

const App = () => {
  const { checkAuthAction, getCategoriesAction } = useActions();

  useEffect(() => {
    getCategoriesAction();
    checkAuthAction();
  });

  return (
    <div className="container">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/write" element={<WritePost />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
      </Routes>
    </div>
  );
};

export default App;
