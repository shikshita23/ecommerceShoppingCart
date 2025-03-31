import React, { useState, useEffect, useCallback } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { getBrewerSearchFn } from '../api/ApiHandler';
import { Box, Button, InputAdornment, styled, TablePagination, TableSortLabel, TextField } from '@mui/material';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faArrowLeft, faArrowRight, faSearch } from '@fortawesome/free-solid-svg-icons';
import debounce from 'lodash/debounce';
const CompanyList = () => {
  const [brewerList, setBrewerList] = useState([]);
  const [searchText, setSearchText] = useState(null);
  const [page, setPage] = useState(1);

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

  const fetchData = async () => {
    try {
      const queryParams = {
        by_name: searchText?.length > 0 ? searchText : null,
        per_page: 10,
        page: page
      }
      const data = await getBrewerSearchFn(queryParams);
      setBrewerList(data.items);
    }
    catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchData();
  }, [searchText, page])


  const handleInputChange = useCallback(
    debounce((value) => {
      setPage(1)
      setSearchText(value);
      console.log('Debounced value:', value);
    }, 300),
    []
  );
  return (
    <div className=' pt-8 pb-10'>
      <div className='flex justify-between '>

        <div className='ps-10 pb-7 font-bold text-2xl'>Company List</div>
        <div className='h-10 me-8'>
          <TextField
            label="Enter text"
            variant="outlined"
            onChange={(e) => handleInputChange(e.target.value)}
            size='small'
            slotProps={{
              input: {
                endAdornment: <InputAdornment position="end"><FontAwesomeIcon icon={faSearch}></FontAwesomeIcon></InputAdornment>,
              },
            }}
          />
        </div>
      </div>
      <TableContainer className='px-7' >
        <Table sx={{ minWidth: 650 }} >
          <TableHead >
            <TableRow >
              <StyledTableCell >
                Name
              </StyledTableCell>
              <StyledTableCell align="right">Brewery Type</StyledTableCell>
              <StyledTableCell align="right">Address</StyledTableCell>
              <StyledTableCell align="right">Phone number</StyledTableCell>
              <StyledTableCell align="right">Website link</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {brewerList?.length > 0 ?
              <>
                {brewerList.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.brewery_type}</TableCell>
                    <TableCell align="right">{row.address_1}</TableCell>
                    <TableCell align="right">{row.phone}</TableCell>
                    <TableCell align="right">
                      {row.website_url ? (
                        <a href={row.website_url}>{row.website_url}</a>
                      ) : 'N/A'}
                    </TableCell>
                  </TableRow>
                ))}
              </> :
              <>No records found</>
            }
          </TableBody>
        </Table>
      </TableContainer>
      <div className='flex justify-end mt-5  me-10 '>
        <Button variant='contained' disabled={page === 1} onClick={() => { setPage(page - 1) }}><FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon></Button>
        <div className='mx-5'>
          {page}
        </div>
        <Button variant='contained' onClick={() => { setPage(page + 1) }}><FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon></Button>
      </div>
    </div>
  )
}

export default CompanyList
