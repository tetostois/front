import React, { useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../../composants/Header";
import { chapitre, modules } from "../../utils/data/index.ts";
import { Alert, AlertTitle, Button, CircularProgress, Box, Chip, Breadcrumbs, Typography, LinearProgress } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import ReplayIcon from "@mui/icons-material/Replay";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import HeaderContent from "../../composants/HeaderContent/index.jsx";
import { Container, Image, Row } from "react-bootstrap";
import "./moduleCSS.css";
import { useFetch } from "../../utils/hooks/FetchData/index.jsx";
import { AppContext } from "../../context/index.jsx";
import { SceletonSmallArticleHorizontal } from "../../composants/Sceletons/index.jsx";
import { MessageErrorServeurWithVarialbleHeight } from "../../composants/MessageComponent/index.jsx";

export default function Module({ chapitres }) {
   const { isOnline, language, user } = useContext(AppContext);
   const { idModule } = useParams();
   const navigation = useNavigate();
   const { isLoading, data, error } = useFetch("/etudiant/module/" + (user ? user.id : 0) + "/" + idModule, "GET");
   var isfrench = language === "FR";
   var module = modules.find((module) => module.idModule * 1 === idModule * 1);
   console.log("modulle == ", data);
   if (!module) {
      module = {};
   }
   return (
      <>
         <Header />
         <Container fluid style={{ width: "100vw", margin: 0, padding: 0 }}>
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
                  <Typography className="breadcrumbCurrent" color="text.primary">
                     <MenuBookIcon sx={{ fontSize: 18, marginRight: 0.5, verticalAlign: 'middle' }} />
                     {data && data.length > 0 ? data[0].titreModule : (isfrench ? "Module" : "Module")}
                  </Typography>
               </Breadcrumbs>
            </Box>

            {/* En-tête du module */}
            {data && data.length > 0 && (
               <Row className="moduleHeaderRow">
                  <Box className="moduleHeaderContainer">
                     <Typography variant="h4" className="moduleTitle">
                        {data[0].titreModule}
                     </Typography>
                     <Typography variant="body1" className="moduleDescription">
                        {isfrench 
                           ? "Explorez les chapitres ci-dessous pour commencer votre apprentissage. Chaque chapitre contient du contenu enrichi, des vidéos et des quiz pour valider vos connaissances."
                           : "Explore the chapters below to start your learning. Each chapter contains enriched content, videos, and quizzes to validate your knowledge."
                        }
                     </Typography>
                     <Box className="moduleStats">
                        <Chip 
                           label={`${data.length} ${isfrench ? 'chapitres' : 'chapters'}`}
                           className="moduleStatChip"
                           icon={<MenuBookIcon />}
                        />
                        <Chip
                           label={`${(data || []).filter(ch => ch && ch.firstTime === false).length} ${isfrench ? 'consultés' : 'viewed'}`}
                           className="moduleStatChip"
                           icon={<PlayCircleOutlineIcon />}
                        />
                     </Box>
                  </Box>
               </Row>
            )}

            <Row className="chapitresRow">
               <div className="listChapitreModule">
                  {isLoading ? (
                     <div className="maincontaintChapitreDiv">
                        {Array.from({ length: 4 }, (_, index) => (
                           <SceletonSmallArticleHorizontal />
                        ))}
                     </div>
                  ) : error ? (
                     <MessageErrorServeurWithVarialbleHeight />
                  ) : data && data.length > 0 ? (
                     <div className="maincontaintChapitreDiv">
                        {data
                           .sort((a, b) => a.ordre - b.ordre)
                           .map((chapitre, index) => (
                              <Box 
                                 key={chapitre.idChapitre || index}
                                 className="mainChapitreBloc"
                                 onClick={() => {
                                    navigation("/course/" + chapitre.idChapitre);
                                 }}
                              >
                                 <div className="chapitreModule">
                                    <div className="ImageChapitreModule">
                                       <Image
                                          src={
                                             chapitre?.imageURL
                                                ? chapitre.imageURL
                                                : "/images/illustration/default.png"
                                          }
                                          alt="imageIllustrativedu chapitre"
                                          className="chapitreImage"
                                       />
                                       <Chip
                                          className="statusBadge"
                                          label={chapitre.firstTime ? (isfrench ? 'Nouveau' : 'New') : (isfrench ? 'Reprendre' : 'Resume')}
                                          size="small"
                                       />
                                       {chapitre.totalQcm > 0 && (
                                          <Chip
                                             className="qcmBadge"
                                             label={`${chapitre.totalQcm} ${isfrench ? 'QCM' : 'QCM'}`}
                                             size="small"
                                          />
                                       )}
                                    </div>
                                    <div className="titreChapitrediv">
                                       <span className="chapitreNumber">{index + 1}</span>
                                       <span className="titreChapitreTexte">{chapitre.titre}</span>
                                    </div>
                                    {(typeof chapitre.progress === 'number' || (chapitre.totalQcm > 0 && (chapitre.qcmValide || chapitre.qcmValide === 0))) && (
                                       <div className="infosChapitre">
                                          {typeof chapitre.progress === 'number' ? (
                                             <div className="progressContainer">
                                                <div className="progressHeader">
                                                   <span className="progressLabel">{isfrench ? 'Progression' : 'Progress'}</span>
                                                   <span className="progressValue">{Math.round(chapitre.progress)}%</span>
                                                </div>
                                                <LinearProgress variant="determinate" value={Math.max(0, Math.min(100, chapitre.progress))} className="progressBar" />
                                             </div>
                                          ) : (
                                             <div className="qcmInfoLine">
                                                <span className="qcmInfoLabel">QCM</span>
                                                <span className="qcmInfoValue">{chapitre.qcmValide}/{chapitre.totalQcm}</span>
                                             </div>
                                          )}
                                       </div>
                                    )}
                                    <div className="statutChapitre">
                                       <Button
                                          onClick={(e) => {
                                             e.stopPropagation();
                                             navigation("/course/" + chapitre.idChapitre);
                                          }}
                                          variant={!chapitre.firstTime ? "outlined" : "contained"}
                                          className={!chapitre.firstTime ? "chapitreButtonRelire" : "chapitreButtonCommencer"}
                                          startIcon={!chapitre.firstTime ? <ReplayIcon /> : <PlayCircleOutlineIcon />}
                                          sx={{ 
                                             width: "100%",
                                             borderRadius: "0 0 12px 12px",
                                             textTransform: "none",
                                             fontWeight: 600,
                                             fontSize: "15px",
                                             padding: "10px"
                                          }}
                                       >
                                          {!chapitre.firstTime 
                                             ? (isfrench ? "Relire le cours" : "Reread the course")
                                             : (isfrench ? "Commencer le cours" : "Start the course")
                                          }
                                       </Button>
                                    </div>
                                 </div>
                              </Box>
                           ))}
                     </div>
                  ) : (
                     <Box className="emptyChapitresContainer">
                        <Alert severity="info" sx={{ maxWidth: 600, margin: "0 auto" }}>
                           <AlertTitle>{isfrench ? "Aucun chapitre disponible" : "No chapters available"}</AlertTitle>
                           {isfrench 
                              ? "Aucun chapitre n'est actuellement disponible pour ce module."
                              : "No chapters are currently available for this module."
                           }
                        </Alert>
                     </Box>
                  )}
               </div>
            </Row>
         </Container>
      </>
   );
}
