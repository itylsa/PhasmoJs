function createGhosts() {
	ghosts = [
		{
			name: 'Banshee',
			evidences: [getEvidence('emf'), getEvidence('fingerprints'), getEvidence('freeze')],
			info: 'asd'
		},
		{
			name: 'Demon',
			evidences: [getEvidence('freeze'), getEvidence('book'), getEvidence('spiritbox')],
			info: ''
		},
		{
			name: 'Hantu',
			evidences: [getEvidence('fingerprints'), getEvidence('orb'), getEvidence('book')],
			info: ''
		},
		{
			name: 'Jinn',
			evidences: [getEvidence('emf'), getEvidence('orb'), getEvidence('spiritbox')],
			info: ''
		},
		{
			name: 'Mare',
			evidences: [getEvidence('freeze'), getEvidence('orb'), getEvidence('spiritbox')],
			info: ''
		},
		{
			name: 'Oni',
			evidences: [getEvidence('emf'), getEvidence('book'), getEvidence('spiritbox')],
			info: ''
		},
		{
			name: 'Phantom',
			evidences: [getEvidence('emf'), getEvidence('freeze'), getEvidence('orb')],
			info: ''
		},
		{
			name: 'Poltergeist',
			evidences: [getEvidence('fingerprints'), getEvidence('orb'), getEvidence('spiritbox')],
			info: ''
		},
		{
			name: 'Revenant',
			evidences: [getEvidence('emf'), getEvidence('fingerprints'), getEvidence('book')],
			info: ''
		},
		{
			name: 'Shade',
			evidences: [getEvidence('emf'), getEvidence('orb'), getEvidence('book')],
			info: ''
		},
		{
			name: 'Spirit',
			evidences: [getEvidence('fingerprints'), getEvidence('book'), getEvidence('spiritbox')],
			info: ''
		},
		{
			name: 'Wraith',
			evidences: [getEvidence('fingerprints'), getEvidence('freeze'), getEvidence('spiritbox')],
			info: ''
		},
		{
			name: 'Yokai',
			evidences: [getEvidence('orb'), getEvidence('book'), getEvidence('spiritbox')],
			info: ''
		},
		{
			name: 'Yurei',
			evidences: [getEvidence('freeze'), getEvidence('orb'), getEvidence('book')],
			info: ''
		}
	]
	ghosts.forEach(function (g) {
		g.impossible = false;
		g.found = false;
	})
}

function checkGhostStatus(clickedEvidence, ruledoutEvidence) {
	$('#mainTable td').removeClass('columnFound');
	ghosts.forEach(function (g) {
		var hasAllEvidence = clickedEvidence.every(e => g.evidences.includes(e));
		var hasRuledoutEvidence = ruledoutEvidence.some(e => g.evidences.includes(e));
		if (!hasAllEvidence || hasRuledoutEvidence) {
			$('.column' + g.name).addClass('columnImpossible');
			g.impossible = true;
		} else if ((hasAllEvidence || clickedEvidence.length === 0) && !hasRuledoutEvidence) {
			g.impossible = false;
			if (clickedEvidence.length === maxClicked) {
				g.found = true;
				$('.column' + g.name).addClass('columnFound');
			}
			$('.column' + g.name).removeClass('columnImpossible');
		}
		if (clickedEvidence < 3)ghosts.forEach(g => g.found = false);
	})
}