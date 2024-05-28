import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Card, CardBody, Form, Input, Row, Col, FormGroup, Label } from "reactstrap";
import NotificationAlert from "react-notification-alert";

function Attendance() {
  const { id } = useParams();
  const notificationAlertRef = React.useRef(null);

  const [formData, setFormData] = useState({
    user: "", 
    signIn: "",
    signOut: "",
    date: "",
    salary: "",
  });

  const [names, setNames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const [selectedSalary, setSelectedSalary] = useState(0);
  const [selectedSignIn, setSelectedSignIn] = useState("");
  const [selectedSignOut, setSelectedSignOut] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/");
        setNames(response.data);
        const userResponse = await axios.get("http://localhost:3001/get/" + id);
        console.log(userResponse);
        setFormData({
          user: userResponse.data._id,
          signIn: userResponse.data.signIn,
          signOut: userResponse.data.signOut,
          date: userResponse.data.date
        });
        setSelectedName(userResponse.data.name);
        console.log(response.data)
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id]);

  const calculateSalary = (signIn, signOut, salary) => {
    // Parse the sign-in and sign-out times as HH:mm strings

    console.log('signIn', signIn);
    console.log('signOut', signOut);
    console.log('salary', salary);

    const signInParts = signIn.split(':').map(Number);
    console.log('signInParts', signInParts);
    const signOutParts = signOut.split(':').map(Number);
    console.log('signOutParts', signOutParts);
  
    // Calculate the time in milliseconds for both sign-in and sign-out times
    const signInTime = (signInParts[0] * 60 * 60 * 1000) + (signInParts[1] * 60 * 1000);
    const signOutTime = (signOutParts[0] * 60 * 60 * 1000) + (signOutParts[1] * 60 * 1000);

    console.log('signInTime', signInTime);
    console.log('signOutTime', signOutTime);

    const timeDiff = signOutTime - signInTime;

    // Convert time difference to hours
    const hoursWorked = timeDiff / (1000 * 60 * 60);

    console.log('hoursWorked', hoursWorked);

  
    // Calculate salary based on hours worked and hourly rate
    const calculatedSalary = (salary / 160) * hoursWorked;
  
    
    return calculatedSalary;
  };  

  const handleUpdate = (e) => {
    e.preventDefault();
    formData.salary = calculateSalary(selectedSignIn, selectedSignOut, selectedSalary);
    console.log(formData);
    axios
      .post("http://localhost:3001/attendances/"+ id, formData) 
      .then((res) => {
        console.log(res);
        // Redirect to user list or display success message
        notify(); 
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') {
      setSelectedName(value);
      const selectedUser = names.find(user => user.name === value);
      setSelectedSalary(selectedUser.salary);
      if (selectedUser) {
        setFormData(prevFormData => ({
          ...prevFormData,
          user: selectedUser._id,
        }));
      }
    }
    else {
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: value,
      }));
    }
    if (name === 'signIn'){
      setSelectedSignIn(value);
    } else if (name === 'signOut'){
      setSelectedSignOut(value);
    }
  };

  const notify = () => {
    var type;
    type = "success";
    var options = {};
    options = {
      place: 'br',
      message: (
        <div>
          <div>
            Recorded Successfully!
          </div>
        </div>
      ),
      type: type,
      icon: "tim-icons icon-bell-55",
      autoDismiss: 7,
    };
    notificationAlertRef.current.notificationAlert(options);
  };

  return (
    <div className="content">
      <NotificationAlert ref={notificationAlertRef} />
      <div style={styles.cardContainer}>
        <Row>
          <Col md="8">
            <Card>
              <CardBody>
                <Form onSubmit={handleUpdate}>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <Label for="name">Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={selectedName}
                          onChange={handleChange}
                          type="text"
                          autoComplete="off"
                          list="names"
                          placeholder="Search for a name..."
                          style={{ fontSize: '16px', padding: '10px', borderRadius: '5px' }}
                        />
                        <datalist id="names">
                          {names.map((user, index) => (
                            <option key={index} value={user.name} />
                          ))}
                        </datalist>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <Label for="date">Date</Label>
                        <Input
                          id="date"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          type="date"
                          style={{ fontSize: '16px', padding: '10px', borderRadius: '5px' }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <Label for="signIn">Sign In Time</Label>
                        <Input
                          id="signIn"
                          name="signIn"
                          value={formData.signIn}
                          onChange={handleChange}
                          type="time" // Use type="time" for time input
                          style={{ fontSize: '16px', padding: '10px', borderRadius: '5px' }}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label for="signOut">Sign Out Time</Label>
                        <Input
                          id="signOut"
                          name="signOut"
                          value={formData.signOut}
                          onChange={handleChange}
                          type="time" 
                          style={{ fontSize: '16px', padding: '10px', borderRadius: '5px' }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  
                  <Button className="btn-fill" color="primary" type="submit">
                    Save
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}

const styles = {
  cardContainer: {
    justifyContent: "center", // Center horizontally
    paddingTop: "100px",
    paddingLeft: "380px",
  },
};

export default Attendance;
