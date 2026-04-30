/**
 * Styles MUI réutilisables pour les bandeaux admin (fond blanc, texte foncé).
 */

export const adminBreadcrumbRootSx = {
    mb: 1,
    '& .MuiBreadcrumbs-separator': { color: '#94a3b8' }
};

export const adminBreadcrumbLinkSx = {
    color: '#64748b',
    textDecoration: 'none',
    cursor: 'pointer',
    '&:hover': { color: '#16a34a' }
};

export const adminBreadcrumbCurrentSx = {
    color: '#475569',
    fontWeight: 500
};

export const adminCancelButtonSx = {
    textTransform: 'none',
    borderRadius: '12px',
    borderColor: '#e5e7eb',
    color: '#374151',
    fontWeight: 600,
    fontSize: 15,
    padding: '10px 24px',
    '&:hover': {
        borderColor: '#d1d5db',
        backgroundColor: '#f9fafb'
    }
};

export const adminPrimarySaveButtonSx = {
    background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
    color: '#fff',
    textTransform: 'none',
    borderRadius: '12px',
    fontWeight: 600,
    fontSize: 15,
    padding: '10px 24px',
    boxShadow: '0 4px 12px rgba(22, 163, 74, 0.3)',
    '&:hover': {
        background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
        boxShadow: '0 6px 16px rgba(22, 163, 74, 0.4)'
    },
    '&:disabled': {
        background: 'rgba(22, 163, 74, 0.45)',
        color: '#fff'
    }
};
