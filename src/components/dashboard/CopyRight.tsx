import React from 'react';
import  Typography  from '@mui/material/Typography';
import Link from '@mui/material/Link';

const Copyright = (props: any) => {
  return (
   <Typography variant='body2' color='text.scondary' align='center' {...props}>
      { 'CopyRight  © ' }
      <Link color='inherit' href='https://github.com/leo10-kz'>
         Leonel Quiroga Repository
      </Link>
   </Typography>
  )
}

export default Copyright;
