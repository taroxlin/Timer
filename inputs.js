const daysInput = document.getElementById('days_input');
const hoursInput = document.getElementById('hours_input');
const minsInput = document.getElementById('mins_input');
const secsInput = document.getElementById('secs_input');
daysInput.addEventListener('keypress',(evt)=>checkDigit(evt,"DAYS"), false);
hoursInput.addEventListener('keypress', (evt)=>checkDigit(evt,"hours"), false);
minsInput.addEventListener('keypress', (evt)=>checkDigit(evt, "mins"), false);
secsInput.addEventListener('keypress', (evt)=>checkDigit(evt, "secs"), false);


function checkDigit(evt,type){
    let charC = evt.charCode;
    if (!(charC < 58 || charC > 47) || evt.target.value.length === 2) {
    evt.preventDefault()        
    }
       
}