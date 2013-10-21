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
		items: [
			{
				type: "electronics",
				sku: "123456789", 
		 		name: "iPhone 4S",
		 		carrier: "Verizon",
		 		size: "64GB",
		 		color: "White", 
		 		condition: "Broken",
		 		price: "123",
		 		tracking: "Delivered",
		 		status: "Awaiting Check-in",
		 		requoteDate: "", 
				requotePrice: ""
		 	},
		 	{
		 		type: "electronics",
				sku: "234567890", 
		 		name: "iPhone 4",
		 		carrier: "AT&T",
		 		size: "32GB",
		 		color: "Black", 
		 		condition: "Good",
		 		price: "100",
		 		tracking: "Delivered",
		 		status: "Awaiting Check-in",
		 		requoteDate: "", 
				requotePrice: ""
		 	},
		 	{
				type: "book",
				sku: "123456789", 
		 		title: "Campbell Biology",
		 		insert: "No CD",
		 		condition: "Very Good",
		 		price: "123",
		 		tracking: "Delivered",
		 		status: "Awaiting Check-in",
		 		requoteDate: "", 
				requotePrice: ""
		 	}
	 	]
	},
	{	orderNumber: "000002", 
		date: "09/30/2013", 
		customerName: "Janie Peachpit", 
		status: "Awating Check-in", 
		customerAddress1: "123 Anystreet", 
		customerAddress2: "", 
		customerCity: "Cityname", 
		customerState: "MA", 
		customerZIP: "02210", 
		requoteDate: "", 
		requotePrice: "", 
		items: [
			{
				type: "book",
				sku: "123456789", 
		 		title: "Campbell Biology",
		 		insert: "No CD",
		 		condition: "Very Good",
		 		price: "123",
		 		tracking: "Delivered",
		 		status: "Awaiting Check-in",
		 		requoteDate: "", 
				requotePrice: ""
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

	// used for showing contents of order picked on 'All Orders' tab.
	self.allChosenOrder = ko.observable(); 

	// map json data into observable goodness
	self.orders = ko.mapping.fromJS([]);
	ko.mapping.fromJS(initial_orders, self.orders); // black magic

	self.awaitingCheckinOrders = ko.computed(function(){
		return ko.utils.arrayFilter(self.orders(), function(order){
			return hasItemsAwaitingCheckin(order);
		});
	}, self);

	self.itemsAwaitingCheckinOrders = function(order, itemType, status){
		return ko.utils.arrayFilter(order.items(), function(item){
			if( item.status() === status && item.type() === itemType ){
		 		return item;
			}
		});
	};
	self.chooseOrder = function(order) {
		self.chosenOrder(order);
	};
	self.clearChosenOrder = function(){
		self.chosenOrder("");
	};
	self.allChooseOrder = function(order) {
		self.allChosenOrder(order);
	}
	self.clearAllChosenOrder = function(){
		self.allChosenOrder("");	
	}
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
}

// ====================
// Initialization
// ====================

var ordersModel = new OrdersModel(initialOrders);
ko.applyBindings(ordersModel);