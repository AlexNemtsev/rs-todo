 

interface ICurrentSetting {
  mode: string | null;
  lang: string | null;
  avatar: string | null;
  hotkeys: Array<Array<string[]>>;
}

export default ICurrentSetting;
