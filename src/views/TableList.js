import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardBody, CardTitle, Table, Row, Col, Button, Input, InputGroup } from "reactstrap";
import NotificationAlert from "react-notification-alert";
import { Link } from "react-router-dom";


function TableList() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const notificationAlertRef = React.useRef(null);

  useEffect(() => {
    axios.get("http://localhost:3001/")
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  
  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/deleteuser/${id}`)
      .then(() => {
        console.log('User deleted successfully');
        setUsers(users.filter(user => user._id !== id));
        notify();
      })
      .catch(err => console.log(err));
  };

  const handleEdit = (id) => {
    navigate(`/admin/user-profile/${id}`);
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
            User Deleted Successfully!
          </div>
        </div>
      ),
      type: type,
      icon: "tim-icons icon-bell-55",
      autoDismiss: 7,
    };
    notificationAlertRef.current.notificationAlert(options);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <div className="content">
        <NotificationAlert ref={notificationAlertRef} />
        <Row>
          <Col md="12">
            <Card>
              <CardHeader style={{ paddingRight: "100px" }}>
                <CardTitle tag="h2">Employees</CardTitle>
                <div className="d-flex justify-content-end align-items-center">
                  <Link to="/admin/adduser">
                    <Button color="primary">Add Employee</Button>
                  </Link>
                </div>
              </CardHeader>
              <CardBody>
              <InputGroup className="mb-3" style={{ width: "250px", marginLeft: "20px" }}>
                <Input
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearch}
                  style={{ borderRadius: "20px", paddingLeft: "15px" }}
                />
                
              </InputGroup>

                <Table className="tablesorter" style={{ width: "1650px", marginLeft: "20px" }}responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Name</th>
                      <th>Position</th>
                      <th>Username</th>
                      <th>Email</th>                  
                      <th>Salary</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users
                      .filter(user =>
                        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        user.email.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map(user => (
                        <tr key={user._id}>
                          <td>{user.name}</td>
                          <td>{user.position}</td>
                          <td>{user.username}</td>
                          <td>{user.email}</td>
                          <td>{user.salary}</td>
                          <td>
                            <button onClick={() => handleEdit(user._id)} className="btn btn-primary btn-sm mr-1">Edit</button>
                            <button onClick={() => handleDelete(user._id)} className="btn btn-danger btn-sm">Remove</button>
                          </td>
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

export default TableList;
