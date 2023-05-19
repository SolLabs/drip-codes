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

export default function Home() {
  const wallet = useWallet();
  const theme = useTheme();

  // STATE
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const [retrived, setRetrived] = useState<CodeType | undefined>(undefined);

  const newCode = useCallback(async () => {
    if (code.length < 8 || !wallet.publicKey) return;

    setLoading(true);
    try {
      await axios.post("/api/code/insert", {
        code,
        poster: wallet.publicKey.toBase58(),
      });

      toast.success("Code Inserted");
      setCode("");
    } catch (e) {
      toast.error(e.response.data.message);
    }
    setLoading(false);
  }, [code, wallet.publicKey]);

  const retrive = useCallback(async () => {
    if (!wallet.publicKey) return;

    setLoading(true);
    try {
      const { data } = await axios.post("/api/code/retrive", {
        retriver: wallet.publicKey.toBase58(),
      });

      setRetrived(data.code);
      toast.success("CODE RETRIVED");
    } catch (e) {
      toast.error(e.response.data.message);
    }
    setLoading(false);
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

            <Typography variant="subtitle2" sx={{ mt: 2 }}>
              It is forbidden and punishable to have multiple accounts on{" "}
              <Box component={"span"} color={theme.palette.warning.light}>
                drip.haus
              </Box>
              , any double account will be found by the team of{" "}
              <Box component={"span"} color={theme.palette.warning.light}>
                drip.haus
              </Box>{" "}
              and will be banned.
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
                  color: "black !important",
                  ":disabled": {
                    bgcolor: "grey !important",
                  },
                },
              }}
            >
              <Button
                size="large"
                variant="contained"
                disabled={code.length !== 8 || loading}
                onClick={newCode}
              >
                {loading ? (
                  <CircularProgress
                    variant="indeterminate"
                    color="warning"
                    size={20}
                  />
                ) : (
                  "DRIP THIS"
                )}
              </Button>
              <Button
                size="large"
                variant="contained"
                onClick={retrive}
                disabled={!wallet.publicKey || !!retrived || loading}
              >
                {loading ? (
                  <CircularProgress
                    variant="indeterminate"
                    color="warning"
                    size={20}
                  />
                ) : (
                  "GIMME NEW CODE"
                )}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        {retrived && <CodeUI data={retrived} setData={setRetrived} />}
      </Grid>
    </Grid>
  );
}

// Layout component
Home.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};
