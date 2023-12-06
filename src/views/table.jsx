import { useEffect, useRef, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import { Grid, CardContent, Card, TextField, Stack, Box, Typography, Button } from '@mui/material/';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const TableData = () => {

    const URL_GETDATA = 'https://techhub.docsolutions.com/OnBoardingPre/WebApi/api/user/GetUsers'
    const URL_NEWUSER = 'https://techhub.docsolutions.com/OnBoardingPre/WebApi/api/user/RegisterUserRole'

    const [data, setData] = useState([])
    const [open, setOpen] = useState(false);

    const searchText = useRef('jorge')

    const name = useRef('')
    const fathersLast = useRef('')
    const mothersLast = useRef('')
    const email = useRef('')
    const phone = useRef('')
    const user = useRef('')
    const password = useRef('')
    const secondPassword = useRef('')


    //=====================================//

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleNewUser = async () => {
        if (password.current === secondPassword.current) {
            const token = sessionStorage.getItem('token')
            const sendData = JSON.stringify({
                "Body": {
                    "Tenant": null,
                    "UserName": user.current,
                    "Password": password.current,
                    "Name": name.current,
                    "FatherLastName": fathersLast.current,
                    "MotherLastName": mothersLast.current,
                    "Email": email.current,
                    "PhoneNumber": phone.current,
                    "Metadata": null,
                    "Roles": [
                        {
                            "Id": 2,
                            "Name": "Usuario Tradicional"
                        }
                    ]
                }
            })

            const res = await fetch(URL_NEWUSER, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                method: 'POST',
                body: sendData,
            })

            const result = await res.json()
            console.log('REsult added: ', result)
            result.Body ? handleClose() : alert('Register Error')
        } else {
            alert('Verify the password')
        }

    }

    const getData = async () => {
        if (searchText.current !== '') {
            const token = sessionStorage.getItem('token')
            const sendData = JSON.stringify({
                "Body": {
                    "SearchText": searchText.current
                }
            })

            const res = await fetch(URL_GETDATA, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                method: 'POST',
                body: sendData,
            })

            const result = await res.json()
            setData(result.Body)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));


    return (<>

        {/* Dialog New User */}

        <Dialog open={open} onClose={handleClose} sx={{ width: '100%' }}>
            <DialogTitle>Subscribe</DialogTitle>
            <DialogContent sx={{ width: '80%' }}>
                <DialogContentText>
                    <Stack width={'100%'} display={'flex'} flexDirection={'row'} justifyContent={'flex-start'} alignItems={'center'} sx={{ p: 2 }}>
                        <Typography sx={{ pr: 1, width: '200px' }}>Name:</Typography><TextField type='text' id='name' sx={{ width: '500px' }} onChange={(e) => { name.current = e.target.value }}></TextField>
                    </Stack>
                    <Stack width={'100%'} display={'flex'} flexDirection={'row'} justifyContent={'flex-start'} alignItems={'center'} sx={{ p: 2 }}>
                        <Typography sx={{ pr: 1, width: '200px' }}>Fathers last name:</Typography><TextField type='text' id='name' sx={{ width: '500px' }} onChange={(e) => { fathersLast.current = e.target.value }}></TextField>
                    </Stack>
                    <Stack width={'100%'} display={'flex'} flexDirection={'row'} justifyContent={'flex-start'} alignItems={'center'} sx={{ p: 2 }}>
                        <Typography sx={{ pr: 1, width: '200px' }}>Mothers last name:</Typography><TextField type='text' id='name' sx={{ width: '500px' }} onChange={(e) => { mothersLast.current = e.target.value }}></TextField>
                    </Stack>
                    <Stack width={'100%'} display={'flex'} flexDirection={'row'} justifyContent={'flex-start'} alignItems={'center'} sx={{ p: 2 }}>
                        <Typography sx={{ pr: 1, width: '200px' }}>Email:</Typography><TextField type='text' id='name' sx={{ width: '500px' }} onChange={(e) => { email.current = e.target.value }}></TextField>
                    </Stack>
                    <Stack width={'100%'} display={'flex'} flexDirection={'row'} justifyContent={'flex-start'} alignItems={'center'} sx={{ p: 2 }}>
                        <Typography sx={{ pr: 1, width: '200px' }}>Telefono:</Typography><TextField type='text' id='name' sx={{ width: '500px' }} onChange={(e) => { phone.current = e.target.value }}></TextField>
                    </Stack>
                    <Stack width={'100%'} display={'flex'} flexDirection={'row'} justifyContent={'flex-start'} alignItems={'center'} sx={{ p: 2 }}>
                        <Typography sx={{ pr: 1, width: '200px' }}>Usuario:</Typography><TextField type='text' id='name' sx={{ width: '500px' }} onChange={(e) => { user.current = e.target.value }}></TextField>
                    </Stack>
                    <Stack width={'100%'} display={'flex'} flexDirection={'row'} justifyContent={'flex-start'} alignItems={'center'} sx={{ p: 2 }}>
                        <Typography sx={{ pr: 1, width: '200px' }}>Password:</Typography><TextField type='password' id='name' sx={{ width: '500px' }} onChange={(e) => { password.current = e.target.value }}></TextField>
                    </Stack>
                    <Stack width={'100%'} display={'flex'} flexDirection={'row'} justifyContent={'flex-start'} alignItems={'center'} sx={{ p: 2 }}>
                        <Typography sx={{ pr: 1, width: '200px' }}>Repeat Password:</Typography><TextField type='password' id='name' sx={{ width: '500px' }} onChange={(e) => { secondPassword.current = e.target.value }}></TextField>
                    </Stack>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleNewUser}>Send</Button>
            </DialogActions>
        </Dialog>

        {/* BODY */}

        <Stack display={'flex'} flexDirection={'row'} justifyContent={'center'} alignItems={'center'} sx={{ height: '100vh', backgroundColor: 'gray' }}>
            <Stack sx={{ width: '90%', backgroundColor: 'white', borderRadius: '20px' }}>
                <Stack width={'100%'} display={'flex'} flexDirection={'row'} justifyContent={'flex-start'} alignItems={'center'} sx={{ p: 2 }}>
                    <Stack width={'100%'} display={'flex'} flexDirection={'row'} justifyContent={'flex-start'} alignItems={'center'} sx={{ p: 2 }}>
                        <Typography sx={{ pr: 1 }}>Filter: </Typography>
                        <TextField id="filter" type="text" onChange={(e) => { searchText.current = e.target.value }} />
                        <Button onClick={() => { getData() }}>Search</Button>
                    </Stack>
                    <Stack width={'100%'} display={'flex'} flexDirection={'row'} justifyContent={'flex-end'} alignItems={'center'} sx={{ p: 2 }}>
                        <Button onClick={() => { handleClickOpen() }}>
                            New
                        </Button>
                    </Stack>
                </Stack>

                <Card sx={{ minWidth: 275, width: '100%', height: '70vh', borderRadius: '20px', overflow: 'hidden' }}>
                    <CardContent>
                        <TableContainer sx={{ maxHeight: 650 }}>
                            <Table sx={{ minWidth: 700, width: '100%' }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Username</StyledTableCell>
                                        <StyledTableCell >Name</StyledTableCell>
                                        <StyledTableCell >Father Last Name</StyledTableCell>
                                        <StyledTableCell >Creation Date</StyledTableCell>
                                        <StyledTableCell >Email</StyledTableCell>
                                        <StyledTableCell >Phone Number</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.map((row) => {
                                        return (
                                            <TableRow
                                                key={row.name}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell >{row.Username}</TableCell>
                                                <TableCell >{row.Name}</TableCell>
                                                <TableCell >{row.FatherLastName}</TableCell>
                                                <TableCell >{row.CreationDate}</TableCell>
                                                <TableCell >{row.Email}</TableCell>
                                                <TableCell >{row.PhoneNumber}</TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardContent>
                </Card>
            </Stack>

        </Stack>

    </>
    );
}



export default TableData;