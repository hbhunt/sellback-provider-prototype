var clickable_rows = function(){ 
	$(".clickable-row").click(function() {
		window.document.location = $(this).attr("href");
	});
}

// show ipad when it's checkbox is checked under devices or NO checkboxes are checked under devices
var check_ipad = function(){
	var to_hide = true;
	if( $(".checkbox.ipad").is(':checked') ){ // ipad is checked
		to_hide = false;
	}
	else
	if( !$(".checkbox.ipad").is(':checked') &&
		!$(".checkbox.iphone").is(':checked')){ // neither are checked
		to_hide = false;
	}
	if(to_hide){
		hide_ipad();
	}
	else {
		show_ipad();
	}
}

var show_ipad = function(){
	$("#ipad-model").show();
}

var hide_ipad = function() {
	$("#ipad-model").hide();	
}

var hover_rowspan_fix = function() {
	$('.clickable-row').hover(
		function(e){ // begin hover
			$(this).next().addClass("hover").next().addClass("hover");
		}, 
		function(e){ // end hover
			$(this).next().removeClass("hover").next().removeClass("hover");
		}
	);
	$('.clickable-row-2').hover(
		function(e){ // begin hover
			$(this).addClass("hover");
			$(this).nextUntil(".clickable-row-2").toggleClass("hover");
		}, 
		function(e){ // end hover
			$(this).toggleClass("hover");
			$(this).nextUntil(".clickable-row-2").toggleClass("hover");
		}
	);
	$('.baby-row').hover(
		function(e){ // begin hover
			toggleRowspanHover($(this));
		}, 
		function(e){ // end hover
			toggleRowspanHover($(this));
		}
	);
	$('.baby-middle-row').hover(
		function(e){ // begin hover
			$(this).next().addClass("hover");
			$(this).prev().addClass("hover");
		},
		function(e){ // end hover
			$(this).next().removeClass("hover");
			$(this).prev().removeClass("hover");
		}
	);
	$('.baby-last-row').hover(
		function(e){ // begin hover
			$(this).prev().addClass("hover").prev().addClass("hover");
		},
		function(e){ // end hover
			$(this).prev().removeClass("hover").prev().removeClass("hover");
		}
	);
}

var toggleRowspanHover = function(element){
	// get the baby rows
	$(element).prevUntil(".clickable-row-2").toggleClass("hover");
	$(element).toggleClass("hover");
	$(element).nextUntil(".clickable-row-2").toggleClass("hover");

	// get the clickable row
	if( $(element).prevUntil(".clickable-row-2").length === 0 ){
		$(element).prev().toggleClass("hover");
	}
	else{
		$(element).prevUntil(".clickable-row-2") // find all nodes between current and clickable row
			.last() // pick the last one found, aka the one closest to the clickable row
			.prev().toggleClass("hover") // jump over to the clickable row and add a class.
	}
}

var set_tooltips = function() {
	$('#row-that-triggers-modal').popover({
		title : "Woah!",
		content : "You can click to 'edit' this row.",
		placement : "top",
		animation : "true",
		trigger : "hover",
		container : "body"
	});
	$('#ipad-checkbox').popover({
		title : "Woah!",
		content : "Choosing iPad reveals additional filters.",
		placement : "left",
		animation : "true",
		trigger : "hover",
		container : "body"
	});
}

var watch_values = function() {
	$(".watch").contentChange(function(){
		// $(this).toggleClass("changed");
		$( this ).animate({
          backgroundColor: "#dff0d8",
          color: "#468847"
        }, 600 );
        $( this ).animate({
          backgroundColor: "",
        }, 600 );
	});
}

var price_link_targets = function() {
	$(".baby-row").on("click", function() {
    		var context = ko.contextFor(this); //this is the element that was clicked
    		if (context) {
        			context.$root.editDevice(context.$parent);
    		}
	});
}

var from_to_date_picker = function(fromField, toField){
	var _format = 'MM dd, yy';
	$( fromField ).datepicker({
		changeMonth: true,
		numberOfMonths: 1,
		dateFormat: _format,
		onClose: function( selectedDate ) {
			$( toField ).datepicker( "option", "minDate", selectedDate );
		}
	});
	$( toField ).datepicker({
		defaultDate: "+1w",
		changeMonth: true,
		numberOfMonths: 1,
		dateFormat: _format,
		onClose: function( selectedDate ) {
			$( fromField ).datepicker( "option", "maxDate", selectedDate );
		}
	});
}

var table_row_hover_action = function(){
	$('.table-row-hover-action').children().hide();
	$('.table-row-hover-action').parent().hover(
	function(){ // mouse in
		$(this).find('.table-row-hover-action').children().show();
	},
	function(){ // mouse out
		$(this).find('.table-row-hover-action').children().hide();
	}); // watch the <tr> around the <td>
}

// jquery plugin to watch for changes to arbitrary dom elements
jQuery.fn.contentChange = function(callback){
    var elms = jQuery(this);
    elms.each(
      function(i){
        var elm = jQuery(this);
        elm.data("lastContents", elm.html());
        window.watchContentChange = window.watchContentChange ? window.watchContentChange : [];
        window.watchContentChange.push({"element": elm, "callback": callback});
      }
    )
    return elms;
  }
  setInterval(function(){
    if(window.watchContentChange){
      for( i in window.watchContentChange){
        if(window.watchContentChange[i].element.data("lastContents") != window.watchContentChange[i].element.html()){
          window.watchContentChange[i].callback.apply(window.watchContentChange[i].element);
          window.watchContentChange[i].element.data("lastContents", window.watchContentChange[i].element.html())
        };
      }
    }
  },500);
