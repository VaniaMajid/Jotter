import { BrowserRouter, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "Redux/reducers/userSlice";
import { auth } from "Firebase/config";
import PublicTemplate from "Templates/PublicTemplate";
import LoginForm from "Containers/Login";
import SignUpForm from "Containers/Signup";
import ViewJournals from "Containers/ViewJournals";
import AddNewJournal from "Containers/AddJournal";
import JournalCont from "Containers/JournalContainer";
import PrivateTemplate from "Templates/PrivateTemplate";
import { AppDispatch } from "Redux/store";

function App() {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid } = user;
        const { displayName } = user;
        const { email } = user;

        dispatch(setUser({ userId: uid, displayName, email }));
      } else {
        dispatch(setUser({ userId: null, displayName: null, email: null }));
      }
    });
  }, []);

  const privateRoutes = [
    {
      key: 1,
      path: "/",
      element: <ViewJournals />,
    },
    {
      key: 2,
      path: "/settings",
      element: <div>Settings</div>,
    },
    {
      key: 3,
      path: "/guide",
      element: <div>Guide</div>,
    },
    {
      key: 4,
      path: "/createjournal/:journalId?",
      element: <AddNewJournal />,
    },
    {
      key: 5,
      path: "/:journalId",
      element: <JournalCont />,
    },
  ];

  const publicRoutes = [
    {
      key: 6,
      path: "/login",
      element: <LoginForm />,
    },
    {
      key: 7,
      path: "/signup",
      element: <SignUpForm />,
    },
  ];

  const generatePublicRoutes = () => publicRoutes.map((item) => (
    <Route
      key={item?.key}
      path={item?.path}
      element={
        <PublicTemplate children={item.element} />
        }
    />
  ));

  const generatePrivateRoutes = () => privateRoutes.map((item) => (
    <Route
      path={item?.path}
      element={
        <PrivateTemplate children={item.element} />
        }
    />
  ));

  return (
    <BrowserRouter>
      <Routes>
        {generatePublicRoutes()}
        {generatePrivateRoutes()}
      </Routes>

    </BrowserRouter>
  );
}

export default App;
