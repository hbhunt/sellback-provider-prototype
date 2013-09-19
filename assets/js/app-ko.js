//wrapper to an observable that requires accept/cancel
ko.protectedObservable = function(initialValue) {
    //private variables
    var _actualValue = ko.observable(initialValue),
        _tempValue = initialValue;

    //computed observable that we will return
    var result = ko.computed({
        //always return the actual value
        read: function() {
           return _actualValue();
        },
        //stored in a temporary spot until commit
        write: function(newValue) {
             _tempValue = newValue;
        }
    });

    //if different, commit temp value
    result.commit = function() {
        if (_tempValue !== _actualValue()) {
             _actualValue(_tempValue);
        }
    };

    //force subscribers to take original
    result.reset = function() {
        _actualValue.valueHasMutated();
        _tempValue = _actualValue();   //reset temp value
    };

    return result;
};

var initialData = [
    { 	name: "iPhone 4", carrier: "AT&T", storage: "64GB",
     	color: "black",  
     	prices: [
     		{ condition: "Broken", listed : "0", purchased: "4", price: "100" },
		{ condition: "Used", listed : "0", purchased: "7", price: "200" },
		{ condition: "Excellent", listed : "0", purchased: "1", price: "300" }
        ]
    },
    { 	name: "iPhone 4", carrier: "AT&T", storage: "32GB",
     	color: "black",  
     	prices: [
     		{ condition: "Broken", listed : "0", purchased: "3", price: "101" },
		{ condition: "Used", listed : "0", purchased: "6", price: "201" },
		{ condition: "Excellent", listed : "0", purchased: "2", price: "301" }
        ]
    }
];

var initialFilters = [
    {   name: "Device",   
        choices: [
            { label: "iPhone", value: true, id: "iPhone" },
            { label: "iPad", value: false, id: "" }
        ],
        filterOn: "choices"
    },
    {   name: "iPhone Model",   
        choices: [
            { label: "iPhone 4", value: true, id: "" },
            { label: "iPhone 4S", value: false, id: "" },
            { label: "iPhone 5", value: false, id: "" }
        ],
        filterOn: "choices"
    },
    {   name: "Carrier",   
        choices: [
            { label: "Verizon", value: false, id: "" },
            { label: "AT&T", value: true, id: "" },
            { label: "T-Mobile", value: false, id: "" },
            { label: "Sprint", value: false, id: "" },
            { label: "Other / Unlocked", value: false, id: "" }
        ],
        filterOn: "carrier"
    },
    {   name: "Size",   
        choices: [
            { label: "64GB", value: false, id: "" },
            { label: "32GB", value: false, id: "" },
            { label: "16GB", value: false, id: "" },
            { label: "8GB", value: false, id: "" }
        ],
        filterOn: "size"
    },
    {   name: "Color",   
        choices: [
            { label: "White", value: false, id: "" },
            { label: "Black", value: false, id: "" }
        ],
        filterOn: "color"
    }
];

var isListed = function(device){
   var listed = false;
   ko.utils.arrayForEach(device.prices(), function(price){
      if( parseInt(price.listed()) > 0 ){
         listed = true;
      }
   });
   return listed;
 }

var DevicesModel = function(initial_devices, initial_filters) {
    // Data
    var self = this;
    self.chosenDevice = ko.observable(); // used for editing, borrowing pattern from ko docs

    // map json data into observable goodness
    self.devices = ko.mapping.fromJS([]);
    ko.mapping.fromJS(initial_devices, self.devices); // black magic
    self.filters = ko.mapping.fromJS([]);
    ko.mapping.fromJS(initial_filters, self.filters); // black magic

    self.activeDevices = ko.computed(function(){
        return ko.utils.arrayFilter(self.devices(), function(device){
            return isListed(device);
        })
    }, self);

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
    self.clearFilters = function(){
        ko.utils.arrayForEach(self.filters(), function(filter) {
            ko.utils.arrayForEach(filter.choices(), function(choice){
                choice.value(false);
            });
        });
    };
}

var devicesModel = new DevicesModel(initialData, initialFilters);
ko.applyBindings(devicesModel);
