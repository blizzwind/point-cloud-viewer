window.load = function(executablePath,parameters) {
  var child = require("child_process").execFile;
  child(executablePath, parameters, function(err, data) {
    txt = data.toString();
	if (txt == "suc\r\n") {
	  document.getElementById("log").innerHTML = "<span style='color: green;'>Files successfully loaded!</span>";
	  act_mask = true;
	  act_hill = true;
	  act_class = true;
	  act_tif = true;
	} else {
	  document.getElementById("log").innerHTML = "<span style='color: red;'>Please check the input files!</span>";
	}
  });
};
