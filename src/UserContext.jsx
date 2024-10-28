import React from "react";
import { TOKEN_POST, TOKEN_VALIDADE_POST, USER_GET } from "./Api";
import { useNavigate } from "react-router-dom";

export const UserContext = React.createContext();

const UserStorage = ({ children }) => {
  const [data, setData] = React.useState(null);
  const [login, setLogin] = React.useState(null);
  const [loading, setLoading] = React.useState(null);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  async function getUser(token) {
    const { url, options } = USER_GET(token);
    const response = await fetch(url, options);
    const json = await response.json();
    setData(json);
    setLogin(true);
  }

  async function userLogin(username, password) {
    try {
      setError(null);
      setLoading(true);
      const { url, options } = TOKEN_POST({ username, password });
      const tokenRes = await fetch(url, options);

      if (!tokenRes.ok) throw new Error(`Error: ${tokenRes.statusText}`);

      const { token } = await tokenRes.json();
      window.localStorage.setItem("token", token);
      await getUser(token);
      navigate("/conta");
    } catch (err) {
      setError(err.message);
      setLogin(false);
    } finally {
      setLoading(false);
    }
  }

  const userLogOut = React.useCallback(() => {
    setError(null);
    setData(null);
    setLogin(false);
    setLoading(false);
    window.localStorage.removeItem("token");
  });

  React.useEffect(() => {
    async function autoLogin() {
      const token = window.localStorage.getItem("token");
      if (token) {
        try {
          setError(null);
          setLoading(true);
          const { url, options } = TOKEN_VALIDADE_POST(token);
          const response = await fetch(url, options);
          if (!response.ok) throw new Error("Token inválido");
          await getUser(token);
        } catch (err) {
          userLogOut();
        } finally {
          setLoading(false);
        }
      } else {
        setLogin(false);
      }
    }
    autoLogin();
  }, []);

  return (
    <UserContext.Provider
      value={{ userLogin, userLogOut, error, loading, login, data }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserStorage;
