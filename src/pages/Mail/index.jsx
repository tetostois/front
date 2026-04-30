import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Button,
    Alert,
    Divider,
    Chip,
    Grid,
    Paper,
    IconButton,
    Tooltip
} from '@mui/material';
import { FormTextInput } from '../../composants/UiInputs';
import EmailIcon from '@mui/icons-material/Email';
import SendIcon from '@mui/icons-material/Send';
import CancelIcon from '@mui/icons-material/Cancel';
import PreviewIcon from '@mui/icons-material/Preview';
import EditIcon from '@mui/icons-material/Edit';
import SaveComponent from '../../composants/SaveComponent';
import { MessageErrorServeur } from '../../composants/MessageComponent';
import { adminCancelButtonSx, adminPrimarySaveButtonSx } from '../../utils/adminPageStyles';

export default function Mail() {
    const { language } = useContext(AppContext);
    const navigation = useNavigate();
    const isFrench = language === 'FR';
    const [save, setSave] = useState(false);
    const [errorServeur, setErrorServeur] = useState(false);
    const [error, setError] = useState({ textError: null });
    const [form, setForm] = useState({
        objet: '',
        bodyHtml: '',
        profil: ''
    });
    const [showPreview, setShowPreview] = useState(false);

    const handleChange = (field) => (event) => {
        setForm({ ...form, [field]: event.target.value });
        if (error.textError) {
            setError({ textError: null });
        }
        setErrorServeur(false);
    };

    const handleSend = () => {
        setError({ textError: null });
        setErrorServeur(false);
        
        // Validation
        if (!form.objet || form.objet.trim().length < 5) {
            setError({ textError: isFrench ? 'L\'objet du mail doit contenir au moins 5 caractères.' : 'Mail subject must contain at least 5 characters.' });
            return;
        }
        if (!form.bodyHtml || form.bodyHtml.trim().length < 10) {
            setError({ textError: isFrench ? 'Le corps du mail doit contenir au moins 10 caractères.' : 'Mail body must contain at least 10 characters.' });
            return;
        }
        if (!form.profil || form.profil.trim().length === 0) {
            setError({ textError: isFrench ? 'Veuillez spécifier au moins un profil.' : 'Please specify at least one profile.' });
            return;
        }
        
        setSave(true);
    };

    const handleCancel = () => {
        navigation(-1);
    };

    return (
        <Box className="adminPageContainer">
            <Box className="adminPageHeader">
                <Box className="adminPageHeaderRow">
                    <Box className="adminPageHeaderContent">
                        <Box className="adminPageHeaderIconContainer">
                            <EmailIcon className="adminPageHeaderIcon" />
                        </Box>
                        <Box>
                            <Typography variant="h4" className="adminPageTitle">
                                {isFrench ? 'Envoi de Mail' : 'Send Email'}
                            </Typography>
                            <Typography variant="body1" className="adminPageSubtitle">
                                {isFrench
                                    ? 'Envoyez des emails aux étudiants selon leur profil'
                                    : 'Send emails to students based on their profile'}
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexShrink: 0, flexWrap: 'wrap' }}>
                        <Button
                            variant="outlined"
                            startIcon={<CancelIcon />}
                            onClick={handleCancel}
                            sx={adminCancelButtonSx}
                        >
                            {isFrench ? 'Annuler' : 'Cancel'}
                        </Button>
                        <Button
                            variant="contained"
                            startIcon={<SendIcon />}
                            onClick={handleSend}
                            disabled={save}
                            sx={adminPrimarySaveButtonSx}
                        >
                            {isFrench ? 'Envoyer' : 'Send'}
                        </Button>
                    </Box>
                </Box>
            </Box>

            {/* Error Messages */}
            {errorServeur && (
                <Box sx={{ mb: 3 }}>
                    <MessageErrorServeur />
                </Box>
            )}

            {error.textError && (
                <Alert severity="error" sx={{ mb: 3, borderRadius: '12px' }}>
                    {error.textError}
                </Alert>
            )}

            {/* Content Section */}
            <Box className="adminPageContent">
                <Grid container spacing={3}>
                    {/* Subject Field */}
                    <Grid item xs={12}>
                        <Card sx={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                            <CardContent sx={{ p: 3 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <EmailIcon sx={{ fontSize: 24, color: '#16a34a', mr: 1.5 }} />
                                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#1a202c' }}>
                                        {isFrench ? 'Objet du Mail' : 'Email Subject'}
                                    </Typography>
                                </Box>
                                <Divider sx={{ mb: 2 }} />
                                <FormTextInput
                                    fullWidth
                                    label={isFrench ? 'Objet du mail' : 'Mail Subject'}
                                    placeholder={isFrench ? 'Validation de Compte' : 'Account Validation'}
                                    value={form.objet}
                                    onChange={handleChange('objet')}
                                />
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Email Body */}
                    <Grid item xs={12}>
                        <Card sx={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                            <CardContent sx={{ p: 3 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <EmailIcon sx={{ fontSize: 24, color: '#16a34a', mr: 1.5 }} />
                                        <Typography variant="h6" sx={{ fontWeight: 600, color: '#1a202c' }}>
                                            {isFrench ? 'Corps du Mail' : 'Email Body'}
                                        </Typography>
                                    </Box>
                                    <Tooltip title={isFrench ? (showPreview ? 'Éditer' : 'Aperçu') : (showPreview ? 'Edit' : 'Preview')}>
                                        <IconButton
                                            onClick={() => setShowPreview(!showPreview)}
                                            sx={{
                                                backgroundColor: showPreview ? '#16a34a' : '#e2e8f0',
                                                color: showPreview ? '#fff' : '#4a5568',
                                                '&:hover': {
                                                    backgroundColor: showPreview ? '#15803d' : '#cbd5e0'
                                                }
                                            }}
                                        >
                                            {showPreview ? <EditIcon /> : <PreviewIcon />}
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                                <Divider sx={{ mb: 2 }} />
                                
                                {showPreview ? (
                                    <Paper
                                        elevation={0}
                                        sx={{
                                            p: 3,
                                            minHeight: '400px',
                                            border: '2px solid #e2e8f0',
                                            borderRadius: '12px',
                                            backgroundColor: '#f7fafc'
                                        }}
                                    >
                                        <Typography
                                            variant="body1"
                                            dangerouslySetInnerHTML={{ __html: form.bodyHtml || (isFrench ? '<p style="color: #718096;">Aucun contenu à afficher</p>' : '<p style="color: #718096;">No content to display</p>') }}
                                            sx={{
                                                '& p': { margin: '8px 0' },
                                                '& h1, & h2, & h3': { color: '#1a202c', marginTop: '16px' },
                                                '& a': { color: '#16a34a', textDecoration: 'none' }
                                            }}
                                        />
                                    </Paper>
                                ) : (
                                    <FormTextInput
                                        fullWidth
                                        multiline
                                        rows={15}
                                        label={isFrench ? 'Corps du Mail (format HTML)' : 'Mail Body (HTML format)'}
                                        placeholder={isFrench ? 'Texte du mail au format HTML, tout dans une div' : 'Mail text in HTML format, everything in a div'}
                                        value={form.bodyHtml}
                                        onChange={handleChange('bodyHtml')}
                                        inputClassName="font-mono text-sm"
                                    />
                                )}
                                <Box sx={{ mt: 2 }}>
                                    <Chip
                                        label={isFrench ? 'Format HTML' : 'HTML Format'}
                                        size="small"
                                        sx={{
                                            backgroundColor: '#e6f3ff',
                                            color: '#2c5282',
                                            fontSize: 11
                                        }}
                                    />
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Profile Selection */}
                    <Grid item xs={12}>
                        <Card sx={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                            <CardContent sx={{ p: 3 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <EmailIcon sx={{ fontSize: 24, color: '#16a34a', mr: 1.5 }} />
                                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#1a202c' }}>
                                        {isFrench ? 'Profils Cibles' : 'Target Profiles'}
                                    </Typography>
                                </Box>
                                <Divider sx={{ mb: 2 }} />
                                <FormTextInput
                                    fullWidth
                                    label={isFrench ? 'Identifiants des profils (ex: 123 ou 12 ou 34)' : 'Profile IDs (e.g., 123 or 12 or 34)'}
                                    placeholder="1234"
                                    value={form.profil}
                                    onChange={handleChange('profil')}
                                    helperText={isFrench ? 'Entrez les identifiants des profils séparés par des espaces ou des virgules' : 'Enter profile IDs separated by spaces or commas'}
                                />
                                <Alert severity="info" sx={{ mt: 2, borderRadius: '12px' }}>
                                    {isFrench
                                        ? 'Les étudiants ayant les profils sélectionnés recevront ce mail. Exemple: "123" enverra à tous les étudiants avec le profil 1, 2 ou 3.'
                                        : 'Students with the selected profiles will receive this email. Example: "123" will send to all students with profile 1, 2, or 3.'}
                                </Alert>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>

            {/* Save Component */}
            {save && (
                <SaveComponent
                    setSave={setSave}
                    requestURL="/admin/sendmail/"
                    requestBody={form}
                    requestMethode="POST"
                    requestParam={null}
                    setErrorServeur={setErrorServeur}
                    setError={setError}
                    redirected={true}
                />
            )}
        </Box>
    );
}
