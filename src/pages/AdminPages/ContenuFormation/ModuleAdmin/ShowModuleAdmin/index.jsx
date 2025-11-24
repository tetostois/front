import React, { useState, useContext } from "react";
import { useFetch } from "../../../../../utils/hooks/FetchData";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
    Box,
    Typography,
    Button,
    Checkbox,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Card,
    CardContent,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    Breadcrumbs,
    Link as MuiLink,
    Divider,
    Backdrop,
    Alert,
    IconButton,
    Tooltip,
    FormControlLabel,
    Stack
} from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import EditIcon from "@mui/icons-material/Edit";
import BlockIcon from "@mui/icons-material/Block";
import PeopleIcon from "@mui/icons-material/People";
import SchoolIcon from "@mui/icons-material/School";
import QuizIcon from "@mui/icons-material/Quiz";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LinkIcon from "@mui/icons-material/Link";
import AddIcon from "@mui/icons-material/Add";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import { MessageErrorServeur } from "../../../../../composants/MessageComponent";
import SaveComponent from "../../../../../composants/SaveComponent";
import { AppContext } from "../../../../../context";

export default function ShowModuleAdmin() {
    const { idModule } = useParams();
    const navigation = useNavigate();
    const { language } = useContext(AppContext);
    const [update, setUpdate] = useState(false);
    const { isLoading, data, error } = useFetch(`/admin/module/${idModule}`, "GET", null, null, update);
    const isFrench = language === "FR";

    const handleModifierClick = () => {
        navigation(`/module/alter/${idModule}`);
    };

    const module = data?.module;

    return (
        <Box className="adminPageContainer">
            {/* Header Section */}
            <Box className="adminPageHeader">
                <Box className="adminPageHeaderContent">
                    <Box className="adminPageHeaderIconContainer">
                        <MenuBookIcon className="adminPageHeaderIcon" />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <Breadcrumbs
                            separator={<NavigateNextIcon fontSize="small" />}
                            aria-label="breadcrumb"
                            sx={{ mb: 1 }}
                        >
                            <MuiLink
                                component={Link}
                                to="/modules"
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    color: "rgba(255, 255, 255, 0.8)",
                                    textDecoration: "none",
                                    "&:hover": { color: "#fff", textDecoration: "underline" }
                                }}
                            >
                                <HomeIcon sx={{ fontSize: 18, mr: 0.5 }} />
                                {isFrench ? "Modules" : "Modules"}
                            </MuiLink>
                            <Typography sx={{ color: "#fff", display: "flex", alignItems: "center" }}>
                                <MenuBookIcon sx={{ fontSize: 18, mr: 0.5 }} />
                                {module?.titre || (isFrench ? "Module" : "Module")}
                            </Typography>
                        </Breadcrumbs>
                        <Typography variant="h4" className="adminPageTitle">
                            {module?.titre || (isFrench ? "Détails du Module" : "Module Details")}
                        </Typography>
                        <Typography variant="body1" className="adminPageSubtitle">
                            {isFrench
                                ? "Gérez les informations, les gammes d'apprenants et les chapitres de ce module"
                                : "Manage information, learner ranges and chapters for this module"}
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{ display: "flex", gap: 2 }}>
                    <Button
                        variant="contained"
                        startIcon={<EditIcon />}
                        onClick={handleModifierClick}
                        sx={{
                            background: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
                            color: "#fff",
                            fontWeight: 600,
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
                        {isFrench ? "MODIFIER" : "MODIFY"}
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<BlockIcon />}
                        onClick={() => navigation(-1)}
                        sx={{
                            background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
                            color: "#fff",
                            fontWeight: 600,
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
                        {isFrench ? "BLOQUER" : "BLOCK"}
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
                    <InformationGeneral formModule={data} isFrench={isFrench} />
                    <GammeEtudiantAssocier
                        formModule={data}
                        gammeEtudiants={data?.gammeEtudiants}
                        setUpdate={setUpdate}
                        isFrench={isFrench}
                    />
                    <ListCourModule formModule={data} isFrench={isFrench} />
                </Box>
            )}
        </Box>
    );
}

const InformationGeneral = ({ formModule, isFrench }) => {
    const module = formModule?.module || {};

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
                <InfoIcon sx={{ color: "#fff", fontSize: 28 }} />
                <Typography variant="h5" sx={{ color: "#fff", fontWeight: 700 }}>
                    {isFrench ? "Informations Générales" : "General Information"}
                </Typography>
            </Box>
            <CardContent sx={{ p: 3 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                            <InfoRow
                                label={isFrench ? "Titre" : "Title"}
                                value={module.titre}
                                icon={<MenuBookIcon sx={{ color: "#667eea" }} />}
                            />
                            <InfoRow
                                label={isFrench ? "Titre anglais" : "English Title"}
                                value={module.titreEn}
                                icon={<MenuBookIcon sx={{ color: "#667eea" }} />}
                            />
                            <InfoRow
                                label={isFrench ? "Description" : "Description"}
                                value={module.description}
                                icon={<InfoIcon sx={{ color: "#667eea" }} />}
                                multiline
                            />
                            <InfoRow
                                label={isFrench ? "Description anglais" : "English Description"}
                                value={module.descriptionEn}
                                icon={<InfoIcon sx={{ color: "#667eea" }} />}
                                multiline
                            />
                            <InfoRow
                                label={isFrench ? "Date de déblocage du module" : "Module Unlock Date"}
                                value={
                                    module.dateDeblocage
                                        ? new Date(module.dateDeblocage).toLocaleDateString("fr-FR", {
                                              day: "numeric",
                                              month: "long",
                                              year: "numeric"
                                          })
                                        : "-"
                                }
                                icon={<CalendarTodayIcon sx={{ color: "#667eea" }} />}
                            />
                            <InfoRow
                                label={isFrench ? "Lien (URL) de l'image descriptive" : "Descriptive Image URL"}
                                value={
                                    module.nomImage ? (
                                        <MuiLink
                                            href={module.nomImage}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            sx={{
                                                color: "#43e97b",
                                                textDecoration: "none",
                                                fontWeight: 600,
                                                "&:hover": { textDecoration: "underline" }
                                            }}
                                        >
                                            {module.nomImage}
                                        </MuiLink>
                                    ) : (
                                        "-"
                                    )
                                }
                                icon={<LinkIcon sx={{ color: "#43e97b" }} />}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Divider
                            orientation="vertical"
                            flexItem
                            sx={{
                                display: { xs: "none", md: "block" },
                                borderColor: "#e0e0e0",
                                borderWidth: 2,
                                mx: 2
                            }}
                        />
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 2.5,
                                pl: { xs: 0, md: 3 }
                            }}
                        >
                            <StatCard
                                label={isFrench ? "Nombre de Cours / Chapitres" : "Number of Courses / Chapters"}
                                value={formModule?.nombreCour || 0}
                                icon={<SchoolIcon />}
                                color="#667eea"
                            />
                            <StatCard
                                label={isFrench ? "Nombre total QCM" : "Total QCM Count"}
                                value={formModule?.nombreQCM || 0}
                                icon={<QuizIcon />}
                                color="#43e97b"
                            />
                        </Box>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

const InfoRow = ({ label, value, icon, multiline = false }) => (
    <Box
        sx={{
            display: "flex",
            gap: 2,
            alignItems: multiline ? "flex-start" : "center",
            p: 2,
            borderRadius: "12px",
            background: "linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)",
            border: "1px solid rgba(102, 126, 234, 0.1)"
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
            <Typography
                variant="body1"
                sx={{
                    color: "#1a202c",
                    fontWeight: 500,
                    whiteSpace: multiline ? "normal" : "nowrap",
                    overflow: multiline ? "visible" : "hidden",
                    textOverflow: multiline ? "clip" : "ellipsis"
                }}
            >
                {value || "-"}
            </Typography>
        </Box>
    </Box>
);

const StatCard = ({ label, value, icon, color }) => {
    // Gérer l'icône : soit c'est un élément React, soit c'est un composant
    let renderedIcon = null;
    if (React.isValidElement(icon)) {
        // Si c'est déjà un élément React, cloner avec les styles
        renderedIcon = React.cloneElement(icon, { sx: { fontSize: 32, color: color } });
    } else if (icon && typeof icon === 'function') {
        // Si c'est un composant, créer un élément
        const IconComponent = icon;
        renderedIcon = <IconComponent sx={{ fontSize: 32, color: color }} />;
    } else if (icon) {
        // Sinon, utiliser tel quel
        renderedIcon = icon;
    }

    return (
        <Box
            sx={{
                p: 3,
                borderRadius: "16px",
                background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`,
                border: `2px solid ${color}30`,
                transition: "all 0.3s ease",
                "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: `0 8px 24px ${color}20`
                }
            }}
        >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box
                    sx={{
                        p: 1.5,
                        borderRadius: "12px",
                        backgroundColor: `${color}20`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    {renderedIcon}
                </Box>
                <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: "#718096", mb: 0.5 }}>
                        {label}
                    </Typography>
                    <Typography variant="h4" sx={{ color: color, fontWeight: 700 }}>
                        {value}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

const GammeEtudiantAssocier = ({ formModule, gammeEtudiants, setUpdate, isFrench }) => {
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
                    background: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
                    p: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <PeopleIcon sx={{ color: "#fff", fontSize: 28 }} />
                    <Typography variant="h5" sx={{ color: "#fff", fontWeight: 700 }}>
                        {isFrench
                            ? "Gamme d'apprenants associée à ce module"
                            : "Learner Range Associated with this Module"}
                    </Typography>
                </Box>
            </Box>
            <CardContent sx={{ p: 3 }}>
                <Box sx={{ mb: 3 }}>
                    <AjoutGammeEtudiantToModule formModule={formModule} setUpdate={setUpdate} isFrench={isFrench} />
                </Box>
                {!gammeEtudiants || gammeEtudiants.length === 0 ? (
                    <Alert severity="info" sx={{ borderRadius: "12px" }}>
                        {isFrench
                            ? "Ce module n'est associé à aucune gamme d'apprenant sur la plateforme"
                            : "This module is not associated with any learner range on the platform"}
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
                                        {isFrench ? "Gamme d'apprenant" : "Learner Range"}
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 700, color: "#1a202c" }}>
                                        {isFrench ? "Nbrs Apprenants" : "Number of Learners"}
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {gammeEtudiants.map((gammeEtudiant, index) => (
                                    <TableRow
                                        key={gammeEtudiant.id}
                                        sx={{
                                            "&:hover": {
                                                backgroundColor: "rgba(102, 126, 234, 0.05)",
                                                cursor: "pointer"
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
                                                    fontWeight: 700
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                                {gammeEtudiant.nom}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={gammeEtudiant.nombreEtudiant}
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

const AjoutGammeEtudiantToModule = ({ formModule, setUpdate, isFrench }) => {
    const requestURL = "/admin/linkgammmetudianttomodule/";
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

    const handleLinkModule = (event, idElement) => {
        let newForm = formLink;
        let link = {
            idElement: idElement,
            isLinked: event.target.checked
        };

        if (newForm.length === 0) {
            newForm.push(link);
        } else {
            let index = newForm.findIndex((item) => item.idElement === idElement);
            if (index === -1) {
                newForm.push(link);
            } else {
                newForm[index] = link;
            }
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
                {isFrench
                    ? "ASSOCIER OU DISSOCIER UNE GAMME D'APPRENANT"
                    : "ASSOCIATE OR DISASSOCIATE A LEARNER RANGE"}
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
                    <PeopleIcon />
                    {isFrench
                        ? `Ajout d'une gamme d'apprenant au module ${formModule?.module?.titre}`
                        : `Add a learner range to module ${formModule?.module?.titre}`}
                </DialogTitle>
                <DialogContent sx={{ p: 3, mt: 2 }}>
                    <Typography variant="body1" sx={{ mb: 3, color: "#718096" }}>
                        {isFrench
                            ? "Sélectionnez les gammes d'apprenants à associer à ce module"
                            : "Select the learner ranges to associate with this module"}
                    </Typography>
                    {errorServeur && <MessageErrorServeur />}
                    {save && (
                        <SaveComponent
                            setSave={setSave}
                            save={save}
                            requestURL={requestURL}
                            requestBody={formLink}
                            requestMethode={"POST"}
                            requestParam={formModule && formModule.module ? formModule.module.idModule : null}
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
                        {formModule && formModule.allGammeEtudiants
                            ? formModule.allGammeEtudiants.map((item) => (
                                  <Card
                                      key={item.id}
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
                                                  defaultChecked={formModule.gammeEtudiants?.some(
                                                      (item2) => item2.id === item.id
                                                  )}
                                                  onChange={(event) => handleLinkModule(event, item.id)}
                                              />
                                          }
                                          label={
                                              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                                  {item.nom}
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

const ListCourModule = ({ formModule, isFrench }) => {
    const navigation = useNavigate();

    let chapitres =
        formModule && formModule?.chapitres?.length > 0
            ? formModule.chapitres.sort((a, b) => a.ordre - b.ordre)
            : [];

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
                    background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
                    p: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: 1
                }}
            >
                <SchoolIcon sx={{ color: "#fff", fontSize: 28 }} />
                <Typography variant="h5" sx={{ color: "#fff", fontWeight: 700 }}>
                    {isFrench ? "Liste de chapitres de ce module de formation" : "List of chapters for this training module"}
                </Typography>
            </Box>
            <CardContent sx={{ p: 3 }}>
                {!chapitres || chapitres.length === 0 ? (
                    <Alert severity="info" sx={{ borderRadius: "12px" }}>
                        {isFrench ? "Ce module n'a encore aucun chapitre" : "This module has no chapters yet"}
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
                                        {isFrench ? "Titre" : "Title"}
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 700, color: "#1a202c" }}>
                                        {isFrench ? "Nbrs QCM" : "QCM Count"}
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 700, color: "#1a202c" }}>
                                        {isFrench ? "Ordre" : "Order"}
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {chapitres.map((chapitre, index) => (
                                    <TableRow
                                        key={chapitre.idChapitre}
                                        onClick={() => {
                                            navigation("/cour/" + chapitre.idChapitre);
                                        }}
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
                                                    fontWeight: 700
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                                {chapitre.titre}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={chapitre.totalQcm || 0}
                                                icon={<QuizIcon sx={{ fontSize: 16 }} />}
                                                color="primary"
                                                sx={{ fontWeight: 600 }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={chapitre.ordre}
                                                color="secondary"
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
