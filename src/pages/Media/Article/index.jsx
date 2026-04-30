import React, { useEffect, useRef, useState, useContext } from "react";
import "./articleCSS.css";
import Header from "../../../composants/Header";
import { 
   Box, 
   Typography, 
   CircularProgress, 
   Chip, 
   Container,
   Breadcrumbs,
   Link as MuiLink,
   Skeleton,
   Divider,
   Avatar,
   Paper
} from "@mui/material";
import { AppContext } from "../../../context";
import { MessageErrorServeur, MessageErrorServeurWithVarialbleHeight } from "../../../composants/MessageComponent";
import Footer from "../../../composants/Footer";
import { useFetch } from "../../../utils/hooks/FetchData";
import { Link, useNavigate, useParams } from "react-router-dom";
import { SceletonBigArticle, SceletonDiv } from "../../../composants/Sceletons";
import ArticleIcon from "@mui/icons-material/Article";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonIcon from "@mui/icons-material/Person";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import HomeIcon from "@mui/icons-material/Home";

export default function ArticlePublic() {
   const { language } = useContext(AppContext);
   const isFrench = language === "FR";
   const navigation = useNavigate();
   const [pageNumber, setPageNumber] = useState(0);
   const [filter, setFilter] = useState(null);
   const [update, setUpdate] = useState(false);
   const { lienArticle } = useParams();
   const { isLoading, data, error } = useFetch(`/media/rubriques/${pageNumber}`, "GET", null, null, update);
   const fetchArticle = useFetch(`/public/media/article/${lienArticle}`, "GET", null, filter, update);

   const openRubrique = (rubrique) => {
      navigation(`/medias/rubrique/${rubrique.id}`);
   };

   return (
      <>
         <Box sx={{ width: "100%", margin: 0, padding: 0, backgroundColor: "#f8f9fa" }}>
            <Header />
            
            {/* Section Rubriques */}
            <Box sx={{ backgroundColor: "#ffffff", padding: { xs: 2, md: 4 }, marginTop: 0 }}>
               <Container maxWidth="xl">
                  <Box sx={{ marginBottom: 2 }}>
                     <Box sx={{ display: "flex", alignItems: "center", gap: 2, marginBottom: 2 }}>
                        <ArticleIcon sx={{ fontSize: 28, color: "#16a34a" }} />
                        <Typography 
                           variant="h6" 
                           sx={{ 
                              fontWeight: 600, 
                              color: "#4a5568",
                              fontFamily: "'Poppins', sans-serif"
                           }}
                        >
                           {isFrench ? "Autres Rubriques" : "Other Categories"}
                        </Typography>
                     </Box>

                     <Box
                        sx={{
                           display: "flex",
                           flexDirection: "row",
                           flexWrap: "wrap",
                           gap: 1.5
                        }}
                     >
                        {isLoading ? (
                           Array.from({ length: 3 }, (_, index) => (
                              <Skeleton 
                                 key={index}
                                 variant="rounded" 
                                 width={120} 
                                 height={36} 
                                 sx={{ borderRadius: "8px" }}
                              />
                           ))
                        ) : error ? (
                           <MessageErrorServeur />
                        ) : (
                           <>
                              {data && data.content && data.content.length > 0 ? (
                                 <>
                                    {data.content.map((rubrique, index) => (
                                       <Chip
                                          key={rubrique.id}
                                          label={rubrique.nom}
                                          onClick={() => openRubrique(rubrique)}
                                          sx={{
                                             minWidth: 120,
                                             height: 36,
                                             fontSize: "14px",
                                             fontWeight: 500,
                                             cursor: "pointer",
                                             backgroundColor: "#f7fafc",
                                             color: "#4a5568",
                                             border: "1px solid #e2e8f0",
                                             "&:hover": {
                                                backgroundColor: "#16a34a",
                                                color: "white",
                                                transform: "translateY(-2px)",
                                                boxShadow: "0 4px 12px rgba(22, 163, 74, 0.3)",
                                             },
                                             transition: "all 0.3s ease"
                                          }}
                                       />
                                    ))}
                                 </>
                              ) : null}
                           </>
                        )}
                     </Box>
                  </Box>
               </Container>
            </Box>

            {/* Section Article */}
            <Box sx={{ padding: { xs: 2, md: 4 }, marginTop: 2 }}>
               <Container maxWidth="lg">
                  <Paper
                     elevation={0}
                     sx={{
                        backgroundColor: "white",
                        borderRadius: "16px",
                        padding: { xs: 3, md: 5 },
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)"
                     }}
                  >
                     {fetchArticle.isLoading ? (
                        <SceletonBigArticle />
                     ) : fetchArticle.error ? (
                        <MessageErrorServeurWithVarialbleHeight height={"400px"} />
                     ) : fetchArticle.data?.errorAPI ? (
                        <Box
                           sx={{
                              width: "100%",
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                              minHeight: "400px",
                              textAlign: "center"
                           }}
                        >
                           <Typography sx={{ fontSize: 20, fontWeight: 700, color: "#718096" }}>
                              {fetchArticle.data.message}
                           </Typography>
                        </Box>
                     ) : (
                        <>
                           {/* Breadcrumbs */}
                           {fetchArticle.data?.rubrique && (
                              <Breadcrumbs
                                 separator={<NavigateNextIcon fontSize="small" />}
                                 sx={{ marginBottom: 4 }}
                                 aria-label="breadcrumb"
                              >
                                 <MuiLink
                                    component={Link}
                                    to="/medias"
                                    sx={{
                                       display: "flex",
                                       alignItems: "center",
                                       gap: 0.5,
                                       color: "#16a34a",
                                       textDecoration: "none",
                                       fontWeight: 500,
                                       fontSize: "14px",
                                       "&:hover": {
                                          color: "#15803d",
                                          textDecoration: "underline"
                                       }
                                    }}
                                 >
                                    <HomeIcon sx={{ fontSize: 16 }} />
                                    {isFrench ? "Médias" : "Media"}
                                 </MuiLink>
                                 <MuiLink
                                    component={Link}
                                    to={`/medias/rubrique/${fetchArticle.data.rubrique.id}`}
                                    sx={{
                                       color: "#16a34a",
                                       textDecoration: "none",
                                       fontWeight: 500,
                                       fontSize: "14px",
                                       "&:hover": {
                                          color: "#15803d",
                                          textDecoration: "underline"
                                       }
                                    }}
                                 >
                                    {fetchArticle.data.rubrique.nom}
                                 </MuiLink>
                                 <Typography sx={{ color: "#718096", fontSize: "14px" }}>
                                    {fetchArticle.data?.titre?.substring(0, 30)}...
                                 </Typography>
                              </Breadcrumbs>
                           )}

                           <DisplayFullBodyArticle article={fetchArticle.data} isFrench={isFrench} />
                        </>
                     )}
                  </Paper>
               </Container>
            </Box>

            <Footer />
         </Box>
      </>
   );
}

// Composant pour afficher l'image sans authentification (vue publique)
const DisplayImagePublic = ({ idImage, isFrench }) => {
   const { serveurURL } = useContext(AppContext);
   const [imageSrc, setImageSrc] = useState(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(false);

   useEffect(() => {
      if (!idImage) return;

      const imgurl = `${serveurURL}/image/article/${idImage}`;
      let currentImageSrc = null;
      
      fetch(imgurl, {
         method: "GET",
         mode: "cors",
         cache: "default"
      })
         .then((res) => {
            if (!res.ok) {
               throw new Error("Failed to load image");
            }
            return res.blob();
         })
         .then((blob) => {
            const objectURL = URL.createObjectURL(blob);
            currentImageSrc = objectURL;
            setImageSrc(objectURL);
            setLoading(false);
         })
         .catch((err) => {
            console.error("Error loading image:", err);
            setError(true);
            setLoading(false);
         });

      // Cleanup
      return () => {
         if (currentImageSrc) {
            URL.revokeObjectURL(currentImageSrc);
         }
         // Nettoyer aussi l'ancienne image si elle existe
         if (imageSrc) {
            URL.revokeObjectURL(imageSrc);
         }
      };
   }, [idImage, serveurURL]);

   if (loading) {
      return (
         <Box
            sx={{
               width: "100%",
               height: 400,
               display: "flex",
               alignItems: "center",
               justifyContent: "center",
               backgroundColor: "#e2e8f0"
            }}
         >
            <CircularProgress />
         </Box>
      );
   }

   if (error || !imageSrc) {
      return (
         <Box
            sx={{
               width: "100%",
               height: 400,
               display: "flex",
               alignItems: "center",
               justifyContent: "center",
               backgroundColor: "#e2e8f0",
               color: "#718096"
            }}
         >
            <Typography>{isFrench ? "Image non disponible" : "Image not available"}</Typography>
         </Box>
      );
   }

   return (
      <Box
         component="img"
         src={imageSrc}
         alt="Article"
         sx={{
            width: "100%",
            height: "auto",
            maxHeight: 600,
            objectFit: "contain",
            display: "block"
         }}
      />
   );
};

export const DisplayFullBodyArticle = ({ article, isFrench }) => {
   const mainTitreRef = useRef(null);

   useEffect(() => {
      if (mainTitreRef.current) {
         mainTitreRef.current.scrollIntoView({ behavior: "smooth" });
      }
   }, []);

   if (!article) return null;

   return (
      <Box
         ref={mainTitreRef}
         component="article"
         sx={{
            maxWidth: { xs: "100%", md: "850px" },
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: 3
         }}
      >
         {/* Sur-titre */}
         {article.surTitre && (
            <Chip
               label={article.surTitre}
               sx={{
                  width: "fit-content",
                  height: 40,
                  fontSize: "16px",
                  fontWeight: 700,
                  background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                  color: "white",
                  padding: "8px 16px"
               }}
            />
         )}

         {/* Titre */}
         <Typography
            variant="h3"
            sx={{
               fontWeight: 800,
               fontSize: { xs: "28px", md: "42px" },
               color: "#1a202c",
               fontFamily: "'Poppins', sans-serif",
               lineHeight: 1.3,
               marginTop: 1
            }}
         >
            {article.titre}
         </Typography>

         {/* Sous-titre */}
         {article.sousTitre && (
            <Typography
               variant="h6"
               sx={{
                  fontWeight: 400,
                  fontSize: { xs: "16px", md: "20px" },
                  color: "#4a5568",
                  fontFamily: "'Inter', sans-serif",
                  lineHeight: 1.7,
                  marginTop: -1
               }}
               dangerouslySetInnerHTML={{ __html: article.sousTitre }}
            />
         )}

         {/* Date et Auteur */}
         <Box
            sx={{
               display: "flex",
               flexDirection: { xs: "column", sm: "row" },
               alignItems: { xs: "flex-start", sm: "center" },
               gap: 2,
               padding: 2,
               backgroundColor: "#f7fafc",
               borderRadius: "12px",
               marginTop: 1
            }}
         >
            {article.datePublication && (
               <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <CalendarTodayIcon sx={{ fontSize: 18, color: "#718096" }} />
                  <Typography
                     sx={{
                        fontSize: "14px",
                        color: "#718096",
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 500
                     }}
                  >
                     {isFrench ? "Publié le" : "Published on"}:{" "}
                     {new Date(article.datePublication).toLocaleDateString("fr-FR", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit"
                     })}
                  </Typography>
               </Box>
            )}

            {article.auteur && (
               <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <PersonIcon sx={{ fontSize: 18, color: "#718096" }} />
                  <Typography
                     sx={{
                        fontSize: "14px",
                        color: "#718096",
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 500
                     }}
                  >
                     {isFrench ? "Par" : "By"}:{" "}
                     <Box component="span" sx={{ fontWeight: 600, color: "#1a202c" }}>
                        {article.auteur}
                     </Box>
                     {article.titreAuteur && (
                        <Box component="span" sx={{ color: "#718096", marginLeft: 1 }}>
                           - {article.titreAuteur}
                        </Box>
                     )}
                  </Typography>
               </Box>
            )}
         </Box>

         <Divider sx={{ marginY: 2 }} />

         {/* Image principale */}
         {article.imageArticles && article.imageArticles.length > 0 && (
            <Box
               sx={{
                  width: "100%",
                  marginTop: 2,
                  marginBottom: 2
               }}
            >
               <Box
                  sx={{
                     width: "100%",
                     borderRadius: "12px",
                     overflow: "hidden",
                     backgroundColor: "#e2e8f0",
                     marginBottom: 1
                  }}
               >
                  <DisplayImagePublic idImage={article.imageArticles[0].id} isFrench={isFrench} />
               </Box>
               {article.imageArticles[0].titre && (
                  <Typography
                     sx={{
                        fontSize: "14px",
                        color: "#718096",
                        fontStyle: "italic",
                        textAlign: "center",
                        marginTop: 1,
                        fontFamily: "'Inter', sans-serif"
                     }}
                  >
                     {article.imageArticles[0].titre}
                  </Typography>
               )}
            </Box>
         )}

         {/* Contenu de l'article */}
         <Box
            sx={{
               marginTop: 3,
               "& p": {
                  fontSize: "18px",
                  lineHeight: 1.8,
                  color: "#1a202c",
                  marginBottom: 2,
                  fontFamily: "'Inter', sans-serif",
                  textAlign: "justify"
               },
               "& h1, & h2, & h3, & h4, & h5, & h6": {
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 700,
                  color: "#1a202c",
                  marginTop: 3,
                  marginBottom: 2
               },
               "& a": {
                  color: "#16a34a",
                  textDecoration: "none",
                  fontWeight: 600,
                  "&:hover": {
                     color: "#15803d",
                     textDecoration: "underline"
                  }
               },
               "& img": {
                  maxWidth: "100%",
                  height: "auto",
                  borderRadius: "8px",
                  margin: "20px 0"
               },
               "& ul, & ol": {
                  paddingLeft: 3,
                  marginBottom: 2
               },
               "& li": {
                  marginBottom: 1,
                  fontSize: "18px",
                  lineHeight: 1.8
               },
               "& blockquote": {
                  borderLeft: "4px solid #16a34a",
                  paddingLeft: 2,
                  marginLeft: 0,
                  fontStyle: "italic",
                  color: "#4a5568",
                  backgroundColor: "#f7fafc",
                  padding: 2,
                  borderRadius: "8px",
                  marginY: 2
               },
               "& code": {
                  backgroundColor: "#f7fafc",
                  padding: "2px 6px",
                  borderRadius: "4px",
                  fontSize: "16px",
                  fontFamily: "'Courier New', monospace"
               },
               "& pre": {
                  backgroundColor: "#1a202c",
                  color: "#f7fafc",
                  padding: 2,
                  borderRadius: "8px",
                  overflow: "auto",
                  marginY: 2
               }
            }}
            dangerouslySetInnerHTML={{ __html: article.texte }}
         />
      </Box>
   );
};
