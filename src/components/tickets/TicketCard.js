import { Link } from "react-router-dom"
import { getEmployeeTickets, getServiceTickets } from "../ApiManager"

export const TicketCard = ({ ticket, employees, localUser, getAllTickets }) => {

    // Find the assigned employee for the current ticket
    let assignedEmployee = null

    if (ticket.employeeTickets.length) {
        const employeeTicketObject = ticket.employeeTickets[0]
        assignedEmployee = employees.find(employee => employee.id === employeeTicketObject.employeeId)
    }

    // Find the employee object for the current user
    const currentEmployee = employees.find(employee => localUser.id === employee.userId)

    const claimTicket = (event) => {
        event.preventDefault()

        const postOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                employeeId: currentEmployee.id,
                serviceTicketId: ticket.id
            })
        }

        getEmployeeTickets("", postOptions)
            .then(getAllTickets)

    }

    // Render the button only if user is staff
    const claimTicketButton = () => {
        if (localUser.staff) {
            return (
                <button onClick={(e) => claimTicket(e)}>
                    Claim
                </button>
            )
        }
    }

    const closeTicket = () => {

        const ticketCopy = { ...ticket }
        // Remove the the expanded property
        delete ticketCopy.employeeTickets
        ticketCopy.dateCompleted = new Date()
        
        const putOptions = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ticketCopy)
        }

        getServiceTickets(`/${ticket.id}`, putOptions)
            .then(getAllTickets)
    }

    const closeTicketButton = () => {

        if (localUser.id === assignedEmployee?.userId && ticket.dateCompleted === "") {
            return <button className="ticket-close--button" onClick={closeTicket}>Close</button>
        }
        else {
            return ""
        }
    }

    const deleteTicket = () => {

        const deleteOptions = {method: "DELETE"}

        if (!localUser.staff) {
            getServiceTickets(`/${ticket.id}`, deleteOptions)
                .then(getAllTickets)
        }

        else {
            return ""
        }
    }

    const deleteTicketButton = () => {

        if (!localUser.staff) {
            return <button className="ticket-delete--button" onClick={deleteTicket}>Cancel</button>
        }
        else {
            return ""
        }
    }

    return (
        <section className="ticket">
            <header className="ticket-header">
                {
                    localUser.staff
                        ? `Ticket ${ticket.id}`
                        : <Link to={`/tickets/${ticket.id}/edit`}>Ticket {ticket.id}</Link>
                }
            </header>
            <section>{ticket.description}</section>
            <section>Emergency: {ticket.emergency ? "Yes" : "No"}</section>
            <footer>
                <hr />
                {
                    ticket.employeeTickets.length
                        ? `Currently assigned to ${assignedEmployee ? assignedEmployee?.user?.fullName : ""}`
                        : claimTicketButton()
                }
                {
                    closeTicketButton()
                }
                <div>
                    {
                        deleteTicketButton()
                    }
                </div>
            </footer>
        </section>
    )
}
