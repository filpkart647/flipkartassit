import { isLoggedIn, removeAuthCookie } from '@/utils/apiHandlers';
import React from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  // const isLogin = isLoggedIn();
  // const dispatch = useDispatch();
  const handleLogout = async () => {
    removeAuthCookie();
    navigate('/login');
    localStorage.clear();
    toast.success('Log out successfully');
  };

  // useEffect(() => {
  //   if (isLogin) {
  //     dispatch(getUserData());
  //   }
  // }, [isLogin]);
  return (
    <>
      <nav className="flex items-center justify-between px-5 py-3 bg-[#2874f0] ">
        <Link to="/">
          <img
            className=" w-[150px] object-cover"
            src="/images/flipLogo.png"
            alt="logo"
          />
        </Link>

        {isLoggedIn() && (
          <button
            onClick={handleLogout}
            className="bg-gray-200 text-black px-4 py-1 rounded-md font-semibold"
          >
            Logout
          </button>
        )}
      </nav>
    </>
  );
};

export default Navbar;
