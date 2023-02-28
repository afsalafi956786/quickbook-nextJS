import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { UsersDatas } from "@/config/AdminEndpoint";
import { useEffect, useState } from "react";
import { getuserStatus } from "@/config/AdminEndpoint";
import swal from "sweetalert";



export default function Users() {
  const [users, setUsers] = useState([]);
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    async function invoke() {
      const data = await UsersDatas({
        admintoken: localStorage.getItem("admintoken"),
      });
      console.log(data);
      setUsers(data.users);
    }
    invoke();
  }, [refresh]);


  

  const columns = [
    // { field: "id", headerName: "Id", width: 90 },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 150,
      editable: true,
    },
    {
      field: "phone",
      headerName: "Phone",
      type: "number",
      width: 110,
      editable: true,
    },

    {
      field: "isBanned",
      headerName: "Status",
      width: 160,
      type: "boolean",
      editable: true,
      renderCell:(params)=>(
        <div>
             {params.row.isBanned ? (
                <p className="text-red-700 font-semibold ">Inactive</p>
             ) :(
                <p className="text-green-700 font-semibold">Active</p>
             )
            }
        </div>
       
      ),
    
    
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "action",
      width: 160,
      editable: true,
      renderCell:(params)=>(
          <div>
            {params.row.isBanned ? (
                   <button
                   onClick={async()=>{
                    swal({
                      title: "Are you sure?",
                      background:'black',
                      text: "Do you want to unblck this user",
                      icon: "warning",
                      buttons: true,
                      dangerMode: true,
                    }).then(async (wilDelete)=>{
                      if(wilDelete){
                       const data= await getuserStatus(params.row._id,false )
                       setRefresh(!refresh)
                      }
                    })
                   }}
                    className="text-white bg-green-700 rounded w-[100%] hover:bg-green-500 font-semibold p-2 ">
                     Unblock
                   </button>
            ) : (
                <button onClick={async()=>{
                  swal({
                    title: "Are you sure?",
                    background:'black',
                    text: "Do you want to block this user",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                  }).then(async (wilDelete)=>{
                    if(wilDelete){
                     const data= await getuserStatus(params.row._id,true )
                     setRefresh(!refresh)
                    }
                  })
                  

                }} className="text-white bg-red-700 rounded w-[70px] hover:bg-red-500 font-semibold p-2 ">
                Block
              </button>
            )
            }
          </div>

          
      )
    },
  ];

  return (
    <Box>
      <h2 className="mt-6 ml-16 font-semibold">Users</h2>
      <Box sx={{ height: 400, width: "70%", mt: 6, ml: 8,border:'none' }}>
        <DataGrid
          rows={users}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          getRowId={(users) => users._id}
          disableSelectionOnClick
          checkboxSelection
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
    </Box>
  );
}
