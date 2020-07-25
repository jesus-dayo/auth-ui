import React, {useReducer, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import styles from '../../assets/jss/views/loginStyle';
import api from '../../api';
import {AUTH_TOKEN} from '../../common/constant';
import {useHistory} from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(styles);

const initialState = {
  email: '',
  phone:'',
  password:''
}

const reducer = (state, { field, value }) => {
  return {
    ...state,
    [field]: value,
  };
};

const SignupPage = () => {
  const classes = useStyles();
  const [state, dispatch] = useReducer(
    reducer,
    Object.assign([], initialState)
  );
  const [inProgress, setInProgress] = useState(false);
  const history = useHistory();

  const handleChange = (e) => {
    dispatch({ field: e.target.name, value: e.target.value });
  };

  const handleSignUp = async () => {
    setInProgress(true);
    await api.auth.signup({...state})
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
            <form className={classes.form}>
              <CardHeader className={classes.cardHeader}>
                <h4>Signup</h4>
              </CardHeader>
              <CardContent className={classes.formContent}>
                <TextField
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  onChange={handleChange}
                  required
                  value={state.email}
                />
                <TextField
                  fullWidth
                  id="phone"
                  label="Phone"
                  name="phone"
                  onChange={handleChange}
                  required
                  value={state.phone}
                />
                <TextField
                  autoComplete="current-password"
                  fullWidth
                  id="password"
                  label="Password"
                  name="password"
                  onChange={handleChange}
                  required
                  type="password"
                  value={state.password}
                />
              </CardContent>
              <CardActions>
                {!inProgress && <Button color="primary" onClick={handleSignUp} variant="contained">
                  Signup
                </Button>}
                {inProgress && <CircularProgress />}
              </CardActions>
            </form>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default SignupPage;
