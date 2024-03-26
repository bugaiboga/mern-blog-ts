import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Button from "../Button/Button";
import userImg from "../../assets/icons/user.svg";
import logoutImg from "../../assets/icons/logout.svg";
import settingsImg from "../../assets/icons/settings.svg";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { AuthActionTypes } from "../../types/TAuth";

const SignActions: React.FC = () => {
  const userMenuRef = useRef<HTMLDivElement | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const { user } = useTypedSelector((state) => state.auth);

  const dispatch = useDispatch();

  const logout = () => {
    dispatch({ type: AuthActionTypes.SET_LOGOUT });

    navigate("/auth");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="sign">
      {user ? (
        <div className="user" ref={userMenuRef}>
          <img
            className="icon"
            src={userImg}
            alt="avatar"
            onClick={() => setShowMenu(!showMenu)}
          />
          {showMenu && (
            <ul className="user__menu">
              <div className="user__menu-top">
                <li className="user__action">
                  <img className="icon" src={userImg} alt="avatar" />
                  <p>lorem@mail.ru</p>
                </li>
              </div>
              <div className="user__menu-actions">
                <li className="user__action">
                  <img
                    onClick={logout}
                    className="icon"
                    src={logoutImg}
                    alt="logout"
                  />
                  <p>logout</p>
                </li>
                <li className="user__action">
                  <img className="icon" src={settingsImg} alt="setting" />
                  <p>settings</p>
                </li>
              </div>
            </ul>
          )}
        </div>
      ) : (
        <div className="sign-buttons">
          <Button onClick={() => navigate("/sign-in")} variant="outlined">
            sign-in
          </Button>
          <Button onClick={() => navigate("sign-up")} variant="contained">
            sign-up
          </Button>
        </div>
      )}
    </div>
  );
};

export default SignActions;
