import i18next from 'i18next';
import ITimerArguments from '../../../interfaces/timer';
import './timer.scss';

class TimerView {
  private static main: HTMLElement | null = document.querySelector('main');

  private static timer: HTMLElement | null;

  private static canvas: HTMLCanvasElement;

  private static canvas2: HTMLCanvasElement;

  private static context: CanvasRenderingContext2D | null;

  private static context2: CanvasRenderingContext2D | null;

  public static history: Array<string[]> = JSON.parse(
    localStorage.getItem('timerHistory') || '[]',
  ) as Array<string[]>;

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

  public static drawTimer():void {
    if (this.main)
      this.main.innerHTML = `
      <div class="timer__window">
     <div class="timer__wrapper active">
       <div class="timer">
         <div class="timer__progress"></div>
           <div class="timer__time">
           <button class="time__button add">+</button>
           <p class="timer__time-count">05:00</p>
           <button class="time__button deduct">-</button>
           <div class ="timer-add_window"> 
           <div><input class="timer__input" type="number" min="0" max="180">${i18next.t(
             'timer.minutes',
           )}</div>
           <div><button class="timer__cancel">cancel</button><button class="timer__ok">ok</button></div>
           </div>
           </div>
       </div>
       <button class="start-stop__button active">${i18next.t(
         'timer.start',
       )}</button>
       <button class="reset__button">${i18next.t('timer.reset')}</button> 
    </div>
     </div>`;

    this.timer = document.querySelector('.timer');

    this.canvas = document.createElement('canvas');

    this.context = this.canvas.getContext('2d');

    this.init(this.timer, this.canvas, this.context);
  }

  public static drawIcontimer():void {
    const timerSmall:Element|null = document.querySelector('.timer__circle');
    this.canvas2 = document.createElement('canvas');
    this.context2 = this.canvas2.getContext('2d');

    if (timerSmall) {
      const progressBox:DOMRect = timerSmall.getBoundingClientRect();
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
  ):void {
    if (context) {
      const xaxis:number = canvas.width / 2;
      const yaxis:number = canvas.height / 2;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.beginPath();
      context.moveTo(xaxis, yaxis);
      context.arc(
        xaxis,
        yaxis,
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
  ):void {
    const delta:number = this.timerProps.now() - this.timerProps.startTime;
    if (delta >= this.timerProps.duration) {
      document
        .querySelector('.start-stop__button')
        ?.dispatchEvent(new Event('click'));
      document.querySelector('.start-stop__button')?.classList.remove('active');
      document.querySelector('.reset__button')?.classList.add('active');
      cancelAnimationFrame(this.timerProps.animnumber);
      if (new Date(Date.now()).getDay() === 0)
        this.history = this.history.filter((el) => el[6] === '0');
      this.history.push([
        new Date(Date.now()).getDate().toString(),
        new Date(Date.now()).getMonth().toString(),
        new Date(Date.now()).getHours().toString(),
        new Date(Date.now()).getMinutes().toString(),
        new Date(Date.now() - this.timerProps.duration).getHours().toString(),
        new Date(Date.now() - this.timerProps.duration).getMinutes().toString(),
        new Date(Date.now()).getDay().toString(),
        this.timerProps.duration.toString(),
      ]);
      localStorage.setItem('timerHistory', JSON.stringify(this.history));
    }
    if (window.location.pathname.split('/')[1] !== 'timer' && this.canvas2)
      this.canvas2.style.visibility = 'visible';
    else if (this.canvas2) {
      this.canvas2.style.visibility = 'hidden';
    }
    const percent:number = Math.max(0, Math.min(1, delta / this.timerProps.duration));

    const seconds:number = Math.round(
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
  ):void {
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
  ):void {
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
  ):void {
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
  ):void {
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
  ):void {
    startButton?.addEventListener('click', () => {
      this.start(canvas, context, time);
      if (startButton)
        startButton.innerHTML =
          this.timerProps.status === true
            ? `${i18next.t('timer.start')}`
            : `${i18next.t('timer.pause')}`;

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
  ):void {
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
  ):void {
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
