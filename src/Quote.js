import { useState, useEffect } from "react";
const url1 = "https://type.fit/api/quotes";

const Quote = (props) => {
	// console.log("QUOTEPROPS", props);
	const [result1, setResult1] = useState(null);
	const [randomNo, setRandomNo] = useState(0);

	useEffect(() => {
		fetch(url1)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setResult1(data);
				setRandomNo(Math.floor(Math.random() * 99));
				// console.log("DATAquote", data);
			});
	}, [props.timeInformation.x]);
	// console.log("QUOTE DEP",props.timeInformation.x)


	return (
		<div>
			<div className="quote">"{result1 && result1[randomNo].text}"</div>
			<div className="author">{result1 && result1[randomNo].author}</div>
		</div>
	);
};
export default Quote;

// [props.timeInformation.x]
