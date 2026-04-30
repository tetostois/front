import React, { useContext, useState } from "react";
import Header from "../../composants/Header";
import HeaderContent from "../../composants/HeaderContent";
import Footer from "../../composants/Footer";
import { Link } from "react-router-dom";
import {
   Box,
   Breadcrumbs,
   Card,
   CardContent,
   Typography,
   Divider,
   Button,
   Dialog,
   DialogTitle,
   DialogContent,
   DialogActions,
   Alert,
   IconButton,
   Chip,
   Grid,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import PersonIcon from "@mui/icons-material/Person";
import { FormTextInput } from "../../composants/UiInputs";
import {
   Email,
   Phone,
   Business,
   Badge,
   Lock,
   Save,
   Person,
} from "@mui/icons-material";
import { AppContext } from "../../context";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import "./accountCSS.css";

function AccountTocAside({ isFrench }) {
   const items = [
      { id: "account-section-profile", label: isFrench ? "Informations personnelles" : "Personal information" },
      { id: "account-section-security", label: isFrench ? "Sécurité" : "Security" },
   ];
   return (
      <Box
         component="nav"
         className="accountTocAside"
         aria-label={isFrench ? "Sur cette page" : "On this page"}
      >
         <Typography variant="subtitle2" component="p" className="accountTocTitle">
            {isFrench ? "Sur cette page" : "On this page"}
         </Typography>
         <ul className="accountTocList">
            {items.map((it) => (
               <li key={it.id}>
                  <a
                     href={`#${it.id}`}
                     className="accountTocLink"
                     onClick={(e) => {
                        e.preventDefault();
                        document.getElementById(it.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                     }}
                  >
                     {it.label}
                  </a>
               </li>
            ))}
         </ul>
      </Box>
   );
}

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
            <Box component="main" className="accountPageOuter">
               <div className="accountPageShell accountPageShell--empty">
                  <Box className="accountEmptyState">
                     <Alert severity="warning">
                        {isFrench
                           ? "Vous devez être connecté pour accéder à cette page"
                           : "You must be logged in to access this page"}
                     </Alert>
                  </Box>
               </div>
            </Box>
            <Footer />
         </>
      );
   }

   return (
      <>
         <Header />
         <HeaderContent />
         <Box className="breadcrumbContainer">
            <Breadcrumbs
               separator={<NavigateNextIcon fontSize="small" />}
               aria-label="breadcrumb"
               sx={{
                  "& .MuiBreadcrumbs-separator": { margin: "0 8px" },
               }}
            >
               <Link to="/dashboard" className="breadcrumbLink">
                  <HomeIcon sx={{ fontSize: 18, marginRight: 0.5, verticalAlign: "middle" }} />
                  {isFrench ? "Tableau de bord" : "Dashboard"}
               </Link>
               <Typography className="breadcrumbCurrent" color="text.primary">
                  <PersonIcon sx={{ fontSize: 18, marginRight: 0.5, verticalAlign: "middle" }} />
                  {isFrench ? "Mon compte" : "My account"}
               </Typography>
            </Breadcrumbs>
         </Box>
         <Box component="main" className="accountPageOuter">
            <div className="accountPageShell">
               <Box className="accountHeroBanner">
                  <Box className="accountHeroInner">
                     <Chip
                        className="accountHeroChip"
                        label={user.profession || (isFrench ? "Profil" : "Profile")}
                        size="small"
                        sx={{
                           background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                           color: "#fff",
                           fontWeight: 600,
                        }}
                     />
                     <Typography component="h1" variant="h4" className="accountHeroTitle">
                        {user.prenom} {user.nom}
                     </Typography>
                     <Typography variant="body1" className="accountHeroSubtitle">
                        {isFrench
                           ? "Mon compte — informations personnelles et sécurité"
                           : "My account — profile and security"}
                     </Typography>
                  </Box>
               </Box>

               <div className="accountBodyGrid">
                  <div className="accountMainColumn">
                     <Card
                        id="account-section-profile"
                        className="accountInfoCard accountSectionAnchor"
                        elevation={0}
                     >
                     <CardContent>
                        <Box className="cardHeader">
                           <Typography variant="h5" component="h2" className="cardTitle">
                              {isFrench ? "Informations personnelles" : "Personal information"}
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
                  </div>

                  <aside className="accountAsideColumn">
                     <AccountTocAside isFrench={isFrench} />
                     <Card
                        id="account-section-security"
                        className="accountActionsCard accountSectionAnchor"
                        elevation={0}
                     >
                        <CardContent>
                           <Typography variant="h6" component="h2" className="cardTitle">
                              {isFrench ? "Sécurité" : "Security"}
                           </Typography>
                           <Typography variant="body2" color="text.secondary" sx={{ mb: 2, mt: 0.5 }}>
                              {isFrench
                                 ? "Mettez à jour votre mot de passe pour protéger votre compte."
                                 : "Update your password to keep your account safe."}
                           </Typography>
                           <Divider sx={{ marginY: 2 }} />
                           <Button
                              fullWidth
                              variant="contained"
                              startIcon={<Lock />}
                              onClick={() => setOpenPasswordDialog(true)}
                              className="actionButton"
                              sx={{
                                 background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                                 borderRadius: "12px",
                                 padding: "12px 24px",
                                 textTransform: "none",
                                 fontWeight: 600,
                                 fontSize: "16px",
                                 "&:hover": {
                                    background: "linear-gradient(135deg, #15803d 0%, #166534 100%)",
                                    transform: "translateY(-2px)",
                                    boxShadow: "0 8px 16px rgba(22, 163, 74, 0.3)",
                                 },
                              }}
                           >
                              {isFrench ? "Changer le mot de passe" : "Change Password"}
                           </Button>
                        </CardContent>
                     </Card>
                  </aside>
               </div>
            </div>
         </Box>

         {/* Dialog pour changer le mot de passe */}
         <Dialog 
            open={openPasswordDialog} 
            onClose={() => {
               setOpenPasswordDialog(false);
               setPasswordForm({ code: "", newPassword: "", confirmPassword: "" });
               setPasswordError(null);
               setPasswordSuccess(false);
               setPasswordStep(1);
               setCodeSent(false);
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
                  <Lock sx={{ color: "#16a34a" }} />
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
                     <FormTextInput
                        fullWidth
                        label={isFrench ? "Code de réinitialisation" : "Reset Code"}
                        value={passwordForm.code}
                        onChange={(e) => setPasswordForm({ ...passwordForm, code: e.target.value })}
                     />
                     <FormTextInput
                        fullWidth
                        label={isFrench ? "Nouveau mot de passe" : "New Password"}
                        type={showPassword.new ? "text" : "password"}
                        value={passwordForm.newPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                        endAdornment={
                           <IconButton
                              onClick={() => setShowPassword({ ...showPassword, new: !showPassword.new })}
                              edge="end"
                              size="small"
                              aria-label="toggle password"
                           >
                              {showPassword.new ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                           </IconButton>
                        }
                     />
                     <FormTextInput
                        fullWidth
                        label={isFrench ? "Confirmer le mot de passe" : "Confirm Password"}
                        type={showPassword.confirm ? "text" : "password"}
                        value={passwordForm.confirmPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                        endAdornment={
                           <IconButton
                              onClick={() => setShowPassword({ ...showPassword, confirm: !showPassword.confirm })}
                              edge="end"
                              size="small"
                              aria-label="toggle confirm password"
                           >
                              {showPassword.confirm ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                           </IconButton>
                        }
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
                        background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
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
                        background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
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

