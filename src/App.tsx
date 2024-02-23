import { CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { WithFirebaseApiProps, WithFirebaseApi } from "./Firebase";
import Header from "./components/Header";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { RootState } from "./redux/store";
import { setUserId } from "./redux/useSlice";

const isLoadingState = (state: RootState): boolean => {
  return state.user.userId === undefined;
};

function App(props: WithFirebaseApiProps) {
  const isLoading = useAppSelector(isLoadingState);
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

  if (isLoading) {
    return <CircularProgress sx={{ margin: "auto" }} />;
  }

  return (
    <>
      <Header />
    </>
  );
}

export default WithFirebaseApi(App);
