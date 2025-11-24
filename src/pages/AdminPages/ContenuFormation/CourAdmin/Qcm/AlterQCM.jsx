import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../../../../../utils/hooks/FetchData";
import { Button } from "react-bootstrap";
import {
   MessageErrorServeur,
   MessageErrorServeurWithVarialbleHeight,
} from "../../../../../composants/MessageComponent";
import { CircularProgress } from "@mui/material";
import FormQCM from "./FormQCM";

export default function AlterQCM() {
   const { idQcm } = useParams();
   const { idChapitre } = useParams();
   const navigation = useNavigate();
   const [update, setUpdate] = useState(false);
   const fecthQcm = useFetch(`/admin/qcm/${idQcm}`, "GET", null, null, update);
   const fecthChapitre = useFetch(`/admin/cour/${idChapitre}`, "GET", null, null, update);

   const [save, setSave] = useState(false);
   const [errorServeur, setErrorServeur] = useState(false);
   const [error, setError] = useState({
      textError: null,
   });

   const sauvegarde = () => {
      setError((prev) => ({ ...prev, textError: null }));
      setErrorServeur(false);
      setSave(true);
   };

   return (
      <>
         <div
            className="headerPage"
            style={{
               backgroundColor: "#17bd08cc",
               display: "flex",
               flexDirection: "row",
               justifyContent: "space-between",
            }}
         >
            <div id="Links" style={{ display: "flex", flexDirection: "column", fontWeight: "500", color: "white" }}>
               <span>
                  Modificationd'un QCM du Chapitre: {fecthChapitre.data ? fecthChapitre.data.chapitre?.titre : ""}
               </span>
               <span style={{ fontWeight: "normal" }}>
                  <Link to={"/cours"} style={{ textDecorationLine: "underline", color: "white" }}>
                     {" "}
                     Cours{" "}
                  </Link>
                  <span style={{ margin: "3px" }}> / </span>
                  <Link
                     to={`/qcm/alter/${idChapitre}/${idQcm}`}
                     style={{ textDecorationLine: "underline", color: "white" }}
                  >
                     {" "}
                     Modification d'un QCM : {fecthQcm.data?.intitule}
                  </Link>
                  <span style={{ margin: "3px" }}> / </span>
                  <Link to={`/cour/${idChapitre}`} style={{ textDecorationLine: "underline", color: "white" }}>
                     {fecthChapitre.data?.chapitre ? fecthChapitre.data.chapitre.titre : ""}
                  </Link>
               </span>
            </div>
            <div style={{ display: "flex", flexDirection: "row", gap: 5 }}>
               <Button variant="contained" onClick={() => sauvegarde()} color="success">
                  Enregistrer
               </Button>
               <Button
                  variant="contained"
                  onClick={() => {
                     navigation(-1);
                  }}
                  color="error"
               >
                  Annuler
               </Button>
            </div>
         </div>

         {errorServeur && <MessageErrorServeur />}

         {error.textError && (
            <div
               style={{
                  backgroundColor: "red",
                  color: "white",
                  padding: 10,
                  borderRadius: 5,
                  margin: 10,
                  fontSize: 16,
               }}
            >
               {error.textError}
            </div>
         )}
         {fecthChapitre.isLoading || fecthQcm.isLoading ? (
            <div style={{ marginLeft: "40%" }}>
               <CircularProgress size={40} />
            </div>
         ) : fecthChapitre.error || fecthQcm.error ? (
            <MessageErrorServeurWithVarialbleHeight />
         ) : (
            <FormQCM
               setSave={setSave}
               save={save}
               initialForm={fecthQcm.data}
               requestMethode="PUT"
               setError={setError}
               setErrorServeur={setErrorServeur}
            />
         )}
      </>
   );
}
