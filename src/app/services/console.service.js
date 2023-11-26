/**
 * ConsoleService provides basic method for printing in the console
 * @returns {ConsoleService}
 */
const ConsoleService = function(){
    return {
        /**
         * @private @var {boolean} supportsStyles
         */
        _supportsStyles: !(/Trident|MSIE/.test(navigator.userAgent)),

        /**
         * Prints a successful message
         * 
         * @public @function success
         * @param {string} message 
         * @param {boolean} isBigger 
         * @returns {void}
         */
        success: function(message, isBigger){
            isBigger = isBigger || false;

            if(this._supportsStyles){
                console.log(['%c', message].join(''), ['color: green;', (isBigger ? 'font-size: 1.25rem;' : '')].join(''));
            }else{
                isBigger ? console.log('') : '';
                console.info(message);
            }
        },

        /**
         * Prints an error
         * 
         * @public @function error
         * @param {string} message 
         * @param {boolean} isBigger 
         * @returns {void}
         */
        error: function(message, isBigger){
            isBigger = isBigger || false;

            if(this._supportsStyles){
                console.log(['%c', message].join(''), ['color: red;', (isBigger ? 'font-size: 1.25rem;' : '')].join(''));
            }else{
                isBigger ? console.log('') : '';
                console.error(message);
            }
        },

        /**
         * prints a comment
         * 
         * @public @function comment
         * @param {string} message 
         * @returns {void}
         */
        comment: function(message){
            if(this._supportsStyles){
                console.log(['%c', message].join(''), 'font-style: italic; color: grey;');
            }else{
                console.log('>', message);
            }
        },

        /**
         * prints a bold text
         * 
         * @public @function bold
         * @param {string} message 
         * @returns {void}
         */
        bold: function(message){
            if(this._supportsStyles){
                console.log(['%c', message].join(''), 'font-weight: 700;');
            }else{
                console.log(['\n', message].join(''));
            }
        },

        /**
         * prints a header
         * 
         * @public @function header
         * @param {string} message 
         * @returns {void}
         */
        header: function(message){
            if(this._supportsStyles){
                console.log(['%c', message].join(''), 'font-weight: 700; font-size: 1.25em;');
            }else{
                console.log('\n>', message, '<\n');
            }
        }
    }
};