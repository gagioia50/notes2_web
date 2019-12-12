jQuery(document).ready(function() {
	$.backstretch("mare.jpg");

	var edit_doc_id;
	var delete_doc_id;
	var title;
	var noteBody;

	$(document).on("click", ".add-note", function () {
		$('#header-title').text("Nuova Nota");
		$('#input-title').val("");
		$('#textarea-body').val("");
		$('.save-changes').hide();
		$('.save-note').show();
	});

	$(document).on("click", ".edit-note", function () {
		edit_doc_id = $(this).data('id');
		var docRef = db.collection("notes").doc(edit_doc_id);
		docRef.get().then(function(doc) {
		    if (doc.exists) {
		        title = doc.data().title;
		        noteBody = doc.data().body;
		        $('#header-title').text("Edit della Nota");
		        $('#input-title').val(title);
		        $('#textarea-body').val(noteBody);
		        $('.save-note').hide();
		        $('.save-changes').show();
		    } 
		})
	});

	$(document).on("click", ".delete-note", function () {
		delete_doc_id = $(this).data('id');
		var docRef = db.collection("notes").doc(delete_doc_id);
		docRef.get().then(function(doc) {
		    if (doc.exists) {
		        title = doc.data().title;
		        $('#para-delete').text("Vuoi cancellare "+"'"+title+"' ?");
		    } 
		})
	});

	$(document).on("click", ".yes-delete", function () {
		db.collection("notes").doc(delete_doc_id).delete().then(function() {
			window.location.reload();
		});	
	});

	$(document).on("click", ".save-note", function () {
		var date = new Date();
		var strArray=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		var dateString = date.getDate()  + " " + strArray[date.getMonth()] + " " + date.getFullYear() + " " +
						date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
		var title = $('#input-title').val();
		var body = $('#textarea-body').val();

		if (title == "" || body == "") {
			alert("Invalid title or body");
			return;
		}

		db.collection("notes").add({
			body: body,
			date: new Date(dateString),
			title: title
		})
		.then(function() {
    		window.location.reload();
		});
		
	});


	$(document).on("click", ".save-changes", function () {
		var date = new Date();
		var strArray=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		var dateString = date.getDate()  + " " + strArray[date.getMonth()] + " " + date.getFullYear() + " " +
						date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
		var title = $('#input-title').val();
		var body = $('#textarea-body').val();

		if (title == "" || body == "") {
			alert("Invalid title or body");
			return;
		}

		db.collection("notes").doc(edit_doc_id).set({
			body: body,
			date: new Date(dateString),
			title: title
		})
		.then(function() {
    		window.location.reload();
		});
	});

	
});