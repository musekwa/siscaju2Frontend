import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
// import { reset, login } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../components/Spinner";
import { BootstrapButton } from "../../components/Buttons";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { LockOpen } from "@mui/icons-material";
import { purple } from "@mui/material/colors";
import { Link, Navigate } from "react-router-dom";
// import { useLoginMutation } from '../../features/api/apiSlice'
import { useDispatch, useSelector } from "react-redux";
import { reset, resetUser, login } from '../../features/users/userSlice'

const styledTextField = {
  "& label.Mui-focused": {
    color: "rebeccapurple"
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "rebeccapurple"
    }
  }
}


function Login() {

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = userData;

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector((state)=>state.user)


 
    useEffect(() => {
      if (isSuccess) {
        toast.success(`Bem-vindo de volta, ${user?.fullname.split(" ")[0]}`, {
          autoClose: 5000,
          position: toast.POSITION.TOP_CENTER,
        });
        navigate("/", { state: { user } });
      }
      else if (isError || message || (user && !user?.fullname)) {
        toast.error("Credenciais inválidas!", {
          autoClose: 5000,
          position: toast.POSITION.TOP_CENTER,
        });
      }
      dispatch(reset())
    }, [isSuccess, user, navigate, isError, message, dispatch]);



  // validating email
  const validateEmail = (email) => {
    const pattern =
      /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
    const result = pattern.test(email);
    if (result === false) {
      // if the email is invalid
      return true;
    }
    // if the email is valid
    return false;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (validateEmail(email) || !password) {
      toast.error("Email e password inválidos", {
        autoClose: 5000,
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      const userData = {
        email,
        password,
      };

      if (!isLoading){
        dispatch(login(userData));
      }
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "80vh",
      }}
    >
    
      {/* {(isError || message) && (
        <Box sx={{ width: "200px", height: "40px" }}> Algo deu errado!</Box>
      )} */}

      <Paper sx={{ width: "400px", height: "80vh", position: "relative" }}>
        <Box sx={{ postion: "absolute", marginTop: "25px" }}>
          <LockOpen fontSize="large" sx={{ color: "rebeccapurple" }} />
          <Typography
            variant="h6"
            fontWeight={200}
            component="p"
            sx={{ p: "10px 0px 5px 0px" }}
          >
            Login
          </Typography>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={onSubmit}
          >
            <div style={{ padding: "30px 40px 15px 40px" }}>
              <TextField
                sx={styledTextField}
                required
                fullWidth
                label="Email"
                id="fullWidth-1"
                name="email"
                type="email"
                placeholder="Email"
                size="small"
                value={email}
                onChange={(event) => {
                  setUserData((prevState) => ({
                    ...prevState,
                    email: event.target.value.toLowerCase(),
                  }));
                }}
              />
            </div>
            <div style={{ padding: "15px 40px 20px 40px" }}>
              <TextField
                sx={styledTextField}
                required
                fullWidth
                label="Password"
                id="fullWidth-2"
                name="password"
                type="password"
                placeholder="Password"
                size="small"
                value={password}
                onChange={(event) => {
                  setUserData((prevState) => ({
                    ...prevState,
                    password: event.target.value,
                  }));
                }}
              />
            </div>
            <div
              style={{
                padding: "15px 40px 20px 40px",
                margin: "20px 0px 0px 0px",
              }}
            >
              <BootstrapButton variant="contained" type="submit">
                Entrar
              </BootstrapButton>
            </div>
            <div style={{ padding: "15px 40px 20px 40px" }}>
              <Stack
                direction={"row"}
                sx={{
                  justifyContent: "space-between",
                }}
              >
                <Link to={"/forgotpassword"} style={{ textDecoration: "none" }}>
                  <Typography variant="body2" sx={{ color: "rebeccapurple" }}>
                    Recuperar
                    <br /> password
                  </Typography>
                </Link>
                <Link to={"/signup"} style={{ textDecoration: "none" }}>
                  <Typography variant="body2" sx={{ color: "rebeccapurple" }}>
                    Criar <br />
                    nova conta
                  </Typography>
                </Link>
              </Stack>
            </div>
          </Box>
        </Box>
      </Paper>
      <ToastContainer />
    </Box>
  );
}

export default Login;
