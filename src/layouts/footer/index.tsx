import { AppBar, Box, Typography, useTheme } from "@mui/material";

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
      sx={{
        p: 2,
        top: "auto",
        bottom: 0,
        width: "100%",
        // bgcolor: theme.palette.background.default,
        bgcolor: "transparent",
      }}
    >
      <Typography
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
        variant="subtitle2"
      >
        <Box sx={{ fontWeight: "bold" }}>Made with heart by:</Box>
        <Box
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
          }}
        >
          {teamMembers.map((member, index) => (
            <Box key={index}>
              <Box
                component={"a"}
                href={`https://twitter.com/${member.twitter}`}
                target="_blank"
              >
                <Typography
                  variant="subtitle2"
                  component={"span"}
                  color="primary"
                >
                  @{member.twitter}
                </Typography>
              </Box>
              <Box>{member.wallet}</Box>
            </Box>
          ))}
        </Box>
        <Box sx={{ fontWeight: "bold" }}>Buy us a coffe :)</Box>
      </Typography>
    </AppBar>
  );
}
