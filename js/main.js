$(document).ready(function () {
    var $serverStatContainer = $('#serverStatContainer');
    var $FULLserverStatContainer = $('#FULLserverStatContainer');
    var discordServerIP = "67.222.138.12:28000";
    function getServerData(ip) {
        $.getJSON('https://www.tribesnext.com/json', function (tnMasterServerData) {
            var result = tnMasterServerData.find(function (server) {
                return server.s_ipa === ip;
            });
            updateView(result)
            FULLupdateView(result)
        });
    }

    function updateView(data){
        var template = "<div><strong>"+data.info_hostname+"</strong> ["+data.num_players+" / "+ data.info_flags.max_players +"]</div>";
            template = template + "<div>"+ data.info_map+" - "+data.info_maptype+"</div>";
        $serverStatContainer.html('<div bgcolor="" style="padding: 0px 0px 0px 0px;text-shadow: -1px 1px 1px #111111;line-height: 20px;color:#cccccc;font-size:14px;text-align: right; font-family: sans-serif;"><a href="server.html" style="text-decoration: none">'+ template + '</a></div>');
    }
	
	function FULLupdateView(data){
        var data_players = data.num_players;
        var template = "<div><strong>DAMN,</strong></div>"; 
            template = template + "<div>there's <strong>"+data.num_players+"</strong></div>";
            template = template + "<div>player" + (data_players != 1 ? "s":"") + " on</div>";
            template = template + "<div><strong>"+data.info_hostname+"</strong></div>";
            template = template + "<div>right now</div>";
        $FULLserverStatContainer.html('<div bgcolor="" style="padding: 10px 0px 20px 0px;text-shadow: -3px 2px 2px #111111;line-height: 120px;color:#cccccc;font-size:120px;text-align: center; font-family: sans-serif;">'+ template + '</div>');
    }

    getServerData(discordServerIP)
    setInterval(function(){ getServerData(discordServerIP) }, 25000);   // check every 25 seconds 
});
