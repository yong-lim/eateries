function formFocus() {
  $('#alert-field').hide().addClass('is-hidden');
}

function formReset() {
  // console.log("in formReset");
  $('#alert-field').show()
    .html("<span><p>Thank you for telling us . . .</p></span><br>");
  document.getElementById("formID").reset();
  setTimeout(() => {
    $('#sendButton').show();
    $('#alert-field').hide();
    console.log('setTimeout for 3 seconds!'); 
  }, 3000);
}

function hasError() {
  $('#sendButton').show();
  $('#alert-field').show()
    .html("<span><p><b>Oh no! Something went wrong. Please let us know of your problem.</b></p></span>");
  alert('Oh no! something went wrong. Please let us know of your problem.');
}

function pleaseWaite() {
  $('#sendButton').hide();
  $('#alert-field').show()
    .html("<span><p>Please wait while we're sending your message . . .</p>  <progress></progress></span>");
}

//selector from your HTML form
function postEatery(e) {
  // console.log("in postEatery");
  // prevent the form from submiting so we can post to the google form
  e.preventDefault();
  pleaseWaite();

  // form is in yong@yonglim.com
  const formID  = "1FAIpQLSf6Paftyz8sBWHuG9TfaWcspP8LN0Mw-0ubF6KyGu3b9NpGGQ";
  const formURL = `https://docs.google.com/forms/d/e/${formID}/formResponse`;     
  //AJAX request
  $.ajax({
    //The public Google Form url, but replace /view with /formResponse
    url: formURL,
    data: $('#formID').serialize(), //Nifty jquery function that gets all the input data 
    type: 'POST', //tells ajax to post the data to the url
    dataType: "xml", //the standard data type for most ajax requests
    // mode: 'no-cors',
    // header: { 'Content-Type': 'application/json' },
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
        hasError();
      }
    }  
  });
}
