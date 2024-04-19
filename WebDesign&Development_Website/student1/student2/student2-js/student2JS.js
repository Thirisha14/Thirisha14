let count = sessionStorage.getItem('PageLoad');
const url = '/student1/student1-html/splash.html';

function UrlExists(url)
{
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status!=404;
}


if (count == null) {
  document.addEventListener('DOMContentLoaded',()=>{
    var flag = UrlExists(url);
    if (flag){
      window.location.href = url;
    } else {
      alert("The splash page is missing.")
    }
   });
   sessionStorage.setItem('PageLoad', 1);
}

// initalising the const used in the code

const showButton = document.getElementById('showDialog');
const favDialog = document.getElementById('favDialog');
const confirmBtn = favDialog.querySelector('#confirmBtn');

const ratingBtns = document.getElementById('rating-btns');
const ratingReason = document.getElementById('rating-reason');
const websiteSuggestions = document.getElementById('website-suggestions');

const ratingBtnBorder =  document.getElementById('rating-label-border');
const ratingReasonBorder =  document.getElementById('rating-reason-border');
const websiteSuggestionsBorder =   document.getElementById('website-suggestions-border');
const resetBtn = document.querySelector(".form-cancel-reset input[type='reset']");

// functions to open close the feedback form
const showDialog = () => {
  favDialog.showModal();
  document.getElementById('favDialog').classList.add('show')
  const scrollY = document.documentElement.style.getPropertyValue('--scroll-y');
  const body = document.body;
  body.style.position = 'fixed';
  body.style.top = `-${scrollY}`;
};
const closeDialog = () => {
  const body = document.body;
  const scrollY = body.style.top;
  body.style.position = '';
  body.style.top = '';
  window.scrollTo(0, parseInt(scrollY || '0') * -1);
  document.getElementById('favDialog').classList.remove('show');
}
window.addEventListener('scroll', () => {
  document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
});

// "Show the dialog" button opens the <dialog> modally
showButton.addEventListener('click', showDialog);

// "Confirm" button of form triggers "close" on dialog because of [method="dialog"]
favDialog.addEventListener('close', closeDialog);



// reseting the form
resetBtn.addEventListener('click', () => {
  if (ratingBtnBorder.classList.contains('not-filled')){
    ratingBtnBorder.classList.remove('not-filled');
  }

  if (ratingReasonBorder.classList.contains('not-filled')){ 
    ratingReasonBorder.classList.remove('not-filled');
  }

  if (websiteSuggestionsBorder.classList.contains('not-filled')){
    websiteSuggestionsBorder.classList.remove('not-filled');
  }
});

// validating the form and sending the data to formspree
// function is asynchronus to allow for the fetch to complete before the form is closed
confirmBtn.addEventListener('click', async (e) => {
  var rating_val;
  var rating_reason;
  var website_suggestions;
  var alertStringFormat = "";
  var alertString = "Please fill out the following fields: ";

  var isChecked = document.querySelector("[name='website-rating']:checked");

  if (isChecked == null){
   ratingBtnBorder.classList.add('not-filled');
   alertStringFormat += "Website Rating, ";
  } else{
    if (ratingBtnBorder.classList.contains('not-filled')){
      ratingBtnBorder.classList.remove('not-filled');
    }
    rating_val = isChecked.value;
  }

  if (ratingReason.value == ""){
    ratingReasonBorder.classList.add('not-filled');
    alertStringFormat += "Rating Justification, ";
  } else{
    if (ratingReasonBorder.classList.contains('not-filled')){
      ratingReasonBorder.classList.remove('not-filled');
    }
    rating_reason = ratingReason.value;
  }

  if (websiteSuggestions.value == ""){
    websiteSuggestionsBorder.classList.add('not-filled');
    alertStringFormat += "Website Suggestions.";
  } else{
    if (websiteSuggestionsBorder.classList.contains('not-filled')){
      websiteSuggestionsBorder.classList.remove('not-filled');
    }
    website_suggestions = websiteSuggestions.value;
  }

  if (!(alertStringFormat == "")){
    e.preventDefault();
  }

  alert("Thank you for your feedback!");

  if (rating_val == null || rating_reason == null || website_suggestions == null){
    alert(alertString+alertStringFormat);
  } else{
    // setting up the POST request to the formspree API
    const formEmail = await fetch("https://formspree.io/f/mpzejvka", {
      method: "POST",
      // breaking down the javascript object into a string to be sent to the API
      body: JSON.stringify({
        WebsiteRating: rating_val,
        RatingJustification: rating_reason,
        WebsiteSuggestions: website_suggestions
      })
    });
  }
});





