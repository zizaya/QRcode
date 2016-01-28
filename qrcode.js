require(['http://webresource.c-ctrip.com/code/lizard/2.2/web/shell/c.shell.js'],function(cShell){
	$('#js_scan').click(function(){

		cShell.scanBarcode().done(function(barcode){
			alert(barcode)
			alert('成功')
			$('#js_code').html(barcode)
		}).fail(function(err){
			console.dir(err)
			alert('失败')
			$('#js_code').html('失败')
		})
	})
	
})