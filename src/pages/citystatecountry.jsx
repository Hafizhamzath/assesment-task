import React, { useEffect, useState } from 'react';
import { Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { createLocation, getAllLocations, getCountries, getStates, updateLocation, deleteLocation } from '../api/citystateCoutntry';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import '../styles/city.css';

const CityStateCountry = () => {
  const [locations, setLocations] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ selectCity: '', type: '', country: '', state: '' });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLocations = async () => {
    try {
      const data = await getAllLocations();
      setLocations(data.data || []);
      const countryData = await getCountries();
      setCountries(countryData.data || []);
      setLoading(false);
    } catch (err) {
      setError(`Failed to load locations: ${err.message}`);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const handleOpen = (location = null) => {
    if (location) {
      setFormData({
        selectCity: location.selectCity || '',
        type: location.type || '',
        country: location.country?._id || (typeof location.country === 'string' ? location.country : ''),
        state: location.state?._id || (typeof location.state === 'string' ? location.state : ''),
      });
      setEditId(location._id);
      if (location.type === 'city' && location.country) {
        fetchStates(location.country._id || location.country);
      }
    } else {
      setFormData({ selectCity: '', type: '', country: '', state: '' });
      setStates([]);
      setEditId(null);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({ selectCity: '', type: '', country: '', state: '' });
    setEditId(null);
    setStates([]);
  };

  const fetchStates = async (countryId) => {
    try {
      const stateData = await getStates(countryId);
      setStates(stateData.data || []);
    } catch (err) {
      setError(`Failed to load states: ${err.message}`);
    }
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'country' && value) {
      await fetchStates(value);
    }
    if (name === 'type' && value !== 'city') {
      setFormData((prev) => ({ ...prev, state: '' }));
      setStates([]);
    }
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        selectCity: formData.selectCity,
        type: formData.type,
        ...(formData.type !== 'country' && formData.country && { country: formData.country }),
        ...(formData.type === 'city' && formData.state && { state: formData.state }),
      };
      if (editId) {
        await updateLocation(editId, payload);
      } else {
        await createLocation(payload);
      }
      await fetchLocations();
      handleClose();
    } catch (err) {
      setError(`Failed to save location: ${err.message}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteLocation(id);
      await fetchLocations();
    } catch (err) {
      setError(`Failed to delete location: ${err.message}`);
    }
  };

  const columns = [
    { field: 'selectCity', headerName: 'Name', width: 200 },
    { field: 'type', headerName: 'Type', width: 150 },
    {
      field: 'country',
      headerName: 'Country',
      width: 200,
      valueGetter: (params) => {
        const country = params.row?.country;
        if (country && typeof country === 'object' && country.selectCity) {
          return country.selectCity;
        } else if (typeof country === 'string') {
          const foundCountry = countries.find((c) => c._id === country);
          return foundCountry?.selectCity || '';
        }
        return '';
      },
    },
    {
      field: 'state',
      headerName: 'State',
      width: 200,
      valueGetter: (params) => {
        const state = params.row?.state;
        if (state && typeof state === 'object' && state.selectCity) {
          return state.selectCity;
        } else if (typeof state === 'string') {
          const foundState = states.find((s) => s._id === state);
          return foundState?.selectCity || '';
        }
        return '';
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <>
          <Button
            variant="outlined"
            onClick={() => handleOpen(params.row)}
            className="csc-button-edit"
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            onClick={() => handleDelete(params.row._id)}
            className="csc-button-delete"
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className="csc-container">
      <Sidebar />
      <main className="csc-main">
        <Header />
        <div className="csc-header">
          <Typography variant="h4">Country, State, City Management</Typography>
          <Button
            variant="contained"
            onClick={() => handleOpen()}
            className="csc-button-add"
          >
            Add Location
          </Button>
        </div>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : error ? (
          <Typography className="csc-error">Error: {error}</Typography>
        ) : (
          <div className="csc-datagrid">
            <DataGrid
              rows={locations}
              columns={columns}
              getRowId={(row) => row._id}
              pageSizeOptions={[5, 10, 20]}
              disableSelectionOnClick
              classes={{ root: 'csc-datagrid-root' }}
            />
          </div>
        )}

        <Dialog open={open} onClose={handleClose} classes={{ paper: 'csc-dialog' }}>
          <DialogTitle className="csc-dialog-title">
            {editId ? 'Edit Location' : 'Add Location'}
          </DialogTitle>
          <DialogContent className="csc-dialog-content">
            <TextField
              label="Name"
              name="selectCity"
              value={formData.selectCity}
              onChange={handleChange}
              fullWidth
              margin="dense"
              required
            />
            <TextField
              select
              label="Type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              fullWidth
              margin="dense"
              required
            >
              <MenuItem value="country">Country</MenuItem>
              <MenuItem value="state">State</MenuItem>
              <MenuItem value="city">City</MenuItem>
            </TextField>
            {formData.type !== 'country' && (
              <TextField
                select
                label="Country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                fullWidth
                margin="dense"
                required
              >
                {countries.map((country) => (
                  <MenuItem key={country._id} value={country._id}>
                    {country.selectCity}
                  </MenuItem>
                ))}
              </TextField>
            )}
            {formData.type === 'city' && (
              <TextField
                select
                label="State"
                name="state"
                value={formData.state}
                onChange={handleChange}
                fullWidth
                margin="dense"
                required
                disabled={states.length === 0}
              >
                {states.map((state) => (
                  <MenuItem key={state._id} value={state._id}>
                    {state.selectCity}
                  </MenuItem>
                ))}
              </TextField>
            )}
          </DialogContent>
          <DialogActions className="csc-dialog-actions">
            <Button onClick={handleClose} className="csc-button-cancel">Cancel</Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              disabled={!formData.selectCity || !formData.type}
              className="csc-button-save"
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </main>
    </div>
  );
};

export default CityStateCountry;