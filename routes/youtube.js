// @ts-check

//? Requirements
const ytdl = require("ytdl-core");

module.exports = function (app) {
	app.get("/api/youtube/:id", async function (req, res, next) {
		try {
			if (req.hostname != "dsns.dev" && req.hostname != "dsns.test") return next();

			if (!req.params.id) {
				return res.status(400).send("Invalid YouTube Link");
			}

			const videoInfo = await ytdl.getBasicInfo(req.params.id);
			const length = Number(videoInfo["videoDetails"]["lengthSeconds"]);

			if (length > 1800) {
				return res.status(400).send("Video over 30 minutes");
			}

			const fullLink = `https://youtube.com/watch?v=${req.params.id}`;

			res.setHeader("Content-Disposition", `attachment; filename="${req.params.id}.webm"`);
			res.setHeader("Content-Type", "audio/webm");

			ytdl(fullLink, {
				filter: "audioonly",
				quality: "highestaudio"
			}).pipe(res);
		} catch (err) {
			return res.status(400).send("Invalid YouTube Link");
		}
	});

	app.use((req, res, next) => {
		if (req.hostname != "dsns.dev" && req.hostname != "dsns.test") return next();

		res.header("Cross-Origin-Opener-Policy", "same-origin");
		res.header("Cross-Origin-Embedder-Policy", "require-corp");
		next();
	});
};
