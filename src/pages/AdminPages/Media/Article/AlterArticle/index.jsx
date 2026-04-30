import React, { useState, useContext } from "react";
import FormArticle from "../FormArticle";
import {
   Box,
   Typography,
   Button,
   Alert,
   Breadcrumbs,
   Link as MuiLink,
   CircularProgress,
   Backdrop,
} from "@mui/material";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useFetch } from "../../../../../utils/hooks/FetchData";
import { AppContext } from "../../../../../context";
import { MessageErrorServeur } from "../../../../../composants/MessageComponent";
import ArticleIcon from "@mui/icons-material/Article";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

export default function AlterArticle() {
   const { idArticle } = useParams();
   const { language } = useContext(AppContext);
   const isFrench = language === "FR";
   const navigation = useNavigate();
   const [update, setUpdate] = useState(false);
   const fetchArticle = useFetch(`/media/article/${idArticle}`, "GET", null, null, update);

   const [save, setSave] = useState(false);
   const [errorServeur, setErrorServeur] = useState(false);
   const [error, setError] = useState({
      textError: null,
   });
   const [form, setForm] = useState({});

   const handleSave = () => {
      setError({ textError: null });
      setErrorServeur(false);

      // Validation côté client
      if (!form.rubrique || !form.rubrique.id) {
         setError({ textError: isFrench ? "Veuillez sélectionner une rubrique." : "Please select a rubrique." });
         return;
      }
      if (!form.titre || form.titre.trim().length < 10) {
         setError({ textError: isFrench ? "Le titre doit contenir au moins 10 caractères." : "Title must contain at least 10 characters." });
         return;
      }
      if (form.titre && form.titre.length > 200) {
         setError({ textError: isFrench ? "Le titre ne doit pas dépasser 200 caractères." : "Title must not exceed 200 characters." });
         return;
      }
      if (!form.texte || form.texte.trim().length < 30) {
         setError({ textError: isFrench ? "Le texte doit contenir au moins 30 caractères." : "Text must contain at least 30 characters." });
         return;
      }
      if (!form.auteur || form.auteur.trim().length < 5) {
         setError({ textError: isFrench ? "Le nom de l'auteur doit contenir au moins 5 caractères." : "Author name must contain at least 5 characters." });
         return;
      }

      setSave(true);
   };

   const handleCancel = () => {
      navigation(-1);
   };

   // Mettre à jour le form quand les données sont chargées
   React.useEffect(() => {
      if (fetchArticle.data && !fetchArticle.isLoading) {
         setForm(fetchArticle.data);
      }
   }, [fetchArticle.data, fetchArticle.isLoading]);

   return (
      <Box className="adminPageContainer">
         {/* Header Section */}
         <Box className="adminPageHeader">
            <Box className="adminPageHeaderContent">
               <Box className="adminPageHeaderIconContainer">
                  <EditIcon className="adminPageHeaderIcon" />
               </Box>
               <Box>
                  <Breadcrumbs
                     sx={{ mb: 1, color: "rgba(255, 255, 255, 0.8)" }}
                     separator={<NavigateNextIcon fontSize="small" sx={{ color: "rgba(255, 255, 255, 0.6)" }} />}
                  >
                     <MuiLink
                        component={Link}
                        to="/article"
                        sx={{ color: "rgba(255, 255, 255, 0.8)", textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
                     >
                        {isFrench ? "Articles" : "Articles"}
                     </MuiLink>
                     <MuiLink
                        component={Link}
                        to={`/article/${idArticle}`}
                        sx={{ color: "rgba(255, 255, 255, 0.8)", textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
                     >
                        {fetchArticle.data?.titre || idArticle}
                     </MuiLink>
                     <Typography variant="body2" sx={{ color: "#fff", fontWeight: 500 }}>
                        {isFrench ? "Modification" : "Edit"}
                     </Typography>
                  </Breadcrumbs>
                  <Typography variant="h4" className="adminPageTitle">
                     {isFrench ? "Modifier l'Article" : "Edit Article"}
                  </Typography>
                  <Typography variant="body1" className="adminPageSubtitle">
                     {isFrench
                        ? "Modifiez les informations de l'article ci-dessous"
                        : "Edit the article information below"}
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
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                     },
                     fontWeight: 600,
                     fontSize: 15,
                     padding: "10px 24px",
                  }}
               >
                  {isFrench ? "Annuler" : "Cancel"}
               </Button>
               <Button
                  variant="contained"
                  startIcon={<SaveIcon />}
                  onClick={handleSave}
                  disabled={save || fetchArticle.isLoading}
                  sx={{
                     background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                     "&:hover": {
                        background: "linear-gradient(135deg, #16a34a 0%, #15803d 100%)",
                        boxShadow: "0 6px 12px rgba(56, 249, 215, 0.3)",
                     },
                     textTransform: "none",
                     borderRadius: "12px",
                     fontWeight: 600,
                     fontSize: 15,
                     padding: "10px 24px",
                     boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                  }}
               >
                  {isFrench ? "Enregistrer" : "Save"}
               </Button>
            </Box>
         </Box>

         {/* Error Messages */}
         {errorServeur && (
            <Box sx={{ mb: 3 }}>
               <MessageErrorServeur />
            </Box>
         )}

         {error.textError && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: "12px" }}>
               {error.textError}
            </Alert>
         )}

         {/* Content Section */}
         <Box className="adminPageContent">
            {fetchArticle.isLoading ? (
               <Box className="adminPageLoading">
                  <Backdrop open={true} sx={{ zIndex: 1000, color: "#fff" }}>
                     <Box sx={{ textAlign: "center" }}>
                        <CircularProgress size={60} sx={{ color: "#16a34a", mb: 2 }} />
                        <Typography variant="h6" sx={{ color: "#fff", mt: 2 }}>
                           {isFrench ? "Chargement de l'article..." : "Loading article..."}
                        </Typography>
                     </Box>
                  </Backdrop>
               </Box>
            ) : fetchArticle.error ? (
               <Box className="adminPageError">
                  <MessageErrorServeur />
               </Box>
            ) : (
               <FormArticle
                  initialForm={fetchArticle.data}
                  setSave={setSave}
                  save={save}
                  requestMethode="PUT"
                  setError={setError}
                  setErrorServeur={setErrorServeur}
                  language={language}
                  form={form}
                  setForm={setForm}
               />
            )}
         </Box>
      </Box>
   );
}
