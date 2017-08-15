var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var cors = require("cors");

var app = express();

var data = require("./data/products");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(function(request, response, next){
	console.log(`${request.method} request for ${request.url}`);
	next();
});

app.use(express.static("./public"));
app.use('/scripts', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')))

app.get("/products", function(request, response){
	response.json(data);
});

app.get("/about", function(request, response){
	response.sendFile(path.join(__dirname + '/public/about.html'));
});

app.get("/products/search=:term", function(request, response){
	var term = request.params.term;
	searchData(response, term);
});

app.get("/products/search=:term/instock=:instock", function(request, response){
	var term = request.params.term;
	var stock = request.params.instock;
	searchDataInStock(response, term, stock);
})

app.use(cors());


app.listen(3000);

console.log("Server running on port 3000");

function searchData(response, term){
	term = term.toLowerCase();
	var list = data.filter(function(item){
		var name = item.name.toLowerCase();
		if(name.indexOf(term) !== -1){
			return item;
		}
	});
	response.end(JSON.stringify(list));
};

function searchDataInStock(response, term, stock){
	term = term.toLowerCase();
	if(stock == "yes"){
		var avail = true;
	} else if(stock == "no"){
		var avail = false;
	}

	var list = data.filter(function(item){
		var name = item.name.toLowerCase();
		if( (name.indexOf(term) !== -1) && (item.inStock == avail) ){
			return item;
		}
	});

	response.end(JSON.stringify(list));
}
