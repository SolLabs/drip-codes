import { CodeType } from "@/types";
import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import { useWallet } from "@solana/wallet-adapter-react";
import axios from "axios";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";

export default function CodeUI({
  data,
  setData,
}: {
  data: CodeType;
  setData: (data: CodeType) => void;
}) {
  const theme = useTheme();
  const wallet = useWallet();

  // STATES
  const [loading, setLoading] = useState(false);

  const feedback = useCallback(
    async (did_work: boolean) => {
      if (!wallet.publicKey) return;

      setLoading(true);
      try {
        const res = await axios.post("/api/code/feedback", {
          id: data._id,
          retriever: wallet.publicKey.toBase58(),
          did_work,
        });

        if (res.data.code) {
          setData(res.data.code);
          toast.success("NEW CODE RETRIVED");
        } else {
          toast.success("Thanks For you feedback");
          setData(undefined);
        }
      } catch (e) {
        setData(undefined);
        toast.error(e.response.data.message);
      }
      setLoading(false);
    },
    [wallet.publicKey, data, setData]
  );

  return (
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
          &ldquo;{data.code}&ldquo;
        </Typography>

        <Typography
          variant="h4"
          sx={{
            my: 2.5,
          }}
        >
          Did it{" "}
          <Box component={"span"} color={theme.palette.warning.light}>
            Work?
          </Box>{" "}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <Button
            size="small"
            variant="outlined"
            color="warning"
            disabled={loading}
            onClick={() => feedback(true)}
          >
            Yes
          </Button>
          <Button
            size="small"
            variant="outlined"
            sx={{
              border: "1px solid white !important",
              color: "white !important",
            }}
            disabled={loading}
            onClick={() => feedback(false)}
          >
            No
          </Button>
        </Box>
      </Box>
    </Grid>
  );
}
