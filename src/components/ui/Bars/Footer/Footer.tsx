import { Grid, Typography } from "@mui/material";
import "./Footer.css";

export const Footer = () => {
  return (
    <div className="footer-container">
      <Grid
        container
        direction="column"
        alignItems="center"
        className="footer-text"
      >
        <Grid item xs={12}>
          <Typography className="footer-title">
            Buen Sabor ©
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            color="textSecondary"
            variant="subtitle1"
            className="footer-subtitle"
          >
            {/* {`React | Redux | Material UI | React Router`} */}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};
