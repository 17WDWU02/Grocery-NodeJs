$("#form").submit(function(event){
	event.preventDefault();

	var url = "http://localhost:3000/products";
	var value = $("#search").val();
	if(value.length > 0){
		url += "/search=" + value;
	} else {
		alert("please enter a value");
		return;
	}
	
	var radioButton = $("#form input[type='radio']:checked").val();
	if(radioButton === "yes"){
		url += "/instock=yes"
	} else if(radioButton === "no"){
		url += "/instock=no"
	}

	console.log(url);
	$.ajax({
		url: url,
		dataType: "json",
		success:function(data){
			// console.log(data);
			$("#tableBody").empty();
			for (var i = 0; i < data.length; i++) {
				$("#tableBody").append("<tr>"+
					"<td>"+data[i].name+"</td>"+
					"<td>$"+data[i].price+"</td>"+
					"<td>"+data[i].inStock+"</td>"+
				"</tr>");
			};



		},
		error:function(){
			console.log("something went wrong")
		}
	})
});