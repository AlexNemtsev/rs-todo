interface ITimerArguments {
  radius: number;
  radius2: number;
  bing?: NodeJS.Timeout;
  duration: number;
  halfPI: number;
  startTime: number;
  status: boolean;
  animnumber: number;
  now: () => number;
}

export default ITimerArguments;
