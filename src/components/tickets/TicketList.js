import { useEffect, useState } from "react"
import "./Tickets.css"

const localHoneyUser = localStorage.getItem("honey_user")
const honeyUserObject= JSON.parse(localHoneyUser)

export const TicketList = () => {
    const [tickets, setTickets] = useState([])
    const [filteredTickets, setFilteredTickets] = useState([])

    useEffect(
        () => {
            console.log("Initial state of tickets", tickets) // View the initial state of tickets
            fetch(`http://localhost:8088/serviceTickets`)
                .then(response => response.json())
                .then((ticketArray) => setTickets(ticketArray))
        },
        [] // When this array is empty, you are observing initial component state
    )

    useEffect(
        () => {
            if (honeyUserObject.staff) {
                //for employees, see all tickets
                setFilteredTickets(tickets)
            }
            else {
                //for customers
                const userTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
                setFilteredTickets(userTickets)
            }
        },
        [tickets]
    )
    
    return <>
        <h2>List of Tickets</h2>
        <article className="tickets">
            {
                filteredTickets.map((ticket) => {
                    return <section className="ticket">
                        <header>{ticket.description}</header>
                        <footer>Emergency: {ticket.emergency ? "Yes" : "No"}</footer>
                    </section>
                }
                )
            }
        </article>
    </>
}
