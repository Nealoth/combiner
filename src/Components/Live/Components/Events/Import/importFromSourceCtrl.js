module.exports = function (sources, sourcesIDs) {
	console.log(sources, sourcesIDs);
	this.sources = sources.map(function (source, index) {
		return {
			id: sourcesIDs[index],
			name: source
		}
	});
	
	console.log(this.sources);
};