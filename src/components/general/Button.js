import React, { useState, useEffect } from 'react'
import '../../App.css'

export default function Button({ onClick, disabled, bgColor, textColor, size, iconFlag, iconContent, buttonText }) {
	const className = `${size? size: ""} ${bgColor? bgColor: ""} ${textColor? textColor: ""}`

	return (
		<div>
			<button className={className}
				onClick={() => onClick()}
				disabled={disabled?true:false}
			>
				{buttonText}
			</button>
		</div>
	)
};
