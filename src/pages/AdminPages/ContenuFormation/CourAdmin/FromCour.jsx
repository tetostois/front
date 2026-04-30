import { useState, useEffect } from "react";
import SaveComponent from "../../../../composants/SaveComponent";
import { 
   CircularProgress, 
   Button, 
   Box, 
   Typography, 
   Paper, 
   Grid,
   Tooltip,
} from "@mui/material";
import ModuleFormationSelect from "./ModuleFormationSelect";
import { FormTextInput } from "../../../../composants/UiInputs";
import SchoolIcon from '@mui/icons-material/School';
import DescriptionIcon from '@mui/icons-material/Description';
import ArticleIcon from '@mui/icons-material/Article';
import { useFetch } from "../../../../utils/hooks/FetchData";
import { MessageErrorServeur } from "../../../../composants/MessageComponent";
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import ImageIcon from '@mui/icons-material/Image';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import SortIcon from '@mui/icons-material/Sort';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
   padding: 0,
   marginBottom: theme.spacing(3),
   borderRadius: '20px',
   boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
   overflow: 'hidden',
   border: '1px solid rgba(22, 163, 74, 0.1)',
   '&:hover': {
      boxShadow: '0 6px 24px rgba(0,0,0,0.15)',
   },
}));

export default function FormCour({ initialForm, setErrorServeur, setError, setSave, save, requestMethode }) {
   const [filter] = useState(null);
   const [update] = useState(false);
   const [showEdit, setShowEdit] = useState(true);
   const [previewImage, setPreviewImage] = useState('');
   const [previewVideo, setPreviewVideo] = useState('');

   const { isLoading, data, error } = useFetch(`/admin/modules`, "GET", null, filter, update);
   const requestURL = "/admin/chapitre/";
   const [form, setForm] = useState(initialForm || {});
   
   useEffect(() => {
      if (initialForm) {
         setForm(initialForm);
         if (initialForm.image) setPreviewImage(initialForm.image);
         if (initialForm.video) setPreviewVideo(initialForm.video);
      }
   }, [initialForm]);

   const handleModuleChange = (moduleOrNull) => {
      setForm((prev) => ({
         ...prev,
         module: moduleOrNull ?? undefined,
      }));
   };

   const handleImageChange = (e) => {
      const value = e.target.value;
      setForm(prev => ({ ...prev, image: value }));
      setPreviewImage(value);
   };

   const handleVideoChange = (e) => {
      const value = e.target.value;
      setForm(prev => ({ ...prev, video: value }));
      setPreviewVideo(value);
   };

   if (isLoading) {
      return (
         <Box display="flex" justifyContent="center" p={4}>
            <CircularProgress />
         </Box>
      );
   }

   if (error) {
      return <MessageErrorServeur />;
   }

   return (
      <Box>
         {/* Section Module de formation */}
         <StyledPaper elevation={2}>
            <Box
               sx={{
                  background: "#ffffff",
                  borderBottom: "1px solid #e2e8f0",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
               }}
            >
               <Box
                  sx={{
                     display: "flex",
                     alignItems: "center",
                     justifyContent: "center",
                     p: "10px",
                     borderRadius: "12px",
                     background: "rgba(22, 163, 74, 0.1)",
                  }}
               >
                  <SchoolIcon sx={{ color: "#16a34a", fontSize: 28 }} />
               </Box>
               <Typography variant="h6" sx={{ color: "#0f172a", fontWeight: 700, m: 0 }}>
                  Module de formation
               </Typography>
            </Box>
            <Box sx={{ p: 3 }}>
               <ModuleFormationSelect
                  modules={data}
                  valueId={form.module?.idModule}
                  onChange={handleModuleChange}
               />
            </Box>
         </StyledPaper>
         {/* Section Informations du cours */}
         <StyledPaper elevation={2}>
            <Box
               sx={{
                  background: "#ffffff",
                  borderBottom: "1px solid #e2e8f0",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
               }}
            >
               <Box
                  sx={{
                     display: "flex",
                     alignItems: "center",
                     justifyContent: "center",
                     p: "10px",
                     borderRadius: "12px",
                     background: "rgba(22, 163, 74, 0.1)",
                  }}
               >
                  <DescriptionIcon sx={{ color: "#16a34a", fontSize: 28 }} />
               </Box>
               <Typography variant="h6" sx={{ color: "#0f172a", fontWeight: 700, m: 0 }}>
                  Informations du cours
               </Typography>
            </Box>
            <Box sx={{ p: 3 }}>
            
            <Grid container spacing={3}>
               <Grid item xs={12}>
                  <FormTextInput
                     label="Titre du cours"
                     placeholder="Ex: Introduction à React"
                     fullWidth
                     value={form.titre || ''}
                     onChange={(e) => setForm(prev => ({ ...prev, titre: e.target.value }))}
                     helperText="Donnez un titre clair et descriptif à votre cours"
                  />
               </Grid>

               <Grid item xs={12}>
                  <FormTextInput
                     label="Préambule"
                     placeholder="Un court texte d'introduction..."
                     fullWidth
                     multiline
                     rows={3}
                     value={form.preanbule || ''}
                     onChange={(e) => setForm(prev => ({ ...prev, preanbule: e.target.value }))}
                     helperText="Une brève introduction qui donne envie de suivre le cours"
                  />
               </Grid>

               <Grid item xs={12}>
                  <FormTextInput
                     label="Description détaillée"
                     placeholder="Description complète du cours..."
                     fullWidth
                     multiline
                     rows={4}
                     value={form.description || ''}
                     onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
                     helperText="Décrivez en détail le contenu et les objectifs du cours"
                  />
               </Grid>

               <Grid item xs={12} md={6}>
                  <Box mb={2}>
                     <FormTextInput
                        label="Lien de l'image illustrative"
                        fullWidth
                        value={form.image || ''}
                        onChange={handleImageChange}
                        startAdornment={<ImageIcon sx={{ fontSize: 22, color: '#64748b' }} />}
                        helperText="URL d'une image représentative du cours"
                     />
                     {previewImage && (
                        <Box mt={1}>
                           <img 
                              src={previewImage} 
                              alt="Aperçu" 
                              style={{ 
                                 maxWidth: '100%', 
                                 maxHeight: '150px', 
                                 borderRadius: '4px',
                                 marginTop: '8px'
                              }} 
                              onError={(e) => {
                                 e.target.onerror = null;
                                 e.target.src = 'https://via.placeholder.com/400x200?text=Image+non+disponible';
                              }}
                           />
                        </Box>
                     )}
                  </Box>
               </Grid>

               <Grid item xs={12} md={6}>
                  <Box mb={2}>
                     <FormTextInput
                        label="Lien de la vidéo principale"
                        fullWidth
                        value={form.video || ''}
                        onChange={handleVideoChange}
                        startAdornment={<VideoLibraryIcon sx={{ fontSize: 22, color: '#64748b' }} />}
                        helperText="URL d'une vidéo de présentation ou d'introduction"
                     />
                     {previewVideo && (
                        <Box mt={1}>
                           <video 
                              src={previewVideo} 
                              controls 
                              style={{ 
                                 maxWidth: '100%', 
                                 maxHeight: '150px', 
                                 borderRadius: '4px',
                                 marginTop: '8px',
                                 backgroundColor: '#f5f5f5'
                              }}
                              onError={(e) => {
                                 e.target.onerror = null;
                                 e.target.poster = 'https://via.placeholder.com/400x200?text=Video+non+disponible';
                              }}
                           />
                        </Box>
                     )}
                  </Box>
               </Grid>

               <Grid item xs={12} sm={6} md={3}>
                  <FormTextInput
                     label="Ordre dans le module"
                     type="number"
                     fullWidth
                     value={form.ordre || 0}
                     onChange={(e) => setForm(prev => ({ ...prev, ordre: parseInt(e.target.value, 10) || 0 }))}
                     startAdornment={<SortIcon sx={{ fontSize: 22, color: '#64748b' }} />}
                     inputProps={{ min: 0 }}
                     helperText="Position du cours dans le module"
                  />
               </Grid>
            </Grid>
            </Box>
         </StyledPaper>

         {/* Section Contenu du cours */}
         <StyledPaper elevation={2}>
            <Box
               sx={{
                  background: "#ffffff",
                  borderBottom: "1px solid #e2e8f0",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: 1.5,
               }}
            >
               <Box display="flex" alignItems="center" gap={1.5}>
                  <Box
                     sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        p: "10px",
                        borderRadius: "12px",
                        background: "rgba(22, 163, 74, 0.1)",
                     }}
                  >
                     <ArticleIcon sx={{ color: "#16a34a", fontSize: 28 }} />
                  </Box>
                  <Typography variant="h6" sx={{ color: "#0f172a", fontWeight: 700, m: 0 }}>
                     Contenu du cours
                  </Typography>
               </Box>
               <Tooltip title={showEdit ? "Aperçu du rendu" : "Modifier le contenu"}>
                  <Button
                     variant="contained"
                     size="small"
                     startIcon={showEdit ? <VisibilityIcon /> : <EditIcon />}
                     onClick={() => setShowEdit(!showEdit)}
                     sx={{
                        textTransform: "none",
                        borderRadius: "12px",
                        fontWeight: 600,
                        background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                        color: "#fff",
                        boxShadow: "0 2px 8px rgba(22, 163, 74, 0.25)",
                        "&:hover": {
                           background: "linear-gradient(135deg, #16a34a 0%, #15803d 100%)",
                        },
                     }}
                  >
                     {showEdit ? "Aperçu" : "Modifier"}
                  </Button>
               </Tooltip>
            </Box>

            {showEdit ? (
               <Box sx={{ p: 3 }}>
                  <FormTextInput
                     label="Contenu détaillé du cours"
                     placeholder="Rédigez ici le contenu complet de votre cours..."
                     multiline
                     rows={12}
                     fullWidth
                     value={form.texte || ''}
                     onChange={(e) => setForm(prev => ({ ...prev, texte: e.target.value }))}
                     helperText="Utilisez le format Markdown pour la mise en forme (titres, listes, liens, etc.)"
                  />
               </Box>
            ) : (
               <Box 
                  sx={{
                     p: 3,
                     border: '1px solid #e0e0e0',
                     backgroundColor: '#ffffff',
                     borderRadius: '12px',
                     m: 2,
                     color: '#333333',
                     '& h1, & h2, & h3, & h4, & h5, & h6': {
                        color: '#333333',
                        margin: '16px 0 8px 0',
                     },
                     '& p': {
                        margin: '8px 0',
                        lineHeight: '1.6',
                     },
                     '& ul, & ol': {
                        paddingLeft: '24px',
                        margin: '8px 0',
                     },
                     '& li': {
                        margin: '4px 0',
                     },
                     '& a': {
                        color: '#16a34a',
                        textDecoration: 'none',
                        '&:hover': {
                           textDecoration: 'underline',
                        },
                     },
                     '& code': {
                        backgroundColor: '#f5f5f5',
                        padding: '2px 4px',
                        borderRadius: '4px',
                        fontFamily: 'monospace',
                     },
                     '& pre': {
                        backgroundColor: '#f8f9fa',
                        padding: '12px',
                        borderRadius: '4px',
                        overflowX: 'auto',
                     },
                     minHeight: '300px',
                  }}
               >
                  {form.texte ? (
                     <div 
                        dangerouslySetInnerHTML={{ __html: form.texte }}
                        style={{ lineHeight: '1.6' }}
                     />
                  ) : (
                     <Box 
                        display="flex" 
                        justifyContent="center" 
                        alignItems="center" 
                        minHeight="250px"
                        sx={{ color: 'text.secondary' }}
                     >
                        Aucun contenu à afficher pour le moment
                     </Box>
                  )}
               </Box>
            )}
         </StyledPaper>
         
         {save && (
            <SaveComponent
               setSave={setSave}
               requestURL={requestURL}
               requestBody={form}
               requestMethode={requestMethode || "POST"}
               requestParam={null}
               setErrorServeur={setErrorServeur}
               setError={setError}
               redirected={true}
            />
         )}
      </Box>
   );
}
