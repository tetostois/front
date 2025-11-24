import React from 'react';
import {
    Box,
    Typography,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Backdrop,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Pagination,
    Stack
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { MessageErrorServeur } from '../MessageComponent';
import { useForceInputTextVisibility } from '../../utils/hooks/useForceInputTextVisibility';
import './adminPageTemplate.css';

/**
 * Template réutilisable pour les pages de liste admin
 */
export default function AdminPageTemplate({
    title,
    subtitle,
    icon: Icon,
    addButtonText,
    addButtonPath,
    isLoading,
    error,
    data,
    columns,
    renderRow,
    emptyMessage,
    language = 'FR',
    pageNumber = 0,
    setPageNumber = null,
    showPagination = false,
    customHeaderActions = null,
    customTableHeader = null
}) {
    const navigation = useNavigate();
    const isFrench = language === 'FR';
    
    // Forcer la visibilité du texte dans tous les champs de saisie
    useForceInputTextVisibility();

    // Calculer les informations de pagination
    const totalPages = data?.totalPages || 0;
    const totalElements = data?.totalElements || 0;
    const size = data?.size || 50;
    const currentPage = pageNumber + 1; // pageNumber est 0-based, Pagination est 1-based

    const handlePageChange = (event, value) => {
        if (setPageNumber) {
            setPageNumber(value - 1); // Convertir en 0-based
        }
    };

    return (
        <Box className="adminPageContainer">
            {/* Header Section */}
            <Box className="adminPageHeader">
                <Box className="adminPageHeaderContent">
                    {Icon && (
                        <Box className="adminPageHeaderIconContainer">
                            <Icon className="adminPageHeaderIcon" />
                        </Box>
                    )}
                    <Box>
                        <Typography variant="h4" className="adminPageTitle">
                            {title}
                        </Typography>
                        {subtitle && (
                            <Typography variant="body1" className="adminPageSubtitle">
                                {subtitle}
                            </Typography>
                        )}
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    {customHeaderActions}
                    {addButtonPath && (
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() => navigation(addButtonPath)}
                            className="adminPageAddButton"
                            sx={{
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                color: '#fff',
                                fontWeight: 600,
                                textTransform: 'none',
                                padding: '10px 24px',
                                borderRadius: '12px',
                                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                                    boxShadow: '0 6px 16px rgba(102, 126, 234, 0.4)',
                                    transform: 'translateY(-2px)'
                                },
                                transition: 'all 0.3s ease'
                            }}
                        >
                            {addButtonText || (isFrench ? 'Ajouter' : 'Add')}
                        </Button>
                    )}
                </Box>
            </Box>

            {/* Content Section */}
            <Box className="adminPageContent">
                {isLoading ? (
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
                ) : error ? (
                    <Box className="adminPageError">
                        <MessageErrorServeur />
                    </Box>
                ) : (
                    <>
                        {(() => {
                            // Support both paginated data (data.content) and array data
                            const items = Array.isArray(data) ? data : (data?.content || []);
                            if (items.length > 0) {
                                return (
                                    <Card className="adminPageTableCard">
                                        <CardContent sx={{ p: 0 }}>
                                            <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
                                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                                    <TableHead>
                                                        {customTableHeader || (
                                                            <TableRow className="adminTableHeaderRow">
                                                                {columns.map((column, index) => (
                                                                    <TableCell
                                                                        key={index}
                                                                        className="adminTableHeaderCell"
                                                                        sx={{
                                                                            fontWeight: 600,
                                                                            fontSize: 14,
                                                                            color: '#1a202c',
                                                                            backgroundColor: '#f7fafc',
                                                                            borderBottom: '2px solid #e2e8f0'
                                                                        }}
                                                                    >
                                                                        {column.label}
                                                                    </TableCell>
                                                                ))}
                                                            </TableRow>
                                                        )}
                                                    </TableHead>
                                                    <TableBody>
                                                        {items.map((row, rowIndex) => (
                                                            <TableRow
                                                                key={rowIndex}
                                                                className="adminTableBodyRow"
                                                                sx={{
                                                                    '&:hover': {
                                                                        backgroundColor: '#f7fafc',
                                                                        cursor: 'pointer'
                                                                    },
                                                                    transition: 'background-color 0.2s ease'
                                                                }}
                                                            >
                                                                {renderRow(row, rowIndex)}
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </CardContent>
                                    </Card>
                                );
                            } else {
                                return (
                                    <Card className="adminPageEmptyCard">
                                        <CardContent sx={{ textAlign: 'center', py: 6 }}>
                                            <Typography variant="h6" sx={{ color: '#718096', mb: 1 }}>
                                                {emptyMessage || (isFrench ? 'Aucun élément trouvé' : 'No items found')}
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: '#a0aec0' }}>
                                                {isFrench
                                                    ? 'Commencez par ajouter un nouvel élément'
                                                    : 'Start by adding a new item'}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                );
                            }
                        })()}
                    </>
                )}

                {/* Pagination */}
                {showPagination && totalPages > 1 && (
                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
                        <Stack spacing={2}>
                            <Pagination
                                count={totalPages}
                                page={currentPage}
                                onChange={handlePageChange}
                                color="primary"
                                size="large"
                                showFirstButton
                                showLastButton
                                sx={{
                                    '& .MuiPaginationItem-root': {
                                        fontSize: '14px',
                                        fontWeight: 600,
                                        '&.Mui-selected': {
                                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                            color: '#fff',
                                            '&:hover': {
                                                background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)'
                                            }
                                        },
                                        '&:hover': {
                                            backgroundColor: 'rgba(102, 126, 234, 0.1)'
                                        }
                                    }
                                }}
                            />
                        </Stack>
                        <Typography variant="body2" sx={{ color: '#718096', fontWeight: 500 }}>
                            {isFrench
                                ? `Page ${currentPage} sur ${totalPages} (${totalElements} éléments)`
                                : `Page ${currentPage} of ${totalPages} (${totalElements} items)`}
                        </Typography>
                    </Box>
                )}
            </Box>
        </Box>
    );
}

