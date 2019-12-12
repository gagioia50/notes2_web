// Initialize Cloud Firestore through Firebase
const firestore = firebase.firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);

var db = firebase.firestore();

const div_list = document.querySelector("#list_div");
db.collection("notes").orderBy("date", "desc").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {

		const timestamp = doc.data().date;
  		const date = timestamp.toDate();
		var strArray=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		var dateString = date.getDate()  + " " + strArray[date.getMonth()] + " " + date.getFullYear() + " " +
						date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

		div_list.innerHTML += "  <form>";
		div_list.innerHTML += "    <div class='form-group'>";
		div_list.innerHTML += "      <label for='inputTitle'>" + dateString + "</label>";
		div_list.innerHTML += "      <textarea readonly='true' rows='1' class='form-control text-center'"+
										"id='inputTitle'>" + doc.data().title + "</textarea> ";
		div_list.innerHTML += "    </div> ";
		div_list.innerHTML += "    <div class='form-group'>";
		div_list.innerHTML += "      <label for='inputBody'>Corpo della Nota</label>";
		div_list.innerHTML += "      <textarea readonly='true' rows='8' class='form-control' id='inputBody'>" + 
										doc.data().body + "</textarea> ";
		div_list.innerHTML += "    </div>";
		div_list.innerHTML += "    <button class='btn btn-primary edit-note' data-toggle='modal' data-target='#myModal' "+
										"data-id='" + doc.id + "'>Edit Note</button>";
		div_list.innerHTML += "    <button class='btn btn-primary delete-note' data-toggle='modal' data-target='#myDelete' "+
										"data-id='" + doc.id + "'>Delete Note</button>";								
		div_list.innerHTML += "  </form>";
		div_list.innerHTML += "  <div class='divider'></div>";
    });
});

