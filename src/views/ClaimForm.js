import React, { useState, useEffect } from 'react'

import Button from "../components/general/Button";
import Input from "../components/general/Input";

export default function ClaimForm({ }) {

	const onChance = () => {

	}
	
	return (
		<div>
			<h4 className="title">Your Airdrops</h4>
			<div className="claim_input_group" style={{ marginBottom: '11px' }}>
				<Input 
					placeHolder={'0.0'}
					align={'center'}
					outline={true}
					value={'1000 RAIN'}
					width={'300px'}
					height={'36px'}
					onChange={onChance}
				/>
				<Button onClick={() => {}}
					disabled={false}
					bgColor={'primary'}
					textColor={'white'}
					size={'small'}
					iconFlag={false}
					iconContent={''}
					buttonText={'CLAIM'}
				/>
			</div>
			<div className="claim_input_group" style={{ marginBottom: '11px' }}>
				<Input 
					placeHolder={'0.0'}
					align={'center'}
					outline={true}
					value={'50 THUNDER'}
					width={'300px'}
					height={'36px'}
					onChange={onChance}
				/>
				<Button onClick={() => {}}
					disabled={true}
					bgColor={'primary'}
					textColor={'white'}
					size={'small'}
					iconFlag={false}
					iconContent={''}
					buttonText={'CLAIMED'}
				/>
			</div>
			<div className="claim_input_group" style={{ marginBottom: '11px' }}>
				<Input 
					placeHolder={'0.0'}
					align={'center'}
					outline={true}
					value={'434 RAIN'}
					width={'300px'}
					height={'36px'}
					onChange={onChance}
				/>
				<Button onClick={() => {}}
					disabled={true}
					bgColor={'primary'}
					textColor={'white'}
					size={'small'}
					iconFlag={false}
					iconContent={''}
					buttonText={'CLAIMED'}
				/>
			</div>
			<div className="claim_input_group" style={{ marginBottom: '11px' }}>
				<Input 
					placeHolder={'0.0'}
					align={'center'}
					outline={true}
					value={'60 FROST'}
					width={'300px'}
					height={'36px'}
					onChange={onChance}
				/>
				<Button onClick={() => {}}
					disabled={true}
					bgColor={'primary'}
					textColor={'white'}
					size={'small'}
					iconFlag={false}
					iconContent={''}
					buttonText={'CLAIMED'}
				/>
			</div>
			<div className="claim_input_group" style={{ marginBottom: '11px' }}>
				<Input 
					placeHolder={'0.0'}
					align={'center'}
					outline={true}
					value={'500 SLEET'}
					width={'300px'}
					height={'36px'}
					onChange={onChance}
				/>
				<Button onClick={() => {}}
					disabled={true}
					bgColor={'primary'}
					textColor={'white'}
					size={'small'}
					iconFlag={false}
					iconContent={''}
					buttonText={'CLAIMED'}
				/>
			</div>
			<div className="claim_input_group" style={{ marginBottom: '11px' }}>
				<Input 
					placeHolder={'0.0'}
					align={'center'}
					outline={true}
					value={'323 VAPOR	'}
					width={'300px'}
					height={'36px'}
					onChange={onChance}
				/>
				<Button onClick={() => {}}
					disabled={true}
					bgColor={'primary'}
					textColor={'white'}
					size={'small'}
					iconFlag={false}
					iconContent={''}
					buttonText={'CLAIMED'}
				/>
			</div>
		</div>
	);
}