import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import AppIcon from '../images/logo.png';
import { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { loginUser } from '../redux/actions/userActions';
import PropTypes from 'prop-types';

function Login(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (props.UI.errors) {
            setErrors(props.UI.errors)
        }
    }, [props.UI.errors])

    const handleSubmit = (e) => {
        e.preventDefault();
        const loginData = {
            email: email,
            password: password
        }
        props.loginUser(loginData, props.history)
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    return (
        <Grid container style={{ paddingRight: '240px' }}>
            <Grid item sm />
            <Grid item sm >
                <Paper
                    elevation={3}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                        marginTop: '50px',
                        padding: '35px',
                        width: '600px',
                    }}>
                    <img src={AppIcon} alt='School logo' style={{
                        width: '150px',
                    }} />
                    <Typography variant="h2" style={{
                        margin: '15px'
                    }} >
                        Login
                </Typography>
                    {errors.general && (
                        <Typography color="secondary" variant='body2'>
                            {errors.general}
                        </Typography>
                    )}
                    <br />
                    <form noValidate onSubmit={handleSubmit} style={{
                        width: "90%",
                        display: "flex",
                        flexDirection: "column"
                    }}>
                        <TextField
                            variant='outlined'
                            fullWidth id="email"
                            name="email" type="email"
                            label="Email"
                            helperText={errors.email}
                            error={errors.email ? true : false}
                            onChange={handleEmailChange}
                            value={email}
                        />
                        <br />
                        <TextField
                            variant='outlined'
                            fullWidth id="password"
                            name="password" type="password"
                            label="Password"
                            helperText={errors.password}
                            error={errors.password ? true : false}
                            onChange={handlePasswordChange}
                            value={password}
                        />
                        <br />
                        <Button
                            variant='contained'
                            color="primary"
                            type='submit'
                            style={{
                                padding: '11px',
                                fontWeight: 'bold'
                            }}
                        >
                            Login
                        </Button>
                    </form>
                    <br />
                </Paper>
                <p style={{ color: 'grey' }}>Don't have an account? <strong>{<Link to='/signup' >Sign Up </Link>}</strong></p>
            </Grid>
            <Grid item sm />
        </Grid>
    )
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
});

const mapActionsToProps = {
    loginUser
}

export default connect(mapStateToProps, mapActionsToProps)(Login)
