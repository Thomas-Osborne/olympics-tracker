export default function Venue(props) {
  return (
    <div key={props.data.id}>
      <h3>{props.data.name}</h3>
      <p>Code: {props.data.id}</p>
      <p>URL: <a>{props.data.url}</a></p>
    </div>
  )
}