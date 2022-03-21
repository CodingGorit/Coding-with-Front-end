/**
 * Author：Gorit
 * Date：2022年3月21日
 * Refer：《深入理解ES6》
 */
{
    function getValue(condition: boolean) {
        if (condition) {
            var value = "val";
            console.log(value);
            return value
        } else {
            console.log(value); // undefined
            return null;
        }
    }

    function getValueDetail(condition: boolean) {
        var value;
        if (condition) {
            value = "val";
        } else {
            return null;
        }
    }

    getValue(true);
    getValue(false);
}