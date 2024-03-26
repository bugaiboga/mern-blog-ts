import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Input from "../../components/Input/Input";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { AuthActionTypes } from "../../types/TAuth";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    repassword: "",
    username: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { signUpAction } = useActions();
  const { errorAuth, loading, user } = useTypedSelector((state) => state.auth);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signUpAction(formData);
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
        <h1 className="title">Sign Up</h1>
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
              type="text"
              placeholder="Username"
              error={errorAuth?.typeError}
              name="username"
            />
            <Input
              handleChange={handleChange}
              type="password"
              placeholder="Password"
              name="password"
              error={errorAuth?.typeError}
            />
            <Input
              handleChange={handleChange}
              type="password"
              placeholder="Confirm password"
              name="repassword"
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
            <p>
              you have account?
              <span onClick={() => navigate("/sign-in")}>sign in</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
