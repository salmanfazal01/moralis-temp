import { CommonContext } from "@context/commonContext";
import { CircularProgress, Dialog, Stack, Typography } from "@mui/material";
import React, { useContext } from "react";
import Typewriter from "typewriter-effect";

const LoadingOverlay = () => {
  const { commonState } = useContext(CommonContext);
  const { loadingOverlay } = commonState;

  return (
    <>
      {!!loadingOverlay && (
        <Dialog
          fullScreen
          open={!!loadingOverlay}
          // onClose={handleClose}
          disableEscapeKeyDown={true}
          sx={{
            boxShadow: "none",
            color: "#fff",
          }}
          PaperProps={{
            sx: {
              backgroundColor: "rgba(26,28,33,0.7)",
            },
          }}
        >
          <Stack
            sx={{ height: "100%", width: "100%", color: "#fff" }}
            alignItems="center"
            justifyContent="center"
            spacing={3}
          >
            <Typography variant={"h4"}>Loading</Typography>

            <CircularProgress sx={{ color: "#fff" }} />

            {loadingOverlay?.length && (
              <Typewriter
                options={{
                  strings: loadingOverlay,
                  autoStart: true,
                  loop: true,
                }}
              />
            )}
          </Stack>
        </Dialog>
      )}
    </>
  );
};

export default LoadingOverlay;
