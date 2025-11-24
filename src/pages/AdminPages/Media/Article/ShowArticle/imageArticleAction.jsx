import React, { useContext, useEffect, useRef, useState } from "react";
import SaveComponent from "../../../../../composants/SaveComponent";
import { Button } from "@mui/material";
import { MessageErrorServeur } from "../../../../../composants/MessageComponent";
import { AppContext } from "../../../../../context";
import { Image } from "react-bootstrap";

export function FormAddImageArticle({ update, setUpdate, idArticle, texte }) {
   const requestURL = `/admin/imagearticle/${idArticle}`;
   const [errorServeur, setErrorServeur] = useState(false);
   const [error, setError] = useState({
      textError: null,
   });

   const [save, setSave] = useState(false);
   const [file, setFile] = useState();

   const onAction = () => {
      //console.log("==file send==", file);
      if (!save) {
         setSave(true);
      } else {
         setSave(false);
         setTimeout(() => {
            setSave(true);
         }, 100);
      }
   };

   const setFileSelected = (event) => {
      if (event.target.files) {
         //console.log("==file selected==", event.target.files[0]);
         setFile(event.target.files[0]);
      } else {
         setFile(null);
      }
   };

   return (
      <>
         {save ? (
            <SaveComponent
               setSave={setSave}
               save={save}
               requestURL={requestURL}
               requestBody={file}
               requestMethode={"POST"}
               requestParam={null}
               setErrorServeur={setErrorServeur}
               setError={setError}
               setUpdate={setUpdate}
               isMultipart={true}
            />
         ) : null}
         <form encType="multipart/form-data">
            <div
               style={{
                  margin: "5px",
                  marginTop: "10px",
                  display: "flex",
                  flexDirection: "row",
               }}
            >
               <div style={{ margin: "5px" }}>
                  <label htmlFor="profile_pic">{texte ? texte : "Ajouter une Image pour cet article"} </label>
                  <input
                     type="file"
                     id="setimage"
                     name="setimage"
                     accept=".jpg, .jpeg, .png"
                     onChange={(event) => setFileSelected(event)}
                  />
               </div>
               <div style={{ display: "flex", flexDirection: "column" }}>
                  {file && (
                     <Button
                        variant="contained"
                        onClick={() => onAction()}
                        color={"success"}
                        style={{ fontWeight: "700", color: "white" }}
                     >
                        Enregistrer
                     </Button>
                  )}

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
               </div>
            </div>
         </form>
      </>
   );
}

export function DisplayImage({ idImage, idArticle, setUpdate, update }) {
   const { serveurURL } = useContext(AppContext);
   const [save, setSave] = useState(false);
   const [show, setShow] = useState(false);
   const [action, setAction] = useState(false);

   const imgurl = serveurURL + "/image/article/" + idImage;
   const imageRef = useRef();
   useEffect(() => {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Connection", "Keep-alive");

      const username = "admin";
      const password = "passwordadmin237";
      const base64Credentials = btoa(username + ":" + password); // Encode en base64

      myHeaders.append("Authorization", "Basic " + base64Credentials);

      var myInit = {
         method: "GET",
         headers: myHeaders,
         mode: "cors",
         cache: "default",
         body: null,
      };

      fetch(imgurl, myInit)
         .then((res) => res.blob()) // Gets the response and returns it as a blob
         .then((blob) => {
            setShow(true);
            let objectURL = URL.createObjectURL(blob);
            //console.log(imageRef.current);
            if (imageRef.current) {
               imageRef.current.src = objectURL;
            }
         });
   }, [action, update, imgurl]);

   return (
      <div style={{ padding: "0px", maxWidth: "100%", width: "100%", height: "100%" }}>
         <Image
            ref={imageRef}
            id="myImg"
            rounded
            style={{ maxWidth: "100%", width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
         />
      </div>
   );
}

export function DeleteImage({ idArticle, setUpdate }) {
   const requestURL = `/admin/imagearticle/${idArticle}`;
   const [errorServeur, setErrorServeur] = useState(false);
   const [error, setError] = useState({
      textError: null,
   });

   const [save, setSave] = useState(false);

   return (
      <>
         <div style={{ margin: 10 }}>
            <Button
               variant="contained"
               color="error"
               onClick={() => {
                  setSave(true);
               }}
            >
               Supprimer cette Image
            </Button>
            {save ? (
               <SaveComponent
                  setSave={setSave}
                  save={save}
                  requestURL={requestURL}
                  requestBody={null}
                  requestMethode={"DELETE"}
                  requestParam={null}
                  setErrorServeur={setErrorServeur}
                  setError={setError}
                  setUpdate={setUpdate}
               />
            ) : null}

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
         </div>
      </>
   );
}
