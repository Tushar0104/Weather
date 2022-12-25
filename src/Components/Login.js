import React,{useState} from 'react';
import '../App.css';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import Button from '@mui/material/Button';
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
    border: '1px solid rgba(255,193,25,0.25)',
    color: "#fff",
    overflow: 'hidden',
    borderRadius: 4,
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    '&.Mui-focused': {
      backgroundColor: 'transparent',
      boxShadow: `rgba(255,193,25,0.25) 0 0 0 2px`,
      borderColor: `rgb(255,193,25)`
    },
  },
}));

const Login = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [open, setOpen] = useState(false);
    const [alertVar, setAlertVar] = useState('');
    
    const obj = {
      "username": username,
      "password": password
    }

    const handleClose = () => {
      setOpen(false);
    };
    
    function handleClick(){
      // if(obj.username!=="" && obj.password!=="" && obj.email!==""){
      //   axios.post("https://anime-website-project.herokuapp.com/home/login", obj)
      //   .then(res=>{
      //     if(res.data==="Login Successfully"){
      //       props.history.push(`/home/${username}`);
      //     }else if(res.data === "Username And Password Do Not Match"){
      //       setAlertVar(res.data);
      //       setOpen(true);
      //     }
      //   });
      // }else
      if(obj.username==="" || obj.password==="" || obj.email===""){
        setAlertVar("Please Fill All Details");
        setOpen(true);
      }
    }
    return (
      <div style={{height:"100%"}}>
        <div className="login-container">
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
              type="password"
              InputLabelProps={{className:"label-color"}}
              onChange={(e)=>setPassword(e.target.value)}
              required
              id="reddit-input"
              variant="filled"
              value={password}
          />
            </div>
            <Button style={{backgroundColor:"#ffc119"}} onClick={()=>{handleClick()}} variant="contained" size="large">
              Login
            </Button>
            <h4>Not Yet A User? <span className="register" onClick={()=>props.history.push("/signup")}>Register Here</span></h4>
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

export default Login
