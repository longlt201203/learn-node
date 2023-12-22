function EapProgram(func) {
    const _func = func;
    let _intervalID = undefined;
    const _schedules = [];
    const _schedulesIDs = [];
    const _handlerMap = {};

    const manager = {
        emit: (eventName, ...args) => {
            if (_handlerMap[eventName]) {
                _handlerMap[eventName](...args);
            }
        },
        end: () => {
            if (_intervalID) {
                clearInterval(_intervalID);
            }
            if (_schedulesIDs) {
                for (const id of _schedulesIDs) {
                    clearInterval(id);
                }
            }
        }
    }

    return {
        listen: () => {
            if (_schedules) {
                for (const schedule of _schedules) {
                    _schedulesIDs.push(setInterval(schedule.task, schedule.time));
                }
            }
            _intervalID = setInterval(() => _func(manager));
        },
        on: (eventName, handler) => {
            _handlerMap[eventName] = handler;
        },
        schedule: (task, time) => {
            _schedules.push({ task, time });
        }
    };
}

const program = EapProgram((manager) => {
    console.log("Hello");
    manager.emit("action");
    manager.end();
});

program.on("action", () => {
    console.log("There is an action.");
});

program.schedule(() => {
    console.log("Bg Task");
});

program.listen();