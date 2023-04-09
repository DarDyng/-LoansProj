import { useEffect } from 'react';
import MyRouter from './app/router/router-config';
import { handleAuth } from './app/store/features/authSlice';
import { useAppDispatch } from './app/store/store';
import { configureAuthHeaders } from './app/services/auth-header';

function App() {
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    console.log("App re-render");
    dispatch(handleAuth());
    configureAuthHeaders()
  }, []);

  return (
    <MyRouter />
  )
}

export default App;