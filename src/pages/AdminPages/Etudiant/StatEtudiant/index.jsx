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
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    Avatar
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SchoolIcon from '@mui/icons-material/School';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { MessageErrorServeur } from '../../../../composants/MessageComponent';

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
                  title: isFrench ? 'Total Étudiants' : 'Total Students',
                  value: dashboardData.etudiantInscrit || 0,
                  icon: PeopleIcon,
                  color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              },
              {
                  id: 'actifs',
                  title: isFrench ? 'Étudiants Actifs' : 'Active Students',
                  value: stats?.activeStudents || 0,
                  icon: TrendingUpIcon,
                  color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
              },
              {
                  id: 'confirmes',
                  title: isFrench ? 'Comptes Confirmés' : 'Confirmed Accounts',
                  value: stats?.confirmedStudents || 0,
                  icon: CheckCircleIcon,
                  color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
              },
              {
                  id: 'cours',
                  title: isFrench ? 'Cours Lus' : 'Courses Read',
                  value: dashboardData.courLu || 0,
                  icon: SchoolIcon,
                  color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
              }
          ]
        : [];

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

                    {/* Distribution Charts */}
                    <Grid container spacing={3}>
                        {/* Répartition par Profil */}
                        {stats && Object.keys(stats.profileDistribution).length > 0 && (
                            <Grid item xs={12} md={6}>
                                <Card sx={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                                    <CardContent>
                                        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: '#1a202c' }}>
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
                                            );
                                        })}
                                    </CardContent>
                                </Card>
                            </Grid>
                        )}

                        {/* Répartition par Région */}
                        {stats && Object.keys(stats.regionDistribution).length > 0 && (
                            <Grid item xs={12} md={6}>
                                <Card sx={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                                    <CardContent>
                                        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: '#1a202c' }}>
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
                                                                <LocationOnIcon sx={{ fontSize: 16, color: '#667eea' }} />
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
                                                );
                                            })}
                                    </CardContent>
                                </Card>
                            </Grid>
                        )}
                    </Grid>

                    {/* Performance Summary */}
                    {dashboardData && (
                        <Card sx={{ mt: 3, borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                            <CardContent>
                                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: '#1a202c' }}>
                                    {isFrench ? 'Résumé des Performances' : 'Performance Summary'}
                                </Typography>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={4}>
                                        <Box>
                                            <Typography variant="body2" sx={{ color: '#718096', mb: 1 }}>
                                                {isFrench ? 'QCM Validés' : 'Validated QCMs'}
                                            </Typography>
                                            <Typography variant="h4" sx={{ fontWeight: 700, color: '#667eea' }}>
                                                {dashboardData.qcmValide || 0}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <Box>
                                            <Typography variant="body2" sx={{ color: '#718096', mb: 1 }}>
                                                {isFrench ? 'Taux de Réussite QCM' : 'QCM Success Rate'}
                                            </Typography>
                                            <Typography variant="h4" sx={{ fontWeight: 700, color: '#43e97b' }}>
                                                {dashboardData.tauxReuissite?.toFixed(1) || 0}%
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <Box>
                                            <Typography variant="body2" sx={{ color: '#718096', mb: 1 }}>
                                                {isFrench ? 'Questions Posées' : 'Questions Asked'}
                                            </Typography>
                                            <Typography variant="h4" sx={{ fontWeight: 700, color: '#fa709a' }}>
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
