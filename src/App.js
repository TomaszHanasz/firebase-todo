import "./App.css";
import SignIn from "./components/signIn/SignIn";
import TodoApp from "./components/todoApp/TodoApp";
import SignUp from "./components/signUp/SignUp";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/todoapp" element={<TodoApp />} />
    </Routes>
  );
}

export default App;
