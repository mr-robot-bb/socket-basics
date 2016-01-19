var name = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room');
console.log(name + ' wants to join ' + room);

var socket = io();

socket.on('connect', function(){
	console.log('Connected to socket.io server');
});

socket.on('message', function(message){
	console.log('New message');
	console.log(message.text);
	var timestampMoment = moment.utc(message.timestamp);
	var $message = jQuery('.messages');

	$message.append('<p><strong>' + message.name + ' ' + timestampMoment.local().format("h:mma") + '</strong></p>');
	$message.append('<p>'+  message.text +'</p>');
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