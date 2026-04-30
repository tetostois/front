import React, { useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../../../../../utils/hooks/FetchData";
import {
    Box,
    Typography,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Card,
    CardContent,
    Grid,
    Backdrop,
    Alert,
    Breadcrumbs,
    Link as MuiLink,
    Chip,
    IconButton,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Divider
} from "@mui/material";
import { FormTextInput } from "../../../../../composants/UiInputs";
import QuizIcon from "@mui/icons-material/Quiz";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import HomeIcon from "@mui/icons-material/Home";
import SchoolIcon from "@mui/icons-material/School";
import DescriptionIcon from "@mui/icons-material/Description";
import TranslateIcon from "@mui/icons-material/Translate";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { MessageErrorServeur } from "../../../../../composants/MessageComponent";
import SaveComponent from "../../../../../composants/SaveComponent";
import { AppContext } from "../../../../../context";

export default function ShowQCM() {
    const { idQcm, idChapitre } = useParams();
    const navigation = useNavigate();
    const { language } = useContext(AppContext);
    const [update, setUpdate] = useState(false);
    const { isLoading, data, error } = useFetch(`/admin/qcm/${idQcm}`, "GET", null, null, update);
    const fecthChapitre = useFetch(`/admin/cour/${idChapitre}`, "GET", null, null, update);
    const isFrench = language === "FR";

    const qcm = data || {};
    const chapitre = fecthChapitre.data?.chapitre || {};

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
                                to={`/cour/${idChapitre}`}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    color: "rgba(255, 255, 255, 0.8)",
                                    textDecoration: "none",
                                    "&:hover": { color: "#fff", textDecoration: "underline" }
                                }}
                            >
                                <SchoolIcon sx={{ fontSize: 18, mr: 0.5 }} />
                                {chapitre.titre || ""}
                            </MuiLink>
                            <Typography sx={{ color: "#fff", display: "flex", alignItems: "center" }}>
                                <QuizIcon sx={{ fontSize: 18, mr: 0.5 }} />
                                {qcm.intitule || (isFrench ? "QCM" : "QCM")}
                            </Typography>
                        </Breadcrumbs>
                        <Typography variant="h4" className="adminPageTitle">
                            {isFrench ? `QCM: ${qcm.intitule || ""}` : `QCM: ${qcm.intitule || ""}`}
                        </Typography>
                        <Typography variant="body1" className="adminPageSubtitle">
                            {isFrench
                                ? "Gérez les informations et les propositions de ce QCM"
                                : "Manage information and propositions for this QCM"}
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{ display: "flex", gap: 2 }}>
                    <Button
                        variant="contained"
                        startIcon={<EditIcon />}
                        onClick={() => navigation(`/qcm/alter/${idChapitre}/${idQcm}`)}
                        sx={{
                            background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                            color: "#fff",
                            fontWeight: 700,
                            textTransform: "none",
                            px: 3,
                            py: 1.5,
                            boxShadow: "0 4px 16px rgba(67, 233, 123, 0.3)",
                            "&:hover": {
                                background: "linear-gradient(135deg, #16a34a 0%, #15803d 100%)",
                                boxShadow: "0 6px 20px rgba(67, 233, 123, 0.4)"
                            }
                        }}
                    >
                        {isFrench ? "MODIFIER" : "MODIFY"}
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<DeleteIcon />}
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
                        {isFrench ? "SUPPRIMER" : "DELETE"}
                    </Button>
                </Box>
            </Box>

            {/* Loading State */}
            {isLoading || fecthChapitre.isLoading ? (
                <Box className="adminPageLoading">
                    <Backdrop open={true} sx={{ zIndex: 1000, color: "#fff" }}>
                        <Box sx={{ textAlign: "center" }}>
                            <CircularProgress size={60} sx={{ color: "#16a34a", mb: 2 }} />
                            <Typography variant="h6" sx={{ color: "#fff", mt: 2 }}>
                                {isFrench ? "Chargement des détails..." : "Loading details..."}
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
                    <InformationGeneralQCM qcm={qcm} isFrench={isFrench} />
                    <ListProposition qcm={qcm} setUpdate={setUpdate} isFrench={isFrench} />
                </Box>
            )}
        </Box>
    );
}

const InformationGeneralQCM = ({ qcm, isFrench }) => {
    return (
        <Card
            sx={{
                mb: 3,
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
                <DescriptionIcon sx={{ color: "#fff", fontSize: 28 }} />
                <Typography variant="h5" sx={{ color: "#fff", fontWeight: 700 }}>
                    {isFrench ? "Informations Générales" : "General Information"}
                </Typography>
            </Box>
            <CardContent sx={{ p: 3 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                                p: 2,
                                borderRadius: "12px",
                                background: "linear-gradient(135deg, rgba(22, 163, 74, 0.05) 0%, rgba(21, 128, 61, 0.05) 100%)",
                                border: "1px solid rgba(22, 163, 74, 0.1)"
                            }}
                        >
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                                <TranslateIcon sx={{ color: "#16a34a", fontSize: 20 }} />
                                <Typography variant="body2" sx={{ fontWeight: 600, color: "#718096" }}>
                                    {isFrench ? "Intitulé en Français" : "Title in French"}
                                </Typography>
                            </Box>
                            <Typography variant="h6" sx={{ color: "#1a202c", fontWeight: 700 }}>
                                {qcm.intitule || "-"}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                                p: 2,
                                borderRadius: "12px",
                                background: "linear-gradient(135deg, rgba(67, 233, 123, 0.05) 0%, rgba(56, 249, 215, 0.05) 100%)",
                                border: "1px solid rgba(67, 233, 123, 0.1)"
                            }}
                        >
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                                <TranslateIcon sx={{ color: "#16a34a", fontSize: 20 }} />
                                <Typography variant="body2" sx={{ fontWeight: 600, color: "#718096" }}>
                                    {isFrench ? "Intitulé en Anglais" : "Title in English"}
                                </Typography>
                            </Box>
                            <Typography variant="h6" sx={{ color: "#1a202c", fontWeight: 700 }}>
                                {qcm.intituleEn || "-"}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box
                            sx={{
                                p: 2,
                                borderRadius: "12px",
                                background: "linear-gradient(135deg, rgba(250, 112, 154, 0.05) 0%, rgba(254, 225, 64, 0.05) 100%)",
                                border: "1px solid rgba(250, 112, 154, 0.1)"
                            }}
                        >
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                                <DescriptionIcon sx={{ color: "#fa709a", fontSize: 20 }} />
                                <Typography variant="body2" sx={{ fontWeight: 600, color: "#718096" }}>
                                    {isFrench ? "Description" : "Description"}
                                </Typography>
                            </Box>
                            <Typography variant="body1" sx={{ color: "#1a202c", fontWeight: 500 }}>
                                {qcm.description || "-"}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

const ListProposition = ({ qcm, setUpdate, isFrench }) => {
    const propositions = qcm?.propositions || [];

    return (
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
                    justifyContent: "space-between"
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <QuizIcon sx={{ color: "#fff", fontSize: 28 }} />
                    <Typography variant="h5" sx={{ color: "#fff", fontWeight: 700 }}>
                        {isFrench ? "Liste des Propositions" : "Propositions List"}
                    </Typography>
                </Box>
                <AjoutOrUpdatePropositionQCM qcm={qcm} setUpdate={setUpdate} isFrench={isFrench} />
            </Box>
            <CardContent sx={{ p: 3 }}>
                {propositions.length === 0 ? (
                    <Alert severity="info" sx={{ borderRadius: "12px" }}>
                        {isFrench ? "Ce QCM ne contient aucune proposition" : "This QCM contains no propositions"}
                    </Alert>
                ) : (
                    <Grid container spacing={2}>
                        {propositions.map((proposition, index) => (
                            <Grid item xs={12} key={proposition.id || index}>
                                <Card
                                    sx={{
                                        p: 2,
                                        borderRadius: "12px",
                                        border: `2px solid ${proposition.etat > 0 ? "#16a34a" : "#cbd5e0"}`,
                                        background: proposition.etat > 0
                                            ? "linear-gradient(135deg, rgba(67, 233, 123, 0.05) 0%, rgba(56, 249, 215, 0.05) 100%)"
                                            : "linear-gradient(135deg, rgba(237, 242, 247, 0.5) 0%, rgba(237, 242, 247, 0.3) 100%)",
                                        transition: "all 0.2s ease",
                                        "&:hover": {
                                            borderColor: proposition.etat > 0 ? "#15803d" : "#16a34a",
                                            boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                                        }
                                    }}
                                >
                                    <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
                                        <Chip
                                            label={index + 1}
                                            sx={{
                                                background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                                                color: "#fff",
                                                fontWeight: 700,
                                                minWidth: 40,
                                                height: 40,
                                                fontSize: "16px"
                                            }}
                                        />
                                        <Box sx={{ flex: 1 }}>
                                            <Box sx={{ mb: 1.5 }}>
                                                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                                                    <TranslateIcon sx={{ color: "#16a34a", fontSize: 16 }} />
                                                    <Typography variant="body2" sx={{ fontWeight: 600, color: "#718096" }}>
                                                        {isFrench ? "Proposition en Français" : "Proposition in French"}
                                                    </Typography>
                                                </Box>
                                                <Typography variant="body1" sx={{ fontWeight: 500, color: "#1a202c" }}>
                                                    {proposition.valeur || "-"}
                                                </Typography>
                                            </Box>
                                            <Divider sx={{ my: 1.5 }} />
                                            <Box>
                                                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                                                    <TranslateIcon sx={{ color: "#16a34a", fontSize: 16 }} />
                                                    <Typography variant="body2" sx={{ fontWeight: 600, color: "#718096" }}>
                                                        {isFrench ? "Proposition en Anglais" : "Proposition in English"}
                                                    </Typography>
                                                </Box>
                                                <Typography variant="body1" sx={{ fontWeight: 500, color: "#1a202c" }}>
                                                    {proposition.valeurEn || "-"}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, alignItems: "center" }}>
                                            {proposition.etat > 0 ? (
                                                <Chip
                                                    icon={<CheckCircleIcon />}
                                                    label={isFrench ? "Vrai" : "True"}
                                                    color="success"
                                                    sx={{ fontWeight: 600 }}
                                                />
                                            ) : (
                                                <Chip
                                                    icon={<CancelIcon />}
                                                    label={isFrench ? "Faux" : "False"}
                                                    color="default"
                                                    sx={{ fontWeight: 600 }}
                                                />
                                            )}
                                            <Box sx={{ display: "flex", gap: 1 }}>
                                                <AjoutOrUpdatePropositionQCM
                                                    qcm={qcm}
                                                    setUpdate={setUpdate}
                                                    initialValue={proposition}
                                                    isFrench={isFrench}
                                                />
                                                <DeleteProposition setUpdate={setUpdate} proposition={proposition} isFrench={isFrench} />
                                            </Box>
                                        </Box>
                                    </Box>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </CardContent>
        </Card>
    );
};

const AjoutOrUpdatePropositionQCM = ({ qcm, setUpdate, initialValue, isFrench }) => {
    const [formPropositionQCM, setFormPropositionQCM] = useState(initialValue ? initialValue : {});
    const requestURL = "/admin/qcmproposition/";
    const [open, setOpen] = useState(false);
    const [save, setSave] = useState(false);
    const [errorServeur, setErrorServeur] = useState(false);
    const [error, setError] = useState({
        textError: null
    });

    const handleClose = () => {
        setOpen(false);
    };
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleSave = () => {
        setError((prev) => ({ ...prev, textError: null }));
        setErrorServeur(false);
        setSave(true);
    };

    return (
        <>
            <Button
                variant={initialValue ? "outlined" : "contained"}
                startIcon={initialValue ? <EditIcon /> : <AddIcon />}
                onClick={handleClickOpen}
                sx={{
                    ...(initialValue
                        ? {
                              borderColor: "#16a34a",
                              color: "#16a34a",
                              "&:hover": {
                                  borderColor: "#15803d",
                                  backgroundColor: "rgba(22, 163, 74, 0.1)"
                              }
                          }
                        : {
                              background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                              color: "#fff",
                              "&:hover": {
                                  background: "linear-gradient(135deg, #16a34a 0%, #15803d 100%)"
                              }
                          }),
                    fontWeight: 600,
                    textTransform: "none",
                    px: 2
                }}
            >
                {initialValue
                    ? (isFrench ? "Modifier" : "Modify")
                    : (isFrench ? "Ajouter une proposition" : "Add proposition")}
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="md"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: "20px",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.12)"
                    }
                }}
            >
                <DialogTitle
                    sx={{
                        background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                        color: "#fff",
                        fontWeight: 700,
                        display: "flex",
                        alignItems: "center",
                        gap: 1
                    }}
                >
                    <QuizIcon />
                    {isFrench
                        ? `Ajout d'une proposition au QCM: ${qcm.intitule}`
                        : `Add a proposition to QCM: ${qcm.intitule}`}
                </DialogTitle>
                <DialogContent sx={{ p: 3, mt: 2 }}>
                    {errorServeur && <MessageErrorServeur />}
                    {save && (
                        <SaveComponent
                            setSave={setSave}
                            save={save}
                            requestURL={requestURL}
                            requestBody={formPropositionQCM}
                            requestMethode={"POST"}
                            requestParam={qcm && qcm.id ? qcm.id : null}
                            setErrorServeur={setErrorServeur}
                            setError={setError}
                            setUpdate={setUpdate}
                        />
                    )}

                    {error.textError && (
                        <Alert severity="error" sx={{ mb: 2, borderRadius: "12px" }}>
                            {error.textError}
                        </Alert>
                    )}

                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <FormTextInput
                            fullWidth
                            multiline
                            rows={4}
                            label={isFrench ? "Proposition (Français)" : "Proposition (French)"}
                            placeholder={isFrench ? "Écrire ici..." : "Write here..."}
                            value={formPropositionQCM.valeur || ""}
                            onChange={(e) => setFormPropositionQCM((prev) => ({ ...prev, valeur: e.target.value }))}
                        />

                        <FormTextInput
                            fullWidth
                            multiline
                            rows={4}
                            label={isFrench ? "Proposition (Anglais)" : "Proposition (English)"}
                            placeholder={isFrench ? "Écrire ici..." : "Write here..."}
                            value={formPropositionQCM.valeurEn || ""}
                            onChange={(e) => setFormPropositionQCM((prev) => ({ ...prev, valeurEn: e.target.value }))}
                        />

                        <FormControl fullWidth>
                            <InputLabel>{isFrench ? "Statut de la proposition" : "Proposition Status"}</InputLabel>
                            <Select
                                value={formPropositionQCM.etat || 0}
                                onChange={(e) => setFormPropositionQCM((prev) => ({ ...prev, etat: e.target.value }))}
                                label={isFrench ? "Statut de la proposition" : "Proposition Status"}
                                sx={{
                                    borderRadius: "12px"
                                }}
                            >
                                <MenuItem value={1}>{isFrench ? "Vrai" : "True"}</MenuItem>
                                <MenuItem value={0}>{isFrench ? "Faux" : "False"}</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions sx={{ p: 3, pt: 0 }}>
                    <Button
                        onClick={handleClose}
                        sx={{
                            color: "#fa709a",
                            fontWeight: 600,
                            textTransform: "none"
                        }}
                    >
                        {isFrench ? "Annuler" : "Cancel"}
                    </Button>
                    <Button
                        onClick={handleSave}
                        variant="contained"
                        sx={{
                            background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                            color: "#fff",
                            fontWeight: 600,
                            textTransform: "none",
                            px: 3,
                            "&:hover": {
                                background: "linear-gradient(135deg, #16a34a 0%, #15803d 100%)"
                            }
                        }}
                    >
                        {isFrench ? "Enregistrer" : "Save"}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

const DeleteProposition = ({ proposition, setUpdate, isFrench }) => {
    const requestURL = "/admin/qcmproposition/";
    const [open, setOpen] = useState(false);
    const [save, setSave] = useState(false);
    const [errorServeur, setErrorServeur] = useState(false);
    const [error, setError] = useState({
        textError: null
    });

    const handleClose = () => {
        setOpen(false);
    };
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleSave = () => {
        setError((prev) => ({ ...prev, textError: null }));
        setErrorServeur(false);
        setSave(true);
    };

    return (
        <>
            <IconButton
                onClick={handleClickOpen}
                sx={{
                    color: "#fa709a",
                    "&:hover": {
                        backgroundColor: "rgba(250, 112, 154, 0.1)",
                        transform: "scale(1.1)"
                    },
                    transition: "all 0.2s ease"
                }}
            >
                <DeleteIcon />
            </IconButton>

            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    sx: {
                        borderRadius: "20px",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.12)"
                    }
                }}
            >
                <DialogTitle
                    sx={{
                        background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
                        color: "#fff",
                        fontWeight: 700,
                        display: "flex",
                        alignItems: "center",
                        gap: 1
                    }}
                >
                    <DeleteIcon />
                    {isFrench ? "Suppression d'une proposition" : "Delete Proposition"}
                </DialogTitle>
                <DialogContent sx={{ p: 3, mt: 2 }}>
                    {errorServeur && <MessageErrorServeur />}
                    {save && (
                        <SaveComponent
                            setSave={setSave}
                            save={save}
                            requestURL={requestURL}
                            requestBody={null}
                            requestMethode={"DELETE"}
                            requestParam={proposition && proposition.id ? proposition.id : null}
                            setErrorServeur={setErrorServeur}
                            setError={setError}
                            setUpdate={setUpdate}
                        />
                    )}

                    {error.textError && (
                        <Alert severity="error" sx={{ mb: 2, borderRadius: "12px" }}>
                            {error.textError}
                        </Alert>
                    )}

                    <Alert severity="warning" sx={{ borderRadius: "12px" }}>
                        {isFrench ? "Cette opération est irréversible" : "This operation is irreversible"}
                    </Alert>
                </DialogContent>
                <DialogActions sx={{ p: 3, pt: 0 }}>
                    <Button
                        onClick={handleClose}
                        sx={{
                            color: "#16a34a",
                            fontWeight: 600,
                            textTransform: "none"
                        }}
                    >
                        {isFrench ? "Annuler" : "Cancel"}
                    </Button>
                    <Button
                        onClick={handleSave}
                        variant="contained"
                        sx={{
                            background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
                            color: "#fff",
                            fontWeight: 600,
                            textTransform: "none",
                            px: 3,
                            "&:hover": {
                                background: "linear-gradient(135deg, #fee140 0%, #fa709a 100%)"
                            }
                        }}
                    >
                        {isFrench ? "Supprimer" : "Delete"}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
