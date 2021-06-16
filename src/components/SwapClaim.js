import React, { useState, useEffect } from 'react'

import Switch from "./general/Switch";
import '../App.css'

export default function SwapClaim({swapClaim, handleSwitch}) {
	return (
		<div>
			<Switch swapClaim={swapClaim} handleSwitch={handleSwitch} />
		</div>
	)
};