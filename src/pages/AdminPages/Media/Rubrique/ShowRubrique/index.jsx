import React, { useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../../../../../context';
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
    Alert,
    Pagination,
    Stack
} from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CategoryIcon from '@mui/icons-material/Category';
import SortIcon from '@mui/icons-material/Sort';
import DescriptionIcon from '@mui/icons-material/Description';
import ArticleIcon from '@mui/icons-material/Article';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { MessageErrorServeur } from '../../../../../composants/MessageComponent';
import { useFetch } from '../../../../../utils/hooks/FetchData';

export default function ShowRubrique() {
   const { idRubrique } = useParams();
    const { language } = useContext(AppContext);
   const navigation = useNavigate();
    const isFrench = language === 'FR';
   const [update, setUpdate] = useState(false);
    const { isLoading, data, error } = useFetch(`/media/rubrique/${idRubrique}`, 'GET', null, null, update);

   const handleModifierClick = () => {
      navigation(`/rubrique/alter/${idRubrique}`);
   };

   return (
        <Box className="adminPageContainer">
            {/* Header Section */}
            <Box className="adminPageHeader">
                <Box className="adminPageHeaderContent">
                    <Box className="adminPageHeaderIconContainer">
                        <FolderIcon className="adminPageHeaderIcon" />
                    </Box>
                    <Box>
                        <Breadcrumbs sx={{ mb: 1, color: 'rgba(255, 255, 255, 0.8)' }}>
                            <MuiLink
                                component="button"
                                variant="body2"
                                onClick={() => navigation('/rubrique')}
                                sx={{ color: 'rgba(255, 255, 255, 0.8)', textDecoration: 'none', cursor: 'pointer' }}
                            >
                                {isFrench ? 'Rubriques' : 'Rubriques'}
                            </MuiLink>
                            <Typography variant="body2" sx={{ color: '#fff', fontWeight: 500 }}>
                                {data?.nom || idRubrique}
                            </Typography>
                        </Breadcrumbs>
                        <Typography variant="h4" className="adminPageTitle">
                            {data?.nom || (isFrench ? 'Détails de la Rubrique' : 'Rubrique Details')}
                        </Typography>
                        <Typography variant="body1" className="adminPageSubtitle">
                            {isFrench
                                ? 'Informations détaillées et articles de la rubrique'
                                : 'Detailed information and articles of the rubrique'}
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
                    {/* General Information */}
                    <Grid container spacing={3} sx={{ mb: 3 }}>
                        <Grid item xs={12} md={6}>
                            <Card sx={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                                <CardContent sx={{ p: 3 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <FolderIcon sx={{ fontSize: 24, color: '#16a34a', mr: 1.5 }} />
                                        <Typography variant="h6" sx={{ fontWeight: 600, color: '#1a202c' }}>
                                            {isFrench ? 'Informations Générales' : 'General Information'}
                                        </Typography>
                                    </Box>
                                    <Divider sx={{ mb: 2 }} />
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                        <InfoRow
                                            label={isFrench ? 'Nom' : 'Name'}
                                            value={data?.nom}
                                            icon={<FolderIcon sx={{ fontSize: 18, color: '#16a34a' }} />}
                                        />
                                        <InfoRow
                                            label={isFrench ? 'Catégorie' : 'Category'}
                                            value={data?.categorie}
                                            icon={<CategoryIcon sx={{ fontSize: 18, color: '#16a34a' }} />}
                                        />
                                        <InfoRow
                                            label={isFrench ? 'Ordre / Positionnement' : 'Order / Position'}
                                            value={data?.ordre}
                                            icon={<SortIcon sx={{ fontSize: 18, color: '#16a34a' }} />}
                                        />
                                        <InfoRow
                                            label={isFrench ? 'Nombre d\'Articles' : 'Number of Articles'}
                                            value={data?.nombreArticle || 0}
                                            icon={<ArticleIcon sx={{ fontSize: 18, color: '#16a34a' }} />}
                                        />
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Card sx={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                                <CardContent sx={{ p: 3 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <DescriptionIcon sx={{ fontSize: 24, color: '#16a34a', mr: 1.5 }} />
                                        <Typography variant="h6" sx={{ fontWeight: 600, color: '#1a202c' }}>
                                            {isFrench ? 'Description' : 'Description'}
                                        </Typography>
                                    </Box>
                                    <Divider sx={{ mb: 2 }} />
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            color: '#4a5568',
                                            lineHeight: 1.6,
                                            whiteSpace: 'pre-wrap'
                                        }}
                                    >
                                        {data?.description || (isFrench ? 'Aucune description' : 'No description')}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>

                    {/* Articles List */}
                    <ListArticleRubrique idRubrique={data?.id} isFrench={isFrench} navigation={navigation} />
                </Box>
            )}
        </Box>
    );
}

const InfoRow = ({ label, value, icon }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {icon}
        <Box sx={{ flex: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 600, color: '#718096', mb: 0.5 }}>
                {label}
            </Typography>
            <Typography variant="body1" sx={{ color: '#1a202c', fontWeight: 500 }}>
                {value !== null && value !== undefined ? value : '-'}
            </Typography>
        </Box>
    </Box>
);

const ListArticleRubrique = ({ idRubrique, isFrench, navigation }) => {
   const [pageNumber, setPageNumber] = useState(0);
    const { isLoading, data, error } = useFetch(`/media/listarticlerubrique/${idRubrique}/${pageNumber}`, 'GET', null, null);

    const getStatusColor = (statut) => {
        switch (statut) {
            case 'PUBLIER':
            case 'PUBLISHED':
                return { bg: '#e6fffa', color: '#234e52' };
            case 'EN_ATTENTE':
            case 'PENDING':
                return { bg: '#fff5e6', color: '#7c2d12' };
            case 'SUSPENDU':
            case 'SUSPENDED':
                return { bg: '#fed7d7', color: '#742a2a' };
            default:
                return { bg: '#edf2f7', color: '#4a5568' };
        }
    };

   return (
        <Card sx={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
            <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <ArticleIcon sx={{ fontSize: 24, color: '#16a34a', mr: 1.5 }} />
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#1a202c' }}>
                        {isFrench ? 'Liste des Articles de cette Rubrique' : 'Articles List for this Rubrique'}
                    </Typography>
                </Box>
                <Divider sx={{ mb: 2 }} />
            {isLoading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                        <CircularProgress sx={{ color: '#16a34a' }} />
                    </Box>
            ) : error ? (
               <MessageErrorServeur />
            ) : data && data.content && data.content.length > 0 ? (
                    <TableContainer component={Paper} sx={{ boxShadow: 'none', borderRadius: '12px' }}>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: '#f7fafc' }}>
                                    <TableCell sx={{ fontWeight: 600 }}>N°</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>{isFrench ? 'Titre' : 'Title'}</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>
                                        {isFrench ? 'Date de Création' : 'Creation Date'}
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 600, textAlign: 'center' }}>
                                        {isFrench ? 'Nombre de Vues' : 'Number of Views'}
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 600, textAlign: 'center' }}>
                                        {isFrench ? 'Statut' : 'Status'}
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 600, textAlign: 'center' }}>
                                        {isFrench ? 'Actions' : 'Actions'}
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.content.map((article, index) => {
                                    const statusColors = getStatusColor(article.statut);
                                    return (
                                        <TableRow
                                            key={article.id}
                                            sx={{
                                                '&:hover': { backgroundColor: '#f7fafc', cursor: 'pointer' },
                                                transition: 'background-color 0.2s ease'
                                            }}
                                            onClick={() => navigation(`/article/${article.id}`)}
                                        >
                                            <TableCell>{(data?.size || 50) * pageNumber + index + 1}</TableCell>
                                            <TableCell>
                                                <Typography variant="body2" sx={{ fontWeight: 500, color: '#1a202c' }}>
                                                    {article.titre}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                    <CalendarTodayIcon sx={{ fontSize: 16, color: '#16a34a' }} />
                                                    <Typography variant="body2" sx={{ color: '#718096' }}>
                                                        {new Date(article.date).toLocaleDateString('fr-FR', {
                                                            day: 'numeric',
                                                            month: 'short',
                                                            year: 'numeric'
                                                        })}
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                                                    <VisibilityIcon sx={{ fontSize: 16, color: '#4facfe' }} />
                                                    <Typography variant="body2" sx={{ color: '#4facfe', fontWeight: 500 }}>
                                                        {article.etat || 0}
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}>
                                                <Chip
                                                    label={article.statut || '-'}
                                                    size="small"
                                                    sx={{
                                                        backgroundColor: statusColors.bg,
                                                        color: statusColors.color,
                                                        fontWeight: 500
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}>
                                                <Button
                                                    variant="outlined"
                                                    size="small"
                                                    startIcon={<VisibilityIcon />}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        navigation(`/article/${article.id}`);
                                                    }}
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
                ) : (
                    <Alert severity="info" sx={{ borderRadius: '12px' }}>
                        {isFrench
                            ? 'Aucun article trouvé pour cette rubrique.'
                            : 'No articles found for this rubrique.'}
                    </Alert>
                )}
                {/* Pagination */}
                {data && data.totalPages > 1 && (
                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
                        <Stack spacing={2}>
                            <Pagination
                                count={data.totalPages}
                                page={pageNumber + 1}
                                onChange={(event, value) => setPageNumber(value - 1)}
                                color="primary"
                                size="large"
                                showFirstButton
                                showLastButton
                                sx={{
                                    '& .MuiPaginationItem-root': {
                                        fontSize: '14px',
                                        fontWeight: 600,
                                        '&.Mui-selected': {
                                            background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                                            color: '#fff',
                                            '&:hover': {
                                                background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)'
                                            }
                                        },
                                        '&:hover': {
                                            backgroundColor: 'rgba(22, 163, 74, 0.1)'
                                        }
                                    }
                                }}
                            />
                        </Stack>
                        <Typography variant="body2" sx={{ color: '#718096', fontWeight: 500 }}>
                            {isFrench
                                ? `Page ${pageNumber + 1} sur ${data.totalPages} (${data.totalElements} éléments)`
                                : `Page ${pageNumber + 1} of ${data.totalPages} (${data.totalElements} items)`}
                        </Typography>
                    </Box>
                )}
            </CardContent>
        </Card>
   );
};
