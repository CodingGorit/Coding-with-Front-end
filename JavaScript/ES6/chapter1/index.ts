/**
 * Author：Gorit
 * Date：2022年3月21日
 * Refer：《深入理解ES6》
 */


/**
 * var declare
 */
{
    function getVarValue(condition: boolean) {
        if (condition) {
            var value = "val";
            console.log(value);
            return value
        } else {
            console.log(value); // undefined
            return null;
        }
    }

    function getVarValueDetail(condition: boolean) {
        var value;
        if (condition) {
            value = "val";
        } else {
            return null;
        }
    }

    getVarValue(true);
    getVarValue(false);
}

/**
 * let declare
 */
{
    function getLetValue(condition: boolean) {
        if (condition) {
            let value = "val";
            console.log(value);
            return value
        } else {
            // console.log(value); // error
            return null;
        }
    }

    // getLetValue(false);
}