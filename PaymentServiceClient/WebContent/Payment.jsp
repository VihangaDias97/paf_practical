<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    
<%@ page import="javax.servlet.*"%>
<%@ page import="javax.servlet.http.*"%>
<%@ page import="java.sql.*"%>
<%@ page import="java.util.*"%>
<%@ page import="model.Payment"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Payment Management</title>
<link rel="stylesheet" href="Views/bootstrap.min.css">
<script src="Components/jquery-3.4.0.min.js"></script>
<script src="Components/payments.js"></script>
</head>
<body>
	<h1>Payment Management</h1>

 

	<form id="formPayment" name="formPayment" method="post" action="Payment.jsp">
		Payment Amount : <input id="Payment_amount" name="Payment_amount" type="text"
			class="form-control form-control-sm"> <br> Payment Purpose : <input
			id="Payment_purpose" name="Payment_purpose" type="text"
			class="form-control form-control-sm"> <br> User ID : <input
			id="Ruser_ID" name="Ruser_ID" type="text" class="form-control form-control-sm">
		<br> Med ID : <input id="med_ID" name="med_ID" type="text"
			class="form-control form-control-sm"> <br> <input
			id="btnSave" name="btnSave" type="button" value="Save"
			class="btn btn-primary"> <input type="hidden"
			id="hidPayment_IDSave" name="hidPayment_IDSave" value="">
	</form>

	<div id="alertSuccess" class="alert alert-success"></div>
	<div id="alertError" class="alert alert-danger"></div>
	<br>
	<div id="divPaymentsGrid">
		<%
			Payment PaymentObj = new Payment();
			out.print(PaymentObj.readPayments());
		%>
	</div>

</body>
</html>