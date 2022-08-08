import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./Tickets.css"

export const TicketList = ({ searchTermState }) => {

    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject= JSON.parse(localHoneyUser)

    const navigate = useNavigate()
    
    
    const [tickets, setTickets] = useState([])
    const [filteredTickets, setFilteredTickets] = useState([])
    const [emergency, setEmergency] = useState(false)
    const [completed, setCompleted] = useState(false)

    useEffect(() => { //filter tickets by search term passed in via props
        const searchedTickets = tickets.filter(ticket => ticket.description.toLowerCase().startsWith(searchTermState.toLowerCase()))
        setFilteredTickets(searchedTickets)
    }, [searchTermState])

    useEffect( //filter tickets by emergencies
        () => {
            if (emergency) {
                const emergencyTickets = tickets.filter(ticket => ticket.emergency === true)
                setFilteredTickets(emergencyTickets)
            }
            else {
                setFilteredTickets(tickets)
            }
        }, [emergency]
        )

    useEffect( //filter tickets by completed
        () => {
            if (completed) {
                const completedTickets = tickets.filter(ticket => {
                    return ticket.userId === honeyUserObject.id && ticket.dateCompleted === ""
                })
                setFilteredTickets(completedTickets)
            }
            else {
                setFilteredTickets(tickets)
            }
        }, [completed]
        )

    useEffect( //fetch data from json-server
        () => {
            fetch(`http://localhost:8099/serviceTickets`)
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
        }, [tickets]
        )
    
    return <>
        {
            honeyUserObject.staff ?
                <>
                    <button onClick={() => setEmergency(true)}>Emergencies Only</button>
                    <button onClick={() => setEmergency(false)}>All tickets</button>
                </>
                :
                <>
                    <button onClick={() => navigate("/ticket/create")}>Create Ticket</button>
                    <button onClick={() => setCompleted(true)}>My Open Tickets</button>
                    <button onClick={() => setCompleted(false)}>All My Tickets</button>
                </>
        }
        <h2>List of Tickets</h2>
        <article className="tickets">
            {
                filteredTickets.map((ticket) => {
                    return <section className="ticket" key={ticket.id}>
                        <header>
                            <Link to={`/tickets/${ticket.id}/edit`}>Ticket {ticket.id}</Link>
                        </header>
                        <section>{ticket.description}</section>
                        <footer>Emergency: {ticket.emergency ? "Yes" : "No"}</footer>
                    </section>
                }
                )
            }
        </article>
    </>
}


{/* <header>
    <Link to={`/tickets/${}/edit`}>Ticket {ticket.id}</Link>
</header>
<section>{ticket.description}</section>
<footer>Emergency: {ticket.emergency ? "🧨" : "No"}</footer> */}