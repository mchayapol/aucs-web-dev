var calContainer = document.getElementById( 'cal-container' );
var calDisp = document.getElementById( 'cal-display' );
var cmd = '';
var clearNext = false;
var operators = [ '+', '-', '*', '/' ];
var inputs = [ '7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '+', '=' ];

// create button element, attach event, and add to DOM
for( var i = 0; i < inputs.length; i ++ ) {
	var inp = document.createElement( 'button' );
	inp.className = 'cal-btn-sm';
	inp.innerHTML = inputs[ i ];
	inp.cmdValue = inputs[ i ].charCodeAt( 0 );
	if ( inp.cmdValue === 61 ) inp.cmdValue = 13; // override '=' with '\r'
	inp.addEventListener( 'click', function () {
		acceptCmd( this.cmdValue );
	} );
	calContainer.appendChild( inp );
}

function updateDisp() {
	calDisp.value = cmd;
}

function isOperator( key ) {
	var ck = String.fromCharCode( key );
	return operators.indexOf( ck ) !== -1;
}

function acceptCmd( key ) {
	if ( isOperator( key ) ) {
		clearNext = false;
	}
	if ( clearNext ) {
		cmd = '';
		clearNext = false;
	}
	if ( key >= 42 && key <= 57 ) {
		cmd = cmd + String.fromCharCode( key );
	} else if ( key === 13 ) {
		try {
			cmd = eval( cmd ) || 0;
		} catch ( err ) {
			cmd = 'Invalid command.';
		}
		clearNext = true;
	}
	updateDisp();
}

document.addEventListener( 'keypress', function ( evt ) {
	evt.preventDefault();
	acceptCmd( evt.charCode );
} );

document.addEventListener( 'keydown', function ( evt ) {
	// backspace support
	if ( evt.which === 8 ) {
		evt.preventDefault();
		if ( cmd.length > 0 ) {
			cmd = cmd.substring( 0, cmd.length - 1 );
			updateDisp();
		}
	}
} )
