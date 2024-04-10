import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function PDFUpload({loading, handleFileChange, billFile}) {

    const ColorButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText("#061c37"),
        backgroundColor: "#061c37",
        '&:hover': {
          backgroundColor: "#061c37",
        }
      }));

  return (
    <ColorButton
      loading={loading}
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      className='h-fit'
      startIcon={<CloudUploadIcon />}
    >
      Upload file
      <VisuallyHiddenInput 
            type="file"
            accept=".pdf"
            id="unpaidInvoices"
            name="unpaidInvoices"
            onChange={(e)=>{handleFileChange(e)}} 
        />
    </ColorButton>
  );
}