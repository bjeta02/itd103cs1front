import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Card, CardBody, Form, Input, Row, Col, FormGroup, Label, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import NotificationAlert from "react-notification-alert";

function UserProfile() {
  const { id } = useParams();

  const notificationAlertRef = React.useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    position: "",
    username: "",
    email: "",
    salary: "",
  });

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [names, setNames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/");
        setNames(response.data.map(user => user.name));
        const userResponse = await axios.get("http://localhost:3001/get/" + id);
        console.log(userResponse);
        setFormData({
          name: userResponse.data.name,
          position: userResponse.data.position,
          username: userResponse.data.username,
          email: userResponse.data.email,
          salary: userResponse.data.salary,
        });
        setSelectedPosition(userResponse.data.position);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:3001/update/" + id, formData)
      .then((res) => {
        console.log(res);
        // Redirect to user list or display success message
        notify(); 
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  const handleSelectPosition = (position) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      position: position,
    }));
    setSelectedPosition(position);
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
            User Updated Successfully!
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
                          value={formData.name}
                          onChange={handleChange}
                          type="text"
                          autoComplete="off"
                          list="names"
                          placeholder="Search for a name..."
                        />
                        <datalist id="names">
                          {names.map((name, index) => (
                            <option key={index} value={name} />
                          ))}
                        </datalist>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <Label for="position">Position</Label>
                        <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                          <DropdownToggle caret>
                            {selectedPosition || "Select Position"}
                          </DropdownToggle>
                          <DropdownMenu>
                            <DropdownItem onClick={() => handleSelectPosition("Chief HR Officer")}>Chief HR Officer</DropdownItem>
                            <DropdownItem onClick={() => handleSelectPosition("Head HR")}>Head HR</DropdownItem>
                            <DropdownItem onClick={() => handleSelectPosition("HR Director")}>HR Director</DropdownItem>
                            <DropdownItem onClick={() => handleSelectPosition("HR Manager")}>HR Manager</DropdownItem>
                            <DropdownItem onClick={() => handleSelectPosition("HR Specialist")}>HR Specialist</DropdownItem>
                            <DropdownItem onClick={() => handleSelectPosition("HR Generalist")}>HR Generalist</DropdownItem>
                            <DropdownItem onClick={() => handleSelectPosition("Recruiter")}>Recruiter</DropdownItem>
                            <DropdownItem onClick={() => handleSelectPosition("Trainer")}>Trainer</DropdownItem>
                            <DropdownItem onClick={() => handleSelectPosition("HR Assistant/Coordinator")}>HHR Assistant/Coordinator</DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <Label for="username">Username</Label>
                        <Input
                          id="username"
                          name="username"
                          value={formData.username}
                          onChange={handleChange}
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <Label for="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <Label for="salary">Salary</Label>
                        <Input
                          id="salary"
                          name="salary"
                          value={formData.salary}
                          onChange={handleChange}
                          type="text"
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

export default UserProfile;
