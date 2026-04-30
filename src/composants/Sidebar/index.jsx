import React, { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AppContext } from "../../context";
import { removeUserCookie } from "../../utils/fonctions";
import { SidebarDatas } from "./SidebarDatas";
import { userProfile } from "../../utils/data";
import {
    Drawer,
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider,
    Typography,
    IconButton,
    Avatar,
    Tooltip,
    Collapse,
    Chip
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LogoutIcon from "@mui/icons-material/Logout";
import "./Sidebar.css";

function Sidebar({ setLarge, large }) {
   const navigation = useNavigate();
    const location = useLocation();
    const { language, setUser, user } = useContext(AppContext);
    const [openMenus, setOpenMenus] = useState({});
    const isFrench = language === "FR";
    const isProfessor = user?.profil === userProfile.PROFESSEUR_USER;

    const getSidebarItems = () => {
        if (!isProfessor) return SidebarDatas;

        const hiddenTitles = ["Contenu de formation", "Professeur", "Media", "Parametre"];
        const hiddenPaths = ["/mail", "/setting"];
        const hiddenSubPaths = ["/modules", "/cours", "/professeurs", "/professeur", "/rubrique", "/article"];

        return SidebarDatas
            .filter((item) => {
                if (hiddenTitles.includes(item.title)) return false;
                if (item.path && hiddenPaths.includes(item.path)) return false;
                return true;
            })
            .map((item) => {
                if (!item.subMenu) {
                    return item;
                }
                const filteredSubMenu = item.subMenu.filter((subItem) => !hiddenSubPaths.includes(subItem.path));
                return {
                    ...item,
                    subMenu: filteredSubMenu
                };
            });
    };

    const sidebarItems = getSidebarItems();

    const handleToggle = (order) => {
        setOpenMenus((prev) => ({
            ...prev,
            [order]: !prev[order]
        }));
    };

    const handleMenuClick = (item) => {
        if (!item.subMenu) {
            navigation(item.path);
        } else {
            handleToggle(item.order);
        }
    };

    const handleSubMenuClick = (path) => {
        navigation(path);
   };

   const deconnexion = () => {
      setUser(null);
      removeUserCookie();
      navigation("/");
   };

    const isActive = (path) => {
        return location.pathname === path || location.pathname.startsWith(path + "/");
    };

    const drawerWidth = 280;

   return (
        <>
            {/* Top Navbar */}
            <Box className="modernSidebarNavbar">
                <Box className="modernSidebarNavbarLeft">
                    <IconButton
                        onClick={() => setLarge(!large)}
                        className="modernSidebarMenuButton"
                        sx={{
                            color: "#1f2937",
                            "&:hover": {
                                backgroundColor: "rgba(22, 163, 74, 0.1)"
                            }
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box className="modernSidebarLogo">
                        <img
                            alt="Logo du programme leadership"
                            src="/images/logos02.png"
                            className="modernSidebarLogoImage"
                            onClick={() => navigation("/dashboard")}
                            style={{ cursor: "pointer" }}
                        />
                    </Box>
                </Box>
                <Box className="modernSidebarNavbarRight">
                    {user && (
                        <Box className="modernSidebarUserInfo">
                            <Avatar
                                sx={{
                                    width: 32,
                                    height: 32,
                                    bgcolor: "#16a34a",
                                    color: "#fff",
                                    fontSize: 14,
                                    fontWeight: 600
                                }}
                            >
                                {user.nom ? user.nom.charAt(0).toUpperCase() : "A"}
                            </Avatar>
                            <Typography variant="body2" className="modernSidebarUserName">
                                {user.nom || (isFrench ? "Administrateur" : "Administrator")}
                            </Typography>
                        </Box>
                    )}
                    <Tooltip title={isFrench ? "Déconnexion" : "Logout"}>
                        <IconButton
                            onClick={deconnexion}
                            sx={{
                                color: "#dc2626",
                                "&:hover": {
                                    backgroundColor: "rgba(220, 38, 38, 0.08)"
                                }
                            }}
                        >
                            <LogoutIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>

            {/* Sidebar Drawer */}
            <Drawer
                variant="persistent"
                anchor="left"
                open={!large}
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                        backgroundColor: "#1e293b",
                        color: "#fff",
                        borderRight: "1px solid rgba(148, 163, 184, 0.2)"
                    }
                }}
                className="modernSidebarDrawer"
            >
                <Box className="modernSidebarHeader">
                    <Typography variant="h6" className="modernSidebarHeaderTitle">
                        {isFrench ? "Menu Principal" : "Main Menu"}
                    </Typography>
                    <IconButton
                        onClick={() => setLarge(true)}
                        sx={{
                            color: "#fff",
                            "&:hover": {
                                backgroundColor: "rgba(255, 255, 255, 0.1)"
                            }
                        }}
                    >
                        <ChevronLeftIcon />
                    </IconButton>
                </Box>
                <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.1)" }} />
                <Box className="modernSidebarContent">
                    <List>
                        {sidebarItems.map((item, index) => {
                            if (item.userLevel > 5) return null;

                            const isItemActive = isActive(item.path);
                            const isMenuOpen = openMenus[item.order];
                            const hasSubMenu = item.subMenu && item.subMenu.length > 0;

                            return (
                                <React.Fragment key={item.order}>
                                    <ListItem disablePadding className="modernSidebarListItem">
                                        <ListItemButton
                                            onClick={() => handleMenuClick(item)}
                                            className={`modernSidebarListItemButton ${
                                                isItemActive ? "modernSidebarActive" : ""
                                            }`}
                                            sx={{
                                                minHeight: 48,
                                                "&:hover": {
                                                    backgroundColor: "rgba(34, 197, 94, 0.12)"
                                                },
                                                backgroundColor: isItemActive
                                                    ? "rgba(34, 197, 94, 0.18)"
                                                    : "transparent",
                                                borderLeft: isItemActive ? "4px solid #22c55e" : "4px solid transparent"
                                            }}
                                        >
                                            <ListItemIcon
                                                sx={{
                                                    minWidth: 40,
                                                    color: isItemActive ? "#4ade80" : "rgba(248, 250, 252, 0.75)"
                                                }}
                           >
                              {item.icon}
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={item.title}
                                                primaryTypographyProps={{
                                                    fontSize: 14,
                                                    fontWeight: isItemActive ? 600 : 400,
                                                    color: isItemActive ? "#fff" : "rgba(255, 255, 255, 0.9)"
                                                }}
                                            />
                                            {hasSubMenu && (
                                                <ListItemIcon sx={{ minWidth: 0, color: "rgba(255, 255, 255, 0.7)" }}>
                                                    {isMenuOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                                </ListItemIcon>
                                            )}
                                        </ListItemButton>
                                    </ListItem>
                                    {hasSubMenu && (
                                        <Collapse in={isMenuOpen} timeout="auto" unmountOnExit>
                                            <List component="div" disablePadding>
                                                {item.subMenu.map((subItem, subIndex) => {
                                                    if (subItem.userLevel > 5) return null;
                                                    const isSubActive = isActive(subItem.path);
                                                    return (
                                                        <ListItemButton
                                                            key={subIndex}
                                                            onClick={() => handleSubMenuClick(subItem.path)}
                                                            className={`modernSidebarSubListItemButton ${
                                                                isSubActive ? "modernSidebarSubActive" : ""
                                                            }`}
                                                            sx={{
                                                                pl: 6,
                                                                minHeight: 40,
                                                                "&:hover": {
                                                                    backgroundColor: "rgba(34, 197, 94, 0.1)"
                                                                },
                                                                backgroundColor: isSubActive
                                                                    ? "rgba(34, 197, 94, 0.14)"
                                                                    : "transparent"
                                                            }}
                                                        >
                                                            <ListItemText
                                                                primary={subItem.title}
                                                                primaryTypographyProps={{
                                                                    fontSize: 13,
                                                                    fontWeight: isSubActive ? 500 : 400,
                                                                    color: isSubActive
                                                                        ? "#86efac"
                                                                        : "rgba(248, 250, 252, 0.85)"
                                                                }}
                                                            />
                                                        </ListItemButton>
                                                    );
                                                })}
                                            </List>
                                        </Collapse>
                                    )}
                                </React.Fragment>
               );
            })}
                    </List>
                </Box>
            </Drawer>
        </>
   );
}

export default Sidebar;
