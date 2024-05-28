import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardHeader, CardBody, CardTitle, Table, Row, Col, Button, Input, InputGroup } from "reactstrap";
import NotificationAlert from "react-notification-alert";
import { Link } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

function Records() {
  const [attendances, setAttendances] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchDate, setSearchDate] = useState("");

  const notificationAlertRef = React.useRef(null);

  useEffect(() => {
    axios.get("http://localhost:3001/attendances")
      .then(response => {
        setAttendances(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Function to calculate hours worked
  const calculateHoursWorked = (signIn, signOut) => {
    const signInTime = new Date(`1970-01-01T${signIn}`);
    const signOutTime = new Date(`1970-01-01T${signOut}`);
    
    let diff = signOutTime.getTime() - signInTime.getTime();
    const isNegative = diff < 0;
  
    // Take absolute value to ensure positive difference
    diff = Math.abs(diff);
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
    // If the difference was originally negative, prepend a minus sign
    const sign = isNegative ? "-" : "";
  
    return `${sign}${hours} hours ${minutes} minutes`;
  };

  const convertTo12HourFormat = (timeString) => {
      // Split the time string into hours and minutes
      const [hours, minutes] = timeString.split(':').map(Number);

      // Determine AM/PM and format hours
      const meridiem = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 || 12; // Convert 0 to 12

      // Construct the formatted time string
      return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${meridiem}`;
  };
  
  const filterByDate = (data, date) => {
    if (!date) return data; // Return all data if no date is selected
  
    // Extract the year, month, and day from the selected date
    const selectedYear = date.getFullYear();
    const selectedMonth = date.getMonth();
    const selectedDay = date.getDate();
  
    return data.filter(item => {
      // Convert the item's date string to a Date object
      const itemDate = new Date(item.date);
      // Extract year, month, and day to compare
      const itemYear = itemDate.getFullYear();
      const itemMonth = itemDate.getMonth();
      const itemDay = itemDate.getDate();
  
      // Compare year, month, and day for exact match
      return itemYear === selectedYear && itemMonth === selectedMonth && itemDay === selectedDay;
    });
  };
  

  const filteredAttendances = filterByDate(attendances, searchDate);

  return (
    <>
      <div className="content">
        <NotificationAlert ref={notificationAlertRef} />
        <Row>
          <Col md="12">
            <Card>
              <CardHeader style={{ paddingRight: "100px" }}>
                <CardTitle tag="h2">Records</CardTitle>
                <div className="d-flex justify-content-end align-items-center">
                  <Link to="/admin/attendance">
                    <Button color="primary">Add Attendee</Button>
                  </Link>
                </div>
              </CardHeader>
              <CardBody>
              <div className="d-flex align-items-center mb-3" style={{ width: "250px", marginLeft: "20px" }}>
                  <span style={{ marginRight: "10px" }}>Select Date:</span>
                  <DatePicker
                    selected={searchDate}
                    onChange={date => setSearchDate(date)}
                    dateFormat="dd/MM/yyyy"
                    className="form-control"
                    placeholderText="Select a date"
                    isClearable={true}
                  />
                </div>

                <Table className="tablesorter" style={{ width: "1650px", marginLeft: "20px" }} responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Name</th>
                      <th>Time in</th>
                      <th>Time Out</th>
                      <th>Date</th>
                      <th>Hours Worked</th> {/* Add new column */}
                    </tr>
                  </thead>
                  <tbody>
                      {filteredAttendances.map(attendance => (
                        <tr key={attendance._id}>
                          <td>{attendance.user.name}</td>
                          <td>{convertTo12HourFormat(attendance.signIn)}</td>
                          <td>{convertTo12HourFormat(attendance.signOut)}</td>
                          <td>{new Date(attendance.date).toLocaleDateString("en-US", { timeZone: "Asia/Kolkata" })}</td>
                          <td>{calculateHoursWorked(attendance.signIn, attendance.signOut)}</td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Records;
