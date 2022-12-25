import React,{useState} from 'react';
import '../App.css';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const RedditTextField = styled((props) => (
  <TextField InputProps={{ disableUnderline: true }} {...props} />
))(({ theme }) => ({
  '& .MuiFilledInput-root': {
    border: '1px solid rgba(255,193,25, .50)',
    overflow: 'hidden',
    color: "#fff",
    borderRadius: 4,
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    '&.Mui-focused': {
      backgroundColor: 'transparent',
      boxShadow: `rgb(255,193,25) 0 0 0 1.5px`,
      borderColor: "rgb(255,193,25)",
    },
  },
}));


const Signup = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [open, setOpen] = useState(false);
  const [alertVar, setAlertVar] = useState('');
  let obj = {
    "username": username,
    "password": password,
    "email": email
  };
  
  const handleClose = () => {
    setOpen(false);
  };
  
  function handleClick(){
    if(obj.username!=="" && obj.password!=="" && obj.email!==""){
      axios.post('http://127.0.0.1:8000/user-create/',obj,{
        headers: {
            'Content-Type': 'application/json',
        }})
      .then(res=>{
        // if(res.data==="User Added"){
        //   props.history.push("/");
        // }
        console.log(res)
      });
    }else if(obj.username==="" || obj.password==="" || obj.email===""){
      setAlertVar("Please Fill All Details");
      setOpen(true);
    }
  }
  return (
    <div style={{height:"100%"}}>
      <div className="signup-container">  
        <div className="input-field">
          <PersonIcon className="icon" />
          <RedditTextField
            label="Username"
            InputLabelProps={{className:"label-color"}}
            onChange={(e)=>setUsername(e.target.value)}
            required
            id="reddit-input"
            variant="filled"
            value={username}
          />
        </div>
        <div className="input-field">
          <LockIcon className="icon" />
          <RedditTextField
            label="Password"
            InputLabelProps={{className:"label-color"}}
            type="password"
            onChange={(e)=>setPassword(e.target.value)}
            required
            id="reddit-input"
            variant="filled"
            value={password}
          />
        </div>
        <div className="input-field">
          <EmailIcon className="icon" />
          <RedditTextField
            label="Email"
            InputLabelProps={{className:"label-color"}}
            onChange={(e)=>setEmail(e.target.value)}
            required
            id="reddit-input"
            variant="filled"
            value={email}
          />
        </div>
        <Button onClick={()=>{handleClick()}} style={{backgroundColor:"#ffc119"}} variant="contained" size="large">
          Create User
        </Button>
        <h4>Already A User? <span className="register" onClick={()=>props.history.push("/")}>Login Here</span></h4>  
      </div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Attention!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {alertVar}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Signup
