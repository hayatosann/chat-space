$(function() {
    function buildMessage(message){
     var img =message.image == null ? "" : `<img src="${message.image}" class="lower-message__image">`
     var html = 
              `<div class = "message__upper-info">
                <p class="message__upper-info__talker">
                  ${message.name}
                </p>
                <p class="message__upper-info__date">
                  ${message.created_at}
                </p>
               </div>
               <div class = "lower-message">
                <p class="lower-message__content">
                  ${message.content}
                </p>
                ${img}
              </div>`
    return html;
   }

   function ScrollToNewMessage(){
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'slow');
  }

  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      type: 'POST',
      url: url,
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(message) {
      var html = buildMessage(message);
      $('.messages').append(html);

      ScrollToNewMessage();
	  	$("form")[0].reset();
	  	$(".form__submit").prop('disabled', false);
    })

    .fail(function() {
　   alert('error');
    })

  })
});
  