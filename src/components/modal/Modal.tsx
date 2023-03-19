import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles';
/* import Paper, { PaperProps } from '@mui/material/Paper';
import Draggable from 'react-draggable';
 */


const Modal = ({open, close}: any) => {

  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <div>
        <Dialog
        open={open}
        onClose={() => close(!open)}
        aria-labelledby="responsive-dialog-title"
        fullScreen={fullScreen}
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
        Authentication Error
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            User or Password incorrect!!!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => close(!open)}>
            ok
          </Button>
        </DialogActions>
      </Dialog>
        </div>
    )
}


export default Modal