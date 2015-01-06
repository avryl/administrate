module.exports = {
	cache: {},
	__: function( text, domain, _index ) {
		domain = domain || 'default';
		domain = window._l10n[ domain ];
		_index = _index || 0;

		if ( ! text || ! domain || ! domain.entries[ text ] ) {
			return text;
		}

		return this.decodeHTMLEntities( domain.entries[ text ].translations[ _index ] );
	},
	_x: function( text, context, domain ) {
		return this.__( context + '\u0004' + text, domain );
	},
	_n: function( single, plural, number, domain ) {
		number = parseInt( number, 10 );
		domain = domain || 'default';
		domain = window._l10n[ domain ];

		if ( number === 1 ) {
			if ( ! single || ! domain.entries[ single ] ) {
				return single;
			}

			return this.decodeHTMLEntities( domain.entries[ single ].translations[ 0 ] );
		}

		if ( ! plural || ! domain.entries[ single ] ) {
			return plural;
		}

		return this.decodeHTMLEntities( domain.entries[ single ].translations[ 1 ] );
	},
	isRtl: function() {
		return this._x( 'ltr', 'text direction' ) === 'rtl';
	},
	decodeHTMLEntities: function( string ) {
		var element;

		if ( string.indexOf( '&' ) === -1 ) {
			return string;
		}

		if ( this.cache[ string ] ) {
			return this.cache[ string ];
		}

		element = document.createElement( 'div' );
		element.innerHTML = string;

		this.cache[ string ] = element.firstChild.nodeValue;

		return this.cache[ string ];
	}
};
