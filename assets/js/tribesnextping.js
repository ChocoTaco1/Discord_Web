$(document).ready
(
	function()
	{
		var $serverPopContainer = $('#serverPopContainer');
		var $serverPopContainerPage = $('#serverPopContainerPage');
		var $serverPopContainerList = $('#serverPopContainerList');
		var discordServerIP = '67.222.138.16:28000';
		//var discordServerIP = '185.66.108.39:28000';

		function getServerData(ip) 
		{
			$.getJSON('https://www.tribesnext.com/list.json', 
				function(tnMasterServerData){
					var result = tnMasterServerData.find(
						function(server) {
							return server.s_ipa === ip;
						}
					);

					updateView(result);
					updateViewPage(result);
					updateViewList(result);
				}
			);
		}

		function updateView(data) 
		{
			var template = '<div>' + data.info_hostname + '&nbsp;&nbsp;&nbsp;&nbsp; P#: ' + data.num_players + '/' + data.info_flags.max_players + '</div>';
			template = '<div>' + template + data.info_map + '&nbsp; / &nbsp;' + data.info_maptype + '</div>';
			$serverPopContainer.html('<div bgcolor="" style="font-size:16px;line-height: 17px;"><a href="server.html" style="text-align: center; color:#545c61;">' + template + '</a></div>');
		}

		function updateViewPage(data) 
		{
			var players = data.num_players;
			var template = '<div>SHAZBOT,</div>';
			template += '<div>there\'s <strong style="color:#0a9ba8;">' + data.num_players + '</strong> player' + (players != 1 ? 's' : '') + ' on</div>';
			template += '<div>' + data.info_hostname + '</div>';
			template += '<div>right now playing</div>';
			template += '<div>' + data.info_map + '</div>';
			template += '<div>' + data.info_maptype + '</div>';

			$serverPopContainerPage.html('<div bgcolor="" style="text-align: center;">' + template + '</div>');
		}
		
		function updateViewList(data) 
		{
			var players = data.num_players;
			var template = '<br>';
			
			function objectLength(obj){
				var result = 0;
				for(var prop in obj){
					if (obj.hasOwnProperty(prop)){
					// or Object.prototype.hasOwnProperty.call(obj, prop)
					result++;
					}
				}
				if(obj != team0) //Non-Observers
					result -= 2; //Minus team name, score, and ???
				else if(data.info_maptype != "LakRabbit") //Some weird thing with observers deing different between lak and ctf
						result -= 1;

				return result;
			}
			
			if(players > 0)
			{
				var teams = data.info_players;

				var team0 = teams[0];
				var team0cnt = objectLength(team0);

				if(data.info_maptype == "LakRabbit"){
					for (i = 0; i < team0cnt; i++){
						if(team0[i].name === ""){
							team0cnt++;	
							continue;
						}
						template += team0[i].name + '&emsp;&emsp;' + team0[i].score + '<br>';
					}
				}
				else
				{
					var team1 = teams[1];
					var team2 = teams[2];

					var team1cnt = objectLength(team1);
					var team2cnt = objectLength(team2);
					
					if(team1cnt > 0 || team2cnt > 0){
						template += '<div class="row">';
						template += '<div class="col-6">';
						template += team1.name + '<br>' + team1.score + '<br>';
						for (i = 0; i < team1cnt; i++){
							if(team1[i].name === ""){
								team0cnt++;	
								continue;
							}
							template += team1[i].name + '<br>' + team1[i].score + '<br>';
						}
						template += '</div>';
						template += '<div class="col-6">' + team2.name + '<br>' + team2.score + '<br>';
						for (i = 0; i < team2cnt; i++){
							if(team2[i].name === ""){
								team0cnt++;	
								continue;
							}
							template += team2[i].name + '<br>' + team2[i].score + '<br>';
						}
						template += '</div></div>';
					}
					
					if(team0cnt > 0){
						template += '<br>' + "Observers" + '<br>';
						for (i = 0; i < team0cnt; i++){
							if(team0[i].name === ""){
								team0cnt++;	
								continue;
							}
							template += team0[i].name + '<br>' + team0[i].score + '<br>';
						}
					}
				}
				
			}
			
			$serverPopContainerList.html('<div style="font-size:35px;text-align: center;">' + template + '</div>');
		}

		getServerData(discordServerIP);
		setInterval(
			function() { getServerData(discordServerIP); }, 25000 // check every 25 seconds
		);
	}
);
