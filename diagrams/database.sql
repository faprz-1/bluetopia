
// > many-to-one; < one-to-many; - one-to-one

Table ACL {
  id int [pk, increment] // auto-increment
  model varchar
  property varchar
  accessType varchar
  permission varchar
  principalType varchar
  principalId varchar [ref: > Usuario.id]
}

Table ActionLogger {
  id int [pk, increment] // auto-increment
  clasification varchar
  action varchar
  ip varchar
  requestMethod varchar
  headers varchar
  username varchar
  email varchar
  userId int [ref: > Usuario.id]
  body longtext
  result longtext
  query varchar
  error mediumtext
  timestamp varchar [note: 'When created']
  status tinyint
  statusCode varchar
}

Table Notification {
  id int [pk, increment] // auto-increment
  title varchar [not null]
  content varchar [not null]
  timestamp datetime [note: 'When created']
  image varchar
  link varchar
  seen datetime
  usuarioId int [ref: > Usuario.id]
}

Table OrdersHistory {
  id int [pk, increment] // auto-increment
  orderId varchar [note: 'Order id from Conekta', not null]
  productsList text [not null]
  totalPrice varchar [not null]
  refounded tinyint
  userId int [ref: > Usuario.id]
}

Table PasswordResetPIN {
  id int [pk, increment] // auto-increment
  pin varchar [not null]
  email varchar [not null]
  expDate varchar [not null]
}

Table PushTokens {
  id int [pk, increment] // auto-increment
  mobile tinyint [not null]
  usuarioId int [ref: > Usuario.id]
}

Table Role {
  id int [pk, increment] // auto-increment
  name varchar
  description varchar
  created datetime 
  modified datetime
}

Table RoleMapping {
  id int [pk, increment] // auto-increment
  principalType varchar
  principalId varchar [ref: > Usuario.id]
  roleId int [ref: > Role.id]
}

Table UploadedFiles {
  id int [pk, increment] // auto-increment
  URL varchar [not null]
  name varchar [not null]
  resize tinyint
  uploaded datetime
}

Table UserPermissionPolicyNode {
  id int [pk, increment] // auto-increment
  key varchar [not null]
  name varchar [not null]
  parentId int [ref: > UserPermissionPolicyNode.id, note: 'many to many']
}

Table UserPermissionPolicyRelation {
  id int [pk, increment] // auto-increment
  userPermissionPolicyNodeId int [ref: > UserPermissionPolicyNode.id]
  usuarioId int [ref: > Usuario.id]
}

Table Usuario {
  id int [pk, increment] // auto-increment
  FBToken varchar
  GToken varchar
  AppleToken longtext
  active tinyint
  customerId varchar [note: 'Customer id from Conekta']
  realm varchar
  username varchar
  password varchar
  email varchar
  emailVerified tinyint
  verificationToken varchar
  profileImageId varchar [ref: - UploadedFiles.id]
}

Table UsuarioAccessToken {
  id int [pk, increment] // auto-increment
  ttl int
  scopes text
  created datetime
  userId int [ref: > Usuario.id]
}