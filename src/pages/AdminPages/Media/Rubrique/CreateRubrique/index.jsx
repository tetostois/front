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
import FolderIcon from '@mui/icons-material/Folder';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { FormRubrique } from '../FormRubrique';
import { MessageErrorServeur } from '../../../../../composants/MessageComponent';

export default function CreateRubrique() {
    const { language } = useContext(AppContext);
    const navigation = useNavigate();
    const isFrench = language === 'FR';
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

    return (
        <Box className="adminPageContainer">
            {/* Header Section */}
            <Box className="adminPageHeader">
                <Box className="adminPageHeaderContent">
                    <Box className="adminPageHeaderIconContainer">
                        <FolderIcon className="adminPageHeaderIcon" />
                    </Box>
                    <Box>
                        <Breadcrumbs sx={{ mb: 1, color: 'rgba(255, 255, 255, 0.8)' }}>
                            <MuiLink
                                component="button"
                                variant="body2"
                                onClick={() => navigation('/rubrique')}
                                sx={{ color: 'rgba(255, 255, 255, 0.8)', textDecoration: 'none', cursor: 'pointer' }}
                            >
                                {isFrench ? 'Rubriques' : 'Rubriques'}
                            </MuiLink>
                            <Typography variant="body2" sx={{ color: '#fff', fontWeight: 500 }}>
                                {isFrench ? 'Créer une rubrique' : 'Create Rubrique'}
                            </Typography>
                        </Breadcrumbs>
                        <Typography variant="h4" className="adminPageTitle">
                            {isFrench ? 'Créer une Rubrique' : 'Create Rubrique'}
                        </Typography>
                        <Typography variant="body1" className="adminPageSubtitle">
                            {isFrench
                                ? 'Remplissez le formulaire pour créer une nouvelle rubrique'
                                : 'Fill in the form to create a new rubrique'}
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
                <FormRubrique
                    setSave={setSave}
                    save={save}
                    requestMethode="POST"
                    setError={setError}
                    setErrorServeur={setErrorServeur}
                    language={language}
                />
            </Box>
        </Box>
    );
}
