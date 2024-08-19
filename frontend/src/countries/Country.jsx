export default function Country(props) {
  return (
    <div key={props.data.id}>
      <h3>{props.data.name}</h3>
      <img src={props.data.flag_url} alt={props.data.name} width="30" />
      <p>Continent: {props.data.continent}</p>
      <p>Gold Medals: {props.data.gold_medals}</p>
      <p>Silver Medals: {props.data.silver_medals}</p>
      <p>Bronze Medals: {props.data.bronze_medals}</p>
      <p>Total Medals: {props.data.total_medals}</p>
      <p>Rank: {props.data.rank}</p>
      <p>Total Medals Rank: {props.data.rank_total_medals}</p>
    </div>
  )
}