COLORS = [
	"#003366",
	"#F6546A",
	"#8B0000",
	"#117444",
	"#076554",
	"#db5400",
	"#b12000",
	"#950030",
	"#6900b2",
	"#339090",
	"#963636",
	"#392988",
	"#5a2086",
	"#8a1f6d",
	"#b50346",
	"#d70d2f",
	"#02657f",
	"#1c610b",
	"#487d05",
	"#0a165d",
	"#a70033",
	"#720022",
	"#4f0008",
	"#6d0000",
	"#a90101",
	"#2d1d06",
	"#1d5a0b",
	"#08290e",
]

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

$("#generateSentenceBtn").click(function(){
	//Adds CSRF token to form to allow submission
	$.ajax({
		url: "fetchSentence/",
		type: "POST",
		data: {},
		
		success: function(json) {
			if ($("#sentenceContainer").hasClass("animated")){
				$("#sentenceContainer").one("animationend", function(){
					$("#sentenceContainer").removeClass("animated fadeOut faster");
					
					$("#sentenceContainer").text(json["sentence"]);
					color = COLORS[getRandomInt(0, COLORS.length)];
					$("#sentenceContainer").css("padding", "10px").css("background-color", color);
					
					$("#sentenceContainer").addClass("animated fadeIn faster");
				});
				
				
				$("#sentenceContainer").addClass("animated fadeOut faster");
			} else {
				$("#sentenceContainer").text(json["sentence"]);
				color = COLORS[getRandomInt(0, COLORS.length)];
				$("#sentenceContainer").css("padding", "10px").css("background-color", color);
				
				$("#sentenceContainer").addClass("animated fadeIn faster");
			}
			
			
			
			
		}
		
	});
});