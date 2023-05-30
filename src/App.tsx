import { useEffect } from 'react';
import MyRouter from './app/router/router-config';
import { handleAuth } from './app/store/features/authSlice';
import { useAppDispatch } from './app/store/store';
import { configureAuthHeaders } from './app/services/auth-header';
import { AuthProvider } from './app/components/contexts/AuthContextErrorHandler';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

function App() {
  const dispatch = useAppDispatch();
  ChartJS.register(ArcElement, Tooltip, Legend);

  // Lab-4 code review by Vika Myron
  
  // 1. Refactor large components into small
  // 2. Add loading behavior for methods where you complete async request to api
  // 3. Create service/services which will have methods to perform API requests (also you can create helpers in order to remove code repetion)
  // 4. Move all "string" values which you use often into constants
  // 5. DRY (Don't Repeat Yourself):
  // In the MainPage component, instead of hardcoding the form fields, you can create a reusable FormInput component that accepts props for different form inputs and handles validation.
  // In the CreateLoanForm component, you can extract the form fields into a separate component and reuse it in both the create and edit forms.
  // In the ExpensesList component, you can extract the expense list item into a separate component and reuse it for each expense.
  // KISS (Keep It Simple, Stupid):

  //  In the App component, you can remove the unnecessary imports that are not used in the code.
  //  In the MainPage component, simplify the logic for showing and hiding the modal by using a boolean state instead of toggling the value.
  //  In the CreateLoanForm component, simplify the form submission logic by directly dispatching the createExpense action without the unwrap and then block.
  //  YAGNI (You Aren't Gonna Need It):
  //  Remove unused imports from all the components to keep the code clean and avoid potential confusion.
  
  useEffect(() => {
    console.log("App re-render");
    dispatch(handleAuth());
    configureAuthHeaders();
  }, []);

  return (
    <AuthProvider>
      <MyRouter />
    </AuthProvider>
  )
}

export default App;
