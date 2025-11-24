import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Button,
    Alert
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EmailIcon from '@mui/icons-material/Email';

export default function SuccessMailSend() {
    const { language } = useContext(AppContext);
    const navigation = useNavigate();
    const isFrench = language === 'FR';

    return (
        <Box className="adminPageContainer">
            {/* Header Section */}
            <Box className="adminPageHeader">
                <Box className="adminPageHeaderContent">
                    <Box className="adminPageHeaderIconContainer">
                        <EmailIcon className="adminPageHeaderIcon" />
                    </Box>
                    <Box>
                        <Typography variant="h4" className="adminPageTitle">
                            {isFrench ? 'Envoi Réussi' : 'Send Success'}
                        </Typography>
                        <Typography variant="body1" className="adminPageSubtitle">
                            {isFrench
                                ? 'Confirmation de l\'envoi des emails'
                                : 'Email sending confirmation'}
                        </Typography>
                    </Box>
                </Box>
            </Box>

            {/* Content Section */}
            <Box className="adminPageContent">
                <Card
                    sx={{
                        borderRadius: '16px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                        maxWidth: '800px',
                        margin: '0 auto'
                    }}
                >
                    <CardContent sx={{ p: 4, textAlign: 'center' }}>
                        <Box
                            sx={{
                                width: 80,
                                height: 80,
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 24px',
                                boxShadow: '0 4px 20px rgba(67, 233, 123, 0.3)'
                            }}
                        >
                            <CheckCircleIcon sx={{ fontSize: 48, color: '#fff' }} />
                        </Box>

                        <Typography
                            variant="h5"
                            sx={{
                                fontFamily: 'Poppins, sans-serif',
                                fontWeight: 700,
                                color: '#1a202c',
                                mb: 2
                            }}
                        >
                            {isFrench ? 'Envoi Initiated avec Succès !' : 'Send Initiated Successfully!'}
                        </Typography>

                        <Alert
                            severity="success"
                            icon={<CheckCircleIcon />}
                            sx={{
                                mb: 3,
                                borderRadius: '12px',
                                textAlign: 'left',
                                backgroundColor: '#e6fffa',
                                color: '#234e52',
                                '& .MuiAlert-icon': {
                                    color: '#38f9d7'
                                }
                            }}
                        >
                            <Typography variant="body1" sx={{ fontWeight: 500, mb: 1 }}>
                                {isFrench
                                    ? 'L\'envoi des mails a bien été initié.'
                                    : 'Email sending has been successfully initiated.'}
                            </Typography>
                            <Typography variant="body2">
                                {isFrench
                                    ? 'Tous les étudiants ayant le ou les profil(s) sélectionné(s) recevront le mail au fur et à mesure.'
                                    : 'All students with the selected profile(s) will receive the email progressively.'}
                            </Typography>
                        </Alert>

                        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 4 }}>
                            <Button
                                variant="outlined"
                                startIcon={<ArrowBackIcon />}
                                onClick={() => navigation('/mail')}
                                sx={{
                                    textTransform: 'none',
                                    borderRadius: '12px',
                                    borderColor: '#e2e8f0',
                                    color: '#4a5568',
                                    '&:hover': {
                                        borderColor: '#cbd5e0',
                                        backgroundColor: '#f7fafc'
                                    },
                                    fontWeight: 600,
                                    fontSize: 15,
                                    padding: '10px 24px'
                                }}
                            >
                                {isFrench ? 'Envoyer un autre mail' : 'Send Another Email'}
                            </Button>
                            <Button
                                variant="contained"
                                onClick={() => navigation('/dashboard')}
                                sx={{
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    '&:hover': {
                                        background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                                        boxShadow: '0 6px 12px rgba(102, 126, 234, 0.3)'
                                    },
                                    textTransform: 'none',
                                    borderRadius: '12px',
                                    fontWeight: 600,
                                    fontSize: 15,
                                    padding: '10px 24px',
                                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                                }}
                            >
                                {isFrench ? 'Retour au Dashboard' : 'Back to Dashboard'}
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
}
