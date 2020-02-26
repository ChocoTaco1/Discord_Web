$(document).ready(function () {
    var $serverStatContainer = $('#serverStatContainer');
    var discordServerIP = "67.222.138.12:28000";
    function getServerData(ip) {
        $.getJSON('https://www.tribesnext.com/json', function (tnMasterServerData) {
            var result = tnMasterServerData.find(function (server) {
                return server.s_ipa === ip;
            });
            updateView(result)
        });
    }

    function updateView(data){
        var template = "<div><strong>"+data.info_hostname+"</strong></div>";
        var template = template + "<div>"+ data.info_map+" — "+data.info_maptype+"</div>";
        var template = template + "<div>"+data.num_players+" / "+ data.info_flags.max_players +"</div>";
        $serverStatContainer.html('<div style="text-shadow: -1px 1px 1px #111111;line-height: 17px;font-size:13px; color:#0FDFC7">'+ template + '</div>');
    }

    getServerData(discordServerIP)
    setInterval(function(){ getServerData(discordServerIP) }, 25000);   // check every 25 seconds 
});