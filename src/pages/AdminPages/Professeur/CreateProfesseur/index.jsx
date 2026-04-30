import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../../../context';
import {
    Box,
    Typography,
    Button,
    Alert,
    Breadcrumbs,
    Link as MuiLink,
    Grid,
    Card,
    CardContent,
    Divider
} from '@mui/material';
import { FormTextInput } from '../../../../composants/UiInputs';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import WorkIcon from '@mui/icons-material/Work';
import { MessageErrorServeur } from '../../../../composants/MessageComponent';
import { useFetch } from '../../../../utils/hooks/FetchData';
import { Backdrop, CircularProgress } from '@mui/material';
import {
    adminBreadcrumbRootSx,
    adminBreadcrumbLinkSx,
    adminBreadcrumbCurrentSx,
    adminCancelButtonSx,
    adminPrimarySaveButtonSx
} from '../../../../utils/adminPageStyles';

export default function CreateProfesseur() {
    const { language } = useContext(AppContext);
    const navigation = useNavigate();
    const isFrench = language === 'FR';
    const [formProfesseur, setFormProfesseur] = useState({});
    const [save, setSave] = useState(false);
    const [errorServeur, setErrorServeur] = useState(false);
    const [error, setError] = useState({ textError: null });

    const handleSave = () => {
        setError({ textError: null });
        setErrorServeur(false);
        setSave(true);
    };

    const handleCancel = () => {
        navigation(-1);
    };

    const handleChange = (field) => (event) => {
        setFormProfesseur({ ...formProfesseur, [field]: event.target.value });
    };

    return (
        <Box className="adminPageContainer">
            <Box className="adminPageHeader">
                <Box className="adminPageHeaderRow">
                    <Box className="adminPageHeaderContent">
                        <Box className="adminPageHeaderIconContainer">
                            <PersonAddIcon className="adminPageHeaderIcon" />
                        </Box>
                        <Box>
                            <Breadcrumbs sx={adminBreadcrumbRootSx}>
                                <MuiLink
                                    component="button"
                                    variant="body2"
                                    onClick={() => navigation('/professeurs')}
                                    sx={adminBreadcrumbLinkSx}
                                >
                                    {isFrench ? 'Professeurs' : 'Teachers'}
                                </MuiLink>
                                <Typography variant="body2" sx={adminBreadcrumbCurrentSx}>
                                    {isFrench ? 'Ajouter un professeur' : 'Add Teacher'}
                                </Typography>
                            </Breadcrumbs>
                            <Typography variant="h4" className="adminPageTitle">
                                {isFrench ? 'Ajouter un Professeur' : 'Add Teacher'}
                            </Typography>
                            <Typography variant="body1" className="adminPageSubtitle">
                                {isFrench
                                    ? 'Remplissez le formulaire pour créer un nouveau professeur'
                                    : 'Fill in the form to create a new teacher'}
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
                            startIcon={<SaveIcon />}
                            onClick={handleSave}
                            disabled={save}
                            sx={adminPrimarySaveButtonSx}
                        >
                            {isFrench ? 'Enregistrer' : 'Save'}
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

            {/* Form Section */}
            <Box className="adminPageContent">
                <SaveFormProfesseur
                    setErrorServeur={setErrorServeur}
                    setSave={setSave}
                    setError={setError}
                    formProfesseur={formProfesseur}
                    action="POST"
                    save={save}
                />
                <FormProfesseur formProfesseur={formProfesseur} setFormProfesseur={setFormProfesseur} isFrench={isFrench} />
            </Box>
        </Box>
    );
}

export const FormProfesseur = ({ formProfesseur, setFormProfesseur, isFrench }) => {
    const handleChange = (field) => (event) => {
        setFormProfesseur({ ...formProfesseur, [field]: event.target.value });
    };

    return (
        <Grid container spacing={3}>
            {/* Personal Information — pleine largeur (aligné dashboard) */}
            <Grid item xs={12}>
                <Card sx={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                    <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <PersonIcon sx={{ fontSize: 24, color: '#16a34a', mr: 1.5 }} />
                            <Typography variant="h6" sx={{ fontWeight: 600, color: '#1a202c' }}>
                                {isFrench ? 'Informations Personnelles' : 'Personal Information'}
                            </Typography>
                        </Box>
                        <Divider sx={{ mb: 2 }} />
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                            <FormTextInput
                                fullWidth
                                    label={isFrench ? 'Nom du professeur' : 'Teacher Last Name'}
                                    placeholder={isFrench ? 'Ex: Ngah' : 'Ex: Smith'}
                                    value={formProfesseur.nom || ''}
                                    onChange={handleChange('nom')}
                                />
                            </Grid>
                            <Grid item xs={12}>
                            <FormTextInput
                                fullWidth
                                    label={isFrench ? 'Prénom du professeur' : 'Teacher First Name'}
                                    placeholder={isFrench ? 'Ex: Josiane' : 'Ex: Jane'}
                                    value={formProfesseur.prenom || ''}
                                    onChange={handleChange('prenom')}
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>

            {/* Contact Information */}
            <Grid item xs={12}>
                <Card sx={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                    <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <EmailIcon sx={{ fontSize: 24, color: '#16a34a', mr: 1.5 }} />
                            <Typography variant="h6" sx={{ fontWeight: 600, color: '#1a202c' }}>
                                {isFrench ? 'Informations de Contact' : 'Contact Information'}
                            </Typography>
                        </Box>
                        <Divider sx={{ mb: 2 }} />
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                            <FormTextInput
                                fullWidth
                                    label={isFrench ? 'Téléphone' : 'Phone'}
                                    placeholder={isFrench ? 'Ex: 651294896' : 'Ex: +1234567890'}
                                    value={formProfesseur.telephone || ''}
                                    onChange={handleChange('telephone')}
                                    startAdornment={<PhoneIcon sx={{ fontSize: 22, color: '#16a34a' }} />}
                                />
                            </Grid>
                            <Grid item xs={12}>
                            <FormTextInput
                                fullWidth
                                    label="Email"
                                    placeholder={isFrench ? 'Ex: professeur@gmail.com' : 'Ex: teacher@example.com'}
                                    type="email"
                                    value={formProfesseur.email || ''}
                                    onChange={handleChange('email')}
                                    startAdornment={<EmailIcon sx={{ fontSize: 22, color: '#16a34a' }} />}
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>

            {/* Professional Information */}
            <Grid item xs={12}>
                <Card sx={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                    <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <WorkIcon sx={{ fontSize: 24, color: '#16a34a', mr: 1.5 }} />
                            <Typography variant="h6" sx={{ fontWeight: 600, color: '#1a202c' }}>
                                {isFrench ? 'Informations Professionnelles' : 'Professional Information'}
                            </Typography>
                        </Box>
                        <Divider sx={{ mb: 2 }} />
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                            <FormTextInput
                                fullWidth
                                    label={isFrench ? 'Profession' : 'Profession'}
                                    placeholder={isFrench ? 'Ex: Chargé de projet' : 'Ex: Project Manager'}
                                    value={formProfesseur.profession || ''}
                                    onChange={handleChange('profession')}
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export const SaveFormProfesseur = ({ setErrorServeur, setSave, setError, formProfesseur, action, save }) => {
    const { language } = useContext(AppContext);
    const navigation = useNavigate();
    const [hasProcessed, setHasProcessed] = useState(false);
    
    // Ne faire la requête que si save est true, hasProcessed est false, et formProfesseur n'est pas vide
    const shouldFetch = save && !hasProcessed && formProfesseur && Object.keys(formProfesseur).length > 0;
    
    const { isLoading, data, error } = useFetch(
        shouldFetch ? '/admin/professeur' : null,
        shouldFetch ? (action || 'POST') : null,
        shouldFetch ? formProfesseur : null
    );

    // Utiliser useEffect pour gérer les effets de bord
    useEffect(() => {
        if (!save || hasProcessed || !shouldFetch) return; // Ne rien faire si save est false, déjà traité, ou ne devrait pas fetch

        if (error) {
            setErrorServeur(true);
            setSave(false);
            setHasProcessed(true);
        } else if (!isLoading && !error && data && Object.keys(data).length > 0) {
            if (data.errorAPI) {
                setError((prevError) => ({ ...prevError, textError: data.message }));
                setSave(false);
                setHasProcessed(true);
            } else if (data.matricule) {
                setHasProcessed(true);
                navigation('/professeur/' + data.matricule);
            }
        }
    }, [isLoading, error, data, save, hasProcessed, shouldFetch, setErrorServeur, setSave, setError, navigation]);

    // Réinitialiser hasProcessed quand save devient false
    useEffect(() => {
        if (!save) {
            setHasProcessed(false);
        }
    }, [save]);

    if (save && isLoading) {
        return (
            <Backdrop open={true} sx={{ zIndex: 1000, color: '#fff' }}>
                <Box sx={{ textAlign: 'center' }}>
                    <CircularProgress size={60} sx={{ color: '#16a34a', mb: 2 }} />
                    <Typography variant="h6" sx={{ color: '#fff', mt: 2 }}>
                        {language === 'FR' ? 'Enregistrement en cours...' : 'Saving in progress...'}
                    </Typography>
                </Box>
            </Backdrop>
        );
    }

    return null;
};
