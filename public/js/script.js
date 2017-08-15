$("#form").submit(function(event){
	event.preventDefault();
	var value = $("#search").val();
	$.ajax({
		url: "http://localhost:3000/products/"+value,
		dataType: "json",
		success:function(data){
			console.log(data);
			
		},
		error:function(){
			console.log("something went wrong")
		}
	})
});