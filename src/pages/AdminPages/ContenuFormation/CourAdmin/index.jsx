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
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import QuizIcon from "@mui/icons-material/Quiz";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import { useFetch } from "../../../../utils/hooks/FetchData";
import { MessageErrorServeur } from "../../../../composants/MessageComponent";
import { AppContext } from "../../../../context";

export default function CourAdmin() {
    const navigation = useNavigate();
    const { language } = useContext(AppContext);
    const [filter, setFilter] = useState(null);
    const [update, setUpdate] = useState(false);
    const { isLoading, data, error } = useFetch(`/admin/cours`, "GET", null, filter, update);
    const isFrench = language === "FR";

    const getStatusColor = (etat) => {
        switch (etat) {
            case "ACTIF":
            case "ACTIVE":
                return { bg: "#e6fffa", color: "#234e52", border: "#16a34a" };
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
                        <MenuBookIcon className="adminPageHeaderIcon" />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="h4" className="adminPageTitle">
                            {isFrench ? "Liste des Cours" : "Courses List"}
                        </Typography>
                        <Typography variant="body1" className="adminPageSubtitle">
                            {isFrench
                                ? "Gérez tous les cours et chapitres de formation disponibles sur la plateforme"
                                : "Manage all training courses and chapters available on the platform"}
                        </Typography>
                    </Box>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => navigation("/cour/ajouter")}
                    sx={{
                        background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                        color: "#fff",
                        fontWeight: 700,
                        textTransform: "none",
                        px: 3,
                        py: 1.5,
                        boxShadow: "0 4px 16px rgba(67, 233, 123, 0.3)",
                        "&:hover": {
                            background: "linear-gradient(135deg, #16a34a 0%, #16a34a 100%)",
                            boxShadow: "0 6px 20px rgba(67, 233, 123, 0.4)"
                        }
                    }}
                >
                    {isFrench ? "Ajouter un Cours" : "Add Course"}
                </Button>
            </Box>

            {/* Loading State */}
            {isLoading ? (
                <Box className="adminPageLoading">
                    <Backdrop open={true} sx={{ zIndex: 1000, color: "#fff" }}>
                        <Box sx={{ textAlign: "center" }}>
                            <CircularProgress size={60} sx={{ color: "#16a34a", mb: 2 }} />
                            <Typography variant="h6" sx={{ color: "#fff", mt: 2 }}>
                                {isFrench ? "Chargement des cours..." : "Loading courses..."}
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
                                background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                                p: 2,
                                display: "flex",
                                alignItems: "center",
                                gap: 1
                            }}
                        >
                            <MenuBookIcon sx={{ color: "#fff", fontSize: 28 }} />
                            <Typography variant="h6" sx={{ color: "#fff", fontWeight: 700 }}>
                                {isFrench ? "Cours de Formation" : "Training Courses"}
                            </Typography>
                        </Box>
                        <CardContent sx={{ p: 0 }}>
                            {!data || data.length === 0 ? (
                                <Box sx={{ p: 4, textAlign: "center" }}>
                                    <Alert severity="info" sx={{ borderRadius: "12px" }}>
                                        {isFrench ? "Aucun cours trouvé" : "No courses found"}
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
                                                    background: "linear-gradient(135deg, rgba(22, 163, 74, 0.1) 0%, rgba(21, 128, 61, 0.1) 100%)"
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
                                                    {isFrench ? "Module" : "Module"}
                                                </TableCell>
                                                <TableCell sx={{ fontWeight: 700, color: "#1a202c" }}>
                                                    {isFrench ? "Nombre QCM" : "QCM Count"}
                                                </TableCell>
                                                <TableCell sx={{ fontWeight: 700, color: "#1a202c" }}>
                                                    {isFrench ? "État" : "Status"}
                                                </TableCell>
                                                <TableCell sx={{ fontWeight: 700, color: "#1a202c" }}>
                                                    {isFrench ? "Actions" : "Actions"}
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {data.map((chapitre, index) => {
                                                const statusColors = getStatusColor(chapitre.etat);
                                                const qcmCount = chapitre.totalQcm || 0;

                                                return (
                                                    <TableRow
                                                        key={chapitre.idChapitre}
                                                        onClick={() => navigation("/cour/" + chapitre.idChapitre)}
                                                        sx={{
                                                            "&:hover": {
                                                                backgroundColor: "rgba(22, 163, 74, 0.05)",
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
                                                                    background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                                                                    color: "#fff",
                                                                    fontWeight: 700,
                                                                    minWidth: 40
                                                                }}
                                                            />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography variant="body1" sx={{ fontWeight: 500, color: "#1a202c" }}>
                                                                {chapitre.titre || "-"}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography variant="body2" sx={{ color: "#718096" }}>
                                                                {chapitre.titreEn || "-"}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                                <FolderOpenIcon sx={{ fontSize: 16, color: "#16a34a" }} />
                                                                <Typography variant="body2" sx={{ fontWeight: 500, color: "#1a202c" }}>
                                                                    {chapitre.titreModule || "-"}
                                                                </Typography>
                                                            </Box>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                                <QuizIcon
                                                                    sx={{
                                                                        fontSize: 18,
                                                                        color: qcmCount > 0 ? "#16a34a" : "#cbd5e0"
                                                                    }}
                                                                />
                                                                <Chip
                                                                    label={qcmCount}
                                                                    size="small"
                                                                    sx={{
                                                                        backgroundColor: qcmCount > 0 ? "#e6fffa" : "#edf2f7",
                                                                        color: qcmCount > 0 ? "#234e52" : "#718096",
                                                                        fontWeight: 600,
                                                                        border: qcmCount > 0 ? "1px solid #16a34a" : "1px solid #cbd5e0",
                                                                        minWidth: 50
                                                                    }}
                                                                />
                                                            </Box>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Chip
                                                                label={chapitre.etat || "-"}
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
                                                            <Button
                                                                variant="outlined"
                                                                size="small"
                                                                startIcon={<VisibilityIcon />}
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    navigation("/cour/" + chapitre.idChapitre);
                                                                }}
                                                                sx={{
                                                                    textTransform: "none",
                                                                    borderRadius: "8px",
                                                                    borderColor: "#16a34a",
                                                                    color: "#16a34a",
                                                                    fontWeight: 600,
                                                                    "&:hover": {
                                                                        borderColor: "#15803d",
                                                                        backgroundColor: "rgba(22, 163, 74, 0.1)",
                                                                        transform: "translateY(-2px)",
                                                                        boxShadow: "0 4px 12px rgba(22, 163, 74, 0.2)"
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
