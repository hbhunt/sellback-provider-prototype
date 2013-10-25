var initialCategories = [
	{	name: "Phones", category: "phone", activeCount: 0,
		filters:  
			[
				{	name: "iPhone Model",
					choices: [
						{ label: "iPhone 4", value: false, id: "", count: 0,
							filterFunction: function(item){ return item.name() === "iPhone 4"; }
						},
						{ label: "iPhone 4S", value: false, id: "", count: 0,
							filterFunction: function(item){ return item.name() === "iPhone 4S"; }
						},
						{ label: "iPhone 5", value: false, id: "",count: 0,
							filterFunction: function(item){ return item.name() === "iPhone 5"; }
						}
					]
				},
				{   name: "Carrier",   
					choices: [
						{ label: "Verizon", value: false, id: "", count: 0,
							filterFunction: function( item ){ return item.carrier() === "Verizon"; }
						},
						{ label: "AT&T", value: false, id: "", count: 0,
							filterFunction: function( item ){ return item.carrier() === "AT&T"; }
						},
						{ label: "T-Mobile", value: false, id: "", count: 0,
							filterFunction: function( item ){ return item.carrier() === "T-Mobile"; }
						},
						{ label: "Sprint", value: false, id: "", count: 0,
							filterFunction: function( item ){ return item.carrier() === "Sprint"; }
						},
						{ label: "Other / Unlocked", value: false, id: "", count: 0,
								filterFunction: function( item ){ return item.carrier() === "Other / Unlocked"; }
						}
					]
				},
				{   name: "Size",   
					choices: [
						{ label: "64GB", value: false, id: "", count: 0,
							filterFunction: function( item ){ return item.storage() === "64GB"; } 
						},
						{ label: "32GB", value: false, id: "", count: 0,
							filterFunction: function( item ){ return item.storage() === "32GB"; } 
						},
						{ label: "16GB", value: false, id: "", count: 0,
							filterFunction: function( item ){ return item.storage() === "16GB"; } 
						},
						{ label: "8GB", value: false, id: "", count: 0,
							filterFunction: function( item ){ return item.storage() === "8GB"; } 
						}
					]
				},
				{	name: "Color",   
					choices: [
						{ label: "White", value: false, id: "", count: 0,
							filterFunction: function( item ){ return item.color() === "white"; } 
						},
						{ label: "Black", value: false, id: "", count: 0,
							filterFunction: function( item ){ return item.color() === "black"; } 
						}
					]
				}
			],
		devices: [
			{	manufacturer: "Apple", name: "iPhone 4", carrier: "AT&T", storage: "64GB",
				color: "black",  
				prices: [
				{ condition: "Broken", listed : "0", purchased: "4", price: "100" },
				{ condition: "Used", listed : "0", purchased: "7", price: "200" },
				{ condition: "Excellent", listed : "0", purchased: "1", price: "300" }
				]
			},
			{	manufacturer: "Apple", name: "iPhone 4", carrier: "AT&T", storage: "32GB",
				color: "white",  
				prices: [
				{ condition: "Broken", listed : "0", purchased: "3", price: "0" },
				{ condition: "Used", listed : "0", purchased: "6", price: "0" },
				{ condition: "Excellent", listed : "0", purchased: "2", price: "0" }
				]
			}
		]
	}, // end phones
	{	name: "Tablets", category: "tablet", activeCount: 0,
		filters: [
				{	name: "iPad Model",
					choices: [
						{ label: "Big iPad", value: false, id: "", count: 0,
							filterFunction: function(item){ return item.name() === "Big iPad"; }
						},
						{ label: "iPad Mini", value: false, id: "", count: 0,
							filterFunction: function(item){ return item.name() === "iPad Mini"; }
						},
						{ label: "iPad Junior", value: false, id: "",count: 0,
							filterFunction: function(item){ return item.name() === "iPad Junior"; }
						}
					]
				},
				{   name: "Carrier",   
					choices: [
						{ label: "Verizon", value: false, id: "", count: 0,
							filterFunction: function( item ){ return item.carrier() === "Verizon"; }
						},
						{ label: "AT&T", value: false, id: "", count: 0,
							filterFunction: function( item ){ return item.carrier() === "AT&T"; }
						},
						{ label: "T-Mobile", value: false, id: "", count: 0,
							filterFunction: function( item ){ return item.carrier() === "T-Mobile"; }
						},
						{ label: "Sprint", value: false, id: "", count: 0,
							filterFunction: function( item ){ return item.carrier() === "Sprint"; }
						},
						{ label: "Wifi", value: false, id: "", count: 0,
							filterFunction: function( item ){ return item.carrier() === "Wifi"; }
						},
						{ label: "Other / Unlocked", value: false, id: "", count: 0,
								filterFunction: function( item ){ return item.carrier() === "Other / Unlocked"; }
						}
					]
				},
				{   name: "Size",   
					choices: [
						{ label: "64GB", value: false, id: "", count: 0,
							filterFunction: function( item ){ return item.storage() === "64GB"; } 
						},
						{ label: "32GB", value: false, id: "", count: 0,
							filterFunction: function( item ){ return item.storage() === "32GB"; } 
						},
						{ label: "16GB", value: false, id: "", count: 0,
							filterFunction: function( item ){ return item.storage() === "16GB"; } 
						},
						{ label: "8GB", value: false, id: "", count: 0,
							filterFunction: function( item ){ return item.storage() === "8GB"; } 
						}
					]
				},
				{	name: "Color",   
					choices: [
						{ label: "White", value: false, id: "", count: 0,
							filterFunction: function( item ){ return item.color() === "white"; } 
						},
						{ label: "Black", value: false, id: "", count: 0,
							filterFunction: function( item ){ return item.color() === "black"; } 
						}
					]
				}
			], 
		devices: [
			{	manufacturer: "Apple", name: "iPad Mini", carrier: "AT&T", storage: "32GB",
				color: "black",  
				prices: [
				{ condition: "Broken", listed : "0", purchased: "3", price: "0" },
				{ condition: "Used", listed : "0", purchased: "6", price: "0" },
				{ condition: "Excellent", listed : "0", purchased: "2", price: "0" }
				]
			}
		] 
	},
	{	name: "Video Game Consoles", category: "console", activeCount: 0, filters: [], devices: [] }
];

// var initialData = [
// 	{	category: "phone", manufacturer: "Apple", name: "iPhone 4", carrier: "AT&T", storage: "64GB",
// 		color: "black",  
// 		prices: [
// 		{ condition: "Broken", listed : "0", purchased: "4", price: "100" },
// 		{ condition: "Used", listed : "0", purchased: "7", price: "200" },
// 		{ condition: "Excellent", listed : "0", purchased: "1", price: "300" }
// 		]
// 	},
// 	{	category: "phone", manufacturer: "Apple", name: "iPhone 4", carrier: "AT&T", storage: "32GB",
// 		color: "white",  
// 		prices: [
// 		{ condition: "Broken", listed : "0", purchased: "3", price: "0" },
// 		{ condition: "Used", listed : "0", purchased: "6", price: "0" },
// 		{ condition: "Excellent", listed : "0", purchased: "2", price: "0" }
// 		]
// 	},
// 	{	category: "tablet", manufacturer: "Apple", name: "iPad Mini", carrier: "AT&T", storage: "32GB",
// 		color: "black",  
// 		prices: [
// 		{ condition: "Broken", listed : "0", purchased: "3", price: "0" },
// 		{ condition: "Used", listed : "0", purchased: "6", price: "0" },
// 		{ condition: "Excellent", listed : "0", purchased: "2", price: "0" }
// 		]
// 	}
// ];

var isListed = function(device){
	var listed = false;
	ko.utils.arrayForEach(device.prices(), function(price){
		if( parseInt(price.listed()) > 0 && parseInt(price.price()) > 0 ){
		 listed = true;
		}
	});
	return listed;
}

var setFilterCounts = function(objects, filter){
	var filteredObjects;
	ko.utils.arrayForEach(filter.choices(), function(choice){
		// pass 'objects' and not 'filteredObjects' into arrayFilter so each choice is calculated independently
		filteredObjects = ko.utils.arrayFilter(objects, choice.filterFunction);
		choice.count(filteredObjects.length);
	});
}

var setFilter = function(objects, filter){
	var filteredObjects = objects;
	var uniqueObjects = [];
	var index = {}; // index of string representations of the unique objects used to build uniqueObjects

	ko.utils.arrayForEach(filter.choices(), function(choice){
	if(choice.value()){
		 filteredObjects = ko.utils.arrayFilter(filteredObjects, choice.filterFunction);
		 ko.utils.arrayForEach(filteredObjects, function(object){
			if( !index[ object.name() + object.carrier() + object.storage() + object.color() ]){ // a new device! 
				index[ object.name() + object.carrier() + object.storage() + object.color() ] = true;
				uniqueObjects.push(object);
			}
		});
		filteredObjects = objects; // reset for next 'choice' in the given filter
		}
	});
	return uniqueObjects;
}

var filterNoneChecked = function(filter){
	// we'll try to disprove our hypotheses 
	var noneChecked = true; 
	ko.utils.arrayForEach(filter.choices(), function(choice){
		if(choice.value()){ // checked
			noneChecked = false;
		}
	});
	return (noneChecked); 
}

var DevicesModel = function(initial_categories) {
	// Data
	var self = this;

	// used for editing, borrowing pattern from ko docs
	self.chosenDevice = ko.observable();
	self.chosenCategory = ko.observable();

	// map json data into observable goodness
	self.devices = ko.mapping.fromJS([]);
	// ko.mapping.fromJS(initial_devices, self.devices); // black magic
	self.filters = ko.mapping.fromJS([]);
	// ko.mapping.fromJS(initial_filters, self.filters); // black magic
	self.categories = ko.mapping.fromJS([]);
	ko.mapping.fromJS(initial_categories, self.categories); // more black magic

	self.filteredDevices = ko.observable();

	self.activeDevices = ko.computed(function(){
		return ko.utils.arrayFilter(self.filteredDevices(), function(device){
			return isListed(device);
		})
	}, self);

	// self.totalActive = ko.computed(function(){
	// 	var count = 0;
	// 	ko.utils.arrayForEach(self.categories(), function(category){
	// 		count += category.activeCount();
	// 	});
	// 	return count;
	// });

	self.chosenCategory = ko.observable();

	self.commitAll = function() {
		ko.utils.arrayForEach(self.chosenDevice().prices(), function(price) {
			price.listed.commit();
			price.price.commit();
		});
	};
	self.resetAll = function() {
			ko.utils.arrayForEach(self.chosenDevice().prices(), function(price) {
			price.listed.reset();
			price.price.reset();
		});
	};
	self.editDevice = function(device) {
		self.chosenDevice(device);
	};
	self.setFilters = function(filtersJSON){
		ko.mapping.fromJS(filtersJSON, self.filters); // black magic
		self.updateFilters();
		self.setCategoryActiveCounts();
	}
	self.setDevices = function(devicesJSON){
		ko.mapping.fromJS(devicesJSON, self.devices); // black magic
		self.updateFilters();
		self.setCategoryActiveCounts();
	}
	self.updateFilters = function(){
		var _devices = self.devices();
		ko.utils.arrayForEach(self.filters(), function(filter) {
			setFilterCounts(self.devices(), filter);
			if( !filterNoneChecked(filter) ){ // skip when no checkboxes are checked for a given filter
				_devices = setFilter(_devices, filter);
			}
		 });
		self.filteredDevices(_devices);
	};
	self.clearFilters = function(){
		ko.utils.arrayForEach(self.filters(), function(filter) {
			ko.utils.arrayForEach(filter.choices(), function(choice){
				choice.value(false);
			});
		});
	};
	self.getFakePriceRank = function(price){
		if(!price) return "IDK LOL";
		_priceAsInt = parseInt(price.price());
		if( _priceAsInt > 200 ){ return "Competitive"; }
		if( _priceAsInt > 100 ){ return "Competitive"; }
		if( _priceAsInt > 50 ){ return "Average"; }
		if( _priceAsInt > 10 ){ return "Below Average"; }
		if( _priceAsInt > 1 ){ return "unrakned"; }
		return "";
	};
	self.setCategoryActiveCounts = function(){
		ko.utils.arrayForEach(self.categories(), function(category){
			var count = 0;
			ko.utils.arrayForEach(category.devices(), function(device){
				if( isListed(device) ){
					count++;
				}
			});
			category.activeCount(count);
		});
	};
}

// ====================
// Initialization
// ====================

var devicesModel = new DevicesModel(initialCategories);
ko.applyBindings(devicesModel);


// ====================
// Event Subscriptions
// ====================

// for drop-down changes
devicesModel.chosenCategory.subscribe(function(category) {
	if(!category){
		devicesModel.setFilters([]);
		devicesModel.setDevices([]);
	}
	else {
		devicesModel.setFilters(category.filters());
		devicesModel.setDevices(category.devices());
	}
});
