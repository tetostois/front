import React, { useState, useContext, useEffect } from 'react';
import {
    Box,
    Card,
    CardContent,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    CircularProgress,
    Backdrop,
    Grid,
    Divider,
    Typography
} from '@mui/material';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import TitleIcon from '@mui/icons-material/Title';
import DescriptionIcon from '@mui/icons-material/Description';
import PersonIcon from '@mui/icons-material/Person';
import { MessageErrorServeur } from '../../../../composants/MessageComponent';
import { useFetch } from '../../../../utils/hooks/FetchData';
import SaveComponent from '../../../../composants/SaveComponent';
import { AppContext } from '../../../../context';

export default function FormArticle({ initialForm, setErrorServeur, setError, setSave, save, requestMethode, language, form: externalForm, setForm: setExternalForm }) {
    const { language: contextLanguage } = useContext(AppContext);
    const isFrench = language || contextLanguage === 'FR';
    const requestURL = '/admin/media/article/';
    const [idModule, setIdModule] = useState(initialForm ? (initialForm.rubrique ? initialForm.rubrique.id : -1) : -1);
    const [internalForm, setInternalForm] = useState(initialForm ? initialForm : {});
    const form = externalForm !== undefined ? externalForm : internalForm;
    const setForm = setExternalForm || setInternalForm;

    // Mettre à jour idModule quand initialForm change
    useEffect(() => {
        if (initialForm?.rubrique?.id) {
            setIdModule(initialForm.rubrique.id);
        }
    }, [initialForm]);

    const { isLoading, data, error } = useFetch(`/metadata/rubriques/`, 'GET', null);

    const handleSelectChange = (event) => {
        const rubrique = data.find((rubrique) => rubrique.nom === event.target.value);
        if (rubrique) {
            setIdModule(rubrique.id);
            setForm({ ...form, rubrique: rubrique });
        }
    };

    const handleChange = (field) => (event) => {
        setForm({ ...form, [field]: event.target.value });
    };

    return (
        <>
            {isLoading ? (
                <Box className="adminPageLoading">
                    <Backdrop open={true} sx={{ zIndex: 1000, color: '#fff' }}>
                        <Box sx={{ textAlign: 'center' }}>
                            <CircularProgress size={60} sx={{ color: '#667eea', mb: 2 }} />
                            <Typography variant="h6" sx={{ color: '#fff', mt: 2 }}>
                                {isFrench ? 'Chargement des rubriques...' : 'Loading rubriques...'}
                            </Typography>
                        </Box>
                    </Backdrop>
                </Box>
            ) : error ? (
                <Box className="adminPageError">
                    <MessageErrorServeur />
                </Box>
            ) : (
                <Grid container spacing={3}>
                    {/* Rubrique Selection */}
                    <Grid item xs={12}>
                        <Card sx={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                            <CardContent sx={{ p: 3 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <FolderOpenIcon sx={{ fontSize: 24, color: '#667eea', mr: 1.5 }} />
                                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#1a202c' }}>
                                        {isFrench ? 'Rubrique' : 'Rubrique'}
                                    </Typography>
                                </Box>
                                <Divider sx={{ mb: 2 }} />
                                <FormControl fullWidth>
                                    <InputLabel id="rubrique-label">{isFrench ? 'Sélectionner une rubrique' : 'Select a rubrique'}</InputLabel>
                                    <Select
                                        label={isFrench ? 'Sélectionner une rubrique' : 'Select a rubrique'}
                                        labelId="rubrique-label"
                                        value={form.rubrique?.nom || ''}
                                        onChange={handleSelectChange}
                                        sx={{
                                            borderRadius: '12px'
                                        }}
                                    >
                                        {data &&
                                            data.length > 0 &&
                                            data.map((rubrique) => (
                                                <MenuItem key={rubrique.id} value={rubrique.nom}>
                                                    {rubrique.nom}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                </FormControl>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Article Title Section */}
                    <Grid item xs={12}>
                        <Card sx={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                            <CardContent sx={{ p: 3 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <TitleIcon sx={{ fontSize: 24, color: '#667eea', mr: 1.5 }} />
                                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#1a202c' }}>
                                        {isFrench ? 'Titres de l\'article' : 'Article Titles'}
                                    </Typography>
                                </Box>
                                <Divider sx={{ mb: 2 }} />
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label={isFrench ? 'Sur titre' : 'Sur Title'}
                                            placeholder={isFrench ? 'Ex: Nouvelle entreprise créée au Cameroun' : 'Ex: New company created in Cameroon'}
                                            value={form.surTitre || ''}
                                            onChange={handleChange('surTitre')}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '12px',
                                                '& input': {
                                                    color: '#1a202c'
                                                },
                                                '& textarea': {
                                                    color: '#1a202c'
                                                }
                                            },
                                            '& .MuiInputLabel-root': {
                                                color: '#718096'
                                            }
                                        }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label={isFrench ? 'Titre de l\'article' : 'Article Title'}
                                            placeholder={isFrench ? 'Ex: Nouvelle entreprise créée au Cameroun' : 'Ex: New company created in Cameroon'}
                                            multiline
                                            rows={2}
                                            value={form.titre || ''}
                                            onChange={handleChange('titre')}
                                            helperText={isFrench ? 'Le titre doit contenir entre 10 et 200 caractères' : 'Title must contain between 10 and 200 characters'}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: '12px',
                                                    '& input': {
                                                        color: '#1a202c'
                                                    },
                                                    '& textarea': {
                                                        color: '#1a202c'
                                                    }
                                                },
                                                '& .MuiInputLabel-root': {
                                                    color: '#718096'
                                                },
                                                '& .MuiFormHelperText-root': {
                                                    color: '#718096',
                                                    fontSize: '12px'
                                                }
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label={isFrench ? 'Sous Titre' : 'Subtitle'}
                                            placeholder={isFrench ? 'Ex: L\'essor des nouvelles entreprises au Cameroun' : 'Ex: The rise of new companies in Cameroon'}
                                            multiline
                                            rows={3}
                                            value={form.sousTitre || ''}
                                            onChange={handleChange('sousTitre')}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '12px',
                                                '& input': {
                                                    color: '#1a202c'
                                                },
                                                '& textarea': {
                                                    color: '#1a202c'
                                                }
                                            },
                                            '& .MuiInputLabel-root': {
                                                color: '#718096'
                                            }
                                        }}
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Article Content */}
                    <Grid item xs={12}>
                        <Card sx={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                            <CardContent sx={{ p: 3 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <DescriptionIcon sx={{ fontSize: 24, color: '#667eea', mr: 1.5 }} />
                                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#1a202c' }}>
                                        {isFrench ? 'Contenu de l\'article' : 'Article Content'}
                                    </Typography>
                                </Box>
                                <Divider sx={{ mb: 2 }} />
                                <TextField
                                    fullWidth
                                    label={isFrench ? 'Contenu textuel de l\'article' : 'Article Text Content'}
                                    placeholder={isFrench ? 'Le texte de l\'article ici... (minimum 30 caractères)' : 'Article text here... (minimum 30 characters)'}
                                    multiline
                                    rows={15}
                                    value={form.texte || ''}
                                    onChange={handleChange('texte')}
                                    helperText={isFrench ? 'Le texte doit contenir au moins 30 caractères' : 'Text must contain at least 30 characters'}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '12px',
                                            fontFamily: 'monospace',
                                            fontSize: '14px',
                                            '& input': {
                                                color: '#1a202c'
                                            },
                                            '& textarea': {
                                                color: '#1a202c'
                                            }
                                        },
                                        '& .MuiInputLabel-root': {
                                            color: '#718096'
                                        },
                                        '& .MuiFormHelperText-root': {
                                            color: '#718096',
                                            fontSize: '12px'
                                        }
                                    }}
                                />
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Author Information */}
                    <Grid item xs={12}>
                        <Card sx={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                            <CardContent sx={{ p: 3 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <PersonIcon sx={{ fontSize: 24, color: '#667eea', mr: 1.5 }} />
                                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#1a202c' }}>
                                        {isFrench ? 'Informations sur l\'auteur' : 'Author Information'}
                                    </Typography>
                                </Box>
                                <Divider sx={{ mb: 2 }} />
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            fullWidth
                                            label={isFrench ? 'Nom de l\'auteur' : 'Author Name'}
                                            placeholder={isFrench ? 'Ex: Jean Dupont' : 'Ex: John Doe'}
                                            value={form.auteur || ''}
                                            onChange={handleChange('auteur')}
                                            helperText={isFrench ? 'Le nom de l\'auteur doit contenir au moins 5 caractères' : 'Author name must contain at least 5 characters'}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: '12px',
                                                    '& input': {
                                                        color: '#1a202c'
                                                    },
                                                    '& textarea': {
                                                        color: '#1a202c'
                                                    }
                                                },
                                                '& .MuiInputLabel-root': {
                                                    color: '#718096'
                                                },
                                                '& .MuiFormHelperText-root': {
                                                    color: '#718096',
                                                    fontSize: '12px'
                                                }
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            fullWidth
                                            label={isFrench ? 'Titre de l\'auteur' : 'Author Title'}
                                            placeholder={isFrench ? 'Ex: Journaliste, Rédacteur en chef' : 'Ex: Journalist, Editor-in-chief'}
                                            value={form.titreAuteur || ''}
                                            onChange={handleChange('titreAuteur')}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '12px',
                                                '& input': {
                                                    color: '#1a202c'
                                                },
                                                '& textarea': {
                                                    color: '#1a202c'
                                                }
                                            },
                                            '& .MuiInputLabel-root': {
                                                color: '#718096'
                                            }
                                        }}
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            )}

            {/* Save Component */}
            {save && (
                <SaveComponent
                    setSave={setSave}
                    requestURL={requestURL}
                    requestBody={(() => {
                        // Créer une copie du form sans l'objet rubrique
                        // car l'ID de la rubrique est passé dans requestParam
                        const { rubrique, ...articleBody } = form;
                        // Pour PUT, s'assurer que l'ID de l'article est inclus
                        if (requestMethode === 'PUT' && initialForm?.id) {
                            articleBody.id = initialForm.id;
                        }
                        return articleBody;
                    })()}
                    requestMethode={requestMethode ? requestMethode : 'POST'}
                    requestParam={idModule > 0 ? idModule : (form.rubrique?.id || null)}
                    setErrorServeur={setErrorServeur}
                    setError={setError}
                    redirected={true}
                />
            )}
        </>
    );
}
