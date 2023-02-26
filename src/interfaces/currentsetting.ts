 

interface ICurrentSetting {
  mode: string | null;
  cTaskStyle:string|null;
  defPrior:string|null;
  defDate:number;
  lang: string | null;
  avatar: string | null;
  hotkeys: Array<Array<string[]>>;
}

export default ICurrentSetting;
