import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function GroupBox({ chats, setCreated }) {
  const [open, setOpen] = useState(false);
  const [participantsOpen, setParticipantsOpen] = useState(false);
  const [selectedParticipants, setSelectedParticipants] = useState([]);
  const [groupId, setGroupId] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedParticipants([]);
    setGroupId(null);
    setCreated((prev) => !prev);
  };

  const handleParticipantsOpen = () => {
    setParticipantsOpen(true);
  };

  const handleParticipantsClose = () => {
    setParticipantsOpen(false);
  };

  const handleParticipantChange = (event) => {
    const { name, checked } = event.target;
    setSelectedParticipants((prevSelected) =>
      checked ? [...prevSelected, name] : prevSelected.filter((p) => p !== name)
    );
  };

  const handleParticipantRemove = async (participantToRemove) => {
    setSelectedParticipants((prevSelected) =>
      prevSelected.filter((participant) => participant !== participantToRemove)
    );
    if (groupId) {
      try {
        const response = await fetch(
          'https://chatconnect.up.railway.app/chatconnect/api/group/remove',
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              groupId,
              participants: [participantToRemove],
            }),
          }
        );
        const data = await response.json();
        console.log('Participant removed:', data);
      } catch (error) {
        console.error('Error removing participant:', error);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const groupName = formJson.groupName;
    const groupDescription = formJson.groupDescription;
    const groupData = {
      groupName,
      groupDescription,
      participants: [
        localStorage.getItem('chatconnectID'),
        ...selectedParticipants,
      ],
    };
    try {
      const response = await fetch(
        'https://chatconnect.up.railway.app/chatconnect/api/group',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(groupData),
        }
      );
      const data = await response.json();
      console.log('Group created:', data);
      setGroupId(data._id);
    } catch (error) {
      console.error('Error creating group:', error);
    }

    handleClose();
  };

  return (
    <>
      <Button
        variant='contained'
        onClick={handleClickOpen}
      >
        New Group
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Create New Group</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin='dense'
            id='groupName'
            name='groupName'
            label='Group Name'
            type='text'
            fullWidth
            variant='standard'
          />
          <TextField
            margin='dense'
            id='groupDescription'
            name='groupDescription'
            label='Group Description'
            type='text'
            fullWidth
            variant='standard'
          />
          <Button
            onClick={handleParticipantsOpen}
            variant='outlined'
            style={{ marginTop: '10px' }}
          >
            Add Participants
          </Button>
          <Stack
            direction='row'
            spacing={1}
            style={{ marginTop: '10px' }}
          >
            {chats.map((chat, index) => {
              if (selectedParticipants.includes(chat.participants[0]._id)) {
                return (
                  !chat.groupName && (
                    <Chip
                      key={index}
                      label={chat.participants[0].firstName}
                      onDelete={() =>
                        handleParticipantRemove(chat.participants[0]._id)
                      }
                    />
                  )
                );
              }
            })}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type='submit'>Create Group</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={participantsOpen}
        onClose={handleParticipantsClose}
      >
        <DialogTitle>Select Participants</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Select the participants you want to add to the group.
          </DialogContentText>
          <FormGroup>
            {chats.map(
              (chat, index) =>
                !chat.groupName && (
                  <FormControlLabel
                    key={index}
                    control={
                      <Checkbox
                        name={chat.participants[0]._id}
                        checked={selectedParticipants.includes(
                          chat.participants[0]._id
                        )}
                        onChange={handleParticipantChange}
                      />
                    }
                    label={chat.participants[0].firstName}
                  />
                )
            )}
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleParticipantsClose}>Done</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
