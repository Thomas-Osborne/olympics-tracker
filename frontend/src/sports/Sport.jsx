export default function Sport(props) {
  return (
    <div key={props.data.id}>
      <h3>{props.data.name}</h3>
      <img src={props.data.pictogram_url} alt={props.data.name} width="50" />
    </div>
  )
}