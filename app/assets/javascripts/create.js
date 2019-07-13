$(function() {

  function buildMessage(message){
    var html = 
        `<div class = "message__upper-info">
            <p class="message__upper-info__talker">
              ${message.name}
            </p>
            <p class="message__upper-info__date">
              ${message.created_at}
            </p>
          </div>
            <p class="message__text">
              ${message.content}
              message.image == null ? "" :<img class= "lower-message__image" src=${message.image} >` 
        return html;
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
	  	$(".form__message").val('');
      $(".form__submit").prop('disabled', false);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'slow');
    })

    .fail(function() {
　   alert('error');
    })

  })
});
  