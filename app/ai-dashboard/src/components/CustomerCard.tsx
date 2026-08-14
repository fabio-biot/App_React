type CustomerProps = {
    name: string
    company: string
}

function CustomerCard({name, company} : CustomerProps) {
    return (
        <div>
            <h2>Customer {name}</h2>
            <p>{company}</p>
        </div>
    )
}

export default CustomerCard