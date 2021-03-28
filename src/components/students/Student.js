import React from 'react';
import { connect } from 'react-redux';
import { deleteStudent } from '../../redux/actions/userActions';
import AddStudentModal from './AddStudentModal'
import {
    Button,
    Container,
    TableContainer,
    Table,
    Paper,
    TableHead,
    TableRow,
    TableCell,
    TableBody
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const Students = (props) => {
    let students = props.user.students

    const onDeleteClick = (student) => {
        props.deleteStudent(student)
    }

    return (
        <Paper elevation={10} style={{ padding: '20px' }}>
            <Container>
                <TableContainer style={{ marginBottom: "20px" }} component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Phone</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Class</TableCell>
                                <TableCell>Enrollment Status</TableCell>
                                <TableCell>Grade Average</TableCell>

                                <TableCell align="right">Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {students.map(student => (
                                <TableRow key={student.id}>
                                    <TableCell>
                                        {student.firstName} {student.lastName}
                                    </TableCell>
                                    <TableCell>{student.phoneNumber}</TableCell>
                                    <TableCell>{student.email}</TableCell>
                                    <TableCell>{student.classEnrolled}</TableCell>
                                    <TableCell>{student.enrollmentStatus}</TableCell>
                                    <TableCell>{student.gradeAverage}</TableCell>
                                    <TableCell align="right">
                                        <Button
                                            align="right"
                                            color="secondary"
                                            onClick={onDeleteClick.bind(this, student)}
                                        >
                                            <DeleteIcon />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <AddStudentModal />
            </Container >
        </Paper>
    )
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps, { deleteStudent })(Students);
