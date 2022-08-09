import { Link } from "react-router-dom"

export const TicketCard = ({ ticket, employees, localUser, getAllTickets }) => {

    // Find the assigned employee for the current ticket
    let assignedEmployee = null

    if (ticket.employeeTickets.length) {
        const employeeTicketObject = ticket.employeeTickets[0]
        assignedEmployee = employees.find(employee => employee.id === employeeTicketObject.employeeId)
    }

    const claimTicket = (event) => {
        event.preventDefault()

        // Find the employee object for the current user
        const currentEmployee = employees.find(employee => localUser.id === employee.userId)

        fetch("http://localhost:8099/employeeTickets", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                employeeId: currentEmployee.id,
                serviceTicketId: ticket.id
            })
        })
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

        fetch(`http://localhost:8099/employeeTickets/${ticket.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ticketCopy)
        })
            .then(getAllTickets)
    }

    const closeTicketButton = () => {
        console.log(assignedEmployee?.userId)
        if (localUser.id === assignedEmployee?.userId && ticket.dateCompleted === "") {
            return <button onClick={closeTicket}>Close</button>
        }
        else {
            return ""
        }
    }                                      

    return (
        <section className="ticket">
            <header>
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
            </footer>
        </section>
    )
}
