import { WindowSharp } from '@mui/icons-material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SignOut = ({ clearAuthentication }) => {
  window.localStorage.clear();

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      clearAuthentication();
      navigate('/login');
    }, 3000);
  }, []);
  return (
    <div>
      <h2 className=" mt-10 text-center text-white text-2xl font-bold ">
        {' '}
        You have successfully signed out.
        <br></br>
        <br></br>
        Redirecting to Log in page in 3 seconds ...
      </h2>
    </div>
  );
};
export default SignOut;
