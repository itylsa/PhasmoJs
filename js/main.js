window.onload = function () {
	$(document).tooltip({
		position: {my: 'center', at: 'bottom+15'}
	});
	table = $('#mainTable');
	createEvidences();
	createGhosts();
	createTable();
	
	$('.cellEvidence').hover(function (e) {
		e.stopPropagation();
		e.preventDefault();
		$(e.target).addClass('cellEvidenceHighlight');
	}, function (e) {
		e.stopPropagation();
		e.preventDefault();
		$(e.target).removeClass('cellEvidenceHighlight');
	});
	
	$('.cellCheck').hover(function (e) {
		e.stopPropagation();
		e.preventDefault();
		$('.cell' + e.target.dataset.row).addClass('rowEvidenceHighlight');
	}, function (e) {
		e.stopPropagation();
		e.preventDefault();
		$('.cell' + e.target.dataset.row).removeClass('rowEvidenceHighlight');
	});
	
	$('.cellGhosts').hover(function (e) {
		e.stopPropagation();
		e.preventDefault();
		$('.column' + $(e.target).text()).addClass('columnGhostHighlight');
	}, function (e) {
		e.stopPropagation();
		e.preventDefault();
		$('.column' + $(e.target).text()).removeClass('columnGhostHighlight');
	})
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

function createGhostsCell(ghost, name) {
	var cl = 'cell' + name + ' column' + ghost.name;
	var cell = $('<td title="' + ghost.info + '" id="cell' + ghost.name + '" class="' + cl + '">').text(ghost.name);
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
	var cell = $('<td title="' + evidence.info + '" class="' + cl + '">').text(evidence.name);
	return cell;
}

function createEvidenceGhostCell(ghost, evidence) {
	var cl = 'cell' + evidence.id + ' cellCheck column' + ghost.name;
	var cell = $('<td data-row="' + evidence.id + '" class="' + cl + '">')
	if(ghost.evidences.find(function (e) {return e.id === evidence.id})) cell.text('X');
	return cell;
}
