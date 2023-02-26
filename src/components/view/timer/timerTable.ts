import i18next from 'i18next';
import Builder from '../builder/builder';
import TimerView from './timerView';

class TimerTable {
  private static start = 60;

  private static day = 0;

  private static timer: NodeJS.Timeout;

  public static drawTimerTable() {
    const history = () => TimerView.history;

    const data = [0, 0, 0, 0, 0, 0, 0];
    history().forEach((el) => {
      data[parseInt(el[6], 10)] += parseInt(el[7], 10) / 60000;
    });
    const graphWrapper: HTMLElement = Builder.createBlock(['graph__wrapper']);
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    const graph: HTMLElement = Builder.createBlock(['timer__graph']);
    graph.innerHTML = `${i18next.t( 'timer.average',)}${(
      data.reduce((sum, el) => sum + el) / 7
    ).toFixed(2)} mins`;
    const results: HTMLElement = Builder.createBlock(['timer__history']);
    [canvas.width, canvas.height] = [400, 300];
    document.querySelector('.timer__window')?.append(graphWrapper);
    graphWrapper.append(graph, results);
    graph.append(canvas);
    const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
    this.drawGraph(ctx);

    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    this.drawTimes(data, ctx);

    this.fillHistory(results, months, history());
  }

  private static fillHistory(
    results: HTMLElement,
    months: string[],
    history: Array<string[]>,
  ) {
    if (history.length > 0)
      history.forEach((el) => {
        const resultdiv = Builder.createBlock(['timer__result']);
        resultdiv.innerHTML += `${el[0]} of ${
          months[parseInt(el[1], 10)]
        } from ${el[4]}:${el[5]} to ${el[2]}:${el[3]}`;
        results.append(resultdiv);
      });
    else {
      results.innerHTML = 'No Data';
    }
  }

  private static drawGraph(ctx: CanvasRenderingContext2D | null) {
    if (ctx) {
      ctx.fillStyle = 'blue';
      ctx.strokeStyle = 'rgb(253, 239, 162, 1)';
      ctx.lineWidth = 2.0;
      ctx.moveTo(30, 10);
      ctx.lineTo(30, 260);
      ctx.lineTo(400, 260);
      ctx.stroke();

      for (let i = 0; i < 6; i += 1) {
        ctx.fillText(`${(5 - i) * 20}`, 4, i * 45 + 35);
        ctx.beginPath();
        ctx.moveTo(25, i * 45 + 35);
        ctx.lineTo(30, i * 45 + 35);
        ctx.stroke();
      }

      const labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sut'];
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
    else this.day = 0;
  }
}

export default TimerTable;
