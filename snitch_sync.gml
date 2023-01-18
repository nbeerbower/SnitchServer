// Upload crash dump JSON to snitch server
// returns true if crash was collected
function snitch_sync(){
	if (!os_is_network_connected()) return false;
	var crash = SnitchCrashCollect();
	if (crash != undefined) {
		// add os info to the crash if available
		var os_info = os_get_info();
		if (ds_exists(os_info, ds_type_map)) {
			var osJSON = json_encode(os_info);
			crash.os = osJSON;
			ds_map_destroy(os_info);
		}
		
		var json = json_stringify(crash);
		var postURL = "http://localhost:3001/api/crash";
		log("Uploading snitch crash to ", postURL);
		var headerMap = ds_map_create();
		ds_map_add(headerMap, "Content-Type", "application/json");
		http_request(postURL, "POST", headerMap, json);
		ds_map_destroy(headerMap);
	}
	return true;
}