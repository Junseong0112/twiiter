import { Box, CircularProgress, Container, Typography } from "@mui/material";
import { useEffect } from "react";
import { WithFirebaseApiProps, WithFirebaseApi } from "./Firebase";
import Header from "./components/Header";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { RootState } from "./redux/store";
import { handleUserChange } from "./redux/useSlice";

const isLoadingState = (state: RootState): boolean => {
  return state.user.userId === undefined;
};

const OnboardingBase = (props: WithFirebaseApiProps) => {
  return <></>;
};

const Onboarding = WithFirebaseApi(OnboardingBase);

const Body = () => {
  const userId = useAppSelector((state: RootState) => state.user.userId);
  const userInfo = useAppSelector(
    (state: RootState) => state.user.userInfo.value
  );
  const userInfoLoadState = useAppSelector(
    (state: RootState) => state.user.userInfo.loadState
  );

  if (userInfoLoadState === "loading") {
    return <CircularProgress />;
  }
  if (userInfoLoadState === "failed" || userInfo === undefined) {
    return (
      <>
        <Typography>Someting Failed</Typography>
      </>
    );
  }
  if (userInfo === null) {
    return <Onboarding />;
  }
  return (
    <>
      <Typography>{`Welcome ${userInfo.username}`}</Typography>
    </>
  );
};

function App(props: WithFirebaseApiProps) {
  const isLoading = useAppSelector(isLoadingState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    return props.firebaseApi.onAuthStateChanged((user) => {
      if (user) {
        dispatch(handleUserChange(props.firebaseApi, user.uid));
      } else {
        dispatch(handleUserChange(props.firebaseApi, null));
      }
    });
  }, []);

  if (isLoading) {
    return <CircularProgress sx={{ margin: "auto" }} />;
  }

  return (
    <>
      <Header />
      <Container>
        <Box sx={{ margin: "auto" }}>
          <Body />
        </Box>
      </Container>
    </>
  );
}

export default WithFirebaseApi(App);
