//initialize map
            var map = L.map('map').setView([40.036,-83.011], 12);
            L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',{
              attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
            }).addTo(map);
            
                $(".previous").click(function(){
                    if(currentId == 0 ){
                        currentId = data.length-1;
                    }
                    else{
                        currentId--;
                    }
                    loadData(currentId);
                });
                $(".next").click(function(){
                    if(currentId > data.length-1 ){
                        currentId = 0;
                    }
                    else{
                        currentId++;
                    }
                    loadData(currentId);
                });
            
             var moreInfoOpen = false;
            $(".infoToggle").click(function(){
                
                if(moreInfoOpen){
                    $("#moreInfo").animate({
                        opacity: 0,
                        height: "0",
                      }, 800, function() {
                        moreInfoOpen = false;
                      });
                }
                else{
                    $("#moreInfo").animate({
                        opacity: 1,
                        height: "300",
                      }, 800, function() {
                        moreInfoOpen = true;
                      });
                }
            });

var currentId = 0;
function loadData(id){
    
    currentId = id;
    
    var item = data[id];
    $("#map-info").html(item.description);
    map.setView([item.lat, item.long], 14);
    $('#bgvid').attr('src', item.video);
    $('#bgvid').attr('poster', item.picture);
    $('#bgvid').load();
    
    if(moreInfoOpen){
        $("#moreInfo").animate({
            opacity: 0,
            height: "0",
          }, 500, function() {
            moreInfoOpen = false;
        });
    }
}
//data is loaded from data.js
data.sort(function() {  return .5 - Math.random();});

$(document).ready(function(){
    //add all points to the map
    for(var i=0, child; child = data[i]; i++){
         L.marker([child.lat, child.long])
                 .bindPopup("<h3><a href='#' onclick='loadData("+i+")'>"+child.name+"</a></h3>")
                 .openPopup()
                 .addTo(map);
    }
    
    //pre-load the first point
    loadData(currentId);

});