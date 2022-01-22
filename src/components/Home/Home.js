import classes from "./Home.module.css"
import Card from "../UI/Card/Card"

const Home = (props) => {
  return (
    <Card className={classes.home}>
      <h1>Welcome</h1>
      <p>{props.currentAccount}</p>
    </Card>
  )
}

export default Home
