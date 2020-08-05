$(document).ready(function () {
    var $serverStatContainer = $('#serverStatContainer');
    var $FULLserverStatContainer = $('#FULLserverStatContainer');
    var discordServerIP = "67.222.138.16:28000";
    function getServerData(ip) {
        $.getJSON('https://www.tribesnext.com/json', function (tnMasterServerData) {
            var result = tnMasterServerData.find(function (server) {
                return server.s_ipa === discordServerIP;
            });
            updateView(result)
            FULLupdateView(result)
        });
    }

    function updateView(data){
        var template = "<div>"+data.info_hostname+" ["+data.num_players+" / "+ data.info_flags.max_players +"]</div>";
		//template = template + "[" + data.info_map+"/"+data.info_maptype+"]</div>";
        $serverStatContainer.html('<div bgcolor="" style="font-size:16px;line-height: 17px;"><a href="server.html" style="text-align: center; color:#545c61;">'+ template + '</a></div>');
    }
	
	function FULLupdateView(data){
        var data_players = data.num_players;
        var template = "<div>SHAZBOT,</div>"; 
            template = template + "<div>there's <strong style=\"color:#0a9ba8;\">"+data.num_players+"</strong></div>";
            template = template + "<div>player" + (data_players != 1 ? "s":"") + " on</div>";
            template = template + "<div>"+data.info_hostname+"</div>";
            template = template + "<div>right now</div>";
        $FULLserverStatContainer.html('<div bgcolor="" style="line-height: 100px;font-size:75px;text-align: center;">'+ template + '</div>');
    }

    getServerData(discordServerIP)
    setInterval(function(){ getServerData(discordServerIP) }, 25000);   // check every 25 seconds 
});
