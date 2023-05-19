import images from "@/assets";
import { Box, Card, CardContent, Grid, useTheme } from "@mui/material";
import Image from "next/image";

export default function Messages() {
  const theme = useTheme();
  return (
    <>
      <Grid
        item
        xs={12}
        sm={10}
        md={8}
        lg={8}
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "1rem",
        }}
      >
        <Card className="warning_card">
          <Image src={images.invite} width={80} height={80} alt="invite" />
          <CardContent className="card_content">
            It is forbidden and punishable to have multiple accounts on{" "}
            <Box component={"span"} color={theme.palette.warning.light}>
              drip.haus
            </Box>
            , any double account will be found by the team of drip.haus and will
            be banned.
          </CardContent>
        </Card>
        <Card className="warning_card">
          <Image src={images.invite} width={80} height={80} alt="invite" />
          <CardContent className="card_content">
            We are not the drip.haus team and we are not affiliated with{" "}
            <Box component={"span"} color={theme.palette.warning.light}>
              drip.haus
            </Box>
            , everything we do is simply to help the community and build on
            drip.haus a project we care about.
          </CardContent>
        </Card>
      </Grid>
    </>
  );
}

// export default function Messages() {
//   const theme = useTheme();
//   return (
//     <>
//       <Grid item xs={12} sm={5} md={4} lg={4}>
//         <Card className="warning_card">
//           <Image src={images.invite} width={80} height={80} alt="invite" />
//           <CardContent className="card_content">
//             It is forbidden and punishable to have multiple accounts on{" "}
//             <Box component={"span"} color={theme.palette.warning.light}>
//               drip.haus
//             </Box>
//             , any double account will be found by the team of drip.haus and will
//             be banned.
//           </CardContent>
//         </Card>
//       </Grid>
//       <Grid item xs={12} sm={5} md={4} lg={4}>
//         <Card className="warning_card">
//           <Image src={images.invite} width={80} height={80} alt="invite" />
//           <CardContent className="card_content">
//             We are not the drip.haus team and we are not affiliated with{" "}
//             <Box component={"span"} color={theme.palette.warning.light}>
//               drip.haus
//             </Box>
//             , everything we do is simply to help the community and build on
//             drip.haus a project we care about.
//           </CardContent>
//         </Card>
//       </Grid>
//     </>
//   );
// }
