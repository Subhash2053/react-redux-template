import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

import {
  fetchClientData,
  addClientData,
  unloadClientData,
} from "../../redux/action/clientAction";
import {
  Breadcrumbs,
  Button,
  Card,
  Icon,
  Link,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { padding } from "@mui/system";

interface DataType {
  newData: {
    id: number;
    name: string;
  };
}
interface RootState {
  client: {
    data: { name: string; id: number }[];
    last_page: number;
  };
}

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 90,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.getValue(params.id, "firstName") || ""} ${
        params.getValue(params.id, "lastName") || ""
      }`,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

export default function Client() {
  const [fdata, setData] = useState<DataType>({
    newData: {
      id: 0,
      name: "",
    },
  });

  const [openInfo, setOpenInfo]: any = useState(false);
  const [activePage, setActivePage] = useState<number>(1);
  const [apiUrl, setApiUrl] = useState<string>("/client");
  const clients = useSelector((state: RootState) => state.client);
  const [total, setTotal] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(true);
    dispatch(
      fetchClientData(apiUrl, () => {
        setLoading(false);
      })
    );

    return () => {
      dispatch(unloadClientData());
    };
    // eslint-disable-next-line
  }, [apiUrl]);

  useEffect(() => {
    if (clients.last_page !== undefined) {
      setTotal(clients.last_page);
    }
    // eslint-disable-next-line
  }, [clients]);

  return (
    <div className="app-card">
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" to="/" component={RouterLink}>
          Home
        </Link>

        <Typography color="text.primary">Client </Typography>
      </Breadcrumbs>
      <Card className="card-body">
        <Button
          color="success"
          variant="outlined"
          to="/client/create"
          component={RouterLink}
        >
          Create Client
        </Button>

        <DataGrid
          style={{ height: 400, margin: "20px 0" }}
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </Card>
    </div>
  );
}
