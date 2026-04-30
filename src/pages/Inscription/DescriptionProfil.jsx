import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography, Box } from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import "./DescriptionProfil.css";

export default function DescriptionProfil({ nom, description, gammeEtudiant, setProfileStudent }) {
   const [open, setOpen] = useState(false);
   const handleClickOpen = () => {
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
   };

   const handleInscription = () => {
      setProfileStudent(gammeEtudiant);
      setOpen(false);
   };

   return (
      <>
         <div
            className="buttonDescriptionProfil"
            onClick={handleClickOpen}
         >
            <InfoOutlinedIcon sx={{ fontSize: 18, mr: 0.5 }} />
            Description
         </div>
         <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
               sx: {
                  borderRadius: "20px",
                  boxShadow: "0 10px 40px rgba(0, 0, 0, 0.15)",
                  overflow: "hidden"
               }
            }}
         >
            <Box
               sx={{
                  background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                  padding: "25px 30px",
                  color: "white",
                  position: "relative"
               }}
            >
               <IconButton
                  onClick={handleClose}
                  sx={{
                     position: "absolute",
                     right: 10,
                     top: 10,
                     color: "white",
                     "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.2)"
                     }
                  }}
               >
                  <CloseIcon />
               </IconButton>
               <DialogTitle 
                  sx={{ 
                     color: "white", 
                     padding: 0,
                     marginBottom: 1
                  }}
               >
                  <Typography variant="h4" component="div" sx={{ fontWeight: 700, mb: 1 }}>
                     {nom}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9, fontSize: "14px" }}>
                     Détails du profil de formation
                  </Typography>
               </DialogTitle>
            </Box>
            
            <DialogContent sx={{ padding: "30px !important", backgroundColor: "#f8f9fa" }}>
               <Box
                  sx={{
                     backgroundColor: "white",
                     borderRadius: "12px",
                     padding: "25px",
                     border: "1px solid #e5e7eb",
                     boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)"
                  }}
               >
                  <Typography 
                     variant="body1" 
                     sx={{
                        fontSize: "16px",
                        lineHeight: 1.8,
                        color: "#374151",
                        whiteSpace: "pre-wrap"
                     }}
                  >
                     {description}
                  </Typography>
               </Box>
            </DialogContent>
            
            <DialogActions 
               sx={{ 
                  padding: "20px 30px",
                  backgroundColor: "#f8f9fa",
                  gap: 2,
                  justifyContent: "flex-end"
               }}
            >
               <Button 
                  onClick={handleClose}
                  variant="outlined"
                  sx={{
                     minWidth: "120px",
                     height: "45px",
                     borderRadius: "12px",
                     fontSize: "15px",
                     fontWeight: 600,
                     borderColor: "#d1d5db",
                     color: "#6b7280",
                     textTransform: "none",
                     transition: "all 0.3s ease",
                     "&:hover": {
                        borderColor: "#9ca3af",
                        backgroundColor: "#f3f4f6"
                     }
                  }}
               >
                  Annuler
               </Button>
               <Button
                  onClick={handleInscription}
                  variant="contained"
                  sx={{
                     minWidth: "200px",
                     height: "45px",
                     borderRadius: "12px",
                     fontSize: "16px",
                     fontWeight: 600,
                     background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                     boxShadow: "0 4px 15px rgba(22, 163, 74, 0.4)",
                     textTransform: "none",
                     transition: "all 0.3s ease",
                     "&:hover": {
                        background: "linear-gradient(135deg, #16a34a 0%, #15803d 100%)",
                        boxShadow: "0 6px 20px rgba(22, 163, 74, 0.5)",
                        transform: "translateY(-2px)"
                     }
                  }}
               >
                  S'inscrire avec ce profil
               </Button>
            </DialogActions>
         </Dialog>
      </>
   );
}
