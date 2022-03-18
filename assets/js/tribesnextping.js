$(document).ready
(
	function()
	{
		var $serverPopContainer = $('#serverPopContainer');
		var $serverPopContainerPage = $('#serverPopContainerPage');
		var $serverPopContainerList = $('#serverPopContainerList');
		var discordServerIP = '35.239.88.241:28000';
		//var discordServerIP = '185.66.108.39:28000';

		function getServerData(ip)
		{
			$.getJSON('http://master.tribesnext.com/list.json',
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
			var template = `<div><p>${data.info_hostname}<br>
							P#: ${data.num_players} / ${data.info_flags.max_players}<br>
                            ${data.info_map} &#160;/&#160; ${data.info_maptype}</p></div>`;
			
			$serverPopContainer.html(`<div bgcolor="" style="font-size:16px;line-height: 17px;"><a href="server.html" style="text-align: center; color:#545c61;"> ${template} </a> </div>`);
		}

		function updateViewPage(data)
		{
			var players = data.num_players;
			var template = `<div> SHAZBOT! </div>
							<div> There\'s <strong style="color:#0a9ba8;"> ${data.num_players} </strong> player${(players != 1 ? 's' : '')} on </div>
							<div> ${data.info_hostname} </div>
							<div> right now playing </div>
							<div> ${data.info_map} </div>
							<div> ${data.info_maptype} </div>`;

			$serverPopContainerPage.html(`<div bgcolor="" style="text-align: center;"> ${template} </div>`);
		}

		function updateViewList(data)
		{	
			var players = data.num_players;
			var template = ``;

			if(players > 0){
				function countPlayers(teamData){
					var result = 0;
					for(var playerSlot in teamData){
						if(!isNaN(playerSlot))
							result++;
					}
					return result;
				}

				function playerLoop(teamNum, data, mode){
					var teamData = data[teamNum];
					var count = countPlayers(teamData);
					
					if(mode == "LakRabbit" || mode == "Deathmatch")
						var title = `Players`;
					else
						var title = teamData.name;
					
					template = `${template} ${div4} ${title} </div>`;
					if(count > 0){
						for (i = 0; i < count; i++){
							template = `${template} ${divc} ${teamData[i].name} </div>`;
						}
						template = `${template} </div><br>`;
					}
					else
						template = `${template} N/A </div><br>`;
				}
				
				template = `<br>`;
				var mode = data.info_maptype;
				var data = data.info_players;
				
				//Formatting
				var div4 = `<div class="col-4" style="min-width:250px;"><div class="column" style="text-decoration: underline;">`;
				var divc = `<div class="column">`;

				//Lak/DM Only: Lak/DM puts everyone in observer and doesnt update team rank
				if(mode == "LakRabbit" || mode == "Deathmatch"){
					template = `${template} <div class="col-6">`;
					playerLoop(0, data, mode);
				}
				//CTF
				else{
					//Team 1
					template = `${template} <div class="row-special">`;
					playerLoop(1, data, mode);
					//Team 2
					playerLoop(2, data, mode);
					//Observers
					playerLoop(0, data, mode);
				}
			}

			$serverPopContainerList.html(`<div style="font-size:45px;line-height: 55px;text-align: center;"> ${template} </div>`);
		}

		getServerData(discordServerIP);
		setInterval(
			function() { getServerData(discordServerIP); }, 25000 // check every 25 seconds
		);
	}
);