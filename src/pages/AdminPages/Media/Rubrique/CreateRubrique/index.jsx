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
import {
    adminBreadcrumbRootSx,
    adminBreadcrumbLinkSx,
    adminBreadcrumbCurrentSx,
    adminCancelButtonSx,
    adminPrimarySaveButtonSx
} from '../../../../../utils/adminPageStyles';

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
            <Box className="adminPageHeader">
                <Box className="adminPageHeaderRow">
                    <Box className="adminPageHeaderContent">
                        <Box className="adminPageHeaderIconContainer">
                            <FolderIcon className="adminPageHeaderIcon" />
                        </Box>
                        <Box>
                            <Breadcrumbs sx={adminBreadcrumbRootSx}>
                                <MuiLink
                                    component="button"
                                    variant="body2"
                                    onClick={() => navigation('/rubrique')}
                                    sx={adminBreadcrumbLinkSx}
                                >
                                    {isFrench ? 'Rubriques' : 'Rubriques'}
                                </MuiLink>
                                <Typography variant="body2" sx={adminBreadcrumbCurrentSx}>
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
