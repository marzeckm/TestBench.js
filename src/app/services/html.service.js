const HtmlService = function(){
    return {
        /**
         * Creates a new HTMl-Node and appends it to another element
         * 
         * @param {string} nodeType 
         * @param {string} innerHtml 
         * @param {HtmlNode | undefined} bindTo? 
         * @param {Map<string, string> | undefined} attributes?
         * 
         * @returns {void}
         */
        createHtmlElement: function(nodeType, innerHtml, bindTo, attributes){
            const htmlNode = document.createElement(nodeType);
            htmlNode.innerHTML = innerHtml;

            const attributeKeys = (attributes ? Object.keys(attributes) : []);
            for(var i = 0; i < attributeKeys.length; i++){
                htmlNode.setAttribute(attributeKeys[i], attributes[attributeKeys[i]]);
            }

            bindTo.appendChild(htmlNode);
        },

        /**
         * Adds a new class to an HTML-Element
         * 
         * @param {HtmlNode} htmlNode 
         * @param {string} addedClass
         * @returns {void}
         */
        addClass: function(htmlNode, addedClass){
            htmlNode.classList.add(addedClass);
        },

        /**
         * Sets attributes of an HTML-Element
         * 
         * @param {HtmlNode} htmlNode 
         * @param {string} attributes
         * @returns {void}
         */
        setAttributes: function(htmlNode, attributes){
            const attributeKeys = Object.keys(attributes);
            for(var i = 0; i < attributeKeys; i++){
                htmlNode.setAttribute(attributeKeys[i], attributes[attributeKeys[i]]);
            }
        }
    }
}