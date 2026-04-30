import React, { useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../../../../../context';
import { useFetch } from '../../../../../utils/hooks/FetchData';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Button,
    CircularProgress,
    Backdrop,
    Grid,
    Chip,
    Divider,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Alert,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Breadcrumbs,
    Link as MuiLink
} from '@mui/material';
import { FormTextInput } from '../../../../../composants/UiInputs';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ImageIcon from '@mui/icons-material/Image';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import QuizIcon from '@mui/icons-material/Quiz';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { MessageErrorServeur } from '../../../../../composants/MessageComponent';
import SaveComponent from '../../../../../composants/SaveComponent';

export default function ShowCourAdmin() {
    const { idChapitre } = useParams();
    const navigation = useNavigate();
    const { language } = useContext(AppContext);
    const [update, setUpdate] = useState(false);
    const { isLoading, data, error } = useFetch(`/admin/cour/${idChapitre}`, 'GET', null, null, update);
    const isFrench = language === 'FR';

    const handleModifierClick = () => {
        navigation(`/cour/alter/${idChapitre}`);
    };

    return (
        <Box className="adminPageContainer">
            {/* Header Section */}
            <Box className="adminPageHeader">
                <Box className="adminPageHeaderContent">
                    <Box className="adminPageHeaderIconContainer">
                        <MenuBookIcon className="adminPageHeaderIcon" />
                    </Box>
                    <Box>
                        <Breadcrumbs sx={{ mb: 1, color: 'rgba(255, 255, 255, 0.8)' }}>
                            <MuiLink
                                component="button"
                                variant="body2"
                                onClick={() => navigation('/cours')}
                                sx={{ color: 'rgba(255, 255, 255, 0.8)', textDecoration: 'none', cursor: 'pointer' }}
                            >
                                {isFrench ? 'Cours' : 'Courses'}
                            </MuiLink>
                            <Typography variant="body2" sx={{ color: '#fff', fontWeight: 500 }}>
                                {data?.chapitre?.titre || idChapitre}
                            </Typography>
                        </Breadcrumbs>
                        <Typography variant="h4" className="adminPageTitle">
                            {data?.chapitre?.titre || (isFrench ? 'Détails du Cours' : 'Course Details')}
                        </Typography>
                        <Typography variant="body1" className="adminPageSubtitle">
                            {isFrench
                                ? 'Informations détaillées, sections, QCM et QRO du chapitre'
                                : 'Detailed information, sections, QCM and QRO of the chapter'}
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                        variant="outlined"
                        startIcon={<ArrowBackIcon />}
                        onClick={() => navigation(-1)}
                        sx={{
                            textTransform: 'none',
                            borderRadius: '12px',
                            borderColor: 'rgba(255, 255, 255, 0.5)',
                            color: '#fff',
                            '&:hover': {
                                borderColor: '#fff',
                                backgroundColor: 'rgba(255, 255, 255, 0.1)'
                            },
                            fontWeight: 600,
                            fontSize: 15,
                            padding: '10px 24px'
                        }}
                    >
                        {isFrench ? 'Retour' : 'Back'}
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<EditIcon />}
                        onClick={handleModifierClick}
                        sx={{
                            background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
                                boxShadow: '0 6px 12px rgba(56, 249, 215, 0.3)'
                            },
                            textTransform: 'none',
                            borderRadius: '12px',
                            fontWeight: 600,
                            fontSize: 15,
                            padding: '10px 24px',
                            boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                        }}
                    >
                        {isFrench ? 'Modifier' : 'Edit'}
                    </Button>
                </Box>
            </Box>

            {/* Loading State */}
            {isLoading ? (
                <Box className="adminPageLoading">
                    <Backdrop open={true} sx={{ zIndex: 1000, color: '#fff' }}>
                        <Box sx={{ textAlign: 'center' }}>
                            <CircularProgress size={60} sx={{ color: '#16a34a', mb: 2 }} />
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
                    <InformationGeneral formChapitre={data} navigation={navigation} isFrench={isFrench} />
                    <ListBlock chapitre={data?.chapitre} isFrench={isFrench} />
                    <ListQCM listQcm={data?.chapitre?.qcms} idChapitre={idChapitre} navigation={navigation} isFrench={isFrench} />
                    <ListQRO listQRO={data?.chapitre?.qros} setUpdate={setUpdate} formChapitre={data} isFrench={isFrench} />
                </Box>
            )}
        </Box>
    );
}

const InformationGeneral = ({ formChapitre, navigation, isFrench }) => {
    const chapitre = formChapitre?.chapitre || {};

    return (
        <Grid container spacing={3} sx={{ mb: 3 }}>
            {/* Module Info */}
            <Grid item xs={12}>
                <Card sx={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                    <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <FolderOpenIcon sx={{ fontSize: 24, color: '#16a34a', mr: 1.5 }} />
                            <Typography variant="h6" sx={{ fontWeight: 600, color: '#1a202c' }}>
                                {isFrench ? 'Module de Formation' : 'Training Module'}
                            </Typography>
                        </Box>
                        <Divider sx={{ mb: 2 }} />
                        {chapitre.module && (
                            <Chip
                                label={chapitre.module.titre}
                                onClick={() => navigation(`/module/${chapitre.module.idModule}`)}
                                sx={{
                                    backgroundColor: '#e6f3ff',
                                    color: '#2c5282',
                                    fontWeight: 600,
                                    fontSize: 15,
                                    padding: '8px 16px',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        backgroundColor: '#cfe2ff'
                                    }
                                }}
                            />
                        )}
                    </CardContent>
                </Card>
            </Grid>

            {/* General Information */}
            <Grid item xs={12} md={6}>
                <Card sx={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', height: '100%' }}>
                    <CardContent sx={{ p: 3 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: '#1a202c', mb: 2 }}>
                            {isFrench ? 'Informations Générales' : 'General Information'}
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Box>
                                <Typography variant="body2" sx={{ fontWeight: 600, color: '#718096', mb: 0.5 }}>
                                    {isFrench ? 'Titre' : 'Title'}
                                </Typography>
                                <Typography variant="body1" sx={{ fontWeight: 500, color: '#1a202c' }}>
                                    {chapitre.titre || '-'}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="body2" sx={{ fontWeight: 600, color: '#718096', mb: 0.5 }}>
                                    {isFrench ? 'Description' : 'Description'}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#4a5568' }}>
                                    {chapitre.description || '-'}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="body2" sx={{ fontWeight: 600, color: '#718096', mb: 0.5 }}>
                                    {isFrench ? 'Préambule' : 'Preamble'}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#4a5568' }}>
                                    {chapitre.preanbule || '-'}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <CalendarTodayIcon sx={{ fontSize: 18, color: '#16a34a' }} />
                                <Box>
                                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#718096' }}>
                                        {isFrench ? 'Date de Création' : 'Creation Date'}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#4a5568' }}>
                                        {chapitre.dateAjout
                                            ? new Date(chapitre.dateAjout).toLocaleDateString('fr-FR', {
                                                  day: 'numeric',
                                                  month: 'long',
                                                  year: 'numeric'
                                              })
                                            : '-'}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box>
                                <Typography variant="body2" sx={{ fontWeight: 600, color: '#718096', mb: 0.5 }}>
                                    {isFrench ? 'Ordre dans le Module' : 'Order in Module'}
                                </Typography>
                                <Chip
                                    label={chapitre.ordre || '-'}
                                    size="small"
                                    sx={{
                                        backgroundColor: '#e6f3ff',
                                        color: '#2c5282',
                                        fontWeight: 500
                                    }}
                                />
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>

            {/* Media Links */}
            <Grid item xs={12} md={6}>
                <Card sx={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', height: '100%' }}>
                    <CardContent sx={{ p: 3 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: '#1a202c', mb: 2 }}>
                            {isFrench ? 'Médias' : 'Media'}
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <ImageIcon sx={{ fontSize: 20, color: '#16a34a' }} />
                                <Box sx={{ flex: 1 }}>
                                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#718096', mb: 0.5 }}>
                                        {isFrench ? 'Image Descriptive' : 'Descriptive Image'}
                                    </Typography>
                                    {chapitre.image ? (
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: '#2c5282',
                                                wordBreak: 'break-all',
                                                fontFamily: 'monospace',
                                                fontSize: 12
                                            }}
                                        >
                                            {chapitre.image}
                                        </Typography>
                                    ) : (
                                        <Typography variant="body2" sx={{ color: '#cbd5e0', fontStyle: 'italic' }}>
                                            {isFrench ? 'Aucune image' : 'No image'}
                                        </Typography>
                                    )}
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <VideoLibraryIcon sx={{ fontSize: 20, color: '#4facfe' }} />
                                <Box sx={{ flex: 1 }}>
                                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#718096', mb: 0.5 }}>
                                        {isFrench ? 'Vidéo de Présentation' : 'Presentation Video'}
                                    </Typography>
                                    {chapitre.video ? (
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: '#2c5282',
                                                wordBreak: 'break-all',
                                                fontFamily: 'monospace',
                                                fontSize: 12
                                            }}
                                        >
                                            {chapitre.video}
                                        </Typography>
                                    ) : (
                                        <Typography variant="body2" sx={{ color: '#cbd5e0', fontStyle: 'italic' }}>
                                            {isFrench ? 'Aucune vidéo' : 'No video'}
                                        </Typography>
                                    )}
                                </Box>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>

            {/* Main Text */}
            {chapitre.texte && (
                <Grid item xs={12}>
                    <Card sx={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                        <CardContent sx={{ p: 3 }}>
                            <Typography variant="h6" sx={{ fontWeight: 600, color: '#1a202c', mb: 2 }}>
                                {isFrench ? 'Texte Principal' : 'Main Text'}
                            </Typography>
                            <Divider sx={{ mb: 2 }} />
                            <Box
                                sx={{
                                    p: 2,
                                    backgroundColor: '#f7fafc',
                                    borderRadius: '12px',
                                    border: '1px solid #e2e8f0'
                                }}
                            >
                                <Typography
                                    variant="body1"
                                    dangerouslySetInnerHTML={{ __html: chapitre.texte }}
                                    sx={{
                                        '& p': { margin: '8px 0', textAlign: 'justify' },
                                        '& h1, & h2, & h3': { color: '#1a202c', marginTop: '16px' },
                                        '& a': { color: '#16a34a', textDecoration: 'none' },
                                        whiteSpace: 'pre-wrap'
                                    }}
                                />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            )}
        </Grid>
    );
};

const ListBlock = ({ chapitre, isFrench }) => {
    const blocs = chapitre?.blocs || [];

    return (
        <Card sx={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', mb: 3 }}>
            <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <MenuBookIcon sx={{ fontSize: 24, color: '#16a34a', mr: 1.5 }} />
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#1a202c' }}>
                        {isFrench ? 'Sections du Cours' : 'Course Sections'}
                    </Typography>
                </Box>
                <Divider sx={{ mb: 2 }} />
                {blocs.length === 0 ? (
                    <Alert severity="info" sx={{ borderRadius: '12px' }}>
                        {isFrench
                            ? 'Ce cours ne contient aucune section.'
                            : 'This course does not contain any sections.'}
                    </Alert>
                ) : (
                    <TableContainer component={Paper} sx={{ boxShadow: 'none', borderRadius: '12px' }}>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: '#f7fafc' }}>
                                    <TableCell sx={{ fontWeight: 600 }}>N°</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>{isFrench ? 'Titre' : 'Title'}</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>{isFrench ? 'Vidéo' : 'Video'}</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>{isFrench ? 'Actions' : 'Actions'}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {blocs.map((bloc, index) => (
                                    <TableRow
                                        key={bloc.id}
                                        sx={{
                                            '&:hover': { backgroundColor: '#f7fafc' },
                                            transition: 'background-color 0.2s ease'
                                        }}
                                    >
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>
                                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                {bloc.titre}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={bloc.video ? (isFrench ? 'Oui' : 'Yes') : (isFrench ? 'Non' : 'No')}
                                                size="small"
                                                sx={{
                                                    backgroundColor: bloc.video ? '#e6fffa' : '#fed7d7',
                                                    color: bloc.video ? '#234e52' : '#742a2a',
                                                    fontWeight: 500
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                startIcon={<VisibilityIcon />}
                                                sx={{
                                                    textTransform: 'none',
                                                    borderRadius: '8px',
                                                    borderColor: '#16a34a',
                                                    color: '#16a34a',
                                                    '&:hover': {
                                                        borderColor: '#15803d',
                                                        backgroundColor: 'rgba(22, 163, 74, 0.1)'
                                                    }
                                                }}
                                            >
                                                {isFrench ? 'Voir' : 'View'}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </CardContent>
        </Card>
    );
};

const ListQCM = ({ listQcm, idChapitre, navigation, isFrench }) => {
    const qcms = listQcm || [];

    return (
        <Card sx={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', mb: 3 }}>
            <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <QuizIcon sx={{ fontSize: 24, color: '#16a34a', mr: 1.5 }} />
                        <Typography variant="h6" sx={{ fontWeight: 600, color: '#1a202c' }}>
                            {isFrench ? 'QCM du Chapitre' : 'Chapter QCM'}
                        </Typography>
                    </Box>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => navigation(`/qcm/ajouter/${idChapitre}`)}
                        sx={{
                            background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
                                boxShadow: '0 6px 12px rgba(56, 249, 215, 0.3)'
                            },
                            textTransform: 'none',
                            borderRadius: '12px',
                            fontWeight: 600,
                            fontSize: 14,
                            padding: '8px 16px'
                        }}
                    >
                        {isFrench ? 'Ajouter un QCM' : 'Add QCM'}
                    </Button>
                </Box>
                <Divider sx={{ mb: 2 }} />
                {qcms.length === 0 ? (
                    <Alert severity="info" sx={{ borderRadius: '12px' }}>
                        {isFrench ? 'Ce cours ne contient aucun QCM.' : 'This course does not contain any QCM.'}
                    </Alert>
                ) : (
                    <TableContainer component={Paper} sx={{ boxShadow: 'none', borderRadius: '12px' }}>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: '#f7fafc' }}>
                                    <TableCell sx={{ fontWeight: 600 }}>N°</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>{isFrench ? 'Intitulé' : 'Title'}</TableCell>
                                    <TableCell sx={{ fontWeight: 600, textAlign: 'center' }}>
                                        {isFrench ? 'Nb Propositions' : 'Nb Propositions'}
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 600, textAlign: 'center' }}>
                                        {isFrench ? 'Propositions Correctes' : 'Correct Propositions'}
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>{isFrench ? 'Actions' : 'Actions'}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {qcms.map((qcm, index) => {
                                    const totalProps = qcm.propositions?.length || 0;
                                    const correctProps = qcm.propositions?.reduce((acc, prop) => acc + (prop.etat || 0), 0) || 0;
                                    return (
                                        <TableRow
                                            key={qcm.id}
                                            sx={{
                                                '&:hover': { backgroundColor: '#f7fafc' },
                                                transition: 'background-color 0.2s ease'
                                            }}
                                        >
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>
                                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                    {qcm.intitule}
                                                </Typography>
                                            </TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}>
                                                <Chip
                                                    label={totalProps}
                                                    size="small"
                                                    sx={{
                                                        backgroundColor: totalProps > 0 ? '#e6f3ff' : '#fed7d7',
                                                        color: totalProps > 0 ? '#2c5282' : '#742a2a',
                                                        fontWeight: 500
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}>
                                                <Chip
                                                    label={correctProps}
                                                    size="small"
                                                    sx={{
                                                        backgroundColor: correctProps > 0 ? '#e6fffa' : '#fed7d7',
                                                        color: correctProps > 0 ? '#234e52' : '#742a2a',
                                                        fontWeight: 500
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="outlined"
                                                    size="small"
                                                    startIcon={<VisibilityIcon />}
                                                    onClick={() => navigation(`/qcm/${idChapitre}/${qcm.id}`)}
                                                    sx={{
                                                        textTransform: 'none',
                                                        borderRadius: '8px',
                                                        borderColor: '#16a34a',
                                                        color: '#16a34a',
                                                        '&:hover': {
                                                            borderColor: '#15803d',
                                                            backgroundColor: 'rgba(22, 163, 74, 0.1)'
                                                        }
                                                    }}
                                                >
                                                    {isFrench ? 'Voir' : 'View'}
                                                </Button>
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

const ListQRO = ({ listQRO, setUpdate, formChapitre, isFrench }) => {
    const chapitre = formChapitre?.chapitre || {};
    const qros = listQRO || [];

    return (
        <Card sx={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
            <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <QuestionAnswerIcon sx={{ fontSize: 24, color: '#16a34a', mr: 1.5 }} />
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#1a202c' }}>
                        {isFrench ? 'Questions à Réponse Ouverte (QRO)' : 'Open Response Questions (QRO)'}
                    </Typography>
                </Box>
                <Divider sx={{ mb: 2 }} />
                <Box sx={{ mb: 2 }}>
                    <AjoutQRO chapitre={chapitre} setUpdate={setUpdate} isFrench={isFrench} />
                </Box>
                {qros.length === 0 ? (
                    <Alert severity="info" sx={{ borderRadius: '12px' }}>
                        {isFrench
                            ? 'Ce cours ne contient pas de question à réponse ouverte.'
                            : 'This course does not contain any open response questions.'}
                    </Alert>
                ) : (
                    <TableContainer component={Paper} sx={{ boxShadow: 'none', borderRadius: '12px' }}>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: '#f7fafc' }}>
                                    <TableCell sx={{ fontWeight: 600 }}>N°</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>{isFrench ? 'Intitulé' : 'Title'}</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>
                                        {isFrench ? 'Intitulé (Anglais)' : 'Title (English)'}
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>{isFrench ? 'Actions' : 'Actions'}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {qros.map((qro, index) => (
                                    <TableRow
                                        key={qro.id}
                                        sx={{
                                            '&:hover': { backgroundColor: '#f7fafc' },
                                            transition: 'background-color 0.2s ease'
                                        }}
                                    >
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>
                                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                {qro.intitule}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body2" sx={{ color: '#718096' }}>
                                                {qro.intituleEn}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                startIcon={<VisibilityIcon />}
                                                sx={{
                                                    textTransform: 'none',
                                                    borderRadius: '8px',
                                                    borderColor: '#16a34a',
                                                    color: '#16a34a',
                                                    '&:hover': {
                                                        borderColor: '#15803d',
                                                        backgroundColor: 'rgba(22, 163, 74, 0.1)'
                                                    }
                                                }}
                                            >
                                                {isFrench ? 'Voir' : 'View'}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </CardContent>
        </Card>
    );
};

const AjoutQRO = ({ chapitre, setUpdate, isFrench }) => {
    const [formQRO, setFormQRO] = useState({});
    const [open, setOpen] = useState(false);
    const [save, setSave] = useState(false);
    const [errorServeur, setErrorServeur] = useState(false);
    const [error, setError] = useState({ textError: null });

    const handleClose = () => {
        setOpen(false);
        setFormQRO({});
        setError({ textError: null });
        setErrorServeur(false);
    };

    const handleSave = () => {
        setError({ textError: null });
        setErrorServeur(false);
        setSave(true);
    };

    return (
        <>
            <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setOpen(true)}
                sx={{
                    background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                    '&:hover': {
                        background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
                        boxShadow: '0 6px 12px rgba(56, 249, 215, 0.3)'
                    },
                    textTransform: 'none',
                    borderRadius: '12px',
                    fontWeight: 600,
                    fontSize: 14,
                    padding: '8px 16px'
                }}
            >
                {isFrench ? 'Ajouter une QRO' : 'Add QRO'}
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="md"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: '16px',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                    }
                }}
            >
                <DialogTitle sx={{ pb: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {isFrench ? 'Ajout d\'un QRO' : 'Add QRO'} - {chapitre.titre}
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    {errorServeur && <MessageErrorServeur />}
                    {error.textError && (
                        <Alert severity="error" sx={{ mb: 2, borderRadius: '12px' }}>
                            {error.textError}
                        </Alert>
                    )}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                        <FormTextInput
                            fullWidth
                            multiline
                            rows={4}
                            label={isFrench ? 'Intitulé (Français)' : 'Title (French)'}
                            placeholder={isFrench ? 'Écrire ici...' : 'Write here...'}
                            value={formQRO.intitule || ''}
                            onChange={(e) => setFormQRO({ ...formQRO, intitule: e.target.value })}
                        />
                        <FormTextInput
                            fullWidth
                            multiline
                            rows={4}
                            label={isFrench ? 'Intitulé (Anglais)' : 'Title (English)'}
                            placeholder="Write here..."
                            value={formQRO.intituleEn || ''}
                            onChange={(e) => setFormQRO({ ...formQRO, intituleEn: e.target.value })}
                        />
                    </Box>
                </DialogContent>
                <DialogActions sx={{ p: 3, pt: 1 }}>
                    <Button
                        onClick={handleClose}
                        sx={{
                            textTransform: 'none',
                            borderRadius: '12px',
                            color: '#718096',
                            '&:hover': {
                                backgroundColor: '#f7fafc'
                            }
                        }}
                    >
                        {isFrench ? 'Annuler' : 'Cancel'}
                    </Button>
                    <Button
                        onClick={handleSave}
                        variant="contained"
                        sx={{
                            background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
                                boxShadow: '0 6px 12px rgba(22, 163, 74, 0.3)'
                            },
                            textTransform: 'none',
                            borderRadius: '12px',
                            fontWeight: 600
                        }}
                    >
                        {isFrench ? 'Valider' : 'Validate'}
                    </Button>
                </DialogActions>
            </Dialog>
            {save && (
                <SaveComponent
                    setSave={setSave}
                    save={save}
                    requestURL="/admin/qro/"
                    requestBody={formQRO}
                    requestMethode="POST"
                    requestParam={chapitre?.idChapitre || null}
                    setErrorServeur={setErrorServeur}
                    setError={setError}
                    setUpdate={setUpdate}
                />
            )}
        </>
    );
};
