import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const CustomerForm = ({ localUser }) => {

    const navigate = useNavigate()

    // Provide initial state for customers profile
    const [profile, setProfile] = useState({
        address: "",
        phoneNumber: "",
        userId: 0
    })

    // Get customers profile info from API and update state
    useEffect(() => {
        fetch(`http://localhost:8099/customers?userId=${localUser.id}`)
         .then(response => response.json())
         .then(customerArray => setProfile(customerArray[0]) ) //set to 1st (only) object in array
        
    }, [])

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        /* fetch call and nav back to products
            The PUT fetch() call here to update the profile.
            Navigate user to home page when done.
        */
            fetch(`http://localhost:8099/customers/${profile.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(profile)
            })
                .then(() => navigate("/"))
        }
    

    return (
        <form className="profile">
            <h2 className="profile__title">Edit Profile</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone: </label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={profile.phoneNumber}
                        onChange={
                            (evt) => {
                                // Update phoneNumber property
                                const editedProfile = { ...profile }
                                editedProfile.phoneNumber = evt.target.value
                                setProfile(editedProfile)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Address:</label>
                    <input type="text"
                        className="form-control"
                        value={profile.address}
                        onChange={
                            (evt) => {
                            //Update address property
                            const editedProfile = { ...profile }
                            editedProfile.address = evt.target.value
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
