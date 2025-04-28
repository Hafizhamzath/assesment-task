import { useState, useEffect } from 'react';
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { getCareers, createCareer, deleteCareer } from '../api/careerApi';
import FormModal from '../Components/FormModal';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import '../styles/career.css';

const CareerManagement = () => {
  const [careers, setCareers] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', image: null });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchCareers();
  }, []);

  const fetchCareers = async () => {
    try {
      const response = await getCareers();
      setCareers(response.data.data || []);
    } catch (error) {
      console.error('Error fetching careers:', error);
    }
  };

  const handleOpen = (career = null) => {
    setForm(
      career
        ? { title: career.title, description: career.description, image: null }
        : { title: '', description: '', image: null }
    );
    setEditId(career ? career._id : null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setForm({ title: '', description: '', image: null });
    setEditId(null);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('description', form.description);
      if (form.image) formData.append('image', form.image);

      await createCareer(formData);
      fetchCareers();
      handleClose();
    } catch (error) {
      console.error('Error saving career:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCareer(id);
      fetchCareers();
    } catch (error) {
      console.error('Error deleting career:', error);
    }
  };

  return (
    <div className="career-container">
      <Sidebar />
      <main className="career-main">
        <Header />
        <div className="career-header">
          <Typography variant="h4">Careers</Typography>
          <Button
            variant="contained"
            onClick={() => handleOpen()}
            className="career-button-add"
          >
            + Add New Career
          </Button>
        </div>
        <Table className="career-table">
          <TableHead>
            <TableRow className="career-table-head">
              <TableCell>Image</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Operations</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {careers.map((career) => (
              <TableRow key={career._id}>
                <TableCell>
                  <img
                    src={career.image || 'placeholder.jpg'}
                    alt={career.title}
                    className="career-table-image"
                  />
                </TableCell>
                <TableCell>{career.title}</TableCell>
                <TableCell>{career.description}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    onClick={() => handleOpen(career)}
                    className="career-button-edit"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => handleDelete(career._id)}
                    className="career-button-delete"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <FormModal
          open={open}
          onClose={handleClose}
          title="Career"
          form={form}
          setForm={setForm}
          onSubmit={handleSubmit}
          isEdit={!!editId}
        />
      </main>
    </div>
  );
};

export default CareerManagement;