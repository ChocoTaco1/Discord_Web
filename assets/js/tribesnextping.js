$(document).ready
(
	function()
	{
		var $serverStatContainer = $('#serverStatContainer');
		var $FULLserverStatContainer = $('#FULLserverStatContainer');
		var discordServerIP = '67.222.138.16:28000';

		function getServerData(ip) 
		{
			$.getJSON('https://www.tribesnext.com/list.json', 
				function(tnMasterServerData)
				{
					var result = tnMasterServerData.find(
						function(server) 
						{
							return server.s_ipa === ip;
						}
					);

					updateView(result);
					FULLupdateView(result);
				}
			);
		}

		function updateView(data) 
		{
			var template = '<div>' + data.info_hostname + '&nbsp;&nbsp;&nbsp;&nbsp; P#: ' + data.num_players + '/' + data.info_flags.max_players + '</div>';
			template = '<div>' + template + data.info_map + '&nbsp; / &nbsp;' + data.info_maptype + '</div>';
			$serverStatContainer.html('<div bgcolor="" style="font-size:16px;line-height: 17px;"><a href="server.html" style="text-align: center; color:#545c61;">' + template + '</a></div>');
		}

		function FULLupdateView(data) 
		{
			var data_players = data.num_players;
			var template = '<div>SHAZBOT,</div>';
			template += '<div>there\'s <strong style="color:#0a9ba8;">' + data.num_players + '</strong> player' + (data_players != 1 ? 's' : '') + ' on</div>';
			template += '<div>' + data.info_hostname + '</div>';
			template += '<div>right now playing</div>';
			template += '<div>' + data.info_map + '</div>';
			template += '<div>' + data.info_maptype + '</div>';
			$FULLserverStatContainer.html('<div bgcolor="" style="line-height: 100px;font-size:85px;text-align: center;">' + template + '</div>');
		}

		getServerData(discordServerIP);
		setInterval
		(
			function() 
			{
				getServerData(discordServerIP);
			}, 25000
		); // check every 25 seconds
	}
);
