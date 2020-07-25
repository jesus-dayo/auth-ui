import React, {useState} from 'react'
import {useHistory} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CardActions from '@material-ui/core/CardActions'
import styles from '../../assets/jss/views/loginStyle'
import {AUTH_TOKEN, EMAIL, PHONE} from '../../common/constant';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import api from '../../api';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(styles)

const Login = () => {
  const classes = useStyles()
  const [option, setOption] = useState(EMAIL);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [phone, setPhone] = useState();
  const [inProgress, setInProgress] = useState(false);
  const history = useHistory();

  const handleRadioChange = (e) => {
    setOption(e.target.value);
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  }

  const getUserInput = () =>{
    switch(option){
      case EMAIL:
        return {email,password};
      case PHONE:
        return {phone,password};
      default:
        return {};
    }
  }

  const handleLogin = async () => {
    setInProgress(true);
    await api.auth.login(getUserInput())
      .then(response => {
        if (response.data && response.data.token) {
          localStorage.setItem(AUTH_TOKEN, JSON.stringify(response.data.token));
          history.push('/secured/home-page');
        }
        setInProgress(false);
      }).catch(err => {
        if (err.response.status === 401) {
          alert(err.response.statusText);
        }
        if (err.response.status === 400) {
          alert(err.response.data.error || err.response.statusText);
        }
        setInProgress(false);
        throw err;
      });
  }

  return (
    <div>
      <Grid container>
        <Grid item md={12} sm={12} xs={12}>
          <Card>
            <CardHeader className={classes.cardHeader}>
              Login
            </CardHeader>
            <CardContent className={classes.formContent}>
              <RadioGroup aria-label="option" name="option" onChange={handleRadioChange} value={option}>
                <FormControlLabel control={<Radio />} label="Sign in by email" value={EMAIL} />
                <FormControlLabel control={<Radio />} label="Sign in by phone" value={PHONE} />
              </RadioGroup>
              {option === EMAIL && (<><TextField
                fullWidth
                id="email"
                label="Email"
                onChange={handleEmailChange}
                required
                value={email}
              />
              <TextField
                autoComplete="current-password"
                fullWidth
                id="password"
                label="Password"
                onChange={handlePasswordChange}
                required
                type="password"
                value={password}
              /></>)}
              {option === PHONE && (<><TextField
                fullWidth
                id="phone"
                label="Phone"
                onChange={handlePhoneChange}
                required
                value={phone}
              />
              <TextField
                autoComplete="current-password"
                fullWidth
                id="password"
                label="Password"
                onChange={handlePasswordChange}
                required
                type="password"
                value={password}
              /></>)}
            </CardContent>
            <CardActions>
              {!inProgress && <Button color="primary" onClick={handleLogin} variant="contained">
                  Login
              </Button>}
              {inProgress && <CircularProgress />}
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}

export default Login
