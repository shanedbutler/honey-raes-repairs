import React, { useEffect, useState } from "react"
import { getCustomers } from "../ApiManager"

export const CustomerDetails = ({ customerObject }) => {

    const [customersDetails, setCustomersDetails] = useState([])

    useEffect(() => {
        getCustomers()
            .then(response => response.json())
            .then(detailsArray => setCustomersDetails(detailsArray))
    }, [])

    return customersDetails.map((customerDetail => {

        if (customerObject.id === customerDetail.userId) {
            return (
                <React.Fragment key={`customer--details${customerObject.id}`}>
                    <div>Address: {customerDetail.address}</div>
                    <div>Phone: {customerDetail.phoneNumber}</div>
                </React.Fragment>
            )
        }
    }))

}
