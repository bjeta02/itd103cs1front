import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"

function UpdateUser() {
    const { id } = useParams()

    const [name, setName] = useState()
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [email, setEmail] = useState()
    const [age, setAge] = useState()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3001/get/" + id);
                console.log(response);
                setName(response.data.name)
                setUsername(response.data.username)
                setPassword(response.data.password)
                setEmail(response.data.email)
                setAge(response.data.age)
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [])

    const navigate = useNavigate()

    const handleUpdate = (e) => {
        e.preventDefault()
        axios.put('http://localhost:3001/update/' + id, { name, username, password, email, age })
            .then(res => {
                console.log(res);
                navigate('/')
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="d-flex vh-100" style={{ backgroundColor: '#cbce91', justifyContent: 'center', alignItems: 'center' }}>
            <div className="w-50 bg-white rounded p-3">
                <form onSubmit={handleUpdate}> 
                    <h2>Update User</h2>
                    <div className="mb-2">
                        <label htmlFor="">Name</label>
                        <input
                            type="text"
                            placeholder="Enter Name"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Username</label>
                        <input
                            type="text"
                            placeholder="Enter Username"
                            className="form-control"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Password</label>
                        <input
                            type="text"
                            placeholder="Enter Password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Email</label>
                        <input
                            type="text"
                            placeholder="Enter Email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Age</label>
                        <input
                            type="text"
                            placeholder="Enter Age"
                            className="form-control"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                        />
                    </div>
                    <button className="btn btn-success" style={{ backgroundColor: '#5a580a', color: '#fff' }}>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateUser;