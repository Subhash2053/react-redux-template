import {
  Breadcrumbs,
  Button,
  Card,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  Link,
  MenuItem,
  Radio,
  RadioGroup,
  Select,

  TextField,
  Typography,
} from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";

import {
  fetchClientData,
  addClientData,
  unloadClientData,
} from "../../redux/action/clientAction";
import { DatePicker } from "@mui/lab";

interface Props {
  type: string;
  data?: any;
  slug?: string;
  schema?: any;
  location?: any;
}
interface DataType {
  newData: {
    id: number;
    name: string;
    gender: string;
    phone: number | null;
    email: string;
    nationality: string;
    address: string;
    education: string;
    dob: Date | null;
    mode_of_contact: string;
  };
}
interface ErrorType {
  name: string;
  gender: string;
  phone: string;
  email: string;
  nationality: string;
  address: string;
  education: string;
  dob: string;
  mode_of_contact: string;
}
interface RootState {
  client: {
    data: { name: string; id: number }[];
    last_page: number;
  };
}
export default function ClientForm(props: Props) {
  const [fdata, setData] = useState<DataType>({
    newData: {
      id: 0,
      name: "",
      gender: "",
      phone: null,
      email: "",
      nationality: "",
      address: "",
      education: "",
      dob: null,
      mode_of_contact: "",
    },
  });
  const [formErrors, setFormErrors] = useState<ErrorType>();

  const [apiUrl, setApiUrl] = useState<string>("/client");
  const clients = useSelector((state: RootState) => state.client);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchClientData(apiUrl));

    return () => {
      dispatch(unloadClientData());
    };
    // eslint-disable-next-line
  }, [apiUrl]);

  const clearForm = () => {
    setData({
      newData: {
        id: 0,
        name: "",
        gender: "",
        phone: null,
        email: "",
        nationality: "",
        address: "",
        education: "",
        dob: null,
        mode_of_contact: "",
      },
    });
  };

  const handleChange = (event: any) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let currentFormErrors: any = {};
    setData({
      newData: Object.assign({}, fdata.newData, {
        [name]: value,
      }),
    });

    switch (name) {
      case "name":
        if (minMaxLength(value, 3)) {
          currentFormErrors[name] = `Name should have minimum 3 characters`;
        } else {
          delete currentFormErrors[name];
        }

        break;
      case "phone":
        if (minMaxLength(value, 9)) {
          currentFormErrors[name] = `phone should have minimum 9 characters`;
        } else {
          delete currentFormErrors[name];
        }

        break;
      case "email":
        if (!value || validEmail(value)) {
          currentFormErrors[name] = `Email address is invalid`;
        } else {
          delete currentFormErrors[name];
        }

        break;
    }
    setFormErrors(currentFormErrors);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(
      addClientData(
        fdata.newData,
        () => {
          clearForm();
        },
        () => {
          //error
        }
      )
    );
  };

  function minMaxLength(text: string, minLength: number, maxLength?: number) {
    let result = !text || text.length < minLength;
    if (maxLength) result = result || text.length < minLength;
    return result;
  }

  function validEmail(text: string) {
    const regex = RegExp(
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    );

    return !regex.test(text);
  }

  return (
    <div className="app-card">
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" to="/" component={RouterLink}>
          Home
        </Link>
        <Link
          underline="hover"
          color="inherit"
          to="/client"
          component={RouterLink}
        >
          Client
        </Link>
        <Typography color="text.primary">Client {props.type}</Typography>
      </Breadcrumbs>
      <Card className="card-body">
        <ul>
          {Object.entries(formErrors || {}).map(([prop, value]: any) => {
            return (
              <li className="error-message" key={prop}>
                {value}
              </li>
            );
          })}
        </ul>
        <form onSubmit={handleSubmit}>
          <div>
            <TextField
              className={formErrors && formErrors.name ? "error" : ""}
              fullWidth
              type="text"
              required
              margin="normal"
              variant="outlined"
              label="Name"
              name="name"
              onChange={handleChange}
              value={fdata.newData.name}
            />
          </div>

          <div>
            <FormControl>
              <FormLabel id="gender">Gender</FormLabel>
              <RadioGroup
                className={formErrors && formErrors.gender ? "error" : ""}
                aria-labelledby="Gender"
                onChange={handleChange}
                value={fdata.newData.gender}
                name="gender"
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div>
            <TextField
              className={formErrors && formErrors.phone ? "error" : ""}
              fullWidth
              type="text"
              required
              margin="normal"
              variant="outlined"
              label="Phone"
              name="phone"
              placeholder="+977 98XXXXXXXX"
              onChange={handleChange}
              value={fdata.newData.phone}
            />
          </div>

          <div>
            <TextField
              fullWidth
              className={formErrors && formErrors.email ? "error" : ""}
              type="email"
              required
              margin="normal"
              variant="outlined"
              label="email"
              name="email"
              onChange={handleChange}
              value={fdata.newData.email}
            />
          </div>

          <div>
            <TextField
              className={formErrors && formErrors.address ? "error" : ""}
              fullWidth
              type="text"
              required
              margin="normal"
              variant="outlined"
              label="Address"
              name="address"
              onChange={handleChange}
              value={fdata.newData.address}
            />
          </div>
          <div>
            <TextField
              className={formErrors && formErrors.nationality ? "error" : ""}
              fullWidth
              type="text"
              required
              margin="normal"
              variant="outlined"
              label="Nationality"
              name="nationality"
              onChange={handleChange}
              value={fdata.newData.nationality}
            />
          </div>
          <div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                className={formErrors && formErrors.dob ? "error" : ""}
                openTo="year"
                disableFuture
                label="Responsive"
                value={fdata.newData.dob}
                onChange={handleChange}
                renderInput={(params) => <TextField fullWidth {...params} />}
              />
            </LocalizationProvider>
          </div>

          <div>
            <TextField
              className={formErrors && formErrors.education ? "error" : ""}
              fullWidth
              type="text"
              required
              margin="normal"
              variant="outlined"
              label="Education background"
              name="education"
              onChange={handleChange}
              value={fdata.newData.education}
            />
          </div>

          <div>
            <FormControl fullWidth>
              <InputLabel>Preferred mode of contact </InputLabel>
              <Select
                className={
                  formErrors && formErrors.mode_of_contact ? "error" : ""
                }
                labelId="mode_of_contact"
                name="mode_of_contact"
                label="Preferred mode of contact"
                onChange={handleChange}
                value={fdata.newData.mode_of_contact}
                required
              >
                <MenuItem value="email">Email</MenuItem>
                <MenuItem value="phone">Phone</MenuItem>
                <MenuItem value="none">None</MenuItem>
              </Select>
            </FormControl>
          </div>

          <br />

          <div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={Object.entries(formErrors || {}).length > 0}
            >
              <b>Save</b>
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
