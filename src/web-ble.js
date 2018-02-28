const LED_SERVICE_UUID = "";

const IBEACONS = {
  "BlueBar Beacon 5C313EF49E85": "14",
  "BlueBar Beacon 5C313EF4A5FC": "15",
  "BlueBar Beacon 5C313EF609B6": "16",
  "BlueBar Beacon 5C313EF48F16": "17",
  "BlueBar Beacon 5C313EF4E10C": "18",
  "BlueBar Beacon 5C313EF4CB09": "27",
}

export function onWebBluetoothStart() {
  return new Promise((resolve, reject)=>{
    let options = {};
    // options.acceptAllDevices = true;
    options.filters = [
      {namePrefix: "BlueBar Beacon"},
    ];
  
    console.log("searching bluetooth devices...", navigator.bluetooth);
  
    navigator.bluetooth.requestDevice(options).then((device)=>{ //デバイスのスキャンを開始
      console.log("found device: ", device); 
      let resultMinor = null;
      if(IBEACONS[device.name]) {
        resultMinor = IBEACONS[device.name];
      }else {
        resultMinor = "-1";
      }
      resolve(resultMinor);
    }).catch((error)=>{
      console.error(error);
      reject(error);
    });
  });
}


