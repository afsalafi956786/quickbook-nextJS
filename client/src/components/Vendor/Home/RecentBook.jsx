import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function RecentBook() {
  return (
    <div className=' xs:px-3'>
        <h3 className='mt-12 pb-6 px-8 font-bold text-lg'>Recent Bookings</h3>
  
    <TableContainer component={Paper}
    style={{boxShadow:'0px 13px 20px 0px #80808029',padding:'0px 8px',backgroundColor:'#e1f5fe'}}
    >
      <Table sx={{ minWidth: 650 ,backgroundColor:'#e1f5fe',padding:'10px'}} aria-label="simple table ">
        <TableHead >
          <TableRow >
            <TableCell sx={{fontWeight:'bold',border:'none'}}>Dessert (100g serving)</TableCell>
            <TableCell sx={{fontWeight:'bold',border:'none'}} align="left">Calories</TableCell>
            <TableCell sx={{fontWeight:'bold',border:'none'}} align="left">Fat&nbsp;(g)</TableCell>
            <TableCell sx={{fontWeight:'bold',border:'none'}} align="left">Carbs&nbsp;(g)</TableCell>
            <TableCell sx={{fontWeight:'bold',border:'none'}} align="left">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody >
          {rows.map((row) => (
            <TableRow 
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" sx={{border:'none'}}>
                {row.name}
              </TableCell>
              <TableCell sx={{border:'none'}} align="left">{row.calories}</TableCell>
              <TableCell sx={{border:'none'}} align="left">{row.fat}</TableCell>
              <TableCell sx={{border:'none'}} align="left">{row.carbs}</TableCell>
              <TableCell sx={{border:'none'}} align="left">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
