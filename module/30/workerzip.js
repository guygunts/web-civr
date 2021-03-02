onmessage = async function(e) {
	for(let i= 0; i<e.data.length; i++){
		let name = e.data[i].voice_name.substring(e.data[i].voice_name.lastIndexOf('/') + 1).split("?")[0]	
		let data ={
				'name':name,
				'data':e.data[i].voice_name
		}
		postMessage(data);
	}	

		let data={
			'mess':'success'
		}
		postMessage(data);
}