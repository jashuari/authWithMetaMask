import classes from "./Home.module.css"
import Card from "../UI/Card/Card"

const Home = (props) => {
  return (
    <Card className={classes.home}>
      <h1>Welcome</h1>
      <p>{props.currentAccount}</p>
      <p>Curremt Network: {props.currentNetwork}</p>
      <p>Current Balance: {props.currentBalance}</p>
    </Card>
  )
}

export default Home
