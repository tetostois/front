import React from "react";
import "./AproposCSS.css";
import Header from "../../composants/Header";
import { BlocPartenaire } from "../Home";
import Footer from "../../composants/Footer";
import { Col, Row } from "react-bootstrap";
import SignInSignUp from "../../composants/SignInSignUp";

export default function Apropos02() {
   return (
      <>
         <Header />
         <div
            className="aboutHeroDiv"
            style={{
               backgroundImage:
                  "linear-gradient(270deg, rgba(2, 26, 10, 0.471) 63.5%, rgba(239, 39, 39, 0) 100%),url(/images/personneliri.jpg)",
            }}
         >
            <span className="quiSommeNousTest01">Qui sommes-nous ?</span>
            <span className="quiSommeNousTest02">LE PROGRAMME LEADERSHIP</span>
         </div>

         <div className="aboutResumeDiv">
            <div className="aboutResumeTitreDiv">
               <span>Résumé</span>
            </div>
            <div className="aboutResumetexteDiv">
               <span name="resume" className="aboutResumetexte">
                  L’Institut de Recherche en Intelligences (IRI) est une société à responsabilité limitée. Créée en 2016
                  avec pour siège Yaoundé, au lieudit Avenue Rosa Park Golf, et dont le capital est de 10 millions de
                  FCFA. Spécialisée dans la conception et la mise en œuvre des programmes de compétitivité, elle
                  accompagne le gouvernement du Cameroun dans le déploiement de ses politiques en faveur de la
                  croissance et du développement, tout en intégrant une forte participation du capital humain. C’est
                  dans cette optique qu’en 2016, elle a conçu le programme LEADERSHIP, qui a pour but de renforcer en
                  leadership, entrepreneuriat et compétences professionnelles pratiques locales, le capital humain
                  bénéficiaire de la Stratégie Nationale de Développement dans les secteurs de l’auto-employabilité, de
                  la bonne gouvernance et de l’éducation. Le groupe IRI, c’est également plusieurs secteurs d’activités
                  existants, parmi lesquels l’agro-industrie et la transformation minérale.
               </span>
            </div>
         </div>

         <div
            className="aboutAgendaDiv"
            style={{ display: "flex", flexDirection: "column", alignContent: "flex-start", justifyContent: "center" }}
         >
            <span className="aboutAgendaTitre">Agenda du programme 1000 Entrepreneurs jeunes</span>

            <span className="aboutAgendaItem">
               <b>Du 02 au 13 Septembre 2024 :</b> Premières Sessions d’initiation aux fondements du Leadership en Ligne
            </span>
            <span className="aboutAgendaItem">
               <b>11 septembre 2024:</b> cérémonie protocolaire de lancement du programme de formation des 1000 jeunes
               entrepreneurs
            </span>

            <span className="aboutAgendaItem">
               <b>Du 16 au 28 Septembre 2024 :</b> Sessions présentielles et pratiques sur le terrain dans les régions
            </span>
            <span className="aboutAgendaItem">
               26 Septembre 2024 : Évaluation des 100 Meilleurs projets Nationaux.{" "}
            </span>

            <span className="aboutAgendaItem">
               <b>Du 27 Septembre au 02 Octobre 2024 :</b> Exposition des 100 Entrepreneurs Nationaux au salon de
               l’entrepreneuriat
            </span>

            <span className="aboutAgendaItem">
               <b>02 Octobre 2024:</b> Cérémonie Nationale de clôture et de remise des attestations.
            </span>
         </div>

         <div className="aboutObjectifDiv">
            <div className="aboutSousObjectifDiv" style={{ borderColor: "#990599" }}>
               <span className="aboutObjectifTitre" style={{ color: "#990599" }}>
                  Fournir des compétences pratiques
               </span>
               <span className="aboutObjectifTexte">
                  Nous nous attachons à fournir des compétences pratiques qui correspondent aux exigences actuelles de
                  l'industrie. Nos cours sont conçus pour doter les apprenants des connaissances et des outils
                  nécessaires pour exceller dans leur domaine de prédilection.
               </span>
            </div>

            <div className="aboutSousObjectifDiv" style={{ borderColor: "orange" }}>
               <span className="aboutObjectifTitre" style={{ color: "orange" }}>
                  Favoriser la créativité
               </span>
               <span className="aboutObjectifTexte">
                  Nos cours permettent aux apprenants de développer leur propre style et de trouver des solutions
                  uniques aux problèmes.
               </span>
            </div>

            <div className="aboutSousObjectifDiv" style={{ borderColor: "green" }}>
               <span className="aboutObjectifTitre" style={{ color: "green" }}>
                  {" "}
                  Promouvoir la collaboration
               </span>
               <span className="aboutObjectifTexte">
                  Nous croyons au pouvoir de la collaboration et du travail d'équipe. Nos cours encouragent les
                  interactions entre les apprenants et leur permettent de développer des compétences de communication et
                  de collaboration essentielles.
               </span>
            </div>

            <div className="aboutSousObjectifDiv" style={{ borderColor: "#059ea7" }}>
               <span className="aboutObjectifTitre" style={{ color: "#059ea7" }}>
                  {" "}
                  Rester à l'avant-garde
               </span>
               <span className="aboutObjectifTexte">
                  Nous sommes passionnés par l'innovation et nous nous engageons à offrir des cours à la pointe des
                  dernières technologies et tendances du marché.
               </span>
            </div>
         </div>

         {/* <Row style={{ paddingTop: "100px", paddingBottom: "100px" }}>
            <Col xs={12} md={6}>
               <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                  <h1 style={{ fontSize: "47px" }}>
                     Ensemble,{" "}
                     <span style={{ color: "red", fontSize: "40px" }}>
                        façonnons l’avenir
                        <br />
                        l’avenir de l’entrepreneuriat au Cameroun
                     </span>
                     <br />
                  </h1>
                  <p style={{ fontSize: "18px" }}>
                     Rejoignez-nous dans cette passionnante aventure d’apprentissage et libérez votre potentiel dans le
                     domaine de la création et de la gestion d’entreprise
                  </p>
               </div>
            </Col>
            <Col xs={12} md={6}>
               <SignInSignUp />
            </Col>
         </Row> */}
         <BlocPartenaire />
         <Footer />
      </>
   );
}
