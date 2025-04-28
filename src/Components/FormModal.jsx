import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import '../styles/form.css';

const FormModal = ({ open, onClose, title, form, setForm, onSubmit, isEdit }) => {
  return (
    <Dialog open={open} onClose={onClose} classes={{ paper: 'form-modal' }}>
      <DialogTitle className="form-modal-title">
        {isEdit ? `Edit ${title}` : `Create ${title}`}
      </DialogTitle>
      <DialogContent className="form-modal-content">
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
          className="form-modal-file"
        />
      </DialogContent>
      <DialogActions className="form-modal-actions">
        <Button onClick={onClose} className="form-modal-cancel">Cancel</Button>
        <Button
          onClick={onSubmit}
          variant="contained"
          className="form-modal-submit"
        >
          {isEdit ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormModal;