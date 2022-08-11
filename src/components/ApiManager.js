export const getUsers = (route = "", options = {}) => fetch(`http://localhost:8099/users${route}`, options) 

export const getCustomers = (route = "", options = {}) => fetch(`http://localhost:8099/customers${route}`, options)

export const getEmployees = (route = "", options = {}) => fetch(`http://localhost:8099/employees${route}`, options)

export const getServiceTickets = (route = "", options = {}) => fetch(`http://localhost:8099/serviceTickets${route}`, options)

export const getEmployeeTickets = (route = "", options = {}) => fetch(`http://localhost:8099/employeeTickets${route}`, options)