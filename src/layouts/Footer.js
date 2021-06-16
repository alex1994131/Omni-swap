import React from 'react'

export default function Footer() {
	return (
		<div className="footer d-flex align-items-center justify-content-end">
			<div className="footer-text">
				<span className="text-success">Block Number</span>
			</div>
			<div className="footer-mark">
				<span className="badge bg-success badge-dot" style={{ display: "block" }}></span>
			</div>
		</div>
	);
};