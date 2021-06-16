import React, { useState } from 'react'
import PropTypes from 'prop-types';
import '../../App.css'

const Switch = ({ swapClaim, handleSwitch }) => {
	return (
		<div className='switch' onClick={() => handleSwitch()}>
			<div className={swapClaim?'active':''}> Swap </div>
			<div className={!swapClaim?'active':''}> Claim </div>
		</div>
	);
};

export default Switch;