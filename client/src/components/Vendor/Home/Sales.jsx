// import * as React from 'react';
// import Box from '@mui/material/Box';
// import { DataGrid } from '@mui/x-data-grid';
// import { GridToolbar } from "@mui/x-data-grid";

// const columns = [
//   { field: 'id', headerName: 'ID', width: 90 },
//   {
//     field: 'Order Id',
//     headerName: 'Order Id',
//     width: 150,
//     editable: true,
//   },
//   {
//     field: 'customer',
//     headerName: 'Customer',
//     width: 150,
//     editable: true,
//   },
//   {
//     field: 'date',
//     headerName: 'Date',
//     width: 150,
//     editable: true,
//   },
// //   {
// //     field: 'age',
// //     headerName: 'Age',
// //     type: 'number',
// //     width: 110,
// //     editable: true,
// //   },
//   {
//     field: 'fullName',
//     headerName: 'Revenue',
//     description: 'This column has a value getter and is not sortable.',
//     sortable: false,
//     width: 160,
  
//   },
// ];

// const rows = [
//   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];

// export default function Sales() {
//   return (
//     <Box sx={{ height: 400, width: '100%',marginTop:4,marginBottom:6 }}>
//       <DataGrid
//         rows={rows}
//         columns={columns}
//         components={{Toolbar: GridToolbar}}
//         initialState={{
//           pagination: {
//             paginationModel: {
//               pageSize: 5,
//             },
//           },
//         }}
//         pageSizeOptions={[5]}
//         checkboxSelection
//         disableRowSelectionOnClick
//         //  slots={{ toolbar: GridToolbar }}
//       />
//     </Box>
//   );
// }
