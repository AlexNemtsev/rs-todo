import './timer.scss';

class TimerView {
  private static main: HTMLElement | null = document.querySelector('main');

  private static duration = 300000;

  private static halfPI = Math.PI / 2;

  private static startTime = 0;

  private static radius = 0;

  private static status = false;

  private static animnumber = 0;

  private static now = () => performance.now();

  public static drawTimer() {
    if (this.main)
      this.main.innerHTML = `
     <div class="timer__wrapper">
       <div class="timer">
         <div class="timer__progress"></div>
           <div class="timer__time">
           <p class="timer__time-count">05:00</p>
           <div class ="timer-add_window"> 
           <div><input class="timer__input" type="number" min="0" max="180">minutes</div>
           <div><button class="timer__cancel">cancel</button><button class="timer__ok">ok</button></div>
           </div>
           </div>
       </div>
       <button class="start-stop__button">Start</button>
       <button class="reset__button">Reset</button> 
    </div>`;

    const timer: Element | null = document.querySelector('.timer');

    const canvas: HTMLCanvasElement = document.createElement('canvas');

    const context: CanvasRenderingContext2D | null = canvas.getContext('2d');

    this.init(timer, canvas, context);
  }

  private static draw(
    progress: number,
    context: CanvasRenderingContext2D | null,
    canvas: HTMLCanvasElement,
  ) {
    const x = canvas.width / 2;
    const y = canvas.height / 2;
    if (context) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.beginPath();
      context.moveTo(x, y);
      context.arc(
        x,
        y,
        this.radius,
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
    const percent = Math.max(0, Math.min(1, delta / this.duration));

    const seconds = Math.round(
      (this.duration - (delta / this.duration) * this.duration) / 1000,
    );

    if (time)
      time.innerHTML = `${
        Math.floor(seconds / 60).toString().length === 1
          ? `0${Math.floor(seconds / 60)}`
          : Math.floor(seconds / 60)
      }:${
        (seconds % 60).toString().length === 1
          ? `0${seconds % 60}`
          : seconds % 60
      }`;
    TimerView.draw(percent, context, canvas);
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
    if (timer) {
      const progress = timer.querySelector('.timer__progress');
      if (progress) {
        const progressBox = progress.getBoundingClientRect();

        [canvas.width, canvas.height] = [progressBox.width, progressBox.height];
        this.radius = Math.min(canvas.width, canvas.height) / 2;

        this.draw(0, context, canvas);

        progress.append(canvas);
      }
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

      this.status = this.status === false;
    });
    document.querySelector('.reset__button')?.addEventListener('click', () => {
      this.status = true;
      this.startTime = this.now();
      cancelAnimationFrame(this.animnumber);
      this.draw(0, context, canvas);
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
  }
}

export default TimerView;
