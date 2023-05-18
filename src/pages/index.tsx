import images from "@/assets";
import Layout from "@/layouts";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import { useWallet } from "@solana/wallet-adapter-react";
import { MuiOtpInput } from "mui-one-time-password-input";
import Image from "next/image";
import axios from "axios";
import { useCallback, useState } from "react";

export default function Home() {
  const wallet = useWallet();
  const theme = useTheme();

  // STATE
  const [code, setCode] = useState("");

  const newCode = useCallback(async () => {
    if (code.length < 8 || !wallet.publicKey) return;

    try {
      const { data } = await axios.post("/api/code/insert", {
        code,
        poster: wallet.publicKey.toBase58(),
      });

      console.log(data);
    } catch (e) {
      console.error(e);
    }
  }, [code, wallet.publicKey]);

  const retrive = useCallback(async () => {
    if (!wallet.publicKey) return;

    try {
      const { data } = await axios.post("/api/code/retrive", {
        poster: wallet.publicKey.toBase58(),
      });

      console.log(data);
    } catch (e) {
      console.error(e);
    }
  }, [wallet.publicKey]);

  return (
    <Grid
      container
      alignItems={"center"}
      justifyContent={"center"}
      sx={{ my: 3 }}
    >
      <Grid item xs={12} sm={10} md={8} lg={6}>
        <Card elevation={2}>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <Image src={images.invite} width={100} height={100} alt="invite" />
            <Typography variant="h4" sx={{ mt: 2 }}>
              You need an invite code to join 
              <Box component={"span"} color={theme.palette.warning.light}>
                DRiP
              </Box>
              .
            </Typography>

            <Box
              component={"div"}
              sx={{
                textAlign: "center",
                mt: 1,
                py: 2,
                px: {
                  xs: 2,
                  sm: 4,
                  md: 15,
                },
                border: "1px solid" + theme.palette.warning.light,
              }}
            >
              <Typography variant="h5">We only have 2 rules.</Typography>
              <Typography variant="subtitle1">
                <Box component={"span"} color={theme.palette.warning.light}>
                  1.
                </Box>
                One account per human. <br />
                <Box component={"span"} color={theme.palette.warning.light}>
                  2.
                </Box>
                No burning.
              </Typography>
            </Box>

            <Typography variant="h4" sx={{ mt: 2 }}>
              <Box component={"span"} color={theme.palette.warning.light}>
                DRiP
              </Box>{" "}
              CODE
            </Typography>
            <MuiOtpInput
              value={code}
              onChange={setCode}
              length={8}
              autoFocus={true}
              sx={{ my: 3 }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
                button: {
                  bgcolor: "white !important",
                  color: theme.palette.warning.light + " !important",
                },
              }}
            >
              <Button
                size="large"
                variant="contained"
                className="white_button"
                disabled={code.length !== 8}
                onClick={newCode}
              >
                DRIP THIS
              </Button>
              <Button
                size="large"
                variant="contained"
                className="white_button"
                onClick={retrive}
              >
                GIMME NEW CODE
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Typography variant="h2" sx={{ mt: 4 }}>
            YOUR NEW{" "}
            <Box component={"span"} color={theme.palette.warning.light}>
              DRiP
            </Box>{" "}
            CODE
          </Typography>

          <Typography
            variant="h1"
            sx={{
              mt: 2,
              color: theme.palette.warning.light,
            }}
          >
            &ldquo;5h52jk52l52&ldquo;
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}

// Layout component
Home.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};
