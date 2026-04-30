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
import StatMetricCard from '../../../../composants/StatMetricCard';

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
            title: isFrench ? 'Messages' : 'Messages',
            subtitle: isFrench ? 'Publiés sur le forum' : 'Posted on the forum',
            value: mockStats.totalMessages,
            icon: ForumIcon,
            iconBg: '#dbeafe',
            accent: '#2563eb',
        },
        {
            id: 'actifs',
            title: isFrench ? 'Actifs' : 'Active',
            subtitle: isFrench ? 'Discussions en cours' : 'Ongoing threads',
            value: mockStats.messagesActifs,
            icon: TrendingUpIcon,
            iconBg: '#d1fae5',
            accent: '#059669',
        },
        {
            id: 'resolus',
            title: isFrench ? 'Résolus' : 'Resolved',
            subtitle: isFrench ? 'Marqués comme traités' : 'Marked as resolved',
            value: mockStats.messagesResolus,
            icon: MessageIcon,
            iconBg: '#e0f2fe',
            accent: '#0284c7',
        },
        {
            id: 'reponses',
            title: isFrench ? 'Réponses' : 'Replies',
            subtitle: isFrench ? 'Total des réponses' : 'All replies',
            value: mockStats.totalReponses,
            icon: PeopleIcon,
            iconBg: '#ffedd5',
            accent: '#ea580c',
        },
    ];

    return (
        <Box className="adminPageContainer">
            {/* Header Section */}
            <Box className="adminPageHeader">
                <Box className="adminPageHeaderRow">
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
            </Box>

            {/* Loading State */}
            {isLoading ? (
                <Box className="adminPageLoading">
                    <Backdrop open={true} sx={{ zIndex: 1000, color: '#fff' }}>
                        <Box sx={{ textAlign: 'center' }}>
                            <CircularProgress size={60} sx={{ color: '#16a34a', mb: 2 }} />
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
                        {statsCards.map((stat) => (
                            <Grid item xs={12} sm={6} md={3} key={stat.id}>
                                <StatMetricCard
                                    title={stat.title}
                                    subtitle={stat.subtitle}
                                    value={stat.value}
                                    icon={stat.icon}
                                    iconBg={stat.iconBg}
                                    accent={stat.accent}
                                />
                            </Grid>
                        ))}
                    </Grid>

                    {/* Engagement Summary */}
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Card
                                elevation={0}
                                sx={{
                                    borderRadius: '12px',
                                    border: '1px solid #e2e8f0',
                                    boxShadow: '0 4px 6px -1px rgba(15, 23, 42, 0.06)',
                                }}
                            >
                                <CardContent>
                                    <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: '#0f172a' }}>
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
                                                height: 6,
                                                borderRadius: 999,
                                                backgroundColor: '#e2e8f0',
                                                '& .MuiLinearProgress-bar': {
                                                    background: 'linear-gradient(90deg, #22c55e 0%, #16a34a 100%)',
                                                    borderRadius: 999,
                                                },
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
                                                height: 6,
                                                borderRadius: 999,
                                                backgroundColor: '#e2e8f0',
                                                '& .MuiLinearProgress-bar': {
                                                    background: 'linear-gradient(90deg, #0ea5e9 0%, #0284c7 100%)',
                                                    borderRadius: 999,
                                                },
                                            }}
                                        />
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Card
                                elevation={0}
                                sx={{
                                    borderRadius: '12px',
                                    border: '1px solid #e2e8f0',
                                    boxShadow: '0 4px 6px -1px rgba(15, 23, 42, 0.06)',
                                }}
                            >
                                <CardContent>
                                    <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: '#0f172a' }}>
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
                                                height: 6,
                                                borderRadius: 999,
                                                backgroundColor: '#e2e8f0',
                                                '& .MuiLinearProgress-bar': {
                                                    background: 'linear-gradient(90deg, #22c55e 0%, #16a34a 100%)',
                                                    borderRadius: 999,
                                                },
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

