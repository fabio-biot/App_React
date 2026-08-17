import Footer from "./components/Footer"
import Header from "./components/Header"
import CustomerCard from "./components/CustomerCard"
import ErrorCard from "./components/ErrorCard"
import EditingForm from "./components/EditForm"
import { useEffect, useState } from "react"

type Customer = {
  id: number
  name: string
  company: string
}

type APIUser = {
  id: number,
  name: string,
  company: {
    name: string,
  }
}

function App() {
  const [customer, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>("")
  
  const [search, setSearch] = useState<string>("")

  const [name, setName] = useState<string>("")
  const [company, setCompany] = useState<string>("")
  const [newCustomer, setNewCustomer] = useState<Customer>("")
  const [formError, setFormError] = useState<string>("")
  const [editingId, setEditingId] = useState<number | null>(null)




  // useEffect(() => {
  //   fetch("https://jsonplaceholder.typicode.com/users")
  //   .then(response => response.json())
  //   .then((data: APIUser[]) => {
  //   const customers = data.map(user => ({
  //       id: user.id,
  //       name: user.name,
  //       company: user.company.name,
  //   }))
  //   setCustomers(customers)
  // })
  // }, [])

  useEffect(() => {
    async function fecthData() {
      try {
        const rawData = await fetch("https://jsonplaceholder.typicode.com/users")
        if (!rawData.ok) {
          throw new Error(`Error detected: ${rawData.status}`)
        }
        const response = await rawData.json()
        const customers: Customer[] = response.map(user => ({
          id: user.id,
          name: user.name,
          company: user.company.name,
      }))
      setCustomers(customers)
      setError(false)
      setLoading(false)
      } catch (error) {
        if (error instanceof Error) {
          setError(true)
          setLoading(false)
          console.error(
            `Erreur chargement des clients: ${error}`
          )
          setErrorMessage(error.message)
        }
      }
  }
  fecthData()
  
}, [])

function handleSubmit(event: React.SyntheticEvent) {
  event.preventDefault()

  console.log("Form submitted")
  console.log("name --> ", name)
  console.log("company --> ", company)

  if (name.trim() === "" && company.trim() === "") {
    setFormError("Please fill every part of the form")
    return
  }
  else if (name.trim() === "") {
    setFormError("Please fill the field Name of the form")
    return
  }
  else if (company.trim() === "") {
    setFormError("Please fill the field company of the form")
    return
  }
  setFormError("")

  const newCustomer: Customer = {
    id: Date.now(),
    name,
    company
  }
  setCustomers([...customer, newCustomer])
}

const filteredCustomers = customer.filter(customer =>
  customer.name.toLowerCase().trim().includes(search.toLowerCase().trim()) ||
  customer.company.toLowerCase().trim().includes(search.toLowerCase().trim())
)

const customerToEdit = customer.find(customer => customer.id === editingId)

function handleDelete(id: number) {
  setCustomers(customer.filter(customer => customer.id !== id))
  console.log("User id --> ", id, "had been deleted")
}
function handleEdit(id: number) {
  console.log("User id --> ", id, "EDIT REQUEST")
  setEditingId(id)
}
function handleOnSave(id: number, name: string, company: string) {
  console.log("editing cusotmer", {id}, {name}, {company})
  setCustomers(
    customer.map(customer =>
      customer.id === id
        ? { ...customer, name, company }
        : customer
    )
  )
  setEditingId(null)
}


  return (
    <div className="app-container">
      <Header title="AI Builder App" corps="Salesforce" />
      <main className="app-main">
        <section className="customers-section">
          <h2>Customers</h2>
          {loading && <p className="loading-message">Loading...</p>}
          {error && (
            <div className="error-card">
              <ErrorCard errorMessage={`${errorMessage}`} />
            </div>
          )}

          <div className="search-section">
            <input
              type="text"
              className="search-input"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search customers..."
            />
            <p className="search-info">Recherche: {search}</p>
          </div>

          <div className="customers-grid">
            {filteredCustomers.map(user =>
              <CustomerCard
                key={user.id}
                name={user.name}
                company={user.company}
                id={user.id}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            )}
          </div>
        </section>

        <section className="add-customer-section">
          <h3>Add New Customer</h3>
          <form onSubmit={handleSubmit} className="customer-form">
            <div className="form-group">
              <label htmlFor="customer-name" className="form-label">Customer Name:</label>
              <input
                id="customer-name"
                type="text"
                className="form-input"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Enter customer name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="company-name" className="form-label">Company Name:</label>
              <input
                id="company-name"
                type="text"
                className="form-input"
                value={company}
                onChange={(event) => setCompany(event.target.value)}
                placeholder="Enter company name"
              />
            </div>

            {formError && (
              <div className="error-card">
                <ErrorCard errorMessage={`${formError}`} />
              </div>
            )}

            <button type="submit" className="submit-button">
              Add Customer
            </button>
          </form>
        </section>

        {editingId && customerToEdit && (
          <div className="edit-customer-section">
            <h3>Edit Customer</h3>
            <EditingForm
              id={customerToEdit.id}
              name={customerToEdit.name}
              company={customerToEdit.company}
              onSave={handleOnSave}
            />
          </div>
        )}
      </main>

      <footer className="app-footer">
        <Footer />
      </footer>
    </div>
  )
}

export default App