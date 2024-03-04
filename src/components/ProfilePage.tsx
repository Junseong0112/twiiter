import { WithFirebaseApiProps, WithFirebaseApi } from "../Firebase";
import { CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { TweetWithId } from "../types";
import Tweet from "./Tweet";
import { useParams } from "react-router-dom";

const ProfilePageBase = (props: WithFirebaseApiProps) => {
  const [tweets, setTweets] = useState<Array<TweetWithId> | null>(null);
  const params = useParams();

  const fetchTweets = () => {
    if (params.userId == null) {
      return;
    }
    props.firebaseApi.asyncGetProfileFeed(params.userId!).then((tweets) => {
      setTweets(tweets);
    });
  };
  useEffect(() => {
    fetchTweets();
  }, []);

  if (params.userId == null) {
    return <Typography>Something went wrong...</Typography>;
  }
  if (tweets === null) {
    return <CircularProgress />;
  }
  return (
    <>
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} tweet={tweet} />
      ))}
    </>
  );
};

export default WithFirebaseApi(ProfilePageBase);
