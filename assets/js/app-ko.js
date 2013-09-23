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

var containsString = function(needle, haystack){
    if(haystack.indexOf(needle) < 0){
        return false;
    }
    else
    {
        return true;
    }
};

var trueFxn = function(){
    return true;
}

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
    },
    {   name: "iPad Mini", carrier: "AT&T", storage: "32GB",
        color: "black",  
        prices: [
        { condition: "Broken", listed : "0", purchased: "3", price: "111" },
        { condition: "Used", listed : "0", purchased: "6", price: "222" },
        { condition: "Excellent", listed : "0", purchased: "2", price: "333" }
        ]
    }
];

var initialFilters = [
    {   name: "Device",   
        choices: [
            { label: "iPhone", value: false, id: "iPhone", 
                filterFunction: function(item){ return containsString("iPhone", item.name()); }
            },
            { label: "iPad", value: false, id: "", 
                filterFunction: function(item){ return containsString("iPad", item.name()); } 
            }
        ]
    },
    {   name: "iPhone Model",   
        choices: [
            { label: "iPhone 4", value: false, id: "",
               filterFunction: function(item){ return item.name() === "iPhone 4"; }
            },
            { label: "iPhone 4S", value: false, id: "", 
               filterFunction: function(item){ return item.name() === "iPhone 4S"; }
            },
            { label: "iPhone 5", value: false, id: "",
               filterFunction: function(item){ return item.name() === "iPhone 5"; }
            }
        ]
    },
    {   name: "Carrier",   
        choices: [
            { label: "Verizon", value: false, id: "", 
                filterFunction: function( item ){ return item.carrier() === "Verizon"; }
            },
            { label: "AT&T", value: false, id: "", 
                filterFunction: function( item ){ return item.carrier() === "AT&T"; }
            },
            { label: "T-Mobile", value: false, id: "", 
                filterFunction: function( item ){ return item.carrier() === "T-Mobile"; }
            },
            { label: "Sprint", value: false, id: "", 
                filterFunction: function( item ){ return item.carrier() === "Sprint"; }
            },
            { label: "Other / Unlocked", value: false, id: "",
                    filterFunction: function( item ){ return item.carrier() === "Other / Unlocked"; }
            }
        ]
    },
    {   name: "Size",   
        choices: [
            { label: "64GB", value: false, id: "", 
                filterFunction: function( item ){ return item.storage() === "64GB"; } 
            },
            { label: "32GB", value: false, id: "", 
                filterFunction: function( item ){ return item.storage() === "32GB"; } 
            },
            { label: "16GB", value: false, id: "", 
                filterFunction: function( item ){ return item.storage() === "16GB"; } 
            },
            { label: "8GB", value: false, id: "", 
                filterFunction: function( item ){ return item.storage() === "8GB"; } 
            }
        ]
    },
    {   name: "Color",   
        choices: [
            { label: "White", value: false, id: "", 
                filterFunction: function( item ){ return item.color() === "white"; } 
            },
            { label: "Black", value: false, id: "", 
                filterFunction: function( item ){ return item.color() === "black"; } 
            }
        ]
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

 var setFilter = function(objects, filter){
   var filteredObjects = objects;
   var uniqueObjects = [];
   var index = {};

   ko.utils.arrayForEach(filter.choices(), function(choice){
      if(choice.value()){
         filteredObjects = ko.utils.arrayFilter(filteredObjects, choice.filterFunction);
         ko.utils.arrayForEach(filteredObjects, function(object){
            if( !index[ object.name() + object.carrier() + object.storage() + object.color() ]){ // a new device! 
               index[ object.name() + object.carrier() + object.storage() + object.color() ] = true;
               uniqueObjects.push(object);
            }
         });
         filteredObjects = objects;
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

var DevicesModel = function(initial_devices, initial_filters) {
    // Data
    var self = this;
    self.chosenDevice = ko.observable(); // used for editing, borrowing pattern from ko docs

    // map json data into observable goodness
    self.devices = ko.mapping.fromJS([]);
    ko.mapping.fromJS(initial_devices, self.devices); // black magic
    self.filters = ko.mapping.fromJS([]);
    ko.mapping.fromJS(initial_filters, self.filters); // black magic

    self.filteredDevices = ko.observable();

    self.activeDevices = ko.computed(function(){
        return ko.utils.arrayFilter(self.filteredDevices(), function(device){
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
    self.updateFilters = function(){
         var _devices = self.devices();
         ko.utils.arrayForEach(self.filters(), function(filter) {
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
        if (parseInt(price.price()) > 200 ){ return "1st"; }
        if (parseInt(price.price()) > 100 ){ return "2nd"; }
        if (parseInt(price.price()) > 50 ){ return "5th"; }
        if (parseInt(price.price()) > 10 ){ return "9th"; }
        return "unranked";
    };
}

var devicesModel = new DevicesModel(initialData, initialFilters);
ko.applyBindings(devicesModel);
