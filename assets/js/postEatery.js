function formFocus() {
  $('#alert-field')
    .hide()
    .addClass('is-hidden');
 }

function formReset() {
  $('#alert-field')
    .show()
    .html("<span><p>Thank you for dropping us a line . . .</p></span><br>");
  document.getElementById("formID").reset();
  setTimeout(() => {
    $('#sendButton').show();
    $('#alert-field').hide();
    console.log('This alert appeared after 3 second!'); 
  }, 2000);
}

//selector from your HTML form
function postEatery(e) {
  //prevent the form from submiting so we can post to the google form
  e.preventDefault();
  console.log("in postEatery");
  $('#sendButton').hide();
  $('#alert-field')
    .show()
    .html("<span><p>Please wait while we're sending your messgae . . .</p>  <progress></progress></span>");

  //AJAX request
  $.ajax({
    //The public Google Form url, but replace /view with /formResponse
    url: 'https://docs.google.com/forms/d/e/1FAIpQLSf6Paftyz8sBWHuG9TfaWcspP8LN0Mw-0ubF6KyGu3b9NpGGQ/formResponse',     
    data: $('#formID').serialize(), //Nifty jquery function that gets all the input data 
    type: 'POST', //tells ajax to post the data to the url
    dataType: "json", //the standard data type for most ajax requests
    statusCode: { //the status code from the POST request
      0: function(data) { //0 is when Google gives a CORS error, don't worry it went through
       //success
        formReset();
       }, 
       200: function(data) {//200 is a success code. it went through!
         //success
         // $('#form-success').text('hooray! 200');
        formReset();
       },
       403: function(data) {//403 is when something went wrong and the submission didn't go through
         //error
         alert('Oh no! something went wrong. Please let us know of your problem.');
       }
    }  
  });
};
