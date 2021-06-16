import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import '../../App.css'

export default function DropDown({ list }) {

	const [isOpen, setIsOpen] = useState(false)
	const [labelItem, setLabelItem] = useState([])
	const [labelImg,  setLabelImg] = useState([])
	
	useEffect(() => {
		const { label } = list[0];
		const { img } = list[0];
		let firstItem = label;
		let firstImg = img;
		setLabelItem(firstItem)
		setLabelImg(firstImg)
	}, []);

	const showDropdown = () => {
		setIsOpen(true)
		document.addEventListener("click", hideDropdown);
	};

	const hideDropdown = (event) => {
		let	ignore = document.getElementById('receive_dropdown')
		if (ignore.contains(event.target) && isOpen)
			return
		setIsOpen(false);
		document.removeEventListener("click", hideDropdown);
	};

	const chooseItem = (label, img) => {
		if (labelItem !== label) {
			setLabelItem(label)
			setLabelImg(img)
		}
	};
	
	const renderDataDropDown = (item, index) => {
		const { value, label, img } = item;
		return (
			<li
				key={index}
				value={value}
				onClick={() => chooseItem(label, img)}
			>
				<a><span><img src={img} alt="logo"/></span>{label}</a>
			</li>
		)
	};
	
	return (
		<div className={`dropdown ${isOpen ? 'open' : ''}`}>
			<button className="dropdown-toggle" type="button" onClick={() => showDropdown() } id = "receive_dropdown">
				<span><img src={labelImg} alt='coin' /></span>
				{ labelItem }
				<span className="caret"></span>
			</button>
			<ul className="dropdown-menu">
				{list.map(renderDataDropDown)}
			</ul>
		</div>
	)
};
