import Builder from '../builder/builder';
import TimerView from './timerView';

class TimerTable {
  private static start = 60;

  private static day = 0;

  private static timer: NodeJS.Timeout;

  public static drawTimerTable() {
    const graphWrapper: HTMLElement = Builder.createBlock(['graph__wrapper']);
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    const graph: HTMLElement = Builder.createBlock(['timer__graph']);
    const results: HTMLElement = Builder.createBlock(['timer__history']);
    [canvas.width, canvas.height] = [400, 300];
    document.querySelector('.timer__window')?.append(graphWrapper);
    graphWrapper.append(graph, results);
    graph.append(canvas);
    const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
    this.drawGraph(ctx);
    const data = [10, 53, 39, 54, 21, 32, 88];
    this.drawTimes(data, ctx);
    TimerView.history.forEach(el=>{
      results.innerHTML = `${el[0]}:${el[1]} to ${el[0]}:${el[2]}`
    })
  }

  private static drawGraph(ctx: CanvasRenderingContext2D | null) {
    if (ctx) {
      ctx.fillStyle = 'black';
      ctx.lineWidth = 2.0;
      ctx.beginPath();
      ctx.moveTo(30, 10);
      ctx.lineTo(30, 260);
      ctx.lineTo(400, 260);
      ctx.stroke();

      ctx.fillStyle = 'black';
      for (let i = 0; i < 6; i += 1) {
        ctx.fillText(`${(5 - i) * 20}`, 4, i * 45 + 35);
        ctx.beginPath();
        ctx.moveTo(25, i * 45 + 35);
        ctx.lineTo(30, i * 45 + 35);
        ctx.stroke();
      }

      const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sut', 'Sun'];
      for (let i = 0; i < 7; i += 1) {
        ctx.fillText(labels[i], 60 + i * 45, 275);
      }
        
    }
  }

  private static drawTimes(
    data: number[],
    ctx: CanvasRenderingContext2D | null,
  ) {
    if (ctx) ctx.fillStyle = 'rgb(71, 114, 250)';
    const y = 260 - data[this.day] * 2.2 * (this.start - 60);
    ctx?.fillRect(this.start + this.day * 45, y, 20, 258 - y);
    this.start += 0.05;
    if (Math.round(y) === Math.round(260 - data[this.day] * 2.2)) {
      this.day += 1;
      this.start = 60;
    }

    if (this.day < 7)
      this.timer = setTimeout(() => {
        this.drawTimes(data, ctx);
      }, 5);
      else
      this.day = 0

      
  } 
  
}

export default TimerTable;
