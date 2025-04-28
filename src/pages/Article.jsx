import { useState, useEffect } from 'react';
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Typography, CircularProgress } from '@mui/material';
import { getArticles, createArticle, updateArticle, deleteArticle } from '../api/articleApi';
import FormModal from '../Components/FormModal';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import '../styles/article.css';

const ArticleManagement = () => {
  const [articles, setArticles] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', image: null });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getArticles({ limit: 10 });
      setArticles(response.data.data?.docs || []);
    } catch (error) {
      setError('Failed to load articles.');
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = (article = null) => {
    setForm(
      article
        ? { title: article.title, description: article.description, image: null }
        : { title: '', description: '', image: null }
    );
    setEditId(article ? article._id : null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setForm({ title: '', description: '', image: null });
    setEditId(null);
  };

  const handleSubmit = async () => {
    try {
      if (editId) {
        await updateArticle(editId, { title: form.title, description: form.description });
      } else {
        const formData = new FormData();
        formData.append('title', form.title);
        formData.append('description', form.description);
        if (form.image) formData.append('image', form.image);
        await createArticle(formData);
      }
      fetchArticles();
      handleClose();
    } catch (error) {
      setError('Failed to save article.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteArticle(id);
      fetchArticles();
    } catch (error) {
      setError('Failed to delete article.');
    }
  };

  return (
    <div className="article-container">
      <Sidebar />
      <main className="article-main">
        <Header />
        <div className="article-header">
          <Typography variant="h4">Articles</Typography>
          <Button
            variant="contained"
            onClick={() => handleOpen()}
            className="article-button-add"
          >
            + Add New Article
          </Button>
        </div>
        {loading ? (
          <div className="article-loading">
            <CircularProgress />
          </div>
        ) : error ? (
          <Typography className="article-error">{error}</Typography>
        ) : articles.length === 0 ? (
          <Typography>No articles found.</Typography>
        ) : (
          <Table className="article-table">
            <TableHead>
              <TableRow className="article-table-head">
                <TableCell>Image</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Operations</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {articles.map((article) => (
                <TableRow key={article._id}>
                  <TableCell>
                    <img
                      src={article.image || 'placeholder.jpg'}
                      alt={article.title}
                      className="article-table-image"
                    />
                  </TableCell>
                  <TableCell>{article.title}</TableCell>
                  <TableCell>{article.description}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={() => handleOpen(article)}
                      className="article-button-edit"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => handleDelete(article._id)}
                      className="article-button-delete"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        <FormModal
          open={open}
          onClose={handleClose}
          title="Article"
          form={form}
          setForm={setForm}
          onSubmit={handleSubmit}
          isEdit={!!editId}
        />
      </main>
    </div>
  );
};

export default ArticleManagement;