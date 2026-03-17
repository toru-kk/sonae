// { display: 表示名, search: 検索用（カタカナ・別名含む）}
export type Brand = { display: string; search: string };

export const BRANDS: Brand[] = [
  // 日本ブランド
  { display: "mont-bell",     search: "mont-bell モンベル montbell" },
  { display: "finetrack",     search: "finetrack ファイントラック" },
  { display: "foxfire",       search: "foxfire フォックスファイヤー" },
  { display: "Phenix",        search: "Phenix フェニックス" },
  { display: "NANGA",         search: "NANGA ナンガ" },
  { display: "HILLEBERG",     search: "HILLEBERG ヒルバーグ" },
  { display: "ISUKA",         search: "ISUKA イスカ" },
  { display: "ZEROGRAM",      search: "ZEROGRAM ゼログラム" },
  { display: "SOTO",          search: "SOTO ソト 新富士バーナー" },
  { display: "PRIMUS",        search: "PRIMUS プリムス" },
  { display: "Snow Peak",     search: "Snow Peak スノーピーク" },
  { display: "CAPTAIN STAG", search: "CAPTAIN STAG キャプテンスタッグ" },
  { display: "LOGOS",         search: "LOGOS ロゴス" },
  // アパレル・レイヤリング
  { display: "THE NORTH FACE", search: "THE NORTH FACE ノースフェイス TNF" },
  { display: "patagonia",      search: "patagonia パタゴニア" },
  { display: "Arc'teryx",      search: "Arc'teryx アークテリクス" },
  { display: "MAMMUT",         search: "MAMMUT マムート" },
  { display: "Millet",          search: "Millet ミレー" },
  { display: "Haglöfs",        search: "Haglöfs ホグロフス" },
  { display: "Rab",            search: "Rab ラブ" },
  { display: "Helly Hansen",   search: "Helly Hansen ヘリーハンセン" },
  { display: "Marmot",         search: "Marmot マーモット" },
  { display: "Outdoor Research", search: "Outdoor Research アウトドアリサーチ OR" },
  { display: "Fjällräven",     search: "Fjällräven フェールラーベン" },
  { display: "Norrøna",        search: "Norrøna ノローナ" },
  { display: "Salewa",         search: "Salewa サレワ" },
  { display: "CW-X",           search: "CW-X シーダブルエックス ワコール" },
  // バックパック
  { display: "OSPREY",         search: "OSPREY オスプレー" },
  { display: "Gregory",        search: "Gregory グレゴリー" },
  { display: "Deuter",         search: "Deuter ドイター" },
  { display: "Karrimor",       search: "Karrimor カリマー" },
  { display: "Granite Gear",   search: "Granite Gear グラナイトギア" },
  { display: "Hyperlite Mountain Gear", search: "Hyperlite Mountain Gear HMG ハイパーライト" },
  { display: "MYSTERY RANCH",  search: "MYSTERY RANCH ミステリーランチ" },
  { display: "ULA Equipment",  search: "ULA Equipment ユーエルエー" },
  // テント・シュラフ
  { display: "NEMO Equipment", search: "NEMO Equipment ニーモ" },
  { display: "Big Agnes",      search: "Big Agnes ビッグアグネス" },
  { display: "MSR",            search: "MSR Mountain Safety Research エムエスアール" },
  { display: "Sea to Summit",  search: "Sea to Summit シートゥサミット" },
  { display: "Therm-a-Rest",   search: "Therm-a-Rest サーマレスト" },
  { display: "Western Mountaineering", search: "Western Mountaineering ウェスタンマウンテニアリング" },
  // シューズ
  { display: "Salomon",        search: "Salomon サロモン" },
  { display: "LOWA",           search: "LOWA ローバー" },
  { display: "Scarpa",         search: "Scarpa スカルパ" },
  { display: "La Sportiva",    search: "La Sportiva スポルティバ" },
  { display: "Merrell",        search: "Merrell メレル" },
  { display: "Zamberlan",      search: "Zamberlan ザンバラン" },
  { display: "ASOLO",          search: "ASOLO アゾロ" },
  // ギア・安全装備
  { display: "Black Diamond",  search: "Black Diamond ブラックダイヤモンド BD" },
  { display: "PETZL",          search: "PETZL ペツル" },
  { display: "GRIVEL",         search: "GRIVEL グリベル" },
  { display: "CAMP",           search: "CAMP カンプ" },
  { display: "Garmin",         search: "Garmin ガーミン" },
  { display: "SUUNTO",         search: "SUUNTO スント" },
  { display: "Casio PRO TREK", search: "Casio PRO TREK カシオ プロトレック" },
  { display: "Coleman",        search: "Coleman コールマン" },
  // その他
  { display: "Leatherman",     search: "Leatherman レザーマン" },
  { display: "Victorinox",     search: "Victorinox ビクトリノックス" },
  { display: "Platypus",       search: "Platypus プラティパス" },
  { display: "KATADYN",        search: "KATADYN カタダイン" },
  { display: "EXPED",          search: "EXPED エクスペド" },
];

/** ひらがな→カタカナ変換（「もんべる」→「モンベル」で検索可能に） */
export const toKatakana = (s: string) =>
  s.replace(/[\u3041-\u3096]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) + 0x60));
