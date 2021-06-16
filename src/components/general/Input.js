import React, { useState, useEffect } from 'react'
import '../../App.css'

export default function Input({ placeHolder, align, outline, value, width, height, onChange }) {
	const className = `input-price ${outline? "outline": ""}`

	return (
		<>
			<input type="text" 
				className={className}
				value={value}
				placeholder={placeHolder} 
				style={{ textAlign: `${align}`, width: `${width}`, height: `${height}` }}
				onChange={onChange} />
		</>
	)
};
