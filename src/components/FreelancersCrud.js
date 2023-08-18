import axios from "axios";
import { useEffect, useState } from "react";

function FreelancerCrud() {
    const [id, setId] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [skillsets, setSkillsets] = useState("");
    const [hobby, setHobby] = useState("");
    const [freelancers, setUsers] = useState([]);

    useEffect(() => {
        (async () => await Load())();
    }, []);

    async function Load() {

        const result = await axios.get("https://localhost:7284/api/Freelancers/GetFreelancer");
        setUsers(result.data);
        console.log(result.data);
    }

    async function save(event) {
        setIsEditing(false);
        event.preventDefault();
        try {

            if (username == "" || !email || !phoneNo || !skillsets || !hobby) {
                alert("Please fill in all required fields.");
                return;
            } else {
                await axios.post("https://localhost:7284/api/Freelancers/AddFreelancer", {

                    username: username,
                    email: email,
                    phoneNo: phoneNo,
                    skillsets: skillsets,
                    hobby: hobby,

                });

                alert("Register Successfully!");
                setId("");
                setUsername("");
                setEmail("");
                setPhoneNo("");
                setSkillsets("");
                setHobby("");


                Load();
            }
        } catch (err) {
            alert(err);
        }
    }
    async function editFreelancer(freelancers) {
        setShowDiv(true);
        setIsEditing(true);

        setUsername(freelancers.username);
        setEmail(freelancers.email);
        setPhoneNo(freelancers.phoneNo);
        setSkillsets(freelancers.skillsets);
        setHobby(freelancers.hobby);

        setId(freelancers.id);
    }

    async function DeleteFreelancer(id) {
        await axios.delete("https://localhost:7284/api/Freelancers/DeleteFreelancer/" + id);
        alert("Deleted Successfully!");
        setId("");
        setUsername("");
        setEmail("");
        setPhoneNo("");
        setSkillsets("");
        setHobby("");
        Load();
    }

    async function update(event) {
        event.preventDefault();
        try {
            await axios.patch("https://localhost:7284/api/Freelancers/UpdateFreelancer/" + freelancers.find((u) => u.id === id).id || id,
                {
                    id: id,
                    username: username,
                    email: email,
                    phoneNo: phoneNo,
                    skillsets: skillsets,
                    hobby: hobby,
                }
            );
            alert("Updated Successfully!");
            setId("");
            setUsername("");
            setEmail("");
            setPhoneNo("");
            setSkillsets("");
            setHobby("");

            setShowDiv(false);
            Load();
        } catch (err) {
            alert(err);
        }

    }

    //To hide or shown the details of freelancer
    const [showCreateUser, setShowDiv] = useState(false);

    const toggleDiv = () => {
        setShowDiv(!showCreateUser);
        setId("");
        setUsername("");
        setEmail("");
        setPhoneNo("");
        setSkillsets("");
        setHobby("");
    };

    const hideDiv = () => {
        setShowDiv(!showCreateUser);
        setIsEditing(false);
        setEmailValid(true);
    };

    //To check is in editting mode
    // Initialize isEditing state
    const [isEditing, setIsEditing] = useState(false);

    //Validate email
    const [isEmailValid, setEmailValid] = useState(true); // Default to true, assuming the initial email is valid

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return (
        <div>
            <div className="app-container">
                <div className="background-image">
                    {!showCreateUser && (
                        <div style={{ width: '480px', height: '500px', border: '1px solid black', marginLeft: '68%', backgroundColor: 'gray', borderRadius: '5px' }}>
                            <p style={{ marginLeft: '150px', fontSize: '40px', marginTop: '80px' }}>New User?</p>
                            <p style={{ marginLeft: '130px', fontSize: '40px', marginTop: '-15px' }}>Register here</p>
                            <button className="create-user-button" onClick={toggleDiv}>
                                Create New User
                            </button>
                        </div>

                    )}
                    {showCreateUser && <div className="my-div">
                        <h1 style={{ textAlign: 'center' }}>Freelancer Details</h1>
                        <div className="container mt-4">
                            <form>
                                <div className="form-group">

                                    <input
                                        type="text"
                                        className="form-control"
                                        id="id"
                                        hidden
                                        value={id}
                                        onChange={(event) => {
                                            setId(event.target.value);
                                        }}
                                    />
                                    <label>Username<span style={{ color: 'red' }}>*</span></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        style={{ width: '350px' }}
                                        id="username"
                                        value={username}
                                        onChange={(event) => {
                                            setUsername(event.target.value);
                                        }}
                                        maxLength={35}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email<span style={{ color: 'red' }}>*</span></label>
                                    <input
                                        type="text"
                                        className={`form-control ${isEmailValid ? '' : 'is-invalid'}`}
                                        style={{ width: '350px' }}
                                        id="email"
                                        value={email}
                                        onChange={(event) => {
                                            const newEmail = event.target.value;
                                            setEmail(newEmail);
                                            setEmailValid(emailRegex.test(newEmail)); // Validate email using regex
                                        }}
                                    />
                                    {!isEmailValid && (
                                        <div className="invalid-feedback">
                                            Please enter a valid email address.
                                        </div>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label>Phone Number<span style={{ color: 'red' }}>*</span></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        style={{ width: '350px' }}
                                        id="phoneNo"
                                        value={phoneNo}
                                        onChange={(event) => {
                                            setPhoneNo(event.target.value);
                                        }}
                                        maxLength={11}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Skill sets<span style={{ color: 'red' }}>*</span></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        style={{ width: '350px' }}
                                        id="skillsets"
                                        value={skillsets}
                                        onChange={(event) => {
                                            setSkillsets(event.target.value);
                                        }}

                                    />
                                </div>
                                <div className="form-group">
                                    <label>Hobby<span style={{ color: 'red' }}>*</span></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        style={{ width: '350px' }}
                                        id="hobby"
                                        value={hobby}
                                        onChange={(event) => {
                                            setHobby(event.target.value);
                                        }}

                                    />
                                </div>
                                <div>
                                    {isEditing ? (
                                        <div>
                                            <button className="btn btn-secondary mt-4" onClick={hideDiv}>
                                                Cancel
                                            </button>
                                            <button className="btn btn-warning mt-4" onClick={update} style={{ marginLeft: '200px' }}>
                                                Update
                                            </button>
                                        </div>
                                    ) : (
                                        <div>
                                            <button className="btn btn-secondary mt-4" onClick={hideDiv}>
                                                Cancel
                                            </button>
                                            <button className="btn btn-primary mt-4" onClick={save} style={{ marginLeft: '200px' }}>
                                                Register
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </form>
                        </div></div>}
                </div>

            </div>

            <br></br>
            <h2 style={{ textAlign: 'center', marginBottom: '30px', fontSize:'37px', textDecoration: 'underline' }}>List of Freelancers</h2>
            <table className="table table-dark" align="center">
                <thead>
                    <tr style={{ textAlign: 'center' }}>
                        <th scope="col">Id</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone Number</th>
                        <th scope="col">Skill sets</th>
                        <th scope="col">Hobby</th>
                        <th scope="col">Options</th>
                    </tr>
                </thead>
                <tbody style={{ textAlign: 'center' }}>
                    {freelancers.map(function fn(freelancer) {
                        return (
                            <tr key={freelancer.id}>
                                <th scope="row">{freelancer.id}</th>
                                <td>{freelancer.username}</td>
                                <td>{freelancer.email}</td>
                                <td>{freelancer.phoneNo}</td>
                                <td style={{ maxWidth: '200px', whiteSpace:'normal',wordWrap: 'break-word' }}>{freelancer.skillsets}</td>
                                <td style={{ maxWidth: '200px', whiteSpace:'normal',wordWrap: 'break-word' }}>{freelancer.hobby}</td>
                                <td style={{ verticalAlign: 'middle' }}>
                                    <button
                                        type="button"
                                        className="btn btn-warning"
                                        onClick={() => {
                                            editFreelancer(freelancer);
                                            window.scrollTo(0, 0); // Scroll to the top of the page
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={() => DeleteFreelancer(freelancer.id)}
                                        style={{ marginLeft: '10px' }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>


        </div>
    );
}

export default FreelancerCrud;