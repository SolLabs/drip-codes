import React, { ReactNode } from "react";
import { Box, CssBaseline, Toolbar, useTheme } from "@mui/material";

// COMPONENTS
import Header from "./header";
import Footer from "./footer";

export default function Layout({ children }: { children: ReactNode }) {
  const theme = useTheme();
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Header />
        <Box
          component="main"
          sx={{ background: theme.palette.background.default, p: 2 }}
        >
          <Toolbar />
          {children}
        </Box>
      </Box>
      {/* <Footer /> */}
    </>
  );
}
