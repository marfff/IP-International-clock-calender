import "./App.css";
import { useState, useEffect } from "react";

const Less = (props) => {
	const [daycolor, setdaycolor] = useState("--grey");
	const [daybackround, setdaybackground] = useState("white");
	// ("INCPROPS", props)console.log;

	useEffect(() => {
		if (props.isDayLight === true) {
			setdaycolor("var(--nearblack)");
			setdaybackground("var(--grey)");
		} else if (props.isDayLight === false) {
			setdaycolor("white");
			setdaybackground("var(--nearblack)");
		}
	}, [props.isDayLight]);

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
					<p className="headings">LATITUDE</p>
					<p className="headings">LONGITUDE</p>
					<p className="headings">IP ADDRESS</p>
					<p className="headings">DIALLING CODE</p>
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
					{/* {console.log("HENRY",props.extra.latitude)} */}
					<p className="headings">{props.extra.latitude.latitude}</p>
					<p className="headings">
						{props.extra.longitude.longitude}
					</p>
					<p className="headings">{props.extra.ipis.ipis}</p>
					<p className="headings">
						{props.extra.telcode.telcode}
					</p>{" "}
				</div>
			</div>
			<div class="footer"></div>
		</div>
	);
};

export default Less;
