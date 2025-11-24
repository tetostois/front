import React, { useContext } from "react";
import { isMobile } from "react-device-detect";
//Bootstrap and jQuery libraries
import "bootstrap/dist/css/bootstrap.min.css";

//import "antd/dist/antd.css";
import Header from "../../composants/Header/index";
import "./homeCSS.css";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import SignInSignUp from "../../composants/SignInSignUp";
import { AppContext } from "../../context";
import { removeUserCookie } from "../../utils/fonctions";

const tabulation = <span style={{ padding: "0 0 0 20px" }}></span>;

const HomeAncien = () => {
   const { language, setLanguage, setUser, user } = useContext(AppContext);
   const navigation = useNavigate();
   let isFrench = language === "FR";
   const deconnexion = () => {
      setUser(null);
      removeUserCookie();
      navigation("/");
   };

   return (
      <>
         <Header />
         <div style={{ display: "flex", justifyContent: "center" }}>
            <div
               className="mainDivHome001"
               style={{ display: "flex", flexDirection: "column", gap: 15, padding: isMobile ? 10 : 30 }}
            >
               <div style={{ textAlign: isMobile ? "center" : "left" }}>
                  <h3 className={"spantitle1"}>
                     {isFrench ? (
                        <>
                           Programme de capacitation des <span style={{ color: "#FDA811" }}>entrepreneurs </span> à
                           l’auto rentabilité et à la gestion d’entreprise : entreprises locales à fort potentiel
                           d’import substitution
                        </>
                     ) : (
                        <>
                           <span style={{ color: "#FDA811" }}>Entrepreneurs’</span> SelfProfitability and Business
                           Management Capacity Program: Local company with strong import-substitution potential
                        </>
                     )}

                     {/* Programme de Capacitation <span style={{ color: "#FDA811" }}>entrepreneurial</span> */}
                  </h3>
               </div>
               <div className="divSoustexte" style={{ textAlign: isMobile ? "center" : "left" }}>
                  {isFrench ? (
                     <>
                        <span>
                           <span style={{ fontWeight: "700" }}>Plus de 1000 jeunes </span> formés aux notions
                           elementaires de l'entrepreurnariat, de la gestion d'entreprise et de l'autorentabilité.
                           <Link to={"/apropos"} style={{ textDecorationLine: "none" }}>
                              {" "}
                              <span style={{ color: "red" }}>En savoir plus...</span>
                           </Link>
                        </span>
                     </>
                  ) : (
                     <>
                        <span>
                           <span style={{ fontWeight: "700" }}>More than 1,000 young entrepreneurs </span> trained in
                           basic entrepreneurship, business management and self-profitability.
                           <Link to={"/apropos"} style={{ textDecorationLine: "none" }}>
                              {" "}
                              <span style={{ color: "red" }}>Learn more...</span>
                           </Link>
                        </span>
                     </>
                  )}
               </div>
               <div
                  style={{
                     display: "flex",
                     flexDirection: "row",
                     gap: isMobile ? 5 : 25,
                     flexWrap: "wrap",
                     justifyContent: isMobile ? "space-evenly" : "flex-start",
                  }}
               >
                  {!user ? (
                     <>
                        <SignInSignUp signIn={false} classButtom="boutton01" variantButton="contained" />
                        <SignInSignUp signIn={true} classButtom="boutton01" variantButton="outlined" />
                     </>
                  ) : (
                     <div className="buttonAction">
                        <Button variant="outlined" color="error" onClick={() => deconnexion()}>
                           {isFrench ? "Deconnexion" : "LogOut"}
                        </Button>
                        <Button
                           variant="contained"
                           color="error"
                           style={{ marginLeft: 10 }}
                           onClick={() => navigation("/dashboard")}
                        >
                           {isFrench ? "Tableau de bord" : "Dashboard"}
                        </Button>
                     </div>
                  )}
               </div>

               <div style={{ marginBottom: 15 }}>
                  <h3>{isFrench ? "Contexte" : "Background"}</h3>
                  <p name="texte de presentation du Programme de Massification Entrepreneuriale">
                     {tabulation}
                     {isFrench ? (
                        <>
                           Le Cameroun regorge de nombreux atouts et potentialités, à même de déservir la forte demande
                           de l'économie Nationale et Sous-régionale en Afrique. Cependant les défis liés à une
                           production insuffisante et à la concurrence des produits importés entravent la solidification
                           et le développement compétitif et durable de cette économie potentielle.Dans les faits il
                           faut considérer que, la faiblesse de la production et du faible taux de transformation,
                           résultant de l’état embryonnaire de l’industrialisation des process, favorisent la
                           prolifération des produits importés sur le marché local. Cet état de chose justifie à
                           suffisance la balance commerciale hautement déficitaire, estimé selon l’Institut National des
                           Statistiques à 1. 478 milliards de FCFA.
                        </>
                     ) : (
                        <>
                           Cameroon is full of many assets and potential that can serve the strong demand of the
                           national and subregional economy in Africa. However, the challenges associated with
                           insufficient production and competition from imported products hinder the solidification, the
                           competitive and sustainable development of this potential economy. In fact, it must be
                           considered that the low production and processing rate, resulting from the embryonic state of
                           process industrialisation, favours the proliferation of imported products on the local
                           market. This state of affairs sufficiently justifies the high trade deficit, estimated
                           according to the National Institute of Statistics at 1.478 billion CFA francs.
                        </>
                     )}
                     <br />
                     <br />
                     {isFrench ? (
                        <>
                           Pour inverser ces processus, et favoriser la restructuration industrielle du Pays, le
                           gouvernement du Cameroun a initié le processus d’Import-Substitution qui consiste à réduire
                           l’importation et favoriser la consommation de la production locale. Pour ce faire il souhaite
                           renforcer les compétences des jeunes dirigeants et créateurs d’entreprises locales de même
                           que leurs aptitudes à irriger durablement des industries rentables compétitives sur le plan
                           National et International. Il a ainsi mandaté l’Institut de Recherche en Intelligences de la
                           création et de la mise en œuvre du Programme de Capacitation des 1000 jeunes Entrepreneurs.
                        </>
                     ) : (
                        <>
                           To reverse these processes, and promote the country’s industrial restructuring, the
                           Cameroonian government has initiated the Import Substitution process, which consists in
                           reducing imports and promoting consumption of local production. In order to do this, it
                           wishes to strengthen the skills of young leaders and creators of local businesses and their
                           skills to build sustainable, profitable industries that are competitive at national and
                           international level. It has thus mandated the Institute for Research in Intelligence to
                           create and implement the 1000 Young Entrepreneurs Capability Program.
                        </>
                     )}
                     <br />
                     <br />
                     <span style={{ fontWeight: 700, padding: "0 0 0 20px" }}>
                        {" "}
                        {isFrench
                           ? " Le programme de Capacitation des 1000 Jeunes entrepreneurs à l’auto-rentabilité et au fonctionnement "
                           : "The 1000 Young Entrepreneurs SelfProfitability and Functioning Capacity Program "}
                     </span>
                     {isFrench ? (
                        <>
                           est une initiative dont la vision est de capitaliser sur les ressources locales créatrices de
                           valeur ajoutée et de promouvoir l’entrepreneuriat pour tous, en Afrique et au Cameroun. Afin
                           d’atteindre les objectifs visés par la politique d’import-substitution au Cameroun, ce
                           programme entend favoriser le partage d’expériences, renforcer les capacités pratiques et la
                           maitrise des process locaux de gestion entrepreneuriale d’entreprise durables compétitives ,
                           et de former en leadership l’écosystème immédiat de l’Entrepreneur. À la fin de ce programme
                           de formation, l’Etat du Cameroun sera riche d’environ 5000 Chefs d’entreprise et porteurs de
                           projets qui seront capacités au leadership, au fonctionnement efficace, à l’auto rentabilité,
                           à la structuration et à la gouvernance de leurs entreprises.
                        </>
                     ) : (
                        <>
                           is an initiative whose vision is to capitalise on local resources that create added value and
                           promote entrepreneurship for all, in Africa and Cameroon. In order to achieve the objectives
                           of the import-substitution policy in Cameroon, this programme aims to promote the sharing of
                           experience; strengthen the practical capacities and mastery of local processes of competitive
                           sustainable enterprise entrepreneurship management; and to train in leadership the immediate
                           ecosystem of the Entrepreneur. By the end of this training programme, Cameroon will have
                           around 5,000 entrepreneurs and project leaders who will be capable of providing leadership,
                           efficient operation, self-profitability, structuring and governance to their companies.
                        </>
                     )}
                  </p>
               </div>

               <div style={{ marginBottom: 15 }}>
                  <h3>{isFrench ? "LES ACTIVITÉS DU PROGRAMME" : "PROGRAMME ACTIVITIES"}</h3>
                  <p>
                     {isFrench ? (
                        <>
                           La Capacitation au fonctionnement durable et à l’auto rentabilité de chacun des 1000
                           Entrepreneurs ou du porteur de projet est la principale activité du Programme. Elles se
                           décline selon les savoir-faire suivants, dont l’Entrepreneur bénéficiera :{" "}
                        </>
                     ) : (
                        <>
                           The ability of each of the 1,000 Entrepreneurs and Project Leaders to operate sustainably and
                           be self-profitable is the main activity of the Programme. It is based on the following
                           know-how which the Entrepreneur will benefit from :
                        </>
                     )}
                     <ul>
                        <li>
                           <span style={{ fontWeight: 700 }}>
                              {isFrench ? "Phase de Formation Présentielle:" : "ClassTraining Phase :"}{" "}
                           </span>
                           {isFrench ? (
                              <>
                                 Durant 6 jours, Au moins 100 entrepreneurs dans chaque région du Cameroun sont
                                 collectivement capacités par des formateurs et encadreurs issues du Top Management de
                                 grandes multinationales Africaines :MTN, ACTIVA, ECOBANK, DANGOTE,AFRILAND FISRT BANK,
                                 BOISSONS DU CAMEROUN, etc. Des Dirigeants d’Entreprises africaines Leaders du marché
                                 local complexe depuis au moins 10 années dans chacun des secteurs entrepreneuriaux
                                 d’import-substitution, formeront : DOVV, ZÉNITH ASSURANCE, DOUBLE T CREATIVE, OBIV
                                 Solutions, CABINET ELESYST, etc.
                                 <br />
                                 <br />
                                 Cette phase sera encadré par des sessions de cours, des conférences et ateliers
                                 présentiels de travail.
                              </>
                           ) : (
                              <>
                                 During 06 days, at least 100 entrepreneurs in each region of Cameroon are collectively
                                 trained by trainers and coaches from the Top Management of large African
                                 multinationals: , ACTIVA, DANGOTE, AFRILAND FISRT BANK, etc. Leaders of African
                                 companies that have been leaders of the complex local market for at least 10 years in
                                 each of the import-substitution entrepreneurial sectors, will train: DOVV, ZÉNITH
                                 ASSURANCE, DOUBLE T CREATIVE, OBIV Solutions, ELESYSTCABINET, etc..
                                 <br />
                                 <br />
                                 This phase will be framed by lectures, lectures and face-to-face workshops.
                              </>
                           )}
                        </li>

                        <li>
                           <span style={{ fontWeight: 700 }}>
                              {isFrench ? "Phase de formation en ligne:" : "On-line training phase:"}{" "}
                           </span>
                           {isFrench ? (
                              <>
                                 Durant 3 semaines, les pratiques et applications des process acquis pendant la
                                 formation présentielle se feront entre les entrepreneurs et les acteurs de suivi sur le
                                 terrain et sur le marché.
                              </>
                           ) : (
                              <>
                                 During 03 weeks, the practices and applications of the processes acquired during
                                 in-person training will take place between the entrepreneurs and the monitoring actors
                                 in the field and on the market.
                              </>
                           )}
                        </li>
                     </ul>
                  </p>
               </div>

               <div style={{ marginBottom: 15 }}>
                  <h3>
                     {isFrench
                        ? "OBJECTIFS ET ACTIVITÉS SPÉCIFIQUES CONNEXES"
                        : "SPECIFIC RELATED OBJECTIVES AND ACTIVITIES"}
                  </h3>
                  <p>
                     {isFrench
                        ? "Les activités spécifiques connexes du programme visent à Impacter durablement les investisseurs ," +
                          "les familles d’Entrepreneurs , les étudiants et les enseignants autour la valorisation de leur" +
                          "potentiel entrepreneurial par :"
                        : "The specific related activities of the programme aim to have a lasting impact on investors, business" +
                          "families, students and teachers in developing their entrepreneurial potential through :"}
                     <ul>
                        <li>
                           {/* <span style={{ fontWeight: 700 }}>Phase de formation en ligne: </span> */}
                           {isFrench ? (
                              <>
                                 La formation des investisseurs locaux l’importance d’investir sur les projets locaux
                                 rentables et durables
                              </>
                           ) : (
                              <>
                                 Training local investors and the importance of investing in profitable and sustainable
                                 local projects
                              </>
                           )}
                        </li>
                        <li>
                           {isFrench ? (
                              <>
                                 L’initiation et la mise en place de 1000 Conseils d’administration ou comités de
                                 pilotages au sein des entreprises bénéficiaires du Programme, afin de leur permettre
                                 d’être structurées avec durabilité
                              </>
                           ) : (
                              <>
                                 Initiation and establishment of 1000 boards of directors or steering committees within
                                 the companies benefiting from the Programme, in order to enable them to be structured
                                 with sustainability
                              </>
                           )}
                        </li>
                        <li>
                           {isFrench ? (
                              <>
                                 La sensibilisation et la formation des 1000 familles au soutien des entrepreneurs et à
                                 La mise sur pieds des entreprises qui assureront leurs rentabilités sur le long terme
                              </>
                           ) : (
                              <>
                                 Raising awareness and training of 1,000 families to support entrepreneurs and set up
                                 businesses that will ensure their long-term profitability
                              </>
                           )}
                        </li>
                        <li>
                           {isFrench ? (
                              <>
                                 L’initiation et la certification de 1000 jeunes étudiants et élèves au leadership et à
                                 l’entrepreneuriat sur toute l’étendue du territoire national
                              </>
                           ) : (
                              <>
                                 Initiation and certification of 1,000 young students and students for leadership and
                                 entrepreneurship across the country
                              </>
                           )}
                        </li>
                        <li>
                           {isFrench ? (
                              <>
                                 La formation de 3000 enseignants à la pédagogie entrepreneuriale dans les 10 régions du
                                 Cameroun
                              </>
                           ) : (
                              <>Training of 3,000 teachers in entrepreneurial pedagogy in Cameroon's 10 regions</>
                           )}
                        </li>
                     </ul>
                  </p>
               </div>

               <div style={{ marginBottom: 15 }}>
                  <h3>{isFrench ? "PUBLIC CIBLE" : "TARGET AUDIENCE"}</h3>
                  <h5>1){isFrench ? " CIBLE PRINCIPALE" : " MAIN TARGET"}</h5>
                  <p>
                     {isFrench ? (
                        <>
                           <span style={{ fontWeight: 500 }}>Les Entrepreneurs et porteurs</span> de projets issues des
                           10 régions du Cameroun et investis dans les filières d’import substitution :{" "}
                           <span style={{ fontWeight: 500, fontStyle: "italic" }}>
                              cacao-café, l'huile de palme, le sucre, le riz, le maïs, la banane-plantain, le poisson,
                              le lait et la viande. Confection textile de coton, cuir et confection de chaussure,
                              transformation de bois, sprofessions libérales, etc
                           </span>
                        </>
                     ) : (
                        <>
                           <span style={{ fontWeight: 500 }}>Entrepreneurs and project leaders</span>from the 10 regions
                           of Cameroon invested in import substitution sectors:{" "}
                           <span style={{ fontWeight: 500, fontStyle: "italic" }}>
                              cocoa-coffee, palm oil, sugar, rice, maize, banana plantain, fish, milk and meat. Textile
                              making of cotton, leather and footwear, wood processing, professional services, etc.
                           </span>
                        </>
                     )}
                  </p>
                  <h5>2) {isFrench ? "CIBLES CONNEXE STRATÉGIQUE" : "STRATEGIC RELATED TARGET"}</h5>
                  <p>
                     {isFrench ? (
                        <>
                           Il s’agit de tout acteur permettant d’accompagner la solidification structurelle du tissu
                           Entrepreneuriale en temps réel:
                        </>
                     ) : (
                        <>
                           This is any actor that can support the structural solidification of the Entrepreneurial
                           fabric in real time:
                        </>
                     )}
                     <ul>
                        <li>
                           {isFrench ? (
                              <>
                                 <span style={{ fontWeight: 700 }}>Les investisseurs locaux </span>
                                 Il s’agit des personnes physiques ou morales ayant la capacité de mettre à disposition
                                 des financements pour le développement des entreprises appartenant aux entrepreneurs
                                 capacités dans le cadre du programme
                              </>
                           ) : (
                              <>
                                 <span style={{ fontWeight: 700 }}>Local investors </span>
                                 These are natural or legal persons with the capacity to provide financing for the
                                 development of enterprises belonging to capable entrepreneurs under the programme
                              </>
                           )}
                        </li>
                        <li>
                           {isFrench ? (
                              <>
                                 <span style={{ fontWeight: 700 }}>Les famille des 1000 Entrepreneurs: </span>
                                 Il s’agit des familles de l’entrepreneur capacité et qui constituent son principal
                                 pilier social et son principal apport en fond de roulement courant de démarrage.
                              </>
                           ) : (
                              <>
                                 <span style={{ fontWeight: 700 }}>Families of the 1000 Entrepreneurs: </span>
                                 These are the families of the Capacity Entrepreneur who are its main social pillar and
                                 its main source of current working capital for start-ups.
                              </>
                           )}
                        </li>

                        <li>
                           {isFrench ? (
                              <>
                                 <span style={{ fontWeight: 700 }}>Les Enseignants: </span>
                                 Il s’agit des enseignants à capacité et en Andragogie Entrepreneuriale
                              </>
                           ) : (
                              <>
                                 <span style={{ fontWeight: 700 }}>Teachers: </span>
                                 These are teachers to be able to teach in Entrepreneurial Andragogy
                              </>
                           )}
                        </li>

                        <li>
                           {isFrench ? (
                              <>
                                 <span style={{ fontWeight: 700, color: "black" }}> Les élèves et étudiants: </span>
                                 Il s’agit de tout élève ou étudiant inscrit au Cameroun, disposé à être initié au
                                 Leadership et a l’Entrepreneuriat et aux compétences professionnelles, afin de se
                                 projetter sur le long terme dans le processus de créations d’entreprises durables et
                                 rentables.
                              </>
                           ) : (
                              <>
                                 <span style={{ fontWeight: 700, color: "black" }}> Students: </span>
                                 Any student enrolled in Cameroon who is willing to be introduced to Leadership,
                                 Entrepreneurship and Professional Skills, in order to take a long-term perspective in
                                 the process of creating sustainable and profitable businesses.
                              </>
                           )}
                        </li>
                     </ul>
                  </p>
               </div>

               {/* <div style={{ marginBottom: 15 }}>
                  <h3>Presentation</h3>
                  <p name="texte de presentation du Programme de Massification Entrepreneuriale">
                     Le <span style={{ fontWeight: 700 }}>Programme de Massification Entrepreneuriale</span> est une
                     initiative ambitieuse visant à promouvoir l'esprit d'entreprise et les compétences en leadership au
                     sein de divers groupes socio-économiques au Cameroun. Ce programme a pour objectif de doter les
                     individus des connaissances, des outils et du soutien nécessaires pour créer, développer et
                     pérenniser des entreprises compétitives, contribuant ainsi à la croissance économique du pays, à la
                     création d'emplois et à la prospérité à long terme.
                  </p>
               </div>

               <div style={{ marginBottom: 15 }}>
                  <h3>Objectifs du programme</h3>
                  <p>
                     Le <span style={{ fontWeight: 700 }}>Programme de Massification Entrepreneuriale</span> poursuit un
                     objectif pluridimensionnel :
                     <ul>
                        <li>
                           <span style={{ fontWeight: 700 }}>
                              Renforcer les compétences en leadership et en entrepreneuriat{" "}
                           </span>
                           chez les jeunes, les étudiants, les enseignants et les familles d'entrepreneurs.
                        </li>
                        <li>
                           <span style={{ fontWeight: 700 }}>Soutenir les projets à fort potentiel </span>
                           chez les jeunes, les étudiants, les enseignants et les familles d'entrepreneurs.
                        </li>
                        <li>
                           <span style={{ fontWeight: 700 }}>Equiper les investisseurs </span>
                           des compétences nécessaires pour intégrer des capitaux dans des entreprises viables et guider
                           les projets matures dans la mise en place de conseils d'administration efficaces.
                        </li>
                     </ul>
                  </p>
               </div>
               <div style={{ marginBottom: 15 }}>
                  <h3>Public cible</h3>
                  <p>
                     Le <span style={{ fontWeight: 700 }}>Programme de Massification Entrepreneuriale</span> cible
                     stratégiquement des bénéficiaires clés :
                     <ul>
                        <li>
                           <span style={{ fontWeight: 700 }}>Jeunes porteurs de projets :</span> Equiper les aspirants
                           entrepreneurs des fondamentaux du leadership et du sens des affaires, leur permettant de
                           lancer et de développer des entreprises compétitives.
                        </li>

                        <li>
                           <span style={{ fontWeight: 700 }}>Jeunesse en général : </span>
                           Au-delà des porteurs de projets, le programme diagnostique le potentiel entrepreneurial des
                           jeunes individus et les intègre dans des programmes de formation au leadership et aux
                           compétences pour renforcer leur employabilité.
                        </li>
                        <li>
                           <span style={{ fontWeight: 700 }}>Etudiants et élèves : </span>
                           Favoriser l'esprit d'entreprise et le leadership chez les étudiants et les élèves, en les
                           préparant à de futures initiatives entrepreneuriales.
                        </li>

                        <li>
                           <span style={{ fontWeight: 700 }}>Educateurs : </span>
                           Offrir aux éducateurs une formation spécialisée en pédagogie entrepreneuriale, les habilitant
                           à intégrer efficacement des outils de renforcement des compétences entrepreneuriales dans
                           leurs programmes d'enseignement.
                        </li>

                        <li>
                           <span style={{ fontWeight: 700 }}>Projets à fort potentiel : </span>
                           Proposer un mentorat et un soutien ciblés aux projets prometteurs, en améliorant leurs
                           perspectives d'emploi et leur viabilité financière à long terme.
                        </li>

                        <li>
                           <span style={{ fontWeight: 700 }}>Familles d'entrepreneurs : </span>
                           Sensibiliser les familles à l'esprit d'entreprise, encourager leur implication et fournir des
                           outils pour identifier les talents entrepreneuriaux. De plus, le programme plaide pour une
                           culture de consommation des produits camerounais.
                        </li>
                        <li>
                           <span style={{ fontWeight: 700 }}>Investisseurs : </span>
                           Organiser des ateliers pour les investisseurs, les dotant des connaissances et des
                           compétences nécessaires pour intégrer efficacement des capitaux dans les entreprises.
                        </li>
                     </ul>
                     En autonomisant ces groupes divers, le
                     <span style={{ fontWeight: 700 }}>Programme de Massification Entrepreneuriale</span> vise à
                     stimuler la transformation économique et le développement durable au Cameroun.
                  </p>
               </div> */}
            </div>
         </div>
         {/* <img className='imageFille' src="/images/fille01.png" alt="une jeune ecoliere" /> */}
         <div className="imageFille" style={{ backgroundImage: "url(/images/fille01.png)" }}></div>

         <footer className="footerHome" style={{ backgroundImage: "url(/images/footerImage.png)" }}>
            .
            {/* <img src="/images/footerImage.png" alt="Ma superbe image" style={{ height: 150, bottom: 0, maxWidth: '100vw' }} /> */}
         </footer>
      </>
   );
};

export default HomeAncien;
