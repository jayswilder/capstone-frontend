import React from 'react';
import ReactQuill from 'react-quill';
import { TextField, Button, Paper } from '@material-ui/core'
// import firebase from '../../Config/firebase'
import 'react-quill/dist/quill.snow.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createLesson } from '../../redux/actions/dataActions';

class CreateLesson extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            lesson:
            {
                title: '',
                content: '',
                subject: '',
                dateCreated: new Date(),
                featuredImage: '',
                isPublished: false,
                lastModified: new Date(),
            }
        }
    }

    modules = {

        toolbar: {
            container: [
                [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                [{ size: [] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ 'color': [] }, { 'background': [] }],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }, 'table'],
                ['link', 'image', 'video'],
                ['clean'],
                ['code-block']

            ]
        },
        clipboard: {
            matchVisual: false,
        },
    }

    formats = [
        'header',
        'font',
        'size',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
        'video',
        'code-block',
        'color',
        'background',
        'table'
    ]

    onChangeLessonTitle = (value) => {
        this.setState({
            lesson: {
                ...this.state.lesson,
                title: value
            }
        })
    }

    onChangeLessonSubject = (value) => {
        this.setState({
            lesson: {
                ...this.state.lesson,
                subject: value
            }
        })
    }


    handleImageUpload = () => {
        const imageButton = document.getElementsByClassName('ql-image')
        imageButton.addEventListener("click", function (e) {
            console.log('clicked')
        })
    }

    onChangeLessonContent = (value) => {
        this.setState({
            lesson: {
                ...this.state.lesson,
                content: value
            }
        })
    }

    submitLesson = () => {
        this.props.createLesson(this.state.lesson)
        setTimeout(function () {
            window.location.href = '/dashboard'
        }, 1200)
    }

    onChangePublish = () => {
        this.setState({
            lesson: {
                ...this.state.lesson,
                isPublished: true
            }
        })
        const publish = () => {
            this.props.createLesson(this.state.lesson)
        }

        setTimeout(function () {
            publish()
        }, 1000)
        this.props.createLesson(this.state.lesson)
        setTimeout(function () {
            window.location.href = '/dashboard'
        }, 2000)
    }

    render() {
        return (
            <>
                <Paper elevation={10} id='editor-page'>

                    <div id='editor-container'>
                        <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                            <TextField
                                id="lessonTitle"
                                label="Title"
                                name='lessonTitle'
                                variant="outlined"
                                style={{ width: "48%" }}
                                value={this.state.lesson.title}
                                onChange={(e) => this.onChangeLessonTitle(e.target.value)}
                            />
                            <TextField
                                id="lessonSubject"
                                label="Subject"
                                name='lessonSubject'
                                variant="outlined"
                                style={{ width: "48%" }}
                                value={this.state.lesson.subject}
                                onChange={(e) => this.onChangeLessonSubject(e.target.value)}
                            />
                        </div>
                        <br />
                        <br />

                        <ReactQuill
                            ref={(el) => this.quill = el}
                            value={this.state.lesson.content}
                            onChange={(e) => this.onChangeLessonContent(e)}
                            theme={"snow"}
                            modules={this.modules}
                            formats={this.formats}
                        />

                        <br />

                        <Button
                            variant="contained"
                            color="primary"
                            onClick={(e) => this.submitLesson()}
                        >
                            Save
                </Button>
                        <Button
                            variant="contained"
                            style={{ margin: '5px' }}
                            color="secondary"
                            onClick={(e) => this.onChangePublish()}
                        >
                            Publish
                </Button>

                    </div>
                </Paper>
            </>
        )
    }
}

CreateLesson.propTypes = {
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    createLesson: PropTypes.func.isRequired

}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI,
    lesson: state.user.lessons
});

const mapActionsToProps = {
    createLesson
}


export default connect(mapStateToProps, mapActionsToProps)(CreateLesson);