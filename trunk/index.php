<!DOCTYPE html>
<html>
    <head>
        <title>QUnit Test Suite</title>
        <script type="text/javascript" src="js/lib/jquery-1.7.1.min.js"></script>
        <link rel="stylesheet" href="js/lib/QUnit/1.3/qunit.css" type="text/css" media="screen" />
        <script type="text/javascript" src="js/lib/QUnit/1.3/qunit.js"></script>
        <script type="text/javascript" src="js/jquery.jCharCounter.js"></script>
        <script type="text/javascript" src="js/tests/jquery.jCharCounter.tests.js"></script>
        <link rel="stylesheet" href="css/main.css" type="text/css" media="screen" />
    </head>
    <body>
        <h1 id="qunit-header">QUnit Test Suite</h1>
        <h2 id="qunit-banner"></h2>
        <div id="qunit-testrunner-toolbar"></div>
        <h2 id="qunit-userAgent"></h2>
        <ol id="qunit-tests"></ol>
        <div id="ps">
            <form action="response.php" method="post">
                <textarea cols="100" rows="10"  id="textarea"></textarea>
                <br />
                <input type="submit" />
            </form>
        </div>
    </body>
</html>
