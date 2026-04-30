import React, { useState, useContext } from 'react';
import { AppContext } from '../../../context';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Grid,
    Button,
    Switch,
    FormControlLabel,
    Divider,
    Alert,
    CircularProgress,
    Backdrop
} from '@mui/material';
import { FormTextInput } from '../../../composants/UiInputs';
import SettingsIcon from '@mui/icons-material/Settings';
import SaveIcon from '@mui/icons-material/Save';
import SecurityIcon from '@mui/icons-material/Security';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LanguageIcon from '@mui/icons-material/Language';
import EmailIcon from '@mui/icons-material/Email';
import { adminPrimarySaveButtonSx } from '../../../utils/adminPageStyles';

export default function Setting() {
    const { language, setLanguage } = useContext(AppContext);
    const isFrench = language === 'FR';
    const [saving, setSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [saveError, setSaveError] = useState(false);

    // Paramètres généraux
    const [generalSettings, setGeneralSettings] = useState({
        siteName: 'Programme Leadership',
        siteDescription: 'Plateforme d\'apprentissage en ligne',
        maintenanceMode: false,
        allowRegistration: true
    });

    // Paramètres de sécurité
    const [securitySettings, setSecuritySettings] = useState({
        requireEmailVerification: true,
        requirePhoneVerification: false,
        passwordMinLength: 8,
        sessionTimeout: 30
    });

    // Paramètres de notifications
    const [notificationSettings, setNotificationSettings] = useState({
        emailNotifications: true,
        smsNotifications: false,
        pushNotifications: true,
        weeklyDigest: true
    });

    // Paramètres d'email
    const [emailSettings, setEmailSettings] = useState({
        smtpHost: 'smtp.example.com',
        smtpPort: 587,
        smtpUsername: '',
        smtpPassword: '',
        fromEmail: 'noreply@programmeleadership.org',
        fromName: 'Programme Leadership'
    });

    const handleGeneralChange = (field) => (event) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        setGeneralSettings({ ...generalSettings, [field]: value });
    };

    const handleSecurityChange = (field) => (event) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        setSecuritySettings({ ...securitySettings, [field]: value });
    };

    const handleNotificationChange = (field) => (event) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        setNotificationSettings({ ...notificationSettings, [field]: value });
    };

    const handleEmailChange = (field) => (event) => {
        setEmailSettings({ ...emailSettings, [field]: event.target.value });
    };

    const handleSave = async () => {
        setSaving(true);
        setSaveSuccess(false);
        setSaveError(false);

        try {
            // TODO: Implémenter l'appel API pour sauvegarder les paramètres
            // await saveSettings({ generalSettings, securitySettings, notificationSettings, emailSettings });
            
            // Simulation d'une sauvegarde
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 3000);
        } catch (error) {
            setSaveError(true);
            setTimeout(() => setSaveError(false), 3000);
        } finally {
            setSaving(false);
        }
    };

    return (
        <Box className="adminPageContainer">
            <Box className="adminPageHeader">
                <Box className="adminPageHeaderRow">
                    <Box className="adminPageHeaderContent">
                        <Box className="adminPageHeaderIconContainer">
                            <SettingsIcon className="adminPageHeaderIcon" />
                        </Box>
                        <Box>
                            <Typography variant="h4" className="adminPageTitle">
                                {isFrench ? 'Paramètres' : 'Settings'}
                            </Typography>
                            <Typography variant="body1" className="adminPageSubtitle">
                                {isFrench
                                    ? 'Gérez les paramètres généraux de l\'application'
                                    : 'Manage general application settings'}
                            </Typography>
                        </Box>
                    </Box>
                    <Button
                        variant="contained"
                        startIcon={<SaveIcon />}
                        onClick={handleSave}
                        disabled={saving}
                        sx={adminPrimarySaveButtonSx}
                    >
                        {saving ? (isFrench ? 'Enregistrement...' : 'Saving...') : (isFrench ? 'Enregistrer' : 'Save')}
                    </Button>
                </Box>
            </Box>

            {/* Success/Error Messages */}
            {saveSuccess && (
                <Alert severity="success" sx={{ mb: 3, borderRadius: '12px' }}>
                    {isFrench ? 'Paramètres enregistrés avec succès !' : 'Settings saved successfully!'}
                </Alert>
            )}
            {saveError && (
                <Alert severity="error" sx={{ mb: 3, borderRadius: '12px' }}>
                    {isFrench ? 'Erreur lors de l\'enregistrement des paramètres.' : 'Error saving settings.'}
                </Alert>
            )}

            {/* Content Section */}
            <Box className="adminPageContent">
                <Grid container spacing={3}>
                    {/* Paramètres Généraux */}
                    <Grid item xs={12} md={6}>
                        <Card sx={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', height: '100%' }}>
                            <CardContent sx={{ p: 3 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                    <SettingsIcon sx={{ fontSize: 28, color: '#16a34a', mr: 1.5 }} />
                                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#1a202c' }}>
                                        {isFrench ? 'Paramètres Généraux' : 'General Settings'}
                                    </Typography>
                                </Box>
                                <Divider sx={{ mb: 3 }} />
                                
                                <FormTextInput
                                    fullWidth
                                    className="mb-2"
                                    label={isFrench ? 'Nom du site' : 'Site Name'}
                                    value={generalSettings.siteName}
                                    onChange={handleGeneralChange('siteName')}
                                />
                                
                                <FormTextInput
                                    fullWidth
                                    className="mb-2"
                                    multiline
                                    rows={3}
                                    label={isFrench ? 'Description du site' : 'Site Description'}
                                    value={generalSettings.siteDescription}
                                    onChange={handleGeneralChange('siteDescription')}
                                />
                                
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={generalSettings.maintenanceMode}
                                            onChange={handleGeneralChange('maintenanceMode')}
                                            color="primary"
                                        />
                                    }
                                    label={isFrench ? 'Mode maintenance' : 'Maintenance Mode'}
                                    sx={{ mb: 2 }}
                                />
                                
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={generalSettings.allowRegistration}
                                            onChange={handleGeneralChange('allowRegistration')}
                                            color="primary"
                                        />
                                    }
                                    label={isFrench ? 'Autoriser les inscriptions' : 'Allow Registration'}
                                />
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Paramètres de Sécurité */}
                    <Grid item xs={12} md={6}>
                        <Card sx={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', height: '100%' }}>
                            <CardContent sx={{ p: 3 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                    <SecurityIcon sx={{ fontSize: 28, color: '#f56565', mr: 1.5 }} />
                                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#1a202c' }}>
                                        {isFrench ? 'Sécurité' : 'Security'}
                                    </Typography>
                                </Box>
                                <Divider sx={{ mb: 3 }} />
                                
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={securitySettings.requireEmailVerification}
                                            onChange={handleSecurityChange('requireEmailVerification')}
                                            color="primary"
                                        />
                                    }
                                    label={isFrench ? 'Vérification email requise' : 'Require Email Verification'}
                                    sx={{ mb: 2 }}
                                />
                                
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={securitySettings.requirePhoneVerification}
                                            onChange={handleSecurityChange('requirePhoneVerification')}
                                            color="primary"
                                        />
                                    }
                                    label={isFrench ? 'Vérification téléphone requise' : 'Require Phone Verification'}
                                    sx={{ mb: 2 }}
                                />
                                
                                <FormTextInput
                                    fullWidth
                                    className="mb-2"
                                    type="number"
                                    label={isFrench ? 'Longueur minimale du mot de passe' : 'Password Min Length'}
                                    value={securitySettings.passwordMinLength}
                                    onChange={handleSecurityChange('passwordMinLength')}
                                    inputProps={{ min: 6, max: 20 }}
                                />
                                
                                <FormTextInput
                                    fullWidth
                                    type="number"
                                    label={isFrench ? 'Délai d\'expiration de session (minutes)' : 'Session Timeout (minutes)'}
                                    value={securitySettings.sessionTimeout}
                                    onChange={handleSecurityChange('sessionTimeout')}
                                    inputProps={{ min: 5, max: 1440 }}
                                />
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Paramètres de Notifications */}
                    <Grid item xs={12} md={6}>
                        <Card sx={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', height: '100%' }}>
                            <CardContent sx={{ p: 3 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                    <NotificationsIcon sx={{ fontSize: 28, color: '#4facfe', mr: 1.5 }} />
                                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#1a202c' }}>
                                        {isFrench ? 'Notifications' : 'Notifications'}
                                    </Typography>
                                </Box>
                                <Divider sx={{ mb: 3 }} />
                                
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={notificationSettings.emailNotifications}
                                            onChange={handleNotificationChange('emailNotifications')}
                                            color="primary"
                                        />
                                    }
                                    label={isFrench ? 'Notifications par email' : 'Email Notifications'}
                                    sx={{ mb: 2 }}
                                />
                                
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={notificationSettings.smsNotifications}
                                            onChange={handleNotificationChange('smsNotifications')}
                                            color="primary"
                                        />
                                    }
                                    label={isFrench ? 'Notifications par SMS' : 'SMS Notifications'}
                                    sx={{ mb: 2 }}
                                />
                                
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={notificationSettings.pushNotifications}
                                            onChange={handleNotificationChange('pushNotifications')}
                                            color="primary"
                                        />
                                    }
                                    label={isFrench ? 'Notifications push' : 'Push Notifications'}
                                    sx={{ mb: 2 }}
                                />
                                
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={notificationSettings.weeklyDigest}
                                            onChange={handleNotificationChange('weeklyDigest')}
                                            color="primary"
                                        />
                                    }
                                    label={isFrench ? 'Résumé hebdomadaire' : 'Weekly Digest'}
                                />
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Paramètres d'Email */}
                    <Grid item xs={12} md={6}>
                        <Card sx={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', height: '100%' }}>
                            <CardContent sx={{ p: 3 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                    <EmailIcon sx={{ fontSize: 28, color: '#fa709a', mr: 1.5 }} />
                                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#1a202c' }}>
                                        {isFrench ? 'Configuration Email' : 'Email Configuration'}
                                    </Typography>
                                </Box>
                                <Divider sx={{ mb: 3 }} />
                                
                                <FormTextInput
                                    fullWidth
                                    className="mb-2"
                                    label="SMTP Host"
                                    value={emailSettings.smtpHost}
                                    onChange={handleEmailChange('smtpHost')}
                                />
                                
                                <FormTextInput
                                    fullWidth
                                    className="mb-2"
                                    type="number"
                                    label="SMTP Port"
                                    value={emailSettings.smtpPort}
                                    onChange={handleEmailChange('smtpPort')}
                                />
                                
                                <FormTextInput
                                    fullWidth
                                    className="mb-2"
                                    label="SMTP Username"
                                    value={emailSettings.smtpUsername}
                                    onChange={handleEmailChange('smtpUsername')}
                                />
                                
                                <FormTextInput
                                    fullWidth
                                    className="mb-2"
                                    type="password"
                                    label="SMTP Password"
                                    value={emailSettings.smtpPassword}
                                    onChange={handleEmailChange('smtpPassword')}
                                />
                                
                                <FormTextInput
                                    fullWidth
                                    className="mb-2"
                                    label={isFrench ? 'Email expéditeur' : 'From Email'}
                                    value={emailSettings.fromEmail}
                                    onChange={handleEmailChange('fromEmail')}
                                />
                                
                                <FormTextInput
                                    fullWidth
                                    label={isFrench ? 'Nom expéditeur' : 'From Name'}
                                    value={emailSettings.fromName}
                                    onChange={handleEmailChange('fromName')}
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>

            {/* Loading Backdrop */}
            <Backdrop open={saving} sx={{ zIndex: 1000, color: '#fff' }}>
                <Box sx={{ textAlign: 'center' }}>
                    <CircularProgress size={60} sx={{ color: '#16a34a', mb: 2 }} />
                    <Typography variant="h6" sx={{ color: '#fff', mt: 2 }}>
                        {isFrench ? 'Enregistrement en cours...' : 'Saving in progress...'}
                    </Typography>
                </Box>
            </Backdrop>
        </Box>
    );
}

