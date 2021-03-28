import "./App.css";
import { useState, useEffect } from "react";

const Less = (props) => {
	const [daycolor, setdaycolor] = useState("--grey");
	const [daybackround, setdaybackground] = useState("white");

	useEffect(() => {
		if (props.isDayLight == true) {
			setdaycolor("var(--nearblack)");
			setdaybackground("var(--grey)");
		} else if (props.isDayLight == false) {
			setdaycolor("white");
			setdaybackground("var(--nearblack)");
		}
	}, []);

	return (
		<div
			className="less"
			style={{ color: daycolor, backgroundColor: daybackround }}
		>
			<div className="lessinner">
				<div className="extraleft">
					<p className="headings">TIME ZONE</p>
					<p className="headings">DAY OF THE YEAR</p>
					<p className="headings">DAY OF THE WEEK</p>
					<p className="headings">WEEK NUMBER</p>
				</div>
				<div className="extraright">
					<p className="headings">{props.timeInformation.timezone}</p>
					<p className="headings">
						{props.timeInformation.dayOfYear}
					</p>
					<p className="headings">{props.timeInformation.day}</p>
					<p className="headings">
						{props.timeInformation.weekNumber}
					</p>
				</div>
			</div>
		</div>
	);
};

export default Less;
