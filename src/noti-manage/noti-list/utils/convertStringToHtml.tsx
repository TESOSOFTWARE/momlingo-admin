import { Box } from '@mui/material';

export const convertStringToHtml = (htmlString: string | undefined) => {
  if (htmlString !== undefined)
    return (
      <Box
        sx={{
          img: {
            maxWidth: '100%',
          },
          ul: {
            pl: '32px',
          },
          '& .ql-align-center': {
            textAlign: 'center',
          },
        }}
        dangerouslySetInnerHTML={{ __html: htmlString }}
      ></Box>
    );
  else return '';
};
