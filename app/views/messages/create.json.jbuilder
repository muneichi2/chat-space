  json.id  @message.id
  json.text  @message.content
  json.image  @message.image.url
  json.name  @message.user.name
  json.time  @message.created_at.strftime("%Y/%m/%d %H:%M")

