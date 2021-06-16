import React, { useState, useEffect } from 'react'

import Button from "./general/Button";
import '../App.css'
// import { Button } from 'bootstrap';

export default function LoadWallet({ handleClick, walletLoaded }) {
	const [button, setButton] = useState(false)

	var buttonText;
	if (!walletLoaded) {
		buttonText = "Connect Wallet";
	} 
	else {
		buttonText = "Disconnect Wallet";
	}

	return (
		<div>
			<Button onClick={handleClick}
				disabled={false}
				bgColor={'secondary'}
				textColor={'dark'}
				size={'middle'}
				iconFlag={false}
				iconContent={''}
				buttonText={buttonText}
			/>
		</div>
	)
};