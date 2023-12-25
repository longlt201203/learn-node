/**
 * @typedef {(...args: any[]) => void} EapApplicationEventHandler 
 */

class EapApplication {
    /**
     * @type {{ [eventName: string]: EapApplicationEventHandler }}
     */
    #handlerMapping = {};

    /**
     * 
     * @param {string} eventName 
     * @param {EapApplicationEventHandler} handler 
     */
    on(eventName, handler) {
        this.#handlerMapping[eventName] = handler;
    }

    /**
     * 
     * @param {string} eventName 
     * @param  {...any} args 
     */
    emit(eventName, ...args) {
        if (this.#handlerMapping[eventName]) {
            this.#handlerMapping[eventName](...args);
        }
    }


}

class Program extends EapApplication { 
    /**
     * Initialize the program
     * @param {(program: Program) => void} startUpFunc 
     */
    init(startUpFunc) {
        startUpFunc(this);
    }

    /**
     * Emit "start"
     */
    start() {
        this.emit("start");
    }

    /**
     * Emit "exit"
     */
    exit() {
        this.emit("exit");
    }
}

module.exports = {
    EapApplication,
    Program
}