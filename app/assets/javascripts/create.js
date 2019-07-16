$(function() {
    function buildMessage(message){
     var img =message.image == null ? "" : `<img src="${message.image}" class="lower-message__image">`
     var html = `<div class="message" data-message_id="${message.id}">
                  <div class = "message__upper-info">
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
                  </div>
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
      $(".form__submit").prop('disabled', false);
    })

  })

  var reloadMessages = function() {
      if (window.location.href.match(/\/groups\/\d+\/messages/)) {
        var last_message_id = $('.message:last').data("message_id");
        $.ajax({
          url: './api/messages',
          type: 'GET',
          dataType: 'json',
          data: {id: last_message_id}
        })
        .done(function(messages) {
          var insertHTML = '';
          messages.forEach(function(message) {
            insertHTML += buildMessage(message);
          })
          $('.messages').append(insertHTML);
          if (messages.length > 0) {
            $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'slow');
          }
        })
        .fail(function() {
          alert('error');
        });
      };
    };
    setInterval(reloadMessages, 5000);
  });


  