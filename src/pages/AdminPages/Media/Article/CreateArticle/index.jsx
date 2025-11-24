import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../../../../context';
import {
    Box,
    Typography,
    Button,
    Alert,
    Breadcrumbs,
    Link as MuiLink
} from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import FormArticle from '../FormArticle';
import { MessageErrorServeur } from '../../../../../composants/MessageComponent';

export default function CreateArticle() {
    const { language } = useContext(AppContext);
    const navigation = useNavigate();
    const isFrench = language === 'FR';
    const [save, setSave] = useState(false);
    const [errorServeur, setErrorServeur] = useState(false);
    const [error, setError] = useState({ textError: null });
    const [form, setForm] = useState({});

    const handleSave = () => {
        setError({ textError: null });
        setErrorServeur(false);
        
        // Validation côté client
        if (!form.rubrique || !form.rubrique.id) {
            setError({ textError: isFrench ? 'Veuillez sélectionner une rubrique.' : 'Please select a rubrique.' });
            return;
        }
        if (!form.titre || form.titre.trim().length < 10) {
            setError({ textError: isFrench ? 'Le titre doit contenir au moins 10 caractères.' : 'Title must contain at least 10 characters.' });
            return;
        }
        if (form.titre && form.titre.length > 200) {
            setError({ textError: isFrench ? 'Le titre ne doit pas dépasser 200 caractères.' : 'Title must not exceed 200 characters.' });
            return;
        }
        if (!form.texte || form.texte.trim().length < 30) {
            setError({ textError: isFrench ? 'Le texte doit contenir au moins 30 caractères.' : 'Text must contain at least 30 characters.' });
            return;
        }
        if (!form.auteur || form.auteur.trim().length < 5) {
            setError({ textError: isFrench ? 'Le nom de l\'auteur doit contenir au moins 5 caractères.' : 'Author name must contain at least 5 characters.' });
            return;
        }
        
        setSave(true);
    };

    const handleCancel = () => {
        navigation(-1);
    };

    return (
        <Box className="adminPageContainer">
            {/* Header Section */}
            <Box className="adminPageHeader">
                <Box className="adminPageHeaderContent">
                    <Box className="adminPageHeaderIconContainer">
                        <ArticleIcon className="adminPageHeaderIcon" />
                    </Box>
                    <Box>
                        <Breadcrumbs sx={{ mb: 1, color: 'rgba(255, 255, 255, 0.8)' }}>
                            <MuiLink
                                component="button"
                                variant="body2"
                                onClick={() => navigation('/article')}
                                sx={{ color: 'rgba(255, 255, 255, 0.8)', textDecoration: 'none', cursor: 'pointer' }}
                            >
                                {isFrench ? 'Articles' : 'Articles'}
                            </MuiLink>
                            <Typography variant="body2" sx={{ color: '#fff', fontWeight: 500 }}>
                                {isFrench ? 'Créer un article' : 'Create Article'}
                            </Typography>
                        </Breadcrumbs>
                        <Typography variant="h4" className="adminPageTitle">
                            {isFrench ? 'Créer un Article' : 'Create Article'}
                        </Typography>
                        <Typography variant="body1" className="adminPageSubtitle">
                            {isFrench
                                ? 'Remplissez le formulaire pour créer un nouvel article'
                                : 'Fill in the form to create a new article'}
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                        variant="outlined"
                        startIcon={<CancelIcon />}
                        onClick={handleCancel}
                        sx={{
                            textTransform: 'none',
                            borderRadius: '12px',
                            borderColor: 'rgba(255, 255, 255, 0.5)',
                            color: '#fff',
                            '&:hover': {
                                borderColor: '#fff',
                                backgroundColor: 'rgba(255, 255, 255, 0.1)'
                            },
                            fontWeight: 600,
                            fontSize: 15,
                            padding: '10px 24px'
                        }}
                    >
                        {isFrench ? 'Annuler' : 'Cancel'}
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<SaveIcon />}
                        onClick={handleSave}
                        disabled={save}
                        sx={{
                            background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #38f9d7 0%, #43e97b 100%)',
                                boxShadow: '0 6px 12px rgba(56, 249, 215, 0.3)'
                            },
                            textTransform: 'none',
                            borderRadius: '12px',
                            fontWeight: 600,
                            fontSize: 15,
                            padding: '10px 24px',
                            boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                        }}
                    >
                        {isFrench ? 'Enregistrer' : 'Save'}
                    </Button>
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
                <FormArticle
                    setSave={setSave}
                    save={save}
                    requestMethode="POST"
                    setError={setError}
                    setErrorServeur={setErrorServeur}
                    language={language}
                    form={form}
                    setForm={setForm}
                />
            </Box>
        </Box>
    );
}
