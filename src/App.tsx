import { useEffect } from "react";
import { WithFirebaseApiProps, WithFirebaseApi } from "./Firebase";
import Header from "./components/Header";
import { useAppDispatch } from "./redux/hooks";
import { setUserId } from "./redux/useSlice";

function App(props: WithFirebaseApiProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    return props.firebaseApi.onAuthStateChanged((user) => {
      if (user) {
        dispatch(setUserId(user.uid));
      } else {
        dispatch(setUserId(null));
      }
    });
  }, []);

  return (
    <>
      <Header />
    </>
  );
}

export default WithFirebaseApi(App);
