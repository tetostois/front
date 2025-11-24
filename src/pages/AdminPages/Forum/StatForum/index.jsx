import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../../../../context';
import { useFetch } from '../../../../utils/hooks/FetchData';
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
import ForumIcon from '@mui/icons-material/Forum';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import MessageIcon from '@mui/icons-material/Message';
import PeopleIcon from '@mui/icons-material/People';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { MessageErrorServeur } from '../../../../composants/MessageComponent';

export default function StatForum() {
    const { language } = useContext(AppContext);
    const [update, setUpdate] = useState(false);
    const { isLoading, data, error } = useFetch('/admin/forum/stats', 'GET', null, null, update);
    const isFrench = language === 'FR';

    useEffect(() => {
        const interval = setInterval(() => {
            if (!isLoading && error) {
                setUpdate(!update);
            }
        }, 30000);
        return () => clearInterval(interval);
    }, [isLoading, error, update]);

    // Données mockées pour l'instant (à remplacer par les vraies données de l'API)
    const mockStats = {
        totalMessages: data?.totalMessages || 0,
        messagesActifs: data?.messagesActifs || 0,
        messagesResolus: data?.messagesResolus || 0,
        totalReponses: data?.totalReponses || 0,
        etudiantsActifs: data?.etudiantsActifs || 0,
        professeursActifs: data?.professeursActifs || 0
    };

    const statsCards = [
        {
            id: 'total',
            title: isFrench ? 'Total Messages' : 'Total Messages',
            value: mockStats.totalMessages,
            icon: ForumIcon,
            color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        },
        {
            id: 'actifs',
            title: isFrench ? 'Messages Actifs' : 'Active Messages',
            value: mockStats.messagesActifs,
            icon: TrendingUpIcon,
            color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
        },
        {
            id: 'resolus',
            title: isFrench ? 'Messages Résolus' : 'Resolved Messages',
            value: mockStats.messagesResolus,
            icon: MessageIcon,
            color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
        },
        {
            id: 'reponses',
            title: isFrench ? 'Total Réponses' : 'Total Replies',
            value: mockStats.totalReponses,
            icon: PeopleIcon,
            color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
        }
    ];

    return (
        <Box className="adminPageContainer">
            {/* Header Section */}
            <Box className="adminPageHeader">
                <Box className="adminPageHeaderContent">
                    <Box className="adminPageHeaderIconContainer">
                        <AssessmentIcon className="adminPageHeaderIcon" />
                    </Box>
                    <Box>
                        <Typography variant="h4" className="adminPageTitle">
                            {isFrench ? 'Statistiques du Forum' : 'Forum Statistics'}
                        </Typography>
                        <Typography variant="body1" className="adminPageSubtitle">
                            {isFrench
                                ? 'Analyse détaillée de l\'activité et de l\'engagement sur le forum'
                                : 'Detailed analysis of forum activity and engagement'}
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
                                {isFrench ? 'Chargement des statistiques...' : 'Loading statistics...'}
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
                    {/* Statistics Cards */}
                    <Grid container spacing={3} sx={{ mb: 4 }}>
                        {statsCards.map((stat) => {
                            const IconComponent = stat.icon;
                            return (
                                <Grid item xs={12} sm={6} md={3} key={stat.id}>
                                    <Card
                                        sx={{
                                            background: stat.color,
                                            borderRadius: '20px',
                                            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                transform: 'translateY(-8px)',
                                                boxShadow: '0 12px 24px rgba(0,0,0,0.15)'
                                            }
                                        }}
                                    >
                                        <CardContent sx={{ p: 3, textAlign: 'center' }}>
                                            <Box
                                                sx={{
                                                    width: 56,
                                                    height: 56,
                                                    background: 'rgba(255, 255, 255, 0.2)',
                                                    borderRadius: '14px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    margin: '0 auto 16px',
                                                    backdropFilter: 'blur(10px)'
                                                }}
                                            >
                                                <IconComponent sx={{ fontSize: 32, color: '#fff' }} />
                                            </Box>
                                            <Typography
                                                variant="h3"
                                                sx={{
                                                    fontFamily: 'Poppins, sans-serif',
                                                    fontWeight: 700,
                                                    color: '#fff',
                                                    mb: 1,
                                                    textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                                }}
                                            >
                                                {stat.value}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    fontFamily: 'Inter, sans-serif',
                                                    color: 'rgba(255, 255, 255, 0.95)',
                                                    fontWeight: 500,
                                                    fontSize: 14,
                                                    textTransform: 'uppercase',
                                                    letterSpacing: 0.5
                                                }}
                                            >
                                                {stat.title}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            );
                        })}
                    </Grid>

                    {/* Engagement Summary */}
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Card sx={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                                <CardContent>
                                    <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: '#1a202c' }}>
                                        {isFrench ? 'Engagement par Type d\'Utilisateur' : 'Engagement by User Type'}
                                    </Typography>
                                    <Box sx={{ mb: 2 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                {isFrench ? 'Étudiants Actifs' : 'Active Students'}
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: '#718096' }}>
                                                {mockStats.etudiantsActifs}
                                            </Typography>
                                        </Box>
                                        <LinearProgress
                                            variant="determinate"
                                            value={mockStats.etudiantsActifs > 0 ? 70 : 0}
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
                                    </Box>
                                    <Box>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                {isFrench ? 'Professeurs Actifs' : 'Active Teachers'}
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: '#718096' }}>
                                                {mockStats.professeursActifs}
                                            </Typography>
                                        </Box>
                                        <LinearProgress
                                            variant="determinate"
                                            value={mockStats.professeursActifs > 0 ? 30 : 0}
                                            sx={{
                                                height: 8,
                                                borderRadius: 4,
                                                backgroundColor: '#e0e0e0',
                                                '& .MuiLinearProgress-bar': {
                                                    background: 'linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)',
                                                    borderRadius: 4
                                                }
                                            }}
                                        />
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Card sx={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                                <CardContent>
                                    <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: '#1a202c' }}>
                                        {isFrench ? 'Taux de Résolution' : 'Resolution Rate'}
                                    </Typography>
                                    <Box>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                {isFrench ? 'Messages Résolus' : 'Resolved Messages'}
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: '#718096' }}>
                                                {mockStats.totalMessages > 0
                                                    ? ((mockStats.messagesResolus / mockStats.totalMessages) * 100).toFixed(1)
                                                    : 0}
                                                %
                                            </Typography>
                                        </Box>
                                        <LinearProgress
                                            variant="determinate"
                                            value={
                                                mockStats.totalMessages > 0
                                                    ? (mockStats.messagesResolus / mockStats.totalMessages) * 100
                                                    : 0
                                            }
                                            sx={{
                                                height: 8,
                                                borderRadius: 4,
                                                backgroundColor: '#e0e0e0',
                                                '& .MuiLinearProgress-bar': {
                                                    background: 'linear-gradient(90deg, #4facfe 0%, #00f2fe 100%)',
                                                    borderRadius: 4
                                                }
                                            }}
                                        />
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            )}
        </Box>
    );
}

