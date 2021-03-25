import React, { useState, useEffect } from "react";
import "./App.css";

const Less = (props) => {
	// console.log("PROPS INTO LESS", props);
	return (
		<div className="less">
			<div className="lessinner">
				<div className="extraleft">
					<p class="headings">CURRENT TIME ZONE</p>
					<p class="headings">DAY OF THE YEAR</p>
					<p class="headings">DAY OF THE WEEK</p>
					<p class="headings">WEEK NUMBER</p>
				</div>
				<div className="extraright">
					<p class="headings">{props.timeInformation.timezone}</p>
					<p class="headings">{props.timeInformation.dayOfYear}</p>
					<p class="headings">{props.timeInformation.day}</p>
					<p class="headings">{props.timeInformation.weekNumber}</p>
				</div>
			</div>
		</div>
	);
};

export default Less;
