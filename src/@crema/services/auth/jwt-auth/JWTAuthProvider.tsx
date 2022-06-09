import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useDispatch } from "react-redux";
import jwtAxios, { setAuthToken } from "./index";
import { AuthUser } from "../../../../types/models/AuthUser";
import ClientStorage from "../../../../utils/storage/ClientStorage";

import {
  fetchError,
  fetchStart,
  fetchSuccess,
} from "../../../../redux/actions";
// TODO auth user -istevanovic
interface JWTAuthContextProps {
  user: AuthUser | null | undefined;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface SignInProps {
  email: string;
  password: string;
}

interface JWTAuthActionsProps {
  signInUser: (data: SignInProps) => void;
  logout: () => void;
}

const JWTAuthContext = createContext<JWTAuthContextProps>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
});
const JWTAuthActionsContext = createContext<JWTAuthActionsProps>({
  signInUser: () => { },
  logout: () => { },
});

export const useJWTAuth = () => useContext(JWTAuthContext);

export const useJWTAuthActions = () => useContext(JWTAuthActionsContext);

interface JWTAuthAuthProviderProps {
  children: ReactNode;
}

const JWTAuthAuthProvider: React.FC<JWTAuthAuthProviderProps> = ({
  children,
}) => {
  const [userData, setJWTAuthData] = useState<JWTAuthContextProps>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const getAuthUser = () => {
      const user = ClientStorage.get("user");
      const token = user? user.token: null;
      if (!token) {
        setJWTAuthData({
          user: undefined,
          isLoading: false,
          isAuthenticated: false,
        });
        return;
      }
      setAuthToken(token);
      setJWTAuthData({
        user: user,
        isLoading: false,
        isAuthenticated: true,
      })
    };

    getAuthUser();
  }, []);

  const signInUser = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    dispatch(fetchStart());
    try {
      const { data: { data } } = await jwtAxios.post("/login-admin", { email, password });
      setAuthToken(data.token);
      setJWTAuthData({
        user: data.user,
        isAuthenticated: true,
        isLoading: false,
      });
      const { user, token } = data;
      const duration = 24 * 60 * 60 * 1000; // Keep for 24 hours
      ClientStorage.set("user", { ...user, token }, duration);
      dispatch(fetchSuccess());
    } catch (error) {
      setJWTAuthData({
        ...userData,
        isAuthenticated: false,
        isLoading: false,
      });
      dispatch(fetchError("Something went wrong"));
    }
  };

  const logout = async () => {
    ClientStorage.delete("user");
    setAuthToken();
    setJWTAuthData({
      user: null,
      isLoading: false,
      isAuthenticated: false,
    });
  };

  return (
    <JWTAuthContext.Provider
      value={{
        ...userData,
      }}
    >
      <JWTAuthActionsContext.Provider
        value={{
          signInUser,
          logout,
        }}
      >
        {children}
      </JWTAuthActionsContext.Provider>
    </JWTAuthContext.Provider>
  );
};
export default JWTAuthAuthProvider;
