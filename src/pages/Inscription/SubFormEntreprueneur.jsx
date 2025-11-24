import { Step, StepLabel, Stepper } from "@mui/material";
import React, { useState } from "react";

const etoileSpanRed = <span style={{ color: "red" }}> *</span>;
const steps = ["Etape 1", "Etape 2", "Etape 3", "Etape 4"];

export default function SubFormEntreprueneur({
   formInscription,
   setFormInscription,
   error,
   setActiveStep,
   activeStep,
   errorServeur,
   actionSaveEtudiant,
}) {
   const [skipped, setSkipped] = useState(new Set());
   const isStepOptional = (step) => {
      return step === -1;
   };

   const isStepSkipped = (step) => {
      return skipped.has(step);
   };

   const handleNext = () => {
      console.log("etudiant == ", formInscription);

      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
         newSkipped = new Set(newSkipped.values());
         newSkipped.delete(activeStep);
      }

      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
   };

   const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
      //setSave(false);
      //setErrorServeur(false);
   };

   return (
      <>
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
            {activeStep === 1 && (
               <fieldset>
                  {error.step === 1 && (
                     <span style={{ color: "red", fontWeight: 700, fontSize: 17 }}>{error.textError}</span>
                  )}
                  <legend>
                     Informations <span style={{ color: "green" }}>Personnelles</span>
                  </legend>

                  <div name="nom_prenom" className="divChamp">
                     <div className="subDivChamp">
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
                     <div className="subDivChamp maginLeft">
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

                  <div name="date_lieu_naissane" className="divChamp">
                     <div className="subDivChamp">
                        <label className="labelSignIn">Date de Naisance{etoileSpanRed}</label>
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
                     <div className="subDivChamp maginLeft">
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

                  <div name="date_lieu_naissane" className="divChamp">
                     <div className="subDivChamp">
                        <label className="labelSignIn">Telephone{etoileSpanRed}</label>
                        <input
                           className="inputSignIn"
                           type="text"
                           maxLength={60}
                           required
                           placeholder="Ex: 675 01 ..."
                           value={formInscription.telephone}
                           onChange={(e) =>
                              setFormInscription((prevForm) => ({ ...prevForm, telephone: e.target.value }))
                           }
                        />
                     </div>
                  </div>

                  <div name="email" className="divChamp">
                     <div className="subDivChamp">
                        <label className="labelSignIn">Email{etoileSpanRed}</label>
                        <input
                           className="inputSignIn"
                           type="text"
                           maxLength={60}
                           required
                           placeholder="Ex: mon@mail.com"
                           value={formInscription.email}
                           onChange={(e) => setFormInscription((prevForm) => ({ ...prevForm, email: e.target.value }))}
                        />
                     </div>
                  </div>
               </fieldset>
            )}
         </div>
      </>
   );
}
