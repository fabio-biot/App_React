import "./CustomerCard.css"

type CustomerProps = {
    name: string
    company: string
    id: number
    onDelete: (id: number) => void
    onEdit: (id: number) => void
}

function CustomerCard({name, company, id, onDelete, onEdit} : CustomerProps) {
    return (
        <div className="customer-card">
            <h2>Customer {name}</h2>
            <p>{company}</p>

            <div className="button-group">
                <button className="delete-button" onClick={() => onDelete(id)}>
                    Delete
                </button>
                <button className="edit-button" onClick={() => onEdit(id)}>
                    Edit
                </button>
            </div>
        </div>
    )
}

export default CustomerCard