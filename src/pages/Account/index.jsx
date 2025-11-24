import React, { useContext, useState } from "react";
import Header from "../../composants/Header";
import Footer from "../../composants/Footer";
import { Container, Row, Col } from "react-bootstrap";
import { 
   Box, 
   Card, 
   CardContent, 
   Typography, 
   Divider, 
   Button, 
   TextField, 
   Dialog, 
   DialogTitle, 
   DialogContent, 
   DialogActions,
   Alert,
   IconButton,
   Chip,
   Grid
} from "@mui/material";
import { 
   AccountCircle, 
   Email, 
   Phone, 
   Business, 
   Badge, 
   Edit, 
   Lock, 
   Save, 
   Close,
   Person,
   CalendarToday,
   LocationOn
} from "@mui/icons-material";
import { AppContext } from "../../context";
import { useFetch } from "../../utils/hooks/FetchData";
import { MessageErrorServeur } from "../../composants/MessageComponent";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import "./accountCSS.css";

export default function Account() {
   const { user, language, serveurURL } = useContext(AppContext);
   const isFrench = language === "FR";
   const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
   const [passwordStep, setPasswordStep] = useState(1); // 1: demande code, 2: changement avec code
   const [passwordForm, setPasswordForm] = useState({
      code: "",
      newPassword: "",
      confirmPassword: ""
   });
   const [showPassword, setShowPassword] = useState({
      new: false,
      confirm: false
   });
   const [passwordError, setPasswordError] = useState(null);
   const [passwordSuccess, setPasswordSuccess] = useState(false);
   const [savingPassword, setSavingPassword] = useState(false);
   const [codeSent, setCodeSent] = useState(false);

   const formatDate = (dateString) => {
      if (!dateString) return "-";
      const date = new Date(dateString);
      return date.toLocaleDateString(isFrench ? "fr-FR" : "en-US", {
         year: "numeric",
         month: "long",
         day: "numeric"
      });
   };

   const handleRequestCode = async () => {
      setPasswordError(null);
      setSavingPassword(true);
      try {
         const response = await fetch(`${serveurURL}/etudiant/resetpassword/stepone`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               "Authorization": "Basic " + btoa("admin:passwordadmin237")
            },
            body: JSON.stringify({
               emailOrPhone: user.email || user.telephone
            })
         });

         if (response.ok) {
            setCodeSent(true);
            setPasswordStep(2);
         } else {
            const data = await response.json();
            setPasswordError(data.message || (isFrench ? "Erreur lors de l'envoi du code" : "Error sending code"));
         }
      } catch (error) {
         console.error("Error requesting code:", error);
         setPasswordError(isFrench ? "Erreur de connexion au serveur" : "Server connection error");
      } finally {
         setSavingPassword(false);
      }
   };

   const handlePasswordChange = async () => {
      setPasswordError(null);
      setPasswordSuccess(false);

      if (!passwordForm.code || !passwordForm.newPassword || !passwordForm.confirmPassword) {
         setPasswordError(isFrench ? "Veuillez remplir tous les champs" : "Please fill all fields");
         return;
      }

      if (passwordForm.newPassword !== passwordForm.confirmPassword) {
         setPasswordError(isFrench ? "Les mots de passe ne correspondent pas" : "Passwords do not match");
         return;
      }

      if (passwordForm.newPassword.length < 8) {
         setPasswordError(isFrench ? "Le mot de passe doit contenir au moins 8 caractères" : "Password must be at least 8 characters");
         return;
      }

      setSavingPassword(true);
      try {
         const response = await fetch(`${serveurURL}/etudiant/resetpassword/steptwo`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               "Authorization": "Basic " + btoa("admin:passwordadmin237")
            },
            body: JSON.stringify({
               emailOrPhone: user.email || user.telephone,
               codeChangePassword: passwordForm.code,
               password: passwordForm.newPassword,
               confirmPassword: passwordForm.confirmPassword
            })
         });

         const data = await response.json();
         if (response.ok) {
            setPasswordSuccess(true);
            setPasswordForm({ code: "", newPassword: "", confirmPassword: "" });
            setTimeout(() => {
               setOpenPasswordDialog(false);
               setPasswordSuccess(false);
               setPasswordStep(1);
               setCodeSent(false);
            }, 2000);
         } else {
            setPasswordError(data.message || (isFrench ? "Code invalide ou erreur lors de la modification" : "Invalid code or error updating password"));
         }
      } catch (error) {
         console.error("Error updating password:", error);
         setPasswordError(isFrench ? "Erreur de connexion au serveur" : "Server connection error");
      } finally {
         setSavingPassword(false);
      }
   };

   if (!user) {
      return (
         <>
            <Header />
            <Container fluid className="accountContainer">
               <Box className="accountEmptyState">
                  <Alert severity="warning">
                     {isFrench 
                        ? "Vous devez être connecté pour accéder à cette page" 
                        : "You must be logged in to access this page"}
                  </Alert>
               </Box>
            </Container>
            <Footer />
         </>
      );
   }

   return (
      <>
         <Header />
         <Container fluid className="accountContainer">
            <Row className="accountHeaderRow">
               <Col xs={12}>
                  <Box className="accountHeader">
                     <AccountCircle sx={{ fontSize: 64, color: "#667eea" }} />
                     <Typography variant="h4" className="accountTitle">
                        {isFrench ? "Mon Compte" : "My Account"}
                     </Typography>
                     <Typography variant="body1" className="accountSubtitle">
                        {isFrench 
                           ? "Gérez vos informations personnelles et vos paramètres" 
                           : "Manage your personal information and settings"}
                     </Typography>
                  </Box>
               </Col>
            </Row>

            <Row className="accountContentRow">
               <Col xs={12} md={8}>
                  <Card className="accountInfoCard">
                     <CardContent>
                        <Box className="cardHeader">
                           <Typography variant="h5" className="cardTitle">
                              {isFrench ? "Informations Personnelles" : "Personal Information"}
                           </Typography>
                           <Chip 
                              label={user.profession || (isFrench ? "Non spécifié" : "Not specified")} 
                              color="primary" 
                              size="small"
                           />
                        </Box>
                        <Divider sx={{ marginY: 2 }} />

                        <Grid container spacing={3}>
                           <Grid item xs={12} sm={6}>
                              <Box className="infoItem">
                                 <Person className="infoIcon" />
                                 <Box className="infoContent">
                                    <Typography variant="caption" className="infoLabel">
                                       {isFrench ? "Nom complet" : "Full Name"}
                                    </Typography>
                                    <Typography variant="body1" className="infoValue">
                                       {user.nom} {user.prenom}
                                    </Typography>
                                 </Box>
                              </Box>
                           </Grid>

                           <Grid item xs={12} sm={6}>
                              <Box className="infoItem">
                                 <Badge className="infoIcon" />
                                 <Box className="infoContent">
                                    <Typography variant="caption" className="infoLabel">
                                       {isFrench ? "Matricule" : "Student ID"}
                                    </Typography>
                                    <Typography variant="body1" className="infoValue">
                                       {user.matricule || "-"}
                                    </Typography>
                                 </Box>
                              </Box>
                           </Grid>

                           <Grid item xs={12} sm={6}>
                              <Box className="infoItem">
                                 <Email className="infoIcon" />
                                 <Box className="infoContent">
                                    <Typography variant="caption" className="infoLabel">
                                       {isFrench ? "Email" : "Email"}
                                    </Typography>
                                    <Typography variant="body1" className="infoValue">
                                       {user.email || "-"}
                                    </Typography>
                                 </Box>
                              </Box>
                           </Grid>

                           <Grid item xs={12} sm={6}>
                              <Box className="infoItem">
                                 <Phone className="infoIcon" />
                                 <Box className="infoContent">
                                    <Typography variant="caption" className="infoLabel">
                                       {isFrench ? "Téléphone" : "Phone"}
                                    </Typography>
                                    <Typography variant="body1" className="infoValue">
                                       {user.telephone || "-"}
                                    </Typography>
                                 </Box>
                              </Box>
                           </Grid>

                           {user.nomEntreprise && (
                              <Grid item xs={12} sm={6}>
                                 <Box className="infoItem">
                                    <Business className="infoIcon" />
                                    <Box className="infoContent">
                                       <Typography variant="caption" className="infoLabel">
                                          {isFrench ? "Entreprise" : "Company"}
                                       </Typography>
                                       <Typography variant="body1" className="infoValue">
                                          {user.nomEntreprise}
                                       </Typography>
                                    </Box>
                                 </Box>
                              </Grid>
                           )}
                        </Grid>
                     </CardContent>
                  </Card>
               </Col>

               <Col xs={12} md={4}>
                  <Card className="accountActionsCard">
                     <CardContent>
                        <Typography variant="h6" className="cardTitle">
                           {isFrench ? "Actions" : "Actions"}
                        </Typography>
                        <Divider sx={{ marginY: 2 }} />
                        <Button
                           fullWidth
                           variant="contained"
                           startIcon={<Lock />}
                           onClick={() => setOpenPasswordDialog(true)}
                           className="actionButton"
                           sx={{
                              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                              borderRadius: "12px",
                              padding: "12px 24px",
                              textTransform: "none",
                              fontWeight: 600,
                              fontSize: "16px",
                              marginBottom: 2,
                              "&:hover": {
                                 background: "linear-gradient(135deg, #5568d3 0%, #6a3d8f 100%)",
                                 transform: "translateY(-2px)",
                                 boxShadow: "0 8px 16px rgba(102, 126, 234, 0.3)"
                              }
                           }}
                        >
                           {isFrench ? "Changer le mot de passe" : "Change Password"}
                        </Button>
                     </CardContent>
                  </Card>
               </Col>
            </Row>
         </Container>

         {/* Dialog pour changer le mot de passe */}
         <Dialog 
            open={openPasswordDialog} 
            onClose={() => {
               setOpenPasswordDialog(false);
               setPasswordForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
               setPasswordError(null);
               setPasswordSuccess(false);
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
                  <Lock sx={{ color: "#667eea" }} />
                  <Typography variant="h6" sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}>
                     {isFrench ? "Changer le mot de passe" : "Change Password"}
                  </Typography>
               </Box>
            </DialogTitle>
            <DialogContent>
               {passwordSuccess && (
                  <Alert severity="success" sx={{ marginBottom: 2 }}>
                     {isFrench ? "Mot de passe modifié avec succès !" : "Password changed successfully!"}
                  </Alert>
               )}
               {passwordError && (
                  <Alert severity="error" sx={{ marginBottom: 2 }}>
                     {passwordError}
                  </Alert>
               )}
               {passwordStep === 1 ? (
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 2, marginTop: 1 }}>
                     <Alert severity="info">
                        {isFrench 
                           ? "Un code de réinitialisation sera envoyé à votre adresse email. Utilisez ce code pour changer votre mot de passe." 
                           : "A reset code will be sent to your email address. Use this code to change your password."}
                     </Alert>
                  </Box>
               ) : (
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 2, marginTop: 1 }}>
                     {codeSent && (
                        <Alert severity="success" sx={{ marginBottom: 1 }}>
                           {isFrench 
                              ? "Code envoyé ! Vérifiez votre email." 
                              : "Code sent! Check your email."}
                        </Alert>
                     )}
                     <TextField
                        fullWidth
                        label={isFrench ? "Code de réinitialisation" : "Reset Code"}
                        value={passwordForm.code}
                        onChange={(e) => setPasswordForm({ ...passwordForm, code: e.target.value })}
                        sx={{
                           "& .MuiOutlinedInput-root": {
                              borderRadius: "12px"
                           }
                        }}
                     />
                     <TextField
                        fullWidth
                        label={isFrench ? "Nouveau mot de passe" : "New Password"}
                        type={showPassword.new ? "text" : "password"}
                        value={passwordForm.newPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                        InputProps={{
                           endAdornment: (
                              <IconButton
                                 onClick={() => setShowPassword({ ...showPassword, new: !showPassword.new })}
                                 edge="end"
                              >
                                 {showPassword.new ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                              </IconButton>
                           )
                        }}
                        sx={{
                           "& .MuiOutlinedInput-root": {
                              borderRadius: "12px"
                           }
                        }}
                     />
                     <TextField
                        fullWidth
                        label={isFrench ? "Confirmer le mot de passe" : "Confirm Password"}
                        type={showPassword.confirm ? "text" : "password"}
                        value={passwordForm.confirmPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                        InputProps={{
                           endAdornment: (
                              <IconButton
                                 onClick={() => setShowPassword({ ...showPassword, confirm: !showPassword.confirm })}
                                 edge="end"
                              >
                                 {showPassword.confirm ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                              </IconButton>
                           )
                        }}
                        sx={{
                           "& .MuiOutlinedInput-root": {
                              borderRadius: "12px"
                           }
                        }}
                     />
                  </Box>
               )}
            </DialogContent>
            <DialogActions sx={{ padding: 2 }}>
               <Button
                  onClick={() => {
                     setOpenPasswordDialog(false);
                     setPasswordForm({ code: "", newPassword: "", confirmPassword: "" });
                     setPasswordError(null);
                     setPasswordSuccess(false);
                     setPasswordStep(1);
                     setCodeSent(false);
                  }}
                  sx={{
                     borderRadius: "12px",
                     textTransform: "none",
                     fontWeight: 600
                  }}
               >
                  {isFrench ? "Annuler" : "Cancel"}
               </Button>
               {passwordStep === 1 ? (
                  <Button
                     onClick={handleRequestCode}
                     variant="contained"
                     disabled={savingPassword}
                     sx={{
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        borderRadius: "12px",
                        textTransform: "none",
                        fontWeight: 600,
                        "&:hover": {
                           background: "linear-gradient(135deg, #5568d3 0%, #6a3d8f 100%)"
                        }
                     }}
                  >
                     {savingPassword 
                        ? (isFrench ? "Envoi..." : "Sending...") 
                        : (isFrench ? "Demander le code" : "Request Code")}
                  </Button>
               ) : (
                  <Button
                     onClick={handlePasswordChange}
                     variant="contained"
                     startIcon={<Save />}
                     disabled={savingPassword}
                     sx={{
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        borderRadius: "12px",
                        textTransform: "none",
                        fontWeight: 600,
                        "&:hover": {
                           background: "linear-gradient(135deg, #5568d3 0%, #6a3d8f 100%)"
                        }
                     }}
                  >
                     {savingPassword 
                        ? (isFrench ? "Enregistrement..." : "Saving...") 
                        : (isFrench ? "Enregistrer" : "Save")}
                  </Button>
               )}
            </DialogActions>
         </Dialog>

         <Footer />
      </>
   );
}

