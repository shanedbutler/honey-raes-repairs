import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getEmployees } from "../ApiManager"

export const EmployeeForm = ({ localUser }) => {

    const navigate = useNavigate()

    // Provide initial state for employees profile
    const [profile, setProfile] = useState({
        specialty: "",
        rate: 0,
        userId: 0
    })

    // Get employees profile info from API and update state
    useEffect(() => {
        getEmployees(`?userId=${localUser.id}`)
         .then(response => response.json())
         .then(employeeArray => setProfile(employeeArray[0]) ) //set to 1st (only) object in array
        
    }, [])

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const putOptions = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(profile)
        }
        /* 
            The PUT fetch() call here to update the profile.
            Navigate user to home page when done.
        */
            getEmployees(`/${profile.id}`, putOptions)
                .then(() => navigate("/"))
        }
    

    return (
        <form className="profile">
            <h2 className="profile__title">Edit Profile</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="specialty">Specialty: </label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={profile.specialty}
                        onChange={
                            (evt) => {
                                // Update specialty property
                                const editedProfile = { ...profile }
                                editedProfile.specialty = evt.target.value
                                setProfile(editedProfile)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="rate">Hourly rate: </label>
                    <input type="number"
                        className="form-control"
                        value={profile.rate}
                        onChange={
                            (evt) => {
                            //Update rate property
                            const editedProfile = { ...profile }
                            editedProfile.rate = parseFloat(evt.target.value, 2)
                            setProfile(editedProfile)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Save Profile
            </button>
        </form>
    )
}
