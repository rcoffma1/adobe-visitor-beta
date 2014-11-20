
window.onload = function() {

	var fileInput = document.getElementById('fileInput');
	var fileDisplayArea = document.getElementById('fileDisplayArea');

	fileInput.addEventListener('change', function(e) {
		var file = fileInput.files[0];
		var textType = /text.*/;

		try {
			if (file.type.match(textType)) {
				var reader = new FileReader();

				reader.onload = function(e) {
					var records = reader.result.split(/[\r\n]+/g);
					var output = ["email,hashid,Attribute1"];
					while (records.length > 0) {
						var record = records.pop().split(',');
						var email = record[0];
						if (email.toLowerCase() != 'email') {
							output.push(email + ',' + window.MD5Hash.hash(email) + ',' + record[1]);
						}
					}
					fileDisplayArea.value = output.join("\n");
				}
				reader.readAsText(file);
			} else {
				fileDisplayArea.value = "File not supported!"
			}
		} catch(exception) {
			fileDisplayArea.value = exception.message;
		}

	});
}