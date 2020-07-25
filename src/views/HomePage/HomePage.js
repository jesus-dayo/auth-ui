import React from 'react';
import Container from '@material-ui/core/Container';
import styles from '../../assets/jss/views/homePageStyle';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import {AUTH_TOKEN} from '../../common/constant';
import {useHistory} from 'react-router-dom';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(styles);

const HomePage = () => {
  const classes = useStyles();
  const history = useHistory();
  const token = JSON.parse(localStorage.getItem(AUTH_TOKEN));
  const handleLogout = () => {
    localStorage.removeItem(AUTH_TOKEN);
    history.push('/');
  }

  return (
    <div>
      <Container className={classes.container} maxWidth="sm">
        <Card className={classes.root}>
          <CardContent>
            <Typography className={classes.title} gutterBottom variant="h4">
              Successful Login !!!!
            </Typography>
            <br/>
            <TextField
              fullWidth
              disabled
              id="standard-multiline-static"
              label="Token"
              multiline
              rows={4}
              value={token}
            />
          </CardContent>
          <CardActions>
            <Button color="secondary" onClick={handleLogout} size="small">Logout</Button>
          </CardActions>
        </Card>
      </Container>
    </div>
  )
}

export default HomePage;
