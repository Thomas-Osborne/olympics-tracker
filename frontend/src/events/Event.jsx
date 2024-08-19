export default function Event(props) {
  return (
    <div key={props.data.id}>
      <h3>{props.data.discipline_name} {props.data.detailed_event_name}</h3>
      <p>Event ID: {props.data.id}</p>
      <p>Date: {props.data.day}</p>
      <p>Name: {props.data.detailed_event_name}</p>
      <p>Sport: {props.data.discipline_name}</p>
      <p>Venue: {props.data.venue_name}</p>
      <p>Is Live: {props.data.is_live}</p>
      <p>Is Medal Event: {props.data.is_medal_event}</p>
      <p>Status: {props.data.status}</p>
    </div>
  )
}