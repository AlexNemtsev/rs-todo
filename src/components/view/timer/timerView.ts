import './timer.scss';
 

class TimerView {
  private static main: HTMLElement | null = document.querySelector('main');

  private static canvas2: HTMLCanvasElement

  private static context2: CanvasRenderingContext2D | null

  private static duration = 300000;

  private static halfPI = Math.PI / 2;

  private static startTime = 0;

  private static radius = 0;

  private static radius2 = 16;

  private static status = false;

  private static animnumber = 0;

  private static now = () => performance.now();

  public static drawTimer() {
    if (this.main)
      this.main.innerHTML = `
     <div class="timer__wrapper active">
       <div class="timer">
         <div class="timer__progress"></div>
           <div class="timer__time">
           <button class="time__button add">+</button>
           <p class="timer__time-count">05:00</p>
           <button class="time__button deduct">-</button>
           <div class ="timer-add_window"> 
           <div><input class="timer__input" type="number" min="0" max="180">minutes</div>
           <div><button class="timer__cancel">cancel</button><button class="timer__ok">ok</button></div>
           </div>
           </div>
       </div>
       <button class="start-stop__button active">Start</button>
       <button class="reset__button">Reset</button> 
    </div>`;

    const timer: Element | null = document.querySelector('.timer');

    const canvas: HTMLCanvasElement = document.createElement('canvas');

    const context: CanvasRenderingContext2D | null = canvas.getContext('2d');

    this.init(timer, canvas, context);
    
  }

  public static drawIcontimer(){
     const timerSmall= document.querySelector(".timer__circle")
     this.canvas2 = document.createElement('canvas');
    this.context2  = this.canvas2.getContext('2d');

    if(timerSmall){
      const progressBox = timerSmall.getBoundingClientRect();
      [this.canvas2.width, this.canvas2.height] = [progressBox.width, progressBox.height];

    this.draw(0, this.context2, this.canvas2,this.radius2);

    timerSmall.append(this.canvas2);}
  }

  private static draw(
    progress: number,
    context: CanvasRenderingContext2D | null,
    canvas: HTMLCanvasElement,
    radius:number,
  ) {
    
    if (context) {
      const x = canvas.width / 2;
      const y = canvas.height / 2;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.beginPath();
      context.moveTo(x, y);
      context.arc(
        x,
        y,
        radius,
        -this.halfPI,
        -this.halfPI + 2 * Math.PI * progress,
      );
      context.closePath();
      context.fillStyle = 'rgb(71, 114, 250)';
      context.fill();
    }
  }

  private static update(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D | null,
    time?: Element | null,
  ) {
    
    const delta = this.now() - this.startTime;
    if(delta>=this.duration){
      const bing = new Audio('../../../assets/sound/timer-end.mp3').play().catch(error=>console.log(error))
      cancelAnimationFrame(this.animnumber)
    }
    
    const percent = Math.max(0, Math.min(1, delta / this.duration));

    const seconds = Math.round(
      (this.duration - (delta / this.duration) * this.duration) / 1000,
    );
    
   if(window.location.pathname.split('/')[1]!=='timer'&&this.canvas2)
   this.canvas2.style.visibility ='visible'
   else
   {this.canvas2.style.visibility ='hidden'}

    if (time&&percent!==1)
      time.innerHTML = `${
        Math.floor(seconds / 60).toString().length === 1
          ? `0${Math.floor(seconds / 60)}`
          : Math.floor(seconds / 60)
      }:${
        (seconds % 60).toString().length === 1
          ? `0${seconds % 60}`
          : seconds % 60
      }`
      else if(time) {
        time.innerHTML= '00:00'
      }
    TimerView.draw(percent, context, canvas,this.radius);
    TimerView.draw(percent, this.context2, this.canvas2,this.radius2);
    if (delta < this.duration) {
      
      this.animnumber = requestAnimationFrame(() => {
        TimerView.update(canvas, context, time);
      });
    }
  
  }

  private static start(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D | null,
    time: Element | null,
  ) {
    this.startTime = this.now() - this.startTime;
    if (this.status === false) {
      this.animnumber = requestAnimationFrame(() => {
        TimerView.update(canvas, context, time);
      });
    } else {
      cancelAnimationFrame(this.animnumber);
    }
  }

  private static init(
    timer: Element | null,
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D | null,
  ) {
    if (!timer) {
      return;
    }
      const progress = timer.querySelector('.timer__progress');
      if (progress) {
        const progressBox = progress.getBoundingClientRect();

        [canvas.width, canvas.height] = [progressBox.width, progressBox.height];
        this.radius = Math.min(canvas.width, canvas.height) / 2;

        this.draw(0, context, canvas,this.radius);

        progress.append(canvas);
      }
    

    const time: Element | null = document.querySelector('.timer__time-count');
    const startButton: HTMLElement | null = document.querySelector(
      '.start-stop__button',
    );
    const timerCancel: HTMLElement | null = document.querySelector(
      '.timer__cancel',
    );
    const timerInput: HTMLInputElement | null = document.querySelector(
      '.timer__input',
    );
    const timerOk: HTMLElement | null = document.querySelector('.timer__ok');

    const addtime: HTMLElement | null = document.querySelector('.time__button.add');
    const deducttime: HTMLElement | null = document.querySelector('.time__button.deduct');

     addtime?.addEventListener('click',()=>{
      if(this.duration<10800000)this.duration +=300000
     })
     deducttime?.addEventListener('click',()=>{
      if(this.duration>300000)this.duration -=300000
     })
    time?.addEventListener('click', () => {
      if (timerInput) timerInput.value = (this.duration / 60000).toString();
      if (this.status === false)
        document.querySelector('.timer-add_window')?.classList.toggle('active');
    });

    timerCancel?.addEventListener('click', () => {
      document.querySelector('.timer-add_window')?.classList.remove('active');
    });

    timerOk?.addEventListener('click', () => {
      if (time && timerInput) {
        time.innerHTML = `${
          Math.floor(Number(timerInput.value)).toString().length === 1
            ? `0${Math.floor(Number(timerInput.value))}`
            : Math.floor(Number(timerInput.value))
        }:${time.innerHTML.split(':')[1]}`;
        this.duration = 60 * 1000 * Number(timerInput.value);
        timerInput.value = '';
      }

      document.querySelector('.timer-add_window')?.classList.remove('active');
    });

    startButton?.addEventListener('click', () => {
      this.start(canvas, context, time);
      if (startButton)
        startButton.innerHTML = this.status === true ? 'Start' : 'Pause';
        
        addtime?.classList.toggle('active')
        deducttime?.classList.toggle('active')
      this.status = this.status === false;
      if(this.status===true)
      document.querySelector('.reset__button')?.classList.remove('active')
      else
      document.querySelector('.reset__button')?.classList.add('active')
    });

    document.querySelector('.reset__button')?.addEventListener('click', () => {
      if(this.status===true)
      startButton?.classList.toggle('active')
      
      this.status = true;
      this.startTime = this.now();
      cancelAnimationFrame(this.animnumber);
      this.draw(0, context, canvas,this.radius);
      if (time) {
        time.innerHTML = `${
          (this.duration / 60000).toString().length === 1
            ? `0${this.duration / 60000}`
            : Math.floor(this.duration / 60000)
        }:00`;
      }
       
      document
        .querySelector('.start-stop__button')
        ?.dispatchEvent(new Event('click'));
    });
    document.querySelector('.reset__button')?.classList.remove('active')
    if(this.status===true){
      this.update(canvas,context,time)}
     
       
  }


}

export default TimerView;
