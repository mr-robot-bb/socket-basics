var name = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room');
console.log(name + ' wants to join ' + room);

var socket = io();

socket.on('connect', function(){
	console.log('Connected to socket.io server');
	socket.emit('JoinRoom', {
		name: name,
		room: room
	});
});

jQuery('.room-title').text(room);

socket.on('message', function(message){
	console.log('New message');
	console.log(message.text);

	var timestampMoment = moment.utc(message.timestamp);
	var $messages = jQuery('.messages');
	var $message = jQuery('<li class="list-group-item"></li>');

	$message.append('<p><strong>' + message.name + ' ' + timestampMoment.local().format("h:mma") + '</strong></p>');
	$message.append('<p>'+  message.text +'</p>');
	$messages.append($message);
})

// Handles submitting of new message

var $form = jQuery('#message-form');

$form.on('submit', function(event){
	event.preventDefault();

	var $message = $form.find('input[name=message]');

	socket.emit('message', {
		name: name,
		text: $message.val()
	});

	// erase input field and put focus on said input
	$message.val('');
	$message.focus();

});