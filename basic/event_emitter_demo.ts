import * as EventEmitter from "events"

let eventDemo = new EventEmitter();
eventDemo.on("connectError",()=>{
    console.log('network error')
});

setInterval(() => {
    eventDemo.emit("connectError");
}, 3000);













