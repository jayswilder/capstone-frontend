import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addStudent } from '../../redux/actions/userActions';
import { Button, Container, Modal, TextField, Typography, Paper } from '@material-ui/core'

class AddStudentModal extends Component {

    state = {
        modalOpen: false,
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        classEnrolled: '',
        enrollmentStatus: '',
    }

    toggle = () => {
        this.setState({
            modalOpen: !this.state.modalOpen
        });
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = e => {
        e.preventDefault();
        console.log(this.state)
        const newStudent = {
            userId: this.props.user.credentials.userId,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            phoneNumber: this.state.phoneNumber,
            classEnrolled: this.state.classEnrolled,
            enrollmentStatus: this.state.enrollmentStatus
        };
        this.props.addStudent(newStudent);
        this.toggle();
    }

    render() {
        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.toggle}>Add Student</Button>
                <Modal
                    open={this.state.modalOpen}
                    onClose={this.toggle}
                >
                    <Container component={Paper} style={{
                        display: 'flex',
                        justifyContent: "center",
                        flexDirection: "column",
                        alignItems: "center",
                        marginTop: "100px",
                        padding: "50px",
                        maxWidth: "750px"
                    }}>
                        <Typography variant="h3" component="h2">
                            New Student
                        </Typography><br />
                        <form onSubmit={this.onSubmit} autoComplete="off">
                            <TextField label="First Name" name="firstName" onChange={this.onChange} required style={{ margin: "10px" }} required />
                            <TextField label="Last Name" name="lastName" onChange={this.onChange} style={{ margin: "10px" }} required />
                            <TextField label="Phone" name="phoneNumber" type="phone" onChange={this.onChange} style={{ margin: "10px" }} required />
                            <TextField label="Email" name="email" type="email" onChange={this.onChange} required style={{ margin: "10px" }} required />
                            <TextField label="Class" name="classEnrolled" onChange={this.onChange} style={{ margin: "10px" }} required />
                            <TextField label="Enrollment Status" name="enrollmentStatus" onChange={this.onChange} style={{ margin: "10px" }} required /><br /><br />
                            <Button type="submit" variant="contained" color="primary" style={{ marginLeft: "10px" }}>Submit</Button>
                        </form>
                    </Container>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps, { addStudent })(AddStudentModal)



