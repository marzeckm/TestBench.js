/**
 * COnsoleService provides basic method for printing in the console
 * @returns {ControlService}
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
         * @returns {void}
         */
        success: function(message){
            if(this._supportsStyles){
                console.log(['%c', message].join(''), 'color: green;');
            }else{
                console.info(message);
            }
        },

        /**
         * Prints an error
         * 
         * @public @function error
         * @param {string} message 
         * @returns {void}
         */
        error: function(message){
            if(this._supportsStyles){
                console.log(['%c', message].join(''), 'color: red;');
            }else{
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
                console.log('\n', message);
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