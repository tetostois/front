import React, { useState } from "react";
import FormCour from "../FromCour";
import { MessageErrorServeur } from "../../../../../composants/MessageComponent";
import {
   Button,
   Box,
   Typography,
   Breadcrumbs,
   Paper,
   Alert,
   Snackbar,
   Tooltip,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export default function CreateCourAdmin() {
   const [save, setSave] = useState(false);
   const [errorServeur, setErrorServeur] = useState(false);
   const [error, setError] = useState({
      textError: null,
   });
   const [openSnackbar, setOpenSnackbar] = useState(false);

   const navigation = useNavigate();

   const handleCloseSnackbar = () => {
      setOpenSnackbar(false);
   };

   const ajoutRubrique = () => {
      setError((prev) => ({ ...prev, textError: null }));
      setErrorServeur(false);
      setSave(true);
      setOpenSnackbar(true);
   };

   return (
      <Box className="adminPageContainer">
         {/* Bandeau aligné sur la liste des cours / tableau de bord admin (fond blanc) */}
         <Box className="adminPageHeader">
            <Box className="adminPageHeaderContent">
               <Box className="adminPageHeaderIconContainer">
                  <AddCircleIcon className="adminPageHeaderIcon" />
               </Box>
               <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="h4" className="adminPageTitle">
                     Ajout d&apos;un nouveau cours
                  </Typography>
                  <Breadcrumbs
                     aria-label="breadcrumb"
                     separator="›"
                     sx={{ mt: 0.5, "& .MuiBreadcrumbs-separator": { color: "#94a3b8" } }}
                  >
                     <Link
                        component={RouterLink}
                        to="/cours"
                        underline="hover"
                        sx={{
                           display: "inline-flex",
                           alignItems: "center",
                           gap: 0.5,
                           color: "#16a34a",
                           fontWeight: 500,
                           fontSize: "0.95rem",
                        }}
                     >
                        <ArrowBackIcon sx={{ fontSize: 18 }} />
                        Retour aux cours
                     </Link>
                     <Typography sx={{ color: "#64748b", fontSize: "0.95rem" }}>Création d&apos;un cours</Typography>
                  </Breadcrumbs>
               </Box>
            </Box>
            <Box sx={{ display: "flex", gap: 2, flexShrink: 0, flexWrap: "wrap" }}>
               <Tooltip title="Annuler la création">
                  <Button
                     variant="outlined"
                     color="error"
                     startIcon={<CancelIcon />}
                     onClick={() => navigation(-1)}
                     sx={{
                        textTransform: "none",
                        borderRadius: "12px",
                        fontWeight: 600,
                     }}
                  >
                     Annuler
                  </Button>
               </Tooltip>
               <Tooltip title="Enregistrer le nouveau cours">
                  <Button
                     variant="contained"
                     startIcon={<SaveIcon />}
                     onClick={ajoutRubrique}
                     sx={{
                        background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                        color: "#fff",
                        fontWeight: 600,
                        textTransform: "none",
                        borderRadius: "12px",
                        boxShadow: "0 4px 16px rgba(22, 163, 74, 0.25)",
                        "&:hover": {
                           background: "linear-gradient(135deg, #16a34a 0%, #15803d 100%)",
                           boxShadow: "0 6px 20px rgba(22, 163, 74, 0.35)",
                        },
                     }}
                  >
                     Enregistrer
                  </Button>
               </Tooltip>
            </Box>
         </Box>

         <Box className="adminPageContent">
            {errorServeur && (
               <Alert severity="error" sx={{ mb: 2, borderRadius: "12px" }}>
                  <MessageErrorServeur />
               </Alert>
            )}
            {error.textError && (
               <Alert severity="error" sx={{ mb: 2, borderRadius: "12px" }}>
                  {error.textError}
               </Alert>
            )}
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2, boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)" }}>
               <FormCour
                  setSave={setSave}
                  save={save}
                  requestMethode="POST"
                  setError={setError}
                  setErrorServeur={setErrorServeur}
               />
            </Paper>
         </Box>

         <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
         >
            <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: "100%", borderRadius: "12px" }}>
               Le cours a été créé avec succès !
            </Alert>
         </Snackbar>
      </Box>
   );
}
