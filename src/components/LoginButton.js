import { CgLogIn } from 'react-icons/cg';
import { Link } from 'react-router-dom';

const LoginButton = () => {
  return (
    <div>
      <Link
        className=" flex absolute  h-6 text-white mr-5 font-bold ml-2 top-8 hover:cursor-pointer"
        to="/login"
      >
        <span>Log in for cloud services</span>
        <CgLogIn className="ml-1 w-6 h-6 text-white mr-2 hover:cursor-pointer" />
      </Link>
    </div>
  );
};
export default LoginButton;
