import images from "@/assets";
import Layout from "@/layouts";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import { MuiOtpInput } from "mui-one-time-password-input";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const theme = useTheme();
  const [otp, setOtp] = useState("");

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
              value={otp}
              onChange={setOtp}
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
              }}
            >
              <Button size="large" color="warning" variant="outlined">
                DRIP THIS
              </Button>
              <Button size="large" variant="outlined" color="error">
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
