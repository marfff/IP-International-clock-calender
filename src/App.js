import React, { useState, useEffect } from "react";
import "./App.css";
import Time from "./Time";
import Quote from "./Quote";
import Less from "./Less";
import mobileBackgDay from "./images/mobile/bg-image-daytime.jpg";
import desktopBackgDay from "./images/desktop/bg-image-daytime.jpg";
import mobileBackgNight from "./images/mobile/bg-image-nighttime.jpg";
import desktopBackgNight from "./images/desktop/bg-image-nighttime.jpg";

const App = (props) => {
	// console.log(props);
	const [isDaylight, setDaylight] = useState(true);
	const [imageUrl, setImageUrl] = useState("");
	const [showMore, setShowMore] = useState("true");

	const windowWidth = useWindowWidth();

	const timeInformation = Time();

	useEffect(() => {
		if (windowWidth >= 600 && isDaylight) {
			setImageUrl(desktopBackgDay);
		} else if (windowWidth >= 600 && !isDaylight) {
			setImageUrl(desktopBackgNight);
		} else if (windowWidth < 600 && isDaylight) {
			setImageUrl(mobileBackgDay);
		} else if (windowWidth < 600 && !isDaylight) {
			setImageUrl(mobileBackgNight);
		}
	}, [windowWidth, isDaylight]);

	return (
		<div className="App" style={{ backgroundImage: `url(${imageUrl})` }}>
			<div className="App-content">
				<Quote timeInformation={timeInformation} />

				<div className="time">
					<h3 className="greeting">
						<img
							className="iconsun"
							style={{ fill: "red" }}
							src={timeInformation.iconUrl}
						></img>
						{timeInformation.greeting}
					</h3>
					{console.log(timeInformation.iconUrl)}
					<h3 className="timedisplay">{timeInformation.time}</h3>
					<h3 className="abb">{timeInformation.abb}</h3>
					<h3 className="loc">{timeInformation.timezone}</h3>
					<h3>{timeInformation.day}</h3>
					<h3>{timeInformation.dayOfYear}</h3>
					<h3>{timeInformation.weekNumber}</h3>
					<h3>{timeInformation.timezone}</h3>
				</div>

				<button
					className="buttono"
					onClick={(ev) => {
						ev.preventDefault();
						setShowMore(!showMore);
					}}
				>
					MORE v
				</button>
				<button
					className="buttono"
					onClick={(ev) => {
						ev.preventDefault();
						setDaylight(!isDaylight);
					}}
				>
					Change Daylight
				</button>
				{!showMore && (
					<div className="extra">
						<p>
							<Less timeInformation={timeInformation} />
						</p>
					</div>
				)}
			</div>
		</div>
	);
};

const useWindowWidth = () => {
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

	useEffect(() => {
		const handleWindowResize = () => {
			setWindowWidth(window.innerWidth);
		};

		window.addEventListener("resize", handleWindowResize);
		return () => window.removeEventListener("resize", handleWindowResize);
	}, []);

	return windowWidth;
};

// const ChangeDisplay = (props) => {
// 	return (

// 	);
// };

export default App;
