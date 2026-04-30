import React, { useContext, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Typography, Container, Link } from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneIcon from "@mui/icons-material/Phone";
import PlaceIcon from "@mui/icons-material/Place";
import { AppContext } from "../../context";
import "./footerCSS.css";

/** Textes alignés sur `project` (Footer.tsx + i18n fr/en). */
const copy = {
   FR: {
      quickLinks: "Liens Rapides",
      home: "Accueil",
      about: "À propos",
      certifications: "Certifications",
      contact: "Contact",
      certs: [
         "Initiation Pratique Générale",
         "Cadre & Manager",
         "Rentabilité Entrepreneuriale",
         "Chef d'entreprise",
         "Investisseur Africain",
         "Ingénieries Spécifiques",
      ],
      copyright: "© 2026 ENALE Programme LEADERSHIP. Tous droits réservés.",
      bannerAlt: "Bannière",
   },
   EN: {
      quickLinks: "Quick Links",
      home: "Home",
      about: "About",
      certifications: "Certifications",
      contact: "Contact",
      certs: [
         "General Practical Introduction",
         "Manager & Executive",
         "Entrepreneurial Profitability",
         "Business Owner",
         "African Investor",
         "Specific Engineering",
      ],
      copyright: "© 2026 ENALE LEADERSHIP Programme. All rights reserved.",
      bannerAlt: "Banner",
   },
};

function Footer() {
   const { language } = useContext(AppContext);
   const isFr = language === "FR";
   const t = isFr ? copy.FR : copy.EN;
   const [logoSrc, setLogoSrc] = useState("/images/05.png");

   const linkSx = {
      color: "rgba(255, 255, 255, 0.8)",
      textDecoration: "none",
      fontSize: "0.875rem",
      transition: "color 0.2s",
      "&:hover": { color: "#fff" },
   };

   return (
      <Box component="footer" className="mainDivFooter">
         {/* Zone verte : uniquement le bloc liens / contact (pas la bande copyright) */}
         <Box sx={{ bgcolor: "#15803d", color: "#fff" }}>
         <Container
            maxWidth={false}
            sx={{
               maxWidth: "1280px",
               mx: "auto",
               px: { xs: 2, sm: 3, lg: 4 },
               py: 6,
            }}
         >
            <Box
               sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "repeat(4, 1fr)" },
                  gap: 4,
               }}
            >
               <Box sx={{ display: "flex", flexDirection: "column", gap: 2, ml: { xs: 0, sm: 1 } }}>
                  <Link component={RouterLink} to="/" sx={{ display: "flex", alignItems: "center", width: "fit-content" }}>
                     <Box
                        component="img"
                        src={logoSrc}
                        alt="Logo"
                        onError={() => setLogoSrc("/images/logos02.png")}
                        sx={{
                           height: { xs: 48, sm: 56, md: 64 },
                           width: "auto",
                           maxWidth: 220,
                           objectFit: "contain",
                        }}
                     />
                  </Link>
                  <Box sx={{ display: "flex", gap: 2 }} role="list">
                     <Box
                        component="a"
                        href="https://www.linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                     >
                        <Box component="img" src="/icons/linkedin.svg" alt="" sx={{ width: 24, height: 24 }} aria-hidden />
                     </Box>
                     <Box
                        component="a"
                        href="https://wa.me/+237695835877"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="WhatsApp"
                     >
                        <Box component="img" src="/icons/whatsapp.svg" alt="" sx={{ width: 24, height: 24 }} aria-hidden />
                     </Box>
                     <Box
                        component="a"
                        href="https://www.facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Facebook"
                     >
                        <Box component="img" src="/icons/facebook.svg" alt="" sx={{ width: 24, height: 24 }} aria-hidden />
                     </Box>
                  </Box>
               </Box>

               <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: "0.875rem" }}>
                     {t.quickLinks}
                  </Typography>
                  <Box component="ul" sx={{ m: 0, p: 0, listStyle: "none", "& li": { mb: 1 } }}>
                     <li>
                        <Link component={RouterLink} to="/" sx={linkSx}>
                           {t.home}
                        </Link>
                     </li>
                     <li>
                        <Link component={RouterLink} to="/apropos" sx={linkSx}>
                           {t.about}
                        </Link>
                     </li>
                  </Box>
               </Box>

               <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: "0.875rem" }}>
                     {t.certifications}
                  </Typography>
                  <Box component="ul" sx={{ m: 0, p: 0, listStyle: "none", "& li": { mb: 1 } }}>
                     {t.certs.map((label) => (
                        <li key={label}>
                           <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "0.875rem" }}>
                              {label}
                           </Typography>
                        </li>
                     ))}
                  </Box>
               </Box>

               <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: "0.875rem" }}>
                     {t.contact}
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                     <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                        <MailOutlineIcon sx={{ fontSize: 16, color: "rgba(255,255,255,0.9)", mt: 0.25, flexShrink: 0 }} />
                        <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "0.875rem", wordBreak: "break-word" }}>
                           contact@programmeleadership.org
                        </Typography>
                     </Box>
                     <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                        <PhoneIcon sx={{ fontSize: 16, color: "rgba(255,255,255,0.9)", mt: 0.25, flexShrink: 0 }} />
                        <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "0.875rem", wordBreak: "break-word" }}>
                           +237 695 83 58 77 / +237 672 64 33 53
                        </Typography>
                     </Box>
                     <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                        <PlaceIcon sx={{ fontSize: 16, color: "rgba(255,255,255,0.9)", mt: 0.25, flexShrink: 0 }} />
                        <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "0.875rem", wordBreak: "break-word" }}>
                           Palais de Congrès, Bastos Golf, Yaoundé Cameroun
                        </Typography>
                     </Box>
                  </Box>
               </Box>
            </Box>
         </Container>
         </Box>

         {/* Bande copyright : même rendu que le bandeau HeaderContent (footerImage.png en CSS background) */}
         <Box
            className="footerCopyrightStrip"
            role="img"
            aria-label={t.bannerAlt}
            sx={{
               bgcolor: "#0f172a",
               backgroundImage: "url(/images/footerImage.png)",
               backgroundSize: "cover",
               backgroundRepeat: "no-repeat",
               backgroundPosition: "center",
            }}
         >
            <Box sx={{ position: "absolute", inset: 0, bgcolor: "rgba(0, 0, 0, 0.45)" }} />
            <Box
               sx={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  px: 2,
               }}
            >
               <Typography sx={{ color: "#fff", textAlign: "center", fontSize: { xs: "0.875rem", md: "1.125rem" } }}>
                  {t.copyright}
               </Typography>
            </Box>
         </Box>
      </Box>
   );
}

export default Footer;
