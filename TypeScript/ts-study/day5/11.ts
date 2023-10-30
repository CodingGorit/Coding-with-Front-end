
// 接收字符串或者字符串数组，转换为大写 js
{
    const covertToUpperCase = (strOrArray) => {
        if (typeof strOrArray === 'string') {
            return strOrArray.toUpperCase();
        } else if (Array.isArray(strOrArray)) {
            return strOrArray.map(item => item.toUpperCase());
        }
    }
}

// 上述 TS 实现
{
    const convertToUpperCase = (strOrArray:string | string[]) => {
        if (typeof strOrArray === 'string') {
            return strOrArray.toUpperCase();
        } else if (Array.isArray(strOrArray)) {
            return strOrArray.map(item => item.toUpperCase());
        } 
    }
}
// 区分联合类型
{

    const convert = (c: 'a' | 1) => {
  
      switch (c) {
  
        case 1:
  
          return c.toFixed(); // c is 1
  
        case 'a':
  
          return c.toLowerCase(); // c is 'a'
  
      }
  
    }
  
    const feat = (c: { animal: 'panda'; name: 'China' } | { feat: 'video'; name: 'Japan' }) => {
  
      switch (c.name) {
  
        case 'China':
  
          return c.animal; // c is "{ animal: 'panda'; name: 'China' }"
  
        case 'Japan':
  
          return c.feat; // c is "{ feat: 'video'; name: 'Japan' }"
  
      }
  
    };
  
  }
  


// 缩小范围
{
    const convert = (c:'a' | 1) => {
        if (typeof c === 'number') {
            return c.toFixed(1); // c is 1
        } else if (typeof c === 'string') {
            return c.toLocaleLowerCase();
        }
    }
}

// 失效的类型守卫
// {
//     const getName = <T extends Dog | Cat>(animal:T) => {
//         if (isDog(animal)) { // instanceOf 也可以
//             return animal.wang;
//         }
//         return animal.miao
//         // return (animal as Cat).miao // 类型断言
//     }
// }

/**
 * in 和 instanceOf ，类型谓词在泛型类型缩小上室友区别的
 */