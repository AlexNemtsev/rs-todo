import './timer.scss';

class TimerView {
  private static main: HTMLElement | null = document.querySelector('main');

  private static duration = 300000;

  private static halfPI = Math.PI / 2;

  private static startTime = 0;

  private static radius = 0;

  private static now = () => performance.now();

  public static drawTimer() {
    if (this.main)
      this.main.innerHTML = `
     <div class="timer__wrapper">
       <div class="timer">
         <div class="timer__progress"></div>
           <p class="timer__time">05:00</p>
       </div>
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
    time: Element | null,
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
      requestAnimationFrame(() => {
        TimerView.update(canvas, context, time);
      });
    }
  }

  private static start(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D | null,
  ) {
    this.startTime = this.now();
    const time: Element | null = document.querySelector('.timer__time');
    requestAnimationFrame(() => {
      TimerView.update(canvas, context, time);
    });
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
    if (timer)
      timer.addEventListener('click', () => {
        this.start(canvas, context);
      });
  }
}

export default TimerView;
