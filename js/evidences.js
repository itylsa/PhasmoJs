function createEvidences() {
	evidences = [
		{
			id: 'Emf',
			name: 'EMF 5',
			info: ''
		},
		{
			id: 'Fingerprints',
			name: 'Fingerprints',
			info: ''
		},
		{
			id: 'Freeze',
			name: 'Freezing Temps',
			info: ''
		},
		{
			id: 'Orb',
			name: 'Ghost Orb',
			info: ''
		},
		{
			id: 'Book',
			name: 'Ghost Writing',
			info: ''
		},
		{
			id: 'Spiritbox',
			name: 'Spirit Box',
			info: ''
		}
	]
	evidences.forEach(function (e) {
		e.clicked = false;
		e.impossible = false;
		e.ruledout = false;
	})
}

function getEvidence(id) {
	id = id.substr(0, 1).toUpperCase() + id.substr(1, id.length);
	return evidences.find(function (e) {
		return e.id === id;
	})
}

function clickEvidence(e) {
	var clickedEvidence = [];
	evidences.forEach(function (e) {
		if (!e.impossible && e.clicked) clickedEvidence.push(e);
	})
	var eId = e.target.dataset.row;
	var evidence = evidences.find(function (e) {
		return e.id === eId;
	})
	if ((!evidence.impossible || evidence.ruledout) && (clickedEvidence.length < maxClicked || evidence.clicked)) {
		evidence.clicked = !evidence.clicked;
		evidence.ruledout = false;
		checkEvidenceStatus();
		markEvidenceRows('click')
	}
}

function ruleoutEvidence(e) {
	var ruledoutEvidence = [];
	evidences.forEach(function (e) {
		if (e.ruledout) ruledoutEvidence.push(e);
	})
	var eId = e.target.dataset.row;
	var evidence = evidences.find(function (e) {
		return e.id === eId;
	})
	if ((!evidence.impossible || evidence.ruledout) && (ruledoutEvidence.length < maxRuledout || evidence.ruledout)) {
		evidence.ruledout = !evidence.ruledout;
		evidence.clicked = false;
		checkEvidenceStatus();
		markEvidenceRows('ruledout')
	}
}

function checkEvidenceStatus() {
	var clickedEvidence = [], ruledoutEvidence = [];
	evidences.forEach(function (e) {
		if (!e.impossible && e.clicked) clickedEvidence.push(e);
		if (e.ruledout) ruledoutEvidence.push(e);
	})
	checkGhostStatus(clickedEvidence, ruledoutEvidence);
	evidences.forEach(function (e) {
		var possible = false;
		ghosts.forEach(function (g) {
			if (!g.impossible && g.evidences.includes(e)) possible = true;
		})
		e.impossible = !possible;
	})
}

function markEvidenceRows(markType) {
	if (markType === 'click') {
		evidences.forEach(function (e) {
			var row = $('#row' + e.id + ' td');
			if (!e.impossible && e.clicked) row.addClass('clicked').removeClass('ruledout');
			if (!e.clicked) row.removeClass('clicked');
			if (e.impossible) row.addClass('rowImpossible');
			if (!e.impossible) row.removeClass('rowImpossible');
		})
	} else {
		evidences.forEach(function (e) {
			var row = $('#row' + e.id + ' td');
			if (e.ruledout) row.addClass('ruledout').removeClass('clicked');
			if (!e.ruledout) row.removeClass('ruledout');
			if (e.impossible) row.addClass('rowImpossible');
			if (!e.impossible) row.removeClass('rowImpossible');
		})
	}
}