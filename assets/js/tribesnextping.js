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
			var template = `<div> ${data.info_hostname} &#160; &#160; P#: ${data.num_players} / ${data.info_flags.max_players} </div>
                            <div> ${data.info_map} &#160;/&#160; ${data.info_maptype} </div>`;
			
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
				function objectLength(teamnum, obj){
					var result = 0;
					for(var prop in obj){
						if (obj.hasOwnProperty(prop)){
						// or Object.prototype.hasOwnProperty.call(obj, prop)
						result++;
						}
					}
					if(teamnum != 0) //Non-Observers
						result -= 2; //Minus team name, score
					else if(data.info_maptype != "LakRabbit") //Minus name, Lak keeps people in observer, doesnt update team ranks
							result -= 1;
					return result;
				}

				function playerLoop(teamnum, data){
					var teamdata = data[teamnum];
					var count = objectLength(teamnum, teamdata);
					if(data.info_maptype != "LakRabbit")
						template = `${template} ${div4} ${teamdata.name} </div>`;
					if(count > 0){
						for (i = 0; i < count; i++){
							if(teamdata[i].name === "")
								continue;
							template = `${template} ${divc} ${teamdata[i].name} </div>`;
						}
						template = `${template} ${div1br}`;
					}
					else
						template = `${template} N/A ${div1br}`;
				}
				
				template = `<br>`;
				var data = data.info_players;
				
				//Formatting
				var div4 = `<div class="col-4" style="min-width:250px;"><div class="column" style="text-decoration: underline;">`;
				var divc = `<div class="column">`;
				var div1br = `</div><br>`;

				//Lak Only: Lak puts everyone in observer and doesnt update team rank
				if(data.info_maptype == "LakRabbit"){
					template = `${template} <div class="col-6">`;
					playerLoop(0, data);
				}
				//CTF
				else{
					//Team 1
					template = `${template} <div class="row-special">`;
					playerLoop(1, data);
					//Team 2
					playerLoop(2, data);
					//Observers
					playerLoop(0, data);
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