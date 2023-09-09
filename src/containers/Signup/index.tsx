import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { EyeInvisibleOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import InputBox from "Components/Input";
import { StyledForm } from "Containers/Login/loginform.style";
import FormHeader from "Components/Header";
import { auth, database } from "Firebase/config";

import ButtonComponent from "Components/BtnComponent";

function SignUpForm() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    rePass: "",
  });

  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, name: event.target.value }));
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, email: event.target.value }));
  };

  const handlePassChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, password: event.target.value }));
  };

  const handleRePassChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, rePass: event.target.value }));
  };

  const writeUserData = async (userId: string, name: string, email: string) => {
    await setDoc(doc(database, "users", userId), {
      username: name,
      email,
    });
  };

  const digitsRegExp = /(?=.*?[0-9])/;
  const specialCharRegExp = /(?=.*?[#?!@$%^&*-_])/;
  const minLengthRegExp = /.{8,}/;
  const digitsPassword = digitsRegExp.test(values.password);
  const specialCharPassword = specialCharRegExp.test(values.password);
  const minLengthPassword = minLengthRegExp.test(values.password);

  const handleFormSubmission = () => {
    if (!values.name || !values.email || !values.password || !values.rePass) {
      setErrMsg("Please fill in all the fields!");
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      setErrMsg("Email is not valid");
    } else if (!digitsPassword) {
      setErrMsg("Password should contain atleast one digit");
    } else if (!specialCharPassword) {
      setErrMsg("Password should contain atleast one special character");
    } else if (!minLengthPassword) {
      setErrMsg("Password should contain atleast 8 characters");
    } else if (values.password !== values.rePass) {
      setErrMsg("Passwords donot match");
    } else {
      setErrMsg("");
      setLoading(true);
      console.log(values);
      createUserWithEmailAndPassword(auth, values.email, values.password)
        .then(async (res) => {
          await updateProfile(res.user, { displayName: values.name });
          await writeUserData(res.user.uid, values.name, values.email);
          setLoading(false);
          navigate("/");
          console.log(res.user);
        })
        .catch((err) => {
          setLoading(false);
          if (err.code === "auth/email-already-in-use") {
            setErrMsg("Email already in use!");
            console.log(err.message);
          } else {
            console.log(err);
          }
        });
    }
  };

  return (
    <Spin spinning={loading} delay={500} size="large">
      <StyledForm className="form">
        <div>
          <FormHeader heading="Create your account" />
          <p>Let's get started for an amazing experience!</p>
        </div>

        <InputBox placeholder="Enter your name" onChange={handleNameChange} type="text" Icon={UserOutlined} />
        <InputBox placeholder="Enter your email" onChange={handleEmailChange} type="email" Icon={MailOutlined} />
        <InputBox placeholder="Enter your password" onChange={handlePassChange} type="password" Icon={EyeInvisibleOutlined} />
        <InputBox placeholder="Re-enter your password" onChange={handleRePassChange} type="password" Icon={EyeInvisibleOutlined} />
        <p className="err">{errMsg}</p>
        <ButtonComponent name="Register" click={handleFormSubmission} width="450px" />
        <p>
          Already have an account?
          <Link to="/login"><button id="registerBtn">Login</button></Link>
        </p>
      </StyledForm>
    </Spin>

  );
}

export default SignUpForm;
