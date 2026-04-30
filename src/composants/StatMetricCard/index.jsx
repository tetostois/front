import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';

/**
 * Carte métrique alignée sur le tableau de bord admin (fond blanc, icône pastel à gauche).
 */
export default function StatMetricCard({ title, subtitle, value, icon: Icon, iconBg, accent }) {
    return (
        <Card
            elevation={0}
            sx={{
                border: '1px solid #f1f5f9',
                borderRadius: '12px',
                bgcolor: '#ffffff',
                height: '100%',
                fontFamily: 'Inter, system-ui, sans-serif',
                boxShadow: '0 1px 3px 0 rgb(15 23 42 / 0.06), 0 1px 2px -1px rgb(15 23 42 / 0.06)',
                transition: 'box-shadow 0.2s ease, transform 0.2s ease',
                '&:hover': {
                    boxShadow: '0 10px 15px -3px rgb(15 23 42 / 0.08), 0 4px 6px -4px rgb(15 23 42 / 0.06)',
                    transform: 'translateY(-2px)',
                },
            }}
        >
            <CardContent
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    py: 2.5,
                    px: 2,
                    '&:last-child': { pb: 2.5 },
                }}
            >
                <Box
                    sx={{
                        width: 52,
                        height: 52,
                        borderRadius: '10px',
                        bgcolor: iconBg,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                    }}
                >
                    <Icon sx={{ color: accent, fontSize: 26 }} />
                </Box>
                <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography
                        variant="subtitle2"
                        sx={{
                            fontWeight: 600,
                            color: '#0f172a',
                            fontSize: '0.9375rem',
                            lineHeight: 1.3,
                            mb: 0.25,
                        }}
                    >
                        {title}
                    </Typography>
                    <Typography
                        sx={{
                            fontWeight: 700,
                            fontSize: '1.5rem',
                            color: accent,
                            lineHeight: 1.2,
                            letterSpacing: '-0.02em',
                        }}
                    >
                        {value}
                    </Typography>
                    <Typography
                        variant="caption"
                        sx={{ color: '#64748b', display: 'block', mt: 0.35, lineHeight: 1.35 }}
                    >
                        {subtitle}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
}
