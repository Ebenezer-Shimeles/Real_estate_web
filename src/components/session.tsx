"use client";
import axios from "axios";
import {
  ReactNode,
  useState,
  useEffect,
  createContext,
  useContext,
  Suspense,
  useRef,
  useMemo,
  Children,
} from "react";
import Toast from "./Toast";
axios.defaults.withCredentials = true;
function oauthSignIn() {
  // Google's OAuth 2.0 endpoint for requesting an access token
  var oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";

  // Create <form> element to submit parameters to OAuth 2.0 endpoint.
  var form = document.createElement("form");
  form.setAttribute("method", "GET"); // Send as a GET request.
  form.setAttribute("action", oauth2Endpoint);

  // Parameters to pass to OAuth 2.0 endpoint.
  var params = {
    client_id:
      "193639341386-vh2n0sm2cf2dm45pt56ddu4enft72mgo.apps.googleusercontent.com",
    redirect_uri: "http://localhost:3000/oauth2/google",
    response_type: "token",
    scope: "https://www.googleapis.com/auth/userinfo.profile",
    include_granted_scopes: "true",
    state: "pass-through value",
  };

  // Add form parameters as hidden input values.
  for (var p in params) {
    var input = document.createElement("input");
    input.setAttribute("type", "hidden");
    input.setAttribute("name", p);
    input.setAttribute("value", (params as any)[p]);
    form.appendChild(input);
  }

  // Add form to page and submit it to open the OAuth 2.0 endpoint.
  document.body.appendChild(form);

  form.submit();
}

async function getMe(): Promise<Session | undefined | null> {
  try {
    const response = await axios.get(`https://localhost:7113/api/users/me`);

    return response.data as Session;
  } catch (e) {
    return null;
  }
}
async function isLoggedIn(): Promise<boolean> {
  return Boolean(await getMe());
}

type Session = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  bio: string;
  isVerified: boolean;
  sold: number;
  ProfileUrl: string;
};

const SessionContext = createContext<any>(null);
const SessionProviderFallback = () => {
  return (
    <div className="flex flex-col h-screen w-screen justify-center items-center">
      <span className="text-3xl">Loading....</span>
    </div>
  );
};
const SessionProvider = (props: { children: ReactNode }) => {
  return <SessionFetcher>{props.children}</SessionFetcher>;
};

// const SessionProviderInner = (props : any) =>{
//   const [session, setSession] = useState(props.session);
//   const [isAuth, setIsAuth] = useState(props.isAuth);
//   const logOut = async () =>{
//     console.log('logging out')
//     const res = await axios.delete("https://localhost:7113/api/users/session");
//     setSession(null);
//     setIsAuth(null)
//     window.location.href = '/login'

//   }

//   return (<SessionContext.Provider value={{session ,isAuth, logOut}}>{props.children}</SessionContext.Provider >)
// }
// let r: {session: Session, isAuth: boolean} | null = null;
const SessionFetcher = (props: { children: ReactNode }) => {
  const [session, setSession] = useState<null | Session | undefined>(null);
  const [isAuth, setIsAuth] = useState<boolean | undefined>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [randVal, setRandVal] = useState<number>(0);
  const recheckAuth = async () => {
    setRandVal(Math.random());
  };

  useEffect(() => {
    console.log("from use effect");
    (async () => {
      const session = await getMe();
      const isAuth = await isLoggedIn();
      setIsAuth(isAuth);
      setSession(session);
      setIsLoading(false);
    })();
  }, [randVal]);

  const logOut = async () => {
    await axios.delete("https://localhost:7113/api/users/session");

    setSession(null);
    setIsAuth(false);
  };

  return isLoading ? (
    <SessionProviderFallback></SessionProviderFallback>
  ) : (
    <div style={{ background: "url(bg_all.jpg)", backgroundSize: 'contain' }}>
      <SessionContext.Provider value={{ isAuth, session, logOut, recheckAuth }}>
        <Toast>
            {props.children}
        </Toast>
        
      </SessionContext.Provider>
    </div>
  );
};
function useSession() {
  return useContext(SessionContext);
}
export { oauthSignIn, isLoggedIn, getMe, SessionProvider, useSession };
