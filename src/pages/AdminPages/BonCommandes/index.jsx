import React, { useState, useContext } from 'react';
import { AppContext } from '../../../context';
import {
    Box,
    Typography,
    Card,
    CardContent,
    CircularProgress,
    Backdrop,
    Alert
} from '@mui/material';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { MessageErrorServeur } from '../../../composants/MessageComponent';

export default function BonCommandes() {
    const { language } = useContext(AppContext);
    const isFrench = language === 'FR';

    return (
        <Box className="adminPageContainer">
            {/* Header Section */}
            <Box className="adminPageHeader">
                <Box className="adminPageHeaderContent">
                    <Box className="adminPageHeaderIconContainer">
                        <ReceiptIcon className="adminPageHeaderIcon" />
                    </Box>
                    <Box>
                        <Typography variant="h4" className="adminPageTitle">
                            {isFrench ? 'Bons de Commande' : 'Purchase Orders'}
                        </Typography>
                        <Typography variant="body1" className="adminPageSubtitle">
                            {isFrench
                                ? 'Gestion des bons de commande et des commandes'
                                : 'Purchase orders and orders management'}
                        </Typography>
                    </Box>
                </Box>
            </Box>

            {/* Content Section */}
            <Box className="adminPageContent">
                <Card sx={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                    <CardContent sx={{ textAlign: 'center', py: 6 }}>
                        <ReceiptIcon sx={{ fontSize: 64, color: '#cbd5e0', mb: 2 }} />
                        <Typography variant="h6" sx={{ color: '#718096', mb: 1 }}>
                            {isFrench ? 'Fonctionnalité en développement' : 'Feature under development'}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#a0aec0' }}>
                            {isFrench
                                ? 'Cette section sera bientôt disponible pour la gestion des bons de commande.'
                                : 'This section will be available soon for purchase order management.'}
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
}

