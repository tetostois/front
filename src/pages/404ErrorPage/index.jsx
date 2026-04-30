import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
   Box,
   Typography,
   Button,
   Container,
   Card,
   CardContent,
   Grid
} from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import HomeIcon from "@mui/icons-material/Home";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import Header from "../../composants/Header";
import { AppContext } from "../../context";
import "./Error404Page.css";

const Error404Page = () => {
   const { language } = useContext(AppContext);
   const navigate = useNavigate();
   const isFrench = language === "FR";

   return (
      <>
         <Header />
         <Box className="error-page">
            <Container maxWidth="md">
               <Card
                  sx={{
                     borderRadius: "24px",
                     boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
                     overflow: "hidden",
                     background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                     position: "relative"
                  }}
               >
                  {/* Decorative elements */}
                  <Box
                     sx={{
                        position: "absolute",
                        top: -50,
                        right: -50,
                        width: 200,
                        height: 200,
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.1)",
                        zIndex: 0
                     }}
                  />
                  <Box
                     sx={{
                        position: "absolute",
                        bottom: -30,
                        left: -30,
                        width: 150,
                        height: 150,
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.1)",
                        zIndex: 0
                     }}
                  />

                  <CardContent sx={{ p: 6, position: "relative", zIndex: 1 }}>
                     <Grid container spacing={4} alignItems="center" justifyContent="center">
                        {/* Icon Section */}
                        <Grid item xs={12} sx={{ textAlign: "center" }}>
                           <Box
                              sx={{
                                 display: "inline-flex",
                                 alignItems: "center",
                                 justifyContent: "center",
                                 width: 180,
                                 height: 180,
                                 borderRadius: "50%",
                                 background: "rgba(255,255,255,0.2)",
                                 backdropFilter: "blur(10px)",
                                 mb: 3,
                                 animation: "pulse 2s ease-in-out infinite"
                              }}
                           >
                              <ErrorOutlineIcon
                                 sx={{
                                    fontSize: 100,
                                    color: "#fff",
                                    animation: "bounce 2s ease-in-out infinite"
                                 }}
                              />
                           </Box>
                        </Grid>

                        {/* Error Code */}
                        <Grid item xs={12} sx={{ textAlign: "center" }}>
                           <Typography
                              variant="h1"
                              sx={{
                                 fontSize: { xs: "80px", sm: "120px", md: "150px" },
                                 fontWeight: 900,
                                 color: "#fff",
                                 textShadow: "0 4px 20px rgba(0,0,0,0.2)",
                                 mb: 2,
                                 lineHeight: 1
                              }}
                           >
                              404
                           </Typography>
                        </Grid>

                        {/* Error Message */}
                        <Grid item xs={12} sx={{ textAlign: "center" }}>
                           <Typography
                              variant="h4"
                              sx={{
                                 color: "#fff",
                                 fontWeight: 700,
                                 mb: 2,
                                 fontSize: { xs: "24px", sm: "32px" }
                              }}
                           >
                              {isFrench
                                 ? "Page introuvable"
                                 : "Page Not Found"}
                           </Typography>
                           <Typography
                              variant="body1"
                              sx={{
                                 color: "rgba(255,255,255,0.9)",
                                 fontSize: { xs: "16px", sm: "18px" },
                                 mb: 4,
                                 maxWidth: 500,
                                 mx: "auto"
                              }}
                           >
                              {isFrench
                                 ? "Désolé, la page que vous recherchez n'existe pas ou a été déplacée."
                                 : "Sorry, the page you are looking for does not exist or has been moved."}
                           </Typography>
                        </Grid>

                        {/* Action Buttons */}
                        <Grid item xs={12} sx={{ textAlign: "center" }}>
                           <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
                              <Button
                                 variant="contained"
                                 startIcon={<HomeIcon />}
                                 component={Link}
                                 to="/home"
                                 sx={{
                                    background: "rgba(255,255,255,0.95)",
                                    color: "#16a34a",
                                    fontWeight: 700,
                                    textTransform: "none",
                                    px: 4,
                                    py: 1.5,
                                    borderRadius: "12px",
                                    fontSize: "16px",
                                    boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
                                    "&:hover": {
                                       background: "#fff",
                                       transform: "translateY(-2px)",
                                       boxShadow: "0 12px 32px rgba(0,0,0,0.3)"
                                    },
                                    transition: "all 0.3s ease"
                                 }}
                              >
                                 {isFrench ? "Retour à l'accueil" : "Back to Home"}
                              </Button>
                              <Button
                                 variant="outlined"
                                 startIcon={<ArrowBackIcon />}
                                 onClick={() => navigate(-1)}
                                 sx={{
                                    borderColor: "rgba(255,255,255,0.5)",
                                    color: "#fff",
                                    fontWeight: 600,
                                    textTransform: "none",
                                    px: 4,
                                    py: 1.5,
                                    borderRadius: "12px",
                                    fontSize: "16px",
                                    backdropFilter: "blur(10px)",
                                    background: "rgba(255,255,255,0.1)",
                                    "&:hover": {
                                       borderColor: "#fff",
                                       background: "rgba(255,255,255,0.2)",
                                       transform: "translateY(-2px)"
                                    },
                                    transition: "all 0.3s ease"
                                 }}
                              >
                                 {isFrench ? "Page précédente" : "Previous Page"}
                              </Button>
                           </Box>
                        </Grid>

                        {/* Additional Help */}
                        <Grid item xs={12} sx={{ textAlign: "center", mt: 2 }}>
                           <Box
                              sx={{
                                 display: "flex",
                                 alignItems: "center",
                                 justifyContent: "center",
                                 gap: 1,
                                 color: "rgba(255,255,255,0.8)"
                              }}
                           >
                              <SearchOffIcon sx={{ fontSize: 20 }} />
                              <Typography variant="body2">
                                 {isFrench
                                    ? "Vérifiez l'URL ou utilisez les boutons ci-dessus pour naviguer"
                                    : "Check the URL or use the buttons above to navigate"}
                              </Typography>
                           </Box>
                        </Grid>
                     </Grid>
                  </CardContent>
               </Card>
            </Container>
         </Box>
      </>
   );
};

export default Error404Page;
