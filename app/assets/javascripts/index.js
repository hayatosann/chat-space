$(function() {
  var search_list = $("#user-search-result");
  var member_list = $(".chat-group-user__name");

  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id='${user.id}' data-user-name='${user.name}'>追加</a>
                </div>`
    search_list.append(html);
  }
  
  
  function appendUserlist(name, id) {
    var chatmember_list = $("#chat-group-users");
    var html = `<div class='chat-group-user clearfix js-chat-member' id='${id}'>
                  <input name='group[user_ids][]' type='hidden' value='${id}'>
                  <p class='chat-group-user__name'>${name}</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
    chatmember_list.append(html);
  }

  function appendErrMsgToHTML(message) {
    console.log(message);

  }

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();

    
  

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(users) {
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        });
      }
      else {
        appendErrMsgToHTML("一致するユーザーはいません");
      }
    })

    .fail(function() {
      alert('error');
    })
  
  })

  $(document).on("click", ".chat-group-user__btn--add", function() {
    var name = $(this).data('user-name');
    var id = $(this).data('user-id');
    appendUserlist(name, id);
    $(this).parent().remove();
  });
   
  $(document).on("click", ".chat-group-user__btn--remove", function() {
    $(this).parent().remove();
  });

});

