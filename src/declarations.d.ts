declare module '*.svg' {
    const content: string;
    export default content;
  }
  // PNGの定義を追加
declare module '*.png' {
    const content: string;
    export default content;
  }
  
  // 今後使いそうな他の画像形式もまとめておくと便利です
  declare module '*.jpg' {
    const content: string;
    export default content;
  }
  declare module '*.jpeg' {
    const content: string;
    export default content;
  }
  declare module '*.webp' {
    const content: string;
    export default content;
  }