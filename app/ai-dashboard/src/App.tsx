import Footer from "./components/Footer"
import Header from "./components/Header"
import CustomerCard from "./components/CustomerCard"
import { useEffect, useState } from "react"

type Customer = {
  id: number
  name: string
  company: string
}


function App() {
  const [customer, setcustomers] = useState<Customer[]>([])


  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => response.json())
    .then(data => {
      console.log(data)
    const customers = data.map(user => ({
        id: user.id,
        name: user.name,
        company: user.company.name,
    }))
    setcustomers(customers)
  })
  }, [])
  return (
    <div>
      <Header title="AI Builder App" corps="Salesforce" />

      <main>
        <h2>Customers</h2>
      
        <p>avec une map</p>
        {customer.map(customer => 
          < CustomerCard
            key={customer.id}
            name={customer.name}
            company={customer.company}
            />
        )}
      </main>

      <Footer />
    </div>
  )
}

export default App