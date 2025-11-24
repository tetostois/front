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
            {/* Header Section */}
            <Box className="adminPageHeader">
                <Box className="adminPageHeaderContent">
                    <Box className="adminPageHeaderIconContainer">
                        <EditIcon className="adminPageHeaderIcon" />
                    </Box>
                    <Box>
                        <Breadcrumbs
                            separator={<NavigateNextIcon fontSize="small" />}
                            aria-label="breadcrumb"
                            sx={{ mb: 1, color: 'rgba(255, 255, 255, 0.8)' }}
                        >
                            <MuiLink
                                component="button"
                                variant="body2"
                                onClick={() => navigation('/professeurs')}
                                sx={{ color: 'rgba(255, 255, 255, 0.8)', textDecoration: 'none', cursor: 'pointer' }}
                            >
                                {isFrench ? 'Professeurs' : 'Teachers'}
                            </MuiLink>
                            <MuiLink
                                component="button"
                                variant="body2"
                                onClick={() => navigation(`/professeur/${matricule}`)}
                                sx={{ color: 'rgba(255, 255, 255, 0.8)', textDecoration: 'none', cursor: 'pointer' }}
                            >
                                {fetchProfesseur.data?.professeur?.nom || matricule}
                            </MuiLink>
                            <Typography variant="body2" sx={{ color: '#fff', fontWeight: 500 }}>
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
                        disabled={save || fetchProfesseur.isLoading}
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

            {/* Loading State */}
            {fetchProfesseur.isLoading ? (
                <Box className="adminPageLoading">
                    <Backdrop open={true} sx={{ zIndex: 1000, color: '#fff' }}>
                        <Box sx={{ textAlign: 'center' }}>
                            <CircularProgress size={60} sx={{ color: '#667eea', mb: 2 }} />
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

