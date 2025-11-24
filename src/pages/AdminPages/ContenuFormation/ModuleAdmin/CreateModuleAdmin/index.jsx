import React, { useState } from "react";
import FormModule from "../FormModule";
import { MessageErrorServeur } from "../../../../../composants/MessageComponent";
import { 
   Button, 
   Box, 
   Typography, 
   Breadcrumbs, 
   Paper, 
   Alert, 
   Snackbar,
   Tooltip
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function CreateModuleAdmin() {
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
                  <Typography variant="h5" component="h1" sx={{ fontWeight: 600, mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                     <AddCircleIcon sx={{ fontSize: 28 }} />
                     Ajout d'un nouveau module
                  </Typography>
                  <Breadcrumbs aria-label="breadcrumb" sx={{ color: 'white', '& a': { color: 'white' } }}>
                     <Link 
                        component={RouterLink} 
                        to="/modules" 
                        sx={{ 
                           textDecoration: 'none', 
                           display: 'flex', 
                           alignItems: 'center',
                           '&:hover': { textDecoration: 'underline' }
                        }}
                     >
                        <ArrowBackIcon fontSize="small" sx={{ mr: 0.5 }} />
                        Retour aux modules
                     </Link>
                     <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                        Création d'un module
                     </Typography>
                  </Breadcrumbs>
               </Box>
               <Box sx={{ display: 'flex', gap: 2 }}>
                  <Tooltip title="Annuler la création">
                     <Button
                        variant="contained"
                        startIcon={<CancelIcon />}
                        onClick={() => navigation(-1)}
                        sx={{ 
                           bgcolor: 'error.main',
                           '&:hover': { bgcolor: 'error.dark' },
                           textTransform: 'none',
                           borderRadius: '12px',
                           fontWeight: 600
                        }}
                     >
                        Annuler
                     </Button>
                  </Tooltip>
                  <Tooltip title="Enregistrer le nouveau module">
                     <Button
                        variant="contained"
                        startIcon={<SaveIcon />}
                        onClick={ajoutRubrique}
                        sx={{ 
                           bgcolor: 'success.main',
                           '&:hover': { bgcolor: 'success.dark' },
                           textTransform: 'none',
                           borderRadius: '12px',
                           fontWeight: 600
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
            <Alert severity="error" sx={{ mb: 3, borderRadius: '12px' }}>
               <MessageErrorServeur />
            </Alert>
         )}

         {error.textError && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: '12px' }}>
               {error.textError}
            </Alert>
         )}

         {/* Contenu principal */}
         <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
            <FormModule
               setSave={setSave}
               save={save}
               requestMethode="POST"
               setError={setError}
               setErrorServeur={setErrorServeur}
            />
         </Paper>

         {/* Notification de succès */}
         <Snackbar 
            open={openSnackbar} 
            autoHideDuration={6000} 
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
         >
            <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%', borderRadius: '12px' }}>
               Le module a été créé avec succès !
            </Alert>
         </Snackbar>
      </Box>
   );
}
