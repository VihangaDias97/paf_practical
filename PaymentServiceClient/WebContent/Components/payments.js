$(document).ready(function() {
	if ($("#alertSuccess").text().trim() == "") {
		$("#alertSuccess").hide();
	}
	$("#alertError").hide();
});
// SAVE ============================================
$(document).on("click", "#btnSave", function(event) {
	// Clear alerts---------------------
	$("#alertSuccess").text("");
	$("#alertSuccess").hide();
	$("#alertError").text("");
	$("#alertError").hide();
	// Form validation-------------------
	var status = validateItemForm();
	if (status != true) {
		$("#alertError").text(status);
		$("#alertError").show();
		return;
	}
	// If valid------------------------
	var type = ($("#hidPayment_IDSave").val() == "") ? "POST" : "PUT";

	$.ajax({
		url : "PaymentsAPI",
		type : type,
		data : $("#formPayment").serialize(),
		dataType : "text",
		complete : function(response, status) {
			onPaymentSaveComplete(response.responseText, status);
		}
	});	
});

function onPaymentSaveComplete(response, status) {
	if (status == "success") {
		var resultSet = JSON.parse(response);
		if (resultSet.status.trim() == "success") {
			$("#alertSuccess").text("Successfully saved.");
			$("#alertSuccess").show();
			$("#divPaymentsGrid").html(resultSet.data);
		} else if (resultSet.status.trim() == "error") {
			$("#alertError").text(resultSet.data);
			$("#alertError").show();
		}
	} else if (status == "error") {
		$("#alertError").text("Error while saving.");
		$("#alertError").show();
	} else {
		$("#alertError").text("Unknown error while saving..");
		$("#alertError").show();
	}
	$("#hidPayment_IDSave").val("");
	$("#formPayment")[0].reset();
}

//DELETE=============================================================================
	$(document).on("click", ".btnRemove", function(event) {
		$.ajax({
			url : "PaymentsAPI",
			type : "DELETE",
			data : "Payment_ID=" + $(this).data("Payment_ID"),
			dataType : "text",
			complete : function(response, status) {
				onPaymentDeleteComplete(response.responseText, status);
			}
		});
	});
	
	
	function onPaymentDeleteComplete(response, status) {
		if (status == "success") {
			var resultSet = JSON.parse(response);
			if (resultSet.status.trim() == "success") {
				$("#alertSuccess").text("Successfully deleted.");
				$("#alertSuccess").show();
				$("#divPaymentsGrid").html(resultSet.data);
			} else if (resultSet.status.trim() == "error") {
				$("#alertError").text(resultSet.data);
				$("#alertError").show();
			}
		} else if (status == "error") {
			$("#alertError").text("Error while deleting.");
			$("#alertError").show();
		} else {
			$("#alertError").text("Unknown error while deleting..");
			$("#alertError").show();
		}
	}


// UPDATE==========================================
$(document).on(
		"click",
		".btnUpdate",
		function(event) {
			$("#hidPayment_IDSave").val(
					$(this).closest("tr").find('#hidPayment_IDUpdate').val());
			$("#Payment_amount").val($(this).closest("tr").find('td:eq(0)').text());
			$("#Payment_purpose").val($(this).closest("tr").find('td:eq(1)').text());
			$("#Ruser_ID").val($(this).closest("tr").find('td:eq(2)').text());
			$("#med_ID").val($(this).closest("tr").find('td:eq(3)').text());
		});
// CLIENTMODEL=========================================================================
function validateItemForm() {
	// PaymentPurpose
	if ($("#Payment_purpose").val().trim() == "") {
		return "Insert Payment Purpose.";
	}
	// UserID
	if ($("#Ruser_ID").val().trim() == "") {
		return "Insert User ID.";
	}
	// is numerical value
	var tmpCode = $("#Ruser_ID").val().trim();
	if (!$.isNumeric(tmpCode)) {
		return "Insert Only Numbers for User ID.";
	}
	// PRICE-------------------------------
	if ($("#Payment_amount").val().trim() == "") {
		return "Insert Price.";
	}
	// is numerical value
	var tmpPrice = $("#Payment_amount").val().trim();
	if (!$.isNumeric(tmpPrice)) {
		return "Insert a numerical value for Price.";
	}
	// medID------------------------
	if ($("#med_ID").val().trim() == "") {
		return "Insert med ID.";
	}
	
	return true;
}