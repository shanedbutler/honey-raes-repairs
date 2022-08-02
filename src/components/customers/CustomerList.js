import { useState } from "react";

export const CustomerList = () => {

const [customers, setCustomers] = useState([])

    fetch("http://localhost:8088/users?isStaff=false")
     .then(response => response.json())
     .then(customerArray => setCustomers(customerArray))
     .catch(error => console.error(error))

    return (
        <article className="customers">
        {
            customers.map(customer => {
                return (
                <section className="customer" key={`customer--${customer.id}`}>
                    <div>Name: {customer.fullName}</div>
                    <div>Email: {customer.email}</div>
                </section>
                )
            })
        }
    </article>
    )

} 
