import React, { useEffect, useRef, useState, useContext } from "react";
import Header from "../../composants/Header";
import Footer from "../../composants/Footer";
import { useFetch } from "../../utils/hooks/FetchData";
import { 
   Box, 
   Typography, 
   CircularProgress, 
   Chip, 
   Card, 
   CardContent, 
   CardMedia, 
   Container,
   Grid,
   Pagination,
   Stack,
   Skeleton
} from "@mui/material";
import { AppContext } from "../../context";
import { MessageErrorServeur, MessageErrorServeurWithVarialbleHeight } from "../../composants/MessageComponent";
import "./mediaCSS.css";
import { DisplayImage } from "../AdminPages/Media/Article/ShowArticle/imageArticleAction";
import { useNavigate, useParams } from "react-router-dom";
import { SceletonDiv, SceletonSmallArticleHorizontal } from "../../composants/Sceletons";
import ArticleIcon from "@mui/icons-material/Article";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export function MediaWithDefaultIdRubrique() {
   const { idRubrique } = useParams();
   return <Media defaultIdSelectedRubrique={idRubrique} />;
}

export default function Media({ defaultIdSelectedRubrique }) {
   const { language } = useContext(AppContext);
   const isFrench = language === "FR";
   const [pageNumber, setPageNumber] = useState(0);
   const [filter, setFilter] = useState(null);
   const [update, setUpdate] = useState(false);
   const { isLoading, data, error } = useFetch(`/media/rubriques/${pageNumber}`, "GET", null, filter, update);

   const [idSelectedRubrique, setIdSelectedRubrique] = useState(
      defaultIdSelectedRubrique ? defaultIdSelectedRubrique : 0
   );
   const changeRubrique = (rubrique) => {
      setIdSelectedRubrique(rubrique.id);
   };

   const mainTitreRef = useRef(null);

   useEffect(() => {
      if (mainTitreRef.current) {
      mainTitreRef.current.scrollIntoView({ behavior: "smooth" });
      }
   }, [idSelectedRubrique]);

   return (
      <>
         <Box sx={{ width: "100%", margin: 0, padding: 0, backgroundColor: "#f8f9fa" }}>
            <Header />

            <Box ref={mainTitreRef} sx={{ backgroundColor: "#ffffff", padding: { xs: 2, md: 4 }, marginTop: 0 }}>
               <Container maxWidth="xl">
                  <Box sx={{ marginBottom: 4 }}>
                     <Box sx={{ display: "flex", alignItems: "center", gap: 2, marginBottom: 3 }}>
                        <ArticleIcon sx={{ fontSize: 32, color: "#16a34a" }} />
                        <Typography 
                           variant="h4" 
                           sx={{ 
                              fontWeight: 700, 
                              color: "#1a202c",
                              fontFamily: "'Poppins', sans-serif"
                           }}
                        >
                           {isFrench ? "Nos Rubriques" : "Our Categories"}
                        </Typography>
                     </Box>

                     <Box
                        sx={{
                              display: "flex",
                              flexDirection: "row",
                              flexWrap: "wrap",
                           gap: 2,
                           marginTop: 3
                           }}
                        >
                           {isLoading ? (
                              Array.from({ length: 3 }, (_, index) => (
                              <Skeleton 
                                 key={index}
                                 variant="rounded" 
                                 width={150} 
                                 height={40} 
                                 sx={{ borderRadius: "12px" }}
                                 />
                              ))
                           ) : error ? (
                              <MessageErrorServeur />
                           ) : data && data.content && data.content.length > 0 ? (
                              <>
                                 {data.content.map((rubrique, index) => (
                                 <Chip
                                    key={rubrique.id}
                                    label={rubrique.nom}
                                    onClick={() => changeRubrique(rubrique)}
                                    sx={{
                                       minWidth: 150,
                                       height: 40,
                                       fontSize: "15px",
                                       fontWeight: idSelectedRubrique === rubrique.id ? 700 : 500,
                                          cursor: "pointer",
                                       backgroundColor: idSelectedRubrique === rubrique.id
                                          ? "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)"
                                          : "#f7fafc",
                                       color: idSelectedRubrique === rubrique.id ? "#ffffff" : "#4a5568",
                                       border: idSelectedRubrique === rubrique.id
                                          ? "none"
                                          : "2px solid #e2e8f0",
                                       "&:hover": {
                                          backgroundColor: idSelectedRubrique === rubrique.id
                                             ? "linear-gradient(135deg, #16a34a 0%, #15803d 100%)"
                                             : "#edf2f7",
                                          transform: "translateY(-2px)",
                                          boxShadow: "0 4px 12px rgba(22, 163, 74, 0.3)",
                                       },
                                       transition: "all 0.3s ease",
                                       boxShadow: idSelectedRubrique === rubrique.id
                                          ? "0 4px 12px rgba(22, 163, 74, 0.4)"
                                          : "none"
                                    }}
                                 />
                                 ))}
                              </>
                           ) : (
                           <Typography sx={{ fontSize: 17, fontWeight: 700, color: "#718096" }}>
                              {isFrench ? "Aucune rubrique disponible..." : "No category available..."}
                           </Typography>
                        )}
                     </Box>
                  </Box>
               </Container>
            </Box>

               {isLoading ? (
                  <DisplayArticlesRubriques isSceleton={true} />
               ) : error ? (
                  <MessageErrorServeurWithVarialbleHeight />
               ) : data && data.content && data.content.length > 0 ? (
                  <DisplayArticlesRubriques
                     idSelectedRubrique={idSelectedRubrique}
                     setIdSelectedRubrique={setIdSelectedRubrique}
                     rubriques={data.content}
                     update={update}
                  isFrench={isFrench}
                  />
               ) : null}

            <Footer />
         </Box>
      </>
   );
}

const DisplayArticlesRubriques = ({ idSelectedRubrique, setIdSelectedRubrique, rubriques = [], update, isSceleton, isFrench }) => {
   const [pageNumber, setPageNumber] = useState(0);
   const [filter, setFilter] = useState(null);
   const [nomRubrique, setNomRubrique] = useState(null);

   const rubriqueId = idSelectedRubrique || rubriques[0]?.id || null;
   const fetchUrl = isSceleton || !rubriqueId ? null : `/public/media/listarticlerubrique/${rubriqueId}/${pageNumber}`;

   const { isLoading, data, error } = useFetch(fetchUrl, "GET", null, filter, update);
   
   let rubrique = isSceleton
      ? { id: -1, nom: "Rubrique" }
      : idSelectedRubrique
      ? rubriques.find((rubrique) => rubrique.id === idSelectedRubrique)
      : rubriques[0];

   const handlePageChange = (event, value) => {
      setPageNumber(value - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
   };

   return (
      <Box sx={{ backgroundColor: "#f8f9fa", padding: { xs: 2, md: 4 }, minHeight: "60vh" }}>
         <Container maxWidth="xl">
            <Box
               sx={{
                     width: "100%",
                     backgroundColor: "white",
                  borderRadius: "16px",
                  padding: 4,
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)"
               }}
            >
               <Box sx={{ marginBottom: 4 }}>
                  <Typography 
                     variant="h5" 
                     sx={{ 
                        fontSize: "24px", 
                        fontWeight: 700,
                        color: "#1a202c",
                        fontFamily: "'Poppins', sans-serif",
                        display: "flex",
                        alignItems: "center",
                        gap: 1
                     }}
                  >
                     <ArticleIcon sx={{ color: "#16a34a" }} />
                     {rubrique ? rubrique.nom : nomRubrique || (isFrench ? "Articles" : "Articles")}
                  </Typography>
               </Box>

               <Grid container spacing={3}>
                     {isLoading || isSceleton ? (
                     Array.from({ length: 4 }, (_, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                           <Skeleton variant="rectangular" height={400} sx={{ borderRadius: "12px" }} />
                        </Grid>
                     ))
                     ) : error ? (
                     <Grid item xs={12}>
                        <MessageErrorServeurWithVarialbleHeight height={"400px"} />
                     </Grid>
                     ) : (
                        <>
                           {data && data.content && data.content.length > 0 ? (
                              <>
                                 {data.content.map((article, index) => (
                                 <Grid item xs={12} sm={6} md={4} lg={3} key={article.id || index}>
                                    <DisplaySmallBodyArticleHorizontal
                                       article={article}
                                       nomRubrique={nomRubrique}
                                       setNomRubrique={setNomRubrique}
                                       isFrench={isFrench}
                                    />
                                 </Grid>
                                 ))}
                              </>
                        ) : (
                           <Grid item xs={12}>
                              <Box sx={{ textAlign: "center", padding: 4 }}>
                                 <Typography sx={{ fontSize: 18, color: "#718096", fontWeight: 500 }}>
                                    {isFrench ? "Aucun article disponible dans cette rubrique" : "No articles available in this category"}
                                 </Typography>
                              </Box>
                           </Grid>
                        )}
                        </>
                     )}
               </Grid>

               {data && data.totalPages > 1 && (
                  <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
                     <Stack spacing={2}>
                        <Pagination
                           count={data.totalPages}
                           page={pageNumber + 1}
                           onChange={handlePageChange}
                           color="primary"
                           sx={{
                              "& .MuiPaginationItem-root": {
                                 fontSize: "16px",
                                 fontWeight: 600,
                                 "&.Mui-selected": {
                                    background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                                    color: "white",
                                    "&:hover": {
                                       background: "linear-gradient(135deg, #16a34a 0%, #15803d 100%)",
                                    }
                                 }
                              }
                           }}
                        />
                     </Stack>
                  </Box>
               )}
            </Box>
         </Container>
      </Box>
   );
};

const DisplaySmallBodyArticleHorizontal = ({ article, setNomRubrique, nomRubrique, isFrench }) => {
   let navigation = useNavigate();
   
   useEffect(() => {
      if (!nomRubrique && setNomRubrique && article?.rubrique?.nom) {
         setNomRubrique(article.rubrique.nom);
      }
   }, [nomRubrique, setNomRubrique, article]);

   const handleClick = () => {
      navigation(`/article/${article.lien}`);
   };

   return (
      <Card
         sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            borderRadius: "16px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            cursor: "pointer",
            transition: "all 0.3s ease",
            overflow: "hidden",
            "&:hover": {
               transform: "translateY(-8px)",
               boxShadow: "0 12px 24px rgba(22, 163, 74, 0.3)",
            }
         }}
         onClick={handleClick}
      >
         <Box
            sx={{
               width: "100%",
               height: 200,
               backgroundColor: "#e2e8f0",
               position: "relative",
               overflow: "hidden"
            }}
         >
               {article.imageArticles && article.imageArticles.length > 0 ? (
                  <DisplayImage idArticle={article.id} idImage={article.imageArticles[0].id} />
            ) : (
               <Box
                  sx={{
                     width: "100%",
                     height: "100%",
                     display: "flex",
                     alignItems: "center",
                     justifyContent: "center",
                     backgroundColor: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                     background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)"
                  }}
               >
                  <ArticleIcon sx={{ fontSize: 64, color: "rgba(255, 255, 255, 0.5)" }} />
               </Box>
            )}
         </Box>

         <CardContent sx={{ flexGrow: 1, padding: 2, display: "flex", flexDirection: "column", gap: 1 }}>
            {article.surTitre && (
               <Chip
                  label={article.surTitre}
                  size="small"
                  sx={{
                     width: "fit-content",
                     backgroundColor: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                     background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                     color: "white",
                     fontWeight: 700,
                     fontSize: "12px",
                     height: 24
                  }}
               />
            )}

            <Typography
               variant="h6"
               sx={{
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "#1a202c",
                  fontFamily: "'Poppins', sans-serif",
                  lineHeight: 1.4,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  minHeight: 50
               }}
            >
               {article.titre}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1, marginTop: "auto", paddingTop: 1 }}>
               <CalendarTodayIcon sx={{ fontSize: 16, color: "#718096" }} />
               <Typography
                  variant="body2"
                  sx={{
                     color: "#718096",
                     fontSize: "13px",
                     fontStyle: "italic",
                     fontWeight: 500
                  }}
               >
                  {article.datePublication
                     ? new Date(article.datePublication).toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "short",
                          year: "numeric"
                       })
                     : ""}
               </Typography>
            </Box>

            <Box
               sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  color: "#16a34a",
                  fontWeight: 600,
                  fontSize: "14px",
                  marginTop: 1,
                  "&:hover": {
                     gap: 1,
                     transition: "gap 0.3s ease"
                  }
               }}
            >
               <Typography sx={{ fontSize: "14px", fontWeight: 600, color: "#16a34a" }}>
                  {isFrench ? "Lire la suite" : "Read more"}
               </Typography>
               <ArrowForwardIcon sx={{ fontSize: 16 }} />
            </Box>
         </CardContent>
      </Card>
   );
};
