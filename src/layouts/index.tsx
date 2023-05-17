import React, { ReactNode } from "react";
import { Box, CssBaseline, Toolbar, useTheme } from "@mui/material";

// COMPONENTS
import Header from "./header";

export default function Layout({ children }: { children: ReactNode }) {
  const theme = useTheme();
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Header />
        {/* <Box component="nav">
          <Anchor toggle={toggle} setToggle={setToggle} />
        </Box> */}
        <Box
          component="main"
          sx={{ background: theme.palette.background.default, p: 2 }}
        >
          <Toolbar />
          {children}
        </Box>
      </Box>
    </>
  );
}
