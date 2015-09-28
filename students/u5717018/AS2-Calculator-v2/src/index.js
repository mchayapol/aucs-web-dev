angular.module( 'Calculator', [] )
.controller( 'CalculatorCtrl', [ '$scope', '$document', 'calService', function ( $scope, $document, calService ) {
	$scope.calService = calService;
	$document.on( 'keydown', function ( event ) {
		if ( event.which === 8 ) { // backspace key
			event.preventDefault();
			calService.backspace();
			$scope.$apply();
		}
	} );
	$document.on( 'keypress', function ( event ) {
		var key = String.fromCharCode( event.which );
		if ( key === '\r' ) key = '='; // override carriage return w/ equal sign
		$scope.$broadcast( 'keypressed', key );
		// console.log( event, key );
	} );
} ] )
.factory( 'calService', [ function () {
	var cal = {};
	cal.instruction = '';
	cal.operators	= [ '+', '-', '*', '/', '=' ];
	cal.inputs = [ '7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '+', '=' ];
	cal.clearNext	= false;
	cal.clearInstruction = function () {
		cal.instruction = '';
	};
	cal.appendInstruction = function ( cmd ) {
		cal.instruction += cmd;
	};
	cal.backspace = function () {
		if ( cal.instruction.length > 1 ) cal.instruction = cal.instruction.substring( 0, cal.instruction.length - 1 );
	};
	cal.compute = function () {
		try {
			cal.instruction = eval( cal.instruction );
		} catch ( err ) {
			console.warn( err );
			cal.instruction = 'Syntax error';
		}
	};
	cal.isOperator = function ( inp ) {
		return cal.operators.indexOf( inp ) !== -1;
	};
	return cal;
} ] )
.directive( 'digitBtn', [ 'calService', function ( calService ) {
	function controller( $scope, $element ) {
		$scope.$on( 'keypressed', function ( event, char ) {
			if ( char === $scope.inp ) $element.click();
		} );
		$element.on( 'click', function () {
			if ( calService.clearNext && !calService.isOperator( $scope.inp ) ) {
				calService.clearInstruction();
			}
			calService.clearNext = false;
			if ( $scope.inp === '=' ) {
				calService.compute();
				calService.clearNext = true;
			} else {
				calService.appendInstruction( $scope.inp );
			}
			$scope.$apply();
		} );
	}
	return {
		restrict: 'E',
		replace: true,
		template: '<button class="cal-btn-sm">{{inp}}</button>',
		controller: controller
	};
} ] )

;
