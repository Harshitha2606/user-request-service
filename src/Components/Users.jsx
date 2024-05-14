import React, { useEffect, useState } from 'react'
import { Box, Button, Table, TableBody, TableCell, TableHead, TableRow  } from '@mui/material'
import axios from 'axios';

const defaultObj = [{
    id: 1,
    name: 'Harshi',
    email: 'hk@gmail.com',
    phone: '6232712345',
    salary: '100000',
    age: 25
}]

function Users() {
    const [users, setUsers] = useState([]);

    const API_URL =  "https://p5zr2nmatg.execute-api.us-east-2.amazonaws.com/Dev";

    const removeEntry = (id) => {
        const updatedUsers = users.filter(user => user.id!==id);
        setUsers(updatedUsers);
    }

    useEffect(() => {
        const getData = async () => {
            const response = await axios.get(API_URL);
            const obj = (JSON.parse(response.data.body).Item);
            setUsers([obj]);
        }
        getData();
    },[])
  return (
    <Box>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Salary</TableCell>
                    <TableCell>Age</TableCell>
                    <TableCell>Remove Entry</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    users.map(user =>(
                        <TableRow key={user.id}>
                            <TableCell>{user.id}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.phone}</TableCell>
                            <TableCell>${user.salary}</TableCell>
                            <TableCell>{user.age}</TableCell>
                            <TableCell><Button variant="contained" color="error" onClick={()=> removeEntry(user.id)}>Remove Entry</Button></TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    </Box>
  )
}

export default Users
