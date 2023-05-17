import images from "@/assets";
import { AppBar, Box, Container, Toolbar } from "@mui/material";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Image from "next/image";

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

            <WalletMultiButton />
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
