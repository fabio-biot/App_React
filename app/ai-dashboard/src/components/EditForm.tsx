type CustomerFormProps = {
    name: string
    company: string
}
function EditingForm({name, company} : CustomerFormProps) {
return (
    <div>
        <form>
            <input 
                type="text"
                value={name}
                placeholder="name"
                />
            <input 
                type="text"
                value={company}
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