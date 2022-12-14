import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getAllUsers } from '../services/UserService';
import Loader from '../components/Loader';
import React, { useMemo } from 'react';
import MaterialReactTable from 'material-react-table';
import { createTheme, ThemeProvider, useTheme } from '@mui/material';
import { Button } from 'react-bootstrap';
import { FiDelete, FiEdit, FiTrash2 } from 'react-icons/fi';
import DeleteUser from '../components/DeleteUser';
import EditUser from '../components/EditUser';

const UserTable = ({ columns, data }) => {
  const globalTheme = useTheme();

  const tableTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: 'dark', //let's use the same dark/light mode as the global theme
          primary: globalTheme.palette.secondary, //swap in the secondary color as the primary for the table
          info: {
            main: 'rgb(255,122,0)', //add in a custom color for the toolbar alert background stuff
          },
          background: {
            default:
              globalTheme.palette.mode === 'light'
                ? '#00000016' //random light yellow color for the background in light mode
                : '#000', //pure black table in dark mode for fun
          },
        },
        typography: {
          button: {
            textTransform: 'none', //customize typography styles for all buttons in table by default
            fontSize: '1.2rem',
          },
        },
        components: {
          MuiTooltip: {
            styleOverrides: {
              tooltip: {
                fontSize: '1.1rem', //override to make tooltip font size larger
              },
            },
          },
          MuiSwitch: {
            styleOverrides: {
              thumb: {
                color: 'pink', //change the color of the switch thumb in the columns show/hide menu to pink
              },
            },
          },
        },
      }),
    [globalTheme]
  );

  return (
    <ThemeProvider theme={tableTheme}>
      <MaterialReactTable
        columns={columns}
        data={data}
        enableColumnResizing
        enableColumnOrdering
        enablePinning
        displayColumnDefOptions={{
          'mrt-row-numbers': {
            enableColumnOrdering: true, //turn on some features that are usually off
            enableResizing: true,
            muiTableHeadCellProps: {
              sx: {
                fontSize: '1.2rem',
              },
            },
          },
          'mrt-row-select': {
            enableColumnActions: true,
            enableHiding: true,
            size: 100,
          },
        }}
      />
    </ThemeProvider>
  );
};

const AdminPortal = () => {
  const [users, setUsers] = useState();
  useEffect(() => {
    let mounted = true;
    getAllUsers().then((res) => {
      if (mounted) {
        setUsers(res.users);
      }
    });
    return () => (mounted = false);
  }, []);
  const loggedInToken = window.localStorage.getItem('token');
  const userType = JSON.parse(window.localStorage.getItem('user')).userType;

  const columns = [
    {
      id: 'actions',
      header: 'Action',
      columnDefType: 'display', //turns off data column features like sorting, filtering, etc.
      enableColumnOrdering: true, //but you can turn back any of those features on if you want like this
      Cell: ({ row }) => {
        return (
          <div className="flex ">
            <EditUser user={row.original} setUsers={setUsers} />
            <DeleteUser user={row.original} setUsers={setUsers} />
          </div>
        );
      },
    },
    {
      accessorKey: '_id',
      header: 'User ID',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      id: 'avatarFile',
      header: 'Avatar',
      columnDefType: 'display', //turns off data column features like sorting, filtering, etc.
      enableColumnOrdering: false, //but you can turn back any of those features on if you want like this
      Cell: ({ row }) => {
        return (
          <img
            className="w-[80px] aspect-square rounded-md object-cover"
            alt="Avatar"
            src={`data:image;base64,${row.original.avatarFile}`}
          />
        );
      },
    },
    {
      accessorKey: 'fname',
      header: 'First Name',
    },
    {
      accessorKey: 'lname',
      header: 'Last Name',
    },
    {
      accessorKey: 'userType',
      header: 'Type',
    },
  ];

  if (!loggedInToken) {
    alert('Not authenticated, redirect to log in.');
    return <Navigate replace to="/login" />;
  } else if (userType !== 'Administrator') {
    alert('Not an administrator, return to the home page.');
    return <Navigate replace to="/" />;
  } else {
    if (!users) return <Loader />;
    else
      return (
        <div>
          <div className=" flex mt-4 mb-4">
            <h2 className="font-bold text-3xl text-white text-left">
              Admin Portal
            </h2>
          </div>
          <UserTable columns={columns} data={Object.values(users)} />
        </div>
      );
  }
};
export default AdminPortal;
