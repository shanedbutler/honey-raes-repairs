import { useEffect, useState } from "react"
import { Customer } from "./Customer"
import "./CustomerList.css"

export const CustomerList = () => {

    const [customers, setCustomers] = useState([])
    
    useEffect(() => {
        fetch("http://localhost:8099/users?isStaff=false")
            .then(response => response.json())
            .then(customerArray => setCustomers(customerArray))
    }, []);

    return (
        <section className="customers">
            {
                customers.map(customer => {
                    return (
                        <Customer key={customer.id} customerObject={customer} />
                    )
                })
            }
        </section>
    )

} 
