$(function(){
  var user_list = $("#user-search-result");
  var current_user_list = $("#chat-group-users");
  $(document).on('click',".user-search-add",function(){
    $(this).parent().remove();
  var id = $(this).data("user-id");
  var name = $(this).data("user-name");
  appendAddUser(id,name);
  });
  $(document).on('click',".user-search-remove",function(){
    $(this).parent().remove();
  })
  function appendUser(user){
    var html = `<div class="chat-group-form__search.clearfix">
                  <p class="chat-group-user">${user.name}
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                  </p>
                </div>`
    user_list.append(html);
  }
  function appendNoUser(nouser){
    var html = `<div class="chat-group-form__search.clearfix">
                  <p class="chat-group-user">${nouser}</p>
                </div>`
    user_list.append(html);
  }
  function appendAddUser(id,name){
    var add_name_html =`<div class="chat-group-user.clearfix">
                          <p class="chat-group-user">${name}
                          <a class="user-search-remove chat-group-user__btn chat-group-user__btn--remove" {'data-user-id': user.id}>削除</a>
                          <input name='group[user_ids][]' type='hidden' value=${id}>
                          </p>
                        </div>`
    current_user_list.append(add_name_html);
  }
  $('#user-search-field.chat-group-form__input').on('keyup', function(e){
    e.preventDefault();
    var input = $(this).val();
    if(input.length == 0){
      return false;
    }
    $.ajax({
      url: '/users',
      type: 'GET',
      data: { keyword : input },
      dataType: 'json'
    })
    .done(function(users){
      $(".user-search-result").empty();
      if (users.length !== 0 ){
        users.forEach(function(user){
        appendUser(user);
    });
    }
      else {
        appendNoUser("一致するユーザーは存在しません");
      }
  })
    .fail(function(){
      alert('error');
    });
  });
});
