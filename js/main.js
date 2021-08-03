window.onload = function () {
	maxClicked = 3;
	maxRuledout = 3;
	$(document).tooltip({
		position: {my: 'center', at: 'bottom+15'}
	});
	table = $('#mainTable');
	createEvidences();
	createGhosts();
	createTable();
	
	$('.rowEvidence').hover(function (e) {
		// e.stopPropagation();
		e.preventDefault();
		$(e.target).closest('tr').find('td').addClass('rowHighlight');
	}, function (e) {
		// e.stopPropagation();
		e.preventDefault();
		$(e.target).closest('tr').find('td').removeClass('rowHighlight');
	});
	
	$('.cellGhosts').hover(function (e) {
		// e.stopPropagation();
		e.preventDefault();
		$('.column' + $(e.target).text()).addClass('columnHighlight');
	}, function (e) {
		// e.stopPropagation();
		e.preventDefault();
		$('.column' + $(e.target).text()).removeClass('columnHighlight');
	})
	
	$('.cellCheck, .cellEvidence').click(function (e) {
		e.stopPropagation();
		e.preventDefault();
		clickEvidence(e);
	})
	
	$('.cellCheck, .cellEvidence').contextmenu(function (e) {
		e.stopPropagation();
		e.preventDefault();
		ruleoutEvidence(e);
	})
}

function createTable() {
	table.append(createGhostsRow(ghosts, 'Ghosts'));
	evidences.forEach(function (e) {
		table.append(createEvidenceRow(e, e.id));
	})
	ghosts.forEach(createGhostInfoRow);
}

function createGhostInfoRow(ghost) {
	var headlineRow = $('<tr>');
	headlineRow.append($('<td>'));
	ghosts.forEach(function (g) {
		headlineRow.append($('<td>').text(ghost.name === g.name ? 'X' : ''));
	})
	table.append(headlineRow);
	var contentRow = $('<tr>').append($('<td colspan="' + ghosts.length + 1 + '" style="white-space: pre-line">').html(ghost.info));
	table.append(contentRow);
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
	var cell = $('<td data-row="' + evidence.id + '" title="' + evidence.info + '" class="' + cl + '">').text(evidence.name);
	return cell;
}

function createEvidenceGhostCell(ghost, evidence) {
	var cl = 'cell' + evidence.id + ' cellCheck column' + ghost.name;
	var cell = $('<td data-row="' + evidence.id + '" class="' + cl + '">')
	if (ghost.evidences.find(function (e) {
		return e.id === evidence.id
	})) cell.text('X');
	return cell;
}