
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

export default function DeleteTask({deleteConfirmation,onDeleteClick,onDeleteCancel}) {
  return (
    <div>
        <Dialog
        open={deleteConfirmation}
        onClose={onDeleteCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete Task"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Deleted tasks and associated comments will be deleted and cannot be recovered.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onDeleteClick}>DELETE</Button>
          <Button onClick={onDeleteCancel} autoFocus>
            CANCEL
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
