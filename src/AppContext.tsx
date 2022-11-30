import React, { ReactElement } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "./firebase";

interface Props {
  children:
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactElement<any, string>
    | React.ReactPortal;
}

interface userTypes {
  displayName: string | null;
  userId: string;
  avatar?: string | null;
}

interface registrationTypes {
  displayName: string;
  email: string;
  password: string;
}

interface contextTypes {
  loading: boolean;
  currentUser: userTypes | null;
  logInUser(email: string, password: string): Promise<void>;
  registerUser(data: registrationTypes): Promise<void>;
  signOutUser(): Promise<void>;
  handleAuthChange: (params: { cb?: VoidFunction; err?: VoidFunction }) => void;
}

const contextDefaultVal: contextTypes = {
  loading: false,
  currentUser: null,
  logInUser: async () => {},
  registerUser: async () => {},
  signOutUser: async () => {},
  handleAuthChange: () => {},
};

export const AppContext = React.createContext<contextTypes>(contextDefaultVal);

// export const AppContext = React.createContext(contextDefaultVal);

export default function AppContextProvider({ children }: Props): ReactElement { 
// export default function AppContextProvider({ children }: any): any { 
  const [currentUser, setCurrentUser] = React.useState<userTypes | null>(null);
  const [loading, setLoading] = React.useState(false);

  const logInUser = async (email: string, password: string) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async (data: registrationTypes) => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password).then(async ({ user }) => {
        await updateProfile(user, {
          displayName: data.displayName,
        });
      });
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      alert(error);
    }
  };

  const handleAuthChange = async (params: { cb?: VoidFunction; err?: VoidFunction }) => {
    onAuthStateChanged(auth, (user) => {
      if (user === null) {
        setCurrentUser(null);
        params.err && params.err();
      } else {
        setCurrentUser({
          displayName: user.displayName,
          userId: user.uid,
          avatar: user.photoURL,
        });
        params.cb && params.cb();
      }
    });
  };

  return (
    <AppContext.Provider
      value={{
        loading,
        currentUser,
        logInUser,
        registerUser,
        handleAuthChange,
        signOutUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}