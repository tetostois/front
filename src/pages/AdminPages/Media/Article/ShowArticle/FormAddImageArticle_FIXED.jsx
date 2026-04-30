// Version corrigée de FormAddImageArticle.jsx
// Utilise fetch directement avec FormData au lieu de useFetch

import React, { useState, useContext } from 'react';
import { AppContext } from '../../../../../context/AppContext';
import { Box, Button, Alert, CircularProgress } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const FormAddImageArticle = ({ idArticle, onImageAdded }) => {
    const { serveurURL } = useContext(AppContext);
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setError(null);
            setSuccess(false);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile || !idArticle) {
            setError("Veuillez sélectionner un fichier");
            return;
        }

        setUploading(true);
        setError(null);
        setSuccess(false);

        // Créer FormData pour l'upload
        const formData = new FormData();
        formData.append('file', selectedFile);

        // Credentials pour l'authentification Basic
        const username = "admin";
        const password = "passwordadmin237";
        const base64Credentials = btoa(username + ":" + password);

        try {
            const response = await fetch(`${serveurURL}/admin/imagearticle/${idArticle}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Basic ${base64Credentials}`
                    // Ne pas mettre Content-Type, le navigateur le fera automatiquement avec FormData
                },
                body: formData
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Upload failed: ${response.status} ${errorText}`);
            }

            const data = await response.json();
            setSuccess(true);
            setSelectedFile(null);
            
            // Réinitialiser le champ fichier
            const fileInput = document.querySelector('input[type="file"]');
            if (fileInput) {
                fileInput.value = '';
            }

            // Appeler le callback si fourni
            if (onImageAdded) {
                onImageAdded(data);
            }

            // Masquer le message de succès après 3 secondes
            setTimeout(() => {
                setSuccess(false);
            }, 3000);

        } catch (err) {
            console.error("Upload error:", err);
            setError(err.message || "Erreur lors de l'upload de l'image");
        } finally {
            setUploading(false);
        }
    };

    return (
        <Box sx={{ p: 2 }}>
            <Box sx={{ mb: 2 }}>
                <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="upload-image-file"
                    type="file"
                    onChange={handleFileChange}
                />
                <label htmlFor="upload-image-file">
                    <Button
                        variant="outlined"
                        component="span"
                        startIcon={<CloudUploadIcon />}
                        disabled={uploading}
                    >
                        Sélectionner une image
                    </Button>
                </label>
                {selectedFile && (
                    <Box sx={{ mt: 1, ml: 2, display: 'inline-block' }}>
                        <span>{selectedFile.name}</span>
                    </Box>
                )}
            </Box>

            {selectedFile && (
                <Button
                    variant="contained"
                    onClick={handleUpload}
                    disabled={uploading}
                    sx={{ mb: 2 }}
                >
                    {uploading ? (
                        <>
                            <CircularProgress size={20} sx={{ mr: 1 }} />
                            Upload en cours...
                        </>
                    ) : (
                        'Uploader l\'image'
                    )}
                </Button>
            )}

            {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                    {error}
                </Alert>
            )}

            {success && (
                <Alert severity="success" sx={{ mt: 2 }}>
                    Image uploadée avec succès !
                </Alert>
            )}
        </Box>
    );
};

export default FormAddImageArticle;


