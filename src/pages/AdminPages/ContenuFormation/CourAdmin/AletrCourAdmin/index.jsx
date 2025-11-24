import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../../../../../utils/hooks/FetchData";
import FormCour from "../FromCour";
import {
   MessageErrorServeur,
   MessageErrorServeurWithVarialbleHeight,
} from "../../../../../composants/MessageComponent";
import { 
   Button, 
   CircularProgress, 
   Box, 
   Typography, 
   Breadcrumbs, 
   Paper, 
   Alert, 
   Snackbar,
   IconButton,
   Tooltip
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

export default function AlterCourAdmin() {
   const { idChapitre } = useParams();
   const navigation = useNavigate();
   const [update, setUpdate] = useState(false);
   const fecthChapitre = useFetch(`/admin/cour/${idChapitre}`, "GET", null, null, update);
   const [save, setSave] = useState(false);
   const [errorServeur, setErrorServeur] = useState(false);
   const [error, setError] = useState({
      textError: null,
   });
   const [openSnackbar, setOpenSnackbar] = useState(false);

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
      <Box sx={{ flexGrow: 1, p: 3 }}>
         {/* En-tête moderne avec fil d'Ariane */}
         <Paper 
            elevation={3} 
            sx={{ 
               p: 3, 
               mb: 3, 
               background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
               color: 'white',
               borderRadius: 2
            }}
         >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <Box>
                  <Typography variant="h5" component="h1" sx={{ fontWeight: 600, mb: 1 }}>
                     Modification du cours : {fecthChapitre.data?.chapitre?.titre || 'Chargement...'}
                  </Typography>
                  <Breadcrumbs aria-label="breadcrumb" sx={{ color: 'white', '& a': { color: 'white' } }}>
                     <Link to="/cours" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                        <ArrowBackIcon fontSize="small" sx={{ mr: 0.5 }} />
                        Retour aux cours
                     </Link>
                     <Typography color="text.primary">
                        {fecthChapitre.data?.chapitre?.titre || 'Chargement...'}
                     </Typography>
                  </Breadcrumbs>
               </Box>
               <Box sx={{ display: 'flex', gap: 2 }}>
                  <Tooltip title="Annuler les modifications">
                     <Button
                        variant="contained"
                        color="error"
                        startIcon={<CancelIcon />}
                        onClick={() => navigation(-1)}
                        sx={{ 
                           bgcolor: 'error.main',
                           '&:hover': { bgcolor: 'error.dark' }
                        }}
                     >
                        Annuler
                     </Button>
                  </Tooltip>
                  <Tooltip title="Enregistrer les modifications">
                     <Button
                        variant="contained"
                        color="success"
                        startIcon={<SaveIcon />}
                        onClick={ajoutRubrique}
                        sx={{ 
                           bgcolor: 'success.main',
                           '&:hover': { bgcolor: 'success.dark' }
                        }}
                     >
                        Enregistrer
                     </Button>
                  </Tooltip>
               </Box>
            </Box>
         </Paper>

         {/* Messages d'erreur */}
         {errorServeur && (
            <Alert severity="error" sx={{ mb: 3 }}>
               <MessageErrorServeur />
            </Alert>
         )}

         {error.textError && (
            <Alert severity="error" sx={{ mb: 3 }}>
               {error.textError}
            </Alert>
         )}

         {/* Contenu principal */}
         <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
            {fecthChapitre.isLoading ? (
               <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                  <CircularProgress size={40} />
               </Box>
            ) : fecthChapitre.error ? (
               <Alert severity="error">
                  <MessageErrorServeurWithVarialbleHeight />
               </Alert>
            ) : (
               <FormCour
                  setSave={setSave}
                  save={save}
                  initialForm={fecthChapitre.data?.chapitre || {}}
                  requestMethode="PUT"
                  setError={setError}
                  setErrorServeur={setErrorServeur}
               />
            )}
         </Paper>

         {/* Notification de succès */}
         <Snackbar 
            open={openSnackbar} 
            autoHideDuration={6000} 
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
         >
            <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
               Les modifications ont été enregistrées avec succès !
            </Alert>
         </Snackbar>
      </Box>
   );
}
