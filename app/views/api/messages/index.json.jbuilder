json.array! @messages do |message|
  json.id message.id
  json.content message.content
  json.user_id message.user_id
  json.created_at message.created_at.strftime("%Y/%m/%d/(%a) %T")
  json.name message.user.name
  json.image message.image.url
end