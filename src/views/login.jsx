import { Fragment, useRef, useState } from "react"
import { useNavigate, Routes, Route } from 'react-router-dom'
import { Paper, Card, CardContent, TextField, Stack, Grid, Typography, Button, Box } from '@mui/material';
import axios from 'axios'
import TableData from "./table";


const Login = () => {
    //========================================//

    const URL = 'https://techhub.docsolutions.com/OnBoardingPre/WebApi/api/authentication/authentication'
    
    const navigate = useNavigate();

    const user = useRef('')
    const password = useRef('')
    const token = useRef('')
    //========================================//
    const handleLogin = async () => {
        const sendData = JSON.stringify({
            "Body": {
                "Username": user.current,
                "Password": password.current
            }
        })

        const res = await fetch(URL, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: sendData
        })

        const result = await res.json()
        console.log('Result', result)
        if (result.Body) {
            token.current = result.Body.Token
            sessionStorage.setItem('token', token.current)
            navigate('/table')
        } else {
            alert(result.Messages)
        }

    }
    //========================================//
    return (<>
        <Stack display={'flex'} flexDirection={'row'} justifyContent={'center'} alignItems={'center'} sx={{ height: '100vh', backgroundColor: 'gray' }}>
            <Card sx={{ minWidth: 275, width: '500px' }}>
                {/* <Paper elevation={5}> */}
                <CardContent>

                    <Grid display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
                        <Stack display={'flex'} flexDirection={'row'} justifyContent={'center'} alignItems={'center'} sx={{ p: 1, width: '100%' }}>
                            <Typography fontFamily={'monospace'} sx={{ p: 1 }}>
                                User:
                            </Typography>
                            <TextField id="user" type="text" onChange={(e) => { user.current = e.target.value }} />
                        </Stack>
                        <Stack display={'flex'} flexDirection={'row'} justifyContent={'center'} alignItems={'center'} sx={{ p: 1, width: '100%' }}>
                            <Typography fontFamily={'monospace'} sx={{ p: 1 }}>
                                Password:
                            </Typography>
                            <TextField id="pass" type="password" onChange={(e) => { password.current = (e.target.value); }} />
                        </Stack>

                        <Button variant="outlined" onClick={() => { handleLogin() }}>Login</Button>
                    </Grid>
                </CardContent>
                {/* </Paper> */}
            </Card>
        </Stack>

    </>
    )
}

export default Login;