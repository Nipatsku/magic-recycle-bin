var Service = require('node-windows').Service;
 
// Create a new service object
var svc = new Service({
  name:'Magic Recycle Bin',
  description: 'Just that',
  script: 'C:\\Users\\Niilo\\projects\\dynamic-recycle-bin\\index.js',
  nodeOptions: [
    '--harmony',
    '--max_old_space_size=4096'
  ],
  //, workingDirectory: '...'
  //, allowServiceLogon: true
  env: {
    name: "HOME",
    value: process.env["USERPROFILE"] // service is now able to access the user who created its' home directory
  }
});

// svc.logOnAs.account = 'username';
// svc.logOnAs.password = 'password';
 
// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});
 
svc.install();