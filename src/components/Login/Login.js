import { useState, useEffect } from "react"
import classes from "./Login.module.css"
import Card from "../UI/Card/Card"

const Login = (props) => {
  const [isConneting, setIsConnecting] = useState(false)
  const [provider, setProvider] = useState(window.ethereum)
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false)

  useEffect(() => {
    setProvider(detectProvider())
  }, [])

  useEffect(() => {
    if (provider) {
      if (provider !== window.ethereum) {
        console.error(
          "Not window.ethereum provider. Do you have multiple wallet?"
        )
      }
      setIsMetaMaskInstalled(true)
    }
  }, [provider])

  const detectProvider = () => {
    let provider
    if (window.ethereum) {
      provider = window.ethereum
    } else if (window.web3) {
      provider = window.web3.currentProvider
    } else {
      console.warn("No MetaMask detected! Check out MetaMask")
    }
    return provider
  }
  const onLoginHandler = async () => {
    setIsConnecting(true)
    await provider.request({
      method: "eth_requestAccounts",
    })
    setIsConnecting(false)
    props.onLogin(provider)
  }

  return (
    <Card className={classes.login}>
      {isMetaMaskInstalled && (
        <button
          onClick={onLoginHandler}
          className={classes.button}
          type="button"
        >
          {!isConneting && "Connect"}
          {isConneting && "Loading..."}
        </button>
      )}
      {!isMetaMaskInstalled && (
        <p>
          Please install MetaMask - <a href="https://metamask.io/"> MetaMask</a>
        </p>
      )}
    </Card>
  )
}

export default Login
