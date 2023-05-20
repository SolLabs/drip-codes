import images from "@/assets";
import { AppBar, Box, Container, Toolbar } from "@mui/material";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Image from "next/image";

// ASSETS
import PublicIcon from "@mui/icons-material/Public";
import TwitterIcon from "@mui/icons-material/Twitter";
import { FaDiscord, FaGithub } from "react-icons/fa";

export default function Header() {
  return (
    <>
      <AppBar component="nav" elevation={2} color="default">
        <Container maxWidth="xl">
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Image src={images.logo} alt="logo" width={150} height={40} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <a target="_blank" href="https://discord.gg/drip-haus">
                <FaDiscord size={25} />
              </a>
              <a target="_blank" href="https://twitter.com/drip_haus">
                {" "}
                <TwitterIcon sx={{ ml: 2.5 }} />
              </a>
              <a target="_blank" href="https://drip.haus/">
                {" "}
                <PublicIcon sx={{ mx: 2 }} />
              </a>
              <a target="_blank" href="https://github.com/SolLabs/drip-codes">
                {" "}
                <FaGithub size={25} style={{ marginRight: 20 }} />
              </a>
              <WalletMultiButton />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
