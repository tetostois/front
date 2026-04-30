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

   const handleLanguageChange = (event) => {
      setLanguage(event.target.value);
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
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
            borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
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
            {/* Desktop View */}
            <Box className="largeScreanList">
               <Box className="logoDiv">
                  <img 
                     className="logo" 
                     src="/images/logos02.png" 
                     alt="Logo du programme leadership"
                     onClick={() => navigation("/")}
                     style={{ cursor: "pointer" }}
                  />
               </Box>
               <Box className="allItemDiv">
                  {itemDataFilter.map((item) => {
                     const isActive = location.pathname === item.lien;
                     return (
                        <Box
                           key={item.id + "headerItem"}
                           className={`itemListDiv ${isActive ? "activeItemMenu" : ""}`}
                           onClick={() => navigation(item.lien)}
                        >
                           {getHeaderIcon(item) && (
                              <Box className="menuItemIcon">
                                 {getHeaderIcon(item)}
                              </Box>
                           )}
                           <Typography className="itemList">
                              {isFrench ? item.nom : item.nomEn}
                           </Typography>
                        </Box>
                     );
                  })}

                  <Box className="buttonAction">
                     {user ? (
                        <Button 
                           variant="outlined" 
                           className="logoutButton"
                           onClick={() => deconnexion()}
                           startIcon={<LogoutIcon />}
                           sx={{
                              textTransform: "none",
                              fontWeight: 600,
                              borderRadius: "8px",
                              borderColor: "#f56565",
                              color: "#f56565",
                              "&:hover": {
                                 borderColor: "#f56565",
                                 backgroundColor: "rgba(245, 101, 101, 0.08)",
                              },
                              transition: "background-color 0.2s ease",
                           }}
                        >
                           {isFrench ? "Déconnexion" : "Logout"}
                        </Button>
                     ) : (
                        <Button
                           variant="contained"
                           className="signupButton"
                           onClick={() => navigation("/signup")}
                           sx={{
                              backgroundColor: "#16a34a",
                              color: "white",
                              fontWeight: 600,
                              textTransform: "none",
                              borderRadius: "8px",
                              padding: "8px 16px",
                              boxShadow: "none",
                              "&:hover": {
                                 backgroundColor: "#15803d",
                              },
                              transition: "background-color 0.2s ease",
                           }}
                        >
                           {isFrench ? "S'inscrire" : "Sign Up"}
                        </Button>
                     )}
                     
                     <Box 
                        className="languageSelectContainer"
                        sx={{
                           display: "flex",
                           alignItems: "center",
                           gap: 1,
                           backgroundColor: "white",
                           borderRadius: "8px",
                           padding: "4px 12px 4px 12px",
                           border: "1px solid #e5e7eb",
                           transition: "background-color 0.2s ease, border-color 0.2s ease",
                           "&:hover": {
                              border: "1px solid #d1d5db",
                              backgroundColor: "#f9fafb",
                           },
                        }}
                     >
                        <LanguageIcon sx={{ 
                           fontSize: 18,
                           color: "#16a34a",
                           flexShrink: 0
                        }} />
                        <FormControl 
                           size="small" 
                           className="languageSelect"
                           sx={{ 
                              minWidth: 120,
                              flex: 1,
                              "& .MuiOutlinedInput-notchedOutline": {
                                 border: "none",
                              },
                              "&:hover .MuiOutlinedInput-notchedOutline": {
                                 border: "none",
                              },
                              "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                                 border: "none",
                              }
                           }}
                        >
                           <Select
                              value={language}
                              onChange={handleLanguageChange}
                              renderValue={(value) => value === "FR" ? "Français" : "English"}
                              displayEmpty={false}
                              sx={{
                                 color: "#1f2937",
                                 fontWeight: 600,
                                 fontFamily: "'Inter', sans-serif",
                                 fontSize: "14px",
                                 "& .MuiSelect-icon": {
                                    color: "#16a34a",
                                 },
                                 "& fieldset": {
                                    border: "none"
                                 },
                                 "& .MuiSelect-select": {
                                    padding: "6px 24px 6px 0px !important"
                                 }
                              }}
                           >
                              <MenuItem value="EN">English</MenuItem>
                              <MenuItem value="FR">Français</MenuItem>
                           </Select>
                        </FormControl>
                     </Box>

                     {user && (
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
                     )}
                     
                     <Menu
                        sx={{ 
                           mt: "50px",
                           "& .MuiPaper-root": {
                              borderRadius: "12px",
                              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
                              minWidth: 200
                           }
                        }}
                        id="menu-appbar"
                        anchorOrigin={{
                           vertical: "top",
                           horizontal: "right",
                        }}
                        keepMounted
                        transformOrigin={{
                           vertical: "top",
                           horizontal: "right",
                        }}
                        open={openMenuProfil}
                        onClose={() => setOpenMenuProfil(false)}
                     >
                        {settingsProfil.map((setting) => (
                           <MenuItem
                              key={setting.id + "idsetpro"}
                              onClick={() => {
                                 setOpenMenuProfil(false);
                                 setting.id === 3 ? deconnexion() : navigation(setting.lien);
                              }}
                              sx={{
                                 "&:hover": {
                                    backgroundColor: setting.id === 3 
                                       ? "rgba(245, 101, 101, 0.1)" 
                                       : "rgba(22, 163, 74, 0.1)",
                                 },
                                 transition: "all 0.2s ease",
                                 display: "flex",
                                 alignItems: "center",
                                 gap: 1
                              }}
                           >
                              {setting.id === 1 && <SettingsIcon sx={{ fontSize: 20, color: "#16a34a" }} />}
                              {setting.id === 2 && <DashboardIcon sx={{ fontSize: 20, color: "#16a34a" }} />}
                              {setting.id === 3 && <LogoutIcon sx={{ fontSize: 20, color: "#f56565" }} />}
                              <Typography 
                                 sx={{
                                    color: setting.id === 3 ? "#f56565" : "#1f2937",
                                    fontWeight: setting.id === 3 ? 700 : 500,
                                    fontFamily: "'Inter', sans-serif",
                                    flex: 1
                                 }}
                              >
                                 {isFrench ? setting.nom : setting.nomEn}
                              </Typography>
                           </MenuItem>
                        ))}
                     </Menu>
                  </Box>
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
                              {getHeaderIcon(item) && (
                                 <Box className="mobileMenuItemIcon">
                                    {getHeaderIcon(item)}
                                 </Box>
                              )}
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
                  
                  <Box 
                     sx={{ 
                        marginTop: 2,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        backgroundColor: "#f9fafb",
                        borderRadius: "12px",
                        padding: "4px 8px 4px 12px",
                        border: "1px solid #e5e7eb"
                     }}
                  >
                     <LanguageIcon sx={{ fontSize: 18, color: "#16a34a" }} />
                     <FormControl fullWidth size="small">
                        <Select
                           value={language}
                           onChange={handleLanguageChange}
                           renderValue={(value) => value === "FR" ? "Français" : "English"}
                           sx={{
                              fontWeight: 600,
                              fontFamily: "'Inter', sans-serif",
                              "& fieldset": {
                                 border: "none"
                              }
                           }}
                        >
                           <MenuItem value="EN">English</MenuItem>
                           <MenuItem value="FR">Français</MenuItem>
                        </Select>
                     </FormControl>
                  </Box>
               </Box>
            </Box>
         </Drawer>
      </AppBar>
   );
};
