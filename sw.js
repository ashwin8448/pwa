const version = 1.0;

// Anything outside the events will run first
// for (i = 10; i < 100; i++) {
//   console.log(i);
// }

self.addEventListener("install", (ev) => {
  console.log("installed");
});

self.addEventListener("activate", (ev) => {
  console.log("activate");
});

self.addEventListener("fetch", (ev) => {
  console.log("fetch");
});

self.addEventListener("message", (ev) => {
  console.log("message");
});
