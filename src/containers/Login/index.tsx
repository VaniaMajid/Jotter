import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  browserLocalPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { EyeInvisibleOutlined, MailOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { Spin } from "antd";
import { setUser } from "Redux/reducers/userSlice";
import { auth } from "Firebase/config";
import ButtonComponent from "Components/BtnComponent";
import FormHeader from "Components/Header";
import { StyledForm } from "Containers/Login/loginform.style";
import InputBox from "Components/Input";
import { fetchJournals } from "Redux/reducers/journalSlice";
import { AppDispatch } from "Redux/store";

function LoginForm() {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, email: event.target.value }));
  };

  const handlePassChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, password: event.target.value }));
  };

  const handleFormSubmission = async () => {
    if (!values.email || !values.password) {
      setErrMsg("Please fill in all the fields!");
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      setErrMsg("Email is not valid!");
    } else {
      setErrMsg("");
      setLoading(true);
      try {
        await setPersistence(auth, browserLocalPersistence);
        const userCredential = await signInWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        const { user } = userCredential;
        const userInfo = {
          userId: user.uid,
          displayName: user.displayName,
          email: user.email,
        };
        console.log(userInfo);
        dispatch(setUser(userInfo));
        dispatch(fetchJournals(user.uid));

        setValues({ email: "", password: "" });
        setLoading(false);
        navigate("/");
      } catch (err: any) {
        setLoading(false);
        setErrMsg(err.message);
        console.log(err.message);
      }
    }
  };

  return (
    <Spin spinning={loading} delay={500} size="large">
      <StyledForm className="form" onSubmit={handleFormSubmission}>
        <div>
          <FormHeader heading="Welcome back!" />
          <p>Login to your existing account</p>
        </div>
        <InputBox
          placeholder="Enter your email"
          onChange={handleEmailChange}
          type="email"
          Icon={MailOutlined}
        />
        <InputBox
          placeholder="Enter your password"
          onChange={handlePassChange}
          type="password"
          Icon={EyeInvisibleOutlined}
        />
        <p className="err">{errMsg}</p>

        <ButtonComponent
          type="primary"
          name="Login"
          click={handleFormSubmission}
          width="450px"
        />
        <p className="register">
          Don't have an account?
          <Link to="/signup">
            <button id="registerBtn">Register</button>
          </Link>
        </p>
      </StyledForm>
    </Spin>
  );
}

export default LoginForm;
