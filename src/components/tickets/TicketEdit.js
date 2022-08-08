import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const TicketEdit = () => {
    // TODO: This state object should not be blank
    const [ticket, setTicket] = useState({
        description: "",
        emergency: false
    })

    //The variable in which the route parameter was stored
    const { ticketId } = useParams()

    const navigate = useNavigate()

    // Get the ticket state from the API.
    useEffect(() => {

        fetch(`http://localhost:8099/serviceTickets/${ticketId}`)
            .then(response => response.json())
            .then(ticketObject => setTicket(ticketObject))

    }, [ticketId])

    const handleSaveButtonClick = (event) => {

        event.preventDefault()

        const putOptions = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ticket)
        }

        //Fetch for the PUT request to replace the object being edited
        fetch(`http://localhost:8099/serviceTickets/${ticketId}`, putOptions)
            .then(() => navigate("/tickets"))

    }

    return (
        <form className="ticketForm">
            <h2 className="ticketForm__title">Edit Service Ticket</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        required autoFocus
                        type="text"
                        style={{
                            height: "10rem"
                        }}
                        className="form-control"
                        value={ticket.description}
                        onChange={
                            (e) => {
                                const ticketCopy = { ...ticket }
                                ticketCopy.description = e.target.value
                                setTicket(ticketCopy)
                            }
                        }>{ticket.description}</textarea>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Emergency:</label>
                    <input type="checkbox"
                        value={ticket.emergency}
                        onChange={
                            (e) => {
                                const ticketCopy = { ...ticket }
                                ticketCopy.emergency = e.target.checked
                                setTicket(ticketCopy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(e) => handleSaveButtonClick(e)}
                className="btn btn-primary">
                Save Edits
            </button>
        </form>
    )
}
