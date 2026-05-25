import React, { useContext, useState } from "react";
import { AppContext } from "../../context";
import "./headerCSS.css";
import * as FaIcons from "react-icons/fa";
import { 
   Avatar, 
   Button, 
   IconButton, 
   Menu, 
   MenuItem, 
   Tooltip, 
   Typography, 
   Box, 
   AppBar, 
   Toolbar,
   Select,
   FormControl,
   Chip,
   Drawer,
   List,
   ListItem,
   ListItemButton,
   ListItemText,
   Divider
} from "@mui/material";
import SignInSignUp from "../SignInSignUp";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { itemData, itemDataAdmin, settingsProfil } from "./itemData";
import { userProfile } from "../../utils/data";
import PersonIcon from "@mui/icons-material/Person";
import Cookies from "js-cookie";
import LanguageIcon from "@mui/icons-material/Language";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuIcon from "@mui/icons-material/Menu";
import i18n from "../../i18n";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";
import ArticleIcon from "@mui/icons-material/Article";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InfoIcon from "@mui/icons-material/Info";
import SchoolIcon from "@mui/icons-material/School";
import PeopleIcon from "@mui/icons-material/People";
import ForumIcon from "@mui/icons-material/Forum";
//import { removeUserCookie } from "../../utils/fonctions";

export default function Header() {
   return <HeaderComponent />;
}

const HeaderComponent = () => {
   const { language, setLanguage, setUser, user } = useContext(AppContext);
   const [openMenuProfil, setOpenMenuProfil] = useState(false);
   const [openVerticalMenu, setOpenVerticalMenu] = useState(false);
   const navigation = useNavigate();
   const location = useLocation();

   let isAdmin = user && user.profil === userProfile.ADMIN_USER;
   let isProf = user && user.profil === userProfile.PROFESSEUR_USER;
   let isFrench = language === "FR";
   const deconnexion = () => {
      setUser(null);
      Cookies.remove("user");
      navigation("/");
   };

   const toggleLanguage = () => {
      const newLang = isFrench ? 'EN' : 'FR';
      setLanguage(newLang);
      // keep i18n in sync (project uses 'fr' / 'en')
      try { i18n.changeLanguage(isFrench ? 'en' : 'fr'); } catch (e) { }
   };

   let itemDataFilter = !user
      ? itemData.filter((item) => item.id !== 2)
      : user.profil !== userProfile.ADMIN_USER
      ? itemData
      : itemDataAdmin;

   if (isProf) {
      itemDataFilter = itemDataFilter.filter(
         (item) => item.lien !== "/medias" && item.nom?.toLowerCase() !== "medias" && item.id !== 5
      );
   }

   const getHeaderGradient = () =>
      "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)";

   const getHeaderIcon = (item) => {
      const lien = item.lien.toLowerCase();
      if (lien === "/" || lien === "/home") return <HomeIcon />;
      if (lien === "/dashboard") return <DashboardIcon />;
      if (lien.includes("/media") || lien.includes("/article") || lien === "/medias") return <ArticleIcon />;
      if (lien === "/about" || lien.includes("/a-propos") || lien.includes("/apropos")) return <InfoIcon />;
      if (lien.includes("/etudiant") || lien === "/etudiants") return <PeopleIcon />;
      if (lien.includes("/professeur") || lien === "/professeurs") return <SchoolIcon />;
      if (lien === "/forum") return <ForumIcon />;
      if (lien.includes("/module")) return <SchoolIcon />;
      return null;
   };

   return (
      <AppBar 
         position="static" 
         className="mainDivHeader"
         sx={{
            background: getHeaderGradient(),
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.08)",
            borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
            margin: 0,
            marginTop: 0,
            padding: 0,
            paddingTop: 0,
            top: 0,
            left: 0,
            right: 0,
         }}
      >
         <Toolbar className="headerToolbar">
            <Box className="headerContent">
               <Box className="logoDiv">
                  <img 
                     className="logo" 
                     src="/images/logos02.png" 
                     alt="Logo du programme leadership"
                     onClick={() => navigation("/")}
                     style={{ cursor: "pointer" }}
                  />
               </Box>

               <Box className="navLinks">
                  {itemDataFilter.map((item) => {
                     const isActive = location.pathname === item.lien;
                     return (
                        <Box
                           key={item.id + "headerItem"}
                           className={`itemListDiv ${isActive ? "activeItemMenu" : ""}`}
                           onClick={() => navigation(item.lien)}
                        >
                           <Typography className="itemList">
                              {isFrench ? item.nom : item.nomEn}
                           </Typography>
                        </Box>
                     );
                  })}
               </Box>

               <Box className="actionButtons">
                  <Button
                     className="languageToggleButton"
                     onClick={toggleLanguage}
                     startIcon={<LanguageIcon sx={{ color: "#16a34a", fontSize: 16 }} />}
                     sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                        px: 2,
                        py: 1.5,
                        textTransform: "none",
                        fontWeight: 600,
                        color: "#4b5563",
                        backgroundColor: "white",
                        borderRadius: "12px",
                        border: "1px solid #e5e7eb",
                        boxShadow: "none",
                        minWidth: 78,
                        justifyContent: "center",
                        fontSize: "0.875rem",
                        "&:hover": {
                           backgroundColor: "#f3f4f6",
                           color: "#111827",
                        },
                        "& .MuiButton-startIcon": {
                           marginRight: 4
                        }
                     }}
                     title={isFrench ? "Passer en anglais" : "Switch to French"}
                     aria-label={isFrench ? "Passer en anglais" : "Switch to French"}
                  >
                     {isFrench ? "EN" : "FR"}
                  </Button>

                  {!user ? (
                     <>
                        <Button
                           variant="text"
                           className="loginButton"
                           onClick={() => navigation("/connexion")}
                           sx={{
                              textTransform: "none",
                              fontWeight: 600,
                              color: "#1f2937",
                              borderRadius: "999px",
                              padding: "10px 20px",
                              minWidth: 110,
                              transition: "background-color 0.2s ease",
                              "&:hover": {
                                 backgroundColor: "rgba(22, 163, 74, 0.08)",
                              }
                           }}
                        >
                           {isFrench ? "Connexion" : "Sign In"}
                        </Button>
                        <Button
                           variant="contained"
                           className="signupButton"
                           onClick={() => navigation("/signup")}
                           sx={{
                              backgroundColor: "#16a34a",
                              color: "white",
                              fontWeight: 600,
                              textTransform: "none",
                              borderRadius: "999px",
                              padding: "10px 22px",
                              boxShadow: "none",
                              "&:hover": {
                                 backgroundColor: "#15803d",
                              },
                              transition: "background-color 0.2s ease",
                           }}
                        >
                           {isFrench ? "S'inscrire" : "Sign Up"}
                        </Button>
                     </>
                  ) : (
                     <>
                        <Button 
                           variant="outlined" 
                           className="logoutButton"
                           onClick={() => deconnexion()}
                           startIcon={<LogoutIcon />}
                           sx={{
                              textTransform: "none",
                              fontWeight: 600,
                              borderRadius: "999px",
                              borderColor: "#f56565",
                              color: "#f56565",
                              padding: "10px 18px",
                              "&:hover": {
                                 borderColor: "#f56565",
                                 backgroundColor: "rgba(245, 101, 101, 0.08)",
                              },
                              transition: "background-color 0.2s ease",
                           }}
                        >
                           {isFrench ? "Déconnexion" : "Logout"}
                        </Button>
                        <Tooltip title={isFrench ? "Menu profil" : "Profile menu"}>
                           <IconButton
                              onClick={() => setOpenMenuProfil(true)}
                              className="profileIconButton"
                              sx={{
                                 border: "2px solid #e5e7eb",
                                 "&:hover": {
                                    border: "2px solid #16a34a",
                                    backgroundColor: "rgba(22, 163, 74, 0.1)",
                                    transform: "scale(1.1)",
                                 },
                                 transition: "all 0.3s ease"
                              }}
                           >
                              <AccountCircleIcon 
                                 sx={{ 
                                    fontSize: "32px",
                                    color: "#16a34a"
                                 }} 
                              />
                           </IconButton>
                        </Tooltip>
                     </>
                  )}
               </Box>
            </Box>

            {/* Mobile View */}
            <Box className="smallScreanList">
               <Box className="logoDiv">
                  <img 
                     className="logo" 
                     src="/images/logoprogrammeleadership.png" 
                     alt="Logo programme leadership"
                     onClick={() => navigation("/")}
                     style={{ cursor: "pointer" }}
                  />
               </Box>
               <Box className="buttonAction">
                  <IconButton
                     onClick={() => setOpenVerticalMenu((prev) => !prev)}
                     sx={{
                        color: "#1f2937",
                        "&:hover": {
                           backgroundColor: "rgba(22, 163, 74, 0.1)",
                        }
                     }}
                  >
                     {openVerticalMenu ? <CloseIcon /> : <MenuIcon />}
                  </IconButton>
               </Box>
            </Box>
         </Toolbar>

         {/* Mobile Drawer */}
         <Drawer
            anchor="right"
            open={openVerticalMenu}
            onClose={() => setOpenVerticalMenu(false)}
            sx={{
               "& .MuiDrawer-paper": {
                  width: "280px",
                  borderRadius: "16px 0 0 16px",
                  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
               }
            }}
         >
            <Box className="mobileMenuContainer">
               <Box className="mobileMenuHeader">
                  <Typography variant="h6" className="mobileMenuTitle">
                     {isFrench ? "Menu" : "Menu"}
                  </Typography>
                  <IconButton
                     onClick={() => setOpenVerticalMenu(false)}
                     sx={{ color: "#16a34a" }}
                  >
                     <CloseIcon />
                  </IconButton>
               </Box>
               <Divider />
               <List className="mobileMenuList">
                  {itemDataFilter.map((item) => {
                     const isActive = location.pathname === item.lien;
                     return (
                        <ListItem key={item.id + "mobileItem"} disablePadding>
                           <ListItemButton
                              className={`mobileMenuItem ${isActive ? "activeMobileItem" : ""}`}
                              onClick={() => {
                                 navigation(item.lien);
                                 setOpenVerticalMenu(false);
                              }}
                           >
                              <ListItemText 
                                 primary={isFrench ? item.nom : item.nomEn}
                                 primaryTypographyProps={{
                                    fontFamily: "'Poppins', sans-serif",
                                    fontWeight: isActive ? 600 : 500,
                                    fontSize: "16px"
                                 }}
                              />
                           </ListItemButton>
                        </ListItem>
                     );
                  })}
               </List>
               <Divider />
               <Box className="mobileMenuActions">
                  {user ? (
                     <Button
                        variant="outlined"
                        color="error"
                        fullWidth
                        startIcon={<LogoutIcon />}
                        onClick={() => {
                           deconnexion();
                           setOpenVerticalMenu(false);
                        }}
                        sx={{
                           textTransform: "none",
                           fontWeight: 600,
                           borderRadius: "8px",
                           marginBottom: 2,
                        }}
                     >
                        {isFrench ? "Déconnexion" : "Logout"}
                     </Button>
                  ) : (
                     <Box sx={{ padding: 2 }}>
                        <SignInSignUp signIn={false} fullWidth={true} />
                     </Box>
                  )}
                  
                  <Button
                     className="languageToggleButton"
                     onClick={toggleLanguage}
                     startIcon={<LanguageIcon sx={{ color: "#16a34a", fontSize: 16 }} />}
                     sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                        px: 2,
                        py: 1.5,
                        textTransform: "none",
                        fontWeight: 600,
                        color: "#4b5563",
                        backgroundColor: "white",
                        borderRadius: "12px",
                        border: "1px solid #e5e7eb",
                        boxShadow: "none",
                        minWidth: 78,
                        justifyContent: "center",
                        fontSize: "0.875rem",
                        "&:hover": {
                           backgroundColor: "#f3f4f6",
                           color: "#111827",
                        },
                        "& .MuiButton-startIcon": {
                           marginRight: 4
                        }
                     }}
                     title={isFrench ? "Passer en anglais" : "Switch to French"}
                     aria-label={isFrench ? "Passer en anglais" : "Switch to French"}
                  >
                     {isFrench ? "EN" : "FR"}
                  </Button>
               </Box>
            </Box>
         </Drawer>
      </AppBar>
   );
};
