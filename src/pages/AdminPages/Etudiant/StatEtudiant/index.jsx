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
    LinearProgress,
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SchoolIcon from '@mui/icons-material/School';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { MessageErrorServeur } from '../../../../composants/MessageComponent';
import StatMetricCard from '../../../../composants/StatMetricCard';

export default function StatEtudiant() {
    const { language } = useContext(AppContext);
    const [update, setUpdate] = useState(false);
    const { isLoading: isLoadingDashboard, data: dashboardData, error: dashboardError } = useFetch(
        '/admin/dashboard',
        'GET',
        null,
        null,
        update
    );
    const { isLoading: isLoadingStudents, data: studentsData, error: studentsError } = useFetch(
        '/admin/etudiants/0',
        'GET',
        null,
        null,
        update
    );
    const isFrench = language === 'FR';

    useEffect(() => {
        const interval = setInterval(() => {
            if (!isLoadingDashboard && !isLoadingStudents && (dashboardError || studentsError)) {
                setUpdate(!update);
            }
        }, 30000);
        return () => clearInterval(interval);
    }, [isLoadingDashboard, isLoadingStudents, dashboardError, studentsError, update]);

    const isLoading = isLoadingDashboard || isLoadingStudents;
    const error = dashboardError || studentsError;

    // Calculer les statistiques
    const calculateStats = () => {
        if (!studentsData || !studentsData.content) return null;

        const students = studentsData.content;
        const totalStudents = dashboardData?.etudiantInscrit || students.length;

        // Répartition par profil
        const profileDistribution = {};
        students.forEach((student) => {
            const profile = student.gammeEtudiant?.nom || (isFrench ? 'Non défini' : 'Undefined');
            profileDistribution[profile] = (profileDistribution[profile] || 0) + 1;
        });

        // Répartition par région
        const regionDistribution = {};
        students.forEach((student) => {
            const region = student.region?.nom || (isFrench ? 'Non définie' : 'Undefined');
            regionDistribution[region] = (regionDistribution[region] || 0) + 1;
        });

        // Étudiants actifs (avec connexion récente)
        const activeStudents = students.filter((student) => {
            if (!student.lastConnexion) return false;
            const lastConnexion = new Date(student.lastConnexion);
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
            return lastConnexion >= thirtyDaysAgo;
        }).length;

        // Étudiants confirmés
        const confirmedStudents = students.filter((student) => student.confirmation === 1).length;

        return {
            totalStudents,
            activeStudents,
            confirmedStudents,
            profileDistribution,
            regionDistribution
        };
    };

    const stats = calculateStats();

    const statsCards = dashboardData
        ? [
              {
                  id: 'total',
                  title: isFrench ? 'Étudiants' : 'Students',
                  subtitle: isFrench ? 'Inscrits (total)' : 'Registered (total)',
                  value: dashboardData.etudiantInscrit || 0,
                  icon: PeopleIcon,
                  iconBg: '#dbeafe',
                  accent: '#2563eb',
              },
              {
                  id: 'actifs',
                  title: isFrench ? 'Actifs' : 'Active',
                  subtitle: isFrench ? 'Connexion sous 30 jours' : 'Logged in within 30 days',
                  value: stats?.activeStudents || 0,
                  icon: TrendingUpIcon,
                  iconBg: '#d1fae5',
                  accent: '#059669',
              },
              {
                  id: 'confirmes',
                  title: isFrench ? 'Confirmés' : 'Confirmed',
                  subtitle: isFrench ? 'Comptes validés' : 'Validated accounts',
                  value: stats?.confirmedStudents || 0,
                  icon: CheckCircleIcon,
                  iconBg: '#e0f2fe',
                  accent: '#0284c7',
              },
              {
                  id: 'cours',
                  title: isFrench ? 'Cours lus' : 'Courses read',
                  subtitle: isFrench ? 'Progression globale' : 'Overall progress',
                  value: dashboardData.courLu || 0,
                  icon: SchoolIcon,
                  iconBg: '#ffedd5',
                  accent: '#ea580c',
              },
          ]
        : [];

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
                                {isFrench ? 'Statistiques des Étudiants' : 'Student Statistics'}
                            </Typography>
                            <Typography variant="body1" className="adminPageSubtitle">
                                {isFrench
                                    ? 'Analyse détaillée de la performance et de l\'engagement des étudiants'
                                    : 'Detailed analysis of student performance and engagement'}
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

                    {/* Distribution Charts */}
                    <Grid container spacing={3}>
                        {/* Répartition par Profil */}
                        {stats && Object.keys(stats.profileDistribution).length > 0 && (
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
                                            {isFrench ? 'Répartition par Profil' : 'Distribution by Profile'}
                                        </Typography>
                                        {Object.entries(stats.profileDistribution).map(([profile, count]) => {
                                            const percentage = parseFloat(((count / stats.totalStudents) * 100).toFixed(1));
                                            return (
                                                <Box key={profile} sx={{ mb: 2 }}>
                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                            {profile}
                                                        </Typography>
                                                        <Typography variant="body2" sx={{ color: '#718096' }}>
                                                            {count} ({percentage.toFixed(1)}%)
                                                        </Typography>
                                                    </Box>
                                                    <LinearProgress
                                                        variant="determinate"
                                                        value={percentage}
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
                                            );
                                        })}
                                    </CardContent>
                                </Card>
                            </Grid>
                        )}

                        {/* Répartition par Région */}
                        {stats && Object.keys(stats.regionDistribution).length > 0 && (
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
                                            {isFrench ? 'Répartition par Région' : 'Distribution by Region'}
                                        </Typography>
                                        {Object.entries(stats.regionDistribution)
                                            .sort(([, a], [, b]) => b - a)
                                            .slice(0, 5)
                                            .map(([region, count]) => {
                                                const percentage = parseFloat(((count / stats.totalStudents) * 100).toFixed(1));
                                                return (
                                                    <Box key={region} sx={{ mb: 2 }}>
                                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                                <LocationOnIcon sx={{ fontSize: 16, color: '#16a34a' }} />
                                                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                                    {region}
                                                                </Typography>
                                                            </Box>
                                                            <Typography variant="body2" sx={{ color: '#718096' }}>
                                                                {count} ({percentage.toFixed(1)}%)
                                                            </Typography>
                                                        </Box>
                                                        <LinearProgress
                                                            variant="determinate"
                                                            value={percentage}
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
                                                );
                                            })}
                                    </CardContent>
                                </Card>
                            </Grid>
                        )}
                    </Grid>

                    {/* Performance Summary */}
                    {dashboardData && (
                        <Card
                            elevation={0}
                            sx={{
                                mt: 3,
                                borderRadius: '12px',
                                border: '1px solid #e2e8f0',
                                boxShadow: '0 4px 6px -1px rgba(15, 23, 42, 0.06)',
                            }}
                        >
                            <CardContent>
                                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: '#0f172a' }}>
                                    {isFrench ? 'Résumé des Performances' : 'Performance Summary'}
                                </Typography>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={4}>
                                        <Box>
                                            <Typography variant="body2" sx={{ color: '#64748b', mb: 1 }}>
                                                {isFrench ? 'QCM Validés' : 'Validated QCMs'}
                                            </Typography>
                                            <Typography variant="h4" sx={{ fontWeight: 700, color: '#16a34a' }}>
                                                {dashboardData.qcmValide || 0}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <Box>
                                            <Typography variant="body2" sx={{ color: '#64748b', mb: 1 }}>
                                                {isFrench ? 'Taux de Réussite QCM' : 'QCM Success Rate'}
                                            </Typography>
                                            <Typography variant="h4" sx={{ fontWeight: 700, color: '#059669' }}>
                                                {dashboardData.tauxReuissite?.toFixed(1) || 0}%
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <Box>
                                            <Typography variant="body2" sx={{ color: '#64748b', mb: 1 }}>
                                                {isFrench ? 'Questions Posées' : 'Questions Asked'}
                                            </Typography>
                                            <Typography variant="h4" sx={{ fontWeight: 700, color: '#7c3aed' }}>
                                                {dashboardData.questionPose || 0}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    )}
                </Box>
            )}
        </Box>
    );
}
