import React, { useContext, useState } from "react";
import Header from "../../composants/Header";
import {
   Accordion,
   AccordionDetails,
   AccordionSummary,
   Alert,
   AlertTitle,
   Backdrop,
   Button,
   Checkbox,
   CircularProgress,
   Dialog,
   DialogActions,
   DialogContent,
   DialogTitle,
   Box,
   Breadcrumbs,
   Typography,
   Chip,
   Card,
   CardContent,
   Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HomeIcon from "@mui/icons-material/Home";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import QuizIcon from "@mui/icons-material/Quiz";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import HeaderContent from "../../composants/HeaderContent";
import { chapitre, chapitre as chapitreEnDur } from "../../utils/data/index.ts";
import ReactPlayer from "react-player";
import Footer from "../../composants/Footer/index.jsx";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { AppContext } from "../../context/index.jsx";
import { useFetch } from "../../utils/hooks/FetchData/index.jsx";
import {
   MessageErrorServeur,
   MessageErrorServeurWithVarialbleHeight,
} from "../../composants/MessageComponent/index.jsx";
import "./courseCSS.css";
import { SceletonBigArticle } from "../../composants/Sceletons/index.jsx";
import SaveComponent from "../../composants/SaveComponent/index.jsx";
import { ErrorRounded } from "@mui/icons-material";
//import { Button } from 'bootstrap'

export default function Course() {
   const { isOnline, language, user } = useContext(AppContext);
   const { idChapitre } = useParams();
   const { isLoading, data, error } = useFetch("/etudiant/chapitre/" + (user ? user.id : 0) + "/" + idChapitre, "GET");
   const divTest = <div style={{ height: "100%", width: "100%", backgroundColor: "white" }}></div>;
   var isfrench = language === "FR";
   return (
      <>
         <Container fluid style={{ width: "100%", padding: 0, margin: 0 }}>
            <Header />
            <HeaderContent />
            
            {/* Fil d'Ariane modernisé */}
            <Box className="breadcrumbContainer">
               <Breadcrumbs
                  separator={<NavigateNextIcon fontSize="small" />}
                  aria-label="breadcrumb"
                  sx={{
                     '& .MuiBreadcrumbs-separator': {
                        margin: '0 8px'
                     }
                  }}
               >
                  <Link to="/dashboard" className="breadcrumbLink">
                     <HomeIcon sx={{ fontSize: 18, marginRight: 0.5, verticalAlign: 'middle' }} />
                     {isfrench ? "Tableau de bord" : "Dashboard"}
                  </Link>
                  {data?.module?.idModule && (
                     <Link to={"/module/" + data.module.idModule} className="breadcrumbLink">
                        <MenuBookIcon sx={{ fontSize: 18, marginRight: 0.5, verticalAlign: 'middle' }} />
                        {data?.module?.titre || ""}
                     </Link>
                  )}
                  <Typography className="breadcrumbCurrent" color="text.primary">
                     <PlayCircleOutlineIcon sx={{ fontSize: 18, marginRight: 0.5, verticalAlign: 'middle' }} />
                     {data?.titre || ""}
                  </Typography>
               </Breadcrumbs>
            </Box>
            <Row fluid style={{ width: "100vw", margin: 0, padding: 0 }}>
               {isLoading ? (
                  <SceletonBigArticle />
               ) : error ? (
                  <MessageErrorServeurWithVarialbleHeight />
               ) : (
                  <ViewChapitreNew chapitre={data} />
               )}
            </Row>
            {}
            <Footer />
         </Container>
      </>
   );
}

const ViewChapitreNew = ({ chapitre }) => {
   chapitre = chapitre ? chapitre : {};
   const [showAnswer, setShowAnswer] = useState(false);
   const { isOnline, language, user } = useContext(AppContext);
   var isfrench = language === "FR";
   const [valider, setValider] = useState(false);
   const [isLoading, setIsLoading] = useState(true);
   const [errorVideo, setErrorVideo] = useState(false);

   const [activeQCM, setActiveQCM] = useState([]);

   const handleVideoLoad = () => {
      setIsLoading(false);
   };

   const handleVideoError = () => {
      setErrorVideo(true);
      setIsLoading(false);
   };

   const handleValider = () => {
      console.log("activeQCM == ", activeQCM);
   };

   return (
      <div className="bigcontaintCour">
         <Card className="maindivContaintchapitre">
            <CardContent>
               {chapitre.module?.titre && (
                  <Box className="titreModuleDiv">
                     <Chip 
                        label={chapitre.module.titre}
                        className="moduleChip"
                        icon={<MenuBookIcon />}
                        size="small"
                     />
                  </Box>
               )}
               <Box className="titreChapitreDiv">
                  <Typography variant="h4" className="titrechapitreText">
                     {chapitre.titre}
                  </Typography>
               </Box>
               {chapitre.preanbule && (
                  <Box className="preanbulediv">
                     <Alert 
                        severity="info" 
                        icon={<InfoOutlinedIcon />}
                        sx={{ 
                           marginBottom: 3,
                           borderRadius: 2,
                           backgroundColor: 'rgba(102, 126, 234, 0.08)',
                           border: '1px solid rgba(102, 126, 234, 0.2)'
                        }}
                     >
                        <AlertTitle sx={{ fontWeight: 600, fontFamily: 'Poppins, sans-serif' }}>
                           {isfrench ? "Préambule" : "Preamble"}
                        </AlertTitle>
                        <Typography sx={{ fontFamily: 'Inter, sans-serif', lineHeight: 1.7 }}>
                           {chapitre.preanbule}
                        </Typography>
                     </Alert>
                  </Box>
               )}
               {chapitre.video && (
                  <Box className="videoContainer">
                     {isLoading && (
                        <Box className="videoLoadingContainer">
                           <CircularProgress size={60} />
                           <Typography sx={{ marginTop: 2, fontFamily: 'Inter, sans-serif' }}>
                              {isfrench ? "Chargement de la vidéo..." : "Loading video..."}
                           </Typography>
                        </Box>
                     )}
                     {errorVideo && (
                        <Alert severity="error" className="videoErrorContainer">
                           <AlertTitle>{isfrench ? "Erreur de chargement" : "Loading error"}</AlertTitle>
                           {isfrench 
                              ? "Impossible de charger la vidéo du cours. Veuillez vérifier votre connexion."
                              : "Unable to load the course video. Please check your connection."
                           }
                        </Alert>
                     )}
                     {!errorVideo && (
                        <Box className="reactplayerWrapper">
                           <ReactPlayer
                              url={chapitre.video}
                              className="reactplayer"
                              controls={true}
                              width="100%"
                              height="100%"
                              onReady={handleVideoLoad}
                              onError={handleVideoError}
                           />
                        </Box>
                     )}
                  </Box>
               )}

               {chapitre.texte && (
                  <Box className="texteChapitre">
                     <Typography 
                        dangerouslySetInnerHTML={{ __html: chapitre.texte }} 
                        className="texteCour"
                        sx={{ fontFamily: 'Inter, sans-serif', lineHeight: 1.8 }}
                     />
                  </Box>
               )}

               {chapitre.blocs && chapitre.blocs.length > 0 && (
                  <Box className="blocsContainer">
                     <Divider sx={{ marginY: 4 }}>
                        <Chip 
                           label={isfrench ? "Contenu détaillé" : "Detailed content"}
                           icon={<MenuBookIcon />}
                           className="sectionChip"
                        />
                     </Divider>
                     {chapitre.blocs.map((bloc, indexBloc) => (
                        <Accordion 
                           defaultExpanded={indexBloc === 0}
                           className="blocAccordion"
                           key={indexBloc}
                        >
                           <AccordionSummary 
                              expandIcon={<ExpandMoreIcon />} 
                              aria-controls={`panel${indexBloc}-content`} 
                              id={`panel${indexBloc}-header`}
                              className="blocAccordionSummary"
                           >
                              <Typography variant="h6" className="blocTitre">
                                 {indexBloc + 1}. {bloc.titre}
                              </Typography>
                           </AccordionSummary>
                           <AccordionDetails className="blocAccordionDetails">
                              <Box className="bloc">
                                 {bloc.video && <LecteurVideo urlVideo={bloc.video} />}
                                 {bloc.texte && (
                                    <Box className="texteChapitre">
                                       <Typography 
                                          dangerouslySetInnerHTML={{ __html: bloc.texte }} 
                                          className="texteBloc"
                                          sx={{ fontFamily: 'Inter, sans-serif', lineHeight: 1.8 }}
                                       />
                                    </Box>
                                 )}

                                 {bloc.sousBlocs &&
                                    bloc.sousBlocs.map((sousBloc, indexSousBloc) => (
                                       <Box className="sousBloc" key={indexSousBloc}>
                                          <Typography variant="h6" className="sousBlocTitre">
                                             {indexBloc + 1}.{indexSousBloc + 1} {sousBloc.titre}
                                          </Typography>
                                          <Typography 
                                             className="sousBlocTexte"
                                             sx={{ fontFamily: 'Inter, sans-serif', lineHeight: 1.7 }}
                                          >
                                             {sousBloc.texte}
                                          </Typography>
                                       </Box>
                                    ))}
                              </Box>
                           </AccordionDetails>
                        </Accordion>
                     ))}
                  </Box>
               )}

               {chapitre.qcms && chapitre.qcms.length > 0 && (
                  <Box className="qcmContainer">
                     <Divider sx={{ marginY: 4 }}>
                        <Chip 
                           label={isfrench ? "Questionnaire à choix multiples" : "Multiple Choice Questions"}
                           icon={<QuizIcon />}
                           className="sectionChip qcmChip"
                        />
                     </Divider>
                     <Alert 
                        severity="info" 
                        icon={<InfoOutlinedIcon />}
                        sx={{ 
                           marginBottom: 3,
                           borderRadius: 2,
                           backgroundColor: 'rgba(102, 126, 234, 0.08)',
                           border: '1px solid rgba(102, 126, 234, 0.2)'
                        }}
                     >
                        <Typography sx={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', fontStyle: 'italic' }}>
                           {isfrench 
                              ? "Répondez au QCM pour valider ce cours. Chaque question peut contenir une ou plusieurs bonnes réponses."
                              : "Answer the QCM to validate this course. Each question may contain one or more correct answers."
                           }
                        </Typography>
                     </Alert>

                     <Box className="listQCM">
                        {chapitre.qcms.map((qcm, index) => (
                           <DisplayQCM
                              key={qcm.id || index}
                              qcm={qcm}
                              index={index}
                              width="930"
                              height="523"
                              activeQCM={activeQCM}
                              setActiveQCM={setActiveQCM}
                              showAnswer={showAnswer}
                           />
                        ))}
                     </Box>
                     <Box className="validationQCMContainer">
                        <Validation activeQCM={activeQCM} setShowAnswer={setShowAnswer} idChapitre={chapitre.idChapitre} />
                     </Box>
                  </Box>
               )}
            </CardContent>
         </Card>
         <QROBloc chapitre={chapitre} />
      </div>
   );
};

const DisplayQCM = ({ qcm, index, activeQCM, setActiveQCM, showAnswer }) => {
   const { isOnline, language, user } = useContext(AppContext);
   var isfrench = language === "FR";

   const changeValueSelected = (event, propositionId) => {
      if (event.target.checked) {
         let newActiveQCM = [...activeQCM];
         let qcmIsRegister = false;
         activeQCM.forEach((itemQCM) => {
            if (itemQCM.id === qcm.id) {
               let itemQCM01 = itemQCM;
               qcmIsRegister = true;
               if (itemQCM.propositions && !itemQCM.propositions.includes(propositionId)) {
                  itemQCM01.propositions.push(propositionId);
                  newActiveQCM = newActiveQCM.filter((item) => item.id !== qcm.id);
                  newActiveQCM.push(itemQCM01);
               } else if (!itemQCM.propositions) {
                  itemQCM01.propositions = [propositionId];
                  newActiveQCM = newActiveQCM.filter((item) => item.id !== qcm.id);
                  newActiveQCM.push(itemQCM01);
               }
            }
         });

         if (!qcmIsRegister) {
            let qcmActive = { id: qcm.id, propositions: [propositionId] };
            newActiveQCM.push(qcmActive);
         }
         setActiveQCM([...newActiveQCM]);
      } else {
         let newActiveQCM = [...activeQCM];
         let qcmIsRegister = false;
         activeQCM.forEach((itemQCM) => {
            if (itemQCM.id === qcm.id) {
               let itemQCM01 = itemQCM;
               qcmIsRegister = true;
               if (itemQCM.propositions && itemQCM.propositions.includes(propositionId)) {
                  itemQCM01.propositions = itemQCM.propositions.filter((item) => item !== propositionId);
                  newActiveQCM = newActiveQCM.filter((item) => item.id !== qcm.id);
                  newActiveQCM.push(itemQCM01);
               }
            }
         });
         setActiveQCM([...newActiveQCM]);
      }
   };

   return (
      <Card className="qcmCard" key={index}>
         <CardContent>
            <Typography variant="h6" className="qcmQuestion">
               {index + 1}. {isfrench ? qcm.intitule : qcm.intituleEn}
            </Typography>
            <Box className="qcmPropositions">
               {qcm.propositions.map((proposition, index02) => (
                  <Box 
                     key={proposition.id || index02} 
                     className={`qcmProposition ${showAnswer && proposition.etat > 0 ? 'correct' : ''} ${showAnswer && proposition.etat <= 0 ? 'incorrect' : ''}`}
                  >
                     <Checkbox
                        checked={activeQCM.some(q => q.id === qcm.id && q.propositions?.includes(proposition.id))}
                        onChange={(event) => changeValueSelected(event, proposition.id)}
                        className="qcmCheckbox"
                        sx={{
                           color: showAnswer && proposition.etat > 0 ? '#48bb78' : showAnswer && proposition.etat <= 0 ? '#f56565' : '#667eea',
                           '&.Mui-checked': {
                              color: showAnswer && proposition.etat > 0 ? '#48bb78' : showAnswer && proposition.etat <= 0 ? '#f56565' : '#667eea',
                           }
                        }}
                     />
                     <Typography 
                        className="qcmPropositionText"
                        sx={{ 
                           flex: 1,
                           fontFamily: 'Inter, sans-serif',
                           fontSize: '15px',
                           lineHeight: 1.6
                        }}
                     >
                        {isfrench ? proposition.valeur : proposition.valeurEn}
                     </Typography>
                     {showAnswer && proposition.etat > 0 && (
                        <CheckCircleOutlineIcon className="answerIcon correctIcon" />
                     )}
                     {showAnswer && proposition.etat <= 0 && (
                        <CancelOutlinedIcon className="answerIcon incorrectIcon" />
                     )}
                  </Box>
               ))}
            </Box>
         </CardContent>
      </Card>
   );
};

const Validation = ({ activeQCM, setShowAnswer, idChapitre }) => {
   const [open, setOpen] = useState(false);
   const [save, setSave] = useState(true);
   const [error, setError] = useState(false);
   const [reponse, setReponse] = useState(null);
   const { isOnline, language, setUser } = useContext(AppContext);
   var isfrench = language === "FR";

   const handleClickOpen = () => {
      setOpen(true);
   };

   const handleClose = () => {
      if (reponse) {
         setShowAnswer(true);
      }

      setOpen(false);
      setSave(true);
      setError(false);
      setReponse(null);
   };

   const handleValider = () => {
      console.log("activeQCM == ", activeQCM);
   };

   return (
      <>
         <Button 
            variant="contained" 
            className="validateQCMButton"
            onClick={handleClickOpen}
            startIcon={<CheckCircleOutlineIcon />}
            sx={{
               background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
               fontWeight: 600,
               textTransform: 'none',
               fontSize: '16px',
               padding: '12px 32px',
               borderRadius: '12px',
               boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
               '&:hover': {
                  background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 16px rgba(102, 126, 234, 0.4)',
               },
               transition: 'all 0.3s ease'
            }}
         >
            {isfrench ? "Valider mes réponses" : "Validate my answers"}
         </Button>
         <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open} onClick={handleClose}>
            <Dialog
               open={open}
               onClose={handleClose}
               aria-labelledby="alert-dialog-title"
               aria-describedby="alert-dialog-description"
            >
               <DialogTitle id="alert-dialog-title">
                  {isfrench ? "Validation des reponses" : "Validation of answers"}
               </DialogTitle>
               <DialogContent>
                  {save && !error && !reponse && <CircularProgress color="inherit" />}

                  {save && (
                     <SaveQcmChoice
                        activeQCM={activeQCM}
                        setReponse={setReponse}
                        setSave={setSave}
                        setError={setError}
                        idChapitre={idChapitre}
                        setShowAnswer={setShowAnswer}
                     />
                  )}
                  {error && (
                     <div style={{ width: "100%", marginBottom: "5px" }}>
                        <Alert severity="error">
                           <AlertTitle>{isfrench ? "Erreur" : "Error"}</AlertTitle>
                           {isOnline ? (
                              <span>
                                 {language === "FR" ? "Probleme avec le serveur...!" : "Problem with the server...!"}
                              </span>
                           ) : (
                              <span>
                                 {language === "FR"
                                    ? "Vous êtes hors connexion, controler votre connexion internet"
                                    : "You are offline, check your internet connection"}
                              </span>
                           )}
                        </Alert>
                     </div>
                  )}

                  {reponse && !save && !error && (
                     <div style={{ width: "100%", marginBottom: "5px" }}>
                        <div>
                           <span style={{ color: "green", fontWeight: "bold", fontSize: 16, margin: 10 }}>
                              Resultat:
                           </span>
                        </div>
                        <div style={{ fontWeight: "bold", fontSize: 17, margin: 10 }}>
                           <span
                              style={{
                                 color: reponse.totalQcm / 2 <= reponse.qcmValide ? "green" : "red",
                                 fontSize: 21,
                              }}
                           >
                              {reponse.qcmValide}
                           </span>
                           <span>{reponse.qcmValide > 0 ? " QCM validés sur " : " QCM validé sur "}</span>
                           <span style={{ fontSize: 21, color: "green" }}>{reponse.totalQcm}</span>{" "}
                        </div>
                     </div>
                  )}
               </DialogContent>
               <DialogActions>
                  {(!save || error) && (
                     <Button onClick={handleClose} autoFocus>
                        {isfrench ? "Fermer" : "Close"}
                     </Button>
                  )}
               </DialogActions>
            </Dialog>
         </Backdrop>
      </>
   );
};

const SaveQcmChoice = ({ activeQCM, setReponse, idChapitre, setError, setSave, setShowAnswer }) => {
   console.log("activeQCM == ", activeQCM);
   const { user } = useContext(AppContext);
   const { isLoading, data, error } = useFetch(
      "/etudiant/validerqcm/" + (user ? user.id : 0) + "/" + idChapitre,
      "POST",
      activeQCM
   );

   if (!isLoading && !error && data) {
      console.log("data == ", data);
      setReponse(data);
      setSave(false);
   } else if (!isLoading && error) {
      setError(true);
      setSave(false);
   }
};

const QROBloc = ({ chapitre }) => {
   const { language, user } = useContext(AppContext);
   var isfrench = language === "FR";
   //const { language, user } = useContext(AppContext);
   const [update, setUpdate] = useState(false);
   //const [showDialogSendSucces, setShowDialogSendSucces] = useState(false);
   const [open, setOpen] = useState(false);
   const [formLinksQRO, setFormLinksQRO] = useState([]);
   const [save, setSave] = useState(false);
   const [errorServeur, setErrorServeur] = useState(false);
   const [error, setError] = useState({
      signUpError: null,
      step: -1,
   });
   chapitre = chapitre ? chapitre : {};

   const validationReponseQro = () => {
      setError((prev) => ({ ...prev, textError: null, step: -1 }));
      setErrorServeur(false);
      setSave(true);
      //console.log("liste de reponse == ", formLinksQRO);
   };

   const apresEnregistrement = () => {
      setOpen(true);
   };

   const handleClickOpen = () => {
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
   };

   return (
      <>
         {chapitre.qros && chapitre.qros.length > 0 && (
            <Card className="MainBlocAllQRO">
               <CardContent>
                  <Divider sx={{ marginY: 4 }}>
                     <Chip 
                        label={isfrench ? "Questions à réponse ouverte" : "Open-ended Questions"}
                        icon={<QuestionAnswerIcon />}
                        className="sectionChip qroChip"
                     />
                  </Divider>
                  <Alert 
                     severity="info" 
                     icon={<InfoOutlinedIcon />}
                     sx={{ 
                        marginBottom: 3,
                        borderRadius: 2,
                        backgroundColor: 'rgba(102, 126, 234, 0.08)',
                        border: '1px solid rgba(102, 126, 234, 0.2)'
                     }}
                  >
                     <Typography sx={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', fontStyle: 'italic' }}>
                        {isfrench 
                           ? "Vous êtes invités à répondre à chaque question. Dans le cas des activités pratiques, faites-nous un résumé de la manière dont vous avez procédé et des résultats obtenus."
                           : "You are invited to answer each question. For practical activities, provide us with a summary of how you proceeded and the results obtained."
                        }
                     </Typography>
                  </Alert>
               {error.textError && (
                  <span style={{ color: "red", fontWeight: 700, fontSize: 17 }}>{error.textError}</span>
               )}
               {errorServeur && <MessageErrorServeur />}
                  {!save && (
                     <Box className="listQRO">
                        {chapitre.qros.map((qro, index) => (
                           <DisplayQRO
                              key={qro.id || index}
                              qro={qro}
                              index={index}
                              formLinksQRO={formLinksQRO}
                              setFormLinksQRO={setFormLinksQRO}
                              update={update}
                           />
                        ))}
                     </Box>
                  )}
                  <Box className="qroActionsContainer">
                     {error.textError && (
                        <Alert severity="error" sx={{ marginBottom: 2 }}>
                           {error.textError}
                        </Alert>
                     )}
                     {errorServeur && <MessageErrorServeur />}
                     <Button 
                        variant="contained" 
                        className="sendQROButton"
                        onClick={validationReponseQro}
                        startIcon={<QuestionAnswerIcon />}
                        sx={{
                           background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                           fontWeight: 600,
                           textTransform: 'none',
                           fontSize: '16px',
                           padding: '12px 32px',
                           borderRadius: '12px',
                           boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                           '&:hover': {
                              background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                              transform: 'translateY(-2px)',
                              boxShadow: '0 8px 16px rgba(102, 126, 234, 0.4)',
                           },
                           transition: 'all 0.3s ease'
                        }}
                     >
                        {isfrench ? "Envoyer mes réponses" : "Send my answers"}
                     </Button>
                  </Box>
               </CardContent>
            </Card>
         )}
         {save && <span>save is true</span>}
         {save && (
            <SaveComponent
               setSave={setSave}
               requestURL={`/etudiant/reponseqro/`}
               requestBody={formLinksQRO}
               requestMethode={"POST"}
               requestParam={user.matricule}
               setErrorServeur={setErrorServeur}
               setError={setError}
               setUpdate={setUpdate}
               //redirected={true}
               //setActiveStep={setActiveStep}
               functionToExcecuteAfterGoodOperation={apresEnregistrement}
            />
         )}

         <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open} onClick={handleClose}>
            <Dialog
               open={open}
               onClose={handleClose}
               aria-labelledby="alert-dialog-title"
               aria-describedby="alert-dialog-description"
            >
               <DialogTitle id="alert-dialog-title">
                  {isfrench ? "Validation des reponses" : "Validation of answers"}
               </DialogTitle>
               <DialogContent>
                  <div style={{ fontSize: 16, fontWeight: 500 }}>
                     <span>
                        Vos réponses ont été enregistrées et seront évaluées par nos experts du domaine afin de vous
                        attribuer une note.
                     </span>
                     <br />
                     <br />
                     <span>
                        Néanmoins, vous pouvez toujours apporter des modifications à vos réponses si vous avez de
                        nouvelles idées.
                     </span>
                  </div>
               </DialogContent>
               <DialogActions>
                  <Button onClick={handleClose} autoFocus>
                     {isfrench ? "Fermer" : "Close"}
                  </Button>
               </DialogActions>
            </Dialog>
         </Backdrop>
      </>
   );
};

const DisplayQRO = ({ qro, index, formLinksQRO, setFormLinksQRO, update }) => {
   const { language, user } = useContext(AppContext);
   const [changeReponse, setChangeReponse] = useState(false);
   var isfrench = language === "FR";

   const { isLoading, data, error } = useFetch(
      `/etudiant/reponseqro/${user.matricule}/${qro.id}/`,
      "GET",
      null,
      null,
      update
   );
   ///console.log("data qroEtudiant 02 == ", data);
   const setresponseToQro = (event) => {
      let newFormLinksQRO = [...formLinksQRO];
      let qroIsRegister = false;
      formLinksQRO.forEach((itemFormLink, index) => {
         if (itemFormLink.idElement === qro.id) {
            let formLink = itemFormLink;
            qroIsRegister = true;
            formLink.texte = event.target.value;
            newFormLinksQRO = newFormLinksQRO.filter((item) => item.idElement !== qro.id);
            newFormLinksQRO.push(formLink);
            // itemQCM01.propositions.push(propositionId);
            //newActiveQCM = newActiveQCM.filter((item) => item.id !== qcm.id);
            //newActiveQCM.push(itemQCM01);
         }
      });

      if (!qroIsRegister) {
         let formLink = { idElement: qro.id, texte: event.target.value };
         newFormLinksQRO.push(formLink);
      }
      setFormLinksQRO([...newFormLinksQRO]);
   };

   let textarea = (
      <textarea
         className="qroTextarea"
         type="text"
         rows={5}
         defaultValue={data?.reponse}
         placeholder={isfrench ? "Écrivez votre réponse ici..." : "Write your answer here..."}
         onChange={(event) => setresponseToQro(event)}
      />
   );

   return (
      <Card className="qroCard" key={index}>
         <CardContent>
            <Typography variant="h6" className="qroQuestion">
               {index + 1}. {isfrench ? qro.intitule : qro.intituleEn}
            </Typography>
            {isLoading ? (
               <Box sx={{ display: 'flex', justifyContent: 'center', padding: 3 }}>
                  <CircularProgress size={40} />
               </Box>
            ) : error ? (
               <MessageErrorServeur />
            ) : data && data.reponse && !changeReponse ? (
               <Box className="qroResponseDisplay">
                  <Typography className="qroResponseLabel">
                     {isfrench ? "Votre réponse :" : "Your answer:"}
                  </Typography>
                  <Typography className="qroResponseText">
                     {data.reponse}
                  </Typography>
                  <Button
                     variant="outlined"
                     color="primary"
                     size="small"
                     className="qroModifyButton"
                     onClick={() => {
                        setChangeReponse(true);
                     }}
                     sx={{
                        marginTop: 2,
                        textTransform: 'none',
                        borderRadius: '8px'
                     }}
                  >
                     {isfrench ? "Modifier" : "Modify"}
                  </Button>
               </Box>
            ) : (
               textarea
            )}
         </CardContent>
      </Card>
   );
};

const LecteurVideo = ({ urlVideo }) => {
   const [isLoading, setIsLoading] = useState(true);
   const [errorVideo, setErrorVideo] = useState(false);

   const handleVideoLoad = () => {
      setIsLoading(false);
   };

   const handleVideoError = () => {
      setErrorVideo(true);
      setIsLoading(false);
   };
   const { language } = useContext(AppContext);
   var isfrench = language === "FR";
   
   return (
      <Box className="videoContainer">
         {isLoading && (
            <Box className="videoLoadingContainer">
               <CircularProgress size={60} />
               <Typography sx={{ marginTop: 2, fontFamily: 'Inter, sans-serif' }}>
                  {isfrench ? "Chargement de la vidéo..." : "Loading video..."}
               </Typography>
            </Box>
         )}
         {errorVideo && (
            <Alert severity="error" className="videoErrorContainer">
               <AlertTitle>{isfrench ? "Erreur de chargement" : "Loading error"}</AlertTitle>
               {isfrench 
                  ? "Impossible de charger la vidéo. Veuillez vérifier votre connexion."
                  : "Unable to load the video. Please check your connection."
               }
            </Alert>
         )}
         {!errorVideo && (
            <Box className="reactplayerWrapper">
               <ReactPlayer
                  url={urlVideo}
                  className="reactplayer"
                  controls={true}
                  width="100%"
                  height="100%"
                  onReady={handleVideoLoad}
                  onError={handleVideoError}
               />
            </Box>
         )}
      </Box>
   );
};
