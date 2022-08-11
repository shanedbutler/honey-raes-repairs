import { useEffect, useState } from "react"
import { getUsers } from "../ApiManager"
import { Customer } from "./Customer"
import "./CustomerList.css"

export const CustomerList = () => {

    const [customers, setCustomers] = useState([])
    
    useEffect(() => {
        getUsers(`?isStaff=false`)
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
