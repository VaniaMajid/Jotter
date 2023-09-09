// import { useDispatch } from 'react-redux'
import heroImage from "Assets/heroImage.png";
import logo from "Assets/logo.png";
import { StyledSection } from "Templates/publicTemplate.style";
// import { AppDispatch } from '../redux/store'
// import { useNavigate } from 'react-router-dom'
// import { onAuthStateChanged } from 'firebase/auth'
// import { auth } from '../firebase/config'
// import { useEffect } from 'react'
// import { setUser } from '../redux/reducers/userSlice'

type publicTempateProps = {
  children?: any
};

const PublicTemplate: React.FC<publicTempateProps> = (props:publicTempateProps) => {
  // const dispatch: AppDispatch = useDispatch();
  // const navigate = useNavigate();
  // useEffect(() => {
  //     onAuthStateChanged(auth, (user) => {
  //       if (user) {
  //         navigate('/');
  //       }
  //     });
  //   }, []);

  const { children } = props;
  return (
    <StyledSection>
      <div className="imgSection">
        <img id="heroImg" src={heroImage} alt="image" />
      </div>
      <div className="form">
        <img src={logo} />
        {children}
      </div>

    </StyledSection>
  );
};

export default PublicTemplate;
