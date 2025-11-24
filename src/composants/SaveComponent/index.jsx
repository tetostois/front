import React, { useEffect } from "react";
import { useFetch } from "../../utils/hooks/FetchData";
//import { AppContext } from '../../context';
import { useNavigate } from "react-router-dom";
import { Backdrop, CircularProgress } from "@mui/material";

export default function SaveComponent({
   setErrorServeur,
   setSave,
   setOpen,
   setError,
   setActiveStep,
   requestBody,
   requestMethode,
   setUpdate,
   requestURL,
   requestParam,
   redirected,
   isMultipart,
   functionToExcecuteAfterGoodOperation,
}) {
   requestMethode = requestMethode ? requestMethode : "POST";
   requestURL = requestURL ? requestURL : "URL_non_defini";

   //const { isOnline, language, setUser } = useContext(AppContext);
   const { isLoading, data, error } = useFetch(
      requestURL,
      requestMethode,
      requestBody,
      requestParam,
      null,
      isMultipart
   );
   const navigation = useNavigate();
   console.log("donner envoyer en body == ", requestBody);
   // Effets post-réponse pour éviter setState pendant render
   useEffect(() => {
      if (isLoading) return;
      if (error) {
         setErrorServeur && setErrorServeur(true);
         setSave && setSave(false);
         return;
      }
      if (!isLoading && !error) {
         if (data?.errorAPI) {
            setError && setError((prevError) => ({ ...prevError, step: data.index, textError: data.message }));
            if (setActiveStep) {
               try {
                  setActiveStep(data.index);
               } catch (e) {
                  console.log("Impossible d'initialise activeStep via SetActiveStep, saveComponent  ==", e);
               }
            }
            setSave && setSave(false);
         } else {
            if (redirected === true) {
               navigation(data.url);
            } else if (functionToExcecuteAfterGoodOperation) {
               try {
                  functionToExcecuteAfterGoodOperation(data);
               } catch (e) {
                  console.log(
                     "Impossible d'executer la fonction apres succes d'une opreation fecth, saveComponent  ==",
                     e
                  );
               }
            }
            setUpdate && setUpdate((prevUpdate) => !prevUpdate);
            setOpen && setOpen(false);
            setSave && setSave(false);
         }
      }
   }, [isLoading, error, data, redirected, navigation, setActiveStep, setError, setErrorServeur, setOpen, setSave, setUpdate, functionToExcecuteAfterGoodOperation]);

   if (isLoading) {
      return (
         <div style={{ marginLeft: "40%" }}>
            {/* <CircularProgress size={40} /> */}
            <Backdrop open={true} style={{ zIndex: 1000, color: "#fff" }}>
               <CircularProgress
                  style={{
                     position: "absolute",
                     top: "50%",
                     left: "50%",
                     marginTop: "-20px",
                     marginLeft: "-20px",
                  }}
                  color="inherit"
               />
            </Backdrop>
         </div>
      );
   }
   return null;
}
