function createEvidences() {
	evidences = [
		{
			id: 'Emf',
			name: 'EMF 5',
			clicked: false,
			info: ''
		},
		{
			id: 'Fingerprints',
			name: 'Fingerprints',
			clicked: false,
			info: ''
		},
		{
			id: 'Freeze',
			name: 'Freezing Temps',
			clicked: false,
			info: ''
		},
		{
			id: 'Orb',
			name: 'Ghost Orb',
			clicked: false,
			info: ''
		},
		{
			id: 'Book',
			name: 'Ghost Writing',
			clicked: false,
			info: ''
		},
		{
			id: 'Spiritbox',
			name: 'Spirit Box',
			clicked: false,
			info: ''
		}
	]
}

function getEvidence(id) {
	id = id.substr(0,1).toUpperCase() + id.substr(1, id.length);
	return evidences.find(function (e) {
		return e.id === id;
	})
}