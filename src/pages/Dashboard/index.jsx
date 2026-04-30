import React, { useContext, useRef, useState } from "react";
import Header from "../../composants/Header";
import { Col, Container, Image, Row } from "react-bootstrap";
import { Alert, AlertTitle, Button, CircularProgress, Divider, Box } from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import QuizIcon from "@mui/icons-material/Quiz";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
//import { modules } from '../../utils/data'
import { useNavigate } from "react-router-dom";
import { modules } from "../../utils/data/index.ts";
import Footer from "../../composants/Footer/index.jsx";
import HeaderContent from "../../composants/HeaderContent/index.jsx";
import "./dashboardCSS.css";
import { AppContext } from "../../context/index.jsx";
import { useFetch } from "../../utils/hooks/FetchData/index.jsx";
import { MessageErrorServeurWithVarialbleHeight } from "../../composants/MessageComponent/index.jsx";
import { SceletonSmallArticleHorizontal } from "../../composants/Sceletons/index.jsx";

export default function Dashboard() {
   const { isOnline, language, setUser, user } = useContext(AppContext);
   const { isLoading, data, error } = useFetch("/etudiant/dashboard/" + (user ? user.id : 0), "GET");
   console.log("data dashboard", data);
   const navigation = useNavigate();
   const modulesSectionRef = useRef(null);
   const [selectedStat, setSelectedStat] = useState(null);
   var isfrench = language === "FR";

   const scrollToModules = () => {
      modulesSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
   };

   const handleStatCardClick = (key) => {
      setSelectedStat(key);
      scrollToModules();
   };
   return (
      <>
         <Container fluid style={{ width: "100vw", margin: 0, padding: 0 }}>
            <Header />
            <HeaderContent />

            <Row className="presentationRow">
               <div className="textePresentationDashboardDiv">
                  <span className="textePresentationDashboardspan">
                     {isfrench 
                        ? "Explorez nos Modules de Formation : Plongez dans notre programme complet ! Découvrez des modules spécialement conçus pour vous aider à maîtriser les compétences essentielles en entrepreneuriat."
                        : "Explore our Training Modules: Dive into our complete program! Discover modules specially designed to help you master essential entrepreneurial skills."
                     }
                  </span>
               </div>
            </Row>

            {isLoading ? (
               <Row style={{ borderRadius: 5, margin: 20, marginTop: 30, padding: 10 }}>
                  <div className="maincontaintModulesDiv">
                     {Array.from({ length: 4 }, (_, index) => (
                        <SceletonSmallArticleHorizontal key={index} />
                     ))}
                  </div>
               </Row>
            ) : error ? (
               <MessageErrorServeurWithVarialbleHeight />
            ) : (
               <>
                  <Row className="statsRow">
                     <div className="statsTitle">
                        {isfrench ? "Récapitulatif de vos activités" : "Summary of your activities"}
                     </div>
                     <div className="mainStatBlocDashboard" role="group" aria-label={isfrench ? "Indicateurs de progression" : "Progress indicators"}>
                        <Box
                           component="button"
                           type="button"
                           title={isfrench ? "Sélectionner et afficher les modules de formation" : "Select and scroll to training modules"}
                           onClick={() => handleStatCardClick("cours")}
                           aria-pressed={selectedStat === "cours"}
                           className={`statItemDashbord statCardCours statCardButton${selectedStat === "cours" ? " statCardSelected" : ""}`}
                        >
                           <Box className="icnDashbordContainer">
                              <MenuBookIcon className="statIcon" />
                           </Box>
                           <div className="texteStatDashbord">
                              <span className="numberStatDashboard">
                                 {data.courLu} sur {data.chapitreTotal}
                              </span>
                              <span className="texteStatDashboard">
                                 {isfrench ? "Cours déjà lus" : "Chapters read"}
                              </span>
                           </div>
                        </Box>
                        <Box
                           component="button"
                           type="button"
                           title={isfrench ? "Sélectionner et afficher les modules de formation" : "Select and scroll to training modules"}
                           onClick={() => handleStatCardClick("qcm")}
                           aria-pressed={selectedStat === "qcm"}
                           className={`statItemDashbord statCardQCM statCardButton${selectedStat === "qcm" ? " statCardSelected" : ""}`}
                        >
                           <Box className="icnDashbordContainer">
                              <QuizIcon className="statIcon" />
                           </Box>
                           <div className="texteStatDashbord">
                              <span className="numberStatDashboard">
                                 {data.qcmvalide} sur {data.qcmTotal}
                              </span>
                              <span className="texteStatDashboard">
                                 {isfrench ? "QCM validés" : "QCM validated"}
                              </span>
                           </div>
                        </Box>

                        <Box
                           component="button"
                           type="button"
                           title={isfrench ? "Sélectionner et afficher les modules de formation" : "Select and scroll to training modules"}
                           onClick={() => handleStatCardClick("modules")}
                           aria-pressed={selectedStat === "modules"}
                           className={`statItemDashbord statCardModule statCardButton${selectedStat === "modules" ? " statCardSelected" : ""}`}
                        >
                           <Box className="icnDashbordContainer">
                              <FolderOpenIcon className="statIcon" />
                           </Box>
                           <div className="texteStatDashbord">
                              <span className="numberStatDashboard">
                                 {data.moduleAccessible} sur {data.moduleTotal}
                              </span>
                              <span className="texteStatDashboard">
                                 {isfrench ? "Modules accessibles" : "Accessible modules"}
                              </span>
                           </div>
                        </Box>

                        <Box
                           component="button"
                           type="button"
                           title={isfrench ? "Sélectionner et afficher les modules de formation" : "Select and scroll to training modules"}
                           onClick={() => handleStatCardClick("questions")}
                           aria-pressed={selectedStat === "questions"}
                           className={`statItemDashbord statCardQuestion statCardButton${selectedStat === "questions" ? " statCardSelected" : ""}`}
                        >
                           <Box className="icnDashbordContainer">
                              <QuestionAnswerIcon className="statIcon" />
                           </Box>
                           <div className="texteStatDashbord">
                              <span className="numberStatDashboard">{data.questionPose ? data.questionPose : 0}</span>
                              <span className="texteStatDashboard">
                                 {isfrench ? "Vos questions" : "Your questions"}
                              </span>
                           </div>
                        </Box>
                     </div>
                  </Row>

                  <div ref={modulesSectionRef} id="dashboard-modules-section">
                  <Row className="modulesRow">
                     <div className="modulesContainer">
                        <div className="modulesTitle">
                           {isfrench ? "Modules de Formation Disponibles" : "Available Training Modules"}
                        </div>
                        {data && data.modules && data.modules.length > 0 ? (
                           <div style={{ display: "flex", justifyContent: "center" }}>
                              <div className="maincontaintModulesDiv">
                                 {data.modules.map((module, index) => (
                                    <div
                                       key={module?.idModule ?? index}
                                       className="mainModuleBloc"
                                       onClick={() => {
                                          module.isAccessible && navigation("/module/" + module.idModule);
                                       }}
                                       style={{ cursor: module.isAccessible ? "pointer" : "not-allowed" }}
                                    >
                                       <div className="imageIlliustrationModuleDiv">
                                          <Image
                                             src={module?.nomImage ? module.nomImage : "/images/illustration/default.png"}
                                             alt="imageIllustrativedu module"
                                             id="myImg"
                                             style={{
                                                maxWidth: "100%",
                                                width: "100%",
                                                height: "100%",
                                                borderTopRightRadius: 5,
                                                borderTopLeftRadius: 5,
                                                objectFit: "cover"
                                             }}
                                          />
                                       </div>
                                       <div className="titreModuleDashboard">
                                          <span style={{ fontWeight: 600, textAlign: "center" }}>
                                             {isfrench ? module.titre : module.titreEn}
                                          </span>
                                       </div>
                                       <div className="actionButton">
                                          {module.isAccessible ? (
                                             <Button
                                                onClick={(e) => {
                                                   e.stopPropagation();
                                                   navigation("/module/" + module.idModule);
                                                }}
                                                variant="contained"
                                                className="moduleAccessButton"
                                                sx={{ 
                                                   width: "100%", 
                                                   height: "100%", 
                                                   borderRadius: "0 0 12px 12px",
                                                   background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                                                   fontWeight: 600,
                                                   textTransform: "none",
                                                   fontSize: "15px",
                                                   "&:hover": {
                                                      background: "linear-gradient(135deg, #16a34a 0%, #15803d 100%)",
                                                      transform: "translateY(-2px)",
                                                      boxShadow: "0 8px 16px rgba(22, 163, 74, 0.4)"
                                                   },
                                                   transition: "all 0.3s ease"
                                                }}
                                             >
                                                {isfrench ? "Accéder à ce module" : "Access this module"}
                                             </Button>
                                          ) : (
                                             <Button 
                                                variant="contained" 
                                                className="moduleLockedButton"
                                                sx={{ 
                                                   width: "100%", 
                                                   height: "100%",
                                                   borderRadius: "0 0 12px 12px",
                                                   backgroundColor: "#e0e0e0",
                                                   color: "#9e9e9e",
                                                   fontWeight: 600,
                                                   textTransform: "none",
                                                   fontSize: "15px",
                                                   cursor: "not-allowed"
                                                }}
                                                disabled
                                             >
                                                {isfrench ? "Module verrouillé" : "Locked module"}
                                             </Button>
                                          )}
                                       </div>
                                       <div className="nonbreChapitreModuledashboardDiv">
                                          <span className="nonbreChapitreModuledashboardText">
                                             {module.totalChapitre ? `${module.totalChapitre} chapitre${module.totalChapitre > 1 ? 's' : ''}` : ''}
                                          </span>
                                       </div>
                                    </div>
                                 ))}
                              </div>
                           </div>
                        ) : (
                           <div style={{ 
                              textAlign: "center", 
                              padding: "40px 20px",
                              backgroundColor: "#f8f9fa",
                              borderRadius: 10,
                              border: "2px dashed #dee2e6"
                           }}>
                              <Alert severity="info" sx={{ marginBottom: 2 }}>
                                 <AlertTitle>{isfrench ? "Aucun module disponible" : "No modules available"}</AlertTitle>
                                 {isfrench 
                                    ? "Aucun module n'est actuellement disponible pour votre profil. Les modules seront débloqués progressivement selon le calendrier de formation."
                                    : "No modules are currently available for your profile. Modules will be unlocked progressively according to the training schedule."
                                 }
                              </Alert>
                           </div>
                        )}
                     </div>
                  </Row>
                  </div>
               </>
            )}

            {/* Section C: Informations sur la formation */}
            <Row
               style={{
                  backgroundColor: "rgba(22, 163, 74, 0.1)",
                  borderRadius: 16,
                  margin: 20,
                  marginTop: 30,
                  marginBottom: 30,
                  padding: 25,
                  border: "2px solid rgba(22, 163, 74, 0.2)"
               }}
            >
               <Col>
                  <div>
                     <div style={{ 
                        fontWeight: "bold", 
                        fontSize: 20,
                        marginBottom: 15,
                        color: "#16a34a"
                     }}>
                        {isfrench ? "Fonctionnement de la formation" : "How the training works"}
                     </div>
                     <ol style={{ paddingLeft: 20 }}>
                        <li style={{ margin: 10, lineHeight: 1.8 }}>
                           <span style={{ fontWeight: "bold", color: "#374151" }}>
                              {isfrench ? "Chapitres et Quiz:" : "Chapters and Quizzes:"}
                           </span>{" "}
                           {isfrench 
                              ? "Chaque module est divisé en plusieurs chapitres. À la fin de chaque chapitre, vous trouverez un quiz à compléter. Ces quiz vous permettront de vérifier vos connaissances et de renforcer votre compréhension des sujets abordés."
                              : "Each module is divided into several chapters. At the end of each chapter, you will find a quiz to complete. These quizzes will allow you to verify your knowledge and strengthen your understanding of the topics covered."
                           }
                        </li>
                        <li style={{ margin: 10, lineHeight: 1.8 }}>
                           <span style={{ fontWeight: "bold", color: "#374151" }}>
                              {isfrench ? "Progression Graduelle:" : "Gradual Progress:"}
                           </span>{" "}
                           {isfrench 
                              ? "Les modules ne sont pas tous accessibles simultanément. Au début, seul le premier module est déverrouillé. Chaque semaine, un nouveau module sera accessible. Cette approche progressive vous permettra de suivre la formation de manière structurée et d'assimiler les informations étape par étape."
                              : "Modules are not all accessible simultaneously. At the beginning, only the first module is unlocked. Each week, a new module will be accessible. This progressive approach will allow you to follow the training in a structured way and assimilate information step by step."
                           }
                        </li>
                        <li style={{ margin: 10, lineHeight: 1.8 }}>
                           <span style={{ fontWeight: "bold", color: "#374151" }}>
                              {isfrench ? "Attestation de Réussite:" : "Certificate of Success:"}
                           </span>{" "}
                           {isfrench 
                              ? "À la fin de la formation, si vous avez complété tous les chapitres et réussi les quiz, vous recevrez une attestation qui témoigne de votre engagement et de vos compétences nouvellement acquises."
                              : "At the end of the training, if you have completed all chapters and passed the quizzes, you will receive a certificate that testifies to your commitment and newly acquired skills."
                           }
                        </li>
                     </ol>
                  </div>
               </Col>
            </Row>

            <Footer />
         </Container>
      </>
   );
}
