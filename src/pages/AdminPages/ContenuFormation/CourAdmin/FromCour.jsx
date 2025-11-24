import { useState, useEffect } from "react";
import SaveComponent from "../../../../composants/SaveComponent";
import { 
   CircularProgress, 
   FormControl, 
   InputLabel, 
   MenuItem, 
   Select, 
   TextField, 
   Button, 
   Box, 
   Typography, 
   Paper, 
   Grid,
   Tooltip,
   FormHelperText
} from "@mui/material";
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
   border: '1px solid rgba(102, 126, 234, 0.1)',
   '&:hover': {
      boxShadow: '0 6px 24px rgba(0,0,0,0.15)',
   },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
   marginBottom: theme.spacing(2),
   '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
      backgroundColor: '#ffffff',
      '&:hover fieldset': {
         borderColor: '#667eea',
      },
      '&.Mui-focused fieldset': {
         borderColor: '#667eea',
      },
      '& .MuiOutlinedInput-input': {
         color: '#333333',
      },
   },
   '& .MuiInputLabel-root': {
      color: 'rgba(0, 0, 0, 0.6)',
      '&.Mui-focused': {
         color: '#667eea',
      },
   },
   '& .MuiOutlinedInput-input': {
      padding: '12px 14px',
      color: '#333333',
   },
   '& .MuiFormHelperText-root': {
      color: 'rgba(0, 0, 0, 0.6)',
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

   const handleSelectChange = (event) => {
      const selectedModule = data?.find(module => module.idModule === event.target.value);
      if (selectedModule) {
         setForm(prev => ({ ...prev, module: selectedModule }));
      }
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
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  p: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
               }}
            >
               <SchoolIcon sx={{ color: '#fff', fontSize: 28 }} />
               <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700, m: 0 }}>
                  Module de formation
               </Typography>
            </Box>
            <Box sx={{ p: 3 }}>
            <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
               <InputLabel id="module-label" sx={{ color: 'rgba(0, 0, 0, 0.6)' }}>Sélectionnez un module</InputLabel>
               <Select
                  labelId="module-label"
                  value={form.module?.idModule || ''}
                  onChange={handleSelectChange}
                  label="Module de formation"
                  sx={{
                     '& .MuiSelect-select': {
                        backgroundColor: '#ffffff',
                        color: '#333333',
                     },
                     '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(0, 0, 0, 0.23)',
                     },
                     '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#667eea',
                     },
                     '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#667eea',
                     },
                  }}
               >
                  {data?.map((module) => (
                     <MenuItem 
                        key={module.idModule} 
                        value={module.idModule}
                        sx={{
                           color: '#333333',
                           '&:hover': {
                              backgroundColor: 'rgba(102, 126, 234, 0.08)',
                           },
                           '&.Mui-selected': {
                              backgroundColor: 'rgba(102, 126, 234, 0.12)',
                              '&:hover': {
                                 backgroundColor: 'rgba(102, 126, 234, 0.16)',
                              },
                           },
                        }}
                     >
                        {module.titre}
                     </MenuItem>
                  ))}
               </Select>
               <FormHelperText sx={{color: 'rgba(0, 0, 0, 0.6)'}}>Choisissez le module auquel appartient ce cours</FormHelperText>
            </FormControl>
            </Box>
         </StyledPaper>
         {/* Section Informations du cours */}
         <StyledPaper elevation={2}>
            <Box
               sx={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  p: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
               }}
            >
               <DescriptionIcon sx={{ color: '#fff', fontSize: 28 }} />
               <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700, m: 0 }}>
                  Informations du cours
               </Typography>
            </Box>
            <Box sx={{ p: 3 }}>
            
            <Grid container spacing={3}>
               <Grid item xs={12}>
                  <StyledTextField
                     label="Titre du cours"
                     placeholder="Ex: Introduction à React"
                     fullWidth
                     variant="outlined"
                     value={form.titre || ''}
                     onChange={(e) => setForm(prev => ({ ...prev, titre: e.target.value }))}
                     helperText="Donnez un titre clair et descriptif à votre cours"
                  />
               </Grid>

               <Grid item xs={12}>
                  <StyledTextField
                     label="Préambule"
                     placeholder="Un court texte d'introduction..."
                     fullWidth
                     multiline
                     rows={3}
                     variant="outlined"
                     value={form.preanbule || ''}
                     onChange={(e) => setForm(prev => ({ ...prev, preanbule: e.target.value }))}
                     helperText="Une brève introduction qui donne envie de suivre le cours"
                  />
               </Grid>

               <Grid item xs={12}>
                  <StyledTextField
                     label="Description détaillée"
                     placeholder="Description complète du cours..."
                     fullWidth
                     multiline
                     rows={4}
                     variant="outlined"
                     value={form.description || ''}
                     onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
                     helperText="Décrivez en détail le contenu et les objectifs du cours"
                  />
               </Grid>

               <Grid item xs={12} md={6}>
                  <Box mb={2}>
                     <StyledTextField
                        label="Lien de l'image illustrative"
                        fullWidth
                        variant="outlined"
                        value={form.image || ''}
                        onChange={handleImageChange}
                        InputProps={{
                           startAdornment: <ImageIcon color="action" sx={{ mr: 1 }} />,
                        }}
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
                     <StyledTextField
                        label="Lien de la vidéo principale"
                        fullWidth
                        variant="outlined"
                        value={form.video || ''}
                        onChange={handleVideoChange}
                        InputProps={{
                           startAdornment: <VideoLibraryIcon color="action" sx={{ mr: 1 }} />,
                        }}
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
                  <StyledTextField
                     label="Ordre dans le module"
                     type="number"
                     fullWidth
                     variant="outlined"
                     value={form.ordre || 0}
                     onChange={(e) => setForm(prev => ({ ...prev, ordre: parseInt(e.target.value) || 0 }))}
                     InputProps={{
                        startAdornment: <SortIcon color="action" sx={{ mr: 1 }} />,
                        inputProps: { min: 0 }
                     }}
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
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  p: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
               }}
            >
               <Box display="flex" alignItems="center" gap={1}>
                  <ArticleIcon sx={{ color: '#fff', fontSize: 28 }} />
                  <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700, m: 0 }}>
                     Contenu du cours
                  </Typography>
               </Box>
               <Tooltip title={showEdit ? "Aperçu du rendu" : "Modifier le contenu"}>
                  <Button
                     variant="contained"
                     color={showEdit ? "primary" : "success"}
                     startIcon={showEdit ? <VisibilityIcon /> : <EditIcon />}
                     onClick={() => setShowEdit(!showEdit)}
                     size="small"
                  >
                     {showEdit ? "Aperçu" : "Modifier"}
                  </Button>
               </Tooltip>
            </Box>

            {showEdit ? (
               <Box sx={{ p: 3 }}>
                  <StyledTextField
                     label="Contenu détaillé du cours"
                     placeholder="Rédigez ici le contenu complet de votre cours..."
                     multiline
                     rows={12}
                     fullWidth
                     variant="outlined"
                     value={form.texte || ''}
                     onChange={(e) => setForm(prev => ({ ...prev, texte: e.target.value }))}
                     helperText="Utilisez le format Markdown pour la mise en forme (titres, listes, liens, etc.)"
                     sx={{
                        '& .MuiOutlinedInput-root': {
                           '&:hover fieldset': {
                              borderColor: '#667eea',
                           },
                           '&.Mui-focused fieldset': {
                              borderColor: '#667eea',
                           },
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                           color: '#667eea',
                        },
                     }}
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
                        color: '#667eea',
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
