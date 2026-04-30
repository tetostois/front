import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../context";
import { useFetch } from "../../../utils/hooks/FetchData";
import AdminPageTemplate from "../../../composants/AdminPageTemplate";
import { TableCell, Button, Chip, Avatar, Box, Typography, Checkbox, Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TableRow, Paper } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CancelIcon from "@mui/icons-material/Cancel";
import "./tableauCSS.css";

/** L'API renvoie `dateNaissance`, pas `age`. Calcul local pour l'affichage liste. */
function ageFromDateNaissance(dateNaissance) {
    if (!dateNaissance) return null;
    const birth = new Date(dateNaissance);
    if (Number.isNaN(birth.getTime())) return null;
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age >= 0 ? age : null;
}

export default function Etudiant() {
   const navigation = useNavigate();
    const { language, serveurURL } = useContext(AppContext);
   const [pageNumber, setPageNumber] = useState(0);
   const [filter, setFilter] = useState(null);
   const [update, setUpdate] = useState(false);
    const [selectedMatricules, setSelectedMatricules] = useState([]);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
   const { isLoading, data, error } = useFetch(`/admin/etudiants/${pageNumber}`, "GET", null, filter, update);
    const isFrench = language === "FR";

    const columns = [
        { label: "" },
        { label: "N°" },
        { label: isFrench ? "Matricule" : "ID" },
        { label: isFrench ? "Nom" : "Name" },
        { label: isFrench ? "Prénom" : "First Name" },
        { label: "Email" },
        { label: isFrench ? "Profil" : "Profile" },
        { label: isFrench ? "Date d'inscription" : "Registration Date" },
        { label: isFrench ? "Profession" : "Profession" },
        { label: isFrench ? "Région" : "Region" },
        { label: isFrench ? "Âge" : "Age" },
        { label: isFrench ? "Actions" : "Actions" }
    ];

    const handleSelectAll = (event) => {
        if (event.target.checked) {
            const allMatricules = data?.content?.map(e => e.matricule) || [];
            setSelectedMatricules(allMatricules);
            console.log("Selected all:", allMatricules);
        } else {
            setSelectedMatricules([]);
            console.log("Deselected all");
        }
    };

    const handleSelectOne = (matricule) => {
        setSelectedMatricules(prev => {
            const newSelection = prev.includes(matricule) 
                ? prev.filter(m => m !== matricule)
                : [...prev, matricule];
            console.log("Selected matricules:", newSelection);
            return newSelection;
        });
    };

    const handleDelete = async () => {
        if (selectedMatricules.length === 0) return;
        
        setDeleting(true);
        try {
            const username = "admin";
            const password = "passwordadmin237";
            const base64Credentials = btoa(username + ":" + password);
            
            const response = await fetch(`${serveurURL}/admin/etudiants`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Basic ${base64Credentials}`
                },
                body: JSON.stringify(selectedMatricules)
            });

            if (response.ok) {
                setSnackbar({
                    open: true,
                    message: isFrench 
                        ? `${selectedMatricules.length} étudiant(s) supprimé(s) avec succès`
                        : `${selectedMatricules.length} student(s) deleted successfully`,
                    severity: "success"
                });
                setSelectedMatricules([]);
                setDeleteDialogOpen(false);
                setUpdate(!update);
            } else {
                setSnackbar({
                    open: true,
                    message: isFrench ? "Erreur lors de la suppression" : "Error deleting students",
                    severity: "error"
                });
            }
        } catch (error) {
            console.error("Error:", error);
            setSnackbar({
                open: true,
                message: isFrench ? "Erreur lors de la suppression" : "Error deleting students",
                severity: "error"
            });
        } finally {
            setDeleting(false);
        }
    };

    const renderRow = (etudiant, index) => {
        const handleView = (e) => {
            e.stopPropagation();
            navigation(`/etudiant/${etudiant.matricule}`);
        };

        const isSelected = selectedMatricules.includes(etudiant.matricule);

   return (
            <>
                <TableCell padding="checkbox" sx={{ width: 48 }}>
                    <Checkbox
                        checked={isSelected}
                        onChange={() => handleSelectOne(etudiant.matricule)}
                        onClick={(e) => e.stopPropagation()}
                        sx={{
                            color: "#16a34a",
                            "&.Mui-checked": {
                                color: "#16a34a"
                            }
                        }}
                    />
                </TableCell>
                <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 500, color: "#4a5568" }}>
                        {(data?.size || 50) * pageNumber + index + 1}
                    </Typography>
                </TableCell>
                <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: "#1a202c" }}>
                        {etudiant.matricule}
                    </Typography>
                </TableCell>
                <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Avatar
                            sx={{
                                width: 32,
                                height: 32,
                                bgcolor: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                                fontSize: 12,
                                fontWeight: 600
                            }}
                        >
                            {etudiant.nom ? etudiant.nom.charAt(0).toUpperCase() : "E"}
                        </Avatar>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {etudiant.nom || "-"}
                        </Typography>
                    </Box>
                </TableCell>
                <TableCell>
                    <Typography variant="body2">{etudiant.prenom || "-"}</Typography>
                </TableCell>
                <TableCell>
                    <Typography variant="body2" sx={{ color: "#16a34a" }}>
                        {etudiant.email || "-"}
                    </Typography>
                </TableCell>
                <TableCell>
                    <Chip
                        label={etudiant.gammeEtudiant?.nom || "-"}
                        size="small"
                        sx={{
                            backgroundColor: "#e6fffa",
                            color: "#234e52",
                            fontWeight: 500
                        }}
                    />
                </TableCell>
                <TableCell>
                    <Typography variant="body2" sx={{ color: "#718096" }}>
                        {etudiant.dateInscription
                            ? new Date(etudiant.dateInscription).toLocaleDateString("fr-FR", {
                                       day: "numeric",
                                  month: "short",
                                  year: "numeric"
                              })
                            : "-"}
                    </Typography>
                </TableCell>
                <TableCell>
                    <Typography variant="body2">{etudiant.profession || "-"}</Typography>
                </TableCell>
                <TableCell>
                    <Typography variant="body2">{etudiant.region?.nom || "-"}</Typography>
                </TableCell>
                <TableCell>
                    <Typography variant="body2">
                        {ageFromDateNaissance(etudiant.dateNaissance) ?? (etudiant.age != null ? etudiant.age : "-")}
                    </Typography>
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
                            borderColor: "#16a34a",
                            color: "#16a34a",
                            "&:hover": {
                                borderColor: "#15803d",
                                backgroundColor: "rgba(22, 163, 74, 0.1)"
                            }
                        }}
                    >
                        {isFrench ? "Voir" : "View"}
                    </Button>
                </TableCell>
            </>
        );
    };

    const isAllSelected = data?.content?.length > 0 && selectedMatricules.length === data.content.length;
    const isIndeterminate = selectedMatricules.length > 0 && selectedMatricules.length < (data?.content?.length || 0);

    return (
        <>
            <AdminPageTemplate
                title={isFrench ? "Liste des Étudiants" : "Students List"}
                subtitle={isFrench ? "Gérez tous les étudiants inscrits sur la plateforme" : "Manage all registered students on the platform"}
                icon={PeopleIcon}
                addButtonText={null}
                addButtonPath={null}
                isLoading={isLoading}
                error={error}
                data={data}
                columns={columns}
                renderRow={renderRow}
                emptyMessage={isFrench ? "Aucun étudiant trouvé" : "No students found"}
                language={language}
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
                showPagination={true}
                customHeaderActions={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {selectedMatricules.length > 0 && (
                            <Button
                                variant="contained"
                                color="error"
                                startIcon={<DeleteIcon />}
                                onClick={() => setDeleteDialogOpen(true)}
                                sx={{
                                    textTransform: "none",
                                    borderRadius: "8px",
                                    background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                                    boxShadow: "0 4px 12px rgba(239, 68, 68, 0.3)",
                                    "&:hover": {
                                        background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)",
                                        boxShadow: "0 6px 16px rgba(239, 68, 68, 0.4)"
                                    }
                                }}
                            >
                                {isFrench 
                                    ? `Supprimer (${selectedMatricules.length})`
                                    : `Delete (${selectedMatricules.length})`}
                                       </Button>
                        )}
                    </Box>
                }
                customTableHeader={
                    <TableRow>
                        <TableCell padding="checkbox" sx={{ width: 48 }}>
                            <Checkbox
                                indeterminate={isIndeterminate}
                                checked={isAllSelected}
                                onChange={handleSelectAll}
                                sx={{
                                    color: "#16a34a",
                                    "&.Mui-checked": {
                                        color: "#16a34a"
                                    },
                                    "&.MuiCheckbox-indeterminate": {
                                        color: "#16a34a"
                                    }
                                }}
                            />
                        </TableCell>
                        {columns.slice(1).map((col, idx) => (
                            <TableCell key={idx} sx={{ fontWeight: 600, fontSize: 14, color: '#1a202c', backgroundColor: '#f7fafc', borderBottom: '2px solid #e2e8f0' }}>
                                {col.label}
                            </TableCell>
                        ))}
                    </TableRow>
                }
            />

            <Dialog
                open={deleteDialogOpen}
                onClose={() => !deleting && setDeleteDialogOpen(false)}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: "16px",
                        boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
                        overflow: "hidden"
                    }
                }}
            >
                <Box
                    sx={{
                        background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                        padding: "24px",
                        display: "flex",
                        alignItems: "center",
                        gap: 2
                    }}
                >
                    <Box
                        sx={{
                            width: 56,
                            height: 56,
                            borderRadius: "50%",
                            backgroundColor: "rgba(255, 255, 255, 0.2)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backdropFilter: "blur(10px)"
                        }}
                    >
                        <WarningAmberIcon sx={{ fontSize: 32, color: "#fff" }} />
                    </Box>
                    <Box>
                        <Typography
                            variant="h5"
                            sx={{
                                color: "#fff",
                                fontWeight: 700,
                                margin: 0
                            }}
                        >
                            {isFrench ? "Confirmer la suppression" : "Confirm deletion"}
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                color: "rgba(255, 255, 255, 0.9)",
                                marginTop: 0.5
                            }}
                        >
                            {isFrench ? "Action irréversible" : "Irreversible action"}
                        </Typography>
                    </Box>
                </Box>

                <DialogContent sx={{ padding: "32px 24px 24px 24px" }}>
                    <Box sx={{ marginBottom: 2 }}>
                        <Typography
                            variant="body1"
                            sx={{
                                color: "#1a202c",
                                fontSize: "16px",
                                lineHeight: 1.6,
                                fontWeight: 500
                            }}
                        >
                            {isFrench
                                ? `Vous êtes sur le point de supprimer ${selectedMatricules.length} étudiant(s) de la plateforme.`
                                : `You are about to delete ${selectedMatricules.length} student(s) from the platform.`}
                        </Typography>
                    </Box>
                    <Paper
                        elevation={0}
                        sx={{
                            backgroundColor: "#fef2f2",
                            border: "1px solid #fecaca",
                            borderRadius: "12px",
                            padding: "16px",
                            marginTop: 2
                        }}
                    >
                        <Box sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}>
                            <WarningAmberIcon
                                sx={{
                                    color: "#dc2626",
                                    fontSize: 20,
                                    marginTop: 0.5
                                }}
                            />
                            <Typography
                                variant="body2"
                                sx={{
                                    color: "#991b1b",
                                    fontSize: "14px",
                                    lineHeight: 1.6
                                }}
                            >
                                {isFrench
                                    ? "Cette action est définitive et ne peut pas être annulée. Toutes les données associées à ces étudiants seront également supprimées."
                                    : "This action is permanent and cannot be undone. All data associated with these students will also be deleted."}
                            </Typography>
                        </Box>
                    </Paper>
                </DialogContent>

                <DialogActions
                    sx={{
                        padding: "16px 24px 24px 24px",
                        gap: 2,
                        justifyContent: "flex-end"
                    }}
                >
                    <Button
                        onClick={() => setDeleteDialogOpen(false)}
                        disabled={deleting}
                        startIcon={<CancelIcon />}
                        variant="outlined"
                        sx={{
                            textTransform: "none",
                            borderRadius: "10px",
                            padding: "10px 24px",
                            borderColor: "#cbd5e0",
                            color: "#4a5568",
                            fontWeight: 600,
                            "&:hover": {
                                borderColor: "#a0aec0",
                                backgroundColor: "#f7fafc"
                            }
                        }}
                    >
                        {isFrench ? "Annuler" : "Cancel"}
                    </Button>
                    <Button
                        onClick={handleDelete}
                        disabled={deleting}
                        startIcon={deleting ? null : <DeleteIcon />}
                        variant="contained"
                        sx={{
                            textTransform: "none",
                            borderRadius: "10px",
                            padding: "10px 24px",
                            background: deleting
                                ? "linear-gradient(135deg, #fca5a5 0%, #f87171 100%)"
                                : "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                            color: "#fff",
                            fontWeight: 600,
                            boxShadow: "0 4px 12px rgba(239, 68, 68, 0.3)",
                            "&:hover": {
                                background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)",
                                boxShadow: "0 6px 16px rgba(239, 68, 68, 0.4)",
                                transform: "translateY(-1px)"
                            },
                            "&:disabled": {
                                background: "linear-gradient(135deg, #fca5a5 0%, #f87171 100%)",
                                color: "#fff"
                            },
                            transition: "all 0.3s ease"
                        }}
                    >
                        {deleting
                            ? isFrench ? "Suppression en cours..." : "Deleting..."
                            : isFrench ? "Supprimer définitivement" : "Delete permanently"}
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
            >
                <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </>
   );
}
