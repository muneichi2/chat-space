$(function(){
  function buildHTML(message){
    var image = '';
        if (message.image){
          var image = `<img src="${message.image}">`
        }
    var html = `<div class="message" data-message-id=${message.id}>
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${message.name}
                    </div>
                    <div class="upper-message__date">
                      ${message.time}
                    </div>
                  </div>
                  <div class="lower-message">
                    <p class="lower-message__content">
                      ${message.text}
                    </p>
                  </div>
                  ${image}
                </div>`
    return html;
  }

  function scroll(){
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
  }

  $('#new_message').on('submit', function(e){
    var formData = new FormData(this);
    var url = $(this).attr('action');
    e.preventDefault();
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
    })
    .fail(function(){
      alert('error');
    })
    .always(function(){
      $('.form__message').val('');
      $('.form__submit').prop("disabled", false);
      $('form')[0].reset();
      scroll()
    })
  });

$(function(){
  setInterval(update, 5000);
})
  function update(){
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
    var data = $('.message').last().data('message-id');
    $.ajax({
      url: location.href,
      type: 'GET',
      data: { id: data },
      dataType: 'json'
    })
    .done(function(data){
      console.log(data);
      data.forEach(function(message){
      var html = buildHTML(message);
      $('.messages').append(html);
      scroll()
      })
    })
    .fail(function(){
      alert('自動更新に失敗しました');
    })
    }
  }
});
