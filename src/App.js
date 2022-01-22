import { useState, useEffect } from "react"
import Home from "./components/Home/Home"
import Login from "./components/Login/Login"
import { ethers } from "ethers"

import Web3 from "web3"

function App() {
  const [isConnected, setIsConntected] = useState(false)
  const [currentAccount, setCurrentAccount] = useState(null)
  const [userBalance, setUserBalance] = useState(null)
  const [chainId, setChainId] = useState(null)
  const [provider, setProvider] = useState(window.ethereum)
  const [web3, setWeb3] = useState(null)

  const NETWORKS = {
    1: "Ethereum",
    3: "Ropsten",
    4: "Rinkeby",
    5: "Goerli",
    42: "Kovan",
    56: "Binance Smart Chain",
    137: "Polygon",
  }

  const onLogin = async (provider) => {
    const web3 = new Web3(provider)
    const accounts = await web3.eth.getAccounts()
    const chainId = await web3.eth.getChainId()

    if (accounts.length === 0) {
      console.log("Please connect to MetaMask")
    } else if (accounts[0] !== currentAccount) {
      setProvider(provider)
      setWeb3(web3)
      setChainId(chainId)
      setCurrentAccount(accounts[0])
      setIsConntected(true)
      getCurrentBalance(accounts[0])
    }
  }

  useEffect(() => {
    ;(async function () {
      const web3 = new Web3(provider)
      const accounts = await web3.eth.getAccounts()
      const chainId = await web3.eth.getChainId()

      if (accounts.length === 0) {
        console.log("Please connect to MetaMask")
      } else if (accounts[0] !== currentAccount) {
        setProvider(provider)
        setWeb3(web3)
        setChainId(chainId)
        setCurrentAccount(accounts[0])
        setIsConntected(true)
        getCurrentBalance(accounts[0])
      }
    })()
    const handleAccountsChanged = async (accounts) => {
      if (accounts.length === 0) {
        onLogout()
      } else if (accounts[0] !== currentAccount) {
        setCurrentAccount(accounts[0])
        getCurrentBalance(accounts[0])
      }
    }
    const handleChainChanged = async (chainId) => {
      const web3ChainId = await web3.eth.getChainId()
      setChainId(web3ChainId)
      getCurrentBalance(currentAccount)
      window.location.reload()
    }

    if (isConnected) {
      provider.on("accountsChanged", handleAccountsChanged)
      provider.on("chainChanged", handleChainChanged)
    }
    return () => {
      if (isConnected) {
        provider.removeListener("accountsChanged", handleAccountsChanged)
        provider.removeListener("chainChanged", handleChainChanged)
      }
    }
  }, [isConnected])

  const onLogout = () => {
    setIsConntected(false)
    setCurrentAccount(null)
  }

  const getCurrentNetwork = (chainId) => {
    return NETWORKS[chainId]
  }

  const getCurrentBalance = (address) => {
    provider
      .request({ method: "eth_getBalance", params: [address, "latest"] })
      .then((balance) => {
        const gweiValue = ethers.utils.formatUnits(balance, "wei")
        setUserBalance(ethers.utils.formatEther(gweiValue))
      })
  }

  return (
    <div>
      <header className="main-header">
        <h1>Authentication With MetaMask</h1>
        <nav className="nav">
          <ul>
            <li>
              <a onClick={onLogout}> {currentAccount}</a>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        {!isConnected && <Login onLogin={onLogin} onLogout={onLogout} />}
        {isConnected && (
          <Home
            currentAccount={currentAccount}
            currentNetwork={getCurrentNetwork(chainId)}
            currentBalance={userBalance}
          />
        )}
      </main>
    </div>
  )
}

export default App
