import React, { useContext } from "react";
import "./footerCSS.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
   Box, 
   Typography, 
   IconButton, 
   Tooltip,
   Container,
   Grid
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PhoneIcon from "@mui/icons-material/Phone";
import LanguageIcon from "@mui/icons-material/Language";
import { AppContext } from "../../context";
import Cookies from "js-cookie";

function Footer() {
   const { language, setLanguage, setUser, user } = useContext(AppContext);
   const navigation = useNavigate();
   const location = useLocation();

   let isFrench = language === "FR";
   const deconnexion = () => {
      setUser(null);
      Cookies.remove("user");
      navigation("/");
   };

   const listNumeroWhatSapp = ["", "", "", ""];

   return (
      // <>
      //    <footer class="footer">
      //       <div class="wapper">
      //          <div class="row-col">
      //             <div class="cat-col-25">
      //                <div class="pad-cat">
      //                   <div class="img logo-footer">
      //                      <img src="images/logo-footer.png" alt="" />
      //                   </div>
      //                   <div class="widget-footer">
      //                      <div class="menu-container">
      //                         <h4 class="titre-footer-rx text-center">Suivez-nous</h4>
      //                         <div class="footer-social-links">
      //                            <a
      //                               href="https:web.facebook.com/Leadershipprogramm/?_rdc=1&_rdr"
      //                               title="Facebook"
      //                               target="_blank"
      //                            >
      //                               <i class="fa-brands fa-facebook"></i>
      //                            </a>
      //                            <a
      //                               href="https:www.linkedin.com/company/programmeleadership"
      //                               title="Linkedin"
      //                               target="_blank"
      //                            >
      //                               <i class="fa-brands fa-linkedin"></i>
      //                            </a>
      //                            <a
      //                               href="https:api.whatsapp.com/send?phone=237695835877&text=Hi%20Programme%20Leadership"
      //                               title="Whatsapp"
      //                               target="_blank"
      //                            >
      //                               <i class="fa-brands fa-whatsapp"></i>
      //                            </a>
      //                         </div>
      //                      </div>
      //                   </div>
      //                </div>
      //             </div>
      //             <div class="cat-col-30">
      //                <div class="pad-cat">
      //                   <h4 class="titre-footer">À propos</h4>
      //                   <div class="widget-footer">
      //                      <ul>
      //                         <li>
      //                            <a href="#">Qui sommes nous?</a>
      //                         </li>
      //                         <li>
      //                            <a href="#">Nos objectifs</a>
      //                         </li>
      //                         <li>
      //                            <a href="#">Connexion</a>
      //                         </li>
      //                         <li>
      //                            <a href="#">S'inscrire pour suivre une formation</a>
      //                         </li>
      //                      </ul>
      //                   </div>
      //                </div>
      //             </div>
      //             <div class="cat-col-40">
      //                <div class="pad-cat">
      //                   <h4 class="titre-footer">Contact</h4>
      //                   <div class="widget-footer">
      //                      <ul>
      //                         <li>Palais de Congrès, Bastos Golf, Yaoundé Cameroun</li>
      //                         <li>contact@programmeleadership.org</li>
      //                         <li>+237 697 84 03 20 / +237 699 94 71 95</li>
      //                         <li>Site web : www.proqrammeleadership.orc</li>
      //                      </ul>
      //                   </div>
      //                </div>
      //             </div>
      //          </div>
      //       </div>
      //       <div class="wapper">
      //          <div class="row-col">
      //             <div class="cat-col-100">
      //                <div class="copyright_text text-center">
      //                   Programme Leadership © 2024, All Rights Reserved, by Group IRI.
      //                </div>
      //             </div>
      //          </div>
      //       </div>
      //    </footer>
      // </>

      <Box 
         className="mainDivFooter" 
         sx={{
            position: "relative",
            backgroundColor: "#1a472a",
            color: "white",
            paddingTop: 4,
            paddingBottom: 2,
            overflow: "hidden"
         }}
      >
         {/* Image de fond */}
         <Box 
            className="footerImageFooter" 
            sx={{
               position: "absolute",
               top: 0,
               left: 0,
               right: 0,
               bottom: 0,
               backgroundImage: "url(/images/footerImage.png)",
               backgroundSize: "cover",
               backgroundPosition: "center",
               opacity: 0.1,
               zIndex: 0
            }}
         />

         <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
            <Grid container spacing={4}>
               {/* Section NOUS CONTACTER */}
               <Grid item xs={12} md={6}>
                  <Box className="footerSection">
                     <Typography 
                        variant="h6" 
                        sx={{
                           fontFamily: "'Poppins', sans-serif",
                           fontWeight: 700,
                           fontSize: "1.5rem",
                           marginBottom: 3,
                           textTransform: "uppercase",
                           letterSpacing: "1px",
                           borderBottom: "2px solid rgba(255, 255, 255, 0.3)",
                           paddingBottom: 1
                        }}
                     >
                        {isFrench ? "NOUS CONTACTER" : "CONTACT US"}
                     </Typography>
                     
                     <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                        {/* WhatsApp */}
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                           <WhatsAppIcon sx={{ fontSize: "32px", color: "#25D366" }} />
                           <Box>
                              <Typography variant="body2" sx={{ opacity: 0.9, marginBottom: 0.5 }}>
                                 {isFrench ? "Nous écrire sur WhatsApp" : "Write to us on WhatsApp"}
                              </Typography>
                              <a
                                 href="https://chat.whatsapp.com/HZvUzVRNNHFFZNyden9NEi"
                                 target="_blank"
                                 rel="noopener noreferrer"
                                 style={{ 
                                    color: "white", 
                                    textDecoration: "none",
                                    fontWeight: 500,
                                    transition: "all 0.3s ease"
                                 }}
                                 onMouseEnter={(e) => e.target.style.opacity = "0.8"}
                                 onMouseLeave={(e) => e.target.style.opacity = "1"}
                              >
                                 {isFrench ? "Rejoindre le groupe" : "Join the group"}
                              </a>
                           </Box>
                        </Box>

                        {/* Téléphone */}
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                           <PhoneIcon sx={{ fontSize: "28px", color: "white", opacity: 0.9 }} />
                           <Box>
                              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                 <strong>Tel:</strong> +237 695 83 58 77 / +237 691 26 55 25
                              </Typography>
                           </Box>
                        </Box>

                        {/* Site Web */}
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                           <LanguageIcon sx={{ fontSize: "28px", color: "white", opacity: 0.9 }} />
                           <Box>
                              <Typography variant="body2" sx={{ opacity: 0.9, marginBottom: 0.5 }}>
                                 <strong>SITE WEB:</strong>
                              </Typography>
                              <a
                                 href="https://programmeleadership.org"
                                 target="_blank"
                                 rel="noreferrer"
                                 style={{ 
                                    color: "white", 
                                    textDecoration: "none",
                                    fontWeight: 500,
                                    transition: "all 0.3s ease"
                                 }}
                                 onMouseEnter={(e) => e.target.style.opacity = "0.8"}
                                 onMouseLeave={(e) => e.target.style.opacity = "1"}
                              >
                                 www.programmeleadership.org
                              </a>
                           </Box>
                        </Box>
                     </Box>
                  </Box>
               </Grid>

               {/* Section NOUS SUIVRE */}
               <Grid item xs={12} md={6}>
                  <Box className="footerSection">
                     <Typography 
                        variant="h6" 
                        sx={{
                           fontFamily: "'Poppins', sans-serif",
                           fontWeight: 700,
                           fontSize: "1.5rem",
                           marginBottom: 3,
                           textTransform: "uppercase",
                           letterSpacing: "1px",
                           borderBottom: "2px solid rgba(255, 255, 255, 0.3)",
                           paddingBottom: 1
                        }}
                     >
                        {isFrench ? "NOUS SUIVRE" : "FOLLOW US"}
                     </Typography>
                     
                     <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
                        <Tooltip title="Facebook" arrow>
                           <IconButton
                              component="a"
                              href="https://web.facebook.com/Leadershipprogramm/?_rdc=1&_rdr"
                              target="_blank"
                              rel="noreferrer"
                              sx={{
                                 backgroundColor: "rgba(255, 255, 255, 0.1)",
                                 color: "white",
                                 width: 56,
                                 height: 56,
                                 "&:hover": {
                                    backgroundColor: "#1877F2",
                                    transform: "translateY(-4px)",
                                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)"
                                 },
                                 transition: "all 0.3s ease"
                              }}
                           >
                              <FacebookIcon sx={{ fontSize: "32px" }} />
                           </IconButton>
                        </Tooltip>

                        <Tooltip title="WhatsApp" arrow>
                           <IconButton
                              component="a"
                              href="https://chat.whatsapp.com/HZvUzVRNNHFFZNyden9NEi"
                              target="_blank"
                              rel="noopener noreferrer"
                              sx={{
                                 backgroundColor: "rgba(255, 255, 255, 0.1)",
                                 color: "white",
                                 width: 56,
                                 height: 56,
                                 "&:hover": {
                                    backgroundColor: "#25D366",
                                    transform: "translateY(-4px)",
                                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)"
                                 },
                                 transition: "all 0.3s ease"
                              }}
                           >
                              <WhatsAppIcon sx={{ fontSize: "32px" }} />
                           </IconButton>
                        </Tooltip>

                        <Tooltip title="LinkedIn" arrow>
                           <IconButton
                              component="a"
                              href="https://www.linkedin.com/company/programmeleadership"
                              target="_blank"
                              rel="noreferrer"
                              sx={{
                                 backgroundColor: "rgba(255, 255, 255, 0.1)",
                                 color: "white",
                                 width: 56,
                                 height: 56,
                                 "&:hover": {
                                    backgroundColor: "#0077B5",
                                    transform: "translateY(-4px)",
                                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)"
                                 },
                                 transition: "all 0.3s ease"
                              }}
                           >
                              <LinkedInIcon sx={{ fontSize: "32px" }} />
                           </IconButton>
                        </Tooltip>
                     </Box>
                  </Box>
               </Grid>
            </Grid>

            {/* Copyright */}
            <Box 
               sx={{ 
                  textAlign: "center", 
                  marginTop: 4,
                  paddingTop: 3,
                  borderTop: "1px solid rgba(255, 255, 255, 0.2)"
               }}
            >
               <Typography 
                  variant="body2" 
                  sx={{ 
                     color: "rgba(255, 255, 255, 0.8)",
                     fontFamily: "'Inter', sans-serif",
                     fontSize: "0.95rem"
                  }}
               >
                  © 2024 Groupe IRI. {isFrench ? "Tous droits réservés." : "All rights reserved."}
               </Typography>
            </Box>
         </Container>
      </Box>
   );
}

export default Footer;
