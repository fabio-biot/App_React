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
  return (
    <div>
      <Header title="AI Builder App" corps="Salesforce" />
      <main>
      <br></br>
        <h2>Customers</h2>
        <br></br>
        <h2>Utilisation d'une map</h2>
        <br></br>
        
        {loading && <p>Loading...</p>}
        {error && <ErrorCard errorMessage={`${errorMessage}`} />}

        {customer.map(customer => 
          <CustomerCard
          key={customer.id}
          name={customer.name}
          company={customer.company}
          id={customer.id}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
        )
        }
        <br></br>
        <input type="text"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        />
        <br></br>
        <p>Recherche: {search}</p>
        <br></br>
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
        <br></br>
        <form onSubmit={handleSubmit}>
        <br></br>
        <p>Customer Name:</p>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Customer Name"
          />
          <br></br>
          <p>Company Name:</p>
          <input
            type="text"
            value={company}
            onChange={(event) => setCompany(event.target.value)}
            placeholder="Company Name"
          />
          <br></br>
          {formError && <ErrorCard errorMessage={`${formError}`} />}
          <button type="submit">
            Add Customer
          </button>
        </form>
        {editingId && customerToEdit && (
            <EditingForm
            name={customerToEdit.name}
            company={customerToEdit.company}
            />
            )
          }

      </main>

      <Footer />
    </div>
  )
}

export default App