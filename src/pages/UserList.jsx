import React, { useEffect, useState } from 'react'
import { Button, styled, TableContainer, TablePagination } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { useNavigate } from 'react-router-dom';

import { getUserFn } from '../api/ApiHandler';
const UserList = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const fetchData = async () => {
    try {
      const data = await getUserFn();
      setUsers(data);
    }
    catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchData();
  }, [])
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#edf3fc',
      color: theme.palette.common.black,
      fontWeight: 600,

    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  const paginatedUsers = users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleAddUsers = () => {
    navigate('/form')
  }
  return (
    <div className=' pt-10'>
      <div className='flex justify-between px-10 pb-12 '>
        <div className='font-bold text-2xl'>Users List</div>
        <div color='primary'><Button variant="contained" onClick={handleAddUsers}>Add Users</Button></div>
      </div>
      <TableContainer className='px-7' >
        <Table sx={{ minWidth: 650 }} >
          <TableHead >
            <TableRow >
              <StyledTableCell >Name</StyledTableCell>
              <StyledTableCell align="right">Gender</StyledTableCell>
              <StyledTableCell align="right">Address</StyledTableCell>
              <StyledTableCell align="right">Phone number</StyledTableCell>
              <StyledTableCell align="right">Company</StyledTableCell>
              <StyledTableCell align="right">Job Title</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedUsers.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.firstName} {row.middleName} {row.lastName}
                </TableCell>
                <TableCell align="right">{row.gender}</TableCell>
                <TableCell align="right">{row.district}</TableCell>
                <TableCell align="right">{row.phoneNumber}</TableCell>
                <TableCell align="right">
                  {row.companyName}
                </TableCell>
                <TableCell align="right">
                  {row.jobTitle}
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 20, 50]}
        component="div"
        rowsPerPage={rowsPerPage}
        page={page}
        count={users.length}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>

  )
}

export default UserList
