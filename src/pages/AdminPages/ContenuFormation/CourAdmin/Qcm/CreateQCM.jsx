import React, { useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../../../../../utils/hooks/FetchData";
import {
    Box,
    Typography,
    Button,
    CircularProgress,
    Breadcrumbs,
    Link as MuiLink,
    Backdrop,
    Alert,
    Card,
    CardContent
} from "@mui/material";
import QuizIcon from "@mui/icons-material/Quiz";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import HomeIcon from "@mui/icons-material/Home";
import SchoolIcon from "@mui/icons-material/School";
import {
    MessageErrorServeur,
    MessageErrorServeurWithVarialbleHeight
} from "../../../../../composants/MessageComponent";
import FormQCM from "./FormQCM";
import { AppContext } from "../../../../../context";

export default function CreateQCM() {
    const { idChapitre } = useParams();
    const navigation = useNavigate();
    const { language } = useContext(AppContext);
    const [update, setUpdate] = useState(false);
    const fecthChapitre = useFetch(`/admin/cour/${idChapitre}`, "GET", null, null, update);
    const [save, setSave] = useState(false);
    const [errorServeur, setErrorServeur] = useState(false);
    const [error, setError] = useState({
        textError: null
    });
    const isFrench = language === "FR";

    const sauvegarde = () => {
        setError((prev) => ({ ...prev, textError: null }));
        setErrorServeur(false);
        setSave(true);
    };

    const chapitre = fecthChapitre.data?.chapitre;

    return (
        <Box className="adminPageContainer">
            {/* Header Section */}
            <Box className="adminPageHeader">
                <Box className="adminPageHeaderContent">
                    <Box className="adminPageHeaderIconContainer">
                        <QuizIcon className="adminPageHeaderIcon" />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <Breadcrumbs
                            separator={<NavigateNextIcon fontSize="small" />}
                            aria-label="breadcrumb"
                            sx={{ mb: 1 }}
                        >
                            <MuiLink
                                component={Link}
                                to="/cours"
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    color: "rgba(255, 255, 255, 0.8)",
                                    textDecoration: "none",
                                    "&:hover": { color: "#fff", textDecoration: "underline" }
                                }}
                            >
                                <HomeIcon sx={{ fontSize: 18, mr: 0.5 }} />
                                {isFrench ? "Cours" : "Courses"}
                            </MuiLink>
                            <MuiLink
                                component={Link}
                                to={`/qcm/ajouter/${idChapitre}`}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    color: "rgba(255, 255, 255, 0.8)",
                                    textDecoration: "none",
                                    "&:hover": { color: "#fff", textDecoration: "underline" }
                                }}
                            >
                                <QuizIcon sx={{ fontSize: 18, mr: 0.5 }} />
                                {isFrench ? "Ajout d'un QCM" : "Add QCM"}
                            </MuiLink>
                            <Typography sx={{ color: "#fff", display: "flex", alignItems: "center" }}>
                                <SchoolIcon sx={{ fontSize: 18, mr: 0.5 }} />
                                {chapitre?.titre || ""}
                            </Typography>
                        </Breadcrumbs>
                        <Typography variant="h4" className="adminPageTitle">
                            {isFrench
                                ? `Ajout d'un QCM au Chapitre: ${chapitre?.titre || ""}`
                                : `Add QCM to Chapter: ${chapitre?.titre || ""}`}
                        </Typography>
                        <Typography variant="body1" className="adminPageSubtitle">
                            {isFrench
                                ? "Créez un nouveau QCM (Question à Choix Multiples) pour ce chapitre"
                                : "Create a new QCM (Multiple Choice Question) for this chapter"}
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{ display: "flex", gap: 2 }}>
                    <Button
                        variant="contained"
                        startIcon={<SaveIcon />}
                        onClick={sauvegarde}
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
                        {isFrench ? "ENREGISTRER" : "SAVE"}
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<CancelIcon />}
                        onClick={() => navigation(-1)}
                        sx={{
                            background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
                            color: "#fff",
                            fontWeight: 700,
                            textTransform: "none",
                            px: 3,
                            py: 1.5,
                            boxShadow: "0 4px 16px rgba(250, 112, 154, 0.3)",
                            "&:hover": {
                                background: "linear-gradient(135deg, #fee140 0%, #fa709a 100%)",
                                boxShadow: "0 6px 20px rgba(250, 112, 154, 0.4)"
                            }
                        }}
                    >
                        {isFrench ? "ANNULER" : "CANCEL"}
                    </Button>
                </Box>
            </Box>

            {/* Error Messages */}
            {errorServeur && (
                <Box sx={{ p: 2 }}>
                    <MessageErrorServeur />
                </Box>
            )}

            {error.textError && (
                <Box sx={{ p: 2 }}>
                    <Alert severity="error" sx={{ borderRadius: "12px" }}>
                        {error.textError}
                    </Alert>
                </Box>
            )}

            {/* Loading State */}
            {fecthChapitre.isLoading ? (
                <Box className="adminPageLoading">
                    <Backdrop open={true} sx={{ zIndex: 1000, color: "#fff" }}>
                        <Box sx={{ textAlign: "center" }}>
                            <CircularProgress size={60} sx={{ color: "#667eea", mb: 2 }} />
                            <Typography variant="h6" sx={{ color: "#fff", mt: 2 }}>
                                {isFrench ? "Chargement des informations du chapitre..." : "Loading chapter information..."}
                            </Typography>
                        </Box>
                    </Backdrop>
                </Box>
            ) : fecthChapitre.error ? (
                <Box className="adminPageError">
                    <MessageErrorServeurWithVarialbleHeight />
                </Box>
            ) : (
                <Box className="adminPageContent">
                    <FormQCM
                        setSave={setSave}
                        save={save}
                        initialForm={{ idChapitre: idChapitre }}
                        requestMethode="POST"
                        setError={setError}
                        setErrorServeur={setErrorServeur}
                        isFrench={isFrench}
                    />
                </Box>
            )}
        </Box>
    );
}
