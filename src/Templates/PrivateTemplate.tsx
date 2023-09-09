import { Layout } from "antd";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Sidebar from "Containers/Sidebar";
import Navbar from "Containers/Navbar";
import { auth } from "Firebase/config";
import { setUser } from "Redux/reducers/userSlice";
import { AppDispatch } from "Redux/store";
import { fetchJournals } from "Redux/reducers/journalSlice";

type privateTemplateProps = {
  children?: any
};

const PrivateTemplate: React.FC<privateTemplateProps> = (props: privateTemplateProps) => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login");
      } else {
        const { uid } = user;
        const { displayName } = user;
        const { email } = user;
        dispatch(setUser({ userId: uid, displayName, email }));
        dispatch(fetchJournals(uid));
      }
    });
  }, []);

  const { children } = props;
  return (
    <Layout style={{ margin: "-8px", backgroundColor: "#ffffff" }}>
      <Navbar />
      <Layout style={{ maxHeight: "100vh", backgroundColor: "#ffffff" }}>
        <Sidebar />
        <Layout style={{ backgroundColor: "#ffffff", padding: "20px" }}>
          {children}
        </Layout>
      </Layout>
    </Layout>
  );
};

export default PrivateTemplate;
