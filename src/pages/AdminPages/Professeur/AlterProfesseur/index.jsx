import React, { useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../../../../context';
import {
    Box,
    Typography,
    Button,
    Alert,
    Breadcrumbs,
    Link as MuiLink,
    CircularProgress,
    Backdrop
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import PersonIcon from '@mui/icons-material/Person';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { MessageErrorServeur } from '../../../../composants/MessageComponent';
import { useFetch } from '../../../../utils/hooks/FetchData';
import { SaveFormProfesseur, FormProfesseur } from '../CreateProfesseur';
import {
    adminBreadcrumbRootSx,
    adminBreadcrumbLinkSx,
    adminBreadcrumbCurrentSx,
    adminCancelButtonSx,
    adminPrimarySaveButtonSx
} from '../../../../utils/adminPageStyles';

export default function AlterProfesseur() {
    const { matricule } = useParams();
    const { language } = useContext(AppContext);
    const isFrench = language === 'FR';
    const navigation = useNavigate();
    const [update, setUpdate] = useState(false);
    const fetchProfesseur = useFetch(`/admin/professeur/${matricule}`, 'GET', null, null, update);

    const [save, setSave] = useState(false);
    const [errorServeur, setErrorServeur] = useState(false);
    const [error, setError] = useState({ textError: null });
    const [formProfesseur, setFormProfesseur] = useState({});

    // Initialiser le formulaire avec les données du professeur
    React.useEffect(() => {
        if (fetchProfesseur.data?.professeur) {
            const prof = fetchProfesseur.data.professeur;
            setFormProfesseur({
                id: prof.id,
                matricule: prof.matricule,
                nom: prof.nom || '',
                prenom: prof.prenom || '',
                email: prof.email || '',
                telephone: prof.telephone || '',
                profession: prof.profession || '',
                etat: prof.etat || 'ACTIF',
                region: prof.region ? { id: prof.region.id, nom: prof.region.nom } : null,
                id_Region: prof.region?.id || null
            });
        }
    }, [fetchProfesseur.data]);

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
                            <EditIcon className="adminPageHeaderIcon" />
                        </Box>
                        <Box>
                            <Breadcrumbs
                                separator={<NavigateNextIcon fontSize="small" sx={{ color: '#94a3b8' }} />}
                                aria-label="breadcrumb"
                                sx={adminBreadcrumbRootSx}
                            >
                                <MuiLink
                                    component="button"
                                    variant="body2"
                                    onClick={() => navigation('/professeurs')}
                                    sx={adminBreadcrumbLinkSx}
                                >
                                    {isFrench ? 'Professeurs' : 'Teachers'}
                                </MuiLink>
                                <MuiLink
                                    component="button"
                                    variant="body2"
                                    onClick={() => navigation(`/professeur/${matricule}`)}
                                    sx={adminBreadcrumbLinkSx}
                                >
                                    {fetchProfesseur.data?.professeur?.nom || matricule}
                                </MuiLink>
                                <Typography variant="body2" sx={adminBreadcrumbCurrentSx}>
                                    {isFrench ? 'Modifier' : 'Edit'}
                                </Typography>
                            </Breadcrumbs>
                            <Typography variant="h4" className="adminPageTitle">
                                {isFrench ? 'Modifier un Professeur' : 'Edit Teacher'}
                            </Typography>
                            <Typography variant="body1" className="adminPageSubtitle">
                                {isFrench
                                    ? 'Modifiez les informations du professeur'
                                    : 'Modify teacher information'}
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
                            disabled={save || fetchProfesseur.isLoading}
                            sx={adminPrimarySaveButtonSx}
                        >
                            {isFrench ? 'Enregistrer' : 'Save'}
                        </Button>
                    </Box>
                </Box>
            </Box>

            {/* Loading State */}
            {fetchProfesseur.isLoading ? (
                <Box className="adminPageLoading">
                    <Backdrop open={true} sx={{ zIndex: 1000, color: '#fff' }}>
                        <Box sx={{ textAlign: 'center' }}>
                            <CircularProgress size={60} sx={{ color: '#16a34a', mb: 2 }} />
                            <Typography variant="h6" sx={{ color: '#fff', mt: 2 }}>
                                {isFrench ? 'Chargement des données...' : 'Loading data...'}
                            </Typography>
                        </Box>
                    </Backdrop>
                </Box>
            ) : fetchProfesseur.error ? (
                <Box className="adminPageError">
                    <MessageErrorServeur />
                </Box>
            ) : (
                <Box className="adminPageContent">
                    {fetchProfesseur.data?.professeur ? (
                        <>
                            {/* Error Messages */}
                            {error.textError && (
                                <Alert severity="error" sx={{ mb: 3, borderRadius: '12px' }}>
                                    {error.textError}
                                </Alert>
                            )}
                            {errorServeur && <MessageErrorServeur />}

                            <FormProfesseur
                                formProfesseur={formProfesseur}
                                setFormProfesseur={setFormProfesseur}
                                isFrench={isFrench}
                            />

                            <SaveFormProfesseur
                                setErrorServeur={setErrorServeur}
                                setSave={setSave}
                                setError={setError}
                                formProfesseur={formProfesseur}
                                action="PUT"
                                save={save}
                            />
                        </>
                    ) : (
                        <Alert severity="warning" sx={{ borderRadius: '12px' }}>
                            {isFrench ? 'Aucun professeur trouvé' : 'No professor found'}
                        </Alert>
                    )}
                </Box>
            )}
        </Box>
    );
}

