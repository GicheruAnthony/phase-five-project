import React, { useState, useEffect } from 'react';
import '../css/Admin.css';

function Admin({ sessions }) {
    const [courses, setCourses] = useState([]);
    const [newSession, setNewSession] = useState({
        start: '',
        end: '',
        link: '',
        course_id: '',
    });

    useEffect(() => {
        fetch('http://localhost:3000/courses')
            .then((response) => response.json())
            .then((data) => setCourses(data))
            .catch((error) => console.error('Error:', error));
    }, []);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setNewSession(prevSession => ({ ...prevSession, [name]: value }));
    };

    const handleSubmit = event => {
        event.preventDefault();

        // Perform POST request to create a new session
        fetch('http://localhost:3000/sessions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newSession),
        })
            .then(response => response.json())
            .then(data => {
                // Update sessions state with the newly created session
                sessions.push(data);
                setNewSession({
                    start: '',
                    end: '',
                    link: '',
                    course_id: '',
                });
            })
            .catch(error => console.error('Error:', error));
    };

    const handleDelete = sessionId => {
        // Display a confirmation dialog
        const isConfirmed = window.confirm("Are you sure you want to delete this session?");
    
        if (isConfirmed) {
            // Perform DELETE request to delete a session
            fetch(`http://localhost:3000/sessions/${sessionId}`, {
                method: 'DELETE',
            })
            .then(response => {
                if (response.status === 204) {
                    // Remove the deleted session from the sessions array
                    const updatedSessions = sessions.filter(session => session.id !== sessionId);
                    setNewSession(updatedSessions); // Update the sessions state
                }
            })
            .catch(error => console.error('Error:', error));
    
            // Reload the page after deletion
            window.location.reload();
        }
    };
    


    return (
        <>
            <div className='admin_form_div'>
                <h5>Schedule a new Lesson</h5>
                <form className='admin_form' onSubmit={handleSubmit}>
                    <input type="time" name="start" placeholder='start' value={newSession.start} onChange={handleInputChange} required/>
                    <input type="time" name="end" placeholder='end' value={newSession.end} onChange={handleInputChange} required/>
                    <input type="text" name="link" placeholder='link' value={newSession.link} onChange={handleInputChange} required/>
                    <select name="course_id" value={newSession.course_id} onChange={handleInputChange} required>
                        <option value="">Select a Course</option>
                        {courses.map(course => (
                            <option key={course.id} value={course.id}>{course.name}</option>
                        ))}
                    </select>
                    <button type="submit" className='admin_form_btn'>Create Session</button>
                </form>
            </div>

            <div className='admin_table_div'>
                <h5>Previous Lessons</h5>
                <table className='admin_table'>
                    <thead className='admin_th'>
                        <tr>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Link</th>
                            <th>Course Name</th>
                            <th>Action</th> {/* New column for delete button */}
                        </tr>
                    </thead>
                    <tbody>
                        {sessions.map((session, index) => {
                            const course = courses.find(course => course.id === session.course_id);
                            const courseName = course ? course.name : 'N/A';

                            return (
                                <tr key={session.id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                                    <td>{session.start}</td>
                                    <td>{session.end}</td>
                                    <td><a href={session.link} target='blank'>lesson link</a></td>
                                    <td>{courseName}</td>
                                    <td><button className='admin_delete_btn' onClick={() => handleDelete(session.id)}>Delete</button></td>
                                </tr>
                            );
                        })} 
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Admin;