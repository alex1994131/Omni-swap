import React, { useState, useEffect } from 'react'
import Web3 from 'web3'
import Token from '../abis/Token.json'
import EthSwap from '../abis/EthSwap.json'
import Identicon from 'identicon.js';

import LoadWallet from '../components/LoadWallet'
import SwapClaim from '../components/SwapClaim'
import LogoSvg from '../assets/images/logo.svg'

export default function Header({ swapClaim, handleSwitch }) {
	const [account, setAccount] = useState('')
	const [token, setToken] = useState({})
	const [ethSwap, setEthSwap] = useState({})
	const [ethBalance, setEthBalance] = useState(0)
	const [tokenBalance, setTokenBalance] = useState(0)
	const [walletLoaded, setWalletLoaded] = useState(false)
	const [txState, setTxState] = useState('')
	const [web3Socket, setWeb3Socket] = useState({})
	const [ethSwapWebSocket, setEthSwapWebSocket] = useState({})
	const [lastReceivedEvent, setLastReceivedEvent] = useState({'Event' : 'no event'})


	const buyTokens = async (etherAmount) => {
		await ethSwap.methods.buyTokens().send({ value: etherAmount, from: account })
			.on('transactionHash', (hash) => {
				setTxState('onTxHash');
			})
			.on('confirmation', async (confirmationNumber, receipt) => {
				setTxState('onConfirmation');
				const web3 = window.web3
				const ethBalance = await web3.eth.getBalance(account)
				let tokenBalance = await token.methods.balanceOf(account).call()
				setEthBalance(ethBalance)
				setTokenBalance(tokenBalance.toString())
				console.log("BuyTokens.on.Confirmation: ConfirmationNumber: " + confirmationNumber + " -> Receip.events: " + JSON.stringify(receipt))
			})

		setTxState('')
	}

	const sellTokens = async (tokenAmount) => {
		console.log("ethSwap.address: " + ethSwap.address)
		await token.methods.approve(ethSwap.options.address, tokenAmount).send({ from: account })
			.on('transactionHash', async (hash) => {
				setTxState('onTxHash')
				await ethSwap.methods.sellTokens(tokenAmount).send({ from: account })
					.on('transactionHash', (hash) => {
						setTxState('onTxHash');
					})
					.on('confirmation', async (confirmationNumber, receipt) => {
						setTxState('onConfirmation');
						const web3 = window.web3
						const ethBalance = await web3.eth.getBalance(account)
						let tokenBalance = await token.methods.balanceOf(account).call()
						setEthBalance(ethBalance)
						setTokenBalance(tokenBalance.toString())
						console.log("SellTokens.on.Confirmation: ConfirmationNumber: " + confirmationNumber + " -> Receip.events: " + JSON.stringify(receipt))
					})
				setTxState('')
			})
	}

	const loadWallet = async() => {
		await this.loadWeb3()
		await this.loadBlockchainData()
		await this.loadEthSwapWebSocket();

		//subscribe to event TokenPurchased 
		await ethSwapWebSocket.events.TokensPurchased({})
			.on('data', async (event) => {
				let amount = event.returnValues._value.toString()
				window.alert('ARG Token purchased: ' + window.web3.utils.fromWei(amount, 'Ether'))
				console.log('ARG TokenPurchase tx confirmed \n')
				console.log('From account: ', event.returnValues._from.toString())
				console.log('Amount in ARG: ', window.web3.utils.fromWei(amount, 'Ether'))
				setLastReceivedEvent(event.returnValues)
				console.log(event.returnValues)
			})
			.on('error', (error) => {
				setLastReceivedEvent(error);
				console.log(error);
			})

		//subscribe to event TokenSold
		await ethSwapWebSocket.events.TokensSold({})
			.on('data', async (event) => {
				let amount = event.returnValues._value.toString()
				window.alert('ARG Token Sold: ' + window.web3.utils.fromWei(amount, 'Ether'))
				console.log('ARG TokenPurchase tx confirmed \n')
				console.log('From account: ', event.returnValues._from.toString())
				console.log('Amount in ARG: ', window.web3.utils.fromWei(amount, 'Ether'))
				setLastReceivedEvent(event.returnValues)
				console.log(event.returnValues)
			})
			.on('error', (error) => {
				setLastReceivedEvent(error)
				console.log(error);
			})
	}

	//Load EthSwap instance via infura webSocket API
	const loadEthSwapWebSocket = async() => {
		const URL = `wss://kovan.infura.io/ws/v3/${process.env.REACT_APP_INFURA_APIKEY}`
		let web3Socket = new Web3(new Web3.providers.WebsocketProvider(URL));

		if (web3Socket) {
			const web3 = window.web3
			const networkId = await web3.eth.net.getId()
			const ethSwapWebSocketData = EthSwap.networks[networkId]
			if (ethSwapWebSocketData) {
				const ethSwapWebSocket = await new web3Socket.eth.Contract(EthSwap.abi, ethSwapWebSocketData.address)
				setEthSwapWebSocket(ethSwapWebSocket)
			} else {
				window.alert('EthSwap contract not deployed to detected network.')
			}
		} else {
			window.alert('Could not establish web socket connection to infura')
		}
	}

	//Load EthSwap and ARG token instances via Metamask web3
	const loadBlockchainData = async() => {
		const web3 = window.web3
		const accounts = await web3.eth.getAccounts()
		setAccount(accounts[0])
		const ethBalance = await web3.eth.getBalance(account)
		setEthBalance(ethBalance)

		// Load ARG Token
		const networkId = await web3.eth.net.getId()
		const tokenData = Token.networks[networkId]
		if (tokenData) {
			const token = new web3.eth.Contract(Token.abi, tokenData.address)
			setToken(token)
			let tokenBalance = await token.methods.balanceOf(account).call()
			setTokenBalance(tokenBalance.toString())
			console.log("ARG Token address: ", tokenData.address)
		} else {
			window.alert('Token contract not deployed to detected network.')
		}

		// Load EthSwap
		const ethSwapData = await EthSwap.networks[networkId]
		if (ethSwapData) {
			const ethSwap = new web3.eth.Contract(EthSwap.abi, ethSwapData.address)
			setEthSwap(ethSwap)
			console.log('ethSwap.options.address:' + ethSwap.options.address)
		} else {
			window.alert('EthSwap contract not deployed to detected network.')
		}
	}

	const loadWeb3 = async() => {
		if (window.ethereum) {
			window.web3 = new Web3(window.ethereum);
			//window.web3 = new Web3("http://localhost:8545")
			//window.web3 = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:8545'))
			
			await window.ethereum.enable();
			await window.ethereum.on('accountsChanged', async () => {
				const accounts = await window.web3.eth.getAccounts();
				setAccount(accounts)
			})
			setWalletLoaded(true)
		}
		else {
			window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
			setWalletLoaded(false)
		}

	}

	const handleClick = async() => {
		if (!walletLoaded) {
			await loadWallet();
		} else {
			setWalletLoaded(false);
		}
		console.log('TypeOf: ', typeof lastReceivedEvent)
	}

	return (
		<div className="header d-flex justify-content-between">
			<div className="logo">
				<a href="#" rel="noopener noreferrer">
					<img src={LogoSvg} alt="logo"/>
				</a>
			</div>
			<SwapClaim swapClaim={swapClaim} handleSwitch={handleSwitch} />
			<LoadWallet handleClick={handleClick} walletLoaded={walletLoaded} />
		</div>
	);
}