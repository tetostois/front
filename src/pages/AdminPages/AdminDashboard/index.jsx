import React, { useContext, useEffect, useState } from 'react'
import Header from '../../../composants/Header'
import { Container } from 'react-bootstrap'
import './adminDashbordCSS.css';
import { useFetch } from '../../../utils/hooks/FetchData';
import { MessageErrorServeur } from '../../../composants/MessageComponent';
import { AppContext } from '../../../context';
import { 
    Box, 
    Typography, 
    Grid, 
    Card, 
    CardContent, 
    CircularProgress, 
    Backdrop,
    LinearProgress
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ArticleIcon from '@mui/icons-material/Article';
import QuizIcon from '@mui/icons-material/Quiz';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import DashboardIcon from '@mui/icons-material/Dashboard';

export default function AdminDashboard() {
    const { isOnline, language } = useContext(AppContext);
    const [update, setUpdate] = useState(false)
    const { isLoading, data, error } = useFetch('/admin/dashboard', 'GET', null, null, update)
    const isFrench = language === 'FR';

    useEffect(() => {
        const intervale = setInterval(() => {
            if (!isLoading && error) {
                setUpdate(!update);
            }
        }, 30000);
        return () => clearInterval(intervale);
    }, [isLoading, error, update]);

    const stats = data ? [
        {
            id: 'etudiants',
            title: isFrench ? 'Étudiants Inscrits' : 'Registered Students',
            value: data.etudiantInscrit || 0,
            icon: PeopleIcon,
            color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            iconColor: '#667eea'
        },
        {
            id: 'professeurs',
            title: isFrench ? 'Professeurs Actifs' : 'Active Teachers',
            value: `${data.profActif || 0} / ${data.profTotal || 0}`,
            icon: SchoolIcon,
            color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            iconColor: '#f5576c'
        },
        {
            id: 'modules',
            title: isFrench ? 'Modules Actifs' : 'Active Modules',
            value: `${data.moduleActif || 0} / ${data.moduleTotal || 0}`,
            icon: MenuBookIcon,
            color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            iconColor: '#4facfe'
        },
        {
            id: 'chapitres',
            title: isFrench ? 'Chapitres Totaux' : 'Total Chapters',
            value: data.chapitreTotal || 0,
            icon: ArticleIcon,
            color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            iconColor: '#43e97b'
        },
        {
            id: 'qcm',
            title: isFrench ? 'QCM Validés' : 'Validated QCMs',
            value: data.qcmValide || 0,
            icon: QuizIcon,
            color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
            iconColor: '#fa709a'
        },
        {
            id: 'taux',
            title: isFrench ? 'Taux de Réussite QCM' : 'QCM Success Rate',
            value: `${data.tauxReuissite || 0}%`,
            icon: TrendingUpIcon,
            color: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
            iconColor: '#30cfd0'
        },
        {
            id: 'questions',
            title: isFrench ? 'Questions Posées' : 'Questions Asked',
            value: data.questionPose || 0,
            icon: QuestionAnswerIcon,
            color: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
            iconColor: '#a8edea'
        }
    ] : [];

    return (
        <>
            <Container fluid className="adminDashboardContainer">
                {/* Header Section */}
                <Box className="adminDashboardHeader">
                    <Box className="adminDashboardHeaderContent">
                        <DashboardIcon className="adminDashboardHeaderIcon" />
                        <Box>
                            <Typography variant="h4" className="adminDashboardTitle">
                                {isFrench ? 'Tableau de Bord Administrateur' : 'Administrator Dashboard'}
                            </Typography>
                            <Typography variant="body1" className="adminDashboardSubtitle">
                                {isFrench 
                                    ? 'Vue d\'ensemble des statistiques et indicateurs clés de la plateforme'
                                    : 'Overview of platform statistics and key indicators'
                                }
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                {/* Loading State */}
                {isLoading ? (
                    <Box className="adminDashboardLoading">
                        <Backdrop open={true} sx={{ zIndex: 1000, color: '#fff' }}>
                            <Box sx={{ textAlign: 'center' }}>
                                <CircularProgress size={60} sx={{ color: '#667eea', mb: 2 }} />
                                <Typography variant="h6" sx={{ color: '#fff', mt: 2 }}>
                                    {isFrench ? 'Chargement des données...' : 'Loading data...'}
                                </Typography>
                            </Box>
                        </Backdrop>
                    </Box>
                ) : error ? (
                    <Box className="adminDashboardError">
                        <MessageErrorServeur />
                    </Box>
                ) : (
                    <Box className="adminDashboardContent">
                        {/* Statistics Grid */}
                        <Grid container spacing={3} className="adminDashboardStatsGrid">
                            {stats.map((stat) => {
                                const IconComponent = stat.icon;
                                return (
                                    <Grid item xs={12} sm={6} md={4} lg={3} key={stat.id}>
                                        <Card className="adminStatCard" sx={{ 
                                            background: stat.color,
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                transform: 'translateY(-8px)',
                                                boxShadow: '0 12px 24px rgba(0,0,0,0.15)'
                                            }
                                        }}>
                                            <CardContent className="adminStatCardContent">
                                                <Box className="adminStatIconContainer">
                                                    <IconComponent className="adminStatIcon" sx={{ color: '#fff' }} />
                                                </Box>
                                                <Typography variant="h3" className="adminStatValue">
                                                    {stat.value}
                                                </Typography>
                                                <Typography variant="body2" className="adminStatTitle">
                                                    {stat.title}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                );
                            })}
                        </Grid>

                        {/* Additional Info Section */}
                        <Box className="adminDashboardInfoSection">
                            <Card className="adminInfoCard">
                                <CardContent>
                                    <Typography variant="h6" className="adminInfoTitle">
                                        {isFrench ? 'Résumé des Performances' : 'Performance Summary'}
                                    </Typography>
                                    <Box className="adminInfoContent">
                                        <Box className="adminInfoItem">
                                            <Typography variant="body2" className="adminInfoLabel">
                                                {isFrench ? 'Cours lus' : 'Courses read'}
                                            </Typography>
                                            <LinearProgress 
                                                variant="determinate" 
                                                value={data?.courLu || 0} 
                                                sx={{ 
                                                    height: 8, 
                                                    borderRadius: 4,
                                                    backgroundColor: '#e0e0e0',
                                                    '& .MuiLinearProgress-bar': {
                                                        background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                                                        borderRadius: 4
                                                    }
                                                }} 
                                            />
                                            <Typography variant="caption" className="adminInfoValue">
                                                {data?.courLu || 0}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Box>
                    </Box>
                )}
            </Container>
        </>
    )
}

// Path: src/pages/AdminPages/AdminDashboard/index.jsx
// Compare this snippet from src/composants/Header/index.jsx:

