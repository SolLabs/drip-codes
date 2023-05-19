import { AppBar, Box, Typography, useTheme } from "@mui/material";

const teamMembers = [
  {
    twitter: "s0ldev",
    wallet: "s0ldev",
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
        bgcolor: theme.palette.background.default,
      }}
    >
      <Typography variant="subtitle2">
        <Box
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${teamMembers.length}, 1fr)`,
          }}
        >
          {teamMembers.map((member, index) => (
            <Box key={index} sx={{ gridRow: "1", gridColumn: `${index + 1}` }}>
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
          <Box
            sx={{
              gridRow: "2",
              gridColumn: `1/span ${teamMembers.length}`,
              textAlign: "center",
            }}
          >
            Buy us a coffee
          </Box>
        </Box>
      </Typography>
    </AppBar>
  );
}
