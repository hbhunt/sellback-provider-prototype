var initialOrders = [
	{	orderNumber: "000001", 
		date: "09/30/2013", 
		customerName: "Johnny Appleseed", 
		status: "Awating Check-in", 
		customerAddress1: "123 Anystreet", 
		customerAddress2: "Apartment 2", 
		customerCity: "Cityname", 
		customerState: "MA", 
		customerZIP: "02210", 
		requoteDate: "", 
		requotePrice: "", 
		items: [
			{
				sku: "123456789", 
		 		name: "iPhone 4S",
		 		carrier: "Verizon",
		 		size: "64GB",
		 		color: "White", 
		 		condition: "Broken",
		 		price: "123",
		 		status: "Awaiting Check-in"
		 	},
		 	{
				sku: "234567890", 
		 		name: "iPhone 4",
		 		carrier: "AT&T",
		 		size: "32GB",
		 		color: "Black", 
		 		condition: "Good",
		 		price: "100",
		 		status: "Awaiting Check-in"
		 	}
	 	]
	},
	{	orderNumber: "000002", 
		date: "09/30/2013", 
		customerName: "Janie Peachpit", 
		status: "Awating Check-in", 
		customerAddress1: "123 Anystreet", 
		customerAddress2: "Apartment 2", 
		customerCity: "Cityname", 
		customerState: "MA", 
		customerZIP: "02210", 
		requoteDate: "", 
		requotePrice: "", 
		items: [
			{
				sku: "123456789", 
		 		name: "iPhone 4S",
		 		carrier: "Verizon",
		 		size: "64GB",
		 		color: "White", 
		 		condition: "Broken",
		 		price: "123",
		 		status: "Awaiting Check-in"
		 	}
	 	]
	}
];

var hasItemsAwaitingCheckin = function(order){
	var has_any = false;
	ko.utils.arrayForEach(order.items(), function(item){
		if( item.status() === "Awaiting Check-in" ){
		 has_any = true;
		}
	});
	return has_any;
}

var OrdersModel = function(initial_orders) {
	// Data
	var self = this;
	self.chosenOrder = ko.observable(); // used for editing, borrowing pattern from ko docs

	// map json data into observable goodness
	self.orders = ko.mapping.fromJS([]);
	ko.mapping.fromJS(initial_orders, self.orders); // black magic

	self.awaitingCheckinOrders = ko.computed(function(){
		return ko.utils.arrayFilter(self.orders(), function(order){
			return hasItemsAwaitingCheckin(order);
		});
	}, self);

	self.chooseOrder = function(order) {
		self.chosenOrder(order);
	};
	self.totalPriceForOrder = function(order) {
		var total = 0;
		ko.utils.arrayForEach(order.items(), function(item){
			total += parseInt(item.price());
		});
		return total;
	};
	self.numberForCheckin = function(order){
		var total = 0;
		ko.utils.arrayForEach(order.items(), function(item){
			if(item.status() == "Awaiting Check-in"){
				total++;
			}
		});
		return total;	
	};
	self.markForRequote = function(item){
		item.status("Marked for Requote");
	};
	self.approveCheckin = function(item){
		item.status("Approved");	
	};
	self.clearChosenOrder = function(){
		self.chosenOrder("");
	};
}

// ====================
// Initialization
// ====================

var ordersModel = new OrdersModel(initialOrders);
ko.applyBindings(ordersModel);