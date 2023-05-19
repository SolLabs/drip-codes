import images from "@/assets";
import { CodeType } from "@/types";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Typography,
  useTheme,
} from "@mui/material";
import { useWallet } from "@solana/wallet-adapter-react";
import axios from "axios";
import { MuiOtpInput } from "mui-one-time-password-input";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import { toast } from "react-toastify";

export default function Hero({
  retrieved,
  setRetrieved,
}: {
  retrieved: CodeType;
  setRetrieved: (val: CodeType) => void;
}) {
  const theme = useTheme();
  const wallet = useWallet();

  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");

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

      setRetrieved(data.code);
      toast.success("CODE RETRIVED");
    } catch (e) {
      toast.error(e.response.data.message);
    }
    setLoading(false);
  }, [wallet.publicKey]);
  return (
    <Card elevation={2} sx={{ gridColumn: "1/span 2" }}>
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
          You need an invite code to join{" "}
          <Box component={"span"} color={theme.palette.warning.light}>
            DRiP
          </Box>
          .
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
            disabled={!wallet.publicKey || !!retrieved || loading}
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
  );
}
