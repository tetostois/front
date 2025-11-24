import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
    Box,
    Typography,
    Button,
    CircularProgress,
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
    Card,
    CardContent,
    Grid,
    Backdrop,
    Alert,
    Breadcrumbs,
    Link as MuiLink,
    Chip,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Checkbox,
    FormControlLabel,
    Stack,
    Divider,
    Snackbar
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import BlockIcon from "@mui/icons-material/Block";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import HomeIcon from "@mui/icons-material/Home";
import SchoolIcon from "@mui/icons-material/School";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import WorkIcon from "@mui/icons-material/Work";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import BadgeIcon from "@mui/icons-material/Badge";
import AddIcon from "@mui/icons-material/Add";
import { MessageErrorServeur } from "../../../../composants/MessageComponent";
import { useFetch } from "../../../../utils/hooks/FetchData";
import SaveComponent from "../../../../composants/SaveComponent";
import { AppContext } from "../../../../context";

export default function ShowProfesseur() {
    const { matricule } = useParams();
    const navigation = useNavigate();
    const { language, serveurURL } = useContext(AppContext);
    const [filter, setFilter] = useState(null);
    const [update, setUpdate] = useState(false);
    const [blocking, setBlocking] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
    const { isLoading, data, error } = useFetch(`/admin/professeur/${matricule}`, "GET", null, filter, update);
    const isFrench = language === "FR";

    const professeur = data?.professeur || {};

    const getStatusColor = (etat) => {
        if (!etat) return { bg: "#edf2f7", color: "#4a5568", border: "#cbd5e0" };
        const etatUpper = etat.toUpperCase();
        if (etatUpper.includes("ACTIF") || etatUpper.includes("ACTIVE")) {
            return { bg: "#e6fffa", color: "#234e52", border: "#38f9d7" };
        } else if (etatUpper.includes("INACTIF") || etatUpper.includes("INACTIVE") || etatUpper.includes("BLOQUE")) {
            return { bg: "#fed7d7", color: "#742a2a", border: "#fa709a" };
        }
        return { bg: "#edf2f7", color: "#4a5568", border: "#cbd5e0" };
    };

    const statusColors = getStatusColor(professeur.etat);

    const handleEdit = () => {
        navigation(`/professeur/alter/${matricule}`);
    };

    const handleBlock = async () => {
        const newEtat = professeur.etat?.toUpperCase().includes("ACTIF") ? "INACTIF" : "ACTIF";
        const updatedProfesseur = { ...professeur, etat: newEtat };
        
        setBlocking(true);
        try {
            const username = "admin";
            const password = "passwordadmin237";
            const base64Credentials = btoa(username + ":" + password);
            
            const response = await fetch(`${serveurURL}/admin/professeur`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Basic ${base64Credentials}`
                },
                body: JSON.stringify(updatedProfesseur)
            });

            if (response.ok) {
                setSnackbar({
                    open: true,
                    message: isFrench 
                        ? `Professeur ${newEtat === "ACTIF" ? "débloqué" : "bloqué"} avec succès`
                        : `Professor ${newEtat === "ACTIF" ? "unblocked" : "blocked"} successfully`,
                    severity: "success"
                });
                setUpdate(!update);
            } else {
                setSnackbar({
                    open: true,
                    message: isFrench ? "Erreur lors du blocage/déblocage" : "Error blocking/unblocking",
                    severity: "error"
                });
            }
        } catch (err) {
            setSnackbar({
                open: true,
                message: isFrench ? "Erreur serveur" : "Server error",
                severity: "error"
            });
        } finally {
            setBlocking(false);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <Box className="adminPageContainer">
            {/* Header Section */}
            <Box className="adminPageHeader">
                <Box className="adminPageHeaderContent">
                    <Box className="adminPageHeaderIconContainer">
                        <PersonIcon className="adminPageHeaderIcon" />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <Breadcrumbs
                            separator={<NavigateNextIcon fontSize="small" />}
                            aria-label="breadcrumb"
                            sx={{ mb: 1 }}
                        >
                            <MuiLink
                                component={Link}
                                to="/professeurs"
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    color: "rgba(255, 255, 255, 0.8)",
                                    textDecoration: "none",
                                    "&:hover": { color: "#fff", textDecoration: "underline" }
                                }}
                            >
                                <HomeIcon sx={{ fontSize: 18, mr: 0.5 }} />
                                {isFrench ? "Professeurs" : "Professors"}
                            </MuiLink>
                            <Typography sx={{ color: "#fff", display: "flex", alignItems: "center" }}>
                                <PersonIcon sx={{ fontSize: 18, mr: 0.5 }} />
                                {professeur.nom
                                    ? `${isFrench ? "Mr/Mm." : "Mr/Mrs."} ${professeur.nom}`
                                    : (isFrench ? "Professeur" : "Professor")}
                            </Typography>
                        </Breadcrumbs>
                        <Typography variant="h4" className="adminPageTitle">
                            {isFrench
                                ? `Compte Professeur: ${professeur.nom || ""}`
                                : `Professor Account: ${professeur.nom || ""}`}
                        </Typography>
                        <Typography variant="body1" className="adminPageSubtitle">
                            {isFrench
                                ? "Gérez les informations et les modules associés à ce professeur"
                                : "Manage information and associated modules for this professor"}
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{ display: "flex", gap: 2 }}>
                    <Button
                        variant="contained"
                        startIcon={<EditIcon />}
                        onClick={handleEdit}
                        disabled={!professeur.matricule}
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
                            },
                            "&:disabled": {
                                background: "#cbd5e0",
                                color: "#718096"
                            }
                        }}
                    >
                        {isFrench ? "MODIFIER" : "MODIFY"}
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={professeur.etat?.toUpperCase().includes("ACTIF") ? <BlockIcon /> : <LockOpenIcon />}
                        onClick={handleBlock}
                        disabled={blocking || !professeur.matricule}
                        sx={{
                            background: professeur.etat?.toUpperCase().includes("ACTIF")
                                ? "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
                                : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            color: "#fff",
                            fontWeight: 700,
                            textTransform: "none",
                            px: 3,
                            py: 1.5,
                            boxShadow: professeur.etat?.toUpperCase().includes("ACTIF")
                                ? "0 4px 16px rgba(250, 112, 154, 0.3)"
                                : "0 4px 16px rgba(102, 126, 234, 0.3)",
                            "&:hover": {
                                background: professeur.etat?.toUpperCase().includes("ACTIF")
                                    ? "linear-gradient(135deg, #fee140 0%, #fa709a 100%)"
                                    : "linear-gradient(135deg, #764ba2 0%, #667eea 100%)",
                                boxShadow: professeur.etat?.toUpperCase().includes("ACTIF")
                                    ? "0 6px 20px rgba(250, 112, 154, 0.4)"
                                    : "0 6px 20px rgba(102, 126, 234, 0.4)"
                            },
                            "&:disabled": {
                                background: "#cbd5e0",
                                color: "#718096"
                            }
                        }}
                    >
                        {blocking
                            ? (isFrench ? "Traitement..." : "Processing...")
                            : professeur.etat?.toUpperCase().includes("ACTIF")
                            ? (isFrench ? "BLOQUER" : "BLOCK")
                            : (isFrench ? "DÉBLOQUER" : "UNBLOCK")}
                    </Button>
                </Box>
            </Box>

            {/* Loading State */}
            {isLoading ? (
                <Box className="adminPageLoading">
                    <Backdrop open={true} sx={{ zIndex: 1000, color: "#fff" }}>
                        <Box sx={{ textAlign: "center" }}>
                            <CircularProgress size={60} sx={{ color: "#667eea", mb: 2 }} />
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
                    {data ? (
                        <>
                            <InformationGeneral professeur={professeur} statusColors={statusColors} isFrench={isFrench} />
                            <ModulesAssocies formProf={data} setUpdate={setUpdate} isFrench={isFrench} />
                        </>
                    ) : (
                        <Alert severity="warning" sx={{ borderRadius: "12px" }}>
                            {isFrench ? "Aucun professeur trouvé" : "No professor found"}
                        </Alert>
                    )}
                </Box>
            )}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
}

const InformationGeneral = ({ professeur, statusColors, isFrench }) => {
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
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    p: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: 1
                }}
            >
                <PersonIcon sx={{ color: "#fff", fontSize: 28 }} />
                <Typography variant="h5" sx={{ color: "#fff", fontWeight: 700 }}>
                    {isFrench ? "Informations Générales" : "General Information"}
                </Typography>
            </Box>
            <CardContent sx={{ p: 3 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <InfoRow
                            label={isFrench ? "Matricule" : "ID"}
                            value={professeur.matricule}
                            icon={<BadgeIcon sx={{ color: "#667eea" }} />}
                        />
                        <InfoRow
                            label={isFrench ? "Nom" : "Last Name"}
                            value={professeur.nom}
                            icon={<PersonIcon sx={{ color: "#667eea" }} />}
                        />
                        <InfoRow
                            label={isFrench ? "Prénom" : "First Name"}
                            value={professeur.prenom}
                            icon={<PersonIcon sx={{ color: "#667eea" }} />}
                        />
                        <InfoRow
                            label="Email"
                            value={professeur.email}
                            icon={<EmailIcon sx={{ color: "#43e97b" }} />}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InfoRow
                            label={isFrench ? "Date d'inscription" : "Registration Date"}
                            value={
                                professeur.dateInscription
                                    ? new Date(professeur.dateInscription).toLocaleDateString("fr-FR", {
                                          day: "numeric",
                                          month: "long",
                                          year: "numeric"
                                      })
                                    : "-"
                            }
                            icon={<CalendarTodayIcon sx={{ color: "#fa709a" }} />}
                        />
                        <InfoRow
                            label={isFrench ? "Profession" : "Profession"}
                            value={professeur.profession}
                            icon={<WorkIcon sx={{ color: "#667eea" }} />}
                        />
                        <InfoRow
                            label={isFrench ? "Région" : "Region"}
                            value={professeur.region?.nom || "-"}
                            icon={<LocationOnIcon sx={{ color: "#43e97b" }} />}
                        />
                        <InfoRow
                            label={isFrench ? "Téléphone" : "Phone"}
                            value={professeur.telephone || "-"}
                            icon={<PhoneIcon sx={{ color: "#fa709a" }} />}
                        />
                        <Box
                            sx={{
                                p: 2,
                                borderRadius: "12px",
                                background: `linear-gradient(135deg, ${statusColors.bg} 0%, ${statusColors.bg} 100%)`,
                                border: `1px solid ${statusColors.border}`,
                                mt: 2
                            }}
                        >
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                                <BadgeIcon sx={{ color: statusColors.color, fontSize: 20 }} />
                                <Typography variant="body2" sx={{ fontWeight: 600, color: "#718096" }}>
                                    {isFrench ? "État" : "State"}
                                </Typography>
                            </Box>
                            <Chip
                                label={professeur.etat || "-"}
                                sx={{
                                    backgroundColor: statusColors.bg,
                                    color: statusColors.color,
                                    fontWeight: 600,
                                    border: `1px solid ${statusColors.border}`,
                                    textTransform: "uppercase",
                                    fontSize: "11px"
                                }}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

const InfoRow = ({ label, value, icon }) => (
    <Box
        sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
            p: 2,
            borderRadius: "12px",
            background: "linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)",
            border: "1px solid rgba(102, 126, 234, 0.1)",
            mb: 2
        }}
    >
        <Box
            sx={{
                p: 1,
                borderRadius: "10px",
                backgroundColor: "rgba(102, 126, 234, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}
        >
            {icon}
        </Box>
        <Box sx={{ flex: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 600, color: "#718096", mb: 0.5 }}>
                {label}
            </Typography>
            <Typography variant="body1" sx={{ color: "#1a202c", fontWeight: 500 }}>
                {value || "-"}
            </Typography>
        </Box>
    </Box>
);

const ModulesAssocies = ({ formProf, setUpdate, isFrench }) => {
    const modules = formProf?.moduleSimpleForms || [];

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
                    background: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
                    p: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <SchoolIcon sx={{ color: "#fff", fontSize: 28 }} />
                    <Typography variant="h5" sx={{ color: "#fff", fontWeight: 700 }}>
                        {isFrench ? "Modules associés à ce professeur" : "Modules Associated with this Professor"}
                    </Typography>
                </Box>
                <AjoutModuleToProf formProf={formProf} setUpdate={setUpdate} isFrench={isFrench} />
            </Box>
            <CardContent sx={{ p: 3 }}>
                {modules.length === 0 ? (
                    <Alert severity="info" sx={{ borderRadius: "12px" }}>
                        {isFrench
                            ? "Aucun module associé à ce professeur"
                            : "No modules associated with this professor"}
                    </Alert>
                ) : (
                    <TableContainer
                        component={Paper}
                        sx={{
                            borderRadius: "12px",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                            overflow: "hidden"
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
                                        {isFrench ? "Module" : "Module"}
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 700, color: "#1a202c" }}>
                                        {isFrench ? "Nbr Chapitres" : "Chapters Count"}
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {modules.map((module, index) => (
                                    <TableRow
                                        key={module.idModule || index}
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
                                            <Chip
                                                label={module.nbrChapitre || 0}
                                                color="success"
                                                sx={{ fontWeight: 600 }}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </CardContent>
        </Card>
    );
};

const AjoutModuleToProf = ({ formProf, setUpdate, isFrench }) => {
    const requestURL = "/admin/linkprofesseurtomodule/";
    const [open, setOpen] = useState(false);
    const [formLink, setFormLink] = useState([]);
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

    const handleLinkModule = (event, idModule) => {
        let newForm = [...formLink];
        let link = {
            idModule: idModule,
            isLinked: event.target.checked
        };

        const index = newForm.findIndex((item) => item.idModule === idModule);
        if (index === -1) {
            newForm.push(link);
        } else {
            newForm[index] = link;
        }

        setFormLink(newForm);
    };

    const handleSave = () => {
        setError((prev) => ({ ...prev, textError: null }));
        setErrorServeur(false);
        setSave(true);
    };

    return (
        <>
            <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleClickOpen}
                sx={{
                    background: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
                    color: "#fff",
                    fontWeight: 600,
                    textTransform: "none",
                    px: 3,
                    py: 1.5,
                    borderRadius: "12px",
                    boxShadow: "0 4px 16px rgba(67, 233, 123, 0.3)",
                    "&:hover": {
                        background: "linear-gradient(135deg, #38f9d7 0%, #43e97b 100%)",
                        boxShadow: "0 6px 20px rgba(67, 233, 123, 0.4)"
                    }
                }}
            >
                {isFrench ? "ASSOCIER OU DISSOCIER UN MODULE" : "ASSOCIATE OR DISASSOCIATE A MODULE"}
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
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        color: "#fff",
                        fontWeight: 700,
                        display: "flex",
                        alignItems: "center",
                        gap: 1
                    }}
                >
                    <SchoolIcon />
                    {isFrench
                        ? `Ajout d'un module au professeur ${formProf?.professeur?.nom || ""}`
                        : `Add a module to professor ${formProf?.professeur?.nom || ""}`}
                </DialogTitle>
                <DialogContent sx={{ p: 3, mt: 2 }}>
                    <Typography variant="body1" sx={{ mb: 3, color: "#718096" }}>
                        {isFrench
                            ? "Sélectionnez les modules à associer à ce professeur"
                            : "Select the modules to associate with this professor"}
                    </Typography>
                    {errorServeur && <MessageErrorServeur />}
                    {save && (
                        <SaveComponent
                            setSave={setSave}
                            save={save}
                            requestURL={requestURL}
                            requestBody={formLink}
                            requestMethode={"POST"}
                            requestParam={formProf && formProf.professeur ? formProf.professeur.matricule : null}
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

                    <Stack spacing={2}>
                        {formProf && formProf.modules
                            ? formProf.modules.map((item) => (
                                  <Card
                                      key={item.idModule}
                                      sx={{
                                          p: 2,
                                          borderRadius: "12px",
                                          border: "1px solid rgba(102, 126, 234, 0.2)",
                                          transition: "all 0.2s ease",
                                          "&:hover": {
                                              borderColor: "#667eea",
                                              boxShadow: "0 4px 12px rgba(102, 126, 234, 0.15)"
                                          }
                                      }}
                                  >
                                      <FormControlLabel
                                          control={
                                              <Checkbox
                                                  color="primary"
                                                  defaultChecked={formProf.moduleSimpleForms?.some(
                                                      (item2) => item2.idModule === item.idModule
                                                  )}
                                                  onChange={(event) => handleLinkModule(event, item.idModule)}
                                              />
                                          }
                                          label={
                                              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                                  {item.titre}
                                              </Typography>
                                          }
                                      />
                                  </Card>
                              ))
                            : null}
                    </Stack>
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
                            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            color: "#fff",
                            fontWeight: 600,
                            textTransform: "none",
                            px: 3,
                            "&:hover": {
                                background: "linear-gradient(135deg, #764ba2 0%, #667eea 100%)"
                            }
                        }}
                    >
                        {isFrench ? "Valider" : "Validate"}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
