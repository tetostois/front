import React, { useState, useContext } from 'react';
import {
    Box,
    Card,
    CardContent,
    Grid,
    Divider,
    Typography
} from '@mui/material';
import { FormTextInput } from '../../../../composants/UiInputs';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import CategoryIcon from '@mui/icons-material/Category';
import DescriptionIcon from '@mui/icons-material/Description';
import SortIcon from '@mui/icons-material/Sort';
import SaveComponent from '../../../../composants/SaveComponent';
import { AppContext } from '../../../../context';

export const FormRubrique = ({ initialForm, setErrorServeur, setError, setSave, save, requestMethode, language }) => {
    const { language: contextLanguage } = useContext(AppContext);
    const isFrench = language || contextLanguage === 'FR';
    const requestURL = '/admin/media/rubrique/';
    const [form, setForm] = useState(initialForm ? initialForm : {});

    const handleChange = (field) => (event) => {
        setForm({ ...form, [field]: event.target.value });
    };

    return (
        <>
            {save && (
                <SaveComponent
                    setSave={setSave}
                    requestURL={requestURL}
                    requestBody={form}
                    requestMethode={requestMethode ? requestMethode : 'POST'}
                    requestParam={null}
                    setErrorServeur={setErrorServeur}
                    setError={setError}
                    redirected={true}
                />
            )}
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Card sx={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                        <CardContent sx={{ p: 3 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <FolderOpenIcon sx={{ fontSize: 24, color: '#16a34a', mr: 1.5 }} />
                                <Typography variant="h6" sx={{ fontWeight: 600, color: '#1a202c' }}>
                                    {isFrench ? 'Informations de Base' : 'Basic Information'}
                                </Typography>
                            </Box>
                            <Divider sx={{ mb: 2 }} />
                            <FormTextInput
                                fullWidth
                                label={isFrench ? 'Nom de la Rubrique' : 'Rubrique Name'}
                                placeholder={isFrench ? 'Ex: Afrique' : 'Ex: Africa'}
                                value={form.nom || ''}
                                onChange={handleChange('nom')}
                            />
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12}>
                    <Card sx={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                        <CardContent sx={{ p: 3 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <CategoryIcon sx={{ fontSize: 24, color: '#16a34a', mr: 1.5 }} />
                                <Typography variant="h6" sx={{ fontWeight: 600, color: '#1a202c' }}>
                                    {isFrench ? 'Catégorie et Ordre' : 'Category and Order'}
                                </Typography>
                            </Box>
                            <Divider sx={{ mb: 2 }} />
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <FormTextInput
                                        fullWidth
                                        label={isFrench ? 'Catégorie' : 'Category'}
                                        placeholder={isFrench ? 'Ex: Actualités' : 'Ex: News'}
                                        value={form.categorie || ''}
                                        onChange={handleChange('categorie')}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FormTextInput
                                        fullWidth
                                        type="number"
                                        label={isFrench ? 'Niveau d\'ordre' : 'Order Level'}
                                        placeholder={isFrench ? 'Ex: 1' : 'Ex: 1'}
                                        value={form.ordre || ''}
                                        onChange={handleChange('ordre')}
                                        startAdornment={<SortIcon sx={{ fontSize: 22, color: '#16a34a' }} />}
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12}>
                    <Card sx={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                        <CardContent sx={{ p: 3 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <DescriptionIcon sx={{ fontSize: 24, color: '#16a34a', mr: 1.5 }} />
                                <Typography variant="h6" sx={{ fontWeight: 600, color: '#1a202c' }}>
                                    {isFrench ? 'Description' : 'Description'}
                                </Typography>
                            </Box>
                            <Divider sx={{ mb: 2 }} />
                            <FormTextInput
                                fullWidth
                                label={isFrench ? 'Description' : 'Description'}
                                placeholder={isFrench ? 'Cette rubrique est pour...' : 'This rubrique is for...'}
                                multiline
                                rows={6}
                                value={form.description || ''}
                                onChange={handleChange('description')}
                            />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
};
