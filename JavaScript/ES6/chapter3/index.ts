
// function
{
    // 函数形参中的默认值

    // in es5, but it's not secure
    function makeRequest (url, timeout, callback) {
        timeout = timeout || 2000;  // what if timeout is zero?

        callback = callback || function() {};

        // ....
    }

    // in es5, more secure
    function makeRequest1(url, timeout, callback) {
        timeout = (typeof timeout !== 'undefined') ? timeout : 2000;

        callback = (typeof callback !== 'undefined') ? callback : function() {};
    }
}