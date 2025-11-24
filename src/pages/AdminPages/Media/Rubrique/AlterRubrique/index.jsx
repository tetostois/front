import React, { useState } from "react";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import {
   MessageErrorServeur,
   MessageErrorServeurWithVarialbleHeight,
} from "../../../../../composants/MessageComponent";
import SaveComponent from "../../../../../composants/SaveComponent";
import { FormRubrique } from "../FormRubrique";
import {
   Box,
   Button,
   CircularProgress,
   Paper,
   Typography,
   Breadcrumbs,
   Alert,
   Snackbar,
   Tooltip,
} from "@mui/material";
import Link from "@mui/material/Link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import { useFetch } from "../../../../../utils/hooks/FetchData";

export default function AlterRubrique() {
   const { idRubrique } = useParams();
   const [update, setUpdate] = useState(false);
   const fecthRubrique = useFetch(`/media/rubrique/${idRubrique}`, "GET", null, null, update);
   const [save, setSave] = useState(false);
   const [errorServeur, setErrorServeur] = useState(false);
   const [error, setError] = useState({
      textError: null,
   });
   const [openSnackbar, setOpenSnackbar] = useState(false);

   const navigation = useNavigate();
   const ajoutRubrique = () => {
      setError((prev) => ({ ...prev, textError: null }));
      setErrorServeur(false);
      setSave(true);
      setOpenSnackbar(true);
   };

   const handleCloseSnackbar = () => {
      setOpenSnackbar(false);
   };

   return (
      <Box sx={{ flexGrow: 1, p: 3 }}>
         <Paper
            elevation={3}
            sx={{
               p: 3,
               mb: 3,
               background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
               color: "white",
               borderRadius: 2,
            }}
         >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
               <Box>
                  <Typography variant="h5" component="h1" sx={{ fontWeight: 600, display: "flex", alignItems: "center", gap: 1 }}>
                     <EditIcon sx={{ fontSize: 28 }} />
                     {`Modification de la rubrique ${fecthRubrique.data ? fecthRubrique.data.nom : ""}`}
                  </Typography>
                  <Breadcrumbs aria-label="breadcrumb" sx={{ color: "white", "& a": { color: "white" }, mt: 1 }}>
                     <Link
                        component={RouterLink}
                        to="/rubrique"
                        sx={{ textDecoration: "none", display: "flex", alignItems: "center", "&:hover": { textDecoration: "underline" } }}
                     >
                        <ArrowBackIcon fontSize="small" sx={{ mr: 0.5 }} />
                        Rubriques
                     </Link>
                     <Typography sx={{ color: "rgba(255, 255, 255, 0.85)" }}>
                        {fecthRubrique.data ? fecthRubrique.data.nom : "Chargement..."}
                     </Typography>
                  </Breadcrumbs>
               </Box>
               <Box sx={{ display: "flex", gap: 2 }}>
                  <Tooltip title="Annuler et revenir en arrière">
                     <Button
                        variant="contained"
                        startIcon={<CancelIcon />}
                        onClick={() => navigation(-1)}
                        sx={{
                           bgcolor: "rgba(255,255,255,0.2)",
                           color: "white",
                           textTransform: "none",
                           borderRadius: "12px",
                           fontWeight: 600,
                           "&:hover": {
                              bgcolor: "rgba(255,255,255,0.3)",
                           },
                        }}
                     >
                        Annuler
                     </Button>
                  </Tooltip>
                  <Tooltip title="Enregistrer les modifications">
                     <Button
                        variant="contained"
                        startIcon={<SaveIcon />}
                        onClick={ajoutRubrique}
                        sx={{
                           bgcolor: "white",
                           color: "#5a4fd8",
                           textTransform: "none",
                           borderRadius: "12px",
                           fontWeight: 600,
                           "&:hover": {
                              bgcolor: "#f0f0ff",
                           },
                        }}
                     >
                        Enregistrer
                     </Button>
                  </Tooltip>
               </Box>
            </Box>
         </Paper>
         {errorServeur && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
               <MessageErrorServeur />
            </Alert>
         )}

         {error.textError && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
               {error.textError}
            </Alert>
         )}
         {fecthRubrique.isLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "40vh" }}>
               <CircularProgress size={60} sx={{ color: "#667eea" }} />
            </Box>
         ) : fecthRubrique.error ? (
            <MessageErrorServeurWithVarialbleHeight />
         ) : (
            <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
               <FormRubrique
                  setSave={setSave}
                  save={save}
                  initialForm={fecthRubrique.data}
                  requestMethode="PUT"
                  setError={setError}
                  setErrorServeur={setErrorServeur}
               />
            </Paper>
         )}
         <Snackbar
            open={openSnackbar}
            autoHideDuration={4000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
         >
            <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: "100%", borderRadius: 2 }}>
               Rubrique enregistrée avec succès !
            </Alert>
         </Snackbar>
      </Box>
   );
}
