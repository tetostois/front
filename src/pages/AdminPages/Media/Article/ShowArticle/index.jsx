import {
   Button,
   CircularProgress,
   Box,
   Typography,
   Card,
   CardContent,
   Chip,
   Grid,
   Breadcrumbs,
   Link as MuiLink,
   Divider,
   IconButton,
   Tooltip,
   Alert,
   Backdrop,
   Dialog,
   DialogTitle,
   DialogContent,
   DialogActions,
   Paper,
} from "@mui/material";
import { FormTextInput } from "../../../../../composants/UiInputs";
import React, { useState, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { MessageErrorServeur } from "../../../../../composants/MessageComponent";
import { useFetch } from "../../../../../utils/hooks/FetchData";
import { copyToClipboard, getFullUrlWithSuffix, getStatutColor } from "../../../../../utils/fonctions";
import { AppContext } from "../../../../../context";
import "../articleCSS.css";
import SaveComponent from "../../../../../composants/SaveComponent";
import { DeleteImage, DisplayImage, FormAddImageArticle } from "./imageArticleAction";
import ArticleIcon from "@mui/icons-material/Article";
import EditIcon from "@mui/icons-material/Edit";
import PublishIcon from "@mui/icons-material/Publish";
import BlockIcon from "@mui/icons-material/Block";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import PersonIcon from "@mui/icons-material/Person";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LinkIcon from "@mui/icons-material/Link";
import FolderIcon from "@mui/icons-material/Folder";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HomeIcon from "@mui/icons-material/Home";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

export default function ShowArticle() {
   const { idArticle } = useParams();
   const navigation = useNavigate();
   const { language } = useContext(AppContext);
   const isFrench = language === "FR";
   const [update, setUpdate] = useState(false);
   const { isLoading, data, error } = useFetch(`/media/article/${idArticle}`, "GET", null, null, update);

   const handleModifierClick = () => {
      navigation(`/article/alter/${idArticle}/`);
   };

   const formatDate = (dateString) => {
      if (!dateString) return null;
      return new Date(dateString).toLocaleDateString("fr-FR", {
         day: "numeric",
         month: "long",
         year: "numeric",
         hour: "numeric",
         minute: "numeric",
      });
   };

   return (
      <Box className="adminPageContainer">
         {/* Header Section */}
         <Box className="adminPageHeader">
            <Box className="adminPageHeaderContent">
               <Box className="adminPageHeaderIconContainer">
                  <ArticleIcon className="adminPageHeaderIcon" />
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
                     <Typography variant="body2" sx={{ color: "#fff", fontWeight: 500 }}>
                        {data?.titre || idArticle}
                     </Typography>
                  </Breadcrumbs>
                  <Typography variant="h4" className="adminPageTitle">
                     {data?.titre || (isFrench ? "Article" : "Article")}
                  </Typography>
                  <Typography variant="body1" className="adminPageSubtitle">
                     {isFrench ? "Détails et gestion de l'article" : "Article details and management"}
                  </Typography>
               </Box>
            </Box>
            <Button
               variant="contained"
               startIcon={<EditIcon />}
               onClick={handleModifierClick}
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
               {isFrench ? "Modifier" : "Edit"}
            </Button>
         </Box>

         {/* Content Section */}
         <Box className="adminPageContent">
            {isLoading ? (
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
            ) : error ? (
               <Box className="adminPageError">
                  <MessageErrorServeur />
               </Box>
            ) : (
               <Grid container spacing={3}>
                  {/* Rubrique Card */}
                  <Grid item xs={12}>
                     <Card sx={{ borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
                        <CardContent sx={{ p: 3 }}>
                           <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                              <FolderIcon sx={{ fontSize: 28, color: "#16a34a" }} />
                              <Box>
                                 <Typography variant="body2" sx={{ color: "#718096", mb: 0.5 }}>
                                    {isFrench ? "Rubrique" : "Rubrique"}
                                 </Typography>
                                 <Typography variant="h6" sx={{ fontWeight: 700, color: "#1a202c" }}>
                                    {data?.rubrique?.nom || "-"}
                                 </Typography>
                              </Box>
                           </Box>
                        </CardContent>
                     </Card>
                  </Grid>

                  {/* Status and Dates Card */}
                  <Grid item xs={12} md={8}>
                     <Card sx={{ borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
                        <CardContent sx={{ p: 3 }}>
                           <Typography variant="h6" sx={{ fontWeight: 600, color: "#1a202c", mb: 2 }}>
                              {isFrench ? "Informations de publication" : "Publication Information"}
                           </Typography>
                           <Divider sx={{ mb: 2 }} />
                           <Grid container spacing={2}>
                              <Grid item xs={12} sm={6}>
                                 <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                                    <CheckCircleIcon sx={{ fontSize: 20, color: getStatutColor(data?.statut) }} />
                                    <Box>
                                       <Typography variant="body2" sx={{ color: "#718096" }}>
                                          {isFrench ? "Statut" : "Status"}
                                       </Typography>
                                       <Chip
                                          label={data?.statut || "-"}
                                          sx={{
                                             backgroundColor: getStatutColor(data?.statut),
                                             color: "#fff",
                                             fontWeight: 600,
                                             mt: 0.5,
                                          }}
                                       />
                                    </Box>
                                 </Box>
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                 <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                                    <CalendarTodayIcon sx={{ fontSize: 20, color: "#16a34a" }} />
                                    <Box>
                                       <Typography variant="body2" sx={{ color: "#718096" }}>
                                          {isFrench ? "Créé le" : "Created on"}
                                       </Typography>
                                       <Typography variant="body1" sx={{ fontWeight: 500, color: "#1a202c", mt: 0.5 }}>
                                          {formatDate(data?.date) || "-"}
                                       </Typography>
                                    </Box>
                                 </Box>
                              </Grid>
                              {data?.datePublication && (
                                 <Grid item xs={12}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                       <CalendarTodayIcon sx={{ fontSize: 20, color: "#48bb78" }} />
                                       <Box>
                                          <Typography variant="body2" sx={{ color: "#718096" }}>
                                             {isFrench ? "Publié le" : "Published on"}
                                          </Typography>
                                          <Typography variant="body1" sx={{ fontWeight: 500, color: "#48bb78", mt: 0.5 }}>
                                             {formatDate(data.datePublication)}
                                          </Typography>
                                       </Box>
                                    </Box>
                                 </Grid>
                              )}
                           </Grid>
                        </CardContent>
                     </Card>
                  </Grid>

                  {/* Change Status Card */}
                  <Grid item xs={12} md={4}>
                     <Card sx={{ borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.1)", height: "100%" }}>
                        <CardContent sx={{ p: 3, display: "flex", flexDirection: "column", justifyContent: "center", height: "100%" }}>
                           <ChangeStatutArticle article={data} update={update} setUpdate={setUpdate} isFrench={isFrench} />
                        </CardContent>
                     </Card>
                  </Grid>

                  {/* Article Content Card */}
                  <Grid item xs={12}>
                     <Card sx={{ borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
                        <CardContent sx={{ p: 3 }}>
                           {/* Image Section */}
                           <Box sx={{ mb: 4, width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                              {data?.imageArticles && data.imageArticles.length > 0 ? (
                                 <>
                                    <Box sx={{ width: "100%", maxWidth: "800px", mb: 2 }}>
                                       <DisplayImage
                                          setUpdate={setUpdate}
                                          idArticle={idArticle}
                                          idImage={data.imageArticles[0].id}
                                          update={update}
                                       />
                                    </Box>
                                    <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", justifyContent: "center", mb: 2 }}>
                                       <FormAddImageArticle
                                          setUpdate={setUpdate}
                                          idArticle={idArticle}
                                          texte={isFrench ? "Changer l'image" : "Change image"}
                                       />
                                       <DeleteImage setUpdate={setUpdate} idArticle={idArticle} />
                                    </Box>
                                    <ViewTitreImageArticle
                                       idImage={data.imageArticles[0].id}
                                       image={data.imageArticles[0]}
                                       setUpdate={setUpdate}
                                       isFrench={isFrench}
                                    />
                                 </>
                              ) : (
                                 <FormAddImageArticle setUpdate={setUpdate} idArticle={idArticle} />
                              )}
                           </Box>

                           <Divider sx={{ mb: 3 }} />

                           {/* Sur Titre */}
                           {data?.surTitre && (
                              <Box sx={{ mb: 3 }}>
                                 <Typography variant="body2" sx={{ color: "#718096", mb: 1, fontWeight: 600 }}>
                                    {isFrench ? "Sur titre" : "Sur Title"}
                                 </Typography>
                                 <Chip
                                    label={data.surTitre}
                                    sx={{
                                       backgroundColor: "#16a34a",
                                       color: "#fff",
                                       fontWeight: 600,
                                       fontSize: "14px",
                                       padding: "8px 12px",
                                       height: "auto",
                                    }}
                                 />
                              </Box>
                           )}

                           {/* Titre */}
                           {data?.titre && (
                              <Box sx={{ mb: 3 }}>
                                 <Typography variant="body2" sx={{ color: "#718096", mb: 1, fontWeight: 600 }}>
                                    {isFrench ? "Titre de l'article" : "Article Title"}
                                 </Typography>
                                 <Typography
                                    variant="h4"
                                    sx={{
                                       fontWeight: 700,
                                       color: "#1a202c",
                                       fontFamily: "'Poppins', sans-serif",
                                       lineHeight: 1.3,
                                    }}
                                 >
                                    {data.titre}
                                 </Typography>
                              </Box>
                           )}

                           {/* Sous Titre */}
                           {data?.sousTitre && (
                              <Box sx={{ mb: 3 }}>
                                 <Typography variant="body2" sx={{ color: "#718096", mb: 1, fontWeight: 600 }}>
                                    {isFrench ? "Sous titre" : "Subtitle"}
                                 </Typography>
                                 <Typography variant="h6" sx={{ fontWeight: 400, color: "#4a5568", lineHeight: 1.6 }}>
                                    {data.sousTitre}
                                 </Typography>
                              </Box>
                           )}

                           {/* Contenu */}
                           {data?.texte && (
                              <Box sx={{ mb: 3 }}>
                                 <Typography variant="body2" sx={{ color: "#718096", mb: 1, fontWeight: 600 }}>
                                    {isFrench ? "Contenu textuel" : "Text Content"}
                                 </Typography>
                                 <Typography
                                    variant="body1"
                                    sx={{
                                       color: "#2d3748",
                                       lineHeight: 1.8,
                                       textAlign: "justify",
                                       whiteSpace: "pre-wrap",
                                    }}
                                 >
                                    {data.texte}
                                 </Typography>
                              </Box>
                           )}
                        </CardContent>
                     </Card>
                  </Grid>

                  {/* Author Information Card */}
                  <Grid item xs={12} md={6}>
                     <Card sx={{ borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
                        <CardContent sx={{ p: 3 }}>
                           <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                              <PersonIcon sx={{ fontSize: 24, color: "#16a34a" }} />
                              <Typography variant="h6" sx={{ fontWeight: 600, color: "#1a202c" }}>
                                 {isFrench ? "Informations sur l'auteur" : "Author Information"}
                              </Typography>
                           </Box>
                           <Divider sx={{ mb: 2 }} />
                           <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                              <Box>
                                 <Typography variant="body2" sx={{ color: "#718096", mb: 0.5 }}>
                                    {isFrench ? "Auteur" : "Author"}
                                 </Typography>
                                 <Typography variant="body1" sx={{ fontWeight: 700, color: "#1a202c" }}>
                                    {data?.auteur || "-"}
                                 </Typography>
                              </Box>
                              {data?.titreAuteur && (
                                 <Box>
                                    <Typography variant="body2" sx={{ color: "#718096", mb: 0.5 }}>
                                       {isFrench ? "Titre de l'auteur" : "Author Title"}
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontWeight: 500, color: "#4a5568" }}>
                                       {data.titreAuteur}
                                    </Typography>
                                 </Box>
                              )}
                           </Box>
                        </CardContent>
                     </Card>
                  </Grid>

                  {/* Public Link Card */}
                  <Grid item xs={12} md={6}>
                     <Card sx={{ borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
                        <CardContent sx={{ p: 3 }}>
                           <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                              <LinkIcon sx={{ fontSize: 24, color: "#16a34a" }} />
                              <Typography variant="h6" sx={{ fontWeight: 600, color: "#1a202c" }}>
                                 {isFrench ? "Lien public de l'article" : "Article Public Link"}
                              </Typography>
                           </Box>
                           <Divider sx={{ mb: 2 }} />
                           <Paper
                              sx={{
                                 p: 2,
                                 backgroundColor: "#f7fafc",
                                 borderRadius: "12px",
                                 display: "flex",
                                 alignItems: "center",
                                 gap: 2,
                              }}
                           >
                              <Typography
                                 variant="body2"
                                 sx={{
                                    flex: 1,
                                    color: "#2d3748",
                                    fontFamily: "monospace",
                                    wordBreak: "break-all",
                                 }}
                              >
                                 {data?.lien ? getFullUrlWithSuffix(`/article/${data.lien}`) : "-"}
                              </Typography>
                              <Tooltip title={isFrench ? "Copier le lien" : "Copy link"}>
                                 <IconButton
                                    onClick={() => {
                                       if (data?.lien) {
                                          copyToClipboard(getFullUrlWithSuffix(`/article/${data.lien}`));
                                       }
                                    }}
                                    sx={{
                                       backgroundColor: "#16a34a",
                                       color: "#fff",
                                       "&:hover": {
                                          backgroundColor: "#5568d3",
                                       },
                                    }}
                                 >
                                    <ContentCopyIcon />
                                 </IconButton>
                              </Tooltip>
                           </Paper>
                        </CardContent>
                     </Card>
                  </Grid>
               </Grid>
            )}
         </Box>
      </Box>
   );
}

const ChangeStatutArticle = ({ article, setUpdate, update, isFrench }) => {
   const requestURL = `/admin/media/changestatutarticle/${article && article.id ? article.id : 0}`;
   const [save, setSave] = useState(false);
   const [errorServeur, setErrorServeur] = useState(false);
   const [error, setError] = useState({
      textError: null,
   });

   const handleAction = () => {
      setSave(true);
   };

   const getButtonText = () => {
      if (article?.statut === "EN_ATTENTE") {
         return isFrench ? "Publier l'article" : "Publish Article";
      } else if (article?.statut === "SUSPENDU") {
         return isFrench ? "Republier l'article" : "Republish Article";
      } else {
         return isFrench ? "Suspendre l'article" : "Suspend Article";
      }
   };

   const getButtonIcon = () => {
      if (article?.statut === "PUBLIER") {
         return <BlockIcon />;
      } else {
         return <PublishIcon />;
      }
   };

   return (
      <Box>
         <Typography variant="body2" sx={{ color: "#718096", mb: 2, textAlign: "center" }}>
            {isFrench ? "Gérer le statut de publication" : "Manage publication status"}
         </Typography>
         <Button
            onClick={handleAction}
            variant="contained"
            startIcon={getButtonIcon()}
            color={article?.statut === "PUBLIER" ? "error" : "success"}
            fullWidth
            sx={{
               textTransform: "none",
               borderRadius: "12px",
               fontWeight: 600,
               fontSize: 15,
               padding: "12px 24px",
               boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            }}
         >
            {getButtonText()}
         </Button>
         {save && (
            <SaveComponent
               setSave={setSave}
               save={save}
               requestURL={requestURL}
               requestBody={null}
               requestMethode={"GET"}
               requestParam={null}
               setErrorServeur={setErrorServeur}
               setError={setError}
               setUpdate={setUpdate}
            />
         )}

         {errorServeur && (
            <Box sx={{ mt: 2 }}>
               <MessageErrorServeur />
            </Box>
         )}
         {error.textError && (
            <Alert severity="error" sx={{ mt: 2, borderRadius: "12px" }}>
               {error.textError}
            </Alert>
         )}
      </Box>
   );
};

const ViewTitreImageArticle = ({ idImage, image, setUpdate, isFrench }) => {
   const requestURL = `/admin/imagearticle/addtitre/${idImage}`;
   const [open, setOpen] = useState(false);
   const [newTitre, setNewTitre] = useState(image?.titre || "");
   const [save, setSave] = useState(false);
   const [errorServeur, setErrorServeur] = useState(false);
   const [error, setError] = useState({
      textError: null,
   });

   const handleClose = () => {
      setOpen(false);
   };
   const handleClickOpen = () => {
      setOpen(true);
      setNewTitre(image?.titre || "");
   };

   const handleSave = () => {
      setError((prev) => ({ ...prev, textError: null }));
      setErrorServeur(false);
      if (!newTitre || newTitre.trim() === "" || newTitre === "t") {
         setError({ textError: isFrench ? "Le titre ne peut pas être vide" : "Title cannot be empty" });
         return;
      }
      setSave(true);
   };

   return (
      <>
         <Box sx={{ width: "100%", textAlign: "center" }}>
            {image?.titre ? (
               <>
                  <Paper
                     sx={{
                        p: 2,
                        mb: 2,
                        backgroundColor: "#f7fafc",
                        borderRadius: "12px",
                        border: "1px solid #e2e8f0",
                     }}
                  >
                     <Typography
                        variant="body1"
                        sx={{
                           fontStyle: "italic",
                           fontWeight: 500,
                           color: "#4a5568",
                           fontFamily: "'Inter', sans-serif",
                        }}
                     >
                        {image.titre}
                     </Typography>
                  </Paper>
                  <Button
                     variant="contained"
                     color="warning"
                     onClick={handleClickOpen}
                     sx={{
                        textTransform: "none",
                        borderRadius: "12px",
                        fontWeight: 600,
                     }}
                  >
                     {isFrench ? "Changer le titre de l'image" : "Change Image Title"}
                  </Button>
               </>
            ) : (
               <Button
                  variant="contained"
                  color="success"
                  onClick={handleClickOpen}
                  sx={{
                     textTransform: "none",
                     borderRadius: "12px",
                     fontWeight: 600,
                  }}
               >
                  {isFrench ? "Ajouter un titre à l'image" : "Add Image Title"}
               </Button>
            )}
         </Box>
         <Dialog
            fullWidth
            open={open}
            onClose={handleClose}
            PaperProps={{
               sx: {
                  borderRadius: "16px",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
               },
            }}
         >
            <DialogTitle
               sx={{
                  background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                  color: "#fff",
                  fontWeight: 600,
               }}
            >
               {image?.titre
                  ? isFrench
                     ? "Modifier le titre de l'image"
                     : "Edit Image Title"
                  : isFrench
                  ? "Ajouter un titre à l'image"
                  : "Add Image Title"}
            </DialogTitle>
            <DialogContent sx={{ mt: 2 }}>
               {errorServeur && (
                  <Box sx={{ mb: 2 }}>
                     <MessageErrorServeur />
                  </Box>
               )}
               {error.textError && (
                  <Alert severity="error" sx={{ mb: 2, borderRadius: "12px" }}>
                     {error.textError}
                  </Alert>
               )}
               {save && (
                  <SaveComponent
                     setSave={setSave}
                     save={save}
                     requestURL={requestURL}
                     requestBody={newTitre}
                     requestMethode={"POST"}
                     setErrorServeur={setErrorServeur}
                     setError={setError}
                     setUpdate={setUpdate}
                  />
               )}

               <FormTextInput
                  fullWidth
                  className="mt-2"
                  label={isFrench ? "Titre de l'image" : "Image Title"}
                  placeholder={isFrench ? "Description de l'image" : "Image description"}
                  value={newTitre}
                  onChange={(e) => {
                     setNewTitre(e.target.value || "");
                  }}
               />
            </DialogContent>

            <DialogActions sx={{ p: 3, pt: 2 }}>
               <Button
                  onClick={handleClose}
                  sx={{
                     textTransform: "none",
                     borderRadius: "12px",
                     fontWeight: 600,
                  }}
               >
                  {isFrench ? "Annuler" : "Cancel"}
               </Button>
               <Button
                  onClick={handleSave}
                  variant="contained"
                  sx={{
                     background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                     "&:hover": {
                        background: "linear-gradient(135deg, #16a34a 0%, #15803d 100%)",
                        boxShadow: "0 6px 12px rgba(56, 249, 215, 0.3)",
                     },
                     textTransform: "none",
                     borderRadius: "12px",
                     fontWeight: 600,
                  }}
               >
                  {isFrench ? "Valider" : "Validate"}
               </Button>
            </DialogActions>
         </Dialog>
      </>
   );
};
