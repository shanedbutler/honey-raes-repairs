import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const TicketForm = () => {
    /*
        Add the correct default properties to the
        initial state object
    */
    const [ticket, setTicket] = useState({
        description: "",
        emergency: false
    })
    /*
        Use the useNavigation() hook so you can redirect
        the user to the ticket list
    */
   const navigate = useNavigate()

    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    const handleSaveButtonClick = (e) => {
        e.preventDefault()

        // TODO: Create the object to be saved to the API

/*         {
            "id": 1,
            "userId": 3,
            "description": "Saepe ex sapiente deserunt et voluptas fugiat vero quasi. Ipsam est non ipsa. Occaecati rerum ipsa consequuntur. Ratione commodi unde sint non rerum. Sit quia et aut sunt.",
            "emergency": false,
            "dateCompleted": "Fri Apr 29 2022 14:02:20 GMT-0500 (Central Daylight Time)"
          }, */
          const ticketToPost = {
            userId: honeyUserObject.id,
            description: ticket.description,
            emergency: ticket.emergency,
            dateCompleted: ""
          }
        // TODO: Perform the fetch() to POST the object to the API
        const postOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ticketToPost)
        }
        return fetch (`http://localhost:8088/serviceTickets`, postOptions)
        .then(response => response.json())
        .then(() => navigate("/tickets"))
    }

    return (
        <form className="ticketForm">
            <h2 className="ticketForm__title">New Service Ticket</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Brief description of problem"
                        value={ticket.description}
                        onChange={
                            (e) => {
                                const ticketCopy = {...ticket}
                                ticketCopy.description = e.target.value
                                setTicket(ticketCopy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Emergency:</label>
                    <input type="checkbox"
                        value={ticket.emergency}
                        onChange={
                            (e) => {
                                const ticketCopy = {...ticket}
                                ticketCopy.emergency = e.target.checked
                                setTicket(ticketCopy)
                            }
                        } />
                </div>
            </fieldset>
            <button className="btn btn-primary" onClick={(e) => handleSaveButtonClick(e)}>
                Submit Ticket
            </button>
        </form>
    )
}
