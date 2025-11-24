import React, { useState, useContext } from 'react';
import { useFetch } from '../../../../utils/hooks/FetchData';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    Card,
    CardContent,
    CircularProgress,
    Backdrop,
    Grid,
    Chip,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Breadcrumbs,
    Link as MuiLink,
    Divider,
    Alert
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import AssessmentIcon from '@mui/icons-material/Assessment';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { MessageErrorServeur } from '../../../../composants/MessageComponent';
import { AppContext } from '../../../../context';

export default function ShowEtudiant() {
   const { matriculeEtudiant } = useParams();
    const { language } = useContext(AppContext);
   const [filter, setFilter] = useState(null);
   const [update, setUpdate] = useState(false);
    const { isLoading, data, error } = useFetch(`/admin/etudiant/${matriculeEtudiant}`, 'GET', null, filter, update);
    const isFrench = language === 'FR';

   return (
        <Box className="adminPageContainer">
            {/* Header Section */}
            <Box className="adminPageHeader">
                <Box className="adminPageHeaderContent">
                    <Box className="adminPageHeaderIconContainer">
                        <PersonIcon className="adminPageHeaderIcon" />
                    </Box>
                    <Box>
                        <Breadcrumbs sx={{ mb: 1, color: 'rgba(255, 255, 255, 0.8)' }}>
                            <MuiLink
                                component="button"
                                variant="body2"
                                onClick={() => window.history.back()}
                                sx={{ color: 'rgba(255, 255, 255, 0.8)', textDecoration: 'none', cursor: 'pointer' }}
                            >
                                {isFrench ? 'Étudiants' : 'Students'}
                            </MuiLink>
                            <Typography variant="body2" sx={{ color: '#fff', fontWeight: 500 }}>
                                {data?.etudiant?.matricule || matriculeEtudiant}
                            </Typography>
                        </Breadcrumbs>
                        <Typography variant="h4" className="adminPageTitle">
                            {data?.etudiant?.nom && data?.etudiant?.prenom
                                ? `${data.etudiant.prenom} ${data.etudiant.nom}`
                                : isFrench
                                ? 'Détails de l\'Étudiant'
                                : 'Student Details'}
                        </Typography>
                        <Typography variant="body1" className="adminPageSubtitle">
                            {isFrench
                                ? 'Informations détaillées et progression de l\'étudiant'
                                : 'Detailed information and student progress'}
                        </Typography>
                    </Box>
                </Box>
            </Box>

            {/* Loading State */}
         {isLoading ? (
                <Box className="adminPageLoading">
                    <Backdrop open={true} sx={{ zIndex: 1000, color: '#fff' }}>
                        <Box sx={{ textAlign: 'center' }}>
                            <CircularProgress size={60} sx={{ color: '#667eea', mb: 2 }} />
                            <Typography variant="h6" sx={{ color: '#fff', mt: 2 }}>
                                {isFrench ? 'Chargement des détails...' : 'Loading details...'}
                            </Typography>
                        </Box>
                    </Backdrop>
                </Box>
         ) : error ? (
                <Box className="adminPageError">
            <MessageErrorServeur />
                </Box>
            ) : (
                <Box className="adminPageContent">
                    <InfoGeneral formEtudiant={data} isFrench={isFrench} />
                    <InfoModules formEtudiant={data} isFrench={isFrench} />
                </Box>
            )}
        </Box>
    );
}

const InfoGeneral = ({ formEtudiant, isFrench }) => {
    const etudiant = formEtudiant?.etudiant || {};
    const etudiantModules = formEtudiant?.etudiantModules || [];
    const etudiantChapitres = formEtudiant?.etudiantChapitres || [];
    const chapitreSimpleforms = formEtudiant?.chapitreSimpleforms || [];

    const totalQCMValides = etudiantChapitres.reduce((total, chapitre) => total + (chapitre.qcmValide || 0), 0);
    const totalQCM = chapitreSimpleforms.reduce((total, item) => total + (item.qcm || 0), 0);

    return (
        <Grid container spacing={3} sx={{ mb: 3 }}>
            {/* Personal Information */}
            <Grid item xs={12} md={6}>
                <Card sx={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                    <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <PersonIcon sx={{ fontSize: 24, color: '#667eea', mr: 1.5 }} />
                            <Typography variant="h6" sx={{ fontWeight: 600, color: '#1a202c' }}>
                                {isFrench ? 'Informations Générales' : 'General Information'}
                            </Typography>
                        </Box>
                        <Divider sx={{ mb: 2 }} />
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <InfoRow
                                label={isFrench ? 'Matricule' : 'Matricule'}
                                value={etudiant.matricule}
                                icon={<SchoolIcon sx={{ fontSize: 18, color: '#667eea' }} />}
                            />
                            <InfoRow
                                label={isFrench ? 'Nom' : 'Last Name'}
                                value={etudiant.nom}
                            />
                            <InfoRow
                                label={isFrench ? 'Prénom' : 'First Name'}
                                value={etudiant.prenom}
                            />
                            <InfoRow
                                label="Email"
                                value={etudiant.email}
                                icon={<EmailIcon sx={{ fontSize: 18, color: '#667eea' }} />}
                            />
                            <InfoRow
                                label={isFrench ? 'Téléphone' : 'Phone'}
                                value={etudiant.telephone}
                                icon={<PhoneIcon sx={{ fontSize: 18, color: '#667eea' }} />}
                            />
                            <InfoRow
                                label={isFrench ? 'Date d\'inscription' : 'Registration Date'}
                                value={
                                    etudiant.dateInscription
                                        ? new Date(etudiant.dateInscription).toLocaleDateString('fr-FR', {
                                              day: 'numeric',
                                              month: 'long',
                                              year: 'numeric'
                                          })
                                        : '-'
                                }
                                icon={<CalendarTodayIcon sx={{ fontSize: 18, color: '#667eea' }} />}
                            />
                            <InfoRow
                                label={isFrench ? 'Profession' : 'Profession'}
                                value={etudiant.profession}
                                icon={<WorkIcon sx={{ fontSize: 18, color: '#667eea' }} />}
                            />
                            <InfoRow
                                label={isFrench ? 'Région' : 'Region'}
                                value={etudiant.region?.nom}
                                icon={<LocationOnIcon sx={{ fontSize: 18, color: '#667eea' }} />}
                            />
                        </Box>
                    </CardContent>
                </Card>
            </Grid>

            {/* Evaluation */}
            <Grid item xs={12} md={6}>
                <Card sx={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                    <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <AssessmentIcon sx={{ fontSize: 24, color: '#667eea', mr: 1.5 }} />
                            <Typography variant="h6" sx={{ fontWeight: 600, color: '#1a202c' }}>
                                {isFrench ? 'Évaluation sur la Formation' : 'Training Evaluation'}
                            </Typography>
                        </Box>
                        <Divider sx={{ mb: 2 }} />
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <StatCard
                                label={isFrench ? 'Modules Débutés' : 'Modules Started'}
                                value={etudiantModules.length}
                                icon={<SchoolIcon />}
                                color="#667eea"
                            />
                            <StatCard
                                label={isFrench ? 'Cours / Chapitres Lus' : 'Courses / Chapters Read'}
                                value={etudiantChapitres.length}
                                icon={<SchoolIcon />}
                                color="#43e97b"
                            />
                            <StatCard
                                label={isFrench ? 'QCM Validés' : 'QCM Validated'}
                                value={`${totalQCMValides} / ${totalQCM}`}
                                icon={<AssessmentIcon />}
                                color="#4facfe"
                            />
                            <InfoRow
                                label={isFrench ? 'Dernière Connexion' : 'Last Connection'}
                                value={
                                    etudiant.lastConnexion
                                        ? new Date(etudiant.lastConnexion).toLocaleDateString('fr-FR', {
                                              day: 'numeric',
                                              month: 'long',
                                              year: 'numeric',
                                              hour: '2-digit',
                                              minute: '2-digit'
                                          })
                                        : '-'
                                }
                                icon={<CalendarTodayIcon sx={{ fontSize: 18, color: '#667eea' }} />}
                            />
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

const InfoRow = ({ label, value, icon }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {icon}
        <Box sx={{ flex: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 600, color: '#718096', mb: 0.5 }}>
                {label}
            </Typography>
            <Typography variant="body1" sx={{ color: '#1a202c', fontWeight: 500 }}>
                {value || '-'}
            </Typography>
        </Box>
    </Box>
);

const StatCard = ({ label, value, icon, color }) => {
    // Gérer l'icône : soit c'est un élément React, soit c'est un composant
    let renderedIcon = null;
    if (React.isValidElement(icon)) {
        // Si c'est déjà un élément React, cloner avec les styles
        renderedIcon = React.cloneElement(icon, { sx: { fontSize: 24, color: color } });
    } else if (icon && typeof icon === 'function') {
        // Si c'est un composant, créer un élément
        renderedIcon = React.createElement(icon, { sx: { fontSize: 24, color: color } });
    } else if (icon) {
        // Sinon, utiliser tel quel
        renderedIcon = icon;
    }

    return (
        <Box
            sx={{
                p: 2,
                borderRadius: '12px',
                background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`,
                border: `1px solid ${color}30`
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box
                    sx={{
                        p: 1,
                        borderRadius: '10px',
                        backgroundColor: `${color}20`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    {renderedIcon}
                </Box>
                <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#718096', mb: 0.5 }}>
                        {label}
                    </Typography>
                    <Typography variant="h6" sx={{ color: color, fontWeight: 700 }}>
                        {value}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

const InfoModules = ({ formEtudiant, isFrench }) => {
    const moduleSimpleForms = formEtudiant?.moduleSimpleForms || [];
    const chapitreSimpleforms = formEtudiant?.chapitreSimpleforms || [];
    const etudiantChapitres = formEtudiant?.etudiantChapitres || [];
    const etudiantModules = formEtudiant?.etudiantModules || [];

   return (
      <>
         {moduleSimpleForms.map((module, index) => (
                <InfoByModule
                    key={module.idModule}
                    formEtudiant={formEtudiant}
                    module={module}
                    chapitreSimpleforms={chapitreSimpleforms}
                    etudiantChapitres={etudiantChapitres}
                    etudiantModules={etudiantModules}
                    isFrench={isFrench}
                />
         ))}
      </>
   );
};

const InfoByModule = ({ formEtudiant, module, chapitreSimpleforms, etudiantChapitres, etudiantModules, isFrench }) => {
   let ModuleChapitres = [];
   let dateDebut;
   let courLu = 0;
   let courTotal = 0;
   let isStarted = false;
   let qcmValider = 0;
   let totalQcm = 0;

    chapitreSimpleforms.forEach((element) => {
      if (element.idModule == module.idModule) {
            etudiantChapitres.forEach((etudiantChapitre) => {
            if (etudiantChapitre.chapitre.idChapitre == element.idChapitre) {
               element.etudiantChapitre = etudiantChapitre;
                    qcmValider += etudiantChapitre.qcmValide || 0;
               courLu++;
            }
         });
         ModuleChapitres.push(element);
            totalQcm += element.qcm || 0;
         courTotal++;
      }
   });

    etudiantModules.forEach((etudiantModule) => {
      if (etudiantModule.module.idModule == module.idModule) {
         dateDebut = etudiantModule.dateDebut;
         isStarted = true;
      }
   });

   return (
        <Card sx={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', mb: 3 }}>
            <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <SchoolIcon sx={{ fontSize: 24, color: '#667eea', mr: 1.5 }} />
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#1a202c' }}>
                        {isFrench ? 'Module' : 'Module'}: {module.titre}
                    </Typography>
                </Box>
                <Divider sx={{ mb: 2 }} />
                <Grid container spacing={2} sx={{ mb: 2 }}>
                    <Grid item xs={12} md={3}>
                        <StatCard
                            label={isFrench ? 'Date de Début' : 'Start Date'}
                            value={
                                dateDebut
                                    ? new Date(dateDebut).toLocaleDateString('fr-FR', {
                                          day: 'numeric',
                                          month: 'short',
                                          year: 'numeric'
                                      })
                                    : '-'
                            }
                            icon={<CalendarTodayIcon />}
                            color="#667eea"
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <StatCard
                            label={isFrench ? 'Cours Commencés' : 'Courses Started'}
                            value={`${courLu} / ${courTotal}`}
                            icon={<SchoolIcon />}
                            color="#43e97b"
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <StatCard
                            label={isFrench ? 'QCM Validés' : 'QCM Validated'}
                            value={`${qcmValider} / ${totalQcm}`}
                            icon={<AssessmentIcon />}
                            color="#4facfe"
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Chip
                            label={isStarted ? (isFrench ? 'Commencer' : 'Started') : (isFrench ? 'Non Commencé' : 'Not Started')}
                            sx={{
                                backgroundColor: isStarted ? '#e6fffa' : '#fed7d7',
                                color: isStarted ? '#234e52' : '#742a2a',
                                fontWeight: 600,
                                fontSize: 14,
                                padding: '8px 16px'
                            }}
                        />
                    </Grid>
                </Grid>

               {!isStarted && (
                    <Alert severity="warning" sx={{ mb: 2, borderRadius: '12px' }}>
                        {isFrench
                            ? "L'étudiant n'a pas encore débuté avec ce module"
                            : 'The student has not yet started with this module'}
                    </Alert>
                )}

                {isStarted && ModuleChapitres.length > 0 && (
                    <TableContainer component={Paper} sx={{ boxShadow: 'none', borderRadius: '12px' }}>
                     <Table>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: '#f7fafc' }}>
                                    <TableCell sx={{ fontWeight: 600 }}>N°</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>
                                        {isFrench ? 'Cours / Chapitre' : 'Course / Chapter'}
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>
                                        {isFrench ? 'Date Début' : 'Start Date'}
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 600, textAlign: 'center' }}>
                                        {isFrench ? 'QCM Validé' : 'QCM Validated'}
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 600, textAlign: 'center' }}>
                                        {isFrench ? 'QCM Total' : 'QCM Total'}
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 600, textAlign: 'center' }}>
                                        {isFrench ? 'Statut' : 'Status'}
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {ModuleChapitres.map((chapitre, index) => {
                                    const isValidated =
                                          chapitre.etudiantChapitre &&
                                        chapitre.etudiantChapitre.qcmValide >= (chapitre.qcm || 0) / 2;
                                    return (
                                        <TableRow
                                            key={chapitre.idChapitre}
                                            sx={{
                                                '&:hover': { backgroundColor: '#f7fafc' },
                                                transition: 'background-color 0.2s ease'
                                            }}
                                        >
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>
                                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                    {chapitre.titre}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                {chapitre.etudiantChapitre
                                                    ? new Date(chapitre.etudiantChapitre.dateDebut).toLocaleDateString(
                                                          'fr-FR',
                                                          {
                                                              day: 'numeric',
                                                              month: 'short',
                                                              year: 'numeric'
                                                          }
                                                      )
                                                    : '-'}
                                            </TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}>
                                                <Chip
                                                    label={chapitre.etudiantChapitre?.qcmValide || 0}
                                                    size="small"
                                                    sx={{
                                                        backgroundColor: chapitre.etudiantChapitre?.qcmValide
                                                            ? '#e6f3ff'
                                                            : '#fed7d7',
                                                        color: chapitre.etudiantChapitre?.qcmValide ? '#2c5282' : '#742a2a',
                                                        fontWeight: 500
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}>
                                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                    {chapitre.qcm || 0}
                                                </Typography>
                                            </TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}>
                                                {chapitre.etudiantChapitre ? (
                                                    <Chip
                                                        label={isValidated ? (isFrench ? 'Validé' : 'Validated') : (isFrench ? 'Non Validé' : 'Not Validated')}
                                                        size="small"
                                                        icon={isValidated ? <CheckCircleIcon /> : <CancelIcon />}
                                                        sx={{
                                                            backgroundColor: isValidated ? '#e6fffa' : '#fed7d7',
                                                            color: isValidated ? '#234e52' : '#742a2a',
                                                            fontWeight: 500
                                                        }}
                                                    />
                                                ) : (
                                                    <Typography variant="body2" sx={{ color: '#cbd5e0' }}>
                                                        -
                                                    </Typography>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                     </Table>
                    </TableContainer>
               )}
            </CardContent>
        </Card>
   );
};
