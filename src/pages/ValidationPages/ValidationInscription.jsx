import React, { useState } from "react";
import { useFetch } from "../../utils/hooks/FetchData";
import { useParams } from "react-router-dom";
import Footer from "../../composants/Footer";
import { Container, Row } from "react-bootstrap";
import Header from "../../composants/Header";
import { Backdrop, CircularProgress } from "@mui/material";
import { MessageErrorServeurWithVarialbleHeight } from "../../composants/MessageComponent";

export default function ValidationInscription() {
   const { lienConfirmation } = useParams();
   const [update, setUpdate] = useState(false);
   const { isLoading, data, error } = useFetch(
      `/login/validation/inscription/${lienConfirmation}`,
      "GET",
      null,
      null,
      update
   );
   return (
      <Container fluid style={{ width: "100%", padding: 0, margin: 0 }}>
         <Header />
         <Row style={{ justifyContent: "center" }}>
            <div className="mainDivConnexion">
               <div
                  className="divFormulaire"
                  style={{ display: "flex", flexDirection: "column" }}
                  //onKeyUp={(event) => handleKeyPress(event)}
               >
                  {isLoading ? (
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
                  ) : error ? (
                     <MessageErrorServeurWithVarialbleHeight />
                  ) : data.errorAPI ? (
                     <div style={{ color: "red" }}>
                        <span style={{ color: "red", fontSize: 17 }}>{data.message}</span>
                     </div>
                  ) : data.confirmation === -1 ? (
                     <>
                        <div>
                           <h2>Vos données ont bien été enregistrées.</h2>
                           <br />
                           <h3>
                              Pour terminer votre processus de validation, vous devez ouvrir l’e-mail qui a été envoyé à
                              votre adresse e-mail et cliquer sur le lien de validation.
                           </h3>
                        </div>
                     </>
                  ) : (
                     <>
                        <div>
                           <h2>Félicitations ! Votre compte est désormais valide. 😊</h2>
                           <br />
                           <h3>
                              La formation commence le 2 septembre 2024. À partir de cette date, vous pourrez vous
                              connecter à votre compte pour suivre votre formation.
                           </h3>
                        </div>
                     </>
                  )}
               </div>
            </div>
         </Row>

         <Footer />
      </Container>
   );
}
