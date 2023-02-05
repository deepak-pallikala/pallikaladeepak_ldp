import {useState} from 'react'
import {Stack,TextField,InputAdornment,Typography,Box,Button,Slider} from '@mui/material'
import PaymentIcon from '@mui/icons-material/Payment';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
export const State = () => {
  const [value, setValue] = useState(0);
  const [lastValue, setLastValue] = useState(0);
  const handleChange = (event:any, newValue:any) => {
    if (newValue > lastValue) {
      setValue(value + 5000);
    } else if (newValue < lastValue) {
      setValue(value - 5000);
    }
    setLastValue(newValue);
  };
    const a=3406064.54;
    return (
        <Stack spacing={1}>
            <Stack>
            <TextField label='' InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Typography variant='h6'>${value}</Typography>
                        </InputAdornment>
                    ),
                    style: {
                        height: '70px',
                        width: '700px'
                    },
                    endAdornment: (
                        <InputAdornment position='end'>
               <Typography color="primary" border={2}>Buy max</Typography>
                        </InputAdornment>
                    )
                }} />
                </Stack>
                <Box sx={{ height: 80,
                           textAlign: 'left',
                           paddingLeft: '250px',
                 }}>
      
      <Slider
         sx={{
           '& input[type="range"]': {
             WebkitAppearance: 'slider-vertical'
           },
         }}
        orientation="vertical"
        defaultValue={10}
        valueLabelDisplay="auto"
        onChange={handleChange}
        />
            </Box>
                <Stack>
                <TextField label='' InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Typography variant='h6'>{value/a}</Typography>
                        </InputAdornment>
                    ),
                    style: {
                        height: '70px',
                        width: '700px'
                    },
                    endAdornment: (
                        <InputAdornment position='end'>
                         <Typography>BTC</Typography>
                        </InputAdornment>
                    )
                }} />  
                </Stack>
                <Stack>
                <Box sx={{
                    height:'100px',
                    width:'700px',
                    textAlign:'center',
                    border:'1px solid'

                }}>
                <Typography>You are buying</Typography>
                <Typography variant='h6'>{value/a}</Typography>
                <Typography>1BTC = $3,406,060,069.54</Typography>
                    
                </Box>
                <Box sx={{
                    height:'250px',
                    width:'700px',
                    border:'1px solid',
                    textAlign:'left'
                    }}>
                    <Stack spacing={2}>
                <Typography variant='h6'><PaymentIcon />Payment method<br />Visa credit ...8845</Typography>
                <Typography variant='h6'><LocalShippingIcon />Delivery fees<br/> 0.001 BTC </Typography>
                <Typography variant='h6'><AccountBalanceWalletIcon />Deposit to<br />Bitcoin wallet</Typography>
                    </Stack>
                </Box>
                <Box sx={{
                    height:'180px',
                    width:'700px',
                    border:'1px solid',
                    textAlign:'left'
                    }}>
                    <Stack spacing={2}>
                <Typography variant='h6'>{value/a} BTC ..................................................${value}.00</Typography>
                <Typography variant='h6'>Transaction fee ............................................................$1,000.00</Typography>
                <Typography variant='h5'>Total .............................................................${value+1000}.00</Typography>
                <Button variant='contained' color='info'>BUY NOW</Button>
                    </Stack>
                </Box>
                </Stack>

                </Stack>
    ) 

 }
