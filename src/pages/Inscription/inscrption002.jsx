import React, { useContext, useEffect, useRef, useState } from "react";

import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Cookies from "js-cookie";

import { Container, Row } from "react-bootstrap";
import Header from "../../composants/Header";
import "./inscriptionCSS.css";
import Footer from "../../composants/Footer";
import Button from "@mui/material/Button";
import { useFetch } from "../../utils/hooks/FetchData";
import { CircularProgress } from "@mui/material";
import { MessageErrorServeur } from "../../composants/MessageComponent";
import SaveComponent from "../../composants/SaveComponent";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../context";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import DescriptionProfil from "./DescriptionProfil";

const etoileSpanRed = <span style={{ color: "red" }}> *</span>;
const steps = ["Etape 1", "Etape 2", "Etape 3"];
const steps2 = ["Etape 1", "Etape 2"];
const steps3 = ["Etape 1", "Etape 2", "Etape 3"];
const steps4 = ["Etape 1", "Etape 2", "Etape 3", "Etape 4"];

export default function Inscription002() {
   const { isOnline, language, setUser } = useContext(AppContext);
   const [formInscription, setFormInscription] = useState({});
   const [information, setInformation] = useState({});
   const [save, setSave] = useState(false);
   const [activeStep, setActiveStep] = useState(-1);
   const [errorServeur, setErrorServeur] = useState(false);
   const [error, setError] = useState({
      signUpError: null,
      step: -1,
   });
   let navigation = useNavigate();
   const actionSaveEtudiant = () => {
      ///setFormInscription((prevForm) => ({ ...prevForm, informations: [information] }));
      //console.log("formIns == ", formInscription);
      setError((prev) => ({ ...prev, textError: null, step: -1 }));
      setErrorServeur(false);
      setSave(true);
   };

   const apresEnregistrement = (data) => {
      console.log(" userElerning get== ", data);
      if (data.openDasboard) {
         Cookies.set("user", JSON.stringify(data));
         setUser(data);
         // console.log("cookie save == ", JSON.parse(Cookies.get("user")));
         navigation("/dashboard"); //dashboard
      } else {
         navigation("/controlevalidationcompte/" + data.matricule); //dashboard
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
            <Row
               style={{
                  justifyContent: "center",
                  minHeight: "80vh",
               }}
            >
               <div className="mainDivInscription" style={{}}>
                  <FormInscription
                     error={error}
                     formInscription={formInscription}
                     setFormInscription={setFormInscription}
                     information={information}
                     setInformation={setInformation}
                     save={save}
                     setSave={setSave}
                     requestMethode="POST"
                     setError={setError}
                     setErrorServeur={setErrorServeur}
                     errorServeur={errorServeur}
                     activeStep={activeStep}
                     setActiveStep={setActiveStep}
                     actionSaveEtudiant={actionSaveEtudiant}
                  />
               </div>
            </Row>
            {save && (
               <SaveComponent
                  setSave={setSave}
                  requestURL={"/etudiant/enregistrement002/"}
                  //requestBody={{ ...formInscription, informations: [information] }}
                  requestBody={{ etudiant: formInscription, information: information }}
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

function FormInscription({
   formInscription,
   setFormInscription,
   error,
   setActiveStep,
   activeStep,
   errorServeur,
   actionSaveEtudiant,
   setInformation,
   information,
}) {
   const [showPassWord, setShowPassWord] = useState(false);
   const [showPassWord02, setShowPassWord02] = useState(false);

   const [update, setUpdate] = useState(false);
   const fetchMetaData = useFetch(`/metadata/inscription/`, "GET", null, null, update);

   useEffect(() => {
      if (activeStep === -1) {
         setInformation({});
      }
   }, [activeStep, setInformation]);

   const inputRef = useRef(null);
   const mainTitreRef = useRef(null);

   const handleResetFocus = () => {
      // Mettre le focus sur l'élément input
      // inputRef.current.focus();
      //inputRef.current.scrollIntoView({ behavior: "smooth" });
      mainTitreRef.current.scrollIntoView({ behavior: "smooth" });
   };

   const linkInformationToFormInscription = () => {
      setFormInscription((prev) => ({ ...prev, informations: [information] }));
   };

   // const [activeStep, setActiveStep] = useState(0);
   const [skipped, setSkipped] = useState(new Set());
   const isStepOptional = (step) => {
      return step === -1;
   };

   const isStepSkipped = (step) => {
      return skipped.has(step);
   };

   const handleNext = () => {
      // console.log("etudiant == ", formInscription);

      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
         newSkipped = new Set(newSkipped.values());
         newSkipped.delete(activeStep);
      }

      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
      handleResetFocus();
      if (activeStep === 3) {
         linkInformationToFormInscription();
      }
   };

   const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
      handleResetFocus();
      if (activeStep === -1) {
         setInformation({});
      }
      //   if (activeStep == -1) {
      //      setInformation({});
      //   }
      //setSave(false);
      //setErrorServeur(false);
   };

   const handleSkip = () => {
      if (!isStepOptional(activeStep)) {
         // You probably want to guard against something like this,
         // it should never occur unless someone's actively trying to break something.
         throw new Error("You can't skip a step that isn't optional.");
      }

      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped((prevSkipped) => {
         const newSkipped = new Set(prevSkipped.values());
         newSkipped.add(activeStep);
         return newSkipped;
      });
   };

   const handleReset = () => {
      setActiveStep(0);
   };

   const setProfileStudent = (gammeEtudiant) => {
      setFormInscription((prevForm) => ({ ...prevForm, gammeEtudiant: gammeEtudiant }));
      // setFormInscription({ ...formInscription, gammeEtudiant: gammeEtudiant });
      //console.log("gamme selected == ", gammeEtudiant);

      handleNext();
   };

   const handleRegionChange = (event) => {
      console.log("id region selected == ", event.target.value);
      const region = fetchMetaData.data.regions.find((region) => region.id == event.target.value);
      console.log("region == ", region);
      setFormInscription({ ...formInscription, region: region });
   };

   const tailleBouton = window.innerWidth < 769 ? "small" : "medium";

   const setManyMotivation = (event) => {
      const { value, checked } = event.target;
      //let newInformation = information;
      let tableauMotivation = decomposeChaine(information.motivation);

      if (checked) {
         if (!contientChaine(tableauMotivation, value) && value) {
            tableauMotivation.push(value);
            setInformation((prev) => ({ ...prev, motivation: reconstituerChaine(tableauMotivation) }));
         }
      } else {
         //let tableauMotivation = decomposeChaine(information.motivation);
         if (contientChaine(tableauMotivation, value) && value) {
            tableauMotivation = supprimerElementsContenantSousChaine(tableauMotivation, value);
            setInformation((prev) => ({ ...prev, motivation: reconstituerChaine(tableauMotivation) }));
         }
      }
   };

   const setManySouhaitAcquisitionDurant = (event) => {
      const { value, checked } = event.target;
      //let newInformation = information;
      let tableauSouhaitAcquisitionDurant = decomposeChaine(information.souhaitAcquisitionDurant);
      if (checked) {
         if (!contientChaine(tableauSouhaitAcquisitionDurant, value) && value) {
            tableauSouhaitAcquisitionDurant.push(value);
            setInformation((prev) => ({
               ...prev,
               souhaitAcquisitionDurant: reconstituerChaine(tableauSouhaitAcquisitionDurant),
            }));
         }
      } else {
         if (contientChaine(tableauSouhaitAcquisitionDurant, value) && value) {
            tableauSouhaitAcquisitionDurant = supprimerElementsContenantSousChaine(
               tableauSouhaitAcquisitionDurant,
               value
            );
            setInformation((prev) => ({
               ...prev,
               souhaitAcquisitionDurant: reconstituerChaine(tableauSouhaitAcquisitionDurant),
            }));
         }
      }
   };

   const setManyFormatFormation = (event) => {
      const { value, checked } = event.target;
      //let newInformation = information;
      let tableauFormatFormation = decomposeChaine(information.formatFormation);

      if (checked) {
         if (!contientChaine(tableauFormatFormation, value) && value) {
            tableauFormatFormation.push(value);
            setInformation((prev) => ({ ...prev, formatFormation: reconstituerChaine(tableauFormatFormation) }));
         }
      } else {
         //let tableauMotivation = decomposeChaine(information.motivation);
         if (contientChaine(tableauFormatFormation, value) && value) {
            tableauFormatFormation = supprimerElementsContenantSousChaine(tableauFormatFormation, value);
            setInformation((prev) => ({ ...prev, formatFormation: reconstituerChaine(tableauFormatFormation) }));
         }
      }
   };

   const setManyNiveauScolaire = (event) => {
      const { value, checked } = event.target;
      //let newInformation = information;
      let tableauNiveauScolaire = decomposeChaine(information.niveauEtudeFamille);

      if (checked) {
         if (!contientChaine(tableauNiveauScolaire, value) && value) {
            tableauNiveauScolaire.push(value);
            setInformation((prev) => ({ ...prev, niveauEtudeFamille: reconstituerChaine(tableauNiveauScolaire) }));
         }
      } else {
         //let tableauMotivation = decomposeChaine(information.motivation);
         if (contientChaine(tableauNiveauScolaire, value) && value) {
            tableauNiveauScolaire = supprimerElementsContenantSousChaine(tableauNiveauScolaire, value);
            setInformation((prev) => ({ ...prev, niveauEtudeFamille: reconstituerChaine(tableauNiveauScolaire) }));
         }
      }
   };

   return (
      <>
         <div style={{ textAlign: "center", marginTop: 0 }} ref={mainTitreRef}>
            <span className="signInTitle">Inscription</span>
         </div>
         {activeStep !== -1 && (
            <div style={{ marginTop: 20, marginBottom: 20 }}>
               <Stepper activeStep={activeStep}>
                  {steps.map((label, index) => {
                     const stepProps = {};
                     const labelProps = {};

                     if (isStepSkipped(index)) {
                        stepProps.completed = false;
                     }

                     return (
                        <Step key={label} {...stepProps}>
                           <StepLabel className="stepLabel" {...labelProps}>
                              {label}
                           </StepLabel>
                        </Step>
                     );
                  })}
               </Stepper>
            </div>
         )}
         {activeStep === -1 && (
            <fieldset style={{ border: "0px" }}>
               <legend ref={inputRef}>
                  Selectionez votre <span style={{ color: "green" }}>profil de formation</span>
               </legend>
               {/*error.textError && (
                  <span style={{ color: "red", fontWeight: 700, fontSize: 17 }}>{error.textError}</span>
               )*/}
               <div className="listProfilEtutdiantDiv">
                  {fetchMetaData.isLoading ? (
                     <div style={{ marginLeft: "40%" }}>
                        <CircularProgress size={40} />
                     </div>
                  ) : fetchMetaData.error ? (
                     <MessageErrorServeur />
                  ) : (
                     fetchMetaData.data.gammeEtudiants.map((item, index) => (
                        <div key={item.id} className="bodyProfilEtudiant">
                           <div
                              className="bodyProfilEtudiantImage"
                              onClick={(e) => setProfileStudent(item)}
                              style={{ backgroundImage: "url(/images/profil0" + (index + 1) + ".png)" }}
                           >
                              {/* <PersonOutlineOutlinedIcon fontSize="large" sx={{ color: "red", width: "50px" }} /> */}
                           </div>
                           <div className="nomProfileEtudiantDiv" onClick={(e) => setProfileStudent(item)}>
                              <span className="nomProfileEtudiantSpan" style={{ cursor: "pointer" }}>
                                 {item.nom}
                              </span>
                           </div>
                           <div
                              className="profilEtudiantDetail"
                              onClick={(e) => {
                                 e.stopPropagation();
                              }}
                           >
                              <DescriptionProfil
                                 nom={item.nom}
                                 gammeEtudiant={item}
                                 description={item.description}
                                 setProfileStudent={setProfileStudent}
                              />
                              {/* <span style={{ fontWeight: 500, fontSize: 12 }}>{item.description}</span> */}
                           </div>
                        </div>
                     ))
                  )}
               </div>
            </fieldset>
         )}
         {activeStep === 0 && (
            <fieldset>
               {error.step === 0 && (
                  <span style={{ color: "red", fontWeight: 700, fontSize: 17 }}>{error.textError}</span>
               )}
               <legend ref={inputRef}>
                  Informations <span style={{ color: "green" }}>Personnelles</span>
               </legend>
               {formInscription?.gammeEtudiant?.code !== "C003" ? (
                  <div name="nom_et_prenom" className="divChamp">
                     <div name="nom" className="subDivChamp">
                        <label className="labelSignIn">
                           Nom<span style={{ color: "red" }}> *</span>
                        </label>
                        <input
                           className="inputSignIn"
                           type="text"
                           maxLength={60}
                           required
                           placeholder="Entrez votre nom"
                           value={formInscription.nom}
                           onChange={(e) => setFormInscription((prevForm) => ({ ...prevForm, nom: e.target.value }))}
                        />
                     </div>
                     <div name="prenom" className="subDivChamp maginLeft">
                        <label className="labelSignIn">Prenom</label>
                        <input
                           className="inputSignIn"
                           type="text"
                           maxLength={60}
                           required
                           placeholder="Entrez votre prenom"
                           value={formInscription.prenom}
                           onChange={(e) => setFormInscription((prevForm) => ({ ...prevForm, prenom: e.target.value }))}
                        />
                     </div>
                  </div>
               ) : (
                  <div name="nom_representant_famille" className="divChamp">
                     <div name="nom" className="subDivChamp">
                        <label className="labelSignIn">
                           Nom complet (Représentant de la famille) :<span style={{ color: "red" }}> *</span>
                        </label>
                        <input
                           className="inputSignIn"
                           type="text"
                           maxLength={60}
                           required
                           placeholder="Entrez votre nom"
                           value={formInscription.nom}
                           onChange={(e) => setFormInscription((prevForm) => ({ ...prevForm, nom: e.target.value }))}
                        />
                     </div>
                  </div>
               )}
               {formInscription?.gammeEtudiant?.code === "C004" || formInscription?.gammeEtudiant?.code === "C003" ? (
                  ""
               ) : (
                  <div name="date_lieu_naissane" className="divChamp">
                     <div name="date_naissance" className="subDivChamp">
                        <label className="labelSignIn">Date de Naissance{etoileSpanRed}</label>
                        <input
                           className="inputSignIn"
                           type="date"
                           required
                           placeholder="..."
                           value={formInscription.dateNaissance}
                           onChange={(e) =>
                              setFormInscription((prevForm) => ({ ...prevForm, dateNaissance: e.target.value }))
                           }
                        />
                     </div>
                     <div name="lieu_naissance" className="subDivChamp maginLeft">
                        <label className="labelSignIn">Lieu de naissance{etoileSpanRed}</label>
                        <input
                           className="inputSignIn"
                           type="text"
                           maxLength={60}
                           required
                           placeholder="..."
                           value={formInscription.lieuNaissance}
                           onChange={(e) =>
                              setFormInscription((prevForm) => ({ ...prevForm, lieuNaissance: e.target.value }))
                           }
                        />
                     </div>
                  </div>
               )}
               <div name="genre_sexe" className="divChamp">
                  <div name="sexe" className="subDivChamp">
                     <label className="labelSignIn">Selectionez votre genre{etoileSpanRed}</label>
                     <select
                        id="region-select"
                        className="inputSignIn"
                        onChange={(e) => setInformation((prevForm) => ({ ...prevForm, sexe: e.target.value }))}
                        value={information.sexe || ""}
                     >
                        <option value="">-- Choisissez genre --</option>
                        <option value="Masculin">Masculin</option>
                        <option value="Feminin">Feminin</option>
                     </select>
                  </div>
               </div>

               <div name="contact_telephone" className="divChamp">
                  <div name="telephone" className="subDivChamp">
                     <label className="labelSignIn">Telephone{etoileSpanRed}</label>
                     <input
                        className="inputSignIn"
                        type="text"
                        maxLength={60}
                        required
                        placeholder="Ex: 675 41..."
                        value={formInscription.telephone}
                        onChange={(e) => setFormInscription((prevForm) => ({ ...prevForm, telephone: e.target.value }))}
                     />
                  </div>
               </div>

               <div name="contact_email" className="divChamp">
                  <div name="email" className="subDivChamp">
                     <label className="labelSignIn">Email{etoileSpanRed}</label>
                     <input
                        className="inputSignIn"
                        type="text"
                        maxLength={60}
                        required
                        placeholder="Ex: mon@email.com"
                        value={formInscription.email}
                        onChange={(e) => setFormInscription((prevForm) => ({ ...prevForm, email: e.target.value }))}
                     />
                  </div>
               </div>
               <div name="localisation_Region" className="divChamp">
                  <div name="region" className="subDivChamp">
                     <label className="labelSignIn">
                        Region de residence <span style={{ color: "red" }}> *</span>{" "}
                     </label>
                     <select
                        id="region-select"
                        className="inputSignIn"
                        onChange={(e) => handleRegionChange(e)}
                        value={formInscription.region?.id || ""}
                     >
                        <option value="">-- Choisissez une région --</option>
                        {fetchMetaData.data &&
                           fetchMetaData.data.regions.length &&
                           fetchMetaData.data.regions.map((region) => (
                              <option key={region.id} value={region.id}>
                                 {region.nom}
                              </option>
                           ))}
                     </select>
                  </div>
               </div>
            </fieldset>
         )}
         {activeStep === 1 && (
            <fieldset>
               <legend ref={inputRef}>
                  Informations{" "}
                  <span style={{ color: "blue" }}>
                     {formInscription?.gammeEtudiant?.code === "C001"
                        ? "Professionels"
                        : formInscription?.gammeEtudiant?.code === "C002"
                        ? "Académiques/ Professionnelles"
                        : formInscription?.gammeEtudiant?.code === "C003"
                        ? " pour l'identification de la famille "
                        : "Informations Académique"}
                  </span>
               </legend>

               {error.step === 1 && (
                  <span style={{ color: "red", fontWeight: 700, fontSize: 17 }}>{error.textError}</span>
               )}

               {formInscription?.gammeEtudiant?.code === "C004" ? (
                  <>
                     <div name="nonUniversité" className="divChamp">
                        <div name="non_Université" className="subDivChamp">
                           <label className="labelSignIn">Université d'attache / Etablissement{etoileSpanRed}</label>
                           <input
                              className="inputSignIn"
                              type="text"
                              maxLength={60}
                              required
                              placeholder="Ex: Université de yaounde 1 "
                              value={information.universite}
                              onChange={(event) =>
                                 setInformation((prevForm) => ({ ...prevForm, universite: event.target.value }))
                              }
                           />
                        </div>
                     </div>
                     <div name="Faculte" className="divChamp">
                        <div className="subDivChamp">
                           <label className="labelSignIn">Faculté{etoileSpanRed}</label>
                           <input
                              className="inputSignIn"
                              type="text"
                              maxLength={60}
                              required
                              placeholder="Ex: Faculté des Lettres"
                              value={information.faculte}
                              onChange={(event) =>
                                 setInformation((prevForm) => ({ ...prevForm, faculte: event.target.value }))
                              }
                           />
                        </div>
                     </div>

                     <div name="departement" className="divChamp">
                        <div className="subDivChamp">
                           <label className="labelSignIn">Département </label>
                           <input
                              className="inputSignIn"
                              type="text"
                              maxLength={60}
                              required
                              placeholder=""
                              value={information.departement}
                              onChange={(event) =>
                                 setInformation((prevForm) => ({ ...prevForm, departement: event.target.value }))
                              }
                           />
                        </div>
                     </div>

                     <div name="Fonction" className="divChamp">
                        <div className="subDivChamp">
                           <label className="labelSignIn">Fonction/Poste occupé{etoileSpanRed} </label>
                           <input
                              className="inputSignIn"
                              type="text"
                              maxLength={60}
                              required
                              placeholder=""
                              value={information.fonction}
                              onChange={(event) =>
                                 setInformation((prevForm) => ({ ...prevForm, fonction: event.target.value }))
                              }
                           />
                        </div>
                     </div>
                     <div name="garde" className="divChamp">
                        <div className="subDivChamp">
                           <label className="labelSignIn">Grade Universitaire{etoileSpanRed}</label>
                           <select
                              id="region-select"
                              className="inputSignIn"
                              onChange={(event) =>
                                 setInformation((prevForm) => ({ ...prevForm, grade: event.target.value }))
                              }
                              value={information.grade || ""}
                           >
                              <option value="">-- Choisissez une grade --</option>

                              <option value={"Doctorant"}>{"Doctorant"}</option>
                              <option value={"Docteur"}>{"Docteur"}</option>
                              <option value={"Professeur"}>{"Professeur"}</option>
                              <option value={"Autre"}>{"autre"}</option>
                           </select>
                        </div>
                     </div>
                  </>
               ) : formInscription?.gammeEtudiant?.code === "C001" ? (
                  <>
                     <div name="nonEntreprise" className="divChamp">
                        <div name="nom_entreprise" className="subDivChamp">
                           <label className="labelSignIn">Nom de l'entreprise </label>
                           <input
                              className="inputSignIn"
                              type="text"
                              maxLength={60}
                              required
                              placeholder="Entrez le nom de votre entreprise"
                              value={information.nomEntreprise}
                              onChange={(event) =>
                                 setInformation((prevForm) => ({ ...prevForm, nomEntreprise: event.target.value }))
                              }
                           />
                        </div>
                     </div>

                     <div name="non_profession" className="divChamp">
                        <div name="nom_profession" className="subDivChamp">
                           <label className="labelSignIn">
                              Profession<span style={{ color: "red" }}> *</span>
                           </label>
                           <input
                              className="inputSignIn"
                              type="text"
                              maxLength={60}
                              required
                              placeholder="Entrez votre Profession"
                              value={information.profession}
                              onChange={(event) =>
                                 setInformation((prevForm) => ({ ...prevForm, profession: event.target.value }))
                              }
                           />
                        </div>
                     </div>

                     <div name="domaineActivite" className="divChamp">
                        <div name="domaine_Activite" className="subDivChamp">
                           <label className="labelSignIn">Domaine d'activité </label>
                           <input
                              className="inputSignIn"
                              type="text"
                              maxLength={60}
                              required
                              placeholder="..."
                              value={information.domaineActivite}
                              onChange={(event) =>
                                 setInformation((prevForm) => ({ ...prevForm, domaineActivite: event.target.value }))
                              }
                           />
                        </div>
                     </div>

                     <div name="anneeExperience" className="divChamp">
                        <div name="annee_Experience" className="subDivChamp">
                           <label className="labelSignIn">Années d’expérience Professionnelle</label>
                           <input
                              className="inputSignIn"
                              type="number"
                              maxLength={80}
                              required
                              placeholder="..."
                              value={information.anneeExperience}
                              onChange={(event) =>
                                 setInformation((prevForm) => ({ ...prevForm, anneeExperience: event.target.value }))
                              }
                           />
                        </div>
                     </div>

                     <div name="secteurActivite" className="divChamp">
                        <div name="secteur_Activite" className="subDivChamp">
                           <label className="labelSignIn">Secteur d’activité</label>
                           <input
                              className="inputSignIn"
                              type="text"
                              maxLength={100}
                              required
                              placeholder="..."
                              value={information.secteurActivite}
                              onChange={(event) =>
                                 setInformation((prevForm) => ({ ...prevForm, secteurActivite: event.target.value }))
                              }
                           />
                        </div>
                     </div>

                     <div name="tailleEntreprise" className="divChamp">
                        <div name="taille_Entreprise" className="subDivChamp">
                           <label className="labelSignIn">Taille de l’Entreprise/Organisation : </label>
                           <select
                              id="region-select"
                              className="inputSignIn"
                              onChange={(e) =>
                                 setInformation((prevForm) => ({ ...prevForm, tailleEntreprise: e.target.value }))
                              }
                              value={information.tailleEntreprise || ""}
                           >
                              <option value="">-- Selectionnez --</option>
                              <option value="Petit">Petit</option>
                              <option value="Moyenne">Moyenne</option>
                              <option value="Grande">Grande</option>
                           </select>
                        </div>
                     </div>

                     <div name="marcheCible" className="divChamp">
                        <div name="marche_Cible" className="subDivChamp">
                           <label className="labelSignIn">Marché Ciblé</label>
                           <input
                              className="inputSignIn"
                              type="text"
                              maxLength={100}
                              required
                              placeholder="..."
                              value={information.marcheCible}
                              onChange={(event) =>
                                 setInformation((prevForm) => ({ ...prevForm, marcheCible: event.target.value }))
                              }
                           />
                        </div>
                     </div>

                     <div name="anneeEntreprise" className="divChamp">
                        <div name="annee_Entreprise" className="subDivChamp">
                           <label className="labelSignIn">Nombre d’années d’existence de l’Entreprise</label>
                           <input
                              className="inputSignIn"
                              type="number"
                              maxLength={100}
                              required
                              placeholder="..."
                              value={information.anneeEntreprise}
                              onChange={(event) =>
                                 setInformation((prevForm) => ({ ...prevForm, anneeEntreprise: event.target.value }))
                              }
                           />
                        </div>
                     </div>

                     <div name="Chiffre_affaire" className="divChamp">
                        <div name="chiffreaffaire" className="subDivChamp">
                           <label className="labelSignIn">Chiffre d'affaire annuelle (en FCFA) </label>
                           <select
                              id="chiffreaffaireannuelle"
                              className="inputSignIn"
                              onChange={(e) =>
                                 setInformation((prevForm) => ({ ...prevForm, chiffreAffaire: e.target.value }))
                              }
                              value={information.chiffreAffaire || ""}
                           >
                              <option value="">-- Choisissez un interval en FCFA --</option>
                              <option value="50000">50 000 à 99 999</option>
                              <option value="100000">100 000 à 250 000</option>
                              <option value="251000">251 000 à 500 000</option>
                              <option value="500000">500 000 à 1 000 000</option>
                              <option value="1000000">1 000 000 à 5 000 000</option>
                              <option value="5000000">5 100 000 à 10 000 000</option>
                              <option value="10000000">Superieur à 10 000 000</option>
                           </select>
                        </div>
                     </div>
                  </>
               ) : formInscription?.gammeEtudiant?.code === "C002" ? (
                  <>
                     <div name="nonUniversite" className="divChamp">
                        <div name="non_Universite" className="subDivChamp">
                           <label className="labelSignIn">
                              Université/ Ecole de formation{" "}
                              <span style={{ fontSize: 12, color: "gray" }}>(reservé aux etudiants)</span>
                           </label>
                           <input
                              className="inputSignIn"
                              type="text"
                              maxLength={60}
                              required
                              placeholder=""
                              value={information.universite}
                              onChange={(event) =>
                                 setInformation((prevForm) => ({ ...prevForm, universite: event.target.value }))
                              }
                           />
                        </div>
                     </div>

                     <div name="nonFilière " className="divChamp">
                        <div name="non_Filière" className="subDivChamp">
                           <label className="labelSignIn">
                              Filière <span style={{ fontSize: 12, color: "gray" }}>(reservé aux etudiants)</span>
                           </label>
                           <input
                              className="inputSignIn"
                              type="text"
                              maxLength={60}
                              required
                              placeholder=""
                              value={information.filiere}
                              onChange={(event) =>
                                 setInformation((prevForm) => ({ ...prevForm, filiere: event.target.value }))
                              }
                           />
                        </div>
                     </div>

                     <div name="niveauAcademique " className="divChamp">
                        <div name="niveau_Academique" className="subDivChamp">
                           <label className="labelSignIn">
                              Niveau Académique{" "}
                              <span style={{ fontSize: 12, color: "gray" }}>(reservé aux etudiants)</span>
                           </label>
                           <input
                              className="inputSignIn"
                              type="text"
                              maxLength={60}
                              required
                              placeholder=""
                              value={information.niveauAcademique}
                              onChange={(event) =>
                                 setInformation((prevForm) => ({ ...prevForm, niveauAcademique: event.target.value }))
                              }
                           />
                        </div>
                     </div>

                     <div name="ideeProjet " className="divChamp">
                        <div name="idee_Projet" className="subDivChamp">
                           <label className="labelSignIn">
                              Idée de Projet{" "}
                              <span style={{ fontSize: 12, color: "gray" }}>(reservé aux porteurs de projets)</span>
                           </label>
                           <textarea
                              style={{ padding: 5, borderRadius: 5 }}
                              type="text"
                              rows={3}
                              value={information.ideeProjet}
                              placeholder={"Ecrire ici..."}
                              onChange={(event) =>
                                 setInformation((prevForm) => ({ ...prevForm, ideeProjet: event.target.value }))
                              }
                           />
                        </div>
                     </div>

                     <div name="secteurActivite" className="divChamp">
                        <div name="secteur_Activite" className="subDivChamp">
                           <label className="labelSignIn">
                              Secteur d’activité{" "}
                              <span style={{ fontSize: 12, color: "gray" }}>(reservé aux porteurs de projets)</span>
                           </label>
                           <input
                              className="inputSignIn"
                              type="text"
                              maxLength={100}
                              required
                              placeholder="..."
                              value={information.secteurActivite}
                              onChange={(event) =>
                                 setInformation((prevForm) => ({ ...prevForm, secteurActivite: event.target.value }))
                              }
                           />
                        </div>
                     </div>

                     <div name="marcheCible" className="divChamp">
                        <div name="marche_Cible" className="subDivChamp">
                           <label className="labelSignIn">
                              Marché Ciblé{" "}
                              <span style={{ fontSize: 12, color: "gray" }}>(reservé aux porteurs de projets)</span>
                           </label>
                           <input
                              className="inputSignIn"
                              type="text"
                              maxLength={100}
                              required
                              placeholder="..."
                              value={information.marcheCible}
                              onChange={(event) =>
                                 setInformation((prevForm) => ({ ...prevForm, marcheCible: event.target.value }))
                              }
                           />
                        </div>
                     </div>
                  </>
               ) : (
                  <>
                     <div name="nombre_membre_famille" className="divChamp">
                        <div name="nombre_membre_famille" className="subDivChamp">
                           <label className="labelSignIn">Combien de membres compte votre famille ?</label>
                           <input
                              className="inputSignIn"
                              type="number"
                              maxLength={60}
                              required
                              placeholder=""
                              value={information.menbreFamille}
                              onChange={(event) =>
                                 setInformation((prevForm) => ({
                                    ...prevForm,
                                    menbreFamille: event.target.value,
                                 }))
                              }
                           />
                        </div>
                     </div>

                     <div name="trancheAgeFamille" className="divChamp">
                        <div name="tranche_age_famille" className="subDivChamp">
                           <label className="labelSignIn">
                              Quelle est la tranche d’âge des membres de votre famille qui envisagent suivre cette
                              formation ?
                           </label>
                           <input
                              className="inputSignIn"
                              type="texte"
                              maxLength={100}
                              required
                              placeholder=""
                              value={information.trancheAge}
                              onChange={(event) =>
                                 setInformation((prevForm) => ({
                                    ...prevForm,
                                    trancheAge: event.target.value,
                                 }))
                              }
                           />
                        </div>
                     </div>

                     <div name="niveau_etude" className="divChamp">
                        <div name="niveau_etude" className="subDivChamp">
                           <label className="labelSignIn">
                              Quel est le niveau d’étude des membres de votre famille ?
                           </label>
                           <div
                              style={{
                                 display: "flex",
                                 flexDirection: "row",
                                 justifyContent: "space-between",
                                 flexWrap: "wrap",
                                 padding: 12,
                              }}
                           >
                              {listNiveauScolaire.map((item) => (
                                 <>
                                    <div
                                       className="labelSignIn"
                                       style={{ display: "flex", alignItems: "center", gap: 2 }}
                                    >
                                       <input
                                          type="checkbox"
                                          style={{ width: 20, height: 20, marginRight: 5 }}
                                          checked={information.niveauEtudeFamille?.includes(item)}
                                          value={item}
                                          onChange={(event) => setManyNiveauScolaire(event)}
                                       />
                                       <span>{item}</span>
                                    </div>
                                 </>
                              ))}
                           </div>
                        </div>
                     </div>

                     <div name="domaineFamille" className="divChamp">
                        <div name="domaine_Famille" className="subDivChamp">
                           <label className="labelSignIn">
                              Combien d’entrepreneur compte votre famille ? Et dans quels domaines exercent –t-ils ?
                           </label>
                           <textarea
                              style={{ padding: 5, borderRadius: 5 }}
                              type="text"
                              rows={4}
                              value={information.domaineFamille}
                              placeholder={"Ecrire ici..."}
                              onChange={(event) =>
                                 setInformation((prevForm) => ({ ...prevForm, domaineFamille: event.target.value }))
                              }
                           />
                        </div>
                     </div>

                     <div name="definition_entrepreneuriat" className="divChamp">
                        <div name="definition_entrepreneuriat" className="subDivChamp">
                           <label className="labelSignIn">Selon vous qu’est-ce que l'entrepreneuriat ? : </label>
                           <textarea
                              style={{ padding: 5, borderRadius: 5 }}
                              type="text"
                              rows={2}
                              value={information.definitionEntrepreneuriat}
                              placeholder={"Ecrire ici..."}
                              onChange={(event) =>
                                 setInformation((prevForm) => ({
                                    ...prevForm,
                                    definitionEntrepreneuriat: event.target.value,
                                 }))
                              }
                           />
                        </div>
                     </div>

                     <div name="avezvous_creer_une_entreprise" className="divChamp">
                        <div name="avezvous_creer_une_entreprise" className="subDivChamp">
                           <label className="labelSignIn">
                              Avez-vous déjà créé une entreprise/ou activité génératrice de revenus ? Si oui, dans quel
                              domaine ? Si non, souhaiterez-vous en créer une et dans quel domaine ?{" "}
                           </label>
                           <textarea
                              style={{ padding: 5, borderRadius: 5 }}
                              type="text"
                              rows={5}
                              value={information.entrepriseCreer}
                              placeholder={"Ecrire ici..."}
                              onChange={(event) =>
                                 setInformation((prevForm) => ({
                                    ...prevForm,
                                    entrepriseCreer: event.target.value,
                                 }))
                              }
                           />
                        </div>
                     </div>

                     <div name="obstacleFamille" className="divChamp">
                        <div name="obstacle_Famille" className="subDivChamp">
                           <label className="labelSignIn">
                              D’après vous quels sont les obstacles ou difficultés auxquels peuvent faire face une
                              famille d’entrepreneur ?
                           </label>
                           <textarea
                              style={{ padding: 5, borderRadius: 5 }}
                              type="text"
                              rows={4}
                              value={information.obstacleFamille}
                              placeholder={"Ecrire ici..."}
                              onChange={(event) =>
                                 setInformation((prevForm) => ({
                                    ...prevForm,
                                    obstacleFamille: event.target.value,
                                 }))
                              }
                           />
                        </div>
                     </div>
                  </>
               )}
            </fieldset>
         )}

         {activeStep === 22 && (
            <fieldset>
               {error.step === 2 && (
                  <span style={{ color: "red", fontWeight: 700, fontSize: 17 }}>{error.textError}</span>
               )}
               <legend ref={inputRef}>
                  Vos <span style={{ color: "green" }}>Objectifs de formation</span>
               </legend>

               {formInscription?.gammeEtudiant?.code === "C001" || formInscription?.gammeEtudiant?.code === "C002" ? (
                  <>
                     <div name="motivation" className="divChamp">
                        <div name="motivation" className="subDivChamp">
                           <label className="labelSignIn" style={{ fontWeight: 500 }}>
                              Quelles sont vos principales motivations pour suivre cette formation ? (Cochez toutes les
                              réponses pertinentes){" "}
                           </label>
                           <div
                              style={{
                                 display: "flex",
                                 flexDirection: "column",
                                 justifyContent: "space-between",
                                 flexWrap: "wrap",
                                 padding: 12,
                              }}
                           >
                              {formInscription?.gammeEtudiant?.code === "C001" ? (
                                 <>
                                    <label className="labelSignIn">
                                       <input
                                          type="checkbox"
                                          style={{ width: 20, height: 20, marginRight: 5 }}
                                          checked={information.motivation?.includes(item01MotivationEntrep)}
                                          value={item01MotivationEntrep}
                                          onChange={(event) => setManyMotivation(event)}
                                       />
                                       <span>{item01MotivationEntrep}</span>
                                    </label>
                                    <label className="labelSignIn">
                                       <input
                                          type="checkbox"
                                          style={{ width: 20, height: 20, marginRight: 5 }}
                                          checked={information.motivation?.includes(item02MotivationEntrep)}
                                          value={item02MotivationEntrep}
                                          onChange={(event) => setManyMotivation(event)}
                                       />
                                       <span>{item02MotivationEntrep}</span>
                                    </label>
                                    <label className="labelSignIn">
                                       <input
                                          type="checkbox"
                                          style={{ width: 20, height: 20, marginRight: 5 }}
                                          checked={information.motivation?.includes(item03MotivationEntrep)}
                                          value={item03MotivationEntrep}
                                          onChange={(event) => setManyMotivation(event)}
                                       />
                                       <span>{item03MotivationEntrep}</span>
                                    </label>
                                 </>
                              ) : (
                                 <>
                                    {listItemModitvationEtudiant.map((item) => (
                                       <>
                                          <label className="labelSignIn">
                                             <input
                                                type="checkbox"
                                                style={{ width: 20, height: 20, marginRight: 5 }}
                                                checked={information.motivation?.includes(item)}
                                                value={item}
                                                onChange={(event) => setManyMotivation(event)}
                                             />
                                             <span>{item}</span>
                                          </label>
                                       </>
                                    ))}
                                 </>
                              )}
                           </div>
                        </div>
                     </div>

                     <div name="souhaitAcquisitionDurant" className="divChamp">
                        <div name="souhaitAcquisitionDurant" className="subDivChamp">
                           <label className="labelSignIn" style={{ fontWeight: 500 }}>
                              {formInscription?.gammeEtudiant?.code === "C001" ? (
                                 <>Qu’espérez-vous pouvoir améliorer dans votre entreprise durant la formation ?</>
                              ) : (
                                 <>Qu’espérez-vous pouvoir obtenir comme compétences durant la formation ?</>
                              )}
                           </label>
                           <div
                              style={{
                                 display: "flex",
                                 flexDirection: "column",
                                 justifyContent: "space-between",
                                 flexWrap: "wrap",
                                 padding: 12,
                              }}
                           >
                              {formInscription?.gammeEtudiant?.code === "C001" ? (
                                 <>
                                    <label className="labelSignIn">
                                       <input
                                          type="checkbox"
                                          style={{ width: 20, height: 20, marginRight: 5 }}
                                          onChange={(event) => setManySouhaitAcquisitionDurant(event)}
                                          value={item01DurantEntrep}
                                          checked={information.souhaitAcquisitionDurant?.includes(item01DurantEntrep)}
                                       />
                                       <span>{item01DurantEntrep}</span>
                                    </label>

                                    <label className="labelSignIn">
                                       <input
                                          type="checkbox"
                                          style={{ width: 20, height: 20, marginRight: 5 }}
                                          onChange={(event) => setManySouhaitAcquisitionDurant(event)}
                                          value={item02DurantEntrep}
                                          checked={information.souhaitAcquisitionDurant?.includes(item02DurantEntrep)}
                                       />
                                       <span>{item02DurantEntrep}</span>
                                    </label>

                                    <label className="labelSignIn">
                                       <input
                                          type="checkbox"
                                          style={{ width: 20, height: 20, marginRight: 5 }}
                                          onChange={(event) => setManySouhaitAcquisitionDurant(event)}
                                          value={item03DurantEntrep}
                                          checked={information.souhaitAcquisitionDurant?.includes(item03DurantEntrep)}
                                       />
                                       <span>{item03DurantEntrep}</span>
                                    </label>

                                    <label className="labelSignIn">
                                       <input
                                          type="checkbox"
                                          style={{ width: 20, height: 20, marginRight: 5 }}
                                          onChange={(event) => setManySouhaitAcquisitionDurant(event)}
                                          value={item04DurantEntrep}
                                          checked={information.souhaitAcquisitionDurant?.includes(item04DurantEntrep)}
                                       />
                                       <span>{item04DurantEntrep}</span>
                                    </label>
                                 </>
                              ) : (
                                 <>
                                    {listetemDurantEtudiant.map((item) => (
                                       <>
                                          <label className="labelSignIn">
                                             <input
                                                type="checkbox"
                                                style={{ width: 20, height: 20, marginRight: 5 }}
                                                onChange={(event) => setManySouhaitAcquisitionDurant(event)}
                                                value={item}
                                                checked={information.souhaitAcquisitionDurant?.includes(item)}
                                             />
                                             <span>{item}</span>
                                          </label>
                                       </>
                                    ))}
                                 </>
                              )}
                           </div>
                        </div>
                     </div>

                     <div name="niveauConnaissance" className="divChamp">
                        <div name="niveauConnaissance" className="subDivChamp">
                           <label className="labelSignIn" style={{ fontWeight: 500 }}>
                              Évaluez votre niveau de connaissance dans le domaine de la formation (quelle formation ?){" "}
                           </label>
                           <select
                              id="region-select"
                              className="inputSignIn"
                              onChange={(event) =>
                                 setInformation((prevForm) => ({
                                    ...prevForm,
                                    niveauConnaissance: event.target.value,
                                 }))
                              }
                              value={information.niveauConnaissance || ""}
                           >
                              <option value="">-- Choisissez un niveau de connaissance --</option>

                              <option value={"Débutant"}>{"Débutant (Aucune connaissance préalable)"}</option>
                              <option value={"Novice"}>{"Novice (Connaissance de base)"}</option>
                              <option value={"Intermédiaire"}>
                                 {"Intermédiaire (Connaissance moyenne, quelques expériences)"}
                              </option>
                              <option value={"Avancé"}>{"Avancé (Solides compétences et expériences)"}</option>
                              <option value={"Expert"}>{"Expert (Niveau élevé de compétence et d’expérience)"}</option>
                           </select>
                        </div>
                     </div>

                     <div name="formaFormation" className="divChamp">
                        <div name="formaFormation" className="subDivChamp">
                           <label className="labelSignIn" style={{ fontWeight: 500 }}>
                              Quelles sont vos préférences d'apprentissage{" "}
                           </label>
                           <div
                              style={{
                                 display: "flex",
                                 flexDirection: "column",
                                 justifyContent: "space-between",
                                 flexWrap: "wrap",
                                 padding: 12,
                              }}
                           >
                              {listFromatFormation.map((item) => (
                                 <>
                                    <label className="labelSignIn">
                                       <input
                                          type="checkbox"
                                          style={{ width: 20, height: 20, marginRight: 5 }}
                                          value={item}
                                          checked={information.formatFormation?.includes(item)}
                                          onChange={(event) => setManyFormatFormation(event)}
                                       />
                                       <span>{item}</span>
                                    </label>
                                 </>
                              ))}
                           </div>
                        </div>
                     </div>

                     <h5>Vos Attentes spécifiques par rapport a cette formation</h5>

                     <div name="souhaitAcquisitionDurant" className="divChamp">
                        <div name="souhaitAcquisitionDurant" className="subDivChamp">
                           <label className="labelSignIn" style={{ fontWeight: 500 }}>
                              Qu’espérez-vous acquérir à la fin de cette formation ?
                           </label>
                           <textarea
                              style={{ padding: 5, borderRadius: 5 }}
                              type="text"
                              rows={3}
                              value={information.souhaitAcquisitionFin}
                              placeholder={"Ecrire ici..."}
                              onChange={(event) =>
                                 setInformation((prevForm) => ({
                                    ...prevForm,
                                    souhaitAcquisitionFin: event.target.value,
                                 }))
                              }
                           />
                        </div>
                     </div>

                     {formInscription?.gammeEtudiant?.code === "C001" ? (
                        <>
                           <div name="connaissanceMarcheLocal" className="divChamp">
                              <div name="connaissanceMarcheLocal" className="subDivChamp">
                                 <label className="labelSignIn" style={{ fontWeight: 500 }}>
                                    Quelle connaissance avez-vous du marché local africain ? quelle connaissance
                                    avez-vous pour développer votre entreprise ?{" "}
                                 </label>
                                 <textarea
                                    style={{ padding: 5, borderRadius: 5 }}
                                    type="text"
                                    rows={3}
                                    value={information.connaissanceMarcheLocal}
                                    placeholder={"Ecrire ici..."}
                                    onChange={(event) =>
                                       setInformation((prevForm) => ({
                                          ...prevForm,
                                          connaissanceMarcheLocal: event.target.value,
                                       }))
                                    }
                                 />
                              </div>
                           </div>
                        </>
                     ) : (
                        <>
                           <div name="souhaitFormation" className="divChamp">
                              <div name="souhaitFormation" className="subDivChamp">
                                 <label className="labelSignIn" style={{ fontWeight: 500 }}>
                                    Quelles compétences ou sujets spécifiques aimeriez-vous particulièrement aborder au
                                    cours de cette formation?
                                 </label>
                                 <textarea
                                    style={{ padding: 5, borderRadius: 5 }}
                                    type="text"
                                    rows={3}
                                    value={information.souhaitFormation}
                                    placeholder={"Ecrire ici..."}
                                    onChange={(event) =>
                                       setInformation((prevForm) => ({
                                          ...prevForm,
                                          souhaitFormation: event.target.value,
                                       }))
                                    }
                                 />
                              </div>
                           </div>
                        </>
                     )}

                     <div name="niveauConnexion" className="divChamp">
                        <div name="niveauConnexion" className="subDivChamp">
                           <label className="labelSignIn" style={{ fontWeight: 500 }}>
                              Quels est le niveau de connexion auquel vous avez accès ?
                           </label>
                           <textarea
                              style={{ padding: 5, borderRadius: 5 }}
                              type="text"
                              rows={3}
                              value={information.niveauConnexion}
                              placeholder={"Ecrire ici..."}
                              onChange={(event) =>
                                 setInformation((prevForm) => ({
                                    ...prevForm,
                                    niveauConnexion: event.target.value,
                                 }))
                              }
                           />
                        </div>
                     </div>

                     <div name="preferenceHoraire" className="divChamp">
                        <div name="preferenceHoraire" className="subDivChamp">
                           <label className="labelSignIn" style={{ fontWeight: 500 }}>
                              Avez-vous des contraintes ou préférences particulières concernant les horaires ou la durée
                              de la formation ?{" "}
                           </label>
                           <textarea
                              style={{ padding: 5, borderRadius: 5 }}
                              type="text"
                              rows={3}
                              value={information.preferenceHoraire}
                              placeholder={"Ecrire ici..."}
                              onChange={(event) =>
                                 setInformation((prevForm) => ({
                                    ...prevForm,
                                    preferenceHoraire: event.target.value,
                                 }))
                              }
                           />
                        </div>
                     </div>

                     <div name="autre_Commentaire" className="divChamp">
                        <div name="autre_Commentaire" className="subDivChamp">
                           <label className="labelSignIn">
                              Y a-t-il d’autres informations que vous aimeriez partager avec nous concernant vos
                              attentes, besoins ou préférences pour cette formation?{" "}
                           </label>
                           <textarea
                              style={{ padding: 5, borderRadius: 5 }}
                              type="text"
                              rows={3}
                              value={information.autreCommentaire}
                              placeholder={"Ecrire ici..."}
                              onChange={(event) =>
                                 setInformation((prevForm) => ({
                                    ...prevForm,
                                    autreCommentaire: event.target.value,
                                 }))
                              }
                           />
                        </div>
                     </div>
                  </>
               ) : formInscription?.gammeEtudiant?.code === "C003" ? (
                  <>
                     <h5>Vos Attentes spécifiques par rapport a cette formation</h5>

                     <div name="motivation_Famille" className="divChamp">
                        <div name="motivationFamille" className="subDivChamp">
                           <label className="labelSignIn">
                              Quels pourrait être votre motivation à suivre cette formation ?
                           </label>
                           <textarea
                              style={{ padding: 5, borderRadius: 5 }}
                              type="text"
                              rows={3}
                              value={information.motivation}
                              placeholder={"Ecrire ici..."}
                              onChange={(event) =>
                                 setInformation((prevForm) => ({
                                    ...prevForm,
                                    motivation: event.target.value,
                                 }))
                              }
                           />
                        </div>
                     </div>

                     <div name="souhaitAcquisitionDurant" className="divChamp">
                        <div name="souhait_Acquisition_Durant" className="subDivChamp">
                           <label className="labelSignIn">Que souhaitez-vous acquérir durant cette formation ? </label>
                           <textarea
                              style={{ padding: 5, borderRadius: 5 }}
                              type="text"
                              rows={3}
                              value={information.souhaitAcquisitionDurant}
                              placeholder={"Ecrire ici..."}
                              onChange={(event) =>
                                 setInformation((prevForm) => ({
                                    ...prevForm,
                                    souhaitAcquisitionDurant: event.target.value,
                                 }))
                              }
                           />
                        </div>
                     </div>

                     <div name="souhaitAcquisitionFin" className="divChamp">
                        <div name="souhait_Acquisition_Fin" className="subDivChamp">
                           <label className="labelSignIn">
                              Que souhaitez-vous acquérir au terme de cette formation ?
                           </label>
                           <textarea
                              style={{ padding: 5, borderRadius: 5 }}
                              type="text"
                              rows={3}
                              value={information.souhaitAcquisitionFin}
                              placeholder={"Ecrire ici..."}
                              onChange={(event) =>
                                 setInformation((prevForm) => ({
                                    ...prevForm,
                                    souhaitAcquisitionFin: event.target.value,
                                 }))
                              }
                           />
                        </div>
                     </div>

                     <div name="autre_Commentaire" className="divChamp">
                        <div name="autre_Commentaire" className="subDivChamp">
                           <label className="labelSignIn">
                              Y a-t-il d’autres informations que vous aimeriez partager avec nous concernant vos
                              attentes, besoins ou préférences pour cette formation?{" "}
                           </label>
                           <textarea
                              style={{ padding: 5, borderRadius: 5 }}
                              type="text"
                              rows={3}
                              value={information.autreCommentaire}
                              placeholder={"Ecrire ici..."}
                              onChange={(event) =>
                                 setInformation((prevForm) => ({
                                    ...prevForm,
                                    autreCommentaire: event.target.value,
                                 }))
                              }
                           />
                        </div>
                     </div>
                  </>
               ) : (
                  <>
                     <div name="motivation" className="divChamp">
                        <div name="motivation" className="subDivChamp">
                           <label className="labelSignIn" style={{ fontWeight: 500 }}>
                              Quelles sont vos principales motivations pour suivre cette formation ?{etoileSpanRed}
                           </label>
                           <textarea
                              style={{ padding: 5, borderRadius: 5 }}
                              type="text"
                              rows={3}
                              value={information.motivation}
                              placeholder={"Ecrire ici..."}
                              onChange={(event) =>
                                 setInformation((prevForm) => ({
                                    ...prevForm,
                                    motivation: event.target.value,
                                 }))
                              }
                           />
                        </div>
                     </div>
                     <div name="souhaitAcquisitionFin" className="divChamp">
                        <div name="souhait_Acquisition_Fin" className="subDivChamp">
                           <label className="labelSignIn" style={{ fontWeight: 500 }}>
                              Qu’espérez-vous accomplir à la fin de cette formation ?{etoileSpanRed}
                           </label>
                           <textarea
                              style={{ padding: 5, borderRadius: 5 }}
                              type="text"
                              rows={3}
                              value={information.souhaitAcquisitionFin}
                              placeholder={"Ecrire ici..."}
                              onChange={(event) =>
                                 setInformation((prevForm) => ({
                                    ...prevForm,
                                    souhaitAcquisitionFin: event.target.value,
                                 }))
                              }
                           />
                        </div>
                     </div>

                     <h5>Vos Attentes spécifiques</h5>

                     <div name="bienFondeUniversitaire" className="divChamp">
                        <div name="bien_Fonde_Universitaire" className="subDivChamp">
                           <label className="labelSignIn" style={{ fontWeight: 500 }}>
                              Selon vous quel est le bien-fondé d’une formation en entreprenariat en milieu
                              universitaire ?{etoileSpanRed}
                           </label>
                           <textarea
                              style={{ padding: 5, borderRadius: 5 }}
                              type="text"
                              rows={3}
                              value={information.bienFondeUniversitaire}
                              placeholder={"Ecrire ici..."}
                              onChange={(event) =>
                                 setInformation((prevForm) => ({
                                    ...prevForm,
                                    bienFondeUniversitaire: event.target.value,
                                 }))
                              }
                           />
                        </div>
                     </div>

                     <div name="disposerAccompagnement" className="divChamp">
                        <div name="disposer_Accompagnement" className="subDivChamp">
                           <label className="labelSignIn" style={{ fontWeight: 500 }}>
                              Que pensez-vous des étudiants qui entreprennent ? Êtes-vous disposez à les accompagner
                              dans leur projet d’entreprise ?{etoileSpanRed}
                           </label>
                           <textarea
                              style={{ padding: 5, borderRadius: 5 }}
                              type="text"
                              rows={3}
                              value={information.disposerAccompagnement}
                              placeholder={"Ecrire ici..."}
                              onChange={(event) =>
                                 setInformation((prevForm) => ({
                                    ...prevForm,
                                    disposerAccompagnement: event.target.value,
                                 }))
                              }
                           />
                        </div>
                     </div>

                     <div name="preferenceHoraire" className="divChamp">
                        <div name="preferenceHoraire" className="subDivChamp">
                           <label className="labelSignIn" style={{ fontWeight: 500 }}>
                              Avez-vous des contraintes ou préférences particulières concernant les horaires ou la durée
                              de la formation ?{" "}
                           </label>
                           <textarea
                              style={{ padding: 5, borderRadius: 5 }}
                              type="text"
                              rows={3}
                              value={information.preferenceHoraire}
                              placeholder={"Ecrire ici..."}
                              onChange={(event) =>
                                 setInformation((prevForm) => ({
                                    ...prevForm,
                                    preferenceHoraire: event.target.value,
                                 }))
                              }
                           />
                        </div>
                     </div>

                     <div name="autre_Commentaire" className="divChamp">
                        <div name="autre_Commentaire" className="subDivChamp">
                           <label className="labelSignIn">
                              Y a-t-il d’autres informations que vous aimeriez partager avec nous concernant vos
                              attentes, besoins ou préférences pour cette formation?{" "}
                           </label>
                           <textarea
                              style={{ padding: 5, borderRadius: 5 }}
                              type="text"
                              rows={3}
                              value={information.autreCommentaire}
                              placeholder={"Ecrire ici..."}
                              onChange={(event) =>
                                 setInformation((prevForm) => ({
                                    ...prevForm,
                                    autreCommentaire: event.target.value,
                                 }))
                              }
                           />
                        </div>
                     </div>
                  </>
               )}
            </fieldset>
         )}

         {activeStep === 2 && (
            <fieldset>
               <legend ref={inputRef}>
                  Informations de <span style={{ color: "red", fontWeight: "bold" }}> Connexion</span>
               </legend>
               {error.step === 2 && (
                  <span style={{ color: "red", fontWeight: 700, fontSize: 17 }}>{error.textError}</span>
               )}
               <div name="password" className="divChamp">
                  <div className="subDivChamp">
                     <label className="labelSignIn">Mot de passse </label>
                     <div style={{ width: "100%", display: "flex", alignItems: "center", gap: 10 }}>
                        <input
                           maxLength={50}
                           style={{ width: "100%" }}
                           className="inputSignIn"
                           type={showPassWord ? "text" : "password"}
                           required
                           placeholder=""
                           value={formInscription.password}
                           onChange={(event) =>
                              setFormInscription((prevForm) => ({ ...prevForm, password: event.target.value }))
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
                     <label className="labelSignIn">Confirmer le mot de passse </label>
                     <div style={{ width: "100%", display: "flex", alignItems: "center", gap: 10 }}>
                        <input
                           maxLength={50}
                           className="inputSignIn"
                           style={{ width: "100%" }}
                           type={showPassWord02 ? "text" : "password"}
                           required
                           placeholder=""
                           value={formInscription.confirmPassword}
                           onChange={(event) =>
                              setFormInscription((prevForm) => ({ ...prevForm, confirmPassword: event.target.value }))
                           }
                        />
                        {showPassWord02 ? (
                           <VisibilityOffOutlinedIcon
                              onClick={() => {
                                 setShowPassWord02(false);
                              }}
                           />
                        ) : (
                           <VisibilityOutlinedIcon
                              onClick={() => {
                                 setShowPassWord02(true);
                              }}
                           />
                        )}
                     </div>
                  </div>
                  {errorServeur && <MessageErrorServeur />}
               </div>
            </fieldset>
         )}

         {activeStep === 3 && (
            <fieldset>
               <legend ref={inputRef}>
                  Enregistrement <span style={{ color: "green", fontWeight: "bold" }}> ...</span>
               </legend>
            </fieldset>
         )}

         {activeStep >= 0 && (
            <div className="divContainButton">
               {/* <Button color="error" variant="contained" disabled={activeStep === 4} size={tailleBouton}>
                  Annuler
               </Button> */}
               <span>.</span>
               <div style={{ display: "flex", gap: 10 }}>
                  <Button
                     variant="outlined"
                     onClick={handleBack}
                     disabled={activeStep === -1 || activeStep === 5}
                     // size={tailleBouton}
                  >
                     Precedant
                  </Button>
                  {activeStep >= steps.length - 1 ? (
                     <Button onClick={() => actionSaveEtudiant()} variant="contained" size={tailleBouton}>
                        Enregister
                     </Button>
                  ) : (
                     <Button variant="contained" size={tailleBouton} onClick={handleNext}>
                        Suivant
                     </Button>
                  )}
               </div>
            </div>
         )}

         <div style={{ marginTop: 15, cursor: "pointer", marginBottom: 10 }}>
            <span>
               Vous avez déja un compte?{" "}
               <Link to={"/signIn"} style={{ textDecoration: "none" }}>
                  <span style={{ color: "green", fontWeight: "bold" }}>{"Connectez-vous"}</span>
               </Link>
            </span>
         </div>
      </>
   );
}

/**
 *
 *
 * ["#51b447","#0877bf","#fa9401","#ed1d22","#ed2025","#713896","#fa9401","#51b447"]
 */

function decomposeChaine(chaine) {
   // Séparateur à utiliser pour la découpe
   chaine = chaine ? chaine : "";
   const separateur = "::";

   // Utilisation de la méthode split() pour découper la chaîne
   const tableauSousChaines = chaine.split(separateur);

   return tableauSousChaines;
}

function reconstituerChaine(tableauSousChaines, separateur = "::") {
   // Utilisation de la méthode join() pour joindre les éléments du tableau
   // avec le séparateur spécifié
   return tableauSousChaines.join(separateur);
}

function contientChaine(tableauSousChaines, chaineARetrouver) {
   // Utilisation de la méthode includes() pour vérifier si la chaîne est présente dans le tableau
   return tableauSousChaines.includes(chaineARetrouver);
}

function trouverIndexSousChaine(tableauSousChaines, chaineARetrouver) {
   // Utilisation de indexOf() pour trouver l'index de la première occurrence
   return tableauSousChaines.indexOf(chaineARetrouver);
}

function trouverIndexSousChaineContenant(tableauSousChaines, chaineAChercher) {
   // Parcourir chaque sous-chaîne du tableau
   for (let i = 0; i < tableauSousChaines.length; i++) {
      const sousChaine = tableauSousChaines[i];
      // Si la sous-chaîne contient la chaîne à chercher, retourner son index
      if (sousChaine.includes(chaineAChercher)) {
         return i;
      }
   }
   // Si la chaîne n'a pas été trouvée, retourner -1
   return -1;
}

function supprimerElementParIndex(tableau, index) {
   // Vérification si l'index est valide
   if (index >= 0 && index < tableau.length) {
      // Utilisation de splice pour supprimer l'élément
      tableau.splice(index, 1);
      return tableau;
   } else {
      //console.error("Index invalide");
      return tableau; // Le tableau n'est pas modifié si l'index est invalide
   }
}

function supprimerElementsContenantSousChaine(tableau, sousChaine) {
   // Créer une copie du tableau pour ne pas modifier l'original
   const nouveauTableau = [...tableau];

   // Parcourir le tableau en partant de la fin pour éviter les décalages d'indices
   for (let i = nouveauTableau.length - 1; i >= 0; i--) {
      const element = nouveauTableau[i];

      // Si l'élément contient la sous-chaîne, on le supprime avec splice()
      if (element.includes(sousChaine)) {
         nouveauTableau.splice(i, 1);
      }
   }

   return nouveauTableau;
}

const item01MotivationEntrep = "Améliorer l’organisation et le fonctionnement de mon entreprise";
const item02MotivationEntrep = "Améliorer mes compétences professionnelles";
const item03MotivationEntrep =
   "Répondre aux exigences de mon environnement de travail (fournisseur, client, employés, les impôts, etc…)";
//const item04MotivationEntre="Améliorer mes compétences professionnelles"

const item01DurantEntrep = "Avoir une meilleure gestion de ma comptabilité";
const item02DurantEntrep = "Avoir une meilleure gestion de mon personnel";
const item03DurantEntrep = "Avoir une meilleure gestion de ma clientèle";
const item04DurantEntrep = "Mieux gérer mes fournisseurs";

//const item02niveauConnai = "Débutant";

const formaFormationPresentiel = "formation en présentiel";
const formaFormationEnLigne = "formation en ligne";
const formaFormationTutoriels = "Tutoriels";
const formaFormationEtudeDeCas = "Etudes de cas";

const listFromatFormation = [
   formaFormationPresentiel,
   formaFormationEnLigne,
   formaFormationTutoriels,
   formaFormationEtudeDeCas,
];
//

const item01MotivationEtudiant = "Initier et lancer mon projet d’entreprise";
const item02MotivationEtudiant = "Préparer ma carrière professionnelle";
const item03MotivationEtudiant = "Améliorer mes compétences professionnelles";
const item04MotivationEtudiant = "Acquérir de nouvelles connaissances";
const item05MotivationEtudiant =
   "Répondre aux exigences de mon environnement de travail (fournisseur, client, employés, les impôts, etc…)";
const item06MotivationEtudiant = "Préparer une certification ou un examen";

//
const item01DurantEtudiant = "Voir mon projet d’entreprise initié ou lancé";
const item02DurantEtudiant =
   "Maitriser de nouvelles compétences pratiques (Management, comptabilité, fiscalité, finance, gestion du personnel)";
const item03DurantEtudiant = "Renforcer mes compétences en communication";
const item04DurantEtudiant = "Développer un réseau de partenaire et investisseurs";
const item05DurantEtudiant = "Améliorer organisation et le fonctionnement de mon projet/entreprise";
const item06DurantEtudiant = "Rentabiliser mon entreprise/projet";
const item07DurantEtudiant = "Gagner en confiance pour relever de nouveaux défis";

const listItemModitvationEtudiant = [
   item01MotivationEtudiant,
   item02MotivationEtudiant,
   item03MotivationEtudiant,
   item04MotivationEtudiant,
   item05MotivationEtudiant,
   item06MotivationEtudiant,
];

const listetemDurantEtudiant = [
   item01DurantEtudiant,
   item02DurantEtudiant,
   item03DurantEtudiant,
   item04DurantEtudiant,
   item05DurantEtudiant,
   item06DurantEtudiant,
   item07DurantEtudiant,
];

const listNiveauScolaire = ["Primaire", "Secondaire", "Supérieur"];
