import ITimerArguments from '../../../interfaces/timer';
import './timer.scss';

class TimerView {
  private static main: HTMLElement | null = document.querySelector('main');

  private static timer: HTMLElement | null;

  private static canvas: HTMLCanvasElement;

  private static canvas2: HTMLCanvasElement;

  private static context: CanvasRenderingContext2D | null;

  private static context2: CanvasRenderingContext2D | null;

  private static timerProps: ITimerArguments = {
    radius: 0,
    radius2: 16,
    duration: 300000,
    halfPI: Math.PI / 2,
    startTime: 0,
    status: false,
    animnumber: 0,
    now: () => performance.now(),
  };

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

    this.timer = document.querySelector('.timer');

    this.canvas = document.createElement('canvas');

    this.context = this.canvas.getContext('2d');

    this.init(this.timer, this.canvas, this.context);
  }

  public static drawIcontimer() {
    const timerSmall = document.querySelector('.timer__circle');
    this.canvas2 = document.createElement('canvas');
    this.context2 = this.canvas2.getContext('2d');

    if (timerSmall) {
      const progressBox = timerSmall.getBoundingClientRect();
      [this.canvas2.width, this.canvas2.height] = [
        progressBox.width,
        progressBox.height,
      ];

      this.draw(0, this.context2, this.canvas2, this.timerProps.radius2);

      timerSmall.append(this.canvas2);
    }
  }

  private static draw(
    progress: number,
    context: CanvasRenderingContext2D | null,
    canvas: HTMLCanvasElement,
    radius: number,
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
        -this.timerProps.halfPI,
        -this.timerProps.halfPI + 2 * Math.PI * progress,
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
    const delta = this.timerProps.now() - this.timerProps.startTime;
    if (delta >= this.timerProps.duration) {
      document
        .querySelector('.start-stop__button')
        ?.dispatchEvent(new Event('click'));
      document.querySelector('.start-stop__button')?.classList.remove('active');
      document.querySelector('.reset__button')?.classList.add('active');
      cancelAnimationFrame(this.timerProps.animnumber);
    }
    if (window.location.pathname.split('/')[1] !== 'timer' && this.canvas2)
      this.canvas2.style.visibility = 'visible';
    else if (this.canvas2) {
      this.canvas2.style.visibility = 'hidden';
    }
    const percent = Math.max(0, Math.min(1, delta / this.timerProps.duration));

    const seconds = Math.round(
      (this.timerProps.duration -
        (delta / this.timerProps.duration) * this.timerProps.duration) /
        1000,
    );

    if (time && percent !== 1)
      time.innerHTML = `${
        Math.floor(seconds / 60).toString().length === 1
          ? `0${Math.floor(seconds / 60)}`
          : Math.floor(seconds / 60)
      }:${
        (seconds % 60).toString().length === 1
          ? `0${seconds % 60}`
          : seconds % 60
      }`;
    else {
      if (time) time.innerHTML = '00:00';
      this.timerProps.status = false;
    }
    TimerView.draw(percent, context, canvas, this.timerProps.radius);
    TimerView.draw(
      percent,
      this.context2,
      this.canvas2,
      this.timerProps.radius2,
    );
    if (delta < this.timerProps.duration) {
      this.timerProps.animnumber = requestAnimationFrame(() => {
        TimerView.update(canvas, context, time);
      });
    }
  }

  private static start(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D | null,
    time: Element | null,
  ) {
    this.timerProps.startTime =
      this.timerProps.now() - this.timerProps.startTime;

    if (this.timerProps.status === false) {
      this.timerProps.bing = setTimeout(() => {
        new Audio('../../../assets/sound/timer-end.mp3')
          .play()
          .catch((error) => console.log(error));
      }, this.timerProps.duration - (this.timerProps.now() - this.timerProps.startTime));
      this.timerProps.animnumber = requestAnimationFrame(() => {
        TimerView.update(canvas, context, time);
      });
    } else {
      cancelAnimationFrame(this.timerProps.animnumber);
      clearTimeout(this.timerProps.bing);
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
    const progress: HTMLElement | null = timer.querySelector(
      '.timer__progress',
    );
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

    const addtime: HTMLElement | null = document.querySelector(
      '.time__button.add',
    );
    const deducttime: HTMLElement | null = document.querySelector(
      '.time__button.deduct',
    );
    this.attachCanvas(progress, canvas, context);

    this.addDeductListeners(addtime, deducttime, canvas, context, time);
    this.addInputListeners(time, timerInput, timerCancel, timerOk);
    this.addStartResetListeners(
      time,
      startButton,
      addtime,
      deducttime,
      canvas,
      context,
    );
    this.checkifRunning(
      time,
      startButton,
      addtime,
      deducttime,
      canvas,
      context,
    );
  }

  private static addDeductListeners(
    addtime: HTMLElement | null,
    deducttime: HTMLElement | null,
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D | null,
    time: Element | null,
  ) {
    addtime?.addEventListener('click', () => {
      if (this.timerProps.duration < 10800000)
        this.timerProps.duration += 300000;
      clearTimeout(this.timerProps.bing);
      this.timerProps.bing = setTimeout(() => {
        new Audio('../../../assets/sound/timer-end.mp3')
          .play()
          .catch((error) => console.log(error));
      }, this.timerProps.duration - (this.timerProps.now() - this.timerProps.startTime));
      cancelAnimationFrame(this.timerProps.animnumber);
      this.update(canvas, context, time);
    });
    deducttime?.addEventListener('click', () => {
      if (this.timerProps.duration > 300000) this.timerProps.duration -= 300000;
      clearTimeout(this.timerProps.bing);
      this.timerProps.bing = setTimeout(() => {
        new Audio('../../../assets/sound/timer-end.mp3')
          .play()
          .catch((error) => console.log(error));
      }, this.timerProps.duration - (this.timerProps.now() - this.timerProps.startTime));
      cancelAnimationFrame(this.timerProps.animnumber);
      this.update(canvas, context, time);
    });
  }

  private static addInputListeners(
    time: Element | null,
    timerInput: HTMLInputElement | null,
    timerCancel: HTMLElement | null,
    timerOk: HTMLElement | null,
  ) {
    time?.addEventListener('click', () => {
      if (timerInput)
        timerInput.value = (this.timerProps.duration / 60000).toString();
      if (
        this.timerProps.status === false &&
        this.timerProps.duration - this.timerProps.startTime >=
          this.timerProps.duration - 1000
      )
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
        this.timerProps.duration = 60 * 1000 * Number(timerInput.value);
        timerInput.value = '';
      }

      document.querySelector('.timer-add_window')?.classList.remove('active');
    });
  }

  private static addStartResetListeners(
    time: Element | null,
    startButton: HTMLElement | null,
    addtime: HTMLElement | null,
    deducttime: HTMLElement | null,
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D | null,
  ) {
    startButton?.addEventListener('click', () => {
      this.start(canvas, context, time);
      if (startButton)
        startButton.innerHTML =
          this.timerProps.status === true ? 'Start' : 'Pause';

      addtime?.classList.toggle('active');
      deducttime?.classList.toggle('active');
      this.timerProps.status = this.timerProps.status === false;
      if (this.timerProps.status === true)
        document.querySelector('.reset__button')?.classList.remove('active');
      else document.querySelector('.reset__button')?.classList.add('active');
    });

    document.querySelector('.reset__button')?.addEventListener('click', () => {
      if (this.timerProps.status === true) {
        startButton?.classList.toggle('active');
      } else {
        startButton?.classList.add('active');
        addtime?.classList.toggle('active');
        deducttime?.classList.toggle('active');
      }

      this.timerProps.status = true;
      this.timerProps.startTime = this.timerProps.now();
      cancelAnimationFrame(this.timerProps.animnumber);
      this.draw(0, context, canvas, this.timerProps.radius);
      if (time) {
        time.innerHTML = `${
          (this.timerProps.duration / 60000).toString().length === 1
            ? `0${this.timerProps.duration / 60000}`
            : Math.floor(this.timerProps.duration / 60000)
        }:00`;
      }

      document
        .querySelector('.start-stop__button')
        ?.dispatchEvent(new Event('click'));
      document.querySelector('.reset__button')?.classList.remove('active');
    });
  }

  private static attachCanvas(
    progress: HTMLElement | null,
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D | null,
  ) {
    if (progress) {
      const progressBox = progress.getBoundingClientRect();

      [canvas.width, canvas.height] = [progressBox.width, progressBox.height];
      this.timerProps.radius = Math.min(canvas.width, canvas.height) / 2;

      this.draw(0, context, canvas, this.timerProps.radius);

      progress.append(canvas);
    }
  }

  private static checkifRunning(
    time: Element | null,
    startButton: HTMLElement | null,
    addtime: HTMLElement | null,
    deducttime: HTMLElement | null,
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D | null,
  ) {
    if (this.timerProps.status === true) {
      cancelAnimationFrame(this.timerProps.animnumber);
      this.update(canvas, context, time);
      addtime?.classList.add('active');
      deducttime?.classList.add('active');
      if (startButton) startButton.innerHTML = 'Pause';
    } else {
      const seconds = Math.round(
        (((this.timerProps.duration - this.timerProps.startTime) /
          this.timerProps.duration) *
          this.timerProps.duration) /
          1000,
      );
      this.draw(
        Math.max(
          0,
          Math.min(1, this.timerProps.startTime / this.timerProps.duration),
        ),
        context,
        canvas,
        this.timerProps.radius,
      );
      document.querySelector('.reset__button')?.classList.add('active');
      if (time)
        time.innerHTML =
          this.timerProps.duration - this.timerProps.startTime <= 0
            ? '00:00'
            : `${
                Math.floor(seconds / 60).toString().length === 1
                  ? `0${Math.floor(seconds / 60)}`
                  : Math.floor(seconds / 60)
              }:${
                (seconds % 60).toString().length === 1
                  ? `0${seconds % 60}`
                  : seconds % 60
              }`;
    }
  }
}

export default TimerView;
