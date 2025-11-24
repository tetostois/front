import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../../context";
import { useFetch } from "../../../../utils/hooks/FetchData";
import AdminPageTemplate from "../../../../composants/AdminPageTemplate";
import { TableCell, Button, Chip, Typography, Box } from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function Article() {
   const navigation = useNavigate();
   const { language } = useContext(AppContext);
   const [pageNumber, setPageNumber] = useState(0);
   const [filter, setFilter] = useState(null);
   const [update, setUpdate] = useState(false);
   const { isLoading, data, error } = useFetch(`/media/articles/${pageNumber}`, "GET", null, filter, update);
   const isFrench = language === "FR";

   const columns = [
      { label: "N°" },
      { label: isFrench ? "Titre" : "Title" },
      { label: isFrench ? "Rubrique" : "Category" },
      { label: isFrench ? "Date" : "Date" },
      { label: isFrench ? "Vues" : "Views" },
      { label: isFrench ? "Statut" : "Status" },
      { label: isFrench ? "Actions" : "Actions" },
   ];

   const getStatusColor = (statut) => {
      switch (statut) {
         case "PUBLIER":
         case "PUBLIE":
            return { bg: "#e6fffa", color: "#234e52" };
         case "EN_ATTENTE":
            return { bg: "#fffbea", color: "#744210" };
         case "SUSPENDU":
            return { bg: "#fed7d7", color: "#742a2a" };
         default:
            return { bg: "#edf2f7", color: "#4a5568" };
      }
   };

   const renderRow = (article, index) => {
      const statusColors = getStatusColor(article.statut);

      return (
         <>
            <TableCell>
               <Typography variant="body2" sx={{ fontWeight: 500, color: "#4a5568" }}>
                  {(data?.size || 50) * pageNumber + index + 1}
               </Typography>
            </TableCell>
            <TableCell>
               <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: "#1a202c" }}>
                     {article.titre || "-"}
                  </Typography>
                  {article.sousTitre && (
                     <Typography variant="caption" sx={{ color: "#718096" }}>
                        {article.sousTitre}
                     </Typography>
                  )}
               </Box>
            </TableCell>
            <TableCell>
               <Chip
                  label={article.rubrique?.nom || (isFrench ? "Non définie" : "Undefined")}
                  size="small"
                  sx={{
                     backgroundColor: "#e6f3ff",
                     color: "#2c5282",
                     fontWeight: 500,
                  }}
               />
            </TableCell>
            <TableCell>
               <Typography variant="body2" sx={{ color: "#718096" }}>
                  {article.date
                     ? new Date(article.date).toLocaleDateString(isFrench ? "fr-FR" : "en-US", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                       })
                     : "-"}
               </Typography>
            </TableCell>
            <TableCell>
               <Typography variant="body2" sx={{ fontWeight: 600, color: "#667eea" }}>
                  {article.etat || 0} {article.etat > 1 ? (isFrench ? "vues" : "views") : isFrench ? "vue" : "view"}
               </Typography>
            </TableCell>
            <TableCell>
               <Chip
                  label={article.statut || "-"}
                  size="small"
                  sx={{
                     backgroundColor: statusColors.bg,
                     color: statusColors.color,
                     fontWeight: 600,
                  }}
               />
            </TableCell>
            <TableCell>
               <Button
                  variant="outlined"
                  size="small"
                  startIcon={<VisibilityIcon />}
                  onClick={() => navigation(`/article/${article.id}`)}
                  sx={{
                     textTransform: "none",
                     borderRadius: "8px",
                     borderColor: "#667eea",
                     color: "#667eea",
                     "&:hover": {
                        borderColor: "#764ba2",
                        backgroundColor: "rgba(102, 126, 234, 0.1)",
                     },
                  }}
               >
                  {isFrench ? "Voir" : "View"}
               </Button>
            </TableCell>
         </>
      );
   };

   return (
      <AdminPageTemplate
         title={isFrench ? "Liste des Articles" : "Articles List"}
         subtitle={
            isFrench
               ? "Gérez les articles publiés sur la plateforme média"
               : "Manage the articles published on the media platform"
         }
         icon={ArticleIcon}
         addButtonText={isFrench ? "Créer un Article" : "Create Article"}
         addButtonPath="/article/creer"
         isLoading={isLoading}
         error={error}
         data={data}
         columns={columns}
         renderRow={renderRow}
         emptyMessage={isFrench ? "Aucun article trouvé" : "No articles found"}
         language={language}
         pageNumber={pageNumber}
         setPageNumber={setPageNumber}
         showPagination={true}
      />
   );
}
