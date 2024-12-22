import React, { useState, ChangeEvent } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

interface FileInputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  id: string;
}

const FileInputField: React.FC<FileInputFieldProps> = ({
  label,
  value,
  onChange,
  id,
}) => {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result as string); // Set the file content as the new image URL
      };
      reader.readAsDataURL(file); // Convert the file to Base64
    }
  };

  return (
    <Box
      sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}
    >
      <TextField
        id={id}
        label={label}
        variant="outlined"
        value={
          value ||
          'https://i.pinimg.com/originals/ae/8a/c2/ae8ac2fa217d23aadcc913989fcc34a2.png'
        }
        onChange={(e) => onChange(e.target.value)}
        fullWidth
        InputProps={{
          endAdornment: (
            <Button
              variant="contained"
              component="label"
              htmlFor={`upload-button-${id}`}
              sx={{ textTransform: 'none' }}
            >
              Chọn ảnh
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                id={`upload-button-${id}`}
              />
            </Button>
          ),
        }}
      />
      {value && <img src={value} width="100%" height="300px" alt="image preview" />}
    </Box>
  );
};

export default FileInputField;
