class MapManager{
	static render_map(){
		if(MapManager.map == null){
			const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
			const options = { //지도를 생성할 때 필요한 기본 옵션
				center: new kakao.maps.LatLng(37.58256149, 127.05436707), //지도의 중심좌표.
					level: 3 //지도의 레벨(확대, 축소 정도)
			};
			MapManager.map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
		}
		//this.render_map = !this.render_map;
	}
	static render_stations_into_map(id_list, stations){
		if(MapManager.map == null) MapManager.render_map();
		for(var i=0; i<MapManager.infowindows.length; i++) MapManager.infowindows[i].close();
		for(var i=0; i<MapManager.markers.length; i++) MapManager.markers[i].setMap(null);
		MapManager.infowindows = [];
		MapManager.markers = [];
		const imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 
		for(var i=0; i<id_list.length; i++){
			var station = stations[id_list[i]];
			var latlng = new kakao.maps.LatLng( parseFloat(station["stationLatitude"]), parseFloat(station["stationLongitude"]))
			var imageSize = new kakao.maps.Size(24, 35); 
			var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 

			// 마커를 생성합니다
			var marker = new kakao.maps.Marker({
				map: MapManager.map, // 마커를 표시할 지도
				position: latlng, // 마커를 표시할 위치
				title : station["stationName"], // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
				image : markerImage // 마커 이미지 
			});
			var infowindow = new kakao.maps.InfoWindow({
				position: latlng,
				content: `<div style="font-size:small;padding:0.1em;"><h4><a href="https://map.kakao.com/link/map/${station["stationName"]},${latlng.getLat()},${latlng.getLng()}" style="" target="_blank">${station["stationName"]}</a></h4></div>`,
			});

			infowindow.open(MapManager.map, marker);

			MapManager.infowindows.push(infowindow);
			MapManager.markers.push(marker);
		}
	}
}
MapManager.map = null;
MapManager.infowindows = [];
MapManager.markers = [];