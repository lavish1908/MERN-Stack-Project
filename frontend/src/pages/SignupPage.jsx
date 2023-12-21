import React, { useEffect } from 'react';
import Signup from '../components/Signup/Signup.jsx';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);
  // if user is login then redirect to home page
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  });
  return (
    <div>
      <Signup />
    </div>
  );
};

export default SignupPage;
