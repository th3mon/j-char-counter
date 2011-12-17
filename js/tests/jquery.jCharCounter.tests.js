(function($){
    $(document).ready(function(){
        var $textarea = $("#textarea");
        var emptyString = "";
        var expected;
        var limit = 40;
        var options = {
            limit: limit,
            callbackOnInvalid: function(){
                alert("Your message is too long!");
            }
        };
        
        var lengthOfShortTextWithURL = 30;
        var shortText = "Some short text";
        var shortTextWithURL = {
            value: "Some www.short.pl text",
            length: lengthOfShortTextWithURL
        };
        
        var longText = shortText + shortText + shortText;
        var longTextWithURL = {
            value: shortTextWithURL.value + shortTextWithURL.value + shortTextWithURL.value,
            length: 3 * lengthOfShortTextWithURL
        };

        var getCounterValue = function(){
            return $counterVal.text() * 1;
        }
        
        var countExpected = function(val){
            return function(){
                return limit - val;
            }()
        }

        var setUp = function(options){
            var textareaValue = options.textareaValue;

            if (typeof textareaValue == "string") {
                $textarea.val(textareaValue);
                $textarea.keyup();
            }
        }
        
        $textarea.jCharCounter(options);
        var $counterVal = $("#counterVal");

        module("module simple strings");
        test("Empty string", function(){
            setUp({
                textareaValue: emptyString
            });

            equals($textarea.val(), emptyString, "Check input if is empty.");
            equals(getCounterValue(), limit, "Check counter value.")
        });

        test("Short text", function(){
            setUp({
                textareaValue: shortText
            });

            ok($textarea.val(), "Check if textarea isn't empty");

            expected = countExpected(shortText.length);
            equal(getCounterValue(), expected, "Check counter if is equal to expected string.");
            ok(getCounterValue() > 0, "Counter should be greater than 0.");
        });

        test("Long text", function(){
            setUp({
                textareaValue: longText
            });

            ok($textarea.val(), "Check if textarea isn't empty");

            expected = countExpected(longText.length);
            equal(getCounterValue(), expected, "Check counter if is equal to expected string.");
            ok(getCounterValue() < 0, "Counter should be miner than 0.");
        });
        
        module("module strings with links");
        test("Short text with link", function(){
            setUp({
                textareaValue: shortTextWithURL.value
            });

            ok($textarea.val(), "Check if textarea isn't empty");

            expected = countExpected(shortTextWithURL.length);
            equal(getCounterValue(), expected, "Check counter if is equal to expected string.");
            ok(getCounterValue() > 0, "Counter should be greater than 0.");
        });

        test("Long text", function(){
            setUp({
                textareaValue: longTextWithURL.value
            });

            ok($textarea.val(), "Check if textarea isn't empty");

            expected = countExpected(longTextWithURL.length);
            equal(getCounterValue(), expected, "Check counter if is equal to expected string.");
            ok(getCounterValue() < 0, "Counter should be miner than 0.");
        });
        
    });
})(jQuery);