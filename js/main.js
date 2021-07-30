window.onload = function () {
	table = $('#mainTable');
	createEvidences();
	createGhosts();
	createTable();
}

function createTable() {
	table.append(createGhostsRow(ghosts, 'Ghosts'));
	evidences.forEach(function (e) {
		table.append(createEvidenceRow(e, e.id));
	})
}

function createGhostsRow(ghosts, name) {
	var id = 'row' + name;
	var row = $('<tr id="' + id + '">')
	row.append($('<td>'));
	ghosts.forEach(function (g) {
		row.append(createGhostsCell(g, name))
	})
	return row;
}

function createGhostsCell(value, name) {
	var cl = 'cell' + name;
	var cell = $('<td id="cell' + value.name + '" class="' + cl + '">').text(value.name);
	return cell;
}

function createEvidenceRow(evidence, name) {
	var id = 'row' + name;
	var row = $('<tr id="' + id + '" class="rowEvidence">');
	row.append(createEvidenceCell(evidence, name))
	ghosts.forEach(function (g) {
		row.append(createEvidenceGhostCell(g, evidence));
	})
	return row;
}

function createEvidenceCell(evidence, name) {
	var cl = 'cell' + name + ' cellEvidence';
	var cell = $('<td class="' + cl + '">').text(evidence.name);
	return cell;
}

function createEvidenceGhostCell(ghost, evidence) {
	var cell = $('<td class="cell' + evidence.id + ' cellCheck">')
	if(ghost.evidences.find(function (e) {return e.id === evidence.id})) cell.text('X');
	return cell;
}
