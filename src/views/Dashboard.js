import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import axios from "axios";
import { Line, Bar } from "react-chartjs-2";
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
} from "reactstrap";
import {
  chartExample1,
  chartExample2,
  chartExample3,
  chartExample4,
} from "variables/charts.js";

function Dashboard(props) {
  const [bigChartData, setBigChartData] = useState("data1");

  const [totalUsers, setTotalUsers] = useState(0);
  const [userCounts, setUserCounts] = useState([]);
  const [chartData2, setChartData2] = useState({
    labels: [],
    datasets: [{
      label:'',
      fill: false,
      borderColor:'',
      data: [],
      backgroundColor: [] // Add this property to store colors for bars
    }]
  });

  const chartContainer2 = useRef(null);
  
  

  const chartContainer = useRef(null);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      label: '',
      fill: false,
      borderColor: '',
      data: []
    }]
  }); // Set initial structure to prevent undefined errors

  useEffect(() => {
    const fetchSalaryData = async () => {
      try {
        // Fetch salary data from the API
        const response = await fetch('http://localhost:3001/total-salary');
        const data = await response.json();
  
        // Process salary data to get labels and salary amounts
        const labels = data.map(item => new Date(2020, item.month - 1).toLocaleString('default', { month: 'long' }));
        const salaries = data.map(item => item.totalSalaryForMonth);
  
        // Create a gradient (using a canvas element)
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
        gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
        gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
        gradientStroke.addColorStop(0, "rgba(29,140,248,0)");
  
        // Set salary chart data
        setChartData({
          labels: labels,
          datasets: [
            {
              label: "Salary of All Employee Monthly",
              fill: true,
              backgroundColor: gradientStroke,
              borderColor: "#1f8ef1",
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: "#1f8ef1",
              pointBorderColor: "rgba(255,255,255,0)",
              pointHoverBackgroundColor: "#1f8ef1",
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: salaries,
            },
          ]
        });
      } catch (error) {
        console.error("Failed to fetch salary data:", error);
      }
    };
  
    const fetchTotalUsers = async () => {
      try {
        // Make a GET request to fetch the total number of users from the backend
        const response = await axios.get('http://localhost:3001/total-users');
        const data = response.data;
        // Update the state with the total number of users
        setTotalUsers(data.totalUsers);
      } catch (error) {
        console.error('Failed to fetch total number of users:', error);
      }
    };

    const fetchUserCountsByPosition = async () => {
      try {
        const response = await axios.get('http://localhost:3001/user-count-by-position');
        const userCounts = response.data;

        const labels = userCounts.map(count => count._id);
        const counts = userCounts.map(count => count.count);
        
        // Generate random colors for the bars
        const backgroundColor = userCounts.map(() => 'rgba(255, 0, 255, 0.6)'); // Pink color with transparency

        setChartData2(prevState => ({
          ...prevState,
          labels: labels,
          datasets: [{
            ...prevState.datasets[0],
            data: counts,
            backgroundColor: backgroundColor, // Set the colors for the bars
            borderColor: 'rgba(255, 0, 255, 1)' // Pink color without transparency
          }],
        }));
      } catch (error) {
        console.error('Error fetching user counts by position:', error);
      }
    };

    
  
    fetchSalaryData();
    fetchTotalUsers();
    fetchUserCountsByPosition();
  }, []);
  
  

  

  return (
    <>
      <div className="content">
        <Row>
          <Col xs="12">
            <Card className="card-chart">
              <CardHeader>
                <Row>
                  <Col className="text-left" sm="6">
                    <h5 className="card-category">2024</h5>
                    <CardTitle tag="h2">Monthly Payroll</CardTitle>
                  </Col>
                  <Col sm="6">
                    <ButtonGroup
                      className="btn-group-toggle float-right"
                      data-toggle="buttons"
                    >
                      {/* Buttons here */}
                    </ButtonGroup>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart-area" style={{ height: "380px" }}>
                  {/* Adjust the height as per your requirement */}
                  <Line
                    ref={chartContainer}
                    data={chartData}
                    options={chartExample1.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
  <Col lg="10">
    <Card className="card-chart">
      <CardHeader>
        <h5 className="card-category">Position</h5>
        <CardTitle tag="h3">
          <i className="text-bot-left" /> Employee per Position
        </CardTitle>
      </CardHeader>
      <CardBody>
        <div className="chart-area">
          <Bar
            ref={chartContainer2}
            data={chartData2}
            options={chartExample3.options}
          />
        </div>
      </CardBody>
    </Card>
  </Col>


  <Col lg="2">
    <Card className="card-chart">
      <CardHeader>
        <h5 className="card-category"></h5>
        <CardTitle tag="h3">
          <i className="text-bot-right" /> Total Employee
        </CardTitle>
      </CardHeader>
      <CardBody>
        <div className="content" style={{ display: 'flex', justifyContent: 'center' }}>
          <h2>{totalUsers}</h2>
        </div>
      </CardBody>
    </Card>
  </Col>
</Row>

      </div>
    </>
  );
}

export default Dashboard;
