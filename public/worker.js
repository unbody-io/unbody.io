self.onmessage = function(e) {
    console.log('Worker: Message received from main script');
    const result = e.data * 2; // Example operation
    postMessage(result);
    self.close(); // Terminates the worker
};

