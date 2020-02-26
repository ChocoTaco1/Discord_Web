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
        var template = "<div><strong>"+data.info_hostname+"</strong>" + " ["+data.num_players+" / "+ data.info_flags.max_players +"]</div>";
        var template = template + "<div>"+ data.info_map+"::"+data.info_maptype+"</div>";
        $serverStatContainer.html('<div bgcolor="" style="padding: 0px 0px 0px 0px;text-shadow: -1px 1px 1px #111111;line-height: 16px;font-size:14px; color:#0fcfb9;text-align: right; font-family: sans-serif;mso-height-rule: exactly">'+ template + '</div>');
    }

    getServerData(discordServerIP)
    setInterval(function(){ getServerData(discordServerIP) }, 25000);   // check every 25 seconds 
});