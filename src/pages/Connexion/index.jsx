import React, { useContext, useEffect, useRef, useState } from "react";
import "./connexionCSS.css";
import SaveComponent from "../../composants/SaveComponent";
import Footer from "../../composants/Footer";
import { Container, Row } from "react-bootstrap";
import Header from "../../composants/Header";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../context";
import Cookies from "js-cookie";
import { Button } from "@mui/material";
import { MessageErrorServeur } from "../../composants/MessageComponent";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import { userProfile } from "../../utils/data";

export default function Connexion() {
   const { isOnline, language, setUser } = useContext(AppContext);
   const [formConnexion, setFormConnexion] = useState({});
   const [save, setSave] = useState(false);
   const [activeStep, setActiveStep] = useState(0);
   const [errorServeur, setErrorServeur] = useState(false);
   const [error, setError] = useState({
      signUpError: null,
      step: -1,
   });
   let navigation = useNavigate();
   const actionSendformConnexion = () => {
      setError((prev) => ({ ...prev, textError: null, step: -1 }));
      setErrorServeur(false);
      setSave(true);
   };

   const mainTitreRef = useRef(null);

   useEffect(() => {
      mainTitreRef.current.scrollIntoView({ behavior: "smooth" });
   }, []);

   const apresEnregistrement = (data) => {
      // Cookies.set("user", JSON.stringify(data));
      // setUser(data);
      // // console.log("cookie save == ", JSON.parse(Cookies.get("user")));
      // navigation("/dashboard");
      console.log("data user get after reset == ", data);
      if (data.openDashboard) {
         Cookies.set("user", JSON.stringify(data));
         setUser(data);
         // console.log("cookie save == ", JSON.parse(Cookies.get("user")));
         navigation("/dashboard"); //dashboard
      } else {
         navigation("/controlevalidationcompte/" + data.matricule); //dashboard
      }
   };

   const handleKeyPress = (event) => {
      if (event.key === "Enter") {
         //setSave(true);
         //setErrorServeur(false);
         actionSendformConnexion();
      }
   };
   return (
      <>
         <Container
            fluid
            style={{
               padding: 0,
               backgroundColor: "white",
               backgroundImage:
                  "linear-gradient(270deg, rgba(250, 250, 250, 0.471) 63.5%, rgba(250, 250, 250, 0) 100%),url(/images/toto6.jpg)",
               backgroundSize: "cover",
               backgroundPosition: "center",
            }}
         >
            <Header />
            <Row style={{ justifyContent: "center", minHeight: "80vh" }}>
               <div ref={mainTitreRef} className="mainDivConnexion">
                  <FormConnexion
                     error={error}
                     formConnexion={formConnexion}
                     setFormConnexion={setFormConnexion}
                     save={save}
                     setSave={setSave}
                     handleKeyPress={handleKeyPress}
                     requestMethode="POST"
                     setError={setError}
                     errorServeur={errorServeur}
                     activeStep={activeStep}
                     setActiveStep={setActiveStep}
                     actionSendformConnexion={actionSendformConnexion}
                  />
               </div>
            </Row>
            {save && (
               <SaveComponent
                  setSave={setSave}
                  requestURL={"/login/"}
                  requestBody={formConnexion}
                  requestMethode={"POST"}
                  requestParam={null}
                  setErrorServeur={setErrorServeur}
                  setError={setError}
                  //redirected={true}
                  setActiveStep={setActiveStep}
                  functionToExcecuteAfterGoodOperation={apresEnregistrement}
               />
            )}
            <Footer />
         </Container>
      </>
   );
}

const FormConnexion = ({
   formConnexion,
   setFormConnexion,
   error,
   setSave,
   save,
   handleKeyPress,
   errorServeur,
   actionSendformConnexion,
}) => {
   const navigation = useNavigate();
   const [showPassWord, setShowPassWord] = useState(false);
   const { language, setLanguage, setUser, user } = useContext(AppContext);
   let isFrench = language === "FR";

   return (
      <>
         <div
            className="divFormulaire"
            style={{ display: "flex", flexDirection: "column" }}
            onKeyUp={(event) => handleKeyPress(event)}
         >
            <div style={{ textAlign: "center", marginTop: 10, marginBottom: 35 }}>
               <span className="signInTitle">
                  Connectez-Vous
               </span>
               <p style={{ marginTop: 10, color: "#6b7280", fontSize: "15px", fontWeight: 400 }}>
                  Accédez à votre espace de formation
               </p>
            </div>

            <fieldset>
               <legend>
                  Informations de <span style={{ color: "#16a34a", fontWeight: "bold" }}>Connexion</span>
               </legend>
               {error.textError && (
                  <div style={{ 
                     marginBottom: 15, 
                     padding: "12px 16px", 
                     backgroundColor: "#fef2f2", 
                     border: "1px solid #fecaca",
                     borderRadius: "10px",
                     color: "#dc2626", 
                     fontWeight: 600, 
                     fontSize: 14 
                  }}>
                     {error.textError}
                  </div>
               )}

               <div name="login" className="divChamp">
                  <div className="subDivChamp">
                     <label name="label_for_email_or_phone" className="labelSignIn">
                        Téléphone ou Email <span style={{ color: "#ef4444" }}>*</span>
                     </label>
                     <div style={{ 
                        width: "100%", 
                        display: "flex", 
                        alignItems: "center", 
                        position: "relative",
                        backgroundColor: "#ffffff",
                        borderRadius: "12px",
                        border: "2px solid #e5e7eb",
                        transition: "all 0.3s ease"
                     }}>
                        <PermIdentityOutlinedIcon style={{ 
                           position: "absolute", 
                           left: 16, 
                           color: "#9ca3af",
                           fontSize: 22,
                           pointerEvents: "none"
                        }} />
                        <input
                           maxLength={50}
                           style={{ 
                              width: "100%", 
                              paddingLeft: "48px",
                              border: "none",
                              backgroundColor: "transparent"
                           }}
                           name="email_phone"
                           className="inputSignIn"
                           type="text"
                           required
                           placeholder="exemple@email.com ou +237 6XX XXX XXX"
                           value={formConnexion.login ?? ""}
                           onChange={(event) =>
                              setFormConnexion((prevForm) => ({ ...prevForm, login: event.target.value }))
                           }
                        />
                     </div>
                  </div>
               </div>

               <div name="password" className="divChamp">
                  <div className="subDivChamp">
                     <label className="labelSignIn">
                        Mot de passe <span style={{ color: "#ef4444" }}>*</span>
                     </label>
                     <div style={{ 
                        width: "100%", 
                        display: "flex", 
                        alignItems: "center", 
                        position: "relative",
                        backgroundColor: "#ffffff",
                        borderRadius: "12px",
                        border: "2px solid #e5e7eb",
                        transition: "all 0.3s ease"
                     }}>
                        <input
                           maxLength={50}
                           className="inputSignIn"
                           style={{ 
                              width: "100%", 
                              paddingRight: "48px",
                              border: "none",
                              backgroundColor: "transparent"
                           }}
                           name="password"
                           type={showPassWord ? "text" : "password"}
                           required
                           placeholder="••••••••"
                           value={formConnexion.password}
                           onChange={(event) =>
                              setFormConnexion((prevForm) => ({ ...prevForm, password: event.target.value }))
                           }
                        />
                        <div 
                           onClick={() => setShowPassWord(!showPassWord)}
                           style={{ 
                              position: "absolute", 
                              right: 12, 
                              cursor: "pointer",
                              padding: "4px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "#9ca3af",
                              transition: "color 0.2s ease"
                           }}
                           onMouseEnter={(e) => e.currentTarget.style.color = "#16a34a"}
                           onMouseLeave={(e) => e.currentTarget.style.color = "#9ca3af"}
                        >
                           {showPassWord ? (
                              <VisibilityOffOutlinedIcon style={{ fontSize: 22 }} />
                           ) : (
                              <VisibilityOutlinedIcon style={{ fontSize: 22 }} />
                           )}
                        </div>
                     </div>
                     <div style={{ marginTop: "8px" }}>
                        <span
                           style={{ 
                              color: "#16a34a", 
                              fontSize: "13px", 
                              fontWeight: 500,
                              cursor: "pointer",
                              transition: "color 0.2s ease"
                           }}
                           onClick={() => {
                              navigation("/resetpassword");
                           }}
                           onMouseEnter={(e) => e.currentTarget.style.color = "#15803d"}
                           onMouseLeave={(e) => e.currentTarget.style.color = "#16a34a"}
                        >
                           {isFrench ? "Mot de passe oublié ?" : "Forgot your password?"}
                        </span>
                     </div>
                  </div>
               </div>

               {errorServeur && <MessageErrorServeur />}
            </fieldset>

            <div className="divContainButton">
               <Button 
                  variant="contained" 
                  onClick={() => actionSendformConnexion()} 
                  disabled={save}
                  sx={{
                     minWidth: "200px",
                     height: "50px",
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
                     },
                     "&:disabled": {
                        background: "#d1d5db",
                        boxShadow: "none"
                     }
                  }}
               >
                  {save ? "Connexion en cours..." : "Se connecter"}
               </Button>
            </div>
            <div style={{ 
               marginTop: 25, 
               textAlign: "center",
               paddingTop: 20,
               borderTop: "1px solid #e5e7eb"
            }}>
               <span style={{ color: "#6b7280", fontSize: "14px" }}>
                  {isFrench ? "Vous n'avez pas de compte ? " : "Don't have an account? "}
                  <Link to={"/inscription"} style={{ textDecoration: "none" }}>
                     <span style={{ 
                        color: "#16a34a", 
                        fontWeight: 600,
                        transition: "color 0.2s ease"
                     }}
                     onMouseEnter={(e) => e.currentTarget.style.color = "#15803d"}
                     onMouseLeave={(e) => e.currentTarget.style.color = "#16a34a"}
                     >
                        {isFrench ? "Créez votre compte" : "Create your account"}
                     </span>
                  </Link>
               </span>
            </div>
         </div>
      </>
   );
};
