import {
  createContext,
  useContext,
  useState
} from "react";


// Create Context
const AuthContext = createContext();


// Auth Provider
export function AuthProvider({ children }) {

  const [isLoggedIn, setIsLoggedIn] = useState(() => {

    return (
      localStorage.getItem("isLoggedIn") === "true"
    );

  });


  const [userEmail, setUserEmail] = useState(() => {

    return (
      localStorage.getItem("userEmail") || ""
    );

  });


  // Login
  const login = (email) => {

    localStorage.setItem(
      "isLoggedIn",
      "true"
    );

    localStorage.setItem(
      "userEmail",
      email
    );

    setIsLoggedIn(true);
    setUserEmail(email);

  };


  // Logout
  const logout = () => {

    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");

    setIsLoggedIn(false);
    setUserEmail("");

  };


  return (

    <AuthContext.Provider
      value={{
        isLoggedIn,
        userEmail,
        login,
        logout
      }}
    >

      {children}

    </AuthContext.Provider>

  );

}


// Custom Hook
export function useAuth() {

  return useContext(AuthContext);

}