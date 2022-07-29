import { useEffect, useState } from "react"
import "./Tickets.css"

const localHoneyUser = localStorage.getItem("honey_user")
const honeyUserObject= JSON.parse(localHoneyUser)

export const TicketList = () => {
    const [tickets, setTickets] = useState([])
    const [filteredTickets, setFilteredTickets] = useState([])
    const [emergency, setEmergency] = useState(false)

    useEffect( //filter tickets by emergencies
        () => {
            if (emergency) {
                const emergencyTickets = tickets.filter(ticket => ticket.emergency === true)
                setFilteredTickets(emergencyTickets)
            }
            else {
                setFilteredTickets(tickets)
            }
        }, [emergency])

    useEffect( //fetch data from json-server
        () => {
            fetch(`http://localhost:8088/serviceTickets`)
                .then(response => response.json())
                .then((ticketArray) => setTickets(ticketArray))
        }, []) // When this array is empty, you are observing initial component state

    useEffect( //check if user is employee & filter tickets for given user
        () => {
            if (honeyUserObject.staff) {
                //for employees to see all tickets
                setFilteredTickets(tickets)
            }
            else {
                //for customers to see only their tickets
                const userTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
                setFilteredTickets(userTickets)
            }
        }, [tickets])
    
    return <>
        {
            honeyUserObject.staff ?
            <>
                <button onClick={() => setEmergency(true)}>Emergencies Only</button>
                <button onClick={() => setEmergency(false)}>All tickets</button>
            </>
                : ""
        }
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
