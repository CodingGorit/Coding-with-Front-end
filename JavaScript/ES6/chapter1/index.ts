/**
 * Author：Gorit  
 * Date：2022年3月21日  
 * Refer：《深入理解ES6》 
 */
enum TAG {
    VAR = "var",
    LET = "let",
    DUPLICATE = "dup",
    CONST = "const"
}

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

// 禁止重复声明
{
    // var value = 30;  // error
    
    let value = 20;

    // ====================    
    let condition: boolean;
    var cnt = 40;

    if (condition) {
        let cnt = 50;   // ok 会覆盖全局作用域中的 cnt

    }
    console.log(TAG.DUPLICATE,"cnt is =>", cnt);    // 40
}