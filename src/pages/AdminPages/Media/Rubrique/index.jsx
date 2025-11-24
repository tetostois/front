import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../../context";
import { useFetch } from "../../../../utils/hooks/FetchData";
import AdminPageTemplate from "../../../../composants/AdminPageTemplate";
import { TableCell, Button, Chip, Typography } from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function Rubrique() {
    const navigation = useNavigate();
    const { language } = useContext(AppContext);
    const [pageNumber, setPageNumber] = useState(0);
    const [filter, setFilter] = useState(null);
    const [update, setUpdate] = useState(false);
    const { isLoading, data, error } = useFetch(`/media/rubriques/${pageNumber}`, "GET", null, filter, update);
    const isFrench = language === "FR";

    const columns = [
        { label: "N°" },
        { label: isFrench ? "Nom" : "Name" },
        { label: isFrench ? "Catégorie" : "Category" },
        { label: isFrench ? "Ordre" : "Order" },
        { label: isFrench ? "Statut" : "Status" },
        { label: isFrench ? "Actions" : "Actions" }
    ];

    const renderRow = (rubrique, index) => {
        const handleView = (e) => {
            e.stopPropagation();
            navigation(`/rubrique/${rubrique.id}`);
        };

        const getStatusColor = (statut) => {
            switch (statut) {
                case "ACTIF":
                    return { bg: "#e6fffa", color: "#234e52" };
                case "INACTIF":
                    return { bg: "#fed7d7", color: "#742a2a" };
                default:
                    return { bg: "#edf2f7", color: "#4a5568" };
            }
        };

        const statusColors = getStatusColor(rubrique.statut);

        return (
            <>
                <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 500, color: "#4a5568" }}>
                        {(data?.size || 50) * pageNumber + index + 1}
                    </Typography>
                </TableCell>
                <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: "#1a202c" }}>
                        {rubrique.nom || "-"}
                    </Typography>
                </TableCell>
                <TableCell>
                    <Chip
                        label={rubrique.categorie || "-"}
                        size="small"
                        sx={{
                            backgroundColor: "#e6f3ff",
                            color: "#2c5282",
                            fontWeight: 500
                        }}
                    />
                </TableCell>
                <TableCell>
                    <Typography variant="body2" sx={{ color: "#718096" }}>
                        {rubrique.ordre || "-"}
                    </Typography>
                </TableCell>
                <TableCell>
                    <Chip
                        label={rubrique.statut || "-"}
                        size="small"
                        sx={{
                            backgroundColor: statusColors.bg,
                            color: statusColors.color,
                            fontWeight: 500
                        }}
                    />
                </TableCell>
                <TableCell>
                    <Button
                        variant="outlined"
                        size="small"
                        startIcon={<VisibilityIcon />}
                        onClick={handleView}
                        sx={{
                            textTransform: "none",
                            borderRadius: "8px",
                            borderColor: "#667eea",
                            color: "#667eea",
                            "&:hover": {
                                borderColor: "#764ba2",
                                backgroundColor: "rgba(102, 126, 234, 0.1)"
                            }
                        }}
                    >
                        {isFrench ? "Voir" : "View"}
                    </Button>
                </TableCell>
            </>
        );
    };

    return (
        <AdminPageTemplate
            title={isFrench ? "Liste des Rubriques" : "Categories List"}
            subtitle={isFrench ? "Gérez les rubriques d'articles de la plateforme" : "Manage article categories on the platform"}
            icon={CategoryIcon}
            addButtonText={isFrench ? "Ajouter une Rubrique" : "Add Category"}
            addButtonPath="/rubrique/creer"
            isLoading={isLoading}
            error={error}
            data={data}
            columns={columns}
            renderRow={renderRow}
            emptyMessage={isFrench ? "Aucune rubrique trouvée" : "No categories found"}
            language={language}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            showPagination={true}
        />
    );
}
