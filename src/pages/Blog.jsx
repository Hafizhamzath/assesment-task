import { useState, useEffect } from 'react';
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Typography, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { getBlogs, createBlog, deleteBlog } from '../api/blogApi';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import '../styles/blog.css';

const BlogManagement = () => {
  const [blogs, setBlogs] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', image: null });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await getBlogs({ limit: 10 });
      setBlogs(response.data.data.docs || []);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const handleOpen = (blog = null) => {
    setForm(
      blog
        ? { title: blog.title, description: blog.description, image: null }
        : { title: '', description: '', image: null }
    );
    setEditId(blog ? blog._id : null);
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

      await createBlog(formData);
      fetchBlogs();
      handleClose();
    } catch (error) {
      console.error('Error saving blog:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteBlog(id);
      fetchBlogs();
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  return (
    <div className="blog-container">
      <Sidebar />
      <main className="blog-main">
        <Header />
        <div className="blog-header">
          <Typography variant="h4">Blogs</Typography>
          <Button
            variant="contained"
            onClick={() => handleOpen()}
            className="blog-button-add"
          >
            + Add New Blog
          </Button>
        </div>
        <Table className="blog-table">
          <TableHead>
            <TableRow className="blog-table-head">
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Operations</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blogs.map((blog) => (
              <TableRow key={blog._id}>
                <TableCell>{blog.title}</TableCell>
                <TableCell>{blog.description}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    onClick={() => handleOpen(blog)}
                    className="blog-button-edit"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => handleDelete(blog._id)}
                    className="blog-button-delete"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Dialog open={open} onClose={handleClose} classes={{ paper: 'blog-dialog' }}>
          <DialogTitle className="blog-dialog-title">
            {editId ? 'Edit Blog' : 'Create Blog'}
          </DialogTitle>
          <DialogContent className="blog-dialog-content">
            <TextField
              label="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              fullWidth
              margin="dense"
            />
            <TextField
              label="Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              fullWidth
              margin="dense"
              multiline
              rows={4}
            />
            <input
              type="file"
              onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
              className="blog-file-input"
            />
          </DialogContent>
          <DialogActions className="blog-dialog-actions">
            <Button onClick={handleClose} className="blog-button-cancel">Cancel</Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              className="blog-button-save"
            >
              {editId ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </Dialog>
      </main>
    </div>
  );
};

export default BlogManagement;