import { useContext } from "react";
import { AppContext } from "../../context";
import { Alert, AlertTitle } from "@mui/material";

export const MessageErrorServeur = () => {
   const { isOnline, language } = useContext(AppContext);

   if (isOnline) {
      return (
         <div style={{ width: "100%", marginBottom: "5px" }}>
            <Alert severity="error">
               <AlertTitle>Erreur</AlertTitle>
               <span>{language === "FR" ? "Probleme avec le serveur...!" : "Problem with the server...!"}</span>
            </Alert>
         </div>
      );
   } else {
      return (
         <div style={{ width: "100%", marginBottom: "5px" }}>
            <Alert severity="error">
               <AlertTitle>Erreur</AlertTitle>
               <span>
                  {language === "FR"
                     ? "Vous êtes hors connexion, contrôler votre connexion internet"
                     : "You are offline, check your internet connection"}
               </span>
            </Alert>
         </div>
      );
   }
};

export const MessageErrorServeurWithVarialbleHeight = ({ height }) => {
   return (
      <div
         style={{
            width: "100%",
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            padding: 10,
            margin: 10,
            borderRadius: 5,
            alignItems: "center",
            minHeight: height ? height : "400px",
            alignContent: "center",
            justifyContent: "center",
         }}
      >
         <MessageErrorServeur />
      </div>
   );
};
