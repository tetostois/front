import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../../context';
import { useFetch } from '../../../utils/hooks/FetchData';
import AdminPageTemplate from '../../../composants/AdminPageTemplate';
import { TableCell, Button, Chip, Avatar, Box, Typography } from '@mui/material';
import ForumIcon from '@mui/icons-material/Forum';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ReplyIcon from '@mui/icons-material/Reply';

export default function Forum() {
    const navigation = useNavigate();
    const { language } = useContext(AppContext);
    const [pageNumber, setPageNumber] = useState(0);
    const [filter, setFilter] = useState(null);
    const [update, setUpdate] = useState(false);
    // Note: L'endpoint /admin/messages n'existe pas encore, à créer dans le backend
    const { isLoading, data, error } = useFetch(`/admin/messages/${pageNumber}`, 'GET', null, filter, update);
    const isFrench = language === 'FR';

    const columns = [
        { label: 'N°' },
        { label: isFrench ? 'Auteur' : 'Author' },
        { label: isFrench ? 'Type' : 'Type' },
        { label: isFrench ? 'Message' : 'Message' },
        { label: isFrench ? 'Date' : 'Date' },
        { label: isFrench ? 'État' : 'Status' },
        { label: isFrench ? 'Réponses' : 'Replies' },
        { label: isFrench ? 'Actions' : 'Actions' }
    ];

    const renderRow = (message, index) => {
        const handleView = (e) => {
            e.stopPropagation();
            // navigation(`/forum/${message.id}`);
        };

        const getAuthorName = (message) => {
            if (message.etudiant) {
                return `${message.etudiant.nom || ''} ${message.etudiant.prenom || ''}`.trim() || 'Étudiant';
            }
            if (message.professeur) {
                return `${message.professeur.nom || ''} ${message.professeur.prenom || ''}`.trim() || 'Professeur';
            }
            if (message.admin) {
                return `${message.admin.nom || ''} ${message.admin.prenom || ''}`.trim() || 'Administrateur';
            }
            return isFrench ? 'Anonyme' : 'Anonymous';
        };

        const getAuthorType = (message) => {
            if (message.etudiant) return isFrench ? 'Étudiant' : 'Student';
            if (message.professeur) return isFrench ? 'Professeur' : 'Teacher';
            if (message.admin) return isFrench ? 'Admin' : 'Admin';
            return '-';
        };

        const getAuthorInitials = (message) => {
            if (message.etudiant) {
                return message.etudiant.nom ? message.etudiant.nom.charAt(0).toUpperCase() : 'E';
            }
            if (message.professeur) {
                return message.professeur.nom ? message.professeur.nom.charAt(0).toUpperCase() : 'P';
            }
            if (message.admin) {
                return message.admin.nom ? message.admin.nom.charAt(0).toUpperCase() : 'A';
            }
            return '?';
        };

        const getStatusColor = (etat) => {
            switch (etat) {
                case 'ACTIF':
                case 'ACTIVE':
                    return { bg: '#e6fffa', color: '#234e52' };
                case 'RESOLU':
                case 'RESOLVED':
                    return { bg: '#e6f3ff', color: '#2c5282' };
                case 'FERME':
                case 'CLOSED':
                    return { bg: '#fed7d7', color: '#742a2a' };
                default:
                    return { bg: '#edf2f7', color: '#4a5568' };
            }
        };

        const statusColors = getStatusColor(message.etat);
        const authorName = getAuthorName(message);
        const authorType = getAuthorType(message);
        const repliesCount = message.messages ? message.messages.length : 0;
        const messagePreview = message.texte ? (message.texte.length > 100 ? message.texte.substring(0, 100) + '...' : message.texte) : '-';

        return (
            <>
                <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 500, color: '#4a5568' }}>
                        {((data?.size || 50) * pageNumber + index + 1)}
                    </Typography>
                </TableCell>
                <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar
                            sx={{
                                width: 32,
                                height: 32,
                                bgcolor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                fontSize: 12,
                                fontWeight: 600
                            }}
                        >
                            {getAuthorInitials(message)}
                        </Avatar>
                        <Box>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                {authorName}
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#718096', fontSize: 11 }}>
                                {authorType}
                            </Typography>
                        </Box>
                    </Box>
                </TableCell>
                <TableCell>
                    <Chip
                        label={authorType}
                        size="small"
                        sx={{
                            backgroundColor: '#e6f3ff',
                            color: '#2c5282',
                            fontWeight: 500,
                            fontSize: 11
                        }}
                    />
                </TableCell>
                <TableCell>
                    <Typography
                        variant="body2"
                        sx={{
                            color: '#1a202c',
                            maxWidth: '300px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        {messagePreview}
                    </Typography>
                </TableCell>
                <TableCell>
                    <Typography variant="body2" sx={{ color: '#718096' }}>
                        {message.date
                            ? new Date(message.date).toLocaleDateString('fr-FR', {
                                  day: 'numeric',
                                  month: 'short',
                                  year: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                              })
                            : '-'}
                    </Typography>
                </TableCell>
                <TableCell>
                    <Chip
                        label={message.etat || '-'}
                        size="small"
                        sx={{
                            backgroundColor: statusColors.bg,
                            color: statusColors.color,
                            fontWeight: 500
                        }}
                    />
                </TableCell>
                <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <ReplyIcon sx={{ fontSize: 16, color: '#667eea' }} />
                        <Typography variant="body2" sx={{ color: '#667eea', fontWeight: 500 }}>
                            {repliesCount}
                        </Typography>
                    </Box>
                </TableCell>
                <TableCell>
                    <Button
                        variant="outlined"
                        size="small"
                        startIcon={<VisibilityIcon />}
                        onClick={handleView}
                        sx={{
                            textTransform: 'none',
                            borderRadius: '8px',
                            borderColor: '#667eea',
                            color: '#667eea',
                            '&:hover': {
                                borderColor: '#764ba2',
                                backgroundColor: 'rgba(102, 126, 234, 0.1)'
                            }
                        }}
                    >
                        {isFrench ? 'Voir' : 'View'}
                    </Button>
                </TableCell>
            </>
        );
    };

    return (
        <AdminPageTemplate
            title={isFrench ? 'Liste des Messages du Forum' : 'Forum Messages List'}
            subtitle={isFrench ? 'Gérez tous les messages et discussions du forum' : 'Manage all forum messages and discussions'}
            icon={ForumIcon}
            addButtonText={null}
            addButtonPath={null}
            isLoading={isLoading}
            error={error}
            data={data || { content: [] }}
            columns={columns}
            renderRow={renderRow}
            emptyMessage={isFrench ? 'Aucun message trouvé. Le forum sera disponible une fois que des messages seront créés.' : 'No messages found. The forum will be available once messages are created.'}
            language={language}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            showPagination={true}
        />
    );
}

