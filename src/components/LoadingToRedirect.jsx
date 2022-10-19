import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LoadingToRedirect() {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => currentCount - 1);
    }, 1000);

    count === 0 && navigate('/login');

    return () => clearInterval(interval);
  }, [count, navigate]);

  return <div>You are not authorized, Redirecting you in {count} sec.</div>;
}

export default LoadingToRedirect;
