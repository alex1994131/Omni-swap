import React, { useState, useEffect } from 'react'

import Button from "../components/general/Button";
import DropDown from "../components/general/DropDown";
import Input from "../components/general/Input";

import tokenLogo from '../assets/images/token-logo.png'
import ethLogo from '../assets/images/eth-logo.png'

export default function SwapForm({ }) {

	const [fromAmount, setFromAmount] = useState('')
	const [toAmount, setToAmount] = useState('')
	
	const [fromBalance, setFromBalance] = useState(0)
	const [fromCurrency, setFromCurrency] = useState('ETH')

	const [toBalance, setToBalance] = useState(0)
	const [toCurrency, setToCurrency] = useState('ETH')

	const [exchanceRate, setExchanceRate] = useState('')
	
	const swap_submit = () => {
		alert('aaa');
	}

	const onFromChange = (e) => {
		const re = /^[+-]?\d*(?:[.]\d*)?$/;
		console.log(e.target.value)
		if (e.target.value === "" || re.test(e.target.value)) {
			setFromAmount(e.target.value);
		}
	}

	const onToChange = (e) => {
		const re = /^[+-]?\d*(?:[.]\d*)?$/;
		console.log('we are here!')
		if (e.target.value === "" || re.test(e.target.value)) {
			setToAmount(e.target.value);
		}
	}

	return (
		<form onSubmit={(event) => {}}>
			<h4 className="title">Swap</h4>
			<div className="swap_input_group" style={{ marginBottom: '3px' }}>
				<h6 className="input_title">FROM</h6>
				<div className="d-flex align-items-center justify-content-between" style={{ marginBottom: '9px'}}>
					<DropDown list={[
						{value: 1, label:'ETH', img: ethLogo}, 
						{value: 2, label:'BTC', img: tokenLogo}, 
						{value: 3, label:'LTC', img: ethLogo},
                        {value: 4, label:'SKL', img: ethLogo},
						{value: 5, label:'DAI', img: ethLogo}]} />
					<Input 
						placeHolder={'0.0'}
						align={'right'}
						outline={false}
						value={fromAmount}
						width={'320px'}
						height={'36px'}
						onChange={onFromChange}
					/>
				</div>
				<div className="swap_unit_binance">
					Binance:{fromBalance} {fromCurrency}
				</div>
			</div>
			<div className="swap_input_group">
				<h6 className="input_title">TO</h6>
				<div className="d-flex align-items-center justify-content-between" style={{ marginBottom: '9px'}}>
					<DropDown list={[
						{value: 1, label:'ETH', img: ethLogo}, 
						{value: 2, label:'BTC', img: ethLogo}, 
						{value: 3, label:'LTC', img: ethLogo},
                        {value: 4, label:'SKL', img: ethLogo},
						{value: 5, label:'DAI', img: ethLogo}]} />
					<Input 
						placeHolder={'0.0'}
						align={'right'}
						outline={false}
						value={toAmount}
						width={'320px'}
						height={'36px'}
						onChange={onToChange}
					/>
				</div>
				<div className="swap_unit_binance">
					Binance:{toBalance} {toCurrency}
				</div>
			</div>
			<div className="exchange_rate">
				{exchanceRate && (
					{exchanceRate}
				)}
			</div>
			<div>
				<Button onClick={swap_submit}
					disabled={true}
					bgColor={'primary'}
					textColor={'white'}
					size={'large'}
					iconFlag={false}
					iconContent={''}
					buttonText={'ENTER AN AMOUNT'}
				/>
			</div>
		</form>
	);
}