(function($){
    $.fn.jCharCounter = function(options) {
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
            errorClass: "error-message",
            callbackOnValid: undefined,
            callbackOnInvalid: undefined            
        };

        options = $.extend(defaults, options);

        var countLinksChars = function(value){
            var linksLength = 0;
            var linkPattern = /[-A-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-A-Z0-9@:%_\+.~#?&//=]*)?/gi
            var linksFound = value.match(linkPattern) || [];
            var index = 0;

            var countLinksChars = function(){
                if (linksFound.length > 0) {
                    for (index = 0; index < linksFound.length; index++) {
                        linksLength += linksFound[index].length - 20;
                    }
                }
            }

            return function(){
                countLinksChars();

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
                $("#" + options.charsCounterID).addClass(options.errorClass);
                valid = false;
            } else {
                $("#" + options.charsCounterID).removeClass(options.errorClass);
                valid = true;
            }
        }
        
        var signUpKeyupEvent = function(){
            self.keyup(function(){
                $counterVal.html("" + count() + "");
            });
        }
        
        var signUpSubmitEvent = function(){
            form.submit(function(){
                if(true === validate()){
                    options.callbackOnValid();
                    return true;
                } else {
                    options.callbackOnInvalid();
                    return false;
                }   
            });
        }
        
        var validate = function(){
            return valid;
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
            signUpKeyupEvent();
            signUpSubmitEvent();
        }

        return this.each(function() {
            init(this);
        });
    };
})(jQuery);