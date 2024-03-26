import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Input from "../../components/Input/Input";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { AuthActionTypes } from "../../types/TAuth";

const SignInPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { signInAction } = useActions();
  const { errorAuth, loading, user } = useTypedSelector((state) => state.auth);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signInAction(formData);
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
    dispatch({ type: AuthActionTypes.SET_ERROR, payload: null });
  }, [dispatch, user, navigate]);

  if (loading) {
    return <p>loading...</p>;
  }

  return (
    <div className="sign-page">
      <div className="wrapper">
        <h1 className="title">Log in</h1>
        <p className="subtitle">Welcome back!</p>
        <div className="form__wrapper">
          {errorAuth && <div className="form__error">{errorAuth.message}</div>}
          <form className="form">
            <Input
              handleChange={handleChange}
              type="text"
              placeholder="Email"
              name="email"
              error={errorAuth?.typeError}
            />
            <Input
              handleChange={handleChange}
              type="password"
              placeholder="Password"
              name="password"
              error={errorAuth?.typeError}
            />
            <input
              onClick={handleSubmit}
              className="submit"
              type="submit"
              value={"submit"}
            />
          </form>
          <div className="links">
            <p onClick={() => navigate("/forgot")}>Forgot your password?</p>
            <p onClick={() => navigate("/sign-up")}>Sign up</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
