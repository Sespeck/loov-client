import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from '@mui/material';
import { Close } from '@mui/icons-material';

import { useRef, useState } from 'react';
import { updateProfile } from '../services/UserService';

const ProfileUpdateModal = ({ show, handleClose, profile, setProfile }) => {
  const fnameRef = useRef();
  const lnameRef = useRef();
  const [avatarFile, setAvatarFile] = useState(profile.avatarFile);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = _handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  };
  const _handleReaderLoaded = (e) => {
    let binaryString = e.target.result;
    setAvatarFile(btoa(binaryString));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fname = fnameRef.current.value;
    const lname = lnameRef.current.value;
    updateProfile({ fname, lname, avatarFile: avatarFile }).then(() =>
      setProfile({ fname, lname, avatarFile: avatarFile, email: profile.email })
    );
    // handleUpdate();
    handleClose();
  };
  return (
    <Dialog open={show} onClose={handleClose}>
      <DialogTitle>
        Update Profile
        <IconButton
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: (theme) => theme.palette.grey[500],
          }}
          onClick={handleClose}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <TextField
            autoFocus
            margin="normal"
            variant="standard"
            id="fname"
            label="First Name"
            type="text"
            fullWidth
            inputRef={fnameRef}
            inputProps={{ minLength: 2 }}
            required
            defaultValue={profile.fname}
          />
          <TextField
            autoFocus
            margin="normal"
            variant="standard"
            id="lname"
            label="Last Name"
            type="text"
            fullWidth
            inputRef={lnameRef}
            inputProps={{ minLength: 2 }}
            required
            defaultValue={profile.lname}
          />
          <div className="h-2"></div>
          <label htmlFor="profilePhoto">
            <input
              accept="image/*"
              id="profilePhoto"
              type="file"
              style={{ display: 'none' }}
              onChange={handleChange}
            />
            <Avatar
              src={`data:image;base64,${avatarFile}`}
              sx={{ width: 75, height: 75, cursor: 'pointer' }}
            />
          </label>
        </DialogContent>
        <DialogActions sx={{ px: '19px' }}>
          <Button type="submit" variant="contained">
            Update
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ProfileUpdateModal;
