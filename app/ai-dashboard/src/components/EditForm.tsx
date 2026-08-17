import { useState } from "react"
import "./EditForm.css"

type CustomerFormProps = {
    id: number
    name: string
    company: string
    onSave: (id: number, name: string, company: string) => void
}

function EditingForm({ id, name, company, onSave }: CustomerFormProps) {

  const [editName, setEditName] = useState<string>(name)
  const [editCompany, setEditCompany] = useState<string>(company)

  function handleEditSubmit(event: React.SyntheticEvent) {
    event.preventDefault()

    console.log("Edit form submitted")
    console.log("New name:", editName)
    console.log("New company:", editCompany)
    onSave(id, editName, editCompany)
  }

  return (
    <div className="edit-form">
      <form onSubmit={handleEditSubmit}>
        <input
          type="text"
          value={editName}
          onChange={(event) => setEditName(event.target.value)}
          placeholder="name"
        />

        <br />

        <input
          type="text"
          value={editCompany}
          onChange={(event) => setEditCompany(event.target.value)}
          placeholder="company"
        />

        <button type="submit">
          Submit
        </button>
      </form>
    </div>
  )
}

export default EditingForm