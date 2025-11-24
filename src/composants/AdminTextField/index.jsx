import React from 'react';
import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

/**
 * Composant TextField personnalisé pour le dashboard admin
 * Force toujours la visibilité du texte saisi
 */
const StyledAdminTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& input': {
      color: '#1a202c !important',
      WebkitTextFillColor: '#1a202c !important',
    },
    '& textarea': {
      color: '#1a202c !important',
      WebkitTextFillColor: '#1a202c !important',
    },
    '&.Mui-focused input': {
      color: '#1a202c !important',
      WebkitTextFillColor: '#1a202c !important',
    },
    '&.Mui-focused textarea': {
      color: '#1a202c !important',
      WebkitTextFillColor: '#1a202c !important',
    },
    '&.Mui-error input': {
      color: '#1a202c !important',
      WebkitTextFillColor: '#1a202c !important',
    },
    '&.Mui-error textarea': {
      color: '#1a202c !important',
      WebkitTextFillColor: '#1a202c !important',
    },
  },
  '& .MuiInputBase-input': {
    color: '#1a202c !important',
    WebkitTextFillColor: '#1a202c !important',
  },
  '& .MuiInputBase-inputMultiline': {
    color: '#1a202c !important',
    WebkitTextFillColor: '#1a202c !important',
  },
  '& .MuiOutlinedInput-input': {
    color: '#1a202c !important',
    WebkitTextFillColor: '#1a202c !important',
  },
  '& input': {
    color: '#1a202c !important',
    WebkitTextFillColor: '#1a202c !important',
    caretColor: '#667eea !important',
  },
  '& textarea': {
    color: '#1a202c !important',
    WebkitTextFillColor: '#1a202c !important',
    caretColor: '#667eea !important',
  },
}));

export default function AdminTextField(props) {
  return (
    <StyledAdminTextField
      {...props}
      sx={{
        ...props.sx,
        '& .MuiOutlinedInput-root': {
          ...(props.sx?.['& .MuiOutlinedInput-root'] || {}),
          '& input': {
            color: '#1a202c !important',
            WebkitTextFillColor: '#1a202c !important',
            ...(props.sx?.['& .MuiOutlinedInput-root']?.['& input'] || {}),
          },
          '& textarea': {
            color: '#1a202c !important',
            WebkitTextFillColor: '#1a202c !important',
            ...(props.sx?.['& .MuiOutlinedInput-root']?.['& textarea'] || {}),
          },
        },
        '& input': {
          color: '#1a202c !important',
          WebkitTextFillColor: '#1a202c !important',
          ...(props.sx?.['& input'] || {}),
        },
        '& textarea': {
          color: '#1a202c !important',
          WebkitTextFillColor: '#1a202c !important',
          ...(props.sx?.['& textarea'] || {}),
        },
      }}
    />
  );
}


