import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import AppIcon from '../images/logo.png';
import { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signupUser } from '../redux/actions/userActions';
import PropTypes from 'prop-types';


function Signup(props) {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (props.UI.errors) {
            setErrors(props.UI.errors)
        }
    }, [props.UI.errors])

    const handleSubmit = (e) => {
        e.preventDefault();
        const signUpData = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            confirmPassword: confirmPassword
        }
        props.signupUser(signUpData, props.history)
    }

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value)
    }

    const handleLastNameChange = (e) => {
        setLastName(e.target.value)
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value)
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
                        width: '600px'
                    }}>
                    <img src={AppIcon} alt='School logo' style={{
                        width: '150px',
                        transform: 'scaleX(-1)'
                    }} />
                    <Typography variant="h2" style={{
                        margin: '15px'
                    }} >
                        Sign Up
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
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <TextField
                                variant='outlined'
                                id="firstName"
                                name="firstName"
                                type="firstName"
                                label="First Name"
                                helperText={errors.firstName}
                                error={errors.firstName ? true : false}
                                onChange={handleFirstNameChange}
                                value={firstName}
                                required
                                style={{
                                    width: '49%'
                                }}
                            />
                            <TextField
                                variant='outlined'
                                id="lastName"
                                name="lastName"
                                type="lastName"
                                label="Last Name"
                                helperText={errors.lastName}
                                error={errors.lastName ? true : false}
                                onChange={handleLastNameChange}
                                value={lastName}
                                required
                                style={{
                                    width: '49%'
                                }}
                            />
                        </div>
                        <br />
                        <TextField
                            variant='outlined'
                            fullWidth
                            id="email"
                            name="email"
                            type="email"
                            label="Email"
                            helperText={errors.email}
                            error={errors.email ? true : false}
                            onChange={handleEmailChange}
                            value={email}
                        />
                        <br />
                        <TextField
                            variant='outlined'
                            fullWidth
                            id="password"
                            name="password"
                            type="password"
                            label="Password"
                            helperText={errors.password}
                            error={errors.password ? true : false}
                            onChange={handlePasswordChange}
                            value={password}
                        />
                        <br />
                        <TextField
                            variant='outlined'
                            fullWidth
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            label="Confirm Password"
                            helperText={errors.password}
                            error={errors.password ? true : false}
                            onChange={handleConfirmPasswordChange}
                            value={confirmPassword}
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
                            Sign Up
                        </Button>
                    </form>
                    <br />
                </Paper>
                <p style={{ color: 'grey' }}>Already have an account? <strong>{<Link to='/' >Login</Link>}</strong></p>
            </Grid>
            <Grid item sm />
        </Grid >
    )
}

Signup.propTypes = {
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
})

const mapActionsToProps = {
    signupUser
}

export default connect(mapStateToProps, mapActionsToProps)(Signup)
