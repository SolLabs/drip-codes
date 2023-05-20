import { AppBar, Box, Grid, Typography, useTheme } from "@mui/material";

// ASSETS
import TwitterIcon from "@mui/icons-material/Twitter";
import { FaWallet } from "react-icons/fa";

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

export default function Footer() {
  const theme = useTheme();
  return (
    <AppBar
      position="fixed"
      component="footer"
      color="default"
      sx={{
        p: 2,
        bottom: 0,
        top: "auto",
        bgcolor: theme.palette.background.default + "!important",
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {teamMembers.map((member, index) => (
          <>
            <Grid
              item
              xs={4}
              key={index}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: index === 1 ? "flex-end" : "flex-start",
                justifyContent: "center",
              }}
            >
              <Box
                component={"a"}
                href={`https://twitter.com/${member.twitter}`}
                target="_blank"
              >
                <Typography
                  variant="subtitle2"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <TwitterIcon
                    fontSize={"small"}
                    sx={{
                      mx: 1,
                      color: theme.palette.warning.light + "!important",
                    }}
                  />{" "}
                  @{member.twitter}
                </Typography>
              </Box>
              <Typography
                variant="subtitle2"
                component={"span"}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  "svg, .MuiSvgIcon-root": {
                    color: theme.palette.warning.light + "!important",
                  },
                }}
              >
                <FaWallet style={{ marginInline: 10 }} />
                {member.wallet}
              </Typography>
            </Grid>
            {index === 0 && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  mt: 2,
                }}
              >
                <Box sx={{ fontWeight: "bold" }}>Made with heart ❤️</Box>
                <Box sx={{ fontWeight: "bold" }}>Buy us a coffe :)</Box>
              </Box>
            )}
          </>
        ))}
      </Grid>
    </AppBar>
  );
}
