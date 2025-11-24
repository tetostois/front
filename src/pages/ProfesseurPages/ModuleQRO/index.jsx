import React, { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
   Box,
   Container,
   Typography,
   Card,
   CardContent,
   CircularProgress,
   TextField,
   Button,
   Divider,
   Chip,
   Alert,
   Grid
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import SendIcon from "@mui/icons-material/Send";
import PersonIcon from "@mui/icons-material/Person";
import { AppContext } from "../../../context";
import { useFetch } from "../../../utils/hooks/FetchData";
import { MessageErrorServeurWithVarialbleHeight } from "../../../composants/MessageComponent";

export default function ModuleQRO() {
   const { idModule } = useParams();
   const { language, user, serveurURL } = useContext(AppContext);
   const navigation = useNavigate();
   const isFrench = language === "FR";
   const [reponses, setReponses] = useState({});
   const [saving, setSaving] = useState({});

   const { isLoading, data, error } = useFetch(
      `/professeur/qro/${user?.matricule || ""}/${idModule}`,
      "GET"
   );

   const handleReponseChange = (idQroEtudiant, value) => {
      setReponses({ ...reponses, [idQroEtudiant]: value });
   };

   const handleSaveReponse = async (idQroEtudiant) => {
      if (!reponses[idQroEtudiant] || reponses[idQroEtudiant].trim() === "") {
         return;
      }

      setSaving({ ...saving, [idQroEtudiant]: true });

      try {
         const response = await fetch(
            `${serveurURL}/professeur/qro/reponse/${idQroEtudiant}`,
            {
               method: "POST",
               headers: {
                  "Content-Type": "application/json"
               },
               body: JSON.stringify(reponses[idQroEtudiant])
            }
         );

         if (response.ok) {
            setReponses({ ...reponses, [idQroEtudiant]: "" });
            alert(isFrench ? "Réponse enregistrée avec succès" : "Response saved successfully");
         } else {
            alert(isFrench ? "Erreur lors de l'enregistrement" : "Error saving response");
         }
      } catch (error) {
         console.error("Error:", error);
         alert(isFrench ? "Erreur lors de l'enregistrement" : "Error saving response");
      } finally {
         setSaving({ ...saving, [idQroEtudiant]: false });
      }
   };

   // Grouper les QRO par chapitre et question
   const groupedQRO = {};
   if (data && Array.isArray(data)) {
      data.forEach((qroEtudiant) => {
         if (qroEtudiant.qro && qroEtudiant.qro.chapitre) {
            const chapitreId = qroEtudiant.qro.chapitre.idChapitre;
            const qroId = qroEtudiant.qro.id;
            const key = `${chapitreId}_${qroId}`;

            if (!groupedQRO[key]) {
               groupedQRO[key] = {
                 chapitre: qroEtudiant.qro.chapitre,
                 qro: qroEtudiant.qro,
                 reponses: []
               };
            }
            groupedQRO[key].reponses.push(qroEtudiant);
         }
      });
   }

   return (
      <>
         <Container fluid style={{ width: "100vw", margin: 0, padding: 0 }}>
            <Container maxWidth="lg" sx={{ py: 4 }}>
               <Box sx={{ mb: 3, display: "flex", alignItems: "center", gap: 2 }}>
                  <Button
                     startIcon={<ArrowBackIcon />}
                     onClick={() => navigation("/dashboard")}
                     sx={{
                        textTransform: "none",
                        color: "#667eea"
                     }}
                  >
                     {isFrench ? "Retour" : "Back"}
                  </Button>
               </Box>

               <Typography
                  variant="h4"
                  sx={{
                     fontWeight: 700,
                     mb: 1,
                     color: "#1a202c",
                     fontFamily: "Inter, sans-serif"
                  }}
               >
                  {isFrench ? "Réponses des étudiants (QRO)" : "Student Responses (QRO)"}
               </Typography>
               <Typography
                  variant="body1"
                  sx={{
                     color: "#718096",
                     mb: 4,
                     fontFamily: "Inter, sans-serif"
                  }}
               >
                  {isFrench
                     ? "Consultez et répondez aux questions ouvertes des étudiants"
                     : "Review and respond to student open-ended questions"}
               </Typography>

               {isLoading ? (
                  <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
                     <CircularProgress />
                  </Box>
               ) : error ? (
                  <MessageErrorServeurWithVarialbleHeight />
               ) : Object.keys(groupedQRO).length === 0 ? (
                  <Alert severity="info" sx={{ borderRadius: "12px" }}>
                     {isFrench
                        ? "Aucune réponse QRO pour ce module"
                        : "No QRO responses for this module"}
                  </Alert>
               ) : (
                  <Grid container spacing={3}>
                     {Object.values(groupedQRO).map((group, index) => (
                        <Grid item xs={12} key={index}>
                           <Card
                              sx={{
                                 borderRadius: "16px",
                                 boxShadow: "0 4px 20px rgba(0,0,0,0.08)"
                              }}
                           >
                              <CardContent sx={{ p: 3 }}>
                                 <Box sx={{ mb: 3 }}>
                                    <Chip
                                       icon={<QuestionAnswerIcon />}
                                       label={
                                          isFrench
                                             ? `Chapitre: ${group.chapitre.titre}`
                                             : `Chapter: ${group.chapitre.titre}`
                                       }
                                       sx={{
                                          mb: 2,
                                          backgroundColor: "rgba(102, 126, 234, 0.1)",
                                          color: "#667eea",
                                          fontWeight: 600
                                       }}
                                    />
                                    <Typography
                                       variant="h6"
                                       sx={{
                                          fontWeight: 600,
                                          color: "#1a202c",
                                          fontFamily: "Inter, sans-serif",
                                          mb: 2
                                       }}
                                    >
                                       {isFrench ? group.qro.intitule : group.qro.intituleEn}
                                    </Typography>
                                 </Box>

                                 <Divider sx={{ my: 2 }} />

                                 {group.reponses.map((qroEtudiant) => (
                                    <Box key={qroEtudiant.id} sx={{ mb: 3 }}>
                                       <Box
                                          sx={{
                                             display: "flex",
                                             alignItems: "center",
                                             mb: 1.5
                                          }}
                                       >
                                          <PersonIcon
                                             sx={{
                                                fontSize: 20,
                                                color: "#667eea",
                                                mr: 1
                                             }}
                                          />
                                          <Typography
                                             variant="subtitle2"
                                             sx={{
                                                fontWeight: 600,
                                                color: "#1a202c",
                                                fontFamily: "Inter, sans-serif"
                                             }}
                                          >
                                             {qroEtudiant.etudiant?.nom || ""}{" "}
                                             {qroEtudiant.etudiant?.prenom || ""}
                                          </Typography>
                                       </Box>

                                       <Card
                                          sx={{
                                             backgroundColor: "#f7fafc",
                                             borderRadius: "8px",
                                             p: 2,
                                             mb: 2
                                          }}
                                       >
                                          <Typography
                                             variant="body2"
                                             sx={{
                                                color: "#4a5568",
                                                fontFamily: "Inter, sans-serif",
                                                whiteSpace: "pre-wrap"
                                             }}
                                          >
                                             {qroEtudiant.reponse}
                                          </Typography>
                                          {qroEtudiant.dateAjout && (
                                             <Typography
                                                variant="caption"
                                                sx={{
                                                   color: "#a0aec0",
                                                   mt: 1,
                                                   display: "block"
                                                }}
                                             >
                                                {new Date(
                                                   qroEtudiant.dateAjout
                                                ).toLocaleDateString("fr-FR", {
                                                   year: "numeric",
                                                   month: "long",
                                                   day: "numeric",
                                                   hour: "2-digit",
                                                   minute: "2-digit"
                                                })}
                                             </Typography>
                                          )}
                                       </Card>

                                       <TextField
                                          fullWidth
                                          multiline
                                          rows={3}
                                          placeholder={
                                             isFrench
                                                ? "Votre réponse..."
                                                : "Your response..."
                                          }
                                          value={reponses[qroEtudiant.id] || ""}
                                          onChange={(e) =>
                                             handleReponseChange(
                                                qroEtudiant.id,
                                                e.target.value
                                             )
                                          }
                                          sx={{ mb: 1 }}
                                       />
                                       <Button
                                          variant="contained"
                                          startIcon={<SendIcon />}
                                          onClick={() =>
                                             handleSaveReponse(qroEtudiant.id)
                                          }
                                          disabled={
                                             !reponses[qroEtudiant.id] ||
                                             reponses[qroEtudiant.id].trim() === "" ||
                                             saving[qroEtudiant.id]
                                          }
                                          sx={{
                                             textTransform: "none",
                                             background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                             "&:hover": {
                                                background: "linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)"
                                             }
                                          }}
                                       >
                                          {saving[qroEtudiant.id]
                                             ? isFrench
                                                ? "Enregistrement..."
                                                : "Saving..."
                                             : isFrench
                                             ? "Envoyer la réponse"
                                             : "Send Response"}
                                       </Button>
                                    </Box>
                                 ))}
                              </CardContent>
                           </Card>
                        </Grid>
                     ))}
                  </Grid>
               )}
            </Container>
         </Container>
      </>
   );
}

