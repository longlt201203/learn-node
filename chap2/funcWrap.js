function FuncWrapper(func) {
    const _func = func;

    return {
        call: (...args) => {
            console.log(`${func.name} is called with data:`);
            console.log(args);
            const funcData = _func(...args);
            console.log("Modifying the return data...");
            const returnData = funcData+1;
            return returnData;
        }
    };
}

/**
 * 
 * @param {number} a 
 * @param {number} b 
 * @returns {number}
 */
function sum(a, b) {
    return a+b;
}

function main() {
    const wrappedFunc = FuncWrapper(sum);
    // 1 + 1 = 3
    console.log(wrappedFunc.call(1, 1));
}

main();