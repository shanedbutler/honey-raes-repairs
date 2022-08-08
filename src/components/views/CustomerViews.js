import { Outlet, Route, Routes } from "react-router-dom"
import { Profile } from "../profile/Profile"
import { TicketList } from "../tickets/TicketList"
import { TicketEdit } from "../tickets/TicketEdit"
import { TicketForm } from "../tickets/TicketForm"

export const CustomerViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Honey Rae Repair Shop</h1>
                    <div>Your one-stop-shop to get all your electronics fixed</div>

                    <Outlet />
                </>
            }>

                <Route path="tickets" element={ <TicketList /> } />
                <Route path="tickets/:ticketId/edit" element={ <TicketEdit /> } />
                <Route path="ticket/create" element={ <TicketForm /> } />
                <Route path="profile" element={ <Profile /> } />
            </Route>
        </Routes>
    )
}
