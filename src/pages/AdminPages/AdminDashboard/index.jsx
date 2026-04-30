import React, { useContext, useEffect, useState } from 'react'
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
import AdminDashboardCharts from '../../../composants/AdminDashboardCharts';

export default function AdminDashboard() {
    const { language } = useContext(AppContext);
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

    /* Style type projet : carte blanche, pastille d’icône colorée à gauche (voir AdminDashboard.tsx) */
    const stats = data ? [
        {
            id: 'etudiants',
            title: isFrench ? 'Étudiants' : 'Students',
            subtitle: isFrench ? 'Inscrits sur la plateforme' : 'Registered on the platform',
            value: data.etudiantInscrit || 0,
            icon: PeopleIcon,
            iconBg: '#dbeafe',
            accent: '#2563eb',
        },
        {
            id: 'professeurs',
            title: isFrench ? 'Professeurs' : 'Teachers',
            subtitle: isFrench ? 'Actifs / total' : 'Active / total',
            value: `${data.profActif || 0} / ${data.profTotal || 0}`,
            icon: SchoolIcon,
            iconBg: '#d1fae5',
            accent: '#059669',
        },
        {
            id: 'modules',
            title: isFrench ? 'Modules' : 'Modules',
            subtitle: isFrench ? 'Actifs / total' : 'Active / total',
            value: `${data.moduleActif || 0} / ${data.moduleTotal || 0}`,
            icon: MenuBookIcon,
            iconBg: '#e0f2fe',
            accent: '#0284c7',
        },
        {
            id: 'chapitres',
            title: isFrench ? 'Chapitres' : 'Chapters',
            subtitle: isFrench ? 'Contenus publiés' : 'Published content',
            value: data.chapitreTotal || 0,
            icon: ArticleIcon,
            iconBg: '#ccfbf1',
            accent: '#0d9488',
        },
        {
            id: 'qcm',
            title: isFrench ? 'QCM' : 'MCQs',
            subtitle: isFrench ? 'Validés' : 'Validated',
            value: data.qcmValide || 0,
            icon: QuizIcon,
            iconBg: '#ffedd5',
            accent: '#ea580c',
        },
        {
            id: 'taux',
            title: isFrench ? 'Réussite QCM' : 'QCM success',
            subtitle: isFrench ? 'Taux global' : 'Overall rate',
            value: `${data.tauxReuissite || 0}%`,
            icon: TrendingUpIcon,
            iconBg: '#e0e7ff',
            accent: '#4f46e5',
        },
        {
            id: 'questions',
            title: isFrench ? 'Questions' : 'Questions',
            subtitle: isFrench ? 'Posées par les apprenants' : 'Asked by learners',
            value: data.questionPose || 0,
            icon: QuestionAnswerIcon,
            iconBg: '#f3e8ff',
            accent: '#9333ea',
        },
    ] : [];

    const courLuRaw = Number(data?.courLu);
    const courLuPercent = Number.isFinite(courLuRaw) ? Math.min(100, Math.max(0, courLuRaw)) : 0;

    return (
        <>
            <Box component="main" className="adminDashboardContainer">
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
                                <CircularProgress size={60} sx={{ color: '#16a34a', mb: 2 }} />
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
                                        <Card
                                            className="adminStatCard adminStatCardLight"
                                            elevation={0}
                                            sx={{
                                                border: '1px solid #f1f5f9',
                                                borderRadius: '12px',
                                                bgcolor: '#ffffff',
                                                boxShadow: '0 1px 3px 0 rgb(15 23 42 / 0.06), 0 1px 2px -1px rgb(15 23 42 / 0.06)',
                                                transition: 'box-shadow 0.2s ease, transform 0.2s ease',
                                                '&:hover': {
                                                    boxShadow: '0 10px 15px -3px rgb(15 23 42 / 0.08), 0 4px 6px -4px rgb(15 23 42 / 0.06)',
                                                    transform: 'translateY(-2px)',
                                                },
                                            }}
                                        >
                                            <CardContent
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 2,
                                                    py: 2.5,
                                                    px: 2,
                                                    '&:last-child': { pb: 2.5 },
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        width: 52,
                                                        height: 52,
                                                        borderRadius: '10px',
                                                        bgcolor: stat.iconBg,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        flexShrink: 0,
                                                    }}
                                                >
                                                    <IconComponent sx={{ color: stat.accent, fontSize: 26 }} />
                                                </Box>
                                                <Box sx={{ minWidth: 0, flex: 1 }}>
                                                    <Typography
                                                        variant="subtitle2"
                                                        sx={{
                                                            fontWeight: 600,
                                                            color: '#0f172a',
                                                            fontSize: '0.9375rem',
                                                            lineHeight: 1.3,
                                                            mb: 0.25,
                                                        }}
                                                    >
                                                        {stat.title}
                                                    </Typography>
                                                    <Typography
                                                        sx={{
                                                            fontWeight: 700,
                                                            fontSize: '1.5rem',
                                                            color: stat.accent,
                                                            lineHeight: 1.2,
                                                            letterSpacing: '-0.02em',
                                                        }}
                                                    >
                                                        {stat.value}
                                                    </Typography>
                                                    <Typography
                                                        variant="caption"
                                                        sx={{ color: '#64748b', display: 'block', mt: 0.35, lineHeight: 1.35 }}
                                                    >
                                                        {stat.subtitle}
                                                    </Typography>
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                );
                            })}
                        </Grid>

                        <AdminDashboardCharts data={data} isFrench={isFrench} />

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
                                                value={courLuPercent} 
                                                sx={{ 
                                                    height: 6, 
                                                    borderRadius: 999,
                                                    backgroundColor: '#e2e8f0',
                                                    '& .MuiLinearProgress-bar': {
                                                        background: 'linear-gradient(90deg, #22c55e 0%, #16a34a 100%)',
                                                        borderRadius: 999
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
            </Box>
        </>
    )
}

// Path: src/pages/AdminPages/AdminDashboard/index.jsx
// Compare this snippet from src/composants/Header/index.jsx:

