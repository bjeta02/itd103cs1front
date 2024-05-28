import axios from "axios";
import React, { useState } from "react";
import { Button, Card, CardBody, Form, Input, Row, Col, FormGroup, Label, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import NotificationAlert from "react-notification-alert";

function AddUser() {
    const [name, setName] = useState("");
    const [position, setPosition] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [salary, setSalary] = useState("");

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedPosition, setSelectedPosition] = useState("");

    const notificationAlertRef = React.useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/create', { name, position, username, email, salary })
            .then(res => {
                console.log(res);
                notify(); 
            })
            .catch(err => console.log(err));
    };

    const handleChange = (e) => {
        switch (e.target.name) {
            case "name":
                setName(e.target.value);
                break;
            case "position":
                setPosition(e.target.value);
                break;
            case "username":
                setUsername(e.target.value);
                break;
            case "email":
                setEmail(e.target.value);
                break;
            case "salary":
                setSalary(e.target.value);
                break;
            default:
                break;
        }
    };

    const toggleDropdown = () => {
        setDropdownOpen((prevState) => !prevState);
    };

    const handleSelectPosition = (position) => {
        setPosition(position);
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
                        User Added Successfully!
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
                                <Form onSubmit={handleSubmit}>
                                    <Row>
                                        <Col md="12">
                                            <FormGroup>
                                                <Label for="name">Name</Label>
                                                <Input
                                                    id="name"
                                                    name="name"
                                                    value={name}
                                                    onChange={handleChange}
                                                    type="text"
                                                />
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
                                                    value={username}
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
                                                    value={email}
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
                                                    value={salary}
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

export default AddUser;
