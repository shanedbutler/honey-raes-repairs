import { useState } from "react"
import { CustomerDetails } from "./CustomerDetails"

export const Customer = ({ customerObject }) => {

    const [showDetails, setShowDetails] = useState(false)

    const toggleDetails = (showDetails) => {
        if (showDetails) {
            setShowDetails(false)
        } else {
            setShowDetails(true)
        }
    }

    return (
        <section className="customer" key={`customer--${customerObject.id}`}>
            <div onClick={() => toggleDetails(showDetails)}>
                <div>Name: {customerObject.fullName}</div>
                <div>Email: {customerObject.email}</div>
                {showDetails ? <CustomerDetails customerObject={customerObject} /> : null}
            </div>
        </section>
    )
}
