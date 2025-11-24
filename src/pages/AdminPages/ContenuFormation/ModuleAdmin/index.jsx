import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Box,
    Typography,
    Button,
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    Backdrop,
    Alert,
    Card,
    CardContent
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useFetch } from "../../../../utils/hooks/FetchData";
import { MessageErrorServeur } from "../../../../composants/MessageComponent";
import { AppContext } from "../../../../context";

export default function ModuleAdmin() {
    const navigation = useNavigate();
    const { language } = useContext(AppContext);
    const [filter, setFilter] = useState(null);
    const [update, setUpdate] = useState(false);
    const { isLoading, data, error } = useFetch(`/admin/modules`, "GET", null, filter, update);
    const isFrench = language === "FR";

    const getStatusColor = (etat) => {
        switch (etat) {
            case "ACTIF":
            case "ACTIVE":
                return { bg: "#e6fffa", color: "#234e52", border: "#38f9d7" };
            case "INACTIF":
            case "INACTIVE":
                return { bg: "#fed7d7", color: "#742a2a", border: "#fa709a" };
            default:
                return { bg: "#edf2f7", color: "#4a5568", border: "#cbd5e0" };
        }
    };

    return (
        <Box className="adminPageContainer">
            {/* Header Section */}
            <Box className="adminPageHeader">
                <Box className="adminPageHeaderContent">
                    <Box className="adminPageHeaderIconContainer">
                        <SchoolIcon className="adminPageHeaderIcon" />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="h4" className="adminPageTitle">
                            {isFrench ? "Liste des Modules" : "Modules List"}
                        </Typography>
                        <Typography variant="body1" className="adminPageSubtitle">
                            {isFrench
                                ? "Gérez tous les modules de formation disponibles sur la plateforme"
                                : "Manage all training modules available on the platform"}
                        </Typography>
                    </Box>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => navigation("/module/ajouter")}
                    sx={{
                        background: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
                        color: "#fff",
                        fontWeight: 700,
                        textTransform: "none",
                        px: 3,
                        py: 1.5,
                        boxShadow: "0 4px 16px rgba(67, 233, 123, 0.3)",
                        "&:hover": {
                            background: "linear-gradient(135deg, #38f9d7 0%, #43e97b 100%)",
                            boxShadow: "0 6px 20px rgba(67, 233, 123, 0.4)"
                        }
                    }}
                >
                    {isFrench ? "Ajouter un Module" : "Add Module"}
                </Button>
            </Box>

            {/* Loading State */}
            {isLoading ? (
                <Box className="adminPageLoading">
                    <Backdrop open={true} sx={{ zIndex: 1000, color: "#fff" }}>
                        <Box sx={{ textAlign: "center" }}>
                            <CircularProgress size={60} sx={{ color: "#667eea", mb: 2 }} />
                            <Typography variant="h6" sx={{ color: "#fff", mt: 2 }}>
                                {isFrench ? "Chargement des modules..." : "Loading modules..."}
                            </Typography>
                        </Box>
                    </Backdrop>
                </Box>
            ) : error ? (
                <Box className="adminPageError">
                    <MessageErrorServeur />
                </Box>
            ) : (
                <Box className="adminPageContent">
                    <Card
                        sx={{
                            borderRadius: "20px",
                            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                            overflow: "hidden"
                        }}
                    >
                        <Box
                            sx={{
                                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                p: 2,
                                display: "flex",
                                alignItems: "center",
                                gap: 1
                            }}
                        >
                            <SchoolIcon sx={{ color: "#fff", fontSize: 28 }} />
                            <Typography variant="h6" sx={{ color: "#fff", fontWeight: 700 }}>
                                {isFrench ? "Modules de Formation" : "Training Modules"}
                            </Typography>
                        </Box>
                        <CardContent sx={{ p: 0 }}>
                            {!data || data.length === 0 ? (
                                <Box sx={{ p: 4, textAlign: "center" }}>
                                    <Alert severity="info" sx={{ borderRadius: "12px" }}>
                                        {isFrench ? "Aucun module trouvé" : "No modules found"}
                                    </Alert>
                                </Box>
                            ) : (
                                <TableContainer
                                    component={Paper}
                                    sx={{
                                        borderRadius: 0,
                                        boxShadow: "none"
                                    }}
                                >
                                    <Table>
                                        <TableHead>
                                            <TableRow
                                                sx={{
                                                    background: "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)"
                                                }}
                                            >
                                                <TableCell sx={{ fontWeight: 700, color: "#1a202c" }}>N°</TableCell>
                                                <TableCell sx={{ fontWeight: 700, color: "#1a202c" }}>
                                                    {isFrench ? "Titre" : "Title"}
                                                </TableCell>
                                                <TableCell sx={{ fontWeight: 700, color: "#1a202c" }}>
                                                    {isFrench ? "Titre (Anglais)" : "Title (English)"}
                                                </TableCell>
                                                <TableCell sx={{ fontWeight: 700, color: "#1a202c" }}>
                                                    {isFrench ? "État" : "Status"}
                                                </TableCell>
                                                <TableCell sx={{ fontWeight: 700, color: "#1a202c" }}>
                                                    {isFrench ? "Date de Déblocage" : "Unlock Date"}
                                                </TableCell>
                                                <TableCell sx={{ fontWeight: 700, color: "#1a202c" }}>
                                                    {isFrench ? "Actions" : "Actions"}
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {data.map((module, index) => {
                                                const statusColors = getStatusColor(module.etat);
                                                const dateDeblocage = module.dateDeblocage
                                                    ? new Date(module.dateDeblocage).toLocaleDateString("fr-FR", {
                                                          day: "numeric",
                                                          month: "short",
                                                          year: "numeric"
                                                      })
                                                    : "-";

                                                return (
                                                    <TableRow
                                                        key={module.idModule}
                                                        onClick={() => navigation("/module/" + module.idModule)}
                                                        sx={{
                                                            "&:hover": {
                                                                backgroundColor: "rgba(102, 126, 234, 0.05)",
                                                                cursor: "pointer",
                                                                transform: "scale(1.01)",
                                                                transition: "all 0.2s ease"
                                                            },
                                                            transition: "background-color 0.2s ease"
                                                        }}
                                                    >
                                                        <TableCell>
                                                            <Chip
                                                                label={index + 1}
                                                                size="small"
                                                                sx={{
                                                                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                                                    color: "#fff",
                                                                    fontWeight: 700,
                                                                    minWidth: 40
                                                                }}
                                                            />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography variant="body1" sx={{ fontWeight: 500, color: "#1a202c" }}>
                                                                {module.titre || "-"}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography variant="body2" sx={{ color: "#718096" }}>
                                                                {module.titreEn || "-"}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Chip
                                                                label={module.etat || "-"}
                                                                size="small"
                                                                sx={{
                                                                    backgroundColor: statusColors.bg,
                                                                    color: statusColors.color,
                                                                    fontWeight: 600,
                                                                    border: `1px solid ${statusColors.border}`,
                                                                    textTransform: "uppercase",
                                                                    fontSize: "11px"
                                                                }}
                                                            />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                                <CalendarTodayIcon sx={{ fontSize: 16, color: "#667eea" }} />
                                                                <Typography variant="body2" sx={{ color: "#718096" }}>
                                                                    {dateDeblocage}
                                                                </Typography>
                                                            </Box>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Button
                                                                variant="outlined"
                                                                size="small"
                                                                startIcon={<VisibilityIcon />}
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    navigation("/module/" + module.idModule);
                                                                }}
                                                                sx={{
                                                                    textTransform: "none",
                                                                    borderRadius: "8px",
                                                                    borderColor: "#667eea",
                                                                    color: "#667eea",
                                                                    fontWeight: 600,
                                                                    "&:hover": {
                                                                        borderColor: "#764ba2",
                                                                        backgroundColor: "rgba(102, 126, 234, 0.1)",
                                                                        transform: "translateY(-2px)",
                                                                        boxShadow: "0 4px 12px rgba(102, 126, 234, 0.2)"
                                                                    },
                                                                    transition: "all 0.2s ease"
                                                                }}
                                                            >
                                                                {isFrench ? "Voir" : "View"}
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            )}
                        </CardContent>
                    </Card>
                </Box>
            )}
        </Box>
    );
}
