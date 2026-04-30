import { 
   Box, 
   Typography, 
   Avatar, 
   IconButton, 
   Tooltip,
   Dialog,
   DialogTitle,
   DialogContent,
   DialogActions,
   CircularProgress,
   Alert,
   Button
} from "@mui/material";
import React, { useContext, useState, useRef } from "react";
import "./headerContentCSS.css";
import { AppContext } from "../../context";
import { useNavigate, useLocation } from "react-router-dom";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import Cookies from "js-cookie";

function HeaderContent() {
   const { language, user, serveurURL, setUser } = useContext(AppContext);
   const [selectedNav, setSelectedNav] = useState(1);
   const [openUploadDialog, setOpenUploadDialog] = useState(false);
   const [selectedFile, setSelectedFile] = useState(null);
   const [preview, setPreview] = useState(null);
   const [uploading, setUploading] = useState(false);
   const [uploadError, setUploadError] = useState(null);
   const [uploadSuccess, setUploadSuccess] = useState(false);
   const fileInputRef = useRef(null);
   const navigation = useNavigate();
   const location = useLocation();
   const isFrench = language === "FR";

   // Déterminer l'onglet actif basé sur l'URL
   React.useEffect(() => {
      if (location.pathname === "/dashboard") {
         setSelectedNav(1);
      } else if (location.pathname === "/account") {
         setSelectedNav(2);
      }
   }, [location.pathname]);

   const handleFileSelect = (event) => {
      const file = event.target.files[0];
      if (file) {
         // Vérifier la taille (max 3MB)
         if (file.size > 3 * 1024 * 1024) {
            setUploadError(isFrench ? "L'image est trop lourde. Taille maximale : 3 MB" : "Image is too large. Maximum size: 3 MB");
            return;
         }
         // Vérifier le type
         if (!file.type.startsWith('image/')) {
            setUploadError(isFrench ? "Veuillez sélectionner une image" : "Please select an image");
            return;
         }
         setSelectedFile(file);
         setUploadError(null);
         // Créer une preview
         const reader = new FileReader();
         reader.onloadend = () => {
            setPreview(reader.result);
         };
         reader.readAsDataURL(file);
      }
   };

   const handleUpload = async () => {
      if (!selectedFile) return;

      setUploading(true);
      setUploadError(null);
      setUploadSuccess(false);

      try {
         const formData = new FormData();
         formData.append('image', selectedFile);
         formData.append('idEtudiant', user.id);

         const response = await fetch(`${serveurURL}/etudiant/uploadphoto/${user.id}`, {
            method: 'POST',
            headers: {
               'Authorization': 'Basic ' + btoa('admin:passwordadmin237')
            },
            body: formData
         });

         if (response.ok) {
            const data = await response.json();
            console.log("Réponse upload photo:", data);
            setUploadSuccess(true);
            
            // Fusionner les données retournées avec l'utilisateur actuel
            // pour préserver toutes les propriétés existantes
            const updatedUser = {
               ...user,  // Préserver toutes les propriétés existantes
               ...data   // Remplacer/ajouter les propriétés du backend (notamment photoUrl)
            };
            
            // Mettre à jour le cookie AVANT de mettre à jour le contexte
            // pour éviter que checkUserOnCookies ne réinitialise l'utilisateur
            // Utiliser une clé de version pour forcer la mise à jour
            const cookieValue = JSON.stringify(updatedUser);
            Cookies.set("user", cookieValue, { expires: 7 }); // Expire dans 7 jours
            console.log("Cookie mis à jour:", cookieValue.substring(0, 100) + "...");
            
            // Mettre à jour le contexte
            setUser(updatedUser);
            console.log("Utilisateur mis à jour avec photoUrl:", updatedUser.photoUrl ? "OUI" : "NON");
            console.log("Vérification cookie après mise à jour:", Cookies.get("user") ? "EXISTE" : "N'EXISTE PAS");
            setTimeout(() => {
               setOpenUploadDialog(false);
               setSelectedFile(null);
               setPreview(null);
               setUploadSuccess(false);
            }, 2000);
         } else {
            const errorData = await response.json();
            setUploadError(errorData.message || (isFrench ? "Erreur lors de l'upload" : "Upload error"));
         }
      } catch (error) {
         console.error("Upload error:", error);
         setUploadError(isFrench ? "Erreur de connexion au serveur" : "Server connection error");
      } finally {
         setUploading(false);
      }
   };

   const handleAvatarClick = () => {
      fileInputRef.current?.click();
   };

   const getInitials = () => {
      if (!user) return "U";
      const nom = user.nom || "";
      const prenom = user.prenom || "";
      return (nom.charAt(0) + prenom.charAt(0)).toUpperCase() || "U";
   };

   return (
      <>
         <div className="mainHaderContent" style={{ backgroundImage: "url(/images/footerImage.png)" }}>
            <div className="subDivHeaderContent">
               <div className="userProfilButtonAction">
                  <div className="userProfil">
                     <Box className="avatarContainer">
                        <Avatar
                           src={user?.photoUrl || preview}
                           alt={user ? `${user.nom} ${user.prenom}` : "User"}
                           className="profileAvatar"
                           sx={{
                              width: 80,
                              height: 80,
                              fontSize: "32px",
                              fontWeight: 600,
                              fontFamily: "'Poppins', sans-serif",
                              background: user?.photoUrl || preview 
                                 ? "transparent" 
                                 : "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                              cursor: "pointer",
                              border: "4px solid white",
                              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                              transition: "all 0.3s ease",
                              "&:hover": {
                                 transform: "scale(1.05)",
                                 boxShadow: "0 6px 20px rgba(0, 0, 0, 0.2)"
                              }
                           }}
                        >
                           {!user?.photoUrl && !preview ? getInitials() : null}
                        </Avatar>
                        <Tooltip title={isFrench ? "Changer la photo" : "Change photo"}>
                           <IconButton
                              className="cameraButton"
                              onClick={() => setOpenUploadDialog(true)}
                              sx={{
                                 position: "absolute",
                                 bottom: 0,
                                 right: 0,
                                 backgroundColor: "#16a34a",
                                 color: "white",
                                 width: 32,
                                 height: 32,
                                 border: "3px solid white",
                                 boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                                 "&:hover": {
                                    backgroundColor: "#5568d3",
                                    transform: "scale(1.1)"
                                 },
                                 transition: "all 0.3s ease"
                              }}
                           >
                              <CameraAltIcon sx={{ fontSize: 18 }} />
                           </IconButton>
                        </Tooltip>
                     </Box>
                     <div className="infoUser">
                        <Typography className="nomCompletHedercontent">
                           {user ? `${user.nom} ${user.prenom}` : "Utilisateur"}
                        </Typography>
                        <Typography className="metierHedercontent">
                           {user?.profession || (isFrench ? "Non spécifié" : "Not specified")}
                        </Typography>
                     </div>
                  </div>
               </div>
               <div className="navigationHeaderContent">
                  <div
                     onClick={() => {
                        setSelectedNav(1);
                        navigation("/dashboard");
                     }}
                     className={`itemNavigationHeaderContent ${selectedNav === 1 ? " selectedNav" : ""}`}
                  >
                     <DashboardIcon sx={{ fontSize: 18, marginRight: 1 }} />
                     <span>{isFrench ? "TABLEAU DE BORD" : "DASHBOARD"}</span>
                  </div>
                  <div
                     onClick={() => {
                        setSelectedNav(2);
                        navigation("/account");
                     }}
                     className={`itemNavigationHeaderContent ${selectedNav === 2 ? " selectedNav" : ""}`}
                  >
                     <SettingsIcon sx={{ fontSize: 18, marginRight: 1 }} />
                     <span>{isFrench ? "PARAMÈTRES" : "SETTINGS"}</span>
                  </div>
               </div>
            </div>
         </div>

         {/* Dialog pour upload de photo */}
         <Dialog
            open={openUploadDialog}
            onClose={() => {
               if (!uploading) {
                  setOpenUploadDialog(false);
                  setSelectedFile(null);
                  setPreview(null);
                  setUploadError(null);
                  setUploadSuccess(false);
               }
            }}
            maxWidth="sm"
            fullWidth
            PaperProps={{
               sx: {
                  borderRadius: "16px",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)"
               }
            }}
         >
            <DialogTitle>
               <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <CameraAltIcon sx={{ color: "#16a34a" }} />
                  <Typography variant="h6" sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}>
                     {isFrench ? "Changer la photo de profil" : "Change profile photo"}
                  </Typography>
               </Box>
            </DialogTitle>
            <DialogContent>
               {uploadSuccess && (
                  <Alert severity="success" sx={{ marginBottom: 2 }}>
                     {isFrench ? "Photo mise à jour avec succès !" : "Photo updated successfully!"}
                  </Alert>
               )}
               {uploadError && (
                  <Alert severity="error" sx={{ marginBottom: 2 }}>
                     {uploadError}
                  </Alert>
               )}
               <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, marginTop: 2 }}>
                  <input
                     ref={fileInputRef}
                     type="file"
                     accept="image/*"
                     onChange={handleFileSelect}
                     style={{ display: "none" }}
                  />
                  <Avatar
                     src={preview || user?.photoUrl}
                     alt="Preview"
                     sx={{
                        width: 150,
                        height: 150,
                        fontSize: "60px",
                        fontWeight: 600,
                        fontFamily: "'Poppins', sans-serif",
                        background: preview || user?.photoUrl 
                           ? "transparent" 
                           : "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                        border: "4px solid #e5e7eb",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
                     }}
                  >
                     {!preview && !user?.photoUrl ? getInitials() : null}
                  </Avatar>
                  <Button
                     variant="outlined"
                     component="label"
                     startIcon={<CameraAltIcon />}
                     sx={{
                        borderRadius: "12px",
                        textTransform: "none",
                        fontWeight: 600,
                        borderColor: "#16a34a",
                        color: "#16a34a",
                        "&:hover": {
                           borderColor: "#5568d3",
                           backgroundColor: "rgba(22, 163, 74, 0.1)"
                        }
                     }}
                  >
                     {isFrench ? "Sélectionner une image" : "Select image"}
                     <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        hidden
                     />
                  </Button>
                  {selectedFile && (
                     <Typography variant="body2" color="text.secondary">
                        {selectedFile.name} ({(selectedFile.size / 1024).toFixed(2)} KB)
                     </Typography>
                  )}
               </Box>
            </DialogContent>
            <DialogActions sx={{ padding: 2 }}>
               <Button
                  onClick={() => {
                     setOpenUploadDialog(false);
                     setSelectedFile(null);
                     setPreview(null);
                     setUploadError(null);
                     setUploadSuccess(false);
                  }}
                  disabled={uploading}
                  sx={{
                     borderRadius: "12px",
                     textTransform: "none",
                     fontWeight: 600
                  }}
               >
                  {isFrench ? "Annuler" : "Cancel"}
               </Button>
               <Button
                  onClick={handleUpload}
                  variant="contained"
                  disabled={!selectedFile || uploading}
                  startIcon={uploading ? <CircularProgress size={20} /> : <CameraAltIcon />}
                  sx={{
                     background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                     borderRadius: "12px",
                     textTransform: "none",
                     fontWeight: 600,
                     "&:hover": {
                        background: "linear-gradient(135deg, #5568d3 0%, #6a3d8f 100%)"
                     }
                  }}
               >
                  {uploading 
                     ? (isFrench ? "Envoi..." : "Uploading...") 
                     : (isFrench ? "Enregistrer" : "Save")}
               </Button>
            </DialogActions>
         </Dialog>
      </>
   );
}

export default HeaderContent;
