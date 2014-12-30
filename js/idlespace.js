
var enemies = [{
    name: "Alice",
    hp: 10,
    scrap: [1, 3],
    population: 25,
    sectors: [-20, 30],
    shield: 5,
    warp: true,
    speed: 1
}, {
    name: "Bob",
    hp: 18,
    scrap: [2, 4],
    population: 8,
    sectors: [-20, 50],
    shield: 10,
    warp: true,
    speed: 1
}, {
    name: "Dave",
    hp: 42,
    scrap: [5, 10],
    population: 4,
    sectors: [-20, 80],
    shield: 20,
    warp: true,
    speed: 1
}];

// var lastUsedHeap = 0;  // remember the heap size
//
// function checkMemory()
// {
//     // check if the heap size is this cycle is LESS than what we had last
//     // cycle; if so, then the garbage collector has kicked in
//
//     console.log(window.performance.memory.usedJSHeapSize + " / " + window.performance.memory.totalJSHeapSize);
//
//     if (window.performance.memory.usedJSHeapSize < lastUsedHeap)
//         console.log('Garbage collected!');
//     lastUsedHeap = window.performance.memory.usedJSHeapSize;
// }
//
// setInterval(checkMemory, 1000); // test 10 times per second

Game.go();
