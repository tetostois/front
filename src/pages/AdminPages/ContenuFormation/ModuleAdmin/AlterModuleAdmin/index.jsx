import React, { useState, useContext } from "react";
import FormModule from "../FormModule";
import { MessageErrorServeur } from "../../../../../composants/MessageComponent";
import {
   Box,
   Typography,
   Button,
   CircularProgress,
   Backdrop,
   Alert,
   Breadcrumbs,
   Link as MuiLink
} from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../../../../../utils/hooks/FetchData";
import { AppContext } from "../../../../../context";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import HomeIcon from "@mui/icons-material/Home";

export default function AlterModuleAdmin() {
   const { idModule } = useParams();
   const { language } = useContext(AppContext);
   const isFrench = language === "FR";
   const navigation = useNavigate();
   const [update, setUpdate] = useState(false);
   const fetchModule = useFetch(`/admin/module/${idModule}`, "GET", null, null, update);
   const [save, setSave] = useState(false);
   const [errorServeur, setErrorServeur] = useState(false);
   const [error, setError] = useState({
      textError: null,
   });

   const handleSave = () => {
      setError((prev) => ({ ...prev, textError: null }));
      setErrorServeur(false);
      setSave(true);
   };

   const handleCancel = () => {
      navigation(-1);
   };

   return (
      <Box className="adminPageContainer">
         {/* Header Section */}
         <Box className="adminPageHeader">
            <Box className="adminPageHeaderContent">
               <Box className="adminPageHeaderIconContainer">
                  <EditIcon className="adminPageHeaderIcon" />
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
                     <MuiLink
                        component={Link}
                        to={`/module/${idModule}`}
                        sx={{
                           display: "flex",
                           alignItems: "center",
                           color: "rgba(255, 255, 255, 0.8)",
                           textDecoration: "none",
                           "&:hover": { color: "#fff", textDecoration: "underline" }
                        }}
                     >
                        <MenuBookIcon sx={{ fontSize: 18, mr: 0.5 }} />
                        {fetchModule.data?.module?.titre || (isFrench ? "Module" : "Module")}
                     </MuiLink>
                     <Typography sx={{ color: "#fff", display: "flex", alignItems: "center" }}>
                        <EditIcon sx={{ fontSize: 18, mr: 0.5 }} />
                        {isFrench ? "Modifier" : "Edit"}
                     </Typography>
                  </Breadcrumbs>
                  <Typography variant="h4" className="adminPageTitle">
                     {isFrench
                        ? `Modifier le Module: ${fetchModule.data?.module?.titre || ""}`
                        : `Edit Module: ${fetchModule.data?.module?.titre || ""}`}
                  </Typography>
                  <Typography variant="body1" className="adminPageSubtitle">
                     {isFrench
                        ? "Modifiez les informations du module"
                        : "Modify module information"}
                  </Typography>
               </Box>
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
               <Button
                  variant="outlined"
                  startIcon={<CancelIcon />}
                  onClick={handleCancel}
                  sx={{
                     textTransform: "none",
                     borderRadius: "12px",
                     borderColor: "rgba(255, 255, 255, 0.5)",
                     color: "#fff",
                     "&:hover": {
                        borderColor: "#fff",
                        backgroundColor: "rgba(255, 255, 255, 0.1)"
                     },
                     fontWeight: 600,
                     fontSize: 15,
                     padding: "10px 24px"
                  }}
               >
                  {isFrench ? "Annuler" : "Cancel"}
               </Button>
               <Button
                  variant="contained"
                  startIcon={<SaveIcon />}
                  onClick={handleSave}
                  disabled={save || fetchModule.isLoading}
                  sx={{
                     background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                     "&:hover": {
                        background: "linear-gradient(135deg, #16a34a 0%, #15803d 100%)",
                        boxShadow: "0 6px 12px rgba(56, 249, 215, 0.3)"
                     },
                     textTransform: "none",
                     borderRadius: "12px",
                     fontWeight: 600,
                     fontSize: 15,
                     padding: "10px 24px",
                     boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
                  }}
               >
                  {isFrench ? "Enregistrer" : "Save"}
               </Button>
            </Box>
         </Box>

         {/* Loading State */}
         {fetchModule.isLoading ? (
            <Box className="adminPageLoading">
               <Backdrop open={true} sx={{ zIndex: 1000, color: "#fff" }}>
                  <Box sx={{ textAlign: "center" }}>
                     <CircularProgress size={60} sx={{ color: "#16a34a", mb: 2 }} />
                     <Typography variant="h6" sx={{ color: "#fff", mt: 2 }}>
                        {isFrench ? "Chargement des données..." : "Loading data..."}
                     </Typography>
                  </Box>
               </Backdrop>
            </Box>
         ) : fetchModule.error ? (
            <Box className="adminPageError">
               <MessageErrorServeur />
            </Box>
         ) : (
            <Box className="adminPageContent">
               {fetchModule.data?.module ? (
                  <>
                     {/* Error Messages */}
                     {error.textError && (
                        <Alert severity="error" sx={{ mb: 3, borderRadius: "12px" }}>
                           {error.textError}
                        </Alert>
                     )}
                     {errorServeur && <MessageErrorServeur />}

                     <FormModule
                        setSave={setSave}
                        save={save}
                        initialForm={fetchModule.data.module}
                        requestMethode="PUT"
                        setError={setError}
                        setErrorServeur={setErrorServeur}
                     />
                  </>
               ) : (
                  <Alert severity="warning" sx={{ borderRadius: "12px" }}>
                     {isFrench ? "Aucun module trouvé" : "No module found"}
                  </Alert>
               )}
            </Box>
         )}
      </Box>
   );
}
