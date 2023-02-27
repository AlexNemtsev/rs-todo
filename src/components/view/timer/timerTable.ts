import i18next from 'i18next';
import Builder from '../builder/builder';
import TimerView from './timerView';
// eslint-disable-next-line import/no-cycle
import SettingsView from '../settings/settings';

class TimerTable {
  private static start = 60;

  private static day = 0;

  private static modifier = 1;

  private static timer: NodeJS.Timeout;

  public static drawTimerTable():void {
    const history:()=>string[][] = () => TimerView.history;

    const data:number[] = [0, 0, 0, 0, 0, 0, 0];

    history().forEach((el) => {
      data[parseInt(el[6], 10)] += parseInt(el[7], 10) / 60000;
    });
    this.scaleGraph(data);
    const graphWrapper: HTMLElement = Builder.createBlock(['graph__wrapper']);
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    const graph: HTMLElement = Builder.createBlock(['timer__graph']);
    graph.innerHTML = `${i18next.t('timer.average')}${(
      data.reduce((sum, el) => sum + el) / 7
    ).toFixed(2)} mins`;
    const results: HTMLElement = Builder.createBlock(['timer__history']);
    [canvas.width, canvas.height] = [400, 300];
    document.querySelector('.timer__window')?.append(graphWrapper);
    graphWrapper.append(graph, results);
    graph.append(canvas);
    const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
    this.drawGraph(ctx, this.modifier);

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

  private static scaleGraph(data: number[]):void  {
    if (data.filter((el) => el > 5 * (this.modifier * 10)).length > 0) {
      this.modifier *= 2;
      this.scaleGraph(data);
    }
  }

  private static fillHistory(
    results: HTMLElement,
    months: string[],
    history: Array<string[]>,
  ):void  {
    results.innerHTML = '<h3>Timer History</h3>';
    if (history.length > 0)
      history.reverse().forEach((el) => {
        const resultdiv = Builder.createBlock(['timer__result']);
        resultdiv.innerHTML += `<span class="result__date">${el[0]} of ${
          months[parseInt(el[1], 10)]
        }</span> <span class="result__time">from ${this.convertTime(
          Number(el[4]),
          Number(el[5]),
          SettingsView.settings.Timeformat,
        )} to ${this.convertTime(
          Number(el[2]),
          Number(el[3]),
          SettingsView.settings.Timeformat,
        )}</span>`;
        results.append(resultdiv);
      });
    else {
      results.innerHTML = 'No Data';
    }
  }

  private static convertTime(
    hrs: number,
    mins: number,
    format: string,
  ): string {
    let date = '';
    if (hrs < 12 || format === '24hrs') {
      date = `${hrs.toString().length > 1 ? hrs : `0${hrs}`}:${
        mins.toString().length > 1 ? mins : `0${mins}`
      } ${format === '12hrs' ? 'AM' : ''}`;
    } else if (hrs >= 12 && hrs < 24 && format === '12hrs') {
      date = `${(hrs - 12).toString().length > 1 ? hrs - 12 : `0${hrs - 12}`}:${
        mins.toString().length > 1 ? mins : `0${mins}`
      } PM`;
    }

    return date;
  }

  private static drawGraph(
    ctx: CanvasRenderingContext2D | null,
    modifier: number,
  ) {
    if (ctx) {
      ctx.fillStyle = 'blue';
      ctx.strokeStyle = 'rgb(253, 239, 162, 1)';
      ctx.lineWidth = 2.0;
      ctx.moveTo(30, 10);
      ctx.lineTo(30, 260);
      ctx.lineTo(400, 260);
      ctx.stroke();

      for (let i = 0; i < 6; i += 1) {
        ctx.fillText(`${(5 - i) * (modifier * 10)}`, 4, i * 45 + 35);
        ctx.beginPath();
        ctx.moveTo(25, i * 45 + 35);
        ctx.lineTo(30, i * 45 + 35);
        ctx.stroke();
      }

      const labels:string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sut'];
      for (let i = 0; i < 7; i += 1) {
        ctx.fillText(labels[i], 60 + i * 45, 275);
      }
    }
  }

  private static drawTimes(
    data: number[],
    ctx: CanvasRenderingContext2D | null,
  ):void  {
    if (ctx) ctx.fillStyle = 'rgb(71, 114, 250)';

    const y =
      260 -
      ((data[this.day] / (5 * (this.modifier * 10))) * 225 * this.start) / 600;
    ctx?.fillRect(60 + this.day * 45, y, 20, 258 - y);
    this.start += 10;
    if (
      Math.round(y) ===
      Math.round(260 - (data[this.day] / (5 * (this.modifier * 10))) * 225)
    ) {
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
