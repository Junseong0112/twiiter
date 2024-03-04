import { WithFirebaseApiProps, WithFirebaseApi } from "../Firebase";
import { Box, Stack, TextField, Button } from "@mui/material";
import { useState } from "react";

const TweetInputField = () => {
  const [tweetContent, setTweetContent] = useState<string>("");

  const onSubmit = () => {
    setTweetContent("");
  };

  return (
    <Box sx={{ margin: "auto" }}>
      <Stack direction="row" spacing={2} justifyContent="center">
        <TextField
          id="tweet-input"
          label="Tweet"
          variant="outlined"
          onChange={(e) => setTweetContent(e.target.value)}
          value={tweetContent}
        />
        <Button variant="outlined" onClick={onSubmit}>
          Submit
        </Button>
      </Stack>
    </Box>
  );
};

const MainFeedBase = (props: WithFirebaseApiProps) => {
  return (
    <>
      <TweetInputField />
    </>
  );
};

export default WithFirebaseApi(MainFeedBase);
