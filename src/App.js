import React, { useState, useEffect } from 'react'

import Header from './layouts/Header'
import Footer from './layouts/Footer'
// import Main from './views/Main'
import SwapForm from './views/SwapForm'
import ClaimForm from './views/ClaimForm'
import './App.css'

export default function App(props) {

	const [swapClaim, setSwapClaim] = useState(true)
	
	let content = ''
	// if (swapClaim) {
	// 	let txStatus;
	// 	switch (txState) {
	// 		case 'onTxHash':
	// 			txStatus = 'Transaction Hash received from Kovan network...';
	// 			break;
	// 		case 'onConfirmation':
	// 			txStatus = 'Confirmation received from Kovan network...';
	// 			break;
	// 		case 'onReceipt':
	// 			txStatus = 'Tx receipt received from Kovan network. See console logs...';
	// 			break;
	// 		case 'onError':
	// 			txStatus = 'Tx error received from Kovan network. Tx reverted...';
	// 			break;
	// 		default:
	// 			txStatus = '';
	// 	}
	// 	content = <div>
	// 		<p id="loader" className="text-center">Loading...</p>
	// 		<br />
	// 		<p className='tx'>{txStatus}</p>
	// 	</div>
	// } else {
	// 	const events = lastReceivedEvent;
	// 	content =
	// 		<div className="row" style={{
	// 			display: "flex",
	// 			justifyContent: "center",
	// 			alignItems: "center"
	// 		}}
	// 		>
	// 			<div className="col-md-6">
	// 				<Main
	// 					ethBalance={ethBalance}
	// 					tokenBalance={tokenBalance}
	// 					buyTokens={this.buyTokens}
	// 					sellTokens={this.sellTokens}
	// 				/>
	// 			</div>
	// 			{/* <div className="col-md-6" >
	// 				<LoadWallet handleClick={this.handleClick} walletLoaded={walletLoaded} />
	// 				<br />
	// 				Last event received fom Kovan:
	// 				<ul>
	// 					{Object.keys(events).map((event, index) => <li key={index}>{event} : {events[event]}</li>)}
	// 				</ul>
	// 			</div> */}
	// 		</div>
	// }

	if(swapClaim) {
		content = <div className="swap_form_container">
			<SwapForm />
		</div>
	}
	else {
		content = <div className="claim_form_container">
			<ClaimForm />
		</div>
	}

	const handleSwitch = () => {
		setSwapClaim(!swapClaim);
	}
	
	return (
		<div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%"}}>
			<Header swapClaim={swapClaim} handleSwitch={handleSwitch} />
			<div className="container-fluid">
				<div className="row">
					<main role="main" className="content col-lg-12 ml-auto mr-auto">
						{content}
					</main>
				</div>
			</div>
			<Footer />
		</div>
	);
}