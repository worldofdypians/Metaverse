import React, { useEffect, useState } from "react";
import { LoginCard } from "../../Components/LoginCard";
import LoginWrapper from "../../Components/LoginWrapper/LoginWrapper";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Login from "../Login/Login";
import SingUp from "../SingUp/SingUp";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../Utils.js/Auth/AuthDetails";
import ErrorAlert from "../../Components/ErrorAlert/ErrorAlert";
import axios from "axios";

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    height: 1,
  },
  "& .MuiTabs-indicatorSpan": {
    width: "100%",
    backgroundColor: "#F952B9",
  },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: 20,
    marginRight: theme.spacing(1),
    color: "rgba(255, 255, 255, 0.7)",
    fontFamily: "Poppins",
    "&.Mui-selected": {
      color: "#fff",
      background: "rgba(255, 255, 255, 0.1)",
      fontWeight: "bold",
    },
    "&.Mui-focusVisible": {
      backgroundColor: "rgba(100, 95, 228, 0.32)",
    },
  })
);

function Auth({ isConnected, coinbase, onSuccessLogin, onNewsLetterClick }) {
  const { isAuthenticated, loginError, setLoginValues, playerId } = useAuth();
  const [checked, setIschecked] = useState(false);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setLoginValues(() => {
      return {
        isLoginIn: false,
        loginError: null,
      };
    });
  };

  if (isAuthenticated && playerId) {
    return <Navigate to={"/account"} />;
  }

  // if (isAuthenticated && !playerId) {
  //   return <Navigate to={"/player"} />;
  // }

  // if (!playerId) {
  //   return <Navigate to={"/player"} />;
  // }

  const handleFirstTask = async (wallet) => {
    const result2 = await axios
      .get(`https://api.worldofdypians.com/api/olympiad/task1/${wallet}`)
      .catch((e) => {
        console.error(e);
      });
    if (result2 && result2.status === 200) {
      console.log(result2);
    }
  };

  return (
    <div
      className="d-flex flex-column gap-1 align-items-center"
      style={{ margin: "6rem 0rem" }}
    >
      <LoginWrapper>
        <LoginCard
          containerStyles={{
            height: 500,
          }}
          cardStyles={{
            height: 470,
          }}
        >
          <StyledTabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            aria-label="styled tabs example"
          >
            <StyledTab label="Sign In" />
            <StyledTab label="Create Account" />
          </StyledTabs>
          {value === 0 && (
            <Login
              onSuccessLogin={() => {
                // handleFirstTask(coinbase);
                console.log("success");
                onSuccessLogin();
              }}
            />
          )}
          {value === 1 && <SingUp />}
        </LoginCard>
        <ErrorAlert error={loginError} />
      </LoginWrapper>
      {/* {value === 1 && (
        <div className="d-flex align-items-center gap-2">
          <span className="text-secondary">Subscribe to newsletter</span>
          <input
            type="checkbox"
            onChange={() => {
              setIschecked(!checked);
              onNewsLetterClick(!checked);
            }}
            checked={checked}
          />
        </div>
      )} */}
    </div>
  );
}

export default Auth;
