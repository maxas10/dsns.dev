if (window.DeviceOrientationEvent) {
	const alphaElem = document.getElementById("alpha");
	const betaElem = document.getElementById("beta");
	const gammaElem = document.getElementById("gamma");

	const indicatorElem = document.getElementById("indicator");
	const rulerImg = document.getElementById("ruler");

	window.addEventListener(
		"deviceorientation",
		function () {
			console.log("Accelerometer: " + event.alpha, event.beta, event.gamma);

			if (!event.beta) {
				alert("Sorry, your browser doesn't support x-axis rotation sensor.");
				return;
			}

			alphaElem.innerHTML = event.alpha;
			betaElem.innerHTML = event.beta;
			gammaElem.innerHTML = event.gamma;

			if (event.beta <= 1 && event.beta >= -1) {
				//? Landscape Left
				indicatorElem.style = "background-color: #00ff00";
			} else if (event.beta >= 89 && event.beta <= 91) {
				//? Portrait
				indicatorElem.style = "background-color: #00ff00";
			} else if (event.beta <= -89 && event.beta >= -91) {
				//? Portrait Upside Down
				indicatorElem.style = "background-color: #00ff00";
			} else if (event.beta <= -179 && event.beta >= -181) {
				//? Landscape Right
				indicatorElem.style = "background-color: #00ff00";
			} else {
				indicatorElem.style = "background-color: #FFFFFF";
			}

			rulerImg.style.transform = `rotate(${event.beta}deg)`;
		},
		true
	);
} else {
	alert("Sorry, your browser doesn't support Device Orientation");
}