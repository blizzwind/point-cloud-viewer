var act_mask = false;
var act_class = false;
var act_tif = false;
var act_hill = false;
var initx = 0;
var inity = 0;
var t_x = 0;
var t_y = 0;

function l() {
  document.getElementById("modal").innerHTML = "Load<br><br><div class='btn' onclick='las()'>LAS</div><input id='inplas' class='non' type='file' accept='.las' onchange='chglas()'><a id='las'></a><br><div class='btn' onclick='tif()'>TIF</div><input id='inptif' class='non' type='file' accept='.tif' onchange='chgtif()'><a id='tif'></a><br><br><div class='btn' onclick='ll()'>Load</div><div class='btn' onclick='c()'>Close</div><a id='log'></a>";
  document.getElementById("modal").style.display = "block";
}

function tif() {
  document.getElementById("inptif").click();
}

function las() {
  document.getElementById("inplas").click();
}

function chgtif() {
  document.getElementById("tif").innerHTML = document.getElementById("inptif").files[0].path;
}

function chglas() {
  document.getElementById("las").innerHTML = document.getElementById("inplas").files[0].path;
}

function ll() {
  if (document.getElementById("las").innerHTML == "" || document.getElementById("tif").innerHTML == "") {
	document.getElementById("log").innerHTML = "<span style='color: red;'>Please enter the right input!</span>";
  } else {
    var executablePath = "~\\..\\src\\load.exe";
	var parameters = [document.getElementById("las").innerHTML,document.getElementById("tif").innerHTML];
	document.getElementById("log").innerHTML = "<span style='color: blue;'>Files are loading. Please wait ...</span>";
	window.load(executablePath,parameters);
  }
}

function c() {
  document.getElementById("modal").style.display = "none";
  document.getElementById("modal").innerHTML = "";
}

var s0 = function(sketch) {
  sketch.setup = function() {
    let canvas = sketch.createCanvas(sketch.windowWidth/2, (sketch.windowHeight-20)/2, sketch.WEBGL);
    canvas.position(0,20);
    canvas.background(255);
	img_mask = sketch.loadImage("def/def.png");
  }
  sketch.draw = function() {
    sketch.cursor(sketch.CROSS);
	sketch.stroke(sketch.color("#0f0"));
	sketch.noFill();
	sketch.strokeWeight(5);
	if (sketch.mouseX <= sketch.windowWidth && sketch.mouseX >= sketch.windowWidth/2 && sketch.mouseY <= (sketch.windowHeight-20)/2 && sketch.mouseY >= 0) {
	  sketch.background(255);
	  sketch.circle(sketch.mouseX-(sketch.windowWidth/2)-(sketch.windowWidth/4), sketch.mouseY-(sketch.windowHeight-20)/4, 25);
	} else if (sketch.mouseX <= sketch.windowWidth/2 && sketch.mouseX >= 0 && sketch.mouseY <= sketch.windowHeight-20 && sketch.mouseY >= (sketch.windowHeight-20)/2) {
	  sketch.background(255);
	  sketch.circle(sketch.mouseX-(sketch.windowWidth/4), sketch.mouseY-(sketch.windowHeight-20)/2-(sketch.windowHeight-20)/4, 25);
	} else if (sketch.mouseX <= sketch.windowWidth && sketch.mouseX >= sketch.windowWidth/2 && sketch.mouseY <= sketch.windowHeight-20 && sketch.mouseY >= (sketch.windowHeight-20)/2) {
	  sketch.background(255);
	  sketch.circle(sketch.mouseX-(sketch.windowWidth/2)-(sketch.windowWidth/4), sketch.mouseY-(sketch.windowHeight-20)/2-(sketch.windowHeight-20)/4, 25);
	} else {
	  sketch.background(255);
	}
	if (act_mask == true) {
	  img_mask = sketch.loadImage("tmp/dtm.png");
	  act_mask = false;
	}
    sketch.image(img_mask,0+t_x+initx,0+t_y+inity);
  }
};
new p5(s0);
var s1 = function(sketch) {
  sketch.setup = function() {
    let canvas = sketch.createCanvas(sketch.windowWidth/2, (sketch.windowHeight-20)/2, sketch.WEBGL);
    canvas.position(sketch.windowWidth/2,20);
    canvas.background(255);
	img_hill = sketch.loadImage("def/def.png");
  }
  sketch.draw = function() {
    sketch.cursor(sketch.CROSS);
	sketch.stroke(sketch.color("#0f0"));
	sketch.noFill();
	sketch.strokeWeight(5);
	if (sketch.mouseX <= 0 && sketch.mouseX >= -sketch.windowWidth/2 && sketch.mouseY <= (sketch.windowHeight-20)/2 && sketch.mouseY >= 0) {
	  sketch.background(255);
	  sketch.circle(sketch.mouseX+(sketch.windowWidth/2)-(sketch.windowWidth/4), sketch.mouseY-(sketch.windowHeight-20)/4, 25);
	} else if (sketch.mouseX <= 0 && sketch.mouseX >= -sketch.windowWidth/2 && sketch.mouseY <= sketch.windowHeight-20 && sketch.mouseY >= (sketch.windowHeight-20)/2) {
	  sketch.background(255);
	  sketch.circle(sketch.mouseX+(sketch.windowWidth/2)-(sketch.windowWidth/4), sketch.mouseY-(sketch.windowHeight-20)/2-(sketch.windowHeight-20)/4, 25);
	} else if (sketch.mouseX <= sketch.windowWidth/2 && sketch.mouseX >= 0 && sketch.mouseY <= sketch.windowHeight-20 && sketch.mouseY >= (sketch.windowHeight-20)/2) {
	  sketch.background(255);
	  sketch.circle(sketch.mouseX-(sketch.windowWidth/4), sketch.mouseY-(sketch.windowHeight-20)/2-(sketch.windowHeight-20)/4, 25);
	} else {
	  sketch.background(255);
	}
	if (act_hill == true) {
	  img_hill = sketch.loadImage("tmp/dsm.png");
	  act_hill = false;
	}
	sketch.image(img_hill,0+t_x+initx,0+t_y+inity);
  }
};
new p5(s1);
var s2 = function(sketch) {
  sketch.setup = function() {
    let canvas = sketch.createCanvas(sketch.windowWidth/2, (sketch.windowHeight-20)/2, sketch.WEBGL);
    canvas.position(0,(sketch.windowHeight-20)/2 + 20);
    canvas.background(255);
	img_class = sketch.loadImage("def/def.png");
  }
  sketch.draw = function() {
    sketch.cursor(sketch.CROSS);
	sketch.stroke(sketch.color("#0f0"));
	sketch.noFill();
	sketch.strokeWeight(5);
	if (sketch.mouseX <= sketch.windowWidth/2 && sketch.mouseX >= 0 && sketch.mouseY <= 0 && sketch.mouseY >= -(sketch.windowHeight-20)/2) {
	  sketch.background(255);
	  sketch.circle(sketch.mouseX-(sketch.windowWidth/4), sketch.mouseY+(sketch.windowHeight-20)/2-(sketch.windowHeight-20)/4, 25);
	} else if (sketch.mouseX <= sketch.windowWidth && sketch.mouseX >= sketch.windowWidth/2 && sketch.mouseY <= 0 && sketch.mouseY >= -(sketch.windowHeight-20)/2) {
	  sketch.background(255);
	  sketch.circle(sketch.mouseX-(sketch.windowWidth/2)-(sketch.windowWidth/4), sketch.mouseY+(sketch.windowHeight-20)/2-(sketch.windowHeight-20)/4, 25);
	} else if (sketch.mouseX <= sketch.windowWidth && sketch.mouseX >= sketch.windowWidth/2 && sketch.mouseY <= (sketch.windowHeight-20)/2 && sketch.mouseY >= 0) {
	  sketch.background(255);
	  sketch.circle(sketch.mouseX-(sketch.windowWidth/2)-(sketch.windowWidth/4), sketch.mouseY-(sketch.windowHeight-20)/4, 25);
	} else {
	  sketch.background(255);
	}
	if (act_class == true) {
	  img_class = sketch.loadImage("tmp/class.png");
	  act_class = false;
	}
	sketch.image(img_class,0+t_x+initx,0+t_y+inity);
  }
};
new p5(s2);
var s3 = function(sketch) {
  sketch.setup = function() {
    let canvas = sketch.createCanvas(sketch.windowWidth/2, (sketch.windowHeight-20)/2, sketch.WEBGL);
    canvas.position(sketch.windowWidth/2,(sketch.windowHeight-20)/2 + 20);
    canvas.background(255);
	img_tif = sketch.loadImage("def/def.png");
  }
  sketch.draw = function() {
    sketch.cursor(sketch.CROSS);
	sketch.stroke(sketch.color("#0f0"));
	sketch.noFill();
	sketch.strokeWeight(5);
	if (sketch.mouseX <= 0 && sketch.mouseX >= -sketch.windowWidth/2 && sketch.mouseY <= 0 && sketch.mouseY >= -(sketch.windowHeight-20)/2) {
	  sketch.background(255);
	  sketch.circle(sketch.mouseX+(sketch.windowWidth/2)-(sketch.windowWidth/4), sketch.mouseY+(sketch.windowHeight-20)/2-(sketch.windowHeight-20)/4, 25);
	} else if (sketch.mouseX <= sketch.windowWidth/2 && sketch.mouseX >= 0 && sketch.mouseY <= 0 && sketch.mouseY >= -(sketch.windowHeight-20)/2) {
	  sketch.background(255);
	  sketch.circle(sketch.mouseX-(sketch.windowWidth/4), sketch.mouseY+(sketch.windowHeight-20)/2-(sketch.windowHeight-20)/4, 25);
	} else if (sketch.mouseX <= 0 && sketch.mouseX >= -sketch.windowWidth/2 && sketch.mouseY <= (sketch.windowHeight-20)/2 && sketch.mouseY >= 0) {
	  sketch.background(255);
	  sketch.circle(sketch.mouseX+(sketch.windowWidth/2)-(sketch.windowWidth/4), sketch.mouseY-(sketch.windowHeight-20)/4, 25);
	} else {
	  sketch.background(255);
	}
	if (act_tif == true) {
	  img_tif = sketch.loadImage("tmp/tif.png");
	  act_tif = false;
	}
	sketch.image(img_tif,0+t_x+initx,0+t_y+inity);
  }
  sketch.mousePressed = function() {
    newx = sketch.mouseX;
	newy = sketch.mouseY;
  }
  sketch.mouseDragged = function() {
    t_x = sketch.mouseX - newx;
	t_y = sketch.mouseY - newy;
  }
  sketch.mouseReleased = function() {
    initx = t_x+initx;
	inity = t_y+inity;
	t_x = 0;
	t_y = 0;
  }
};
new p5(s3);
