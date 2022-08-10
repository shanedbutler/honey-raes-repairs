import { Outlet, Route, Routes } from "react-router-dom"
import { CustomerList } from "../customers/CustomerList"
import { EmployeeList } from "../employees/EmployeeList"
import { TicketContainer } from "../tickets/TicketContainer"
import { Profile } from "../profile/Profile"
import { TicketEdit } from "../tickets/TicketEdit"

export const EmployeeViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Honey Rae Repair Shop</h1>
                    <div>Your one-stop-shop to get all your electronics fixed</div>

                    <Outlet />
                </>
            }>

                <Route path="tickets" element={ <TicketContainer /> } />
                <Route path="tickets/:ticketId/edit" element={ <TicketEdit /> } />
                <Route path="employees" element={ <EmployeeList /> } />
                <Route path="customers" element={ <CustomerList /> } />
                <Route path="profile" element={ <Profile /> } />
            </Route>
        </Routes>
    )
}
