const daysInp = document.getElementById('days_input');
const hoursInp = document.getElementById('hours_input');
const minsInp = document.getElementById('mins_input');
const secsInp = document.getElementById('secs_input');
const checkbox = document.getElementById('checkboxInput')


class Timer {
    constructor() {
      this.daysLeft = 0;
      this.hoursLeft = 0;
      this.minsLeft = 0;
      this.secsLeft = 0;
      this.repeated = false;
      this.timerRun = false;
      this.audioTick = new Audio('aclock.wav');
      this.beepSound = new Audio('beep.wav');
      this.audioTick.volume = 0.1;
      this.beepSound.volume =0.1;
    }
    buttonChange (){
        const startStop = document.getElementById('startStop');
        if(this.timerRun === false){
            this.timerRun = true;
            startStop.value = 'Stop';
            this.startUp();
        }else {
            this.timerRun = false;
            startStop.value = 'Start';
            this.stop();
        }

    }

    checkBoxCheck (){
        if(checkbox.checked === true){
            this.repeated = true;
        } else {
            this.repeated = false
        }
    }
    
    getter(varName){
        return varName
    }

    setter(days = 0,hours = 0,mins = 0 ,secs = 0){
        this.daysLeft = days;
        this.hoursLeft = hours;
        this.minsLeft = mins;
        this.secsLeft = secs;
    }

    belowZero(){
        if(Number(this.secsLeft) === 0) {
            if(Number(this.minsLeft) === 0) {
                if(Number(this.hoursLeft) === 0){
                    if(Number(this.daysLeft) > 0) {
                        this.daysLeft -= 1;
                        this.hoursLeft  = 23;
                        this.minsLeft = 59;
                        this.secsLeft = 60;
                    }
                } else {
                    this.hoursLeft -= 1;
                    this.minsLeft = 59;
                    this.secsLeft = 60;
                } 
            } else {
                this.minsLeft -= 1;
                this.secsLeft = 60;
            }
        }
    }
    convert(item){
        let itemResult =  item  > 9 ? `${item}` : (item > 0 ? `0${item}` : '00' );
        return itemResult
    }

    counting(){
        this.secsLeft -= 1;
        if(this.secsLeft === 19){
            this.audioTick.play()
        }
        if(this.secsLeft === 10){
            this.audioTick.play()
        }
        
        if(this.secsLeft === 1){
            this.beepSound.play()
        }
        this.response();
        this.stopCheck();
        this.belowZero();
    }

    response(){
        let response = `${this.convert(this.daysLeft)} Days\n${this.convert(this.hoursLeft)}:${this.convert(this.minsLeft)}:${this.convert(this.secsLeft)}`
        document.getElementById('timerDisplay').innerText = response;
    }

    stopCheck() {

        if(!this.daysLeft && !this.hoursLeft && !this.minsLeft && !this.secsLeft) {
            if(this.repeated === true){
                this.setup()
            }else {
                this.buttonChange();
            }
        }
    }
 setup(){
     let days = daysInp.value.length === 0 ? 0 : daysInp.value;
     let hours = hoursInp.value.length === 0 ? 0 : hoursInp.value;
     let mins = minsInp.value.length === 0 ? 0 : minsInp.value; 
     let secs = secsInp.value.length === 0 ? 0 : secsInp.value;
     this.setter(days ,hours,mins,secs);
    }

    start(){
        this.active = setInterval(()=>{
            this.counting()
        }, 1000);
    }

    stop(){
        clearInterval(this.active);
    }

    
    startUp(){
        this.setup();
        this.belowZero()
        this.start();
    }
  }


  const timer = new Timer;