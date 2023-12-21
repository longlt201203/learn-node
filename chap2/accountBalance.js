function TriggerWrap(variable) {
    let _v = variable;
    const _triggerMap = {};

    // private setter for v
    const setter = (v) => { _v = v; };
    
    return {
        peek: () => _v,
        /**
         * 
         * @param {string} event 
         * @param {(setter: (v) => void, ...args) => void} handler 
         */
        on: (event, handler) => {
            _triggerMap[event] = handler;
        },
        /**
         * 
         * @param {string} event 
         * @param  {...any} args 
         */
        trigger: (event, ...args) => {
            if (_triggerMap[event]) {
                _triggerMap[event](setter, ...args);
            }
        }
    };
}

function main() {
    const accountBalance = 500000;
    const accountBalanceManager = TriggerWrap(accountBalance);
    accountBalanceManager.on("withdraw", (setter, amount) => {
        // validation
        if (amount <= 0) {
            const error = new Error("Amount must be greater than 0");
            accountBalanceManager.trigger("error", error);
        } else if (amount > accountBalanceManager.peek()) {
            const error = new Error("Your account balance is not enough");
            accountBalanceManager.trigger("error", error);
        } else {
            // process withdraw
            console.log(`Begin withdraw with amount: ${amount}`);
            const oldBalance = accountBalanceManager.peek();
            const newBalance = oldBalance - amount;
            setter(newBalance);

            // End withdraw
            accountBalanceManager.trigger("endWithdraw", oldBalance, newBalance);
        }
    });
    accountBalanceManager.on("endWithdraw", (setter, oldBalance, newBalance) => {
        console.log(`Account successfully withdraw from ${oldBalance} to ${newBalance}`);
    });
    accountBalanceManager.on("error", (setter, error) => {
        console.error(error);
    });

    accountBalanceManager.trigger("withdraw", 23000);
    accountBalanceManager.trigger("withdraw", 0);   // error
    accountBalanceManager.trigger("withdraw", 500000);  // error
}

main();

// You should try to implement deposit() yourself