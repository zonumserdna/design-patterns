interface Iphone {
  useLightning(): void;
}

interface Android {
  useMicroUSB(): void;
}

class Iphone7 implements Iphone {
  useLightning(): void {
    console.log("Using lightning port...");
  }
}

class GooglePixel implements Android {
  useMicroUSB(): void {
    console.log("Using micro USB port...");
  }
}

class LightningToMicroUSBAdapter implements Android {
  iphoneDevice: Iphone;

  constructor(iphone: Iphone) {
    this.iphoneDevice = iphone
  }

  public useMicroUSB(): void {
    console.log('Want to use micro USB port, converting to Lightning port...');    
  }
}

const iphone = new Iphone7()
const chargeAdapter = new LightningToMicroUSBAdapter(iphone)
chargeAdapter.useMicroUSB();