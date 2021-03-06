
var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse'); 


//request data from URL
request("https://www.wch2016.com/scores-schedule", function(error, response, body) {
  
  if(error) {
    console.log("Error: " + error);
  }
  //Looking for Status 200
  console.log("Status code: " + response.statusCode);

  //Load HTML data using Cheerio (JQuery implementation)
  var $ = cheerio.load(body);

  // Search HTML to find "div.wide-time-result" (one for each completed game)
  
$('div.wide-time-result').each(function(i, element){
      
      //Inside of "wide-time=result" find both winning and losing team
      var team1 = $(this).find('span.team.loser');
      if (team1.text() == ""){return;}
      
      var team2 = $(this).find('span.team.winner');
      var winner, loser;

      //Trim string (of the form SWE 3 or SWE 3,) returned to seperate score and team and remove comma
      winner = team2.text().substr(0,5);
      wscore = winner.substr(4,4);
      loser = team1.text().substr(0,5);
      lscore = loser.substr(4,4);
      
      //Print to console after finding the correct team for each winner and loser
      console.log(findTeam(loser) + " lost to " + findTeam(winner) + " by a score of " + wscore + " to " + lscore + ".");
    });

});

function findTeam($){
	if ($.indexOf("SWE")!=-1){
		return "Team Sweden";
	}
	if ($.indexOf("CAN")!=-1){
		return "Team Canada";
	}
	if ($.indexOf("USA")!=-1){
		return "Team USA";
	}
	if ($.indexOf("NAT")!=-1){
		return "Team North America";
	}
	if ($.indexOf("FIN")!=-1){
		return "Team Finland";
	}
	if ($.indexOf("RUS")!=-1){
		return "Team Russia";
	}
	if ($.indexOf("EUR")!=-1){
		return "Team Europe";
	}
	if ($.indexOf("CZE")!=-1){
		return "Team Russia";
	}
	else return $;

}
