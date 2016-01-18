var socket = io();

socket.on('connect', function(){
	console.log('Connected to socket.io server');
});

socket.on('message', function(message){
	console.log('New message');
	console.log(message.text);
	var timestampMoment = moment.utc(message.timestamp);
	jQuery('.messages').append('<p>' + timestampMoment.local().format("h:mma") + ' ' + message.text + '</p>');
})

// Handles submitting of new message

var $form = jQuery('#message-form');

$form.on('submit', function(event){
	event.preventDefault();

	var $message = $form.find('input[name=message]');

	socket.emit('message', {
		text: $message.val()
	});

	// erase input field and put focus on said input
	$message.val('');
	$message.focus();

});