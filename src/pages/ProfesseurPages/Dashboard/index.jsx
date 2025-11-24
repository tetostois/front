import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
   Box,
   Container,
   Grid,
   Card,
   CardContent,
   Typography,
   CircularProgress,
   Alert,
   Button
} from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { AppContext } from "../../../context";
import { useFetch } from "../../../utils/hooks/FetchData";
import { MessageErrorServeurWithVarialbleHeight } from "../../../composants/MessageComponent";

export default function ProfesseurDashboard() {
   const { language, user } = useContext(AppContext);
   const navigation = useNavigate();
   const isFrench = language === "FR";
   
   const { isLoading, data, error } = useFetch(
      `/professeur/dashboard/${user?.matricule || ""}`,
      "GET"
   );

   const statCards = [
      {
         icon: <MenuBookIcon sx={{ fontSize: 40 }} />,
         value: data?.moduleTotal || 0,
         label: isFrench ? "Modules assignés" : "Assigned Modules",
         color: "#667eea",
         bgColor: "rgba(102, 126, 234, 0.1)"
      },
      {
         icon: <QuestionAnswerIcon sx={{ fontSize: 40 }} />,
         value: data?.qroEnAttente || 0,
         label: isFrench ? "QRO en attente" : "Pending QRO",
         color: "#f59e0b",
         bgColor: "rgba(245, 158, 11, 0.1)"
      },
      {
         icon: <AssignmentIcon sx={{ fontSize: 40 }} />,
         value: data?.qroTotal || 0,
         label: isFrench ? "Total QRO" : "Total QRO",
         color: "#10b981",
         bgColor: "rgba(16, 185, 129, 0.1)"
      }
   ];

   return (
      <>
         <Container fluid style={{ width: "100vw", margin: 0, padding: 0 }}>
            <Container maxWidth="lg" sx={{ py: 4 }}>
               <Typography
                  variant="h4"
                  sx={{
                     fontWeight: 700,
                     mb: 1,
                     color: "#1a202c",
                     fontFamily: "Inter, sans-serif"
                  }}
               >
                  {isFrench ? "Tableau de bord Professeur" : "Professor Dashboard"}
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
                     ? "Gérez vos modules assignés et répondez aux questions des étudiants"
                     : "Manage your assigned modules and answer student questions"}
               </Typography>

               {isLoading ? (
                  <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
                     <CircularProgress />
                  </Box>
               ) : error ? (
                  <MessageErrorServeurWithVarialbleHeight />
               ) : (
                  <>
                     {/* Statistiques */}
                     <Grid container spacing={3} sx={{ mb: 4 }}>
                        {statCards.map((stat, index) => (
                           <Grid item xs={12} sm={6} md={4} key={index}>
                              <Card
                                 sx={{
                                    borderRadius: "16px",
                                    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                                    transition: "all 0.3s ease",
                                    "&:hover": {
                                       transform: "translateY(-4px)",
                                       boxShadow: "0 8px 30px rgba(0,0,0,0.12)"
                                    }
                                 }}
                              >
                                 <CardContent sx={{ p: 3 }}>
                                    <Box
                                       sx={{
                                          display: "flex",
                                          alignItems: "center",
                                          mb: 2
                                       }}
                                    >
                                       <Box
                                          sx={{
                                             width: 64,
                                             height: 64,
                                             borderRadius: "12px",
                                             display: "flex",
                                             alignItems: "center",
                                             justifyContent: "center",
                                             backgroundColor: stat.bgColor,
                                             color: stat.color,
                                             mr: 2
                                          }}
                                       >
                                          {stat.icon}
                                       </Box>
                                       <Box>
                                          <Typography
                                             variant="h3"
                                             sx={{
                                                fontWeight: 700,
                                                color: "#1a202c",
                                                fontFamily: "Inter, sans-serif"
                                             }}
                                          >
                                             {stat.value}
                                          </Typography>
                                          <Typography
                                             variant="body2"
                                             sx={{
                                                color: "#718096",
                                                fontFamily: "Inter, sans-serif"
                                             }}
                                          >
                                             {stat.label}
                                          </Typography>
                                       </Box>
                                    </Box>
                                 </CardContent>
                              </Card>
                           </Grid>
                        ))}
                     </Grid>

                     {/* Modules assignés */}
                     <Card
                        sx={{
                           borderRadius: "16px",
                           boxShadow: "0 4px 20px rgba(0,0,0,0.08)"
                        }}
                     >
                        <CardContent sx={{ p: 4 }}>
                           <Typography
                              variant="h5"
                              sx={{
                                 fontWeight: 700,
                                 mb: 3,
                                 color: "#1a202c",
                                 fontFamily: "Inter, sans-serif"
                              }}
                           >
                              {isFrench ? "Mes modules" : "My Modules"}
                           </Typography>

                           {data?.modules && data.modules.length > 0 ? (
                              <Grid container spacing={2}>
                                 {data.modules.map((module) => (
                                    <Grid item xs={12} sm={6} md={4} key={module.idModule}>
                                       <Card
                                          sx={{
                                             borderRadius: "12px",
                                             border: "1px solid #e2e8f0",
                                             cursor: "pointer",
                                             transition: "all 0.3s ease",
                                             "&:hover": {
                                                borderColor: "#667eea",
                                                boxShadow: "0 4px 12px rgba(102, 126, 234, 0.15)"
                                             }
                                          }}
                                          onClick={() =>
                                             navigation(`/professeur/module/${module.idModule}`)
                                          }
                                       >
                                          <CardContent sx={{ p: 2.5 }}>
                                             <Box
                                                sx={{
                                                   display: "flex",
                                                   alignItems: "center",
                                                   mb: 1
                                                }}
                                             >
                                                <MenuBookIcon
                                                   sx={{
                                                      fontSize: 24,
                                                      color: "#667eea",
                                                      mr: 1
                                                   }}
                                                />
                                                <Typography
                                                   variant="h6"
                                                   sx={{
                                                      fontWeight: 600,
                                                      color: "#1a202c",
                                                      fontFamily: "Inter, sans-serif"
                                                   }}
                                                >
                                                   {module.titre}
                                                </Typography>
                                             </Box>
                                             <Typography
                                                variant="body2"
                                                sx={{
                                                   color: "#718096",
                                                   fontFamily: "Inter, sans-serif"
                                                }}
                                             >
                                                {isFrench
                                                   ? "Cliquez pour voir les détails"
                                                   : "Click to view details"}
                                             </Typography>
                                          </CardContent>
                                       </Card>
                                    </Grid>
                                 ))}
                              </Grid>
                           ) : (
                              <Alert severity="info" sx={{ borderRadius: "12px" }}>
                                 {isFrench
                                    ? "Aucun module assigné pour le moment"
                                    : "No modules assigned yet"}
                              </Alert>
                           )}
                        </CardContent>
                     </Card>
                  </>
               )}
            </Container>
         </Container>
      </>
   );
}

