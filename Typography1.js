import React from 'react';
import {Stack,TextField,InputAdornment,Typography} from '@mui/material'
//importing necessary components in mui
import {Icon} from './Icon'
export const Typography1 = (props:any) => {
    return (
        <Stack border={1} marginRight={90} marginLeft={5} marginTop={5}>
        <Stack spacing={2}>
        <Typography variant='h6' textAlign= 'left' paddingLeft='25px'>{props.begin}</Typography>
         <TextField label='' InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                             <Icon /> 
                                <Typography variant='h4'>{props.start}</Typography>
                            </InputAdornment>
                        ),
                        style: {
                            height: '70px',
                            width: '500px'
                        },
                        endAdornment: (
                            <InputAdornment position='end'>
                                {props.end}
                            </InputAdornment>
                        )
                    }} />
                </Stack>
                </Stack>
        )
    }
    
