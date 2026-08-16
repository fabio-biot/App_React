type CustomerProps = {
    name: string
    company: string
    id: number
    onDelete: (id: number) => void
    onEdit: (id: number) => void
}

function CustomerCard({name, company, id, onDelete, onEdit} : CustomerProps) {
    return (
        <div>
            <h2>Customer {name}</h2>
            <p>{company}</p>

            <button onClick={() => onDelete(id)}>
                Delete
            </button>
            <button onClick={() => onEdit(id)}>
                Edit
            </button>
        </div>
    )
}

export default CustomerCard