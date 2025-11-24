import React, { useContext, useState } from "react";
import "./connexionCSS.css";
import SaveComponent from "../../composants/SaveComponent";
import Footer from "../../composants/Footer";
import { Container, Row } from "react-bootstrap";
import Header from "../../composants/Header";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../context";
import Cookies from "js-cookie";
import { Button } from "@mui/material";
import { MessageErrorServeur } from "../../composants/MessageComponent";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import { userProfile } from "../../utils/data";

export const ResetPasswordStepOne = ({}) => {
   const { isOnline, language, setUser } = useContext(AppContext);
   const [formConnexion, setFormConnexion] = useState({});
   const [save, setSave] = useState(false);
   const [end, setEnd] = useState(false);
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

   const apresEnregistrement = (data) => {
      setEnd(true);
      // Cookies.set("user", JSON.stringify(data));
      // setUser(data);
      // // console.log("cookie save == ", JSON.parse(Cookies.get("user")));
      // navigation("/dashboard");
      //console.log("data user get == ", data);
      /*if (data.openDashboard) {
         Cookies.set("user", JSON.stringify(data));
         setUser(data);
         // console.log("cookie save == ", JSON.parse(Cookies.get("user")));
         navigation("/dashboard"); //dashboard
      } else {
         navigation("/controlevalidationcompte/" + data.matricule); //dashboard
      }*/
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
               <div className="mainDivConnexion">
                  {!end ? (
                     <FormResetPasswordStepOne
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
                  ) : (
                     <>
                        <div
                           style={{
                              minHeight: "40vh",
                              display: "flex",
                              flexDirection: "column",
                              //alignItems: "center",
                              justifyContent: "center",
                              fontSize: "19px",
                              padding: "10px",
                              fontWeight: 500,
                           }}
                        >
                           <span>
                              Nous avons envoyé un e-mail contenant un lien de réinitialisation de mot de passe à
                              l’adresse que vous avez fournie. Veuillez consulter votre boîte de réception et cliquer
                              sur le lien pour finaliser le processus de modification de votre mot de passe.
                           </span>
                           <br />
                           <br />
                           <span>
                              Si vous ne voyez pas l’e-mail, vérifiez votre dossier de{" "}
                              <span style={{ color: "red", fontWeight: "700" }}>spam</span> ou de courrier indésirable.
                           </span>
                           <br />

                           <span style={{ fontWeight: 500 }}>
                              Allez à la page d’
                              <Link to={"/inscription"} style={{ textDecoration: "none" }}>
                                 <span style={{ color: "green", fontWeight: "bold" }}>accueil</span>
                              </Link>
                           </span>
                        </div>
                     </>
                  )}
               </div>
            </Row>
            {save && (
               <SaveComponent
                  setSave={setSave}
                  requestURL={"/etudiant/resetpassword/stepone/"}
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
};

export const ResetPasswordStepTow = ({}) => {
   const { isOnline, language, setUser } = useContext(AppContext);
   const { codeChangePassword } = useParams();
   const [formConnexion, setFormConnexion] = useState({ codeChangePassword: codeChangePassword });
   const [save, setSave] = useState(false);
   const [end, setEnd] = useState(false);
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

   const apresEnregistrement = (data) => {
      //setEnd(true);
      // Cookies.set("user", JSON.stringify(data));
      // setUser(data);
      // // console.log("cookie save == ", JSON.parse(Cookies.get("user")));
      // navigation("/dashboard");
      //console.log("data user get == ", data);
      if (data.openDashboard) {
         Cookies.set("user", JSON.stringify(data));
         setUser(data);
         // console.log("cookie save == ", JSON.parse(Cookies.get("user")));
         navigation("/dashboard"); //dashboard
      } else {
         navigation("/connexion/"); //dashboard
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
               <div className="mainDivConnexion">
                  {!end ? (
                     <FormResetPasswordStepTow
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
                  ) : (
                     <>
                        <div
                           style={{
                              minHeight: "40vh",
                              display: "flex",
                              flexDirection: "column",
                              //alignItems: "center",
                              justifyContent: "center",
                              fontSize: "19px",
                              padding: "10px",
                              fontWeight: 500,
                           }}
                        >
                           <span>
                              Nous avons envoyé un e-mail contenant un lien de réinitialisation de mot de passe à
                              l’adresse que vous avez fournie. Veuillez consulter votre boîte de réception et cliquer
                              sur le lien pour finaliser le processus de modification de votre mot de passe.
                           </span>
                           <br />
                           <br />
                           <span>
                              Si vous ne voyez pas l’e-mail, vérifiez votre dossier de{" "}
                              <span style={{ color: "red", fontWeight: "700" }}>spam</span> ou de courrier indésirable.
                           </span>
                           <br />

                           <span style={{ fontWeight: 500 }}>
                              Allez à la page d’
                              <Link to={"/inscription"} style={{ textDecoration: "none" }}>
                                 <span style={{ color: "green", fontWeight: "bold" }}>accueil</span>
                              </Link>
                           </span>
                        </div>
                     </>
                  )}
               </div>
            </Row>
            {save && (
               <SaveComponent
                  setSave={setSave}
                  requestURL={"/etudiant/resetpassword/steptwo/"}
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
};

const FormResetPasswordStepOne = ({
   formConnexion,
   setFormConnexion,
   error,
   setSave,
   save,
   handleKeyPress,
   errorServeur,
   actionSendformConnexion,
}) => {
   const [showPassWord, setShowPassWord] = useState(false);
   return (
      <>
         <div
            className="divFormulaire"
            style={{ display: "flex", flexDirection: "column" }}
            onKeyUp={(event) => handleKeyPress(event)}
         >
            <div style={{ textAlign: "center", marginTop: 20, marginBottom: 40 }}>
               <span className="signInTitle" style={{}}>
                  Réinitialisation du mot de passe
               </span>
            </div>

            <fieldset style={{}}>
               <legend>
                  Etape <span style={{ color: "blue", fontWeight: "bold" }}>1</span>
               </legend>
               {error.textError && (
                  <span style={{ color: "red", fontWeight: 700, fontSize: 17 }}>{error.textError}</span>
               )}

               <div name="password" className="divChamp">
                  <div className="subDivChamp">
                     <label name="label_for_email_or_phone" className="labelSignIn" style={{ fontSize: 16 }}>
                        Téléphone ou Email <br />
                        <span style={{ fontSize: 13 }}> ( Celui avec lequel vous vous êtes enregistré. )</span>
                     </label>
                     <div style={{ width: "100%", display: "flex", alignItems: "center", gap: 10 }}>
                        <input
                           maxLength={50}
                           style={{ width: "100%" }}
                           name="email_phone"
                           className="inputSignIn"
                           type="text"
                           required
                           placeholder="Ecrire ici..."
                           value={formConnexion.emailOrPhone}
                           onChange={(event) =>
                              setFormConnexion((prevForm) => ({ ...prevForm, emailOrPhone: event.target.value }))
                           }
                        />
                        <PermIdentityOutlinedIcon />
                     </div>
                  </div>
               </div>

               {/* <div name="confirmPassword" className="divChamp">
                  <div className="subDivChamp">
                     <label className="labelSignIn">Mot de passe </label>
                     <div style={{ width: "100%", display: "flex", alignItems: "center", gap: 10 }}>
                        <input
                           maxLength={50}
                           className="inputSignIn"
                           style={{ width: "100%" }}
                           name="password"
                           type={showPassWord ? "text" : "password"}
                           required
                           placeholder=""
                           value={formConnexion.password}
                           onChange={(event) =>
                              setFormConnexion((prevForm) => ({ ...prevForm, password: event.target.value }))
                           }
                        />
                        {showPassWord ? (
                           <VisibilityOffOutlinedIcon
                              onClick={() => {
                                 setShowPassWord(false);
                              }}
                           />
                        ) : (
                           <VisibilityOutlinedIcon
                              onClick={() => {
                                 setShowPassWord(true);
                              }}
                           />
                        )}
                     </div>
                  </div>
               </div> */}

               {errorServeur && <MessageErrorServeur />}
            </fieldset>

            <div className="divContainButton">
               {/* <Button color="error" variant="contained">
                   Annuler
                </Button> */}
               <span>.</span>
               <div style={{ display: "flex", gap: 10 }}>
                  <Button variant="contained" onClick={() => actionSendformConnexion()} disabled={save}>
                     Valider
                  </Button>
               </div>
            </div>
            <div style={{ marginTop: 15, cursor: "pointer" }}>
               <span>
                  Vous n'avez pas de compte?{" "}
                  <Link to={"/inscription"} style={{ textDecoration: "none" }}>
                     <span style={{ color: "green", fontWeight: "bold" }}>Créer votre compte</span>
                  </Link>
               </span>
            </div>
         </div>
      </>
   );
};

const FormResetPasswordStepTow = ({
   formConnexion,
   setFormConnexion,
   error,
   setSave,
   save,
   handleKeyPress,
   errorServeur,
   actionSendformConnexion,
}) => {
   const [showPassWord, setShowPassWord] = useState(false);
   return (
      <>
         <div
            className="divFormulaire"
            style={{ display: "flex", flexDirection: "column" }}
            onKeyUp={(event) => handleKeyPress(event)}
         >
            <div style={{ textAlign: "center", marginTop: 20, marginBottom: 40 }}>
               <span className="signInTitle" style={{}}>
                  Réinitialisation du mot de passe
               </span>
            </div>

            <fieldset style={{}}>
               <legend>
                  Etape <span style={{ color: "green", fontWeight: "bold" }}>2</span>
                  <span style={{ fontSize: "12px" }}> (Dernière étape)</span>
               </legend>
               {error.textError && (
                  <span style={{ color: "red", fontWeight: 700, fontSize: 17 }}>{error.textError}</span>
               )}

               {/* <div name="login" className="divChamp">
                  <div className="subDivChamp">
                     <label name="label_for_email_or_phone" className="labelSignIn" style={{ fontSize: 16 }}>
                        Téléphone ou Email <br />
                        <span style={{ fontSize: 13 }}> ( Celui avec lequel vous vous êtes enregistré. )</span>
                     </label>
                     <div style={{ width: "100%", display: "flex", alignItems: "center", gap: 10 }}>
                        <input
                           maxLength={50}
                           style={{ width: "100%" }}
                           name="email_phone"
                           className="inputSignIn"
                           type="text"
                           required
                           placeholder="Ecrire ici..."
                           value={formConnexion.emailOrPhone}
                           onChange={(event) =>
                              setFormConnexion((prevForm) => ({ ...prevForm, emailOrPhone: event.target.value }))
                           }
                        />
                        <PermIdentityOutlinedIcon />
                     </div>
                  </div>
               </div> */}

               <div name="Password" className="divChamp">
                  <div className="subDivChamp">
                     <label className="labelSignIn"> Nouveau mot de passe </label>
                     <div style={{ width: "100%", display: "flex", alignItems: "center", gap: 10 }}>
                        <input
                           maxLength={50}
                           className="inputSignIn"
                           style={{ width: "100%" }}
                           name="password"
                           type={showPassWord ? "text" : "password"}
                           required
                           placeholder=""
                           value={formConnexion.password}
                           onChange={(event) =>
                              setFormConnexion((prevForm) => ({ ...prevForm, password: event.target.value }))
                           }
                        />
                        {showPassWord ? (
                           <VisibilityOffOutlinedIcon
                              onClick={() => {
                                 setShowPassWord(false);
                              }}
                           />
                        ) : (
                           <VisibilityOutlinedIcon
                              onClick={() => {
                                 setShowPassWord(true);
                              }}
                           />
                        )}
                     </div>
                  </div>
               </div>

               <div name="confirmPassword" className="divChamp">
                  <div className="subDivChamp">
                     <label className="labelSignIn"> Confirmation du nouveau mot de passe </label>
                     <div style={{ width: "100%", display: "flex", alignItems: "center", gap: 10 }}>
                        <input
                           maxLength={50}
                           className="inputSignIn"
                           style={{ width: "100%" }}
                           name="password"
                           type={showPassWord ? "text" : "password"}
                           required
                           placeholder=""
                           value={formConnexion.confirmPassword}
                           onChange={(event) =>
                              setFormConnexion((prevForm) => ({ ...prevForm, confirmPassword: event.target.value }))
                           }
                        />
                        {showPassWord ? (
                           <VisibilityOffOutlinedIcon
                              onClick={() => {
                                 setShowPassWord(false);
                              }}
                           />
                        ) : (
                           <VisibilityOutlinedIcon
                              onClick={() => {
                                 setShowPassWord(true);
                              }}
                           />
                        )}
                     </div>
                  </div>
               </div>

               {errorServeur && <MessageErrorServeur />}
            </fieldset>

            <div className="divContainButton">
               {/* <Button color="error" variant="contained">
                    Annuler
                 </Button> */}
               <span>.</span>
               <div style={{ display: "flex", gap: 10 }}>
                  <Button variant="contained" onClick={() => actionSendformConnexion()} disabled={save}>
                     Enregistrer
                  </Button>
               </div>
            </div>
            <div style={{ marginTop: 15, cursor: "pointer" }}>
               <span>
                  Vous n'avez pas de compte?{" "}
                  <Link to={"/inscription"} style={{ textDecoration: "none" }}>
                     <span style={{ color: "green", fontWeight: "bold" }}>Créer votre compte</span>
                  </Link>
               </span>
            </div>
         </div>
      </>
   );
};
