import { Box, Grid, Card, CardContent, Typography, Divider } from "@mui/material";
import React, { useState, useEffect } from "react";
import SaveComponent from "../../../../composants/SaveComponent";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import DescriptionIcon from "@mui/icons-material/Description";
import ImageIcon from "@mui/icons-material/Image";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { FormTextInput } from "../../../../composants/UiInputs";

export default function FormModule({ initialForm, setErrorServeur, setError, setSave, save, requestMethode }) {
   const requestURL = "/admin/module/";
   const [form, setForm] = useState(initialForm ? initialForm : {});

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
            <Grid item xs={12}>
               <Card sx={{ borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
                  <CardContent sx={{ p: 3 }}>
                     <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                        <MenuBookIcon sx={{ fontSize: 24, color: "#16a34a", mr: 1.5 }} />
                        <Typography variant="h6" sx={{ fontWeight: 600, color: "#1a202c" }}>
                           Titres du Module
                        </Typography>
                     </Box>
                     <Divider sx={{ mb: 2 }} />
                     <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                           <FormTextInput
                              label="Titre du module en français"
                              placeholder="Ex: Module de base"
                              fullWidth
                              value={form.titre || ""}
                              onChange={handleChange("titre")}
                           />
                        </Grid>
                        <Grid item xs={12} md={6}>
                           <FormTextInput
                              label="Titre du module en anglais"
                              placeholder="Ex: Basic Module"
                              fullWidth
                              value={form.titreEn || ""}
                              onChange={handleChange("titreEn")}
                           />
                        </Grid>
                     </Grid>
                  </CardContent>
               </Card>
            </Grid>

            <Grid item xs={12}>
               <Card sx={{ borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
                  <CardContent sx={{ p: 3 }}>
                     <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                        <DescriptionIcon sx={{ fontSize: 24, color: "#16a34a", mr: 1.5 }} />
                        <Typography variant="h6" sx={{ fontWeight: 600, color: "#1a202c" }}>
                           Descriptions du Module
                        </Typography>
                     </Box>
                     <Divider sx={{ mb: 2 }} />
                     <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                           <FormTextInput
                              label="Description (version française)"
                              placeholder="Ce module est dédié à..."
                              multiline
                              rows={4}
                              fullWidth
                              value={form.description || ""}
                              onChange={handleChange("description")}
                           />
                        </Grid>
                        <Grid item xs={12} md={6}>
                           <FormTextInput
                              label="Description (version anglaise)"
                              placeholder="This module is dedicated to..."
                              multiline
                              rows={4}
                              fullWidth
                              value={form.descriptionEn || ""}
                              onChange={handleChange("descriptionEn")}
                           />
                        </Grid>
                     </Grid>
                  </CardContent>
               </Card>
            </Grid>

            <Grid item xs={12}>
               <Card sx={{ borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
                  <CardContent sx={{ p: 3 }}>
                     <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                        <ImageIcon sx={{ fontSize: 24, color: "#16a34a", mr: 1.5 }} />
                        <Typography variant="h6" sx={{ fontWeight: 600, color: "#1a202c" }}>
                           Informations Supplémentaires
                        </Typography>
                     </Box>
                     <Divider sx={{ mb: 2 }} />
                     <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                           <FormTextInput
                              label="Nom de l'image illustrative"
                              placeholder="Ex: module-image.jpg"
                              fullWidth
                              value={form.nomImage || ""}
                              onChange={handleChange("nomImage")}
                              startAdornment={<ImageIcon sx={{ fontSize: 22, color: "#16a34a" }} />}
                           />
                        </Grid>
                        <Grid item xs={12} md={6}>
                           <FormTextInput
                              label="Date de déblocage"
                              type="date"
                              fullWidth
                              value={form.dateDeblocage ? form.dateDeblocage.split('T')[0] : ""}
                              onChange={handleChange("dateDeblocage")}
                              startAdornment={<CalendarTodayIcon sx={{ fontSize: 22, color: "#16a34a" }} />}
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
