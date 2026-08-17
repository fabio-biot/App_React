import "./Header.css"

type HeaderProps = {
    title: string
    corps: string
}
function Header(props: HeaderProps) {
    return (
        <header className="app-header">
        <h1>{props.title}</h1>
        <h2>{props.corps}</h2>
        <p>Header projet Salesforce AI Builder</p>
        </header>
    )
}
export default Header