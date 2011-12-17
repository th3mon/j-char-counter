(function($){
    $.fn.textareaCharCounter = function(options) {
        var self = undefined;
        var form = undefined;
        var valid = undefined;
        var $counterVal = undefined;

        var defaults = {
            limit: 140,
            messageHTML: null,
            twitterMode: true,
            charsCounterID: "charsCounter",
            counterValID: "counterVal",
            errorClass: "error_message",
            enableSubmitButtonClass: "enable-submit-button",
            disableSubmitButtonClass: "disable-submit-button"
        };

        options = $.extend(defaults, options);

        var countLinksChars = function(value){
            var linksLength = 0;
            var linkPattern = /(http?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*/gi;
            var securedLinkPattern = /https:\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*/gi;
            var linksFound = value.match(linkPattern) || [];
            var securedLinksFound = value.match(securedLinkPattern) || [];
            var index = 0;

            var countLinksChars = function(){
                if (linksFound.length > 0) {
                    for (index = 0; index < linksFound.length; index++) {
                        linksLength += linksFound[index].length - 20;
                    }
                }
            }

            var countSecuredLinksChars = function(){
                if (securedLinksFound.length > 0) {
                    for (index = 0; index < securedLinksFound.length; index++) {
                        linksLength += securedLinksFound[index].length - 21;
                    }
                }
            }

            return function(){
                countLinksChars();
                countSecuredLinksChars();

                return linksLength;
            }()
        }

        var count = function(){
            var linksLength = 0;
                
            if (true === options.twitterMode) {
                linksLength = countLinksChars(self.val());
            }
            
            var textareaValueLength = self.val().length;
            textareaValueLength -= linksLength;

            validTextareaValueLength(textareaValueLength);

            return options.limit - textareaValueLength;
        }

        var coverSubmitButton = function(){
            if (valid) {
                form.find(addDot(options.disableSubmitButtonClass))
                .removeClass(options.disableSubmitButtonClass)
                .addClass(options.enableSubmitButtonClass);
            } else {
                form.find(addDot(options.enableSubmitButtonClass))
                .removeClass(options.enableSubmitButtonClass)
                .addClass(options.disableSubmitButtonClass);
            }
        }

        var addDot = function(CSSClass){
            return "." + CSSClass;
        }
        
        var buildHTMLForCounterAndPutValueForIt = function(){
            if (null === options.messageHTML) {
                options.messageHTML = '<span id="' + options.charsCounterID + '" class="margin-left-5">Characters: <span id="' + options.counterValID + '"></span></span>';
            }

            self.after(options.messageHTML);

            putCounterValue();
        }

        var putCounterValue = function(){
            $counterVal = $("#" + options.counterValID);
            
            var textareaValueLength = count();

            $counterVal.html(textareaValueLength);
        }
        
        var validTextareaValueLength = function(textareaValueLength) {
            if (textareaValueLength > options.limit ){
                $("#"+options.charsCounterID).addClass(options.errorClass);
                valid = false;
            } else {
                $("#"+options.charsCounterID).removeClass(options.errorClass);
                valid = true;
            }
        }
        
        var signUpKeyupEvent = function(){
            self.keyup(function(){
                $counterVal.html("" + count() + "");
                coverSubmitButton();
            });
        }

        var throwsException = function(){
            self.each(function(){
                if(this.tagName.toLowerCase() !== "textarea"){
                    throw "jquery.textareaCharCounter.js works only on textarea.";
                }
            });
        }
        
        var setMainVariables = function(textarea){
            self = $(textarea);
            throwsException();

            form = self.parents("form");
        }

        var init = function(textarea){
            setMainVariables(textarea);
            buildHTMLForCounterAndPutValueForIt();
            coverSubmitButton();
            signUpKeyupEvent();
        }

        return this.each(function() {
            init(this);
        });
    };
})(jQuery);