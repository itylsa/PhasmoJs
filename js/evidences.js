function createEvidences() {
	evidences = [
		{
			id: 'Emf',
			name: 'EMF 5',
			clicked: false
		},
		{
			id: 'Fingerprints',
			name: 'Fingerprints',
			clicked: false
		},
		{
			id: 'Freeze',
			name: 'Freezing Temps',
			clicked: false
		},
		{
			id: 'Orb',
			name: 'Ghost Orb',
			clicked: false
		},
		{
			id: 'Book',
			name: 'Ghost Writing',
			clicked: false
		},
		{
			id: 'Spiritbox',
			name: 'Spirit Box',
			clicked: false
		}
	]
}

function getEvidence(id) {
	id = id.substr(0,1).toUpperCase() + id.substr(1, id.length);
	return evidences.find(function (e) {
		return e.id === id;
	})
}