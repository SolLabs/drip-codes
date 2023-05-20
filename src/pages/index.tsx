import images from "@/assets";
import Layout from "@/layouts";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import { useWallet } from "@solana/wallet-adapter-react";
import { MuiOtpInput } from "mui-one-time-password-input";
import Image from "next/image";
import axios from "axios";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import CodeUI from "@/components/code";
import { CodeType } from "@/types";
import Messages from "@/components/messages";
import Hero from "@/components/hero";

const teamMembers = [
  {
    twitter: "s0ldev",
    wallet: "232Z5QNvQ4wRyraGWFpC5i3HEbqozEWgBCV95eWASaG1",
  },
  {
    twitter: "_RockstarSB",
    wallet: "rockstar_sb.sol",
  },
];

export default function Home() {
  const wallet = useWallet();
  const theme = useTheme();

  // STATE
  const [retrived, setRetrived] = useState<CodeType | undefined>(undefined);

  return (
    <Grid
      container
      spacing={2}
      alignItems={"center"}
      justifyContent={"center"}
      sx={{ my: 3 }}
    >
      <Grid item xs={12} sm={10} md={8} lg={8}>
        <Hero retrieved={retrived} setRetrieved={setRetrived} />
      </Grid>

      <Grid
        container
        item
        xs={12}
        spacing={2}
        alignItems={"center"}
        justifyContent={"center"}
        sx={{
          ".warning_card": {
            p: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          },
          ".card_content": {
            textAlign: "center",
          },
        }}
      >
        {retrived ? (
          <CodeUI data={retrived} setData={setRetrived} />
        ) : (
          <Messages />
        )}
      </Grid>
    </Grid>
  );
}

// Layout component
Home.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};
