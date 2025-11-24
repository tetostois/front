// Fonction helper pour uploader une image avec FormData
// Utilisez cette fonction au lieu de useFetch pour les uploads de fichiers

export const uploadImageArticle = async (idArticle, file, serveurURL) => {
    if (!file || !idArticle) {
        console.error("File or article ID is missing");
        return { error: "File or article ID is missing" };
    }

    const formData = new FormData();
    formData.append('file', file);

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
            console.error("Upload error:", response.status, errorText);
            return { error: `Upload failed: ${response.status} ${errorText}` };
        }

        const data = await response.json();
        return { data, success: true };
    } catch (error) {
        console.error("Upload exception:", error);
        return { error: error.message };
    }
};


