import { useState } from "react"
import classes from "./Login.module.css"
import Card from "../UI/Card/Card"

const Login = (props) => {
  const [isConneting, setIsConnecting] = useState(false)

  const detectProvicer = () => {
    let provider
    if (window.ethereum) {
      provider = window.ethereum
    } else if (window.web3) {
      provider = window.web3.currentProvider
    } else {
      window.alert("No Ethereum browser detected! Check out MetaMask")
    }
    return provider
  }
  const onLoginHandler = async () => {
    const provider = detectProvicer()
    if (provider) {
      if (provider !== window.ethereum) {
        console.error(
          "Not window.ethereum provider. Do you have multiple wallet?"
        )
      }
      setIsConnecting(true)
      await provider.request({
        method: "eth_requestAccounts",
      })
      setIsConnecting(false)
      props.onLogin(provider)
    }
  }

  return (
    <Card className={classes.login}>
      <button onClick={onLoginHandler} className={classes.button} type="button">
        {!isConneting && "Connect"}
        {isConneting && "Loading..."}
      </button>
    </Card>
  )
}

export default Login
