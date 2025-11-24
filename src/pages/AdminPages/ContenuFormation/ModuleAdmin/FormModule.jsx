import { TextField, Box, Grid, Card, CardContent, Typography, Divider, InputAdornment } from "@mui/material";
import React, { useState, useEffect } from "react";
import SaveComponent from "../../../../composants/SaveComponent";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import DescriptionIcon from "@mui/icons-material/Description";
import ImageIcon from "@mui/icons-material/Image";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

export default function FormModule({ initialForm, setErrorServeur, setError, setSave, save, requestMethode }) {
   const requestURL = "/admin/module/";
   const [form, setForm] = useState(initialForm ? initialForm : {});

   // Mettre à jour le formulaire quand initialForm change
   useEffect(() => {
      if (initialForm) {
         setForm(initialForm);
      }
   }, [initialForm]);

   const handleChange = (field) => (event) => {
      setForm({ ...form, [field]: event.target.value });
   };

   return (
      <>
         {save && (
            <SaveComponent
               setSave={setSave}
               requestURL={requestURL}
               requestBody={form}
               requestMethode={requestMethode ? requestMethode : "POST"}
               requestParam={null}
               setErrorServeur={setErrorServeur}
               setError={setError}
               redirected={true}
            />
         )}
         <Grid container spacing={3}>
            {/* Titres */}
            <Grid item xs={12}>
               <Card sx={{ borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
                  <CardContent sx={{ p: 3 }}>
                     <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                        <MenuBookIcon sx={{ fontSize: 24, color: "#667eea", mr: 1.5 }} />
                        <Typography variant="h6" sx={{ fontWeight: 600, color: "#1a202c" }}>
                           Titres du Module
                        </Typography>
                     </Box>
                     <Divider sx={{ mb: 2 }} />
                     <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                           <TextField
                              label="Titre du module en français"
                              placeholder="Ex: Module de base"
                              fullWidth
                              value={form.titre || ""}
                              onChange={handleChange("titre")}
                              sx={{
                                 "& .MuiOutlinedInput-root": {
                                    borderRadius: "12px",
                                    "& input": {
                                       color: "#1a202c"
                                    }
                                 },
                                 "& .MuiInputLabel-root": {
                                    color: "#718096"
                                 }
                              }}
                           />
                        </Grid>
                        <Grid item xs={12} md={6}>
                           <TextField
                              label="Titre du module en anglais"
                              placeholder="Ex: Basic Module"
                              fullWidth
                              value={form.titreEn || ""}
                              onChange={handleChange("titreEn")}
                              sx={{
                                 "& .MuiOutlinedInput-root": {
                                    borderRadius: "12px",
                                    "& input": {
                                       color: "#1a202c"
                                    }
                                 },
                                 "& .MuiInputLabel-root": {
                                    color: "#718096"
                                 }
                              }}
                           />
                        </Grid>
                     </Grid>
                  </CardContent>
               </Card>
            </Grid>

            {/* Descriptions */}
            <Grid item xs={12}>
               <Card sx={{ borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
                  <CardContent sx={{ p: 3 }}>
                     <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                        <DescriptionIcon sx={{ fontSize: 24, color: "#667eea", mr: 1.5 }} />
                        <Typography variant="h6" sx={{ fontWeight: 600, color: "#1a202c" }}>
                           Descriptions du Module
                        </Typography>
                     </Box>
                     <Divider sx={{ mb: 2 }} />
                     <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                           <TextField
                              label="Description (version française)"
                              placeholder="Ce module est dédié à..."
                              multiline
                              rows={4}
                              fullWidth
                              value={form.description || ""}
                              onChange={handleChange("description")}
                              sx={{
                                 "& .MuiOutlinedInput-root": {
                                    borderRadius: "12px",
                                    "& textarea": {
                                       color: "#1a202c"
                                    }
                                 },
                                 "& .MuiInputLabel-root": {
                                    color: "#718096"
                                 }
                              }}
                           />
                        </Grid>
                        <Grid item xs={12} md={6}>
                           <TextField
                              label="Description (version anglaise)"
                              placeholder="This module is dedicated to..."
                              multiline
                              rows={4}
                              fullWidth
                              value={form.descriptionEn || ""}
                              onChange={handleChange("descriptionEn")}
                              sx={{
                                 "& .MuiOutlinedInput-root": {
                                    borderRadius: "12px",
                                    "& textarea": {
                                       color: "#1a202c"
                                    }
                                 },
                                 "& .MuiInputLabel-root": {
                                    color: "#718096"
                                 }
                              }}
                           />
                        </Grid>
                     </Grid>
                  </CardContent>
               </Card>
            </Grid>

            {/* Informations supplémentaires */}
            <Grid item xs={12}>
               <Card sx={{ borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
                  <CardContent sx={{ p: 3 }}>
                     <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                        <ImageIcon sx={{ fontSize: 24, color: "#667eea", mr: 1.5 }} />
                        <Typography variant="h6" sx={{ fontWeight: 600, color: "#1a202c" }}>
                           Informations Supplémentaires
                        </Typography>
                     </Box>
                     <Divider sx={{ mb: 2 }} />
                     <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                           <TextField
                              label="Nom de l'image illustrative"
                              placeholder="Ex: module-image.jpg"
                              fullWidth
                              value={form.nomImage || ""}
                              onChange={handleChange("nomImage")}
                              InputProps={{
                                 startAdornment: (
                                    <InputAdornment position="start">
                                       <ImageIcon sx={{ color: "#667eea" }} />
                                    </InputAdornment>
                                 )
                              }}
                              sx={{
                                 "& .MuiOutlinedInput-root": {
                                    borderRadius: "12px",
                                    "& input": {
                                       color: "#1a202c"
                                    }
                                 },
                                 "& .MuiInputLabel-root": {
                                    color: "#718096"
                                 }
                              }}
                           />
                        </Grid>
                        <Grid item xs={12} md={6}>
                           <TextField
                              label="Date de déblocage"
                              type="date"
                              fullWidth
                              value={form.dateDeblocage ? form.dateDeblocage.split('T')[0] : ""}
                              onChange={handleChange("dateDeblocage")}
                              InputLabelProps={{
                                 shrink: true
                              }}
                              InputProps={{
                                 startAdornment: (
                                    <InputAdornment position="start">
                                       <CalendarTodayIcon sx={{ color: "#667eea" }} />
                                    </InputAdornment>
                                 )
                              }}
                              sx={{
                                 "& .MuiOutlinedInput-root": {
                                    borderRadius: "12px",
                                    "& input": {
                                       color: "#1a202c"
                                    }
                                 },
                                 "& .MuiInputLabel-root": {
                                    color: "#718096"
                                 }
                              }}
                           />
                        </Grid>
                     </Grid>
                  </CardContent>
               </Card>
            </Grid>
         </Grid>
      </>
   );
}
