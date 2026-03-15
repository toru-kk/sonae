export type GearSuggestion = {
  name: string;
  brand: string;
  category_id: string;
  weight_g: number;
  search: string; // カタカナ・英語・別名を含む検索用文字列
};

export const GEAR_SUGGESTIONS: GearSuggestion[] = [
  // ═══════════════════════════════════════════
  // シェルター (shelter)
  // ═══════════════════════════════════════════
  { name: "ステラリッジ テント 1型", brand: "mont-bell", category_id: "shelter", weight_g: 1340, search: "ステラリッジ stellaridge モンベル テント 1人用" },
  { name: "ステラリッジ テント 2型", brand: "mont-bell", category_id: "shelter", weight_g: 1550, search: "ステラリッジ stellaridge モンベル テント 2人用" },
  { name: "クロノスドーム 2型", brand: "mont-bell", category_id: "shelter", weight_g: 2180, search: "クロノスドーム chronosdome モンベル テント 2人用" },
  { name: "Hubba Hubba NX 2", brand: "MSR", category_id: "shelter", weight_g: 1540, search: "ハバハバ hubba MSR テント 2人用" },
  { name: "FreeLite 2", brand: "MSR", category_id: "shelter", weight_g: 1130, search: "フリーライト freelite MSR テント 軽量" },
  { name: "Nook 2P", brand: "NEMO", category_id: "shelter", weight_g: 1470, search: "ヌック nook ニーモ NEMO テント" },
  { name: "Hornet Elite 2P", brand: "NEMO", category_id: "shelter", weight_g: 880, search: "ホーネットエリート hornet elite ニーモ NEMO テント 軽量" },
  { name: "Copper Spur HV UL2", brand: "Big Agnes", category_id: "shelter", weight_g: 1270, search: "コッパースパー copper spur ビッグアグネス テント UL" },
  { name: "VL26", brand: "ARAI TENT", category_id: "shelter", weight_g: 1360, search: "VL26 アライテント エアライズ 2人用" },
  { name: "エアライズ 2", brand: "ARAI TENT", category_id: "shelter", weight_g: 1550, search: "エアライズ airraize アライテント テント 2人用" },
  { name: "Allak 3", brand: "HILLEBERG", category_id: "shelter", weight_g: 3200, search: "アラック allak ヒルバーグ テント 3人用 4シーズン" },
  { name: "ツェルト 2 ロング", brand: "mont-bell", category_id: "shelter", weight_g: 390, search: "ツェルト モンベル 緊急用 ビバーク" },
  { name: "ステラリッジ テント 3型", brand: "mont-bell", category_id: "shelter", weight_g: 1830, search: "ステラリッジ stellaridge モンベル テント 3人用" },
  { name: "クロノスドーム 1型", brand: "mont-bell", category_id: "shelter", weight_g: 1860, search: "クロノスドーム chronosdome モンベル テント 1人用 ソロ" },
  { name: "クロノスドーム 4型", brand: "mont-bell", category_id: "shelter", weight_g: 2870, search: "クロノスドーム chronosdome モンベル テント 4人用 ファミリー" },
  { name: "マイカテント", brand: "mont-bell", category_id: "shelter", weight_g: 770, search: "マイカ mica モンベル テント UL 軽量 ソロ" },
  { name: "ルナドーム 2型", brand: "mont-bell", category_id: "shelter", weight_g: 1840, search: "ルナドーム lunadome モンベル テント 2人用" },
  { name: "Elixir 2", brand: "MSR", category_id: "shelter", weight_g: 2770, search: "エリクサー elixir MSR テント 2人用 入門" },
  { name: "Zoic 2", brand: "MSR", category_id: "shelter", weight_g: 1950, search: "ゾイック zoic MSR テント 2人用 メッシュ" },
  { name: "Dagger OSMO 2P", brand: "NEMO", category_id: "shelter", weight_g: 1530, search: "ダガー dagger オスモ ニーモ NEMO テント 2人用" },
  { name: "Dragonfly OSMO 2P", brand: "NEMO", category_id: "shelter", weight_g: 1390, search: "ドラゴンフライ dragonfly オスモ ニーモ NEMO テント 軽量" },
  { name: "Tiger Wall UL2", brand: "Big Agnes", category_id: "shelter", weight_g: 1020, search: "タイガーウォール tiger wall ビッグアグネス テント UL 軽量" },
  { name: "Fly Creek HV UL2", brand: "Big Agnes", category_id: "shelter", weight_g: 920, search: "フライクリーク fly creek ビッグアグネス テント UL ソロ" },
  { name: "エアライズ 1", brand: "ARAI TENT", category_id: "shelter", weight_g: 1360, search: "エアライズ airraize アライテント テント 1人用 ソロ" },
  { name: "トレックライズ 1", brand: "ARAI TENT", category_id: "shelter", weight_g: 1500, search: "トレックライズ trekrise アライテント テント 1人用" },
  { name: "VL17", brand: "ARAI TENT", category_id: "shelter", weight_g: 1180, search: "VL17 アライテント 1人用 軽量" },
  { name: "Soulo", brand: "HILLEBERG", category_id: "shelter", weight_g: 2400, search: "ソウロ soulo ヒルバーグ テント 1人用 4シーズン 冬" },
  { name: "Anjan 2", brand: "HILLEBERG", category_id: "shelter", weight_g: 1500, search: "アンヤン anjan ヒルバーグ テント 2人用 3シーズン" },
  { name: "Nallo 2", brand: "HILLEBERG", category_id: "shelter", weight_g: 2400, search: "ナロ nallo ヒルバーグ テント 2人用 4シーズン" },
  { name: "ランシャン2", brand: "3F UL GEAR", category_id: "shelter", weight_g: 915, search: "ランシャン lanshan 3F UL ギア テント UL 軽量 ソロ" },
  { name: "El Chalten 1.5P", brand: "ZEROGRAM", category_id: "shelter", weight_g: 1060, search: "エルチャルテン elchalten ゼログラム テント UL" },
  { name: "Thru-Hiker Mesh House 2", brand: "ZEROGRAM", category_id: "shelter", weight_g: 870, search: "スルーハイカー thruhiker ゼログラム テント メッシュ UL" },
  { name: "カミナドーム 2", brand: "finetrack", category_id: "shelter", weight_g: 1280, search: "カミナドーム kaminadome ファイントラック テント 2人用 軽量" },
  { name: "カミナモノポール シェルター", brand: "finetrack", category_id: "shelter", weight_g: 390, search: "カミナモノポール ファイントラック シェルター ツェルト" },
  { name: "X-TREK マイペ 1", brand: "Heritage", category_id: "shelter", weight_g: 690, search: "エックストレック マイペ ヘリテイジ テント UL 軽量 ソロ" },
  { name: "Tani 2P", brand: "NEMO", category_id: "shelter", weight_g: 1310, search: "タニ tani ニーモ NEMO テント 2人用 軽量" },
  // タープ系
  { name: "Khufu CTF3", brand: "Locus Gear", category_id: "shelter", weight_g: 398, search: "クフ khufu ローカスギア タープ シルナイロン UL 軽量" },
  { name: "Lunar Solo", brand: "Six Moon Designs", category_id: "shelter", weight_g: 780, search: "ルナソロ lunar solo シックスムーンデザイン テント UL ソロ" },
  { name: "The One", brand: "Gossamer Gear", category_id: "shelter", weight_g: 623, search: "ザワン the one ゴッサマーギア テント UL ソロ" },
  { name: "Prophet 115", brand: "Mountain Laurel Designs", category_id: "shelter", weight_g: 290, search: "プロフェット prophet MLD マウンテンローレルデザインズ シェルター UL タープ" },
  { name: "Dirigo 2", brand: "Hyperlite Mountain Gear", category_id: "shelter", weight_g: 567, search: "ディリゴ dirigo ハイパーライトマウンテンギア HMG テント UL DCF キューベン" },
  // ULテント追加
  { name: "Notch Li", brand: "Tarptent", category_id: "shelter", weight_g: 455, search: "ノッチ notch ターペントレント タープテント UL ソロ" },
  { name: "Double Rainbow Li", brand: "Tarptent", category_id: "shelter", weight_g: 650, search: "ダブルレインボー double rainbow ターペントレント UL 2人用" },
  { name: "X-Mid 1", brand: "Durston", category_id: "shelter", weight_g: 538, search: "エックスミッド x-mid ダーストン テント UL ソロ 軽量" },
  { name: "X-Mid 2", brand: "Durston", category_id: "shelter", weight_g: 726, search: "エックスミッド x-mid 2 ダーストン テント UL 2人用 軽量" },
  { name: "Ultralight 2", brand: "Six Moon Designs", category_id: "shelter", weight_g: 535, search: "ウルトラライト シックスムーンデザイン テント UL 2人用" },
  // 日本ブランド追加
  { name: "パイネ ゴアライズ 1", brand: "PAINE", category_id: "shelter", weight_g: 1350, search: "パイネ paine ゴアライズ テント ゴアテックス ソロ" },
  { name: "VS-20", brand: "DUNLOP", category_id: "shelter", weight_g: 1390, search: "VS20 ダンロップ dunlop テント 2人用 山岳" },
  { name: "VS-10", brand: "DUNLOP", category_id: "shelter", weight_g: 1090, search: "VS10 ダンロップ dunlop テント 1人用 ソロ 山岳" },
  { name: "ラピスライトテント", brand: "PUROMONTE", category_id: "shelter", weight_g: 870, search: "ラピスライト puromonte プロモンテ テント UL ゴアテックス ソロ" },
  { name: "ラピスライトテント2人用", brand: "PUROMONTE", category_id: "shelter", weight_g: 1040, search: "ラピスライト puromonte プロモンテ テント UL ゴアテックス 2人用" },
  { name: "システムテントPVS-T-25", brand: "ogawa", category_id: "shelter", weight_g: 1330, search: "オガワ ogawa PVS システムテント 2人用" },
  // ハンモック
  { name: "Hammock Expedition Asym Zip", brand: "Hennessy Hammock", category_id: "shelter", weight_g: 680, search: "ヘネシーハンモック hennessy hammock エクスペディション ハンモック キャンプ" },
  { name: "DoubleNest Hammock", brand: "ENO", category_id: "shelter", weight_g: 521, search: "ダブルネスト eno イーグルスネストアウトフィッターズ ハンモック 2人用" },
  { name: "SingleNest Hammock", brand: "ENO", category_id: "shelter", weight_g: 453, search: "シングルネスト eno イーグルスネスト ハンモック ソロ" },
  // ツェルト追加
  { name: "スーパーライトツェルト 1", brand: "ARAI TENT", category_id: "shelter", weight_g: 220, search: "スーパーライトツェルト アライテント ツェルト UL 超軽量 緊急 ビバーク ソロ" },
  { name: "スーパーライトツェルト 2", brand: "ARAI TENT", category_id: "shelter", weight_g: 280, search: "スーパーライトツェルト アライテント ツェルト UL 超軽量 緊急 ビバーク 2人用" },
  // MSR追加
  { name: "Access 2", brand: "MSR", category_id: "shelter", weight_g: 1700, search: "アクセス access MSR テント 2人用 冬山 4シーズン アルパイン" },
  { name: "Remote 2", brand: "MSR", category_id: "shelter", weight_g: 2720, search: "リモート remote MSR テント 2人用 厳冬期 4シーズン 山岳" },
  // NEMO追加
  { name: "Aurora 2P", brand: "NEMO", category_id: "shelter", weight_g: 2100, search: "オーロラ aurora ニーモ NEMO テント 2人用 4シーズン 冬山" },
  // Snow Peak
  { name: "ランドブリーズ Pro.2", brand: "Snow Peak", category_id: "shelter", weight_g: 3800, search: "ランドブリーズ landbrieze プロ スノーピーク テント 2人用 山岳" },
  { name: "ファル Pro.air 2", brand: "Snow Peak", category_id: "shelter", weight_g: 1230, search: "ファル pro air スノーピーク テント UL 軽量 2人用" },
  // CAPTAIN STAG
  { name: "キャプテンスタッグ ツーリングテント UV", brand: "CAPTAIN STAG", category_id: "shelter", weight_g: 2000, search: "キャプテンスタッグ captain stag テント ツーリング UVカット" },
  { name: "スカイラインメッシュテント", brand: "CAPTAIN STAG", category_id: "shelter", weight_g: 1800, search: "キャプテンスタッグ captain stag スカイライン メッシュ テント" },
  // Coleman
  { name: "ツーリングドームST", brand: "Coleman", category_id: "shelter", weight_g: 2750, search: "ツーリングドーム touring dome コールマン coleman テント ソロ ツーリング" },
  { name: "タフスクリーン2ルームハウス", brand: "Coleman", category_id: "shelter", weight_g: 16000, search: "タフスクリーン 2ルーム コールマン coleman テント ファミリー キャンプ" },
  // DOD
  { name: "ライダーズワンタッチテント", brand: "DOD", category_id: "shelter", weight_g: 2400, search: "ライダーズ ワンタッチ ドッペルギャンガー DOD テント ソロ ツーリング" },
  { name: "ショウネンテント", brand: "DOD", category_id: "shelter", weight_g: 1900, search: "少年テント ショウネン ドッペルギャンガー DOD テント ソロ 軽量" },
  // Nordisk
  { name: "Lofoten 2 Camp SI", brand: "Nordisk", category_id: "shelter", weight_g: 3100, search: "ロフォーテン lofoten ノルディスク テント 2人用 4シーズン 冬山" },
  // Terra Nova
  { name: "Laser Compact 2", brand: "Terra Nova", category_id: "shelter", weight_g: 960, search: "レーザーコンパクト laser compact テラノバ テント UL 2人用 軽量" },
  // finetrack 追加
  { name: "カミナドーム 1", brand: "finetrack", category_id: "shelter", weight_g: 1130, search: "カミナドーム kaminadome ファイントラック テント 1人用 ソロ 軽量" },
  // ZEROGRAM 追加
  { name: "スルーハイカー 1P", brand: "ZEROGRAM", category_id: "shelter", weight_g: 680, search: "スルーハイカー thruhiker ゼログラム テント UL ソロ 1人用 軽量" },
  // Naturehike
  { name: "CloudUp 2", brand: "Naturehike", category_id: "shelter", weight_g: 1550, search: "クラウドアップ cloudup ネイチャーハイク テント 2人用 軽量 コスパ" },
  { name: "Star River 2", brand: "Naturehike", category_id: "shelter", weight_g: 2100, search: "スターリバー star river ネイチャーハイク テント 2人用 自立式" },
  // HERITAGE 追加
  { name: "クロスオーバードーム 2G", brand: "Heritage", category_id: "shelter", weight_g: 540, search: "クロスオーバードーム crossoverdome ヘリテイジ テント UL 超軽量 ソロ" },
  { name: "HI-REVO", brand: "Heritage", category_id: "shelter", weight_g: 780, search: "ハイレヴォ hirevo ヘリテイジ シェルター ツェルト UL 超軽量" },
  // Six Moon Designs 追加
  { name: "Haven", brand: "Six Moon Designs", category_id: "shelter", weight_g: 960, search: "ヘイブン haven シックスムーンデザイン テント ハンモック タープ UL" },
  { name: "Skyscape Trekker", brand: "Six Moon Designs", category_id: "shelter", weight_g: 737, search: "スカイスケープトレッカー skyscape trekker シックスムーンデザイン テント UL ソロ" },
  // Locus Gear 追加
  { name: "Djedi DCF-eVent", brand: "Locus Gear", category_id: "shelter", weight_g: 340, search: "ジェダイ djedi DCF イーベント ローカスギア シェルター UL 超軽量 キューベン" },
  { name: "Hapi", brand: "Locus Gear", category_id: "shelter", weight_g: 280, search: "ハピ hapi ローカスギア タープ ピラミッド UL 超軽量 シルナイロン" },
  // ULA
  { name: "SB-2", brand: "ULA", category_id: "shelter", weight_g: 510, search: "SB-2 ユーエルエー ULA シェルター タープ UL 軽量" },
  // Seek Outside
  { name: "Cimarron", brand: "Seek Outside", category_id: "shelter", weight_g: 1270, search: "シマロン cimarron シークアウトサイド テント ティピ 薪ストーブ ホットテント" },
  { name: "Redcliff", brand: "Seek Outside", category_id: "shelter", weight_g: 1360, search: "レッドクリフ redcliff シークアウトサイド テント ティピ 薪ストーブ ホットテント" },
  // 小川テント
  { name: "ステイシー ST-II", brand: "ogawa", category_id: "shelter", weight_g: 2900, search: "ステイシー stacy オガワ ogawa 小川テント テント ソロ ツーリング" },
  // PAINE 追加
  { name: "パイネ ゴアライズ 2", brand: "PAINE", category_id: "shelter", weight_g: 1560, search: "パイネ paine ゴアライズ テント ゴアテックス 2人用" },
  // タープ
  { name: "DD SuperLight Tarp 3x3", brand: "DD Hammocks", category_id: "shelter", weight_g: 460, search: "DDスーパーライト タープ dd hammocks ハンモック UL 軽量 タープ泊" },
  { name: "Siltarp 3", brand: "Rab", category_id: "shelter", weight_g: 340, search: "シルタープ siltarp ラブ rab タープ シルナイロン UL 軽量" },
  { name: "Ultra-Sil Nano Tarp Poncho", brand: "Sea to Summit", category_id: "shelter", weight_g: 145, search: "ウルトラシルナノ ultra-sil nano シートゥサミット タープ ポンチョ UL 超軽量" },
  // フットプリント・グランドシート
  { name: "グラウンドシート ドーム2型用", brand: "mont-bell", category_id: "shelter", weight_g: 190, search: "グラウンドシート モンベル テント フットプリント 保護 防水" },
  { name: "Tyvek グランドシート", brand: "タイベック", category_id: "shelter", weight_g: 130, search: "タイベック tyvek グランドシート フットプリント テント 自作 UL 軽量" },
  // Tarptent 追加
  { name: "Aeon Li", brand: "Tarptent", category_id: "shelter", weight_g: 397, search: "イーオン aeon ターペントレント タープテント UL ソロ DCF 超軽量" },
  // Zpacks
  { name: "Duplex", brand: "Zpacks", category_id: "shelter", weight_g: 539, search: "デュプレックス duplex ジーパックス Zpacks テント DCF キューベン UL 2人用" },

  // ═══════════════════════════════════════════
  // シュラフ・寝具 (sleeping)
  // ═══════════════════════════════════════════
  { name: "ダウンハガー800 #3", brand: "mont-bell", category_id: "sleeping", weight_g: 575, search: "ダウンハガー downhugger モンベル シュラフ 寝袋 3シーズン" },
  { name: "ダウンハガー800 #1", brand: "mont-bell", category_id: "sleeping", weight_g: 868, search: "ダウンハガー downhugger モンベル シュラフ 寝袋 冬用" },
  { name: "シームレスダウンハガー800 #3", brand: "mont-bell", category_id: "sleeping", weight_g: 531, search: "シームレスダウンハガー seamless モンベル シュラフ 軽量" },
  { name: "オーロラライト 450DX", brand: "NANGA", category_id: "sleeping", weight_g: 865, search: "オーロラライト auroralight ナンガ シュラフ 寝袋 3シーズン" },
  { name: "オーロラライト 600DX", brand: "NANGA", category_id: "sleeping", weight_g: 1050, search: "オーロラライト auroralight ナンガ シュラフ 寝袋 冬用" },
  { name: "UDD BAG 450DX", brand: "NANGA", category_id: "sleeping", weight_g: 825, search: "UDD BAG ナンガ シュラフ 寝袋 超撥水" },
  { name: "エア 450X", brand: "ISUKA", category_id: "sleeping", weight_g: 840, search: "エア air イスカ シュラフ 寝袋" },
  { name: "ニュートリノ 400", brand: "Rab", category_id: "sleeping", weight_g: 750, search: "ニュートリノ neutrino ラブ シュラフ 寝袋" },
  { name: "ネオエアー Xサーモ NXT", brand: "THERMAREST", category_id: "sleeping", weight_g: 440, search: "ネオエアー neoair xthermo サーマレスト マット パッド R値" },
  { name: "Zライト ソル", brand: "THERMAREST", category_id: "sleeping", weight_g: 410, search: "Zライト zlite ソル サーマレスト マット クローズドセル" },
  { name: "U.L. コンフォートシステム アルパインパッド 25", brand: "mont-bell", category_id: "sleeping", weight_g: 505, search: "アルパインパッド モンベル マット パッド" },
  { name: "ダウンハガー800 #2", brand: "mont-bell", category_id: "sleeping", weight_g: 685, search: "ダウンハガー downhugger モンベル シュラフ 寝袋 #2" },
  { name: "ダウンハガー800 #5", brand: "mont-bell", category_id: "sleeping", weight_g: 415, search: "ダウンハガー downhugger モンベル シュラフ 寝袋 夏用 #5" },
  { name: "ダウンハガー800 #0", brand: "mont-bell", category_id: "sleeping", weight_g: 1050, search: "ダウンハガー downhugger モンベル シュラフ 寝袋 厳冬期 #0" },
  { name: "シームレスダウンハガー800 #1", brand: "mont-bell", category_id: "sleeping", weight_g: 782, search: "シームレスダウンハガー seamless モンベル シュラフ 冬用" },
  { name: "バロウバッグ #3", brand: "mont-bell", category_id: "sleeping", weight_g: 915, search: "バロウバッグ burrow モンベル シュラフ 化繊 3シーズン" },
  { name: "オーロラライト 350DX", brand: "NANGA", category_id: "sleeping", weight_g: 750, search: "オーロラライト auroralight ナンガ シュラフ 寝袋 夏秋" },
  { name: "オーロラライト 750DX", brand: "NANGA", category_id: "sleeping", weight_g: 1200, search: "オーロラライト auroralight ナンガ シュラフ 寝袋 厳冬期" },
  { name: "オーロラライト 900DX", brand: "NANGA", category_id: "sleeping", weight_g: 1400, search: "オーロラライト auroralight ナンガ シュラフ 寝袋 極寒" },
  { name: "UDD BAG 380DX", brand: "NANGA", category_id: "sleeping", weight_g: 680, search: "UDD BAG ナンガ シュラフ 寝袋 超撥水 夏秋" },
  { name: "UDD BAG 630DX", brand: "NANGA", category_id: "sleeping", weight_g: 1045, search: "UDD BAG ナンガ シュラフ 寝袋 超撥水 冬用" },
  { name: "ミニマリスム 180", brand: "NANGA", category_id: "sleeping", weight_g: 326, search: "ミニマリスム minimalism ナンガ シュラフ UL 軽量 夏" },
  { name: "エア 280X", brand: "ISUKA", category_id: "sleeping", weight_g: 550, search: "エア air イスカ シュラフ 寝袋 夏秋 軽量" },
  { name: "エア 630EX", brand: "ISUKA", category_id: "sleeping", weight_g: 1060, search: "エア air イスカ シュラフ 寝袋 冬用" },
  { name: "エア 810EX", brand: "ISUKA", category_id: "sleeping", weight_g: 1320, search: "エア air イスカ シュラフ 寝袋 厳冬期" },
  { name: "アルファライト 500X", brand: "ISUKA", category_id: "sleeping", weight_g: 1050, search: "アルファライト alphalight イスカ シュラフ 化繊" },
  { name: "ニュートリノ 600", brand: "Rab", category_id: "sleeping", weight_g: 990, search: "ニュートリノ neutrino ラブ シュラフ 冬用" },
  { name: "マイクロン 400", brand: "Rab", category_id: "sleeping", weight_g: 850, search: "マイクロン micron ラブ シュラフ 化繊" },
  { name: "Magma 15", brand: "THE NORTH FACE", category_id: "sleeping", weight_g: 850, search: "マグマ magma ノースフェイス シュラフ 寝袋 ダウン" },
  { name: "ネオエアー ウーバーライト", brand: "THERMAREST", category_id: "sleeping", weight_g: 250, search: "ネオエアー neoair ウーバーライト uberlite サーマレスト マット UL" },
  { name: "プロライト", brand: "THERMAREST", category_id: "sleeping", weight_g: 510, search: "プロライト prolite サーマレスト マット 自動膨張" },
  { name: "テンサー インシュレーテッド", brand: "NEMO", category_id: "sleeping", weight_g: 425, search: "テンサー tensor ニーモ NEMO マット パッド 暖かい" },
  { name: "スイッチバック", brand: "NEMO", category_id: "sleeping", weight_g: 415, search: "スイッチバック switchback ニーモ NEMO マット クローズドセル" },
  { name: "U.L. コンフォートシステム キャンプパッド 38", brand: "mont-bell", category_id: "sleeping", weight_g: 735, search: "キャンプパッド モンベル マット 厚手 快適" },
  { name: "U.L. コンフォートシステム エアパッド 150", brand: "mont-bell", category_id: "sleeping", weight_g: 370, search: "エアパッド モンベル マット 軽量 UL" },
  // mont-bell追加シュラフ
  { name: "アルパインダウンハガー800 #3", brand: "mont-bell", category_id: "sleeping", weight_g: 472, search: "アルパインダウンハガー800 alpine downhugger モンベル シュラフ 寝袋 3シーズン 軽量" },
  { name: "アルパインダウンハガー800 #1", brand: "mont-bell", category_id: "sleeping", weight_g: 748, search: "アルパインダウンハガー800 alpine downhugger モンベル シュラフ 冬用" },
  { name: "スパイラルダウンハガー800 #3", brand: "mont-bell", category_id: "sleeping", weight_g: 565, search: "スパイラルダウンハガー spiral downhugger モンベル シュラフ 寝袋 3シーズン" },
  { name: "スパイラルダウンハガー800 #1", brand: "mont-bell", category_id: "sleeping", weight_g: 848, search: "スパイラルダウンハガー spiral downhugger モンベル シュラフ 冬用" },
  // SEA TO SUMMIT シュラフ
  { name: "Spark SpIV", brand: "Sea to Summit", category_id: "sleeping", weight_g: 310, search: "スパーク spark シートゥサミット シュラフ 寝袋 UL 夏 軽量" },
  { name: "Spark SpII", brand: "Sea to Summit", category_id: "sleeping", weight_g: 620, search: "スパーク spark シートゥサミット シュラフ 寝袋 UL 3シーズン" },
  { name: "Spark SpI", brand: "Sea to Summit", category_id: "sleeping", weight_g: 850, search: "スパーク spark シートゥサミット シュラフ 寝袋 UL 冬" },
  // Western Mountaineering
  { name: "UltraLite 20°F", brand: "Western Mountaineering", category_id: "sleeping", weight_g: 737, search: "ウエスタンマウンテニアリング ultralite ウルトラライト シュラフ ダウン UL" },
  { name: "Versalite 10°F", brand: "Western Mountaineering", category_id: "sleeping", weight_g: 900, search: "ウエスタンマウンテニアリング versalite バーサライト シュラフ ダウン 冬" },
  // Enlightened Equipment
  { name: "Revelation 20°F", brand: "Enlightened Equipment", category_id: "sleeping", weight_g: 510, search: "エンライトンドイクイップメント enlightened equipment レベレーション revelation キルト シュラフ UL 軽量" },
  { name: "Convert 20°F", brand: "Enlightened Equipment", category_id: "sleeping", weight_g: 540, search: "エンライトンドイクイップメント enlightened equipment コンバート convert キルト シュラフ UL" },
  // NEMO シュラフ
  { name: "Disco 15°F", brand: "NEMO", category_id: "sleeping", weight_g: 1070, search: "ディスコ disco ニーモ NEMO シュラフ 寝袋 スポーン 変形 横向き" },
  { name: "Riff 15°F", brand: "NEMO", category_id: "sleeping", weight_g: 1160, search: "リフ riff ニーモ NEMO シュラフ 寝袋 レディース スポーン" },
  // シュラフカバー
  { name: "ゴアテックス シュラフカバー シングル", brand: "ISUKA", category_id: "sleeping", weight_g: 290, search: "ゴアテックス シュラフカバー イスカ isuka 防水 透湿" },
  { name: "ゴアテックス シュラフカバー ワイド", brand: "ISUKA", category_id: "sleeping", weight_g: 330, search: "ゴアテックス シュラフカバー ワイド イスカ isuka 防水 透湿" },
  { name: "ブリーズドライテック シュラフカバー", brand: "mont-bell", category_id: "sleeping", weight_g: 190, search: "ブリーズドライテック breezedrytec シュラフカバー モンベル 防水 透湿 軽量" },
  // 枕
  { name: "ピロープレミアム レギュラー", brand: "mont-bell", category_id: "sleeping", weight_g: 120, search: "ピロー pillow プレミアム モンベル 枕 エアー インフレータブル 登山" },
  { name: "フィロー ピロー", brand: "NEMO", category_id: "sleeping", weight_g: 57, search: "フィロー fillo ニーモ NEMO 枕 インフレータブル 超軽量 コンパクト" },
  { name: "Aeros Ultralight Pillow", brand: "Sea to Summit", category_id: "sleeping", weight_g: 58, search: "エアロス aeros ウルトラライト シートゥサミット 枕 エアー UL 超軽量" },
  // mont-bell追加シュラフ
  { name: "アルパインバロウバッグ #3", brand: "mont-bell", category_id: "sleeping", weight_g: 990, search: "アルパインバロウバッグ alpine burrow モンベル シュラフ 化繊 3シーズン" },
  { name: "アルパインダウンハガー650 #3", brand: "mont-bell", category_id: "sleeping", weight_g: 556, search: "アルパインダウンハガー650 alpine downhugger モンベル シュラフ 寝袋 3シーズン 650フィル" },
  // Deuter
  { name: "Astro Pro 600", brand: "Deuter", category_id: "sleeping", weight_g: 1010, search: "アストロ プロ deuter ドイター シュラフ 寝袋 ダウン 3シーズン" },
  { name: "Orbit SQ +5°", brand: "Deuter", category_id: "sleeping", weight_g: 1100, search: "オービット SQ deuter ドイター シュラフ 寝袋 封筒型 ダウン" },
  // Naturehike
  { name: "CW400 マミー型シュラフ", brand: "Naturehike", category_id: "sleeping", weight_g: 950, search: "CW400 ネイチャーハイク naturehike シュラフ 寝袋 ダウン 3シーズン" },
  { name: "CW280 マミー型シュラフ", brand: "Naturehike", category_id: "sleeping", weight_g: 700, search: "CW280 ネイチャーハイク naturehike シュラフ 寝袋 ダウン 軽量" },
  // SOL ビビー
  { name: "エスケープビビー", brand: "SOL", category_id: "sleeping", weight_g: 270, search: "エスケープ ビビー escape bivvy SOL ソル 緊急 エマージェンシー ビバーク" },
  // シュラフシーツ
  { name: "サーマルシーツ シングル", brand: "mont-bell", category_id: "sleeping", weight_g: 180, search: "サーマルシーツ モンベル シュラフシーツ インナーシーツ 保温 インナー" },
  { name: "スリーピングバッグライナー", brand: "Sea to Summit", category_id: "sleeping", weight_g: 115, search: "スリーピングバッグライナー シートゥサミット シュラフシーツ インナー シルク コットン" },
  { name: "ゴアテックスシュラフカバーワイド", brand: "ISUKA", category_id: "sleeping", weight_g: 340, search: "ゴアテックス シュラフカバー ワイド イスカ isuka 防水 透湿 ビビー" },
  // Cumulus
  { name: "Quilt 450", brand: "Cumulus", category_id: "sleeping", weight_g: 710, search: "キルト quilt キュムラス cumulus シュラフ ダウン UL 軽量 ポーランド" },
  { name: "Panyam 600", brand: "Cumulus", category_id: "sleeping", weight_g: 960, search: "パニャム panyam キュムラス cumulus シュラフ ダウン 冬用 マミー型" },
  // Enlightened Equipment 追加
  { name: "Enigma 20°F", brand: "Enlightened Equipment", category_id: "sleeping", weight_g: 490, search: "エンライトンドイクイップメント enlightened equipment エニグマ enigma キルト シュラフ UL 軽量" },
  // NANGA 追加
  { name: "ミニマリスムダウンバッグ 250STD", brand: "NANGA", category_id: "sleeping", weight_g: 500, search: "ミニマリスム minimalism ダウンバッグ ナンガ シュラフ UL 軽量 250" },
  // ISUKA 追加
  { name: "エアプラス 280", brand: "ISUKA", category_id: "sleeping", weight_g: 570, search: "エアプラス airplus イスカ シュラフ 寝袋 軽量 3シーズン" },
  { name: "エアプラス 630", brand: "ISUKA", category_id: "sleeping", weight_g: 1070, search: "エアプラス airplus イスカ シュラフ 寝袋 冬用 ダウン" },
  { name: "ダウンプラス ポカラ X", brand: "ISUKA", category_id: "sleeping", weight_g: 1350, search: "ダウンプラス ポカラ pokara イスカ シュラフ 寝袋 封筒型 ワイド 快適" },
  // Patagonia
  { name: "850ダウン スリーピングバッグ 19°F", brand: "Patagonia", category_id: "sleeping", weight_g: 964, search: "パタゴニア patagonia 850ダウン シュラフ 寝袋 ダウン リサイクル 環境" },
  // Therm-a-Rest 追加
  { name: "ProLite Plus", brand: "THERMAREST", category_id: "sleeping", weight_g: 620, search: "プロライトプラス proliteplus サーマレスト マット 自動膨張 暖かい" },
  { name: "Trail Scout", brand: "THERMAREST", category_id: "sleeping", weight_g: 740, search: "トレイルスカウト trail scout サーマレスト マット 自動膨張 入門" },
  // NEMO 追加
  { name: "Tensor Insulated Long Wide", brand: "NEMO", category_id: "sleeping", weight_g: 510, search: "テンサー tensor ロングワイド ニーモ NEMO マット パッド 暖かい 大型" },
  // Exped
  { name: "SynMat HL", brand: "Exped", category_id: "sleeping", weight_g: 395, search: "シンマット synmat エクスペド exped マット UL 軽量 エアー" },
  { name: "MegaMat Lite 12", brand: "Exped", category_id: "sleeping", weight_g: 880, search: "メガマット megamat ライト エクスペド exped マット 厚手 快適 12cm" },
  // Sea to Summit マット
  { name: "Comfort Plus SI マット", brand: "Sea to Summit", category_id: "sleeping", weight_g: 750, search: "コンフォートプラス comfort plus シートゥサミット マット 自動膨張 快適" },
  { name: "Ether Light XT Insulated", brand: "Sea to Summit", category_id: "sleeping", weight_g: 490, search: "イーサーライト ether light XT シートゥサミット マット エアー 暖かい 軽量" },
  // コット
  { name: "ライトコット", brand: "Helinox", category_id: "sleeping", weight_g: 1200, search: "ライトコット lightcot ヘリノックス helinox コット 軽量 コンパクト" },
  { name: "ラグジュアリーライト メッシュコット", brand: "THERMAREST", category_id: "sleeping", weight_g: 2630, search: "ラグジュアリーライト luxurylite メッシュコット サーマレスト コット キャンプ 快適" },
  // mont-bell 枕追加
  { name: "U.L. コンフォートシステムピロー", brand: "mont-bell", category_id: "sleeping", weight_g: 63, search: "ULコンフォートシステムピロー モンベル 枕 エアー 超軽量 コンパクト" },
  // SOL 追加
  { name: "エスケーピービヴィ", brand: "SOL", category_id: "sleeping", weight_g: 241, search: "エスケーピー ビヴィ escape bivvy SOL ソル ビバーク 透湿 エマージェンシー" },
  // NANGA 追加
  { name: "オーロラ 450STD", brand: "NANGA", category_id: "sleeping", weight_g: 1000, search: "オーロラ aurora ナンガ シュラフ 寝袋 防水 3シーズン" },
  { name: "オーロラ 600STD", brand: "NANGA", category_id: "sleeping", weight_g: 1200, search: "オーロラ aurora ナンガ シュラフ 寝袋 防水 冬用" },
  // Klymit
  { name: "Static V Insulated", brand: "Klymit", category_id: "sleeping", weight_g: 652, search: "スタティック static V クライミット klymit マット エアー 断熱 Vチャンバー" },

  // ═══════════════════════════════════════════
  // 衣類 (clothing)
  // ═══════════════════════════════════════════
  { name: "ストームクルーザー ジャケット", brand: "mont-bell", category_id: "clothing", weight_g: 254, search: "ストームクルーザー stormcruiser モンベル レインウェア ゴアテックス" },
  { name: "ストームクルーザー パンツ", brand: "mont-bell", category_id: "clothing", weight_g: 255, search: "ストームクルーザー stormcruiser モンベル レインパンツ ゴアテックス" },
  { name: "トレントフライヤー ジャケット", brand: "mont-bell", category_id: "clothing", weight_g: 198, search: "トレントフライヤー torrentflyer モンベル レインウェア 軽量" },
  { name: "クライムベリーライト ジャケット", brand: "THE NORTH FACE", category_id: "clothing", weight_g: 200, search: "クライムベリーライト climbverylight ノースフェイス レインウェア ゴアテックス" },
  { name: "クラウドジャケット", brand: "THE NORTH FACE", category_id: "clothing", weight_g: 310, search: "クラウドジャケット cloud ノースフェイス レインウェア" },
  { name: "Beta LT Jacket", brand: "Arc'teryx", category_id: "clothing", weight_g: 350, search: "ベータ beta LT アークテリクス レインウェア ゴアテックス" },
  { name: "Zeta SL Jacket", brand: "Arc'teryx", category_id: "clothing", weight_g: 310, search: "ゼータ zeta SL アークテリクス レインウェア" },
  { name: "トレッキング レインスーツ", brand: "THE NORTH FACE", category_id: "clothing", weight_g: 580, search: "トレッキング レインスーツ ノースフェイス セットアップ" },
  { name: "プラズマ1000 ダウンジャケット", brand: "mont-bell", category_id: "clothing", weight_g: 130, search: "プラズマ1000 plasma モンベル ダウン 軽量 インサレーション" },
  { name: "スペリオダウン ラウンドネックジャケット", brand: "mont-bell", category_id: "clothing", weight_g: 195, search: "スペリオダウン superior モンベル ダウン 中間着" },
  { name: "マイクロパフ フーディ", brand: "patagonia", category_id: "clothing", weight_g: 264, search: "マイクロパフ micropuff パタゴニア 化繊 インサレーション" },
  { name: "ナノパフ ジャケット", brand: "patagonia", category_id: "clothing", weight_g: 337, search: "ナノパフ nanopuff パタゴニア 化繊 インサレーション" },
  { name: "Atom LT Hoody", brand: "Arc'teryx", category_id: "clothing", weight_g: 355, search: "アトム atom LT アークテリクス 化繊 インサレーション" },
  { name: "Cerium Hoody", brand: "Arc'teryx", category_id: "clothing", weight_g: 280, search: "セリウム cerium アークテリクス ダウン" },
  { name: "サンダーパス ジャケット", brand: "mont-bell", category_id: "clothing", weight_g: 340, search: "サンダーパス thunderpass モンベル レインウェア エントリー" },
  { name: "R1 エア フルジップ フーディ", brand: "patagonia", category_id: "clothing", weight_g: 340, search: "R1 エア パタゴニア フリース 中間着" },
  { name: "ジオライン M.W. ラウンドネックシャツ", brand: "mont-bell", category_id: "clothing", weight_g: 155, search: "ジオライン geoline モンベル ベースレイヤー 中厚手" },
  { name: "キャプリーン クール デイリー", brand: "patagonia", category_id: "clothing", weight_g: 119, search: "キャプリーン capilene パタゴニア ベースレイヤー 行動着" },
  { name: "レインダンサー ジャケット", brand: "mont-bell", category_id: "clothing", weight_g: 285, search: "レインダンサー raindancer モンベル レインウェア ゴアテックス" },
  { name: "レインダンサー パンツ", brand: "mont-bell", category_id: "clothing", weight_g: 215, search: "レインダンサー raindancer モンベル レインパンツ ゴアテックス" },
  { name: "ピークシェル ジャケット", brand: "mont-bell", category_id: "clothing", weight_g: 128, search: "ピークシェル peakshell モンベル レインウェア UL 軽量" },
  { name: "バーサライトジャケット", brand: "mont-bell", category_id: "clothing", weight_g: 200, search: "バーサライト versalite モンベル レインウェア UL 超軽量" },
  { name: "ウインドブラスト パーカ", brand: "mont-bell", category_id: "clothing", weight_g: 110, search: "ウインドブラスト windblast モンベル ウインドシェル" },
  { name: "EXライト ウインドジャケット", brand: "mont-bell", category_id: "clothing", weight_g: 52, search: "EXライト ウインド モンベル ウインドシェル UL 超軽量" },
  { name: "クリマプラス100 ジャケット", brand: "mont-bell", category_id: "clothing", weight_g: 290, search: "クリマプラス100 climaplus モンベル フリース 中間着" },
  { name: "ジオライン L.W. ラウンドネックシャツ", brand: "mont-bell", category_id: "clothing", weight_g: 110, search: "ジオライン geoline LW モンベル ベースレイヤー 薄手" },
  { name: "ジオライン EXP. ラウンドネックシャツ", brand: "mont-bell", category_id: "clothing", weight_g: 215, search: "ジオライン geoline EXP モンベル ベースレイヤー 厚手 冬" },
  { name: "スーパーメリノウール M.W. ラウンドネックシャツ", brand: "mont-bell", category_id: "clothing", weight_g: 195, search: "スーパーメリノウール merino モンベル ベースレイヤー ウール 中厚手" },
  { name: "マウンテンバーサマイクロジャケット", brand: "THE NORTH FACE", category_id: "clothing", weight_g: 255, search: "マウンテンバーサマイクロ バーサマイクロ ノースフェイス フリース" },
  { name: "オルタイムフーディ", brand: "THE NORTH FACE", category_id: "clothing", weight_g: 210, search: "オルタイム alltime ノースフェイス 行動着 フーディ" },
  { name: "FLドリズルジャケット", brand: "THE NORTH FACE", category_id: "clothing", weight_g: 270, search: "FLドリズル drizzle ノースフェイス レインウェア ゴアテックス 軽量" },
  { name: "ストライクトレイルフーディ", brand: "THE NORTH FACE", category_id: "clothing", weight_g: 110, search: "ストライクトレイル strike trail ノースフェイス レインウェア ランニング UL" },
  { name: "サンダージャケット", brand: "THE NORTH FACE", category_id: "clothing", weight_g: 260, search: "サンダー thunder ノースフェイス ダウン インサレーション" },
  { name: "R2 テックフェイス ジャケット", brand: "patagonia", category_id: "clothing", weight_g: 372, search: "R2 テックフェイス パタゴニア フリース 行動着" },
  { name: "フーディニ ジャケット", brand: "patagonia", category_id: "clothing", weight_g: 105, search: "フーディニ houdini パタゴニア ウインドシェル 軽量" },
  { name: "トレントシェル 3L ジャケット", brand: "patagonia", category_id: "clothing", weight_g: 394, search: "トレントシェル torrentshell パタゴニア レインウェア H2No" },
  { name: "ダウンセーター フーディ", brand: "patagonia", category_id: "clothing", weight_g: 371, search: "ダウンセーター downsweater パタゴニア ダウン インサレーション" },
  { name: "キャプリーン サーマルウェイト", brand: "patagonia", category_id: "clothing", weight_g: 178, search: "キャプリーン capilene サーマルウェイト thermal パタゴニア ベースレイヤー 冬" },
  { name: "Beta AR Jacket", brand: "Arc'teryx", category_id: "clothing", weight_g: 455, search: "ベータ beta AR アークテリクス レインウェア ゴアテックス オールラウンド" },
  { name: "Alpha SV Jacket", brand: "Arc'teryx", category_id: "clothing", weight_g: 490, search: "アルファ alpha SV アークテリクス ハードシェル ゴアテックス 最強" },
  { name: "Squamish Hoody", brand: "Arc'teryx", category_id: "clothing", weight_g: 155, search: "スコーミッシュ squamish アークテリクス ウインドシェル" },
  { name: "Proton LT Hoody", brand: "Arc'teryx", category_id: "clothing", weight_g: 350, search: "プロトン proton LT アークテリクス 化繊 インサレーション 行動着" },
  { name: "Delta LT Jacket", brand: "Arc'teryx", category_id: "clothing", weight_g: 230, search: "デルタ delta LT アークテリクス フリース 中間着" },
  { name: "Kento Light HS Hooded Jacket", brand: "MAMMUT", category_id: "clothing", weight_g: 335, search: "ケント kento ライト マムート レインウェア ゴアテックス" },
  { name: "Rime IN Flex Hooded Jacket", brand: "MAMMUT", category_id: "clothing", weight_g: 410, search: "ライム rime マムート 化繊 インサレーション ストレッチ" },
  { name: "ドラウトクロー ジャケット", brand: "finetrack", category_id: "clothing", weight_g: 215, search: "ドラウトクロー draut claw ファイントラック 行動着 中間着" },
  { name: "エバーブレス フォトン ジャケット", brand: "finetrack", category_id: "clothing", weight_g: 200, search: "エバーブレス フォトン everbreathe photon ファイントラック レインウェア" },
  { name: "ポリゴンアクト ジャケット", brand: "finetrack", category_id: "clothing", weight_g: 240, search: "ポリゴンアクト polygonact ファイントラック 化繊 インサレーション 行動着" },
  { name: "ドライレイヤー ベーシック", brand: "finetrack", category_id: "clothing", weight_g: 50, search: "ドライレイヤー drylayer ファイントラック アンダーウェア メッシュ 汗冷え防止" },
  { name: "ミレスト ゼロ フーディ", brand: "Rab", category_id: "clothing", weight_g: 87, search: "ミレスト ゼロ ラブ ウインドシェル UL 超軽量" },

  // Millet
  { name: "ティフォン 50000 ストレッチ ジャケット", brand: "Millet", category_id: "clothing", weight_g: 395, search: "ティフォン tiphon ミレー レインウェア ゴアテックス ストレッチ" },
  { name: "ブリーズバリヤー ジャケット", brand: "Millet", category_id: "clothing", weight_g: 330, search: "ブリーズバリヤー breezebarrier ミレー ウインドシェル 防風" },

  // MOUNTAIN HARDWEAR
  { name: "ゴーストウィスパラー ダウン フーデッドジャケット", brand: "MOUNTAIN HARDWEAR", category_id: "clothing", weight_g: 277, search: "ゴーストウィスパラー ghostwhisperer マウンテンハードウェア ダウン 軽量" },
  { name: "ストレッチダウン フーデッドジャケット", brand: "MOUNTAIN HARDWEAR", category_id: "clothing", weight_g: 440, search: "ストレッチダウン stretch down マウンテンハードウェア ダウン 行動着" },

  // Columbia
  { name: "ウェイポイント クレスト ジャケット", brand: "Columbia", category_id: "clothing", weight_g: 320, search: "ウェイポイント コロンビア オムニテック omnitech レインウェア 防水" },
  { name: "アーチャーリッジ II ジャケット", brand: "Columbia", category_id: "clothing", weight_g: 360, search: "アーチャーリッジ archerridge コロンビア オムニテック 防水 レイン" },

  // Haglöfs
  { name: "L.I.M Proof Jacket", brand: "Haglöfs", category_id: "clothing", weight_g: 215, search: "LIM プルーフ ホグロフス レインウェア 軽量 防水" },
  { name: "L.I.M GTX Jacket", brand: "Haglöfs", category_id: "clothing", weight_g: 330, search: "LIM GTX ホグロフス レインウェア ゴアテックス" },

  // Norrøna
  { name: "falketind Gore-Tex Jacket", brand: "Norrøna", category_id: "clothing", weight_g: 380, search: "ファルケティンド falketind ノローナ レインウェア ゴアテックス" },
  { name: "falketind Flex1 Jacket", brand: "Norrøna", category_id: "clothing", weight_g: 280, search: "ファルケティンド フレックス1 ノローナ ソフトシェル ストレッチ" },

  // 手袋・グローブ
  { name: "OutDry トレイルグローブ", brand: "mont-bell", category_id: "clothing", weight_g: 85, search: "アウトドライ outdry モンベル グローブ 手袋 防水" },
  { name: "ウインドストップ グローブ", brand: "mont-bell", category_id: "clothing", weight_g: 60, search: "ウインドストップ モンベル グローブ 手袋 防風" },
  { name: "ライトウェイト ウールグローブ", brand: "Black Diamond", category_id: "clothing", weight_g: 50, search: "ライトウェイト ウール ブラックダイヤモンド グローブ 手袋 メリノ" },
  { name: "ソロイスト フィンガーグローブ", brand: "Black Diamond", category_id: "clothing", weight_g: 95, search: "ソロイスト soloist ブラックダイヤモンド グローブ 手袋 冬山" },
  { name: "ヘリウム レイングローブ", brand: "OUTDOOR RESEARCH", category_id: "clothing", weight_g: 80, search: "ヘリウム helium アウトドアリサーチ グローブ 手袋 防水 軽量" },
  { name: "フィアット ライナーグローブ", brand: "OUTDOOR RESEARCH", category_id: "clothing", weight_g: 45, search: "フィアット fiat アウトドアリサーチ グローブ インナー 手袋" },

  // ゲイター
  { name: "クロコダイル ゲイター", brand: "OUTDOOR RESEARCH", category_id: "clothing", weight_g: 230, search: "クロコダイル crocodile アウトドアリサーチ ゲイター スパッツ 防水" },
  { name: "ハイキング ゲイター ショート", brand: "mont-bell", category_id: "clothing", weight_g: 70, search: "ハイキング ゲイター ショート モンベル スパッツ" },
  { name: "ハイキング ゲイター ロング", brand: "mont-bell", category_id: "clothing", weight_g: 130, search: "ハイキング ゲイター ロング モンベル スパッツ 防水" },

  // 帽子
  { name: "サンブロッカー ストローハット", brand: "mont-bell", category_id: "clothing", weight_g: 70, search: "サンブロッカー ストロー モンベル 帽子 ハット UVカット" },
  { name: "コアスパン フレックスフィット ハット", brand: "THE NORTH FACE", category_id: "clothing", weight_g: 85, search: "コアスパン ノースフェイス ハット 帽子 キャップ" },
  { name: "ゴアテックス アルパインハット", brand: "THE NORTH FACE", category_id: "clothing", weight_g: 85, search: "ゴアテックス アルパインハット ノースフェイス 帽子 防水" },
  { name: "Adventure Hat", brand: "Sunday Afternoons", category_id: "clothing", weight_g: 100, search: "アドベンチャーハット サンデーアフタヌーン 帽子 UVカット 撥水" },
  { name: "Ultra Adventure Hat", brand: "Sunday Afternoons", category_id: "clothing", weight_g: 85, search: "ウルトラアドベンチャーハット サンデーアフタヌーン 帽子 UVカット 軽量" },

  // ソックス
  { name: "マウンテニアリング ブーツ ミッドウェイト クルー", brand: "Darn Tough", category_id: "clothing", weight_g: 90, search: "ダーンタフ darn tough ソックス 靴下 メリノウール 登山 丈夫" },
  { name: "ハイカー ブーツ ミッドウェイト クッション", brand: "Darn Tough", category_id: "clothing", weight_g: 78, search: "ダーンタフ darn tough ソックス 靴下 ハイカー メリノウール" },
  { name: "PhD アウトドア ライト ハイキング クルー", brand: "SmartWool", category_id: "clothing", weight_g: 70, search: "スマートウール smartwool PhD ソックス 靴下 ハイキング メリノウール" },
  { name: "クラシック ハイク フルクッション クルー", brand: "SmartWool", category_id: "clothing", weight_g: 90, search: "スマートウール smartwool クラシック ハイク ソックス 靴下 クッション" },
  { name: "メリノウール ハイキングソックス", brand: "mont-bell", category_id: "clothing", weight_g: 75, search: "メリノウール ソックス 靴下 モンベル ハイキング" },
  { name: "トレッキングソックス パイル", brand: "mont-bell", category_id: "clothing", weight_g: 85, search: "トレッキングソックス パイル モンベル 靴下 クッション" },

  // ウインドシェル
  { name: "EXライトウインドパーカ", brand: "mont-bell", category_id: "clothing", weight_g: 56, search: "EXライトウインドパーカ exlight wind モンベル ウインドシェル 超軽量" },
  { name: "スワローテイルフーディ", brand: "THE NORTH FACE", category_id: "clothing", weight_g: 150, search: "スワローテイル swallowtail ノースフェイス ウインドシェル フーディ" },
  { name: "スワローテイルベントフーディ", brand: "THE NORTH FACE", category_id: "clothing", weight_g: 165, search: "スワローテイルベント swallowtail vent ノースフェイス ウインドシェル 通気性" },
  { name: "Vital Windshell Hoody", brand: "Rab", category_id: "clothing", weight_g: 110, search: "バイタル ウインドシェル vital windshell ラブ Rab フーディ 軽量" },
  { name: "Cierzo Lite 2.5 Jacket", brand: "Rab", category_id: "clothing", weight_g: 76, search: "シエルゾ cierzo ラブ Rab ウインドシェル UL 超軽量" },
  { name: "Airshed Pro Pullover", brand: "patagonia", category_id: "clothing", weight_g: 113, search: "エアシェッド airshed プルオーバー パタゴニア ウインドシェル 通気性" },
  { name: "L.I.M Shield Comp Hood", brand: "Haglöfs", category_id: "clothing", weight_g: 135, search: "LIM シールド ホグロフス ウインドシェル フーディ 軽量" },

  // ソフトシェル
  { name: "Gamma LT Hoody", brand: "Arc'teryx", category_id: "clothing", weight_g: 380, search: "ガンマ gamma LT アークテリクス ソフトシェル ストレッチ フーディ" },
  { name: "Gamma MX Hoody", brand: "Arc'teryx", category_id: "clothing", weight_g: 480, search: "ガンマ gamma MX アークテリクス ソフトシェル ストレッチ 防風 裏起毛" },
  { name: "クラッグジャケット", brand: "mont-bell", category_id: "clothing", weight_g: 340, search: "クラッグ crag モンベル ソフトシェル ストレッチ 行動着" },
  { name: "クラッグパンツ", brand: "mont-bell", category_id: "clothing", weight_g: 295, search: "クラッグ crag モンベル ソフトシェル パンツ ストレッチ" },
  { name: "Madris Light ML Jacket", brand: "MAMMUT", category_id: "clothing", weight_g: 290, search: "マドリス madris ライト マムート ソフトシェル ミッドレイヤー 軽量" },
  { name: "Ultimate VII SO Hooded Jacket", brand: "MAMMUT", category_id: "clothing", weight_g: 480, search: "アルティメット ultimate マムート ソフトシェル フーディ 防風" },
  { name: "K ライトグリッドジャケット", brand: "Millet", category_id: "clothing", weight_g: 310, search: "K ライトグリッド lightgrid ミレー ソフトシェル 行動着 通気性" },
  { name: "ニュウモラップ フーディ", brand: "finetrack", category_id: "clothing", weight_g: 250, search: "ニュウモラップ newmorap ファイントラック ソフトシェル 通気性 行動着" },
  { name: "ドラウトソル ジャケット", brand: "finetrack", category_id: "clothing", weight_g: 235, search: "ドラウトソル draut sol ファイントラック ソフトシェル 行動着 速乾" },

  // フリース追加
  { name: "クリマプラス200 ジャケット", brand: "mont-bell", category_id: "clothing", weight_g: 370, search: "クリマプラス200 climaplus モンベル フリース 中厚手 保温" },
  { name: "シャミース ジャケット", brand: "mont-bell", category_id: "clothing", weight_g: 215, search: "シャミース chameece モンベル フリース 薄手 軽量" },
  { name: "バーサマイクロジャケット", brand: "THE NORTH FACE", category_id: "clothing", weight_g: 225, search: "バーサマイクロ versamicro ノースフェイス フリース 軽量 中間着" },
  { name: "デナリジャケット", brand: "THE NORTH FACE", category_id: "clothing", weight_g: 880, search: "デナリ denali ノースフェイス フリース 厚手 保温" },
  { name: "ベターセーター ジャケット", brand: "patagonia", category_id: "clothing", weight_g: 680, search: "ベターセーター bettersweater パタゴニア フリース ニット調" },
  { name: "R1 デイリー ジャケット", brand: "patagonia", category_id: "clothing", weight_g: 315, search: "R1 デイリー パタゴニア フリース グリッド 行動着" },
  { name: "Kyanite AR Jacket", brand: "Arc'teryx", category_id: "clothing", weight_g: 345, search: "カイヤナイト kyanite AR アークテリクス フリース ストレッチ" },
  { name: "Aconcagua ML Jacket", brand: "MAMMUT", category_id: "clothing", weight_g: 340, search: "アコンカグア aconcagua マムート フリース 中間着 保温" },
  { name: "Innominata Pro ML Jacket", brand: "MAMMUT", category_id: "clothing", weight_g: 410, search: "イノミナータ innominata プロ マムート フリース ハイロフト 保温 冬" },
  { name: "Kinetic 2.0 Fleece Jacket", brand: "Rab", category_id: "clothing", weight_g: 310, search: "キネティック kinetic ラブ Rab フリース ストレッチ 行動着" },

  // メリノウール系ベースレイヤー
  { name: "200 Oasis LS Crewe", brand: "Icebreaker", category_id: "clothing", weight_g: 200, search: "200 オアシス oasis アイスブレーカー icebreaker メリノウール ベースレイヤー 中厚手" },
  { name: "260 Tech LS Crewe", brand: "Icebreaker", category_id: "clothing", weight_g: 260, search: "260 テック tech アイスブレーカー icebreaker メリノウール ベースレイヤー 厚手 冬" },
  { name: "150 Zone LS Crewe", brand: "Icebreaker", category_id: "clothing", weight_g: 165, search: "150 ゾーン zone アイスブレーカー icebreaker メリノウール ベースレイヤー 薄手 行動着" },
  { name: "Merino 250 Base Layer Crew", brand: "SmartWool", category_id: "clothing", weight_g: 230, search: "メリノ250 merino スマートウール smartwool ベースレイヤー ウール 厚手" },
  { name: "Classic Thermal Merino Base Layer Crew", brand: "SmartWool", category_id: "clothing", weight_g: 210, search: "クラシックサーマル メリノ thermal スマートウール smartwool ベースレイヤー ウール" },
  { name: "スーパーメリノウール EXP. ラウンドネックシャツ", brand: "mont-bell", category_id: "clothing", weight_g: 245, search: "スーパーメリノウール merino EXP モンベル ベースレイヤー ウール 厚手 冬" },
  { name: "スーパーメリノウール L.W. ラウンドネックシャツ", brand: "mont-bell", category_id: "clothing", weight_g: 140, search: "スーパーメリノウール merino LW モンベル ベースレイヤー ウール 薄手" },

  // 行動着（速乾Tシャツ・シャツ）
  { name: "WIC.T ハーフスリーブ", brand: "mont-bell", category_id: "clothing", weight_g: 95, search: "ウイックロン WIC.T モンベル 速乾 Tシャツ 行動着 半袖" },
  { name: "WIC.ロングスリーブ", brand: "mont-bell", category_id: "clothing", weight_g: 125, search: "ウイックロン WIC モンベル 速乾 ロングスリーブ 長袖 行動着" },
  { name: "クールライトシャツ", brand: "mont-bell", category_id: "clothing", weight_g: 140, search: "クールライト coollight モンベル シャツ 速乾 UVカット 行動着" },
  { name: "フラッシュドライ3Dクルー", brand: "THE NORTH FACE", category_id: "clothing", weight_g: 120, search: "フラッシュドライ flashdry 3D ノースフェイス 速乾 Tシャツ 行動着" },
  { name: "ショートスリーブフラッシュドライメリノクルー", brand: "THE NORTH FACE", category_id: "clothing", weight_g: 130, search: "フラッシュドライメリノ flashdry merino ノースフェイス 速乾 メリノ 半袖 行動着" },
  { name: "キャプリーン クール ライトウェイト シャツ", brand: "patagonia", category_id: "clothing", weight_g: 96, search: "キャプリーン capilene クール ライトウェイト パタゴニア 速乾 行動着 UL" },
  { name: "キャプリーン クール トレイル シャツ", brand: "patagonia", category_id: "clothing", weight_g: 135, search: "キャプリーン capilene クール トレイル パタゴニア 速乾 行動着 メリノ混" },
  { name: "Pulse SS Tee", brand: "Rab", category_id: "clothing", weight_g: 100, search: "パルス pulse ラブ Rab 速乾 Tシャツ 行動着 軽量" },
  { name: "Drynamic Mesh NS Crew", brand: "Millet", category_id: "clothing", weight_g: 55, search: "ドライナミック メッシュ drynamic ミレー アンダーウェア メッシュ 汗冷え防止" },

  // タイツ・パンツ
  { name: "リッジラインパンツ", brand: "mont-bell", category_id: "clothing", weight_g: 345, search: "リッジライン ridgeline モンベル パンツ トレッキング ストレッチ" },
  { name: "ストレッチライトパンツ", brand: "mont-bell", category_id: "clothing", weight_g: 260, search: "ストレッチライト stretchlight モンベル パンツ 軽量 行動着" },
  { name: "サウスフィールドパンツ", brand: "mont-bell", category_id: "clothing", weight_g: 285, search: "サウスフィールド southfield モンベル パンツ トレッキング" },
  { name: "アルパインライトパンツ", brand: "THE NORTH FACE", category_id: "clothing", weight_g: 340, search: "アルパインライト alpinelight ノースフェイス パンツ トレッキング ストレッチ" },
  { name: "バーブライトスリムパンツ", brand: "THE NORTH FACE", category_id: "clothing", weight_g: 290, search: "バーブライトスリム verblightslim ノースフェイス パンツ 軽量 細身" },
  { name: "Gamma LT Pant", brand: "Arc'teryx", category_id: "clothing", weight_g: 355, search: "ガンマ gamma LT パンツ アークテリクス ソフトシェル ストレッチ" },
  { name: "Lefroy Pant", brand: "Arc'teryx", category_id: "clothing", weight_g: 280, search: "レフロイ lefroy パンツ アークテリクス トレッキング 軽量 ストレッチ" },
  { name: "ティフォンストレッチパンツ", brand: "Millet", category_id: "clothing", weight_g: 350, search: "ティフォン tiphon ストレッチ ミレー パンツ トレッキング 防水" },
  { name: "Trekkers 3.0 Pants", brand: "MAMMUT", category_id: "clothing", weight_g: 310, search: "トレッカーズ trekkers マムート パンツ トレッキング ストレッチ" },
  { name: "カミノパンツ", brand: "finetrack", category_id: "clothing", weight_g: 280, search: "カミノ camino ファイントラック パンツ ストレッチ 行動着 速乾" },
  { name: "ジオラインL.W. タイツ", brand: "mont-bell", category_id: "clothing", weight_g: 100, search: "ジオライン geoline LW タイツ モンベル ベースレイヤー 下半身 薄手" },
  { name: "ジオラインM.W. タイツ", brand: "mont-bell", category_id: "clothing", weight_g: 135, search: "ジオライン geoline MW タイツ モンベル ベースレイヤー 下半身 中厚手" },

  // 防寒着追加（ダウン・化繊インサレーション）
  { name: "オーロラライト ダウンジャケット", brand: "NANGA", category_id: "clothing", weight_g: 325, search: "オーロラライト auroralight ナンガ NANGA ダウン ジャケット 防寒 国産" },
  { name: "スーパーライトダウンジャケット", brand: "NANGA", category_id: "clothing", weight_g: 185, search: "スーパーライトダウン ナンガ NANGA ダウン 軽量 コンパクト" },
  { name: "ダウンインナージャケット", brand: "NANGA", category_id: "clothing", weight_g: 150, search: "ダウンインナー ナンガ NANGA ダウン 中間着 薄手 軽量" },
  { name: "Broad Peak IN Hooded Jacket", brand: "MAMMUT", category_id: "clothing", weight_g: 400, search: "ブロードピーク broadpeak マムート ダウン インサレーション フーディ 保温" },
  { name: "Convey IN Hooded Jacket", brand: "MAMMUT", category_id: "clothing", weight_g: 340, search: "コンベイ convey マムート ダウン インサレーション フーディ 軽量" },
  { name: "Microlight Alpine Jacket", brand: "Rab", category_id: "clothing", weight_g: 375, search: "マイクロライト microlight アルパイン ラブ Rab ダウン ジャケット 保温" },
  { name: "Mythic Alpine Jacket", brand: "Rab", category_id: "clothing", weight_g: 330, search: "ミシック mythic アルパイン ラブ Rab ダウン 軽量 850FP" },
  { name: "ポリゴンアクト フーディ", brand: "finetrack", category_id: "clothing", weight_g: 270, search: "ポリゴンアクト polygonact フーディ ファイントラック 化繊 インサレーション 行動着 濡れ" },
  { name: "ゴーストウィスパラー/2 ジャケット", brand: "MOUNTAIN HARDWEAR", category_id: "clothing", weight_g: 195, search: "ゴーストウィスパラー2 ghostwhisperer マウンテンハードウェア ダウン UL 超軽量" },
  { name: "サーモボール エコ フーディ", brand: "THE NORTH FACE", category_id: "clothing", weight_g: 340, search: "サーモボール thermoball エコ ノースフェイス 化繊 インサレーション 濡れ 保温" },

  // レインウェア追加
  { name: "エバーブレス レグン ジャケット", brand: "finetrack", category_id: "clothing", weight_g: 290, search: "エバーブレス レグン everbreathe regn ファイントラック レインウェア 防水 透湿" },
  { name: "エバーブレス レグン パンツ", brand: "finetrack", category_id: "clothing", weight_g: 210, search: "エバーブレス レグン everbreathe regn ファイントラック レインパンツ 防水" },
  { name: "ティフォン50000ウォーム ストレッチ ジャケット", brand: "Millet", category_id: "clothing", weight_g: 430, search: "ティフォン tiphon 50000 ウォーム ミレー レインウェア 裏起毛 保温" },
  { name: "Kento HS Hooded Jacket", brand: "MAMMUT", category_id: "clothing", weight_g: 370, search: "ケント kento HS マムート レインウェア ハードシェル ゴアテックス" },
  { name: "Downpour Plus 2.0 Jacket", brand: "Rab", category_id: "clothing", weight_g: 310, search: "ダウンポアプラス downpour ラブ Rab レインウェア 防水" },
  { name: "Meridian Jacket", brand: "Rab", category_id: "clothing", weight_g: 390, search: "メリディアン meridian ラブ Rab レインウェア ゴアテックス 防水" },

  // アンダーウェア・ドライレイヤー
  { name: "ドライレイヤー ウォーム", brand: "finetrack", category_id: "clothing", weight_g: 65, search: "ドライレイヤー ウォーム drylayer warm ファイントラック アンダーウェア 保温 汗冷え防止" },
  { name: "ドライレイヤー クール", brand: "finetrack", category_id: "clothing", weight_g: 40, search: "ドライレイヤー クール drylayer cool ファイントラック アンダーウェア メッシュ 夏 汗冷え" },
  { name: "ドライナミックメッシュ ショートスリーブ", brand: "Millet", category_id: "clothing", weight_g: 50, search: "ドライナミック drynamic ミレー メッシュ アンダーウェア 半袖 汗冷え防止" },
  { name: "ドライナミックメッシュ 3/4 スリーブ", brand: "Millet", category_id: "clothing", weight_g: 60, search: "ドライナミック drynamic ミレー メッシュ アンダーウェア 七分袖 汗冷え防止" },
  { name: "ジオライン クールメッシュ ラウンドネックシャツ", brand: "mont-bell", category_id: "clothing", weight_g: 55, search: "ジオライン クールメッシュ coolmesh モンベル アンダーウェア 夏 通気性" },
  { name: "スキンメッシュ ロングスリーブ", brand: "mont-bell", category_id: "clothing", weight_g: 60, search: "スキンメッシュ skinmesh モンベル アンダーウェア メッシュ 汗冷え防止" },
  // mont-bell 追加
  { name: "ウイックロン ZEO ロングスリーブT", brand: "mont-bell", category_id: "clothing", weight_g: 155, search: "ウイックロン ゼオ wickron ZEO モンベル 速乾 長袖 行動着 ストレッチ" },
  { name: "ライトシェルジャケット", brand: "mont-bell", category_id: "clothing", weight_g: 295, search: "ライトシェル lightshell モンベル ソフトシェル 防風 ストレッチ 行動着" },
  { name: "ライトシェルパーカ", brand: "mont-bell", category_id: "clothing", weight_g: 320, search: "ライトシェルパーカ lightshell parka モンベル ソフトシェル 防風 フード" },
  { name: "トレールアクションジャケット", brand: "mont-bell", category_id: "clothing", weight_g: 340, search: "トレールアクション trailaction モンベル フリース ストレッチ 行動着 保温" },
  { name: "U.L.ダウンインナージャケット", brand: "mont-bell", category_id: "clothing", weight_g: 110, search: "ULダウンインナー UL down inner モンベル ダウン 超軽量 中間着 コンパクト" },
  { name: "スペリオダウン パーカ", brand: "mont-bell", category_id: "clothing", weight_g: 230, search: "スペリオダウン パーカ superior down parka モンベル ダウン フード 中間着" },
  { name: "ストレッチ O.D.パンツ", brand: "mont-bell", category_id: "clothing", weight_g: 310, search: "ストレッチOD stretch OD モンベル パンツ トレッキング ストレッチ" },
  { name: "リッジラインパンツ Women's", brand: "mont-bell", category_id: "clothing", weight_g: 315, search: "リッジライン ridgeline ウィメンズ モンベル パンツ レディース トレッキング" },
  { name: "マルチフォールディングタオル", brand: "mont-bell", category_id: "clothing", weight_g: 30, search: "マルチフォールディングタオル multi folding towel モンベル タオル 速乾 軽量" },
  // THE NORTH FACE 追加
  { name: "マウンテンライトジャケット", brand: "THE NORTH FACE", category_id: "clothing", weight_g: 381, search: "マウンテンライト mountainlight ノースフェイス ゴアテックス シェル 定番" },
  { name: "オールマウンテンジャケット", brand: "THE NORTH FACE", category_id: "clothing", weight_g: 310, search: "オールマウンテン allmountain ノースフェイス ゴアテックス ハードシェル 軽量" },
  { name: "バーブパンツ", brand: "THE NORTH FACE", category_id: "clothing", weight_g: 330, search: "バーブパンツ verb pants ノースフェイス パンツ トレッキング ストレッチ 定番" },
  { name: "ドットショットジャケット", brand: "THE NORTH FACE", category_id: "clothing", weight_g: 375, search: "ドットショット dotshot ノースフェイス レインウェア ハイベント 防水 定番" },
  { name: "コンパクトジャケット", brand: "THE NORTH FACE", category_id: "clothing", weight_g: 240, search: "コンパクトジャケット compact ノースフェイス レインウェア 軽量 パッカブル" },
  { name: "エクスプローラーパーセルコート", brand: "THE NORTH FACE", category_id: "clothing", weight_g: 450, search: "エクスプローラーパーセル explorer parcel coat ノースフェイス コート ゴアテックス 防水" },
  { name: "フレキシブルアンクルパンツ", brand: "THE NORTH FACE", category_id: "clothing", weight_g: 285, search: "フレキシブルアンクル flexible ankle ノースフェイス パンツ ストレッチ 9分丈 行動着" },
  // Arc'teryx 追加
  { name: "Covert Cardigan", brand: "Arc'teryx", category_id: "clothing", weight_g: 365, search: "コバート covert カーディガン アークテリクス フリース ニット調 中間着" },
  { name: "Kyanite AR Hoody", brand: "Arc'teryx", category_id: "clothing", weight_g: 380, search: "カイヤナイト kyanite AR フーディ アークテリクス フリース ストレッチ フード" },
  { name: "Gamma AR Pant", brand: "Arc'teryx", category_id: "clothing", weight_g: 435, search: "ガンマ gamma AR パンツ アークテリクス ソフトシェル 厚手 防風 冬" },
  { name: "Konseal Pant", brand: "Arc'teryx", category_id: "clothing", weight_g: 310, search: "コンシール konseal パンツ アークテリクス クライミング ストレッチ 軽量" },
  // MAMMUT 追加
  { name: "Nordwand Advanced HS Hooded Jacket", brand: "MAMMUT", category_id: "clothing", weight_g: 490, search: "ノルドワンド nordwand アドバンスド マムート ハードシェル ゴアテックス アルパイン" },
  { name: "Ayako Pro HS Hooded Jacket", brand: "MAMMUT", category_id: "clothing", weight_g: 395, search: "アヤコ ayako プロ マムート ハードシェル ゴアテックス レインウェア" },
  { name: "Rime Light IN Flex Hooded Jacket", brand: "MAMMUT", category_id: "clothing", weight_g: 340, search: "ライム rime ライト フレックス マムート 化繊 インサレーション 軽量 行動着" },
  { name: "Eisfeld Light SO Pants", brand: "MAMMUT", category_id: "clothing", weight_g: 380, search: "アイスフェルド eisfeld ライト マムート ソフトシェル パンツ アルパイン 冬" },
  // patagonia 追加
  { name: "ナノエア フーディ", brand: "patagonia", category_id: "clothing", weight_g: 312, search: "ナノエア nanoair パタゴニア 化繊 インサレーション 行動着 通気性 フーディ" },
  { name: "フーディニ エア ジャケット", brand: "patagonia", category_id: "clothing", weight_g: 130, search: "フーディニ エア houdini air パタゴニア ウインドシェル 通気性 ランニング" },
  { name: "ベターセーター ジャケット Women's", brand: "patagonia", category_id: "clothing", weight_g: 395, search: "ベターセーター bettersweater ウィメンズ パタゴニア フリース ニット調 レディース" },
  { name: "アルトヴィア トレイルパンツ", brand: "patagonia", category_id: "clothing", weight_g: 280, search: "アルトヴィア altvia トレイル パタゴニア パンツ トレッキング ストレッチ 軽量" },
  // Rab 追加
  { name: "Kinetic Alpine 2.0 Jacket", brand: "Rab", category_id: "clothing", weight_g: 350, search: "キネティック kinetic アルパイン ラブ Rab プロフレックス 防水 ストレッチ" },
  { name: "Xenair Alpine Jacket", brand: "Rab", category_id: "clothing", weight_g: 370, search: "ゼンエアー xenair アルパイン ラブ Rab 化繊 インサレーション 行動着 通気性" },
  { name: "Phantom Pull-On", brand: "Rab", category_id: "clothing", weight_g: 310, search: "ファントム phantom プルオン ラブ Rab ダウン プルオーバー 超軽量 保温" },
  { name: "Torque Pants", brand: "Rab", category_id: "clothing", weight_g: 395, search: "トルク torque パンツ ラブ Rab ソフトシェル ストレッチ クライミング" },
  // HOUDINI
  { name: "Power Houdi", brand: "HOUDINI", category_id: "clothing", weight_g: 340, search: "パワーフーディ power houdi フーディニ ポーラテック フリース 行動着 保温" },
  { name: "Pace Wind Jacket", brand: "HOUDINI", category_id: "clothing", weight_g: 85, search: "ペースウインド pace wind フーディニ ウインドシェル UL 超軽量 パッカブル" },
  { name: "MTM Thrill Twill Pants", brand: "HOUDINI", category_id: "clothing", weight_g: 295, search: "MTM スリルツイル thrill twill フーディニ パンツ ストレッチ サステナブル" },
  // Teton Bros
  { name: "Breath Jacket", brand: "Teton Bros", category_id: "clothing", weight_g: 270, search: "ブレスジャケット breath ティートンブロス レインウェア 防水 透湿 ポーラテック" },
  { name: "Tsurugi Jacket", brand: "Teton Bros", category_id: "clothing", weight_g: 340, search: "ツルギジャケット tsurugi ティートンブロス ハードシェル 防水 アルパイン" },
  { name: "Crag Pant", brand: "Teton Bros", category_id: "clothing", weight_g: 285, search: "クラッグパンツ crag pant ティートンブロス パンツ クライミング ストレッチ" },
  { name: "Wind River Hoody", brand: "Teton Bros", category_id: "clothing", weight_g: 195, search: "ウインドリバーフーディ wind river hoody ティートンブロス ウインドシェル 行動着 通気性" },
  // finetrack 追加
  { name: "ストームゴージュ アルパインパンツ", brand: "finetrack", category_id: "clothing", weight_g: 220, search: "ストームゴージュ stormgorge アルパイン ファイントラック レインパンツ 防水 軽量" },
  { name: "ポリゴン2ULジャケット", brand: "finetrack", category_id: "clothing", weight_g: 140, search: "ポリゴン2UL polygon2UL ファイントラック 化繊 インサレーション UL 超軽量 コンパクト" },
  { name: "フロウラップ フーディ", brand: "finetrack", category_id: "clothing", weight_g: 220, search: "フロウラップ flowwrap ファイントラック ソフトシェル 行動着 通気性 防風" },
  // AXESQUIN (アクシーズクイン)
  { name: "ヨヒヤミ", brand: "AXESQUIN", category_id: "clothing", weight_g: 185, search: "ヨヒヤミ yohiyami アクシーズクイン ウインドシェル 和 UL 軽量 凌 しのぎ" },
  { name: "アメノヒ 2.5", brand: "AXESQUIN", category_id: "clothing", weight_g: 220, search: "アメノヒ amenohi 2.5 アクシーズクイン レインウェア 防水 和 凌" },
  { name: "クナイ", brand: "AXESQUIN", category_id: "clothing", weight_g: 160, search: "クナイ kunai アクシーズクイン パンツ 行動着 和 凌 ストレッチ" },
  { name: "ウキグモ", brand: "AXESQUIN", category_id: "clothing", weight_g: 95, search: "ウキグモ ukigumo アクシーズクイン 化繊 インサレーション UL 超軽量 凌" },
  // 山と道
  { name: "UL Shirt", brand: "山と道", category_id: "clothing", weight_g: 110, search: "ULシャツ UL shirt 山と道 yamatomichi メリノ 行動着 UL 軽量" },
  { name: "5-Pocket Shorts", brand: "山と道", category_id: "clothing", weight_g: 175, search: "5ポケットショーツ 5-pocket shorts 山と道 yamatomichi ハイキング UL ショートパンツ" },
  { name: "Light Alpha Vest", brand: "山と道", category_id: "clothing", weight_g: 95, search: "ライトアルファベスト light alpha vest 山と道 yamatomichi 化繊 保温 UL 超軽量" },
  { name: "Merino Shirt", brand: "山と道", category_id: "clothing", weight_g: 145, search: "メリノシャツ merino shirt 山と道 yamatomichi メリノウール ベースレイヤー 行動着" },
  // Millet 追加
  { name: "K シールドフーディー", brand: "Millet", category_id: "clothing", weight_g: 350, search: "K シールドフーディー shield hoodie ミレー ソフトシェル 防風 行動着 フード" },
  { name: "モンテローザパンツ", brand: "Millet", category_id: "clothing", weight_g: 320, search: "モンテローザ monte rosa ミレー パンツ トレッキング ストレッチ" },
  // Columbia 追加
  { name: "セイバーV ジャケット", brand: "Columbia", category_id: "clothing", weight_g: 345, search: "セイバー saber V コロンビア レインウェア オムニテック 防水 トレッキング" },
  { name: "ヘイゼンジャケット", brand: "Columbia", category_id: "clothing", weight_g: 285, search: "ヘイゼン hazen コロンビア ウインドシェル 撥水 軽量 パッカブル" },
  // バラクラバ・ネックウォーマー
  { name: "ジオラインバラクラバ", brand: "mont-bell", category_id: "clothing", weight_g: 32, search: "ジオラインバラクラバ balaclava モンベル 目出し帽 防寒 冬山 雪山" },
  { name: "マイクロフリースバラクラバ", brand: "THE NORTH FACE", category_id: "clothing", weight_g: 45, search: "マイクロフリースバラクラバ microfleece balaclava ノースフェイス 目出し帽 防寒 冬" },
  { name: "オリジナル ネックウェア", brand: "BUFF", category_id: "clothing", weight_g: 36, search: "バフ BUFF オリジナル ネックウォーマー ネックゲイター 多機能 UVカット" },
  // サングラス
  { name: "Sutro", brand: "Oakley", category_id: "clothing", weight_g: 48, search: "サトロ sutro オークリー Oakley サングラス スポーツ プリズムレンズ UVカット" },
  { name: "Aerolite", brand: "Julbo", category_id: "clothing", weight_g: 32, search: "エアロライト aerolite ジュルボ Julbo サングラス 軽量 登山 トレイルラン" },
  { name: "Wildcat", brand: "Smith", category_id: "clothing", weight_g: 49, search: "ワイルドキャット wildcat スミス Smith サングラス クロマポップ スポーツ" },
  { name: "Airless Wave", brand: "SWANS", category_id: "clothing", weight_g: 18, search: "エアレスウェイブ airless wave スワンズ SWANS サングラス 超軽量 日本製 登山" },

  // ═══════════════════════════════════════════
  // 靴・足回り (footwear)
  // ═══════════════════════════════════════════
  { name: "ツオロミーブーツ ワイド", brand: "mont-bell", category_id: "footwear", weight_g: 1060, search: "ツオロミー tuolumne モンベル 登山靴 トレッキング" },
  { name: "タイオガブーツ ワイド", brand: "mont-bell", category_id: "footwear", weight_g: 990, search: "タイオガ tioga モンベル 登山靴 トレッキング" },
  { name: "Verto S6K Alpine GTX", brand: "THE NORTH FACE", category_id: "footwear", weight_g: 1360, search: "ヴェルト verto ノースフェイス アルパイン 登山靴" },
  { name: "X ULTRA 4 GTX", brand: "Salomon", category_id: "footwear", weight_g: 740, search: "X ULTRA サロモン ハイキング ゴアテックス" },
  { name: "Speedcross 6", brand: "Salomon", category_id: "footwear", weight_g: 600, search: "スピードクロス speedcross サロモン トレイルラン" },
  { name: "MOAB 3 MID GTX", brand: "Merrell", category_id: "footwear", weight_g: 880, search: "モアブ moab メレル ハイキング トレッキング ゴアテックス" },
  { name: "Kaha 2 GTX", brand: "HOKA", category_id: "footwear", weight_g: 880, search: "カハ kaha ホカ トレッキング ゴアテックス" },
  { name: "トレッキングポール アルミ", brand: "mont-bell", category_id: "footwear", weight_g: 460, search: "トレッキングポール ストック モンベル アルミ" },
  { name: "トレイル エルゴ コルクS", brand: "LEKI", category_id: "footwear", weight_g: 440, search: "トレイルエルゴ trail ergo レキ ポール ストック" },
  { name: "ディスタンスカーボンZ", brand: "Black Diamond", category_id: "footwear", weight_g: 310, search: "ディスタンスカーボン distance carbon ブラックダイヤモンド ポール 軽量" },
  { name: "マウンテンクルーザー600 ワイド", brand: "mont-bell", category_id: "footwear", weight_g: 1160, search: "マウンテンクルーザー600 mountaincruiser モンベル 登山靴 本格" },
  { name: "マウンテンクルーザー400 ワイド", brand: "mont-bell", category_id: "footwear", weight_g: 1020, search: "マウンテンクルーザー400 mountaincruiser モンベル 登山靴" },
  { name: "アルパインクルーザー 2000", brand: "mont-bell", category_id: "footwear", weight_g: 1560, search: "アルパインクルーザー2000 alpinecruiser モンベル 冬山 アルパイン" },
  { name: "アルパインクルーザー 2500", brand: "mont-bell", category_id: "footwear", weight_g: 1740, search: "アルパインクルーザー2500 alpinecruiser モンベル 冬山 厳冬期" },
  { name: "ラップランドブーツ ワイド", brand: "mont-bell", category_id: "footwear", weight_g: 860, search: "ラップランド lappland モンベル 登山靴 軽量 ハイキング" },
  { name: "Vectiv Fastpack Mid FUTURELIGHT", brand: "THE NORTH FACE", category_id: "footwear", weight_g: 680, search: "ベクティブ vectiv ファストパック ノースフェイス ハイキング 軽量" },
  { name: "Creston Mid GTX", brand: "THE NORTH FACE", category_id: "footwear", weight_g: 860, search: "クレストン creston ノースフェイス トレッキング ゴアテックス" },
  { name: "Acrux TR GTX", brand: "Arc'teryx", category_id: "footwear", weight_g: 900, search: "アクルックス acrux TR アークテリクス トレッキング ゴアテックス" },
  { name: "Aerios FL 2 MID GTX", brand: "Arc'teryx", category_id: "footwear", weight_g: 720, search: "エアリオス aerios アークテリクス ハイキング 軽量 ゴアテックス" },
  { name: "Ducan High GTX", brand: "MAMMUT", category_id: "footwear", weight_g: 940, search: "デュカン ducan マムート トレッキング ゴアテックス" },
  { name: "Kento Advanced High GTX", brand: "MAMMUT", category_id: "footwear", weight_g: 1300, search: "ケント kento マムート アルパイン 登山靴 ゴアテックス" },
  { name: "X ULTRA PIONEER MID GTX", brand: "Salomon", category_id: "footwear", weight_g: 800, search: "X ULTRA パイオニア pioneer サロモン トレッキング ゴアテックス" },
  { name: "Sense Ride 5", brand: "Salomon", category_id: "footwear", weight_g: 580, search: "センスライド sense ride サロモン トレイルラン" },
  { name: "MOAB 3 GTX", brand: "Merrell", category_id: "footwear", weight_g: 810, search: "モアブ moab メレル ローカット ハイキング ゴアテックス" },
  { name: "Mach 6", brand: "HOKA", category_id: "footwear", weight_g: 660, search: "マッハ mach ホカ トレイルラン 軽量" },
  { name: "Speedgoat 6", brand: "HOKA", category_id: "footwear", weight_g: 640, search: "スピードゴート speedgoat ホカ トレイルラン" },
  { name: "Lone Peak 8", brand: "Altra", category_id: "footwear", weight_g: 600, search: "ローンピーク lonepeak アルトラ トレイルラン ゼロドロップ" },
  { name: "Olympus 6", brand: "Altra", category_id: "footwear", weight_g: 700, search: "オリンパス olympus アルトラ トレイルラン クッション ゼロドロップ" },
  { name: "ラチェットコンパクト アイゼン", brand: "mont-bell", category_id: "footwear", weight_g: 560, search: "ラチェット アイゼン モンベル 軽アイゼン 10本爪" },
  { name: "チェーンスパイク", brand: "mont-bell", category_id: "footwear", weight_g: 340, search: "チェーンスパイク モンベル 軽アイゼン 残雪" },
  { name: "LXT", brand: "Grivel", category_id: "footwear", weight_g: 800, search: "LXT グリベル アイゼン 12本爪 冬山" },
  { name: "セミワンタッチアイゼン 10P", brand: "CAMP", category_id: "footwear", weight_g: 700, search: "カンプ CAMP アイゼン 10本爪" },

  // La Sportiva
  { name: "TX4 GTX", brand: "La Sportiva", category_id: "footwear", weight_g: 760, search: "TX4 ラスポルティバ アプローチシューズ ゴアテックス" },
  { name: "Trango Tower GTX", brand: "La Sportiva", category_id: "footwear", weight_g: 1360, search: "トランゴタワー trango tower ラスポルティバ 登山靴 アルパイン ゴアテックス" },

  // SCARPA
  { name: "Zodiac Plus GTX", brand: "SCARPA", category_id: "footwear", weight_g: 1280, search: "ゾディアック zodiac スカルパ 登山靴 アプローチ ゴアテックス" },
  { name: "Rush TRK GTX", brand: "SCARPA", category_id: "footwear", weight_g: 950, search: "ラッシュ rush スカルパ トレッキング ゴアテックス" },

  // LOWA
  { name: "Tibet GTX", brand: "LOWA", category_id: "footwear", weight_g: 1700, search: "チベット tibet ローバ 登山靴 冬山 ゴアテックス" },
  { name: "Renegade GTX Mid", brand: "LOWA", category_id: "footwear", weight_g: 970, search: "レネゲード renegade ローバ ハイキング トレッキング ゴアテックス" },

  // inov-8
  { name: "Roclite Pro G 400 GTX", brand: "inov-8", category_id: "footwear", weight_g: 640, search: "ロックライト roclite イノヴェイト トレイルラン ゴアテックス" },
  { name: "Roclite G 345 GTX", brand: "inov-8", category_id: "footwear", weight_g: 590, search: "ロックライト roclite 345 イノヴェイト トレイルラン ゴアテックス 軽量" },

  // ワカン・スノーシュー
  { name: "ワカン", brand: "mont-bell", category_id: "footwear", weight_g: 640, search: "ワカン モンベル 輪かん 雪山 深雪 アルミ" },
  { name: "MSR EVO Trail", brand: "MSR", category_id: "footwear", weight_g: 1770, search: "イーボトレイル evo trail MSR スノーシュー 雪山 ハイキング" },
  { name: "MSR Lightning Ascent", brand: "MSR", category_id: "footwear", weight_g: 1810, search: "ライトニングアセント lightning ascent MSR スノーシュー 急斜面 アルパイン" },
  { name: "FLEX NXT", brand: "TUBBS", category_id: "footwear", weight_g: 1860, search: "フレックス flex タブス TUBBS スノーシュー" },

  // サンダル
  { name: "UNEEK", brand: "KEEN", category_id: "footwear", weight_g: 420, search: "ユニーク uneek キーン サンダル アウトドア" },
  { name: "NEWPORT H2", brand: "KEEN", category_id: "footwear", weight_g: 510, search: "ニューポート newport キーン サンダル ウォーターシューズ" },
  { name: "Hurricane XLT2", brand: "Teva", category_id: "footwear", weight_g: 410, search: "ハリケーン hurricane テバ サンダル アウトドア" },
  { name: "Original Universal", brand: "Teva", category_id: "footwear", weight_g: 340, search: "オリジナルユニバーサル テバ サンダル 定番" },
  { name: "ロックオンサンダル", brand: "mont-bell", category_id: "footwear", weight_g: 330, search: "ロックオン モンベル サンダル キャンプ アウトドア" },
  { name: "フォルダブル サンダル", brand: "mont-bell", category_id: "footwear", weight_g: 220, search: "フォルダブル モンベル サンダル 折りたたみ 軽量 コンパクト" },

  // SIRIO
  { name: "P.F.46", brand: "SIRIO", category_id: "footwear", weight_g: 960, search: "P.F.46 PF46 シリオ 登山靴 トレッキング ワイド 幅広 日本製" },
  { name: "P.F.302", brand: "SIRIO", category_id: "footwear", weight_g: 1000, search: "P.F.302 PF302 シリオ 登山靴 トレッキング ミドルカット 日本製" },
  { name: "P.F.630", brand: "SIRIO", category_id: "footwear", weight_g: 1160, search: "P.F.630 PF630 シリオ 登山靴 本格 アルパイン 日本製" },

  // Zamberlan
  { name: "フジヤマ GT", brand: "Zamberlan", category_id: "footwear", weight_g: 1080, search: "フジヤマ fujiyama ザンバラン 登山靴 ゴアテックス 富士山" },
  { name: "トファーネ NW GTX", brand: "Zamberlan", category_id: "footwear", weight_g: 1160, search: "トファーネ tofane ザンバラン 登山靴 ゴアテックス トレッキング" },

  // GARMONT
  { name: "Tower Trek GTX", brand: "GARMONT", category_id: "footwear", weight_g: 920, search: "タワートレック tower trek ガルモント 登山靴 ゴアテックス トレッキング" },
  { name: "Vetta GTX", brand: "GARMONT", category_id: "footwear", weight_g: 1100, search: "ベッタ vetta ガルモント 登山靴 ゴアテックス アルパイン" },

  // Asolo
  { name: "Falcon GV", brand: "Asolo", category_id: "footwear", weight_g: 860, search: "ファルコン falcon アゾロ 登山靴 ゴアビブラム ハイキング" },
  { name: "Eldo Mid GV", brand: "Asolo", category_id: "footwear", weight_g: 800, search: "エルド eldo mid アゾロ 登山靴 ゴアビブラム ミドルカット" },

  // Danner
  { name: "トレイル2650 GTX", brand: "Danner", category_id: "footwear", weight_g: 680, search: "トレイル2650 trail 2650 ダナー 登山靴 ゴアテックス 軽量 ハイキング" },

  // New Balance
  { name: "Fresh Foam Hierro v8", brand: "New Balance", category_id: "footwear", weight_g: 590, search: "フレッシュフォーム hierro ヒエロ ニューバランス トレイルラン" },

  // BROOKS
  { name: "Cascadia 17", brand: "BROOKS", category_id: "footwear", weight_g: 610, search: "カスケディア cascadia ブルックス トレイルラン 定番" },
  { name: "Caldera 7", brand: "BROOKS", category_id: "footwear", weight_g: 650, search: "カルデラ caldera ブルックス トレイルラン マキシマリスト クッション" },

  // On
  { name: "Cloudventure", brand: "On", category_id: "footwear", weight_g: 570, search: "クラウドベンチャー cloudventure オン トレイルラン" },
  { name: "Cloudultra 2", brand: "On", category_id: "footwear", weight_g: 590, search: "クラウドウルトラ cloudultra オン トレイルラン ロング" },

  // Topo Athletic
  { name: "Ultraventure 3", brand: "Topo Athletic", category_id: "footwear", weight_g: 580, search: "ウルトラベンチャー ultraventure トポアスレティック トレイルラン ワイドトゥ" },
  { name: "MTN Racer 3", brand: "Topo Athletic", category_id: "footwear", weight_g: 520, search: "MTNレーサー mtn racer トポアスレティック トレイルラン 軽量 スピード" },

  // Nike
  { name: "Pegasus Trail 5", brand: "Nike", category_id: "footwear", weight_g: 610, search: "ペガサストレイル pegasus trail ナイキ トレイルラン" },
  { name: "Zegama 2", brand: "Nike", category_id: "footwear", weight_g: 620, search: "ゼガマ zegama ナイキ トレイルラン マラソン ZoomX" },

  // Tecnica
  { name: "Forge GTX", brand: "Tecnica", category_id: "footwear", weight_g: 860, search: "フォージ forge テクニカ 登山靴 ゴアテックス トレッキング" },

  // AKU
  { name: "Hayatsuki GTX", brand: "AKU", category_id: "footwear", weight_g: 920, search: "ハヤツキ hayatsuki アク 登山靴 ゴアテックス 日本向け" },

  // KEEN
  { name: "Targhee III Mid WP", brand: "KEEN", category_id: "footwear", weight_g: 850, search: "ターギー targhee キーン 登山靴 防水 トレッキング ミドルカット" },
  { name: "Pyrenees", brand: "KEEN", category_id: "footwear", weight_g: 1000, search: "ピレニーズ pyrenees キーン 登山靴 本格 縦走" },

  // Vasque
  { name: "Breeze LT NTX", brand: "Vasque", category_id: "footwear", weight_g: 790, search: "ブリーズ breeze LT NTX バスク 登山靴 防水 軽量 ハイキング" },

  // mont-bell追加
  { name: "マリポサトレール", brand: "mont-bell", category_id: "footwear", weight_g: 510, search: "マリポサトレール mariposa trail モンベル トレイルラン ハイキング 軽量" },
  { name: "パームランドサンダル", brand: "mont-bell", category_id: "footwear", weight_g: 270, search: "パームランド palmland モンベル サンダル 幅広 アウトドア" },
  { name: "ロックオンシューズ", brand: "mont-bell", category_id: "footwear", weight_g: 490, search: "ロックオンシューズ lock on モンベル アクアシューズ 沢登り 水辺" },

  // インソール
  { name: "Superfeet GREEN", brand: "Superfeet", category_id: "footwear", weight_g: 90, search: "スーパーフィート グリーン green インソール 中敷き 登山 アーチサポート" },
  { name: "3D+ アクティブ", brand: "SIDAS", category_id: "footwear", weight_g: 80, search: "シダス sidas 3D アクティブ インソール 中敷き 登山 トレッキング" },

  // ゲイター追加
  { name: "Trail Gaiters Low", brand: "Salomon", category_id: "footwear", weight_g: 40, search: "トレイルゲイター trail gaiters サロモン ゲイター スパッツ ショート トレイルラン" },
  { name: "Wrapid Gaiters", brand: "DIRTY GIRL", category_id: "footwear", weight_g: 28, search: "ラピッドゲイター wrapid gaiters ダーティーガール ゲイター スパッツ UL 超軽量 カラフル" },

  // 冬山靴
  { name: "モンブランプロ GTX", brand: "SCARPA", category_id: "footwear", weight_g: 1900, search: "モンブランプロ mont blanc pro スカルパ 冬山靴 ダブルブーツ アルパイン アイゼン対応 厳冬期" },
  { name: "Nepal Cube GTX", brand: "La Sportiva", category_id: "footwear", weight_g: 1880, search: "ネパールキューブ nepal cube ラスポルティバ 冬山靴 アルパイン ダブルブーツ 厳冬期" },
  { name: "アルパインクルーザー 3000", brand: "mont-bell", category_id: "footwear", weight_g: 1760, search: "アルパインクルーザー3000 alpinecruiser 3000 モンベル 冬山 ダブルブーツ 厳冬期 アイゼン対応" },

  // ソックス
  { name: "ミディアムハイカー クルー", brand: "FITS", category_id: "footwear", weight_g: 80, search: "FITS フィッツ ミディアムハイカー medium hiker ソックス 靴下 メリノウール 登山" },
  { name: "トレイル ミッドウェイト ミニクルー", brand: "Injinji", category_id: "footwear", weight_g: 56, search: "インジンジ injinji トレイル ミッドウェイト 五本指 ソックス 靴下 トレイルラン" },
  { name: "Hiking Essential Medium Crew", brand: "Point6", category_id: "footwear", weight_g: 70, search: "ポイントシックス point6 ハイキング エッセンシャル ソックス 靴下 メリノウール" },
  { name: "Hike Midweight Merino Endurance", brand: "Bridgedale", category_id: "footwear", weight_g: 85, search: "ブリッジデイル bridgedale ハイク ミッドウェイト ソックス 靴下 メリノウール 登山" },
  { name: "メリノウール アルパインソックス", brand: "mont-bell", category_id: "footwear", weight_g: 90, search: "メリノウール アルパイン ソックス 靴下 モンベル 登山 厚手 保温" },
  { name: "Hike+ Medium Crew", brand: "Icebreaker", category_id: "footwear", weight_g: 75, search: "アイスブレーカー icebreaker ハイクプラス ミディアム ソックス 靴下 メリノウール 登山" },
  { name: "レーシングラン 五本指", brand: "Tabio", category_id: "footwear", weight_g: 30, search: "タビオ tabio レーシングラン 五本指 ソックス 靴下 トレイルラン 薄手 日本製" },
  { name: "Coolmesh II Quarter", brand: "WRIGHTSOCK", category_id: "footwear", weight_g: 50, search: "ライトソック wrightsock クールメッシュ coolmesh ソックス 靴下 二重構造 マメ防止" },

  // 沢靴
  { name: "サワートレッカー", brand: "mont-bell", category_id: "footwear", weight_g: 680, search: "サワートレッカー sawatrekker モンベル 沢靴 沢登り フェルト" },
  { name: "KR-3XF", brand: "キャラバン", category_id: "footwear", weight_g: 720, search: "KR-3XF キャラバン caravan 沢靴 沢登り フェルト 渓流" },
  { name: "オリジナル沢靴", brand: "秀山荘", category_id: "footwear", weight_g: 750, search: "秀山荘 しゅうざんそう オリジナル沢靴 沢登り フェルト 渓流 専門店" },

  // アプローチシューズ
  { name: "TX Guide", brand: "La Sportiva", category_id: "footwear", weight_g: 640, search: "TX ガイド guide ラスポルティバ アプローチシューズ クライミング 岩場" },
  { name: "Gecko", brand: "SCARPA", category_id: "footwear", weight_g: 680, search: "ゲッコー gecko スカルパ アプローチシューズ クライミング 岩場" },
  { name: "Guide Tennie", brand: "Five Ten", category_id: "footwear", weight_g: 740, search: "ガイドテニー guide tennie ファイブテン アプローチシューズ ステルスラバー 岩場" },
  { name: "Konseal FL2 GTX", brand: "Arc'teryx", category_id: "footwear", weight_g: 660, search: "コンシール konseal FL2 アークテリクス アプローチシューズ ゴアテックス 岩場 ハイキング" },

  // ローカットハイキング
  { name: "Anacapa Low GTX", brand: "HOKA", category_id: "footwear", weight_g: 730, search: "アナカパ anacapa ロー ホカ ハイキング ローカット ゴアテックス 軽量" },
  { name: "X Ultra 4 Mid GTX", brand: "Salomon", category_id: "footwear", weight_g: 860, search: "X ULTRA 4 ミッド mid サロモン トレッキング ゴアテックス ミドルカット" },
  { name: "MQM 3 GTX", brand: "Merrell", category_id: "footwear", weight_g: 700, search: "MQM3 メレル ハイキング ローカット ゴアテックス 軽量 スピードハイク" },
  { name: "Trail 2650 Campo GTX", brand: "Danner", category_id: "footwear", weight_g: 650, search: "トレイル2650 カンポ campo ダナー ハイキング ゴアテックス ローカット 軽量" },
  { name: "Facet 75 OutDry", brand: "Columbia", category_id: "footwear", weight_g: 680, search: "ファセット facet 75 コロンビア ハイキング アウトドライ 防水 ローカット 軽量" },

  // クライミングシューズ
  { name: "Solution", brand: "La Sportiva", category_id: "footwear", weight_g: 450, search: "ソリューション solution ラスポルティバ クライミングシューズ ボルダリング" },
  { name: "Drago", brand: "SCARPA", category_id: "footwear", weight_g: 390, search: "ドラゴ drago スカルパ クライミングシューズ ボルダリング ソフト" },
  { name: "Anasazi VCS", brand: "Five Ten", category_id: "footwear", weight_g: 460, search: "アナサジ anasazi VCS ファイブテン クライミングシューズ ベルクロ ステルスラバー" },

  // スキーブーツ / バックカントリー
  { name: "Maestrale RS", brand: "SCARPA", category_id: "footwear", weight_g: 2580, search: "マエストラーレ maestrale RS スカルパ スキーブーツ バックカントリー AT テレマーク" },
  { name: "TLT X", brand: "Dynafit", category_id: "footwear", weight_g: 2100, search: "TLT X ディナフィット スキーブーツ バックカントリー AT 軽量 スキーモ" },

  // クランポン用ブーツ追加
  { name: "Crow GTX", brand: "Salewa", category_id: "footwear", weight_g: 1400, search: "クロウ crow サレワ salewa 登山靴 アルパイン ゴアテックス アイゼン対応 冬山" },

  // 地下足袋
  { name: "プロガードスパイク", brand: "丸五", category_id: "footwear", weight_g: 480, search: "プロガード スパイク 丸五 地下足袋 林業 沢 岩場 スパイク付き" },
  { name: "跣たび", brand: "力王", category_id: "footwear", weight_g: 350, search: "跣たび はだしたび 力王 りきおう 地下足袋 沢登り 岩場 軽量" },

  // 長靴
  { name: "バードウォッチング長靴", brand: "日本野鳥の会", category_id: "footwear", weight_g: 460, search: "バードウォッチング長靴 日本野鳥の会 レインブーツ 折りたたみ コンパクト 軽量 フェス" },
  { name: "パルクール2", brand: "AIGLE", category_id: "footwear", weight_g: 1050, search: "パルクール parcours エーグル AIGLE 長靴 レインブーツ ラバー フランス製 アウトドア" },

  // ポール追加
  { name: "FL-120", brand: "Helinox", category_id: "footwear", weight_g: 380, search: "FL-120 ヘリノックス トレッキングポール 軽量 カーボン 折りたたみ" },
  { name: "アルパインポール カーボン", brand: "mont-bell", category_id: "footwear", weight_g: 360, search: "アルパインポール カーボン モンベル トレッキングポール 軽量 3段折りたたみ" },

  // ═══════════════════════════════════════════
  // バックパック (backpack)
  // ═══════════════════════════════════════════
  { name: "Exos 58", brand: "OSPREY", category_id: "backpack", weight_g: 1120, search: "エクソス exos オスプレー ザック 軽量" },
  { name: "Atmos AG 65", brand: "OSPREY", category_id: "backpack", weight_g: 2010, search: "アトモス atmos AG オスプレー ザック 大型" },
  { name: "Talon 22", brand: "OSPREY", category_id: "backpack", weight_g: 680, search: "タロン talon オスプレー ザック 日帰り" },
  { name: "バルトロ 65", brand: "Gregory", category_id: "backpack", weight_g: 2270, search: "バルトロ baltoro グレゴリー ザック 大型" },
  { name: "ズール 35", brand: "Gregory", category_id: "backpack", weight_g: 1120, search: "ズール zulu グレゴリー ザック 中型" },
  { name: "カイトン 38", brand: "mont-bell", category_id: "backpack", weight_g: 1190, search: "カイトン kaiton モンベル ザック" },
  { name: "バーサライトパック 30", brand: "mont-bell", category_id: "backpack", weight_g: 430, search: "バーサライト versalite モンベル ザック UL 軽量" },
  { name: "テラ 55", brand: "THE NORTH FACE", category_id: "backpack", weight_g: 1680, search: "テラ terra ノースフェイス ザック 大型" },
  { name: "Levity 45", brand: "OSPREY", category_id: "backpack", weight_g: 810, search: "レヴィティ levity オスプレー ザック UL 軽量" },
  { name: "OHM 2.0", brand: "MOUNTAIN HARDWEAR", category_id: "backpack", weight_g: 820, search: "OHM マウンテンハードウェア ザック 軽量" },
  { name: "SLASH 25", brand: "ZEROGRAM", category_id: "backpack", weight_g: 520, search: "スラッシュ slash ゼログラム ザック UL 日帰り" },
  { name: "Exos 48", brand: "OSPREY", category_id: "backpack", weight_g: 1060, search: "エクソス exos 48 オスプレー ザック 軽量 中型" },
  { name: "Stratos 36", brand: "OSPREY", category_id: "backpack", weight_g: 1360, search: "ストラトス stratos オスプレー ザック 中型 日帰り" },
  { name: "Tempest 20", brand: "OSPREY", category_id: "backpack", weight_g: 630, search: "テンペスト tempest オスプレー ザック 日帰り レディース" },
  { name: "Aether 65", brand: "OSPREY", category_id: "backpack", weight_g: 2240, search: "イーサー aether オスプレー ザック 大型 テント泊" },
  { name: "Jade 38", brand: "Gregory", category_id: "backpack", weight_g: 1200, search: "ジェイド jade グレゴリー ザック レディース 中型" },
  { name: "スタウト 45", brand: "Gregory", category_id: "backpack", weight_g: 1410, search: "スタウト stout グレゴリー ザック 中型 テント泊" },
  { name: "パラゴン 58", brand: "Gregory", category_id: "backpack", weight_g: 1550, search: "パラゴン paragon グレゴリー ザック 大型" },
  { name: "デナリ 28", brand: "Gregory", category_id: "backpack", weight_g: 770, search: "デナリ denali グレゴリー ザック 日帰り" },
  { name: "カイトン 28", brand: "mont-bell", category_id: "backpack", weight_g: 960, search: "カイトン kaiton 28 モンベル ザック 日帰り" },
  { name: "カイトン 46", brand: "mont-bell", category_id: "backpack", weight_g: 1310, search: "カイトン kaiton 46 モンベル ザック テント泊" },
  { name: "アルパインパック 60", brand: "mont-bell", category_id: "backpack", weight_g: 1580, search: "アルパインパック alpine モンベル ザック 大型 テント泊" },
  { name: "トレッキングパック 80", brand: "mont-bell", category_id: "backpack", weight_g: 1850, search: "トレッキングパック モンベル ザック 大型 長期縦走" },
  { name: "バーサライトパック 20", brand: "mont-bell", category_id: "backpack", weight_g: 330, search: "バーサライト versalite 20 モンベル ザック UL 軽量 アタック" },
  { name: "テルス 35", brand: "THE NORTH FACE", category_id: "backpack", weight_g: 1220, search: "テルス tellus ノースフェイス ザック 中型" },
  { name: "テルス 45", brand: "THE NORTH FACE", category_id: "backpack", weight_g: 1480, search: "テルス tellus 45 ノースフェイス ザック テント泊" },
  { name: "グリフィン 65", brand: "THE NORTH FACE", category_id: "backpack", weight_g: 1830, search: "グリフィン griffin ノースフェイス ザック 大型" },
  { name: "Black Hole Pack 32L", brand: "patagonia", category_id: "backpack", weight_g: 710, search: "ブラックホール blackhole パタゴニア ザック デイパック" },
  { name: "Brize 32", brand: "Arc'teryx", category_id: "backpack", weight_g: 970, search: "ブライズ brize アークテリクス ザック 日帰り ハイキング" },
  { name: "Bora 63", brand: "Arc'teryx", category_id: "backpack", weight_g: 2100, search: "ボラ bora アークテリクス ザック 大型 テント泊" },
  { name: "Lithium 30", brand: "MAMMUT", category_id: "backpack", weight_g: 930, search: "リチウム lithium マムート ザック 日帰り" },
  { name: "Trion Spine 50", brand: "MAMMUT", category_id: "backpack", weight_g: 1690, search: "トリオンスパイン trion spine マムート ザック アルパイン" },
  { name: "KUMO 36", brand: "ULA", category_id: "backpack", weight_g: 475, search: "クモ kumo ULA ザック UL 超軽量" },
  { name: "Mariposa 60", brand: "Gossamer Gear", category_id: "backpack", weight_g: 740, search: "マリポサ mariposa ゴッサマーギア ザック UL 軽量 スルーハイク" },
  // deuter
  { name: "エアコンタクト コア 50+10", brand: "deuter", category_id: "backpack", weight_g: 1960, search: "エアコンタクト aircontact ドイター deuter ザック テント泊 大型" },
  { name: "フューチュラ 32", brand: "deuter", category_id: "backpack", weight_g: 1310, search: "フューチュラ futura ドイター deuter ザック 日帰り 中型" },
  { name: "スピードライト 24", brand: "deuter", category_id: "backpack", weight_g: 650, search: "スピードライト speedlite ドイター deuter ザック 軽量 日帰り" },
  // Millet
  { name: "サースフェー 40+20", brand: "Millet", category_id: "backpack", weight_g: 1850, search: "サースフェー saas-fee ミレー millet ザック アルパイン 大型" },
  { name: "プロライター 30+10", brand: "Millet", category_id: "backpack", weight_g: 1150, search: "プロライター prolighter ミレー millet ザック 軽量 縦走" },
  // karrimor
  { name: "リッジ 30", brand: "karrimor", category_id: "backpack", weight_g: 1100, search: "リッジ ridge カリマー karrimor ザック ハイキング 中型" },
  { name: "クーガー 45-65", brand: "karrimor", category_id: "backpack", weight_g: 2100, search: "クーガー cougar カリマー karrimor ザック 大型 テント泊" },
  // MYSTERY RANCH
  { name: "テラフレーム 50", brand: "MYSTERY RANCH", category_id: "backpack", weight_g: 1900, search: "テラフレーム terraframe ミステリーランチ mystery ranch ザック フレーム 大型" },
  { name: "グレイシャー ポイント 40", brand: "MYSTERY RANCH", category_id: "backpack", weight_g: 1700, search: "グレイシャーポイント glacier point ミステリーランチ mystery ranch ザック テント泊" },
  { name: "Coulee 25", brand: "MYSTERY RANCH", category_id: "backpack", weight_g: 930, search: "クーリー coulee ミステリーランチ mystery ranch ザック 日帰り 軽量" },
  // Hyperlite Mountain Gear
  { name: "2400 Southwest", brand: "Hyperlite Mountain Gear", category_id: "backpack", weight_g: 548, search: "2400 サウスウエスト ハイパーライトマウンテンギア HMG ザック UL DCF キューベン" },
  { name: "3400 Junction", brand: "Hyperlite Mountain Gear", category_id: "backpack", weight_g: 695, search: "3400 ジャンクション ハイパーライトマウンテンギア HMG ザック UL DCF キューベン 大型" },
  // GRANITE GEAR
  { name: "Crown2 60", brand: "GRANITE GEAR", category_id: "backpack", weight_g: 1020, search: "クラウン2 crown2 グラナイトギア granite gear ザック 軽量 スルーハイク" },
  // 山と道
  { name: "MINI", brand: "山と道", category_id: "backpack", weight_g: 225, search: "ミニ mini 山と道 ザック UL 超軽量 アタックパック 日帰り" },
  { name: "THREE", brand: "山と道", category_id: "backpack", weight_g: 530, search: "スリー three 山と道 ザック UL 軽量 縦走 テント泊" },
  { name: "ONE", brand: "山と道", category_id: "backpack", weight_g: 320, search: "ワン one 山と道 ザック UL 超軽量 日帰り 縦走" },
  // Trail Bum
  { name: "Bummer 35", brand: "Trail Bum", category_id: "backpack", weight_g: 480, search: "バマー bummer トレイルバム trail bum ザック UL 軽量 日帰り" },
  { name: "Steady 50", brand: "Trail Bum", category_id: "backpack", weight_g: 620, search: "ステディ steady トレイルバム trail bum ザック UL 軽量 縦走 テント泊" },
  // Gossamer Gear追加
  { name: "Gorilla 50", brand: "Gossamer Gear", category_id: "backpack", weight_g: 620, search: "ゴリラ gorilla ゴッサマーギア ザック UL 軽量 スルーハイク 50L" },
  // ULA追加
  { name: "Circuit", brand: "ULA", category_id: "backpack", weight_g: 1100, search: "サーキット circuit ULA ザック UL 軽量 スルーハイク 68L" },
  { name: "Ohm 2.0", brand: "ULA", category_id: "backpack", weight_g: 850, search: "オーム ohm ULA ザック UL 軽量 39L" },
  { name: "Catalyst", brand: "ULA", category_id: "backpack", weight_g: 990, search: "カタリスト catalyst ULA ザック UL 軽量 55L" },
  // Zpacks
  { name: "Arc Blast 55", brand: "Zpacks", category_id: "backpack", weight_g: 540, search: "アークブラスト arc blast ジーパックス zpacks ザック UL 超軽量 DCF キューベン 55L" },
  { name: "Nero 38", brand: "Zpacks", category_id: "backpack", weight_g: 310, search: "ネロ nero ジーパックス zpacks ザック UL 超軽量 DCF フレームレス 38L" },
  // OMM
  { name: "Classic 25", brand: "OMM", category_id: "backpack", weight_g: 420, search: "クラシック classic OMM オリジナルマウンテンマラソン ザック UL ファストパッキング 25L" },
  { name: "Phantom 25", brand: "OMM", category_id: "backpack", weight_g: 320, search: "ファントム phantom OMM オリジナルマウンテンマラソン ザック UL 超軽量 25L" },
  // Pa'lante
  { name: "V2", brand: "Pa'lante", category_id: "backpack", weight_g: 430, search: "パランテ palante V2 ザック UL 超軽量 スルーハイク" },
  // EXPED
  { name: "Lightning 45", brand: "EXPED", category_id: "backpack", weight_g: 1020, search: "ライトニング lightning エクスペド EXPED ザック 軽量 45L アルパイン" },
  // Lowe Alpine
  { name: "AirZone Trail Camino 37:42", brand: "Lowe Alpine", category_id: "backpack", weight_g: 1350, search: "エアゾーン トレイルカミノ airzone trail camino ロウアルパイン ザック 37 42 背面メッシュ" },
  { name: "Cerro Torre 65:85", brand: "Lowe Alpine", category_id: "backpack", weight_g: 2450, search: "セロトーレ cerro torre ロウアルパイン ザック 大型 65 85 遠征 テント泊" },
  // Thule
  { name: "AllTrail X 35L", brand: "Thule", category_id: "backpack", weight_g: 1100, search: "オールトレイル alltrail スーリー thule ザック 35L ハイキング" },
  // SALOMON
  { name: "OUT NIGHT 30+5", brand: "SALOMON", category_id: "backpack", weight_g: 1060, search: "アウトナイト out night サロモン salomon ザック 30L テント泊 ファストパッキング" },
  { name: "XT 15", brand: "SALOMON", category_id: "backpack", weight_g: 420, search: "XT15 サロモン salomon ザック 15L トレイルランニング ファストパッキング" },
  { name: "ADV SKIN 12", brand: "SALOMON", category_id: "backpack", weight_g: 310, search: "アドバンスドスキン ADV SKIN 12 サロモン salomon トレイルランニング ベスト ランニングベスト" },
  // mont-bell追加
  { name: "トリプルポケットパック 45", brand: "mont-bell", category_id: "backpack", weight_g: 1250, search: "トリプルポケットパック モンベル ザック 45L 縦走 テント泊 三室構造" },
  // deuter追加
  { name: "エアコンタクト ウルトラ 50+5", brand: "deuter", category_id: "backpack", weight_g: 1480, search: "エアコンタクトウルトラ aircontact ultra ドイター deuter ザック 軽量 50L テント泊" },
  // Black Diamond
  { name: "Distance 15", brand: "Black Diamond", category_id: "backpack", weight_g: 340, search: "ディスタンス distance ブラックダイヤモンド black diamond ザック 15L トレイルランニング ベスト" },
  // THE NORTH FACE ランニングベスト
  { name: "Martin Wing 10", brand: "THE NORTH FACE", category_id: "backpack", weight_g: 275, search: "マーティンウィング martin wing ノースフェイス ランニングベスト 10L トレイルラン" },
  // OSPREY ランニングベスト
  { name: "Duro 15", brand: "OSPREY", category_id: "backpack", weight_g: 480, search: "デューロ duro オスプレー ランニングベスト 15L トレイルラン ハイドレーション" },

  // ═══════════════════════════════════════════
  // ナビゲーション (navigation)
  // ═══════════════════════════════════════════
  { name: "inReach Mini 2", brand: "Garmin", category_id: "navigation", weight_g: 100, search: "インリーチ inreach ガーミン 衛星通信 GPS SOS" },
  { name: "eTrex SE", brand: "Garmin", category_id: "navigation", weight_g: 168, search: "イートレックス etrex ガーミン GPS ハンディ" },
  { name: "コンパス No.3", brand: "SILVA", category_id: "navigation", weight_g: 35, search: "シルバ silva コンパス 方位磁石" },
  { name: "fēnix 7X", brand: "Garmin", category_id: "navigation", weight_g: 89, search: "フェニックス fenix ガーミン GPS ウォッチ スマートウォッチ" },
  { name: "Enduro 2", brand: "Garmin", category_id: "navigation", weight_g: 70, search: "エンデューロ enduro ガーミン GPS ウォッチ ロングバッテリー" },
  { name: "GPSMAP 67", brand: "Garmin", category_id: "navigation", weight_g: 230, search: "GPSMAP ガーミン GPS ハンディ 地図 登山" },
  { name: "Ambit3 Peak", brand: "SUUNTO", category_id: "navigation", weight_g: 89, search: "アンビット ambit スント GPS ウォッチ" },
  { name: "Vertical", brand: "SUUNTO", category_id: "navigation", weight_g: 74, search: "バーティカル vertical スント GPS ウォッチ ソーラー" },
  { name: "Coros VERTIX 2S", brand: "COROS", category_id: "navigation", weight_g: 72, search: "カロス coros バーティックス vertix GPS ウォッチ" },
  { name: "フィールドコンパス", brand: "mont-bell", category_id: "navigation", weight_g: 25, search: "フィールドコンパス モンベル 方位磁石 ベースプレート" },
  { name: "Apple Watch Ultra 2", brand: "Apple", category_id: "navigation", weight_g: 61, search: "アップルウォッチ apple watch ultra スマートウォッチ GPS ウォッチ トレイル" },
  { name: "Grit X2 Pro", brand: "POLAR", category_id: "navigation", weight_g: 79, search: "グリット ポラール polar grit x2 GPS ウォッチ アウトドア ナビ" },
  { name: "PRO TREK PRW-61", brand: "CASIO", category_id: "navigation", weight_g: 63, search: "プロトレック pro trek カシオ 高度計 気圧計 コンパス 温度計 腕時計" },
  { name: "PRO TREK PRW-70", brand: "CASIO", category_id: "navigation", weight_g: 68, search: "プロトレック pro trek カシオ PRW70 高度計 ソーラー 腕時計 登山" },
  { name: "ルーペ 10倍", brand: "SILVA", category_id: "navigation", weight_g: 18, search: "ルーペ シルバ silva 地図 読図 拡大鏡 コンパス" },
  { name: "地図ケース A4", brand: "mont-bell", category_id: "navigation", weight_g: 40, search: "地図ケース 地図 防水 モンベル map case 読図" },
  { name: "温度計 サーモメーター", brand: "mont-bell", category_id: "navigation", weight_g: 12, search: "温度計 thermometer モンベル 気温 登山 コンパクト" },
  // SUUNTO追加
  { name: "9 Peak Pro", brand: "SUUNTO", category_id: "navigation", weight_g: 64, search: "9ピークプロ 9 peak pro スント GPS ウォッチ トレイル 長時間バッテリー" },
  { name: "Core", brand: "SUUNTO", category_id: "navigation", weight_g: 64, search: "コア core スント 高度計 気圧計 コンパス ABC 腕時計 登山" },
  // Garmin追加
  { name: "fēnix 7", brand: "Garmin", category_id: "navigation", weight_g: 79, search: "フェニックス fenix 7 ガーミン GPS ウォッチ スマートウォッチ マルチスポーツ" },
  { name: "Instinct 2X Solar", brand: "Garmin", category_id: "navigation", weight_g: 67, search: "インスティンクト instinct 2X ソーラー ガーミン GPS ウォッチ タフネス 太陽光充電" },
  // COROS追加
  { name: "PACE 3", brand: "COROS", category_id: "navigation", weight_g: 39, search: "ペース3 pace 3 カロス coros GPS ウォッチ 軽量 ランニング トレイル" },
  // スマホホルダー
  { name: "スマホホルダー ユニバーサルアダプター", brand: "QUAD LOCK", category_id: "navigation", weight_g: 36, search: "クアッドロック quad lock スマホホルダー スマートフォン マウント YAMAP ヤマップ 地図 ナビ" },
  // 温度計
  { name: "サーモマックス50", brand: "EMPEX", category_id: "navigation", weight_g: 16, search: "サーモマックス thermomax エンペックス empex 温度計 小型 登山 アウトドア" },
  // ハンドヘルドGPS
  { name: "eTrex 32x", brand: "Garmin", category_id: "navigation", weight_g: 142, search: "イートレックス etrex 32x ガーミン GPS ハンディ 地図 日本語 登山 ナビゲーション" },
  // コンパス追加
  { name: "レンジャーコンパス", brand: "SILVA", category_id: "navigation", weight_g: 42, search: "レンジャー ranger シルバ silva コンパス 方位磁石 ミラー 読図 精密" },

  // ═══════════════════════════════════════════
  // 安全装備 (safety)
  // ═══════════════════════════════════════════
  { name: "スイフト RL", brand: "PETZL", category_id: "safety", weight_g: 100, search: "スイフト swift RL ペツル ヘッドランプ ヘッデン" },
  { name: "アクティック コア", brand: "PETZL", category_id: "safety", weight_g: 75, search: "アクティック actik ペツル ヘッドランプ" },
  { name: "ストーム 400", brand: "Black Diamond", category_id: "safety", weight_g: 120, search: "ストーム storm ブラックダイヤモンド ヘッドランプ" },
  { name: "コスモ 350", brand: "Black Diamond", category_id: "safety", weight_g: 91, search: "コスモ cosmo ブラックダイヤモンド ヘッドランプ" },
  { name: "ファーストエイドバッグ M", brand: "deuter", category_id: "safety", weight_g: 160, search: "ファーストエイド 救急 ドイター deuter" },
  { name: "ステラ", brand: "Grivel", category_id: "safety", weight_g: 235, search: "ステラ stealth グリベル ヘルメット 軽量" },
  { name: "スポット 400", brand: "Black Diamond", category_id: "safety", weight_g: 78, search: "スポット spot ブラックダイヤモンド ヘッドランプ コンパクト" },
  { name: "リアクティック プラス", brand: "PETZL", category_id: "safety", weight_g: 115, search: "リアクティック reactik ペツル ヘッドランプ リアクティブ" },
  { name: "ティカ", brand: "PETZL", category_id: "safety", weight_g: 82, search: "ティカ tikka ペツル ヘッドランプ エントリー" },
  { name: "ナオ RL", brand: "PETZL", category_id: "safety", weight_g: 145, search: "ナオ nao RL ペツル ヘッドランプ 高輝度 リアクティブ" },
  { name: "ヘッドランプ WH-031", brand: "mont-bell", category_id: "safety", weight_g: 68, search: "WH031 モンベル ヘッドランプ ヘッデン コンパクト" },
  { name: "ハーフドーム", brand: "Black Diamond", category_id: "safety", weight_g: 300, search: "ハーフドーム halfdome ブラックダイヤモンド ヘルメット" },
  { name: "ボレオ", brand: "PETZL", category_id: "safety", weight_g: 285, search: "ボレオ boreo ペツル ヘルメット" },
  { name: "シロッコ", brand: "PETZL", category_id: "safety", weight_g: 160, search: "シロッコ sirocco ペツル ヘルメット 超軽量" },
  { name: "クライミングテクノロジー ギャラクシー", brand: "CT", category_id: "safety", weight_g: 210, search: "ギャラクシー galaxy クライミングテクノロジー CT ヘルメット 軽量" },
  { name: "ファーストエイドキット DX", brand: "mont-bell", category_id: "safety", weight_g: 200, search: "ファーストエイド 救急 DX モンベル" },
  { name: "エマージェンシーキット", brand: "SOL", category_id: "safety", weight_g: 120, search: "エマージェンシー ソル SOL 緊急 レスキュー" },
  { name: "ソーラーブランケット", brand: "SOL", category_id: "safety", weight_g: 105, search: "ソーラーブランケット SOL ソル エマージェンシー 保温" },
  { name: "熊よけスプレー CA290", brand: "COUNTER ASSAULT", category_id: "safety", weight_g: 340, search: "カウンターアサルト 熊スプレー 熊よけ ベアスプレー" },
  { name: "熊よけ鈴 消音機能付き", brand: "mont-bell", category_id: "safety", weight_g: 40, search: "熊よけ鈴 クマ ベル モンベル 消音" },
  // ホイッスル
  { name: "ホイッスル Fox 40 クラシック", brand: "Fox 40", category_id: "safety", weight_g: 22, search: "ホイッスル fox40 フォックスフォーティー 笛 緊急 レスキュー シグナル" },
  { name: "ホイッスル スノーシェル", brand: "mont-bell", category_id: "safety", weight_g: 15, search: "ホイッスル モンベル 笛 緊急 コンパクト レスキュー シグナル" },
  // ツエルト（安全装備）
  { name: "ツェルト 1 スタンダード", brand: "ARAI TENT", category_id: "safety", weight_g: 320, search: "ツェルト アライテント 緊急 ビバーク 安全 シェルター エマージェンシー" },
  // エマージェンシーブランケット
  { name: "エマージェンシーブランケット", brand: "mont-bell", category_id: "safety", weight_g: 55, search: "エマージェンシーブランケット モンベル 保温 緊急 ビバーク サバイバル" },
  { name: "サバイバルブランケット ヘビーデューティー", brand: "SOL", category_id: "safety", weight_g: 130, search: "サバイバルブランケット SOL ソル 保温 緊急 ヘビーデューティー 防水" },
  // ロープ・スリング
  { name: "スリング 60cm ダイニーマ", brand: "mont-bell", category_id: "safety", weight_g: 24, search: "スリング ダイニーマ モンベル ロープ 登攀 クライミング ランナー" },
  { name: "スリング 120cm ダイニーマ", brand: "mont-bell", category_id: "safety", weight_g: 36, search: "スリング ダイニーマ モンベル ロープ 登攀 クライミング ランナー 長" },
  { name: "コード スリング 60cm", brand: "PETZL", category_id: "safety", weight_g: 28, search: "コードスリング ペツル petzl スリング ロープ クライミング 登攀" },
  // カラビナ
  { name: "OK スクリューロック", brand: "PETZL", category_id: "safety", weight_g: 59, search: "OKスクリュー ペツル petzl カラビナ ロック クライミング" },
  { name: "Oval カラビナ", brand: "Black Diamond", category_id: "safety", weight_g: 76, search: "オーバル カラビナ ブラックダイヤモンド black diamond クライミング" },
  { name: "ストレートゲート カラビナ", brand: "PETZL", category_id: "safety", weight_g: 48, search: "ストレートゲート カラビナ ペツル petzl クライミング 安全 登攀" },
  // ハーネス
  { name: "アルゴン ハーネス", brand: "PETZL", category_id: "safety", weight_g: 280, search: "アルゴン harness ペツル petzl ハーネス クライミング アルパイン 安全帯" },
  { name: "ソウル ハーネス", brand: "Black Diamond", category_id: "safety", weight_g: 310, search: "ソウル soul ブラックダイヤモンド black diamond ハーネス クライミング 安全帯" },
  // ビレイデバイス
  { name: "GRIGRI+", brand: "PETZL", category_id: "safety", weight_g: 195, search: "グリグリ grigri ペツル petzl ビレイデバイス 確保器 クライミング" },
  { name: "ATC ガイド", brand: "Black Diamond", category_id: "safety", weight_g: 79, search: "ATC ガイド ブラックダイヤモンド black diamond ビレイデバイス 確保器 クライミング" },
  { name: "REVERSO 4", brand: "PETZL", category_id: "safety", weight_g: 82, search: "リバーソ reverso ペツル petzl ビレイデバイス 確保器 クライミング" },
  // アイスアックス
  { name: "サミットピック ステッカ", brand: "PETZL", category_id: "safety", weight_g: 330, search: "サミットピック ペツル petzl アイスアックス ピッケル 冬山 アルパイン" },
  { name: "Air Tech Evolution", brand: "Grivel", category_id: "safety", weight_g: 420, search: "エアテック グリベル grivel アイスアックス ピッケル 冬山 縦走" },
  { name: "Raven Ultra", brand: "Black Diamond", category_id: "safety", weight_g: 385, search: "レイブン raven ブラックダイヤモンド black diamond アイスアックス ピッケル 冬山" },
  // ヘッドランプ追加
  { name: "NEO5R", brand: "LEDLENSER", category_id: "safety", weight_g: 74, search: "ネオ NEO5R レッドレンザー ledlenser ヘッドランプ USB充電 ランニング" },
  { name: "NU25 UL", brand: "Nitecore", category_id: "safety", weight_g: 28, search: "NU25 ナイトコア nitecore ヘッドランプ 超軽量 UL USB充電 コンパクト" },
  { name: "コンパクトヘッドランプ", brand: "mont-bell", category_id: "safety", weight_g: 55, search: "コンパクトヘッドランプ モンベル ヘッデン 軽量 エントリー 電池式" },
  // ヘルメット追加
  { name: "ビジョン", brand: "Black Diamond", category_id: "safety", weight_g: 230, search: "ビジョン vision ブラックダイヤモンド black diamond ヘルメット 軽量 MIPS" },
  { name: "Wall Rider", brand: "MAMMUT", category_id: "safety", weight_g: 240, search: "ウォールライダー wall rider マムート MAMMUT ヘルメット 軽量 MIPS" },
  { name: "Storm", brand: "Camp", category_id: "safety", weight_g: 230, search: "ストーム storm カンプ camp ヘルメット 軽量 アルパイン クライミング" },
  // アイゼン
  { name: "スノースパイク 10", brand: "mont-bell", category_id: "safety", weight_g: 425, search: "スノースパイク snowspike 10本爪 モンベル アイゼン クランポン 冬山 雪山" },
  { name: "G12", brand: "Grivel", category_id: "safety", weight_g: 465, search: "G12 グリベル grivel アイゼン クランポン 12本爪 冬山 アルパイン" },
  { name: "IRVIS", brand: "PETZL", category_id: "safety", weight_g: 385, search: "イルビス irvis ペツル petzl アイゼン クランポン 10本爪 冬山 軽量" },
  { name: "セラック クリップ", brand: "Black Diamond", category_id: "safety", weight_g: 460, search: "セラック serac クリップ ブラックダイヤモンド アイゼン クランポン 12本爪 冬山" },
  // ピッケル追加
  { name: "アルパインアックス", brand: "mont-bell", category_id: "safety", weight_g: 430, search: "アルパインアックス alpine axe モンベル ピッケル 冬山 縦走 雪山" },
  { name: "サミットエボ", brand: "PETZL", category_id: "safety", weight_g: 340, search: "サミットエボ summit evo ペツル petzl ピッケル アイスアックス 冬山 軽量 アルパイン" },
  // 雪崩装備
  { name: "バリーヴォックス S2", brand: "MAMMUT", category_id: "safety", weight_g: 210, search: "バリーヴォックス barryvox S2 マムート MAMMUT アバランチビーコン 雪崩 トランシーバー 捜索" },
  { name: "Tracker4", brand: "BCA", category_id: "safety", weight_g: 150, search: "トラッカー4 tracker4 BCA アバランチビーコン 雪崩 トランシーバー 捜索" },
  { name: "3+", brand: "Ortovox", category_id: "safety", weight_g: 210, search: "3プラス 3+ オルトボックス ortovox アバランチビーコン 雪崩 トランシーバー 捜索" },
  { name: "B-2 EXT プローブ 240", brand: "BCA", category_id: "safety", weight_g: 280, search: "B2 EXT プローブ probe BCA 雪崩 プローブ ゾンデ 捜索 アバランチ 240cm" },
  { name: "NEO プローブ 240", brand: "ARVA", category_id: "safety", weight_g: 220, search: "ネオ NEO プローブ probe アルバ ARVA 雪崩 ゾンデ 捜索 アバランチ 240cm" },
  // アバランチエアバッグ
  { name: "フリップ RAS 3.0 22L", brand: "MAMMUT", category_id: "safety", weight_g: 2600, search: "フリップ flip RAS 3.0 マムート MAMMUT アバランチエアバッグ 雪崩 エアバッグ ザック バックカントリー" },
  { name: "Float 32", brand: "BCA", category_id: "safety", weight_g: 3100, search: "フロート float 32 BCA アバランチエアバッグ 雪崩 エアバッグ ザック バックカントリー" },
  { name: "Avabag Litric FreeRide 30", brand: "Ortovox", category_id: "safety", weight_g: 1990, search: "アババッグ リトリック avabag litric オルトボックス ortovox アバランチエアバッグ 雪崩 超軽量" },
  // スノーショベル
  { name: "Beast", brand: "ORTOVOX", category_id: "safety", weight_g: 660, search: "ビースト beast オルトボックス ortovox ショベル スコップ 雪崩 除雪 アバランチ" },
  { name: "Shaxe Speed", brand: "BCA", category_id: "safety", weight_g: 780, search: "シャックス スピード shaxe speed BCA ショベル スコップ ピッケル 雪崩 除雪" },
  { name: "デプロイ 7", brand: "Black Diamond", category_id: "safety", weight_g: 660, search: "デプロイ deploy ブラックダイヤモンド black diamond ショベル スコップ 雪崩 除雪 アバランチ" },

  // ═══════════════════════════════════════════
  // 調理器具 (cooking)
  // ═══════════════════════════════════════════
  { name: "ジェットボイル フラッシュ", brand: "JETBOIL", category_id: "cooking", weight_g: 371, search: "ジェットボイル jetboil フラッシュ flash バーナー クッカー一体型" },
  { name: "ジェットボイル ミニモ", brand: "JETBOIL", category_id: "cooking", weight_g: 415, search: "ジェットボイル jetboil ミニモ minimo バーナー" },
  { name: "ウインドマスター SOD-310", brand: "SOTO", category_id: "cooking", weight_g: 67, search: "ウインドマスター windmaster ソト バーナー ストーブ" },
  { name: "アミカス SOD-320", brand: "SOTO", category_id: "cooking", weight_g: 81, search: "アミカス amicus ソト バーナー ストーブ" },
  { name: "リアクター 1.0L", brand: "MSR", category_id: "cooking", weight_g: 330, search: "リアクター reactor MSR ストーブ バーナー" },
  { name: "ポケットロケット デラックス", brand: "MSR", category_id: "cooking", weight_g: 83, search: "ポケットロケット pocketrocket MSR バーナー ストーブ 軽量" },
  { name: "P-153 ウルトラバーナー", brand: "PRIMUS", category_id: "cooking", weight_g: 116, search: "ウルトラバーナー P153 プリムス バーナー ストーブ" },
  { name: "アルパインクッカー 16", brand: "mont-bell", category_id: "cooking", weight_g: 200, search: "アルパインクッカー alpine cooker モンベル 鍋 クッカー" },
  { name: "チタンパーソナルクッカー", brand: "Snow Peak", category_id: "cooking", weight_g: 139, search: "チタンパーソナルクッカー スノーピーク 鍋 チタン 軽量" },
  { name: "ジェットボイル スタッシュ", brand: "JETBOIL", category_id: "cooking", weight_g: 200, search: "ジェットボイル jetboil スタッシュ stash バーナー UL 軽量" },
  { name: "マイクロレギュレーターストーブ フュージョントレック SOD-331", brand: "SOTO", category_id: "cooking", weight_g: 182, search: "フュージョントレック fusion trek ソト バーナー 分離型" },
  { name: "マイクロレギュレーターストーブ ウインドマスター SOD-310", brand: "SOTO", category_id: "cooking", weight_g: 67, search: "マイクロレギュレーター ウインドマスター windmaster ソト バーナー" },
  { name: "ストームブレイカー SOD-372", brand: "SOTO", category_id: "cooking", weight_g: 405, search: "ストームブレイカー stormbreaker ソト マルチフューエル ガソリン" },
  { name: "アミカス クッカーコンボ", brand: "SOTO", category_id: "cooking", weight_g: 278, search: "アミカス amicus コンボ ソト バーナー クッカー セット" },
  { name: "P-115 フェムトストーブ", brand: "PRIMUS", category_id: "cooking", weight_g: 56, search: "フェムト femto プリムス バーナー 最軽量" },
  { name: "P-173 フォールディングハイパワーバーナー", brand: "PRIMUS", category_id: "cooking", weight_g: 265, search: "フォールディング ハイパワー プリムス バーナー 大火力" },
  { name: "ライテックトレックケトル&パン", brand: "PRIMUS", category_id: "cooking", weight_g: 280, search: "ライテック litetech トレックケトル プリムス クッカー セット" },
  { name: "WindBurner 1.0L", brand: "MSR", category_id: "cooking", weight_g: 432, search: "ウインドバーナー windburner MSR バーナー 防風" },
  { name: "Alpine Stowaway Pot 775ml", brand: "MSR", category_id: "cooking", weight_g: 210, search: "アルパイン ストアウェイ MSR クッカー ステンレス" },
  { name: "チタンシングルマグ 450", brand: "Snow Peak", category_id: "cooking", weight_g: 70, search: "チタンシングルマグ スノーピーク マグカップ チタン" },
  { name: "チタンダブルマグ 300", brand: "Snow Peak", category_id: "cooking", weight_g: 106, search: "チタンダブルマグ スノーピーク マグカップ チタン 保温" },
  { name: "トレック900", brand: "Snow Peak", category_id: "cooking", weight_g: 265, search: "トレック900 スノーピーク クッカー アルミ 鍋" },
  { name: "ギガパワー マイクロマックス ウルトラライト", brand: "Snow Peak", category_id: "cooking", weight_g: 56, search: "ギガパワー マイクロマックス スノーピーク バーナー 軽量" },
  { name: "アルパインクッカー ディープ 11", brand: "mont-bell", category_id: "cooking", weight_g: 150, search: "アルパインクッカー ディープ モンベル 鍋 深型" },
  { name: "チタンカップ", brand: "EVERNEW", category_id: "cooking", weight_g: 50, search: "チタンカップ エバニュー マグ チタン 軽量" },
  { name: "Ti ウルトラライトクッカー 1", brand: "EVERNEW", category_id: "cooking", weight_g: 95, search: "チタン ウルトラライトクッカー エバニュー クッカー UL 軽量" },
  { name: "Ti フーボー", brand: "EVERNEW", category_id: "cooking", weight_g: 34, search: "フーボー エバニュー チタン 風防 ウインドスクリーン" },
  { name: "アルコールストーブ", brand: "EVERNEW", category_id: "cooking", weight_g: 34, search: "アルコールストーブ エバニュー チタン UL 軽量" },
  { name: "ガスカートリッジ IP-110", brand: "PRIMUS", category_id: "cooking", weight_g: 200, search: "ガスカートリッジ ガス缶 110 プリムス OD缶" },
  { name: "ガスカートリッジ IP-250T", brand: "PRIMUS", category_id: "cooking", weight_g: 370, search: "ガスカートリッジ ガス缶 250 プリムス OD缶" },
  { name: "アルコールバーナー 0.5L", brand: "Trangia", category_id: "cooking", weight_g: 110, search: "トランギア アルコールバーナー alcohol burner UL 軽量" },
  { name: "ストームクッカー S", brand: "Trangia", category_id: "cooking", weight_g: 760, search: "トランギア ストームクッカー storm cooker アルコール クッキングシステム" },
  { name: "BRS-3000T 超軽量バーナー", brand: "BRS", category_id: "cooking", weight_g: 25, search: "BRS 3000T バーナー 超軽量 UL ストーブ チタン" },
  { name: "スポーク", brand: "Snow Peak", category_id: "cooking", weight_g: 27, search: "スポーク スノーピーク カトラリー チタン スプーン フォーク" },
  { name: "フォールディングスプーン", brand: "mont-bell", category_id: "cooking", weight_g: 12, search: "フォールディングスプーン モンベル カトラリー 折りたたみ スプーン" },
  { name: "スポーク ライトマイファイヤー", brand: "Light My Fire", category_id: "cooking", weight_g: 13, search: "ライトマイファイヤー lightmyfire スポーク spork カトラリー" },
  { name: "コーヒーバネット Sierra", brand: "UNIFLAME", category_id: "cooking", weight_g: 16, search: "ユニフレーム コーヒーバネット コーヒー ドリッパー バネット sierra" },
  { name: "フォールディングコーヒードリッパー", brand: "Snow Peak", category_id: "cooking", weight_g: 52, search: "スノーピーク フォールディング コーヒードリッパー 折りたたみ coffee" },
  { name: "Outdoors Coffee Drip", brand: "GSI", category_id: "cooking", weight_g: 37, search: "GSI コーヒー ドリップ ドリッパー アウトドア outdoors" },
  { name: "まな板 Small", brand: "UNIFLAME", category_id: "cooking", weight_g: 90, search: "ユニフレーム まな板 調理 カッティングボード" },
  { name: "フォールディングカッティングボード", brand: "Snow Peak", category_id: "cooking", weight_g: 40, search: "スノーピーク カッティングボード まな板 折りたたみ 調理" },
  { name: "ウォーターキャリー 2L", brand: "EVERNEW", category_id: "cooking", weight_g: 55, search: "エバニュー ウォーターキャリー 水袋 軽量 ソフトボトル watercarry" },
  { name: "ソフトボトル 2L", brand: "Platypus", category_id: "cooking", weight_g: 36, search: "プラティパス ソフトボトル 2L 軽量 水袋 ウォーターキャリー" },
  { name: "広口丸型ボトル 0.5L", brand: "Nalgene", category_id: "cooking", weight_g: 100, search: "ナルゲン 広口 丸型 0.5L 保存容器 ボトル 食品 調味料" },
  // ユニフレーム追加
  { name: "山クッカー角型 3", brand: "UNIFLAME", category_id: "cooking", weight_g: 245, search: "山クッカー角型 ユニフレーム uniflame クッカー 鍋 角型 セット" },
  { name: "テーブルトップバーナー US-D II", brand: "UNIFLAME", category_id: "cooking", weight_g: 118, search: "テーブルトップバーナー ユニフレーム uniflame バーナー ストーブ 低重心" },
  // DUG
  { name: "HEAT-I", brand: "DUG", category_id: "cooking", weight_g: 56, search: "ヒート HEAT DUG ダグ バーナー ストーブ チタン UL 軽量" },
  { name: "ポットSET", brand: "DUG", category_id: "cooking", weight_g: 180, search: "ポット SET DUG ダグ クッカー チタン 鍋 セット" },
  // TOAKS チタン
  { name: "チタンポット 550ml", brand: "TOAKS", category_id: "cooking", weight_g: 82, search: "チタンポット トークス TOAKS クッカー チタン 550 UL 軽量" },
  { name: "チタンポット 750ml", brand: "TOAKS", category_id: "cooking", weight_g: 96, search: "チタンポット トークス TOAKS クッカー チタン 750 UL 軽量" },
  // 箸
  { name: "和武器 箸", brand: "Snow Peak", category_id: "cooking", weight_g: 20, search: "和武器 わぶき スノーピーク 箸 カトラリー チタン" },
  { name: "スタックイン 野箸", brand: "mont-bell", category_id: "cooking", weight_g: 14, search: "スタックイン 野箸 モンベル 箸 カトラリー 折りたたみ" },
  // スプーン・フォーク
  { name: "チタンスプーン", brand: "TOAKS", category_id: "cooking", weight_g: 14, search: "チタンスプーン トークス TOAKS カトラリー スプーン チタン UL 軽量" },
  { name: "Alpha Light Long Spoon", brand: "Sea to Summit", category_id: "cooking", weight_g: 12, search: "アルファライト ロングスプーン シートゥサミット カトラリー スプーン 軽量" },
  // 焚き火
  { name: "Picogrill 398", brand: "Picogrill", category_id: "cooking", weight_g: 115, search: "ピコグリル 398 焚き火 グリル 軽量 コンパクト ソロ" },
  { name: "フラットパックポータブルグリル&ファイヤーピット", brand: "UCO", category_id: "cooking", weight_g: 255, search: "フラットパック UCO ポータブルグリル 焚き火 ファイヤーピット" },
  // クッカー追加
  { name: "Ti ウルトラライトクッカー 2", brand: "EVERNEW", category_id: "cooking", weight_g: 104, search: "チタン ウルトラライトクッカー2 エバニュー EVERNEW クッカー UL 軽量 900ml" },
  { name: "Ti ウルトラライトクッカー 3", brand: "EVERNEW", category_id: "cooking", weight_g: 122, search: "チタン ウルトラライトクッカー3 エバニュー EVERNEW クッカー UL 軽量 1300ml" },
  { name: "チタンシングルマグ 300", brand: "Snow Peak", category_id: "cooking", weight_g: 50, search: "チタンシングルマグ 300 スノーピーク マグカップ チタン 軽量 300ml" },
  { name: "チタンポット 1100ml", brand: "TOAKS", category_id: "cooking", weight_g: 122, search: "チタンポット トークス TOAKS クッカー チタン 1100 UL 軽量 大" },
  { name: "タイタンケトル 850ml", brand: "MSR", category_id: "cooking", weight_g: 118, search: "タイタンケトル titan kettle MSR チタン ケトル 軽量 湯沸かし" },
  { name: "Halulite ボイラー 1.1L", brand: "GSI", category_id: "cooking", weight_g: 168, search: "ハルライト halulite ボイラー GSI クッカー 軽量 鍋" },
  // アルコールストーブ・固形燃料追加
  { name: "チタンアルコールストーブ", brand: "EVERNEW", category_id: "cooking", weight_g: 34, search: "チタンアルコールストーブ エバニュー EVERNEW アルスト UL 軽量 チタン" },
  { name: "Caldera Cone System", brand: "Trail Designs", category_id: "cooking", weight_g: 65, search: "カルデラコーン caldera cone トレイルデザインズ アルコールストーブ 風防一体 UL" },
  { name: "Triad Multi-Fuel Stove", brand: "Vargo", category_id: "cooking", weight_g: 28, search: "トライアド triad バーゴ vargo アルコールストーブ マルチフューエル チタン UL" },
  { name: "ポケットストーブ スタンダード", brand: "Esbit", category_id: "cooking", weight_g: 85, search: "エスビット esbit ポケットストーブ 固形燃料 コンパクト 軽量" },
  { name: "固形燃料 ミリタリー 14g×6", brand: "Esbit", category_id: "cooking", weight_g: 84, search: "エスビット esbit 固形燃料 タブレット ミリタリー 着火" },
  // ウッドストーブ
  { name: "Solo Stove Lite", brand: "Solo Stove", category_id: "cooking", weight_g: 255, search: "ソロストーブ solo stove ライト lite ウッドストーブ 二次燃焼 薪" },
  { name: "ナノストーブ G2", brand: "FIREBOX", category_id: "cooking", weight_g: 141, search: "ファイヤーボックス firebox ナノストーブ nano ウッドストーブ 折りたたみ 薪" },
  // テーブル
  { name: "フィールドホッパー ST-630", brand: "SOTO", category_id: "cooking", weight_g: 395, search: "フィールドホッパー field hopper ソト SOTO テーブル 折りたたみ ソロ コンパクト" },
  { name: "オゼン ライト", brand: "Snow Peak", category_id: "cooking", weight_g: 270, search: "オゼン ライト ozen light スノーピーク テーブル 折りたたみ 軽量 A4" },
  // ランタン（テント内用）
  { name: "たねほおずき", brand: "Snow Peak", category_id: "cooking", weight_g: 57, search: "たねほおずき スノーピーク ランタン LED 小型 マグネット テント" },
  { name: "クラッシャブルランタンシェード", brand: "mont-bell", category_id: "cooking", weight_g: 30, search: "クラッシャブルランタンシェード モンベル ヘッドライト 拡散 ランタン化" },
  // フライパン
  { name: "山フライパン 17cm", brand: "UNIFLAME", category_id: "cooking", weight_g: 170, search: "山フライパン ユニフレーム uniflame フライパン 17cm フッ素 アルミ 軽量" },
  { name: "チタントレック フライパン", brand: "Snow Peak", category_id: "cooking", weight_g: 170, search: "チタントレック フライパン スノーピーク チタン 軽量" },
  // ケトル・ポット追加
  { name: "チタンケトル 600ml", brand: "EVERNEW", category_id: "cooking", weight_g: 98, search: "チタンケトル エバニュー EVERNEW ケトル チタン 600 湯沸かし UL" },
  { name: "トレック1400", brand: "Snow Peak", category_id: "cooking", weight_g: 365, search: "トレック1400 スノーピーク クッカー アルミ 鍋 大型" },

  // ═══════════════════════════════════════════
  // 食料 (food)
  // ═══════════════════════════════════════════
  { name: "ナルゲン 広口 1.0L", brand: "Nalgene", category_id: "food", weight_g: 180, search: "ナルゲン nalgene ウォーターボトル 水筒 広口" },
  { name: "ナルゲン 広口 0.5L", brand: "Nalgene", category_id: "food", weight_g: 100, search: "ナルゲン nalgene ウォーターボトル 水筒 500ml" },
  { name: "ハイドラパック シェイプシフト 2L", brand: "HydraPak", category_id: "food", weight_g: 128, search: "ハイドラパック hydrapak ハイドレーション 水筒" },
  { name: "プラティパス ソフトボトル 1L", brand: "Platypus", category_id: "food", weight_g: 26, search: "プラティパス platypus ソフトボトル 軽量 水筒" },
  { name: "ソーヤー ミニ", brand: "Sawyer", category_id: "food", weight_g: 57, search: "ソーヤー sawyer ミニ mini 浄水器 フィルター" },
  { name: "ソーヤー スクイーズ", brand: "Sawyer", category_id: "food", weight_g: 85, search: "ソーヤー sawyer スクイーズ squeeze 浄水器 フィルター" },
  { name: "BeFree 1.0L", brand: "Katadyn", category_id: "food", weight_g: 63, search: "ビーフリー befree カタダイン 浄水器 フィルター" },
  { name: "クリーンカンティーン インスレート 20oz", brand: "Klean Kanteen", category_id: "food", weight_g: 370, search: "クリーンカンティーン kleankanteen 保温 水筒 ボトル" },
  { name: "山専用ボトル FFX-751", brand: "THERMOS", category_id: "food", weight_g: 360, search: "山専用ボトル サーモス thermos 保温 魔法瓶 山専" },
  { name: "山専用ボトル FFX-501", brand: "THERMOS", category_id: "food", weight_g: 280, search: "山専用ボトル サーモス thermos 保温 魔法瓶 500ml" },
  { name: "アルパイン サーモボトル 0.5L", brand: "mont-bell", category_id: "food", weight_g: 265, search: "アルパインサーモボトル モンベル 保温 水筒 魔法瓶" },
  { name: "アルパイン サーモボトル 0.9L", brand: "mont-bell", category_id: "food", weight_g: 360, search: "アルパインサーモボトル モンベル 保温 水筒 魔法瓶 大" },
  { name: "ハイドレーション チューブ 2.0L", brand: "OSPREY", category_id: "food", weight_g: 170, search: "ハイドレーション オスプレー チューブ 水" },
  { name: "プラティパス ビッグジップ EVO 3L", brand: "Platypus", category_id: "food", weight_g: 175, search: "プラティパス platypus ビッグジップ ハイドレーション 3リットル" },
  { name: "ナルゲン オアシス 1.0L", brand: "Nalgene", category_id: "food", weight_g: 150, search: "ナルゲン nalgene オアシス 細口 水筒" },
  { name: "ソフトフラスク 500ml", brand: "Salomon", category_id: "food", weight_g: 30, search: "ソフトフラスク サロモン 水筒 トレラン 軽量" },
  { name: "VESPA HYPER", brand: "VESPA", category_id: "food", weight_g: 30, search: "VESPA ベスパ ハイパー 行動食 補給 エナジージェル サプリ" },
  { name: "Mag-on エナジージェル", brand: "Mag-on", category_id: "food", weight_g: 41, search: "マグオン mag-on エナジージェル 行動食 補給 マグネシウム 疲労" },
  { name: "アミノバイタル ゴールド", brand: "アミノバイタル", category_id: "food", weight_g: 5, search: "アミノバイタル aminovital アミノ酸 行動食 サプリ 疲労回復" },
  { name: "クラシック 1.0L", brand: "STANLEY", category_id: "food", weight_g: 540, search: "スタンレー stanley クラシック 保温 水筒 ボトル 1L" },
  { name: "アルパイン サーモボトル 1.5L", brand: "mont-bell", category_id: "food", weight_g: 540, search: "アルパインサーモボトル モンベル 保温 水筒 魔法瓶 大容量 1.5L" },
  { name: "Dromedary Bag 10L", brand: "MSR", category_id: "food", weight_g: 186, search: "ドロメダリー dromedary MSR 大容量 ウォーターキャリー 水袋 10L" },
  { name: "ウォーターキャリー 2L", brand: "EVERNEW", category_id: "food", weight_g: 55, search: "エバニュー ウォーターキャリー 2L 水袋 軽量 大容量" },
  // 保温ボトル追加
  { name: "山専用ボトル FFX-901", brand: "THERMOS", category_id: "food", weight_g: 390, search: "山専用ボトル サーモス thermos 保温 魔法瓶 900ml 山専 大容量" },
  { name: "マスター真空ボトル 0.75L", brand: "STANLEY", category_id: "food", weight_g: 710, search: "スタンレー stanley マスター master 真空ボトル 保温 頑丈 0.75L" },
  // 浄水器追加
  { name: "BeFree 1L コラプシブルボトル", brand: "KATADYN", category_id: "food", weight_g: 65, search: "カタダイン katadyn ビーフリー befree 1L 浄水器 コラプシブル ソフトボトル" },
  { name: "TrailShot マイクロフィルター", brand: "MSR", category_id: "food", weight_g: 142, search: "トレイルショット trailshot MSR 浄水器 マイクロフィルター ポンプ式" },
  { name: "QuickDraw マイクロフィルター", brand: "Platypus", category_id: "food", weight_g: 64, search: "クイックドロー quickdraw プラティパス 浄水器 マイクロフィルター 軽量" },
  // 行動食
  { name: "えいようかん", brand: "井村屋", category_id: "food", weight_g: 60, search: "えいようかん 井村屋 ようかん 羊羹 行動食 非常食 カロリー 長期保存" },
  { name: "薄皮つぶあんぱん 5個入", brand: "ヤマザキ", category_id: "food", weight_g: 290, search: "薄皮まんじゅう つぶあんぱん ヤマザキ 行動食 パン あんぱん カロリー" },
  { name: "カロリーメイト ブロック", brand: "大塚製薬", category_id: "food", weight_g: 80, search: "カロリーメイト calorie mate 大塚製薬 行動食 栄養補給 バランス食" },
  { name: "inゼリー エネルギー", brand: "森永製菓", category_id: "food", weight_g: 180, search: "inゼリー ウイダー エネルギー 森永 行動食 ゼリー 補給 即効" },
  { name: "トレイルミックス 大袋", brand: "稲葉ピーナツ", category_id: "food", weight_g: 200, search: "トレイルミックス trail mix ナッツ ドライフルーツ 行動食 ミックスナッツ" },
  // フリーズドライ
  { name: "アルファ米 五目ごはん", brand: "尾西食品", category_id: "food", weight_g: 100, search: "尾西 アルファ米 五目ごはん フリーズドライ 非常食 山飯 軽量" },
  { name: "アルファ米 白飯", brand: "尾西食品", category_id: "food", weight_g: 100, search: "尾西 アルファ米 白飯 フリーズドライ 非常食 山飯 軽量" },
  { name: "アルファ米 わかめごはん", brand: "尾西食品", category_id: "food", weight_g: 100, search: "尾西 アルファ米 わかめごはん フリーズドライ 非常食 山飯" },
  { name: "フリーズドライ味噌汁 なす", brand: "アマノフーズ", category_id: "food", weight_g: 9, search: "アマノフーズ amano フリーズドライ 味噌汁 みそ汁 なす 山飯 軽量" },
  { name: "フリーズドライ味噌汁 とうふ", brand: "アマノフーズ", category_id: "food", weight_g: 10, search: "アマノフーズ amano フリーズドライ 味噌汁 みそ汁 とうふ 豆腐 山飯" },

  // ═══════════════════════════════════════════
  // 道具・他 (tools)
  // ═══════════════════════════════════════════
  { name: "モバイルバッテリー 10000mAh", brand: "Anker", category_id: "tools", weight_g: 185, search: "モバイルバッテリー アンカー anker 充電器" },
  { name: "パワーバンク 622", brand: "Anker", category_id: "tools", weight_g: 107, search: "パワーバンク アンカー anker MagSafe 充電" },
  { name: "サバイバルシート", brand: "SOL", category_id: "tools", weight_g: 70, search: "サバイバルシート エマージェンシー SOL ソル 非常用" },
  { name: "ビクトリノックス クラシック", brand: "VICTORINOX", category_id: "tools", weight_g: 22, search: "ビクトリノックス victorinox マルチツール ナイフ" },
  { name: "リペアテープ", brand: "mont-bell", category_id: "tools", weight_g: 20, search: "リペアテープ 補修 モンベル" },
  { name: "パックタオル パーソナル", brand: "PackTowl", category_id: "tools", weight_g: 57, search: "パックタオル packtowl タオル 速乾" },
  { name: "ドライバッグ 10L", brand: "Sea to Summit", category_id: "tools", weight_g: 48, search: "ドライバッグ drybag シートゥサミット 防水 スタッフサック" },
  { name: "モバイルバッテリー 20000mAh", brand: "Anker", category_id: "tools", weight_g: 340, search: "モバイルバッテリー アンカー anker 充電器 大容量 20000" },
  { name: "ナノプレス", brand: "Anker", category_id: "tools", weight_g: 113, search: "ナノプレス アンカー anker 充電器 急速 小型" },
  { name: "ビクトリノックス ハントマン", brand: "VICTORINOX", category_id: "tools", weight_g: 97, search: "ビクトリノックス victorinox ハントマン マルチツール ナイフ" },
  { name: "レザーマン スケルツール", brand: "LEATHERMAN", category_id: "tools", weight_g: 142, search: "レザーマン leatherman スケルツール skeletool マルチツール" },
  { name: "レザーマン シグナル", brand: "LEATHERMAN", category_id: "tools", weight_g: 213, search: "レザーマン leatherman シグナル signal マルチツール アウトドア" },
  { name: "ドライバッグ 20L", brand: "Sea to Summit", category_id: "tools", weight_g: 68, search: "ドライバッグ drybag 20L シートゥサミット 防水 スタッフサック" },
  { name: "ドライバッグ 4L", brand: "Sea to Summit", category_id: "tools", weight_g: 28, search: "ドライバッグ drybag 4L シートゥサミット 防水 小型" },
  { name: "ウルトラSIL ドライサック 8L", brand: "Sea to Summit", category_id: "tools", weight_g: 25, search: "ウルトラシル ultrasil シートゥサミット ドライサック 防水 軽量" },
  { name: "コンプレッションバッグ M", brand: "ISUKA", category_id: "tools", weight_g: 100, search: "コンプレッションバッグ イスカ 圧縮 スタッフサック" },
  { name: "ウルトラライト コンプレッションバッグ", brand: "Sea to Summit", category_id: "tools", weight_g: 60, search: "ウルトラライト コンプレッション シートゥサミット 圧縮 軽量" },
  { name: "パックタオル オリジナル L", brand: "PackTowl", category_id: "tools", weight_g: 128, search: "パックタオル packtowl タオル 速乾 大判" },
  { name: "N-rit セームタオル L", brand: "N-rit", category_id: "tools", weight_g: 38, search: "エヌリット セームタオル 速乾 コンパクト" },
  { name: "ガベッジバッグ 4L", brand: "mont-bell", category_id: "tools", weight_g: 20, search: "ガベッジバッグ ゴミ袋 モンベル 防水" },
  { name: "サコッシュ", brand: "mont-bell", category_id: "tools", weight_g: 65, search: "サコッシュ モンベル ショルダーバッグ 小物入れ" },
  { name: "トラベルキット パック S", brand: "mont-bell", category_id: "tools", weight_g: 45, search: "トラベルキット モンベル ポーチ 小物整理" },
  { name: "ランタン ほおずき", brand: "Snow Peak", category_id: "tools", weight_g: 165, search: "ほおずき スノーピーク ランタン LEDランタン" },
  { name: "ゴールゼロ LIGHTHOUSE micro", brand: "Goal Zero", category_id: "tools", weight_g: 68, search: "ゴールゼロ goalzero ライトハウス マイクロ ランタン LED" },
  { name: "レッドレンザー ML4", brand: "Ledlenser", category_id: "tools", weight_g: 71, search: "レッドレンザー ledlenser ML4 ランタン LED コンパクト" },
  { name: "Nomad 10 ソーラーパネル", brand: "Goal Zero", category_id: "tools", weight_g: 450, search: "ノマド nomad ゴールゼロ goalzero ソーラーパネル 充電" },
  { name: "座布団 ULコンフォートシステム", brand: "mont-bell", category_id: "tools", weight_g: 55, search: "座布団 ざぶとん モンベル UL コンフォート" },
  { name: "折りたたみ座布団", brand: "THERMAREST", category_id: "tools", weight_g: 60, search: "座布団 Zシート サーマレスト 折りたたみ" },
  { name: "ダクトテープ コンパクト", brand: "Gear Aid", category_id: "tools", weight_g: 30, search: "ダクトテープ ギアエイド gearaid 補修 リペア テープ" },
  { name: "テントポール リペアスプリント", brand: "MSR", category_id: "tools", weight_g: 30, search: "テントポール リペア MSR 補修 スプリント" },
  { name: "パーフェクトポーション アウトドアボディスプレー", brand: "Perfect Potion", category_id: "tools", weight_g: 100, search: "パーフェクトポーション 虫よけ 虫除け スプレー 天然 アウトドア" },
  { name: "おにやんま君", brand: "おにやんま君", category_id: "tools", weight_g: 5, search: "おにやんま君 虫よけ 虫除け オニヤンマ トンボ 装着型" },
  { name: "GoPro HERO13 Black", brand: "GoPro", category_id: "tools", weight_g: 154, search: "ゴープロ gopro HERO アクションカメラ 動画 防水" },
  { name: "キャプチャー V3", brand: "Peak Design", category_id: "tools", weight_g: 88, search: "ピークデザイン peak design キャプチャー capture カメラホルダー ショルダー" },
  { name: "ナイトアイズ フィギュア9 カラビナ", brand: "Nite Ize", category_id: "tools", weight_g: 18, search: "ナイトアイズ niteize フィギュア9 figure9 カラビナ ロープ" },
  { name: "パラコード 30m", brand: "ATWOOD ROPE", category_id: "tools", weight_g: 200, search: "パラコード paracord アットウッド ロープ コード 汎用" },
  { name: "エアロウルトラ枕", brand: "Sea to Summit", category_id: "tools", weight_g: 57, search: "シートゥサミット エアロウルトラ aero ultra 枕 ピロー 軽量" },
  { name: "Xカップ 300ml", brand: "Sea to Summit", category_id: "tools", weight_g: 56, search: "シートゥサミット X カップ xcup シリコン 折りたたみ コップ" },
  { name: "ドライバッグ 防水ケース S", brand: "mont-bell", category_id: "tools", weight_g: 30, search: "モンベル 防水ケース ドライバッグ 防水 スマホ 書類" },
  { name: "ウルトラSIL ナノ ドライサック 2L", brand: "Sea to Summit", category_id: "tools", weight_g: 12, search: "シートゥサミット ウルトラシル ナノ nano ドライサック 防水 超軽量" },
  { name: "携帯トイレ WCH-500", brand: "ティエラ", category_id: "tools", weight_g: 60, search: "携帯トイレ 山岳 トイレ 凝固剤 緊急 ビバーク" },
  { name: "O.D.トイレキット", brand: "mont-bell", category_id: "tools", weight_g: 80, search: "モンベル O.D. トイレキット 携帯トイレ 山岳 アウトドア" },
  { name: "スタッフバッグ 4L", brand: "mont-bell", category_id: "tools", weight_g: 25, search: "モンベル スタッフバッグ 収納袋 軽量 防水" },
  { name: "Air Stream Dry Sack 8L", brand: "Granite Gear", category_id: "tools", weight_g: 42, search: "グラナイトギア エアストリーム ドライサック スタッフサック 防水 軽量" },
  { name: "ヘルメットホルダー", brand: "mont-bell", category_id: "tools", weight_g: 40, search: "モンベル ヘルメットホルダー ザック 固定 登山ヘルメット" },
  { name: "スキンクリーム UV", brand: "finetrack", category_id: "tools", weight_g: 30, search: "ファイントラック 日焼け止め UV スキンクリーム 紫外線 山岳" },
  { name: "ワセリン 皮膚保護クリーム", brand: "Vaseline", category_id: "tools", weight_g: 50, search: "ワセリン vaseline 皮膚保護 靴擦れ 防止 スキンケア 保湿" },
  // ソーラーパネル追加
  { name: "SolarPanel 5+", brand: "BioLite", category_id: "tools", weight_g: 390, search: "バイオライト biolite ソーラーパネル5 太陽光 充電 ソーラー" },
  { name: "625 Solar Panel", brand: "Anker", category_id: "tools", weight_g: 350, search: "アンカー anker 625 ソーラーパネル 太陽光 充電 ソーラー 折りたたみ" },
  // モバイルバッテリー追加
  { name: "NB10000", brand: "Nitecore", category_id: "tools", weight_g: 150, search: "ナイトコア nitecore NB10000 モバイルバッテリー 10000mAh 軽量 コンパクト ランタン" },
  // チェア
  { name: "チェアワン", brand: "Helinox", category_id: "tools", weight_g: 890, search: "ヘリノックス helinox チェアワン chair one 折りたたみ椅子 軽量 キャンプ" },
  { name: "チェアゼロ", brand: "Helinox", category_id: "tools", weight_g: 490, search: "ヘリノックス helinox チェアゼロ chair zero 折りたたみ椅子 UL 超軽量" },
  { name: "L.W.トレールチェア 26", brand: "mont-bell", category_id: "tools", weight_g: 530, search: "モンベル トレールチェア trail chair 折りたたみ椅子 軽量 登山" },
  // 三脚
  { name: "Travel Tripod", brand: "Peak Design", category_id: "tools", weight_g: 1270, search: "ピークデザイン peak design トラベル三脚 travel tripod カメラ 軽量 コンパクト" },
  { name: "GorillaPod 1K Kit", brand: "Joby", category_id: "tools", weight_g: 197, search: "ジョビー joby ゴリラポッド gorillapod 三脚 フレキシブル カメラ コンパクト" },
  // 時計・GPS
  { name: "Vertical", brand: "SUUNTO", category_id: "tools", weight_g: 74, search: "スント suunto バーティカル vertical GPS ウォッチ 時計 登山 高度計 コンパス" },
  { name: "fenix 7X Sapphire Solar", brand: "GARMIN", category_id: "tools", weight_g: 89, search: "ガーミン garmin フェニックス fenix 7X GPS ウォッチ 時計 登山 ソーラー" },
  // 双眼鏡
  { name: "Sportstar EX 8x25", brand: "Nikon", category_id: "tools", weight_g: 300, search: "ニコン nikon スポーツスター sportstar 双眼鏡 8倍 コンパクト 野鳥" },
  { name: "アトレックライト HR 8x21WP", brand: "VIXEN", category_id: "tools", weight_g: 185, search: "ビクセン vixen アトレックライト atrek light 双眼鏡 防水 コンパクト 軽量" },
  // レスキュー・安全
  { name: "ココヘリ 会員発信機", brand: "ココヘリ", category_id: "tools", weight_g: 20, search: "ココヘリ cocoheli 発信機 捜索 遭難 レスキュー ヘリ 位置情報" },
  { name: "ResQLink View PLB", brand: "ACR", category_id: "tools", weight_g: 142, search: "レスキューリンク resqlink PLB ACR 緊急発信器 遭難 救助 SOS ビーコン" },
  // 虫よけ追加
  { name: "おすだけノーマット スプレータイプ", brand: "アース製薬", category_id: "tools", weight_g: 120, search: "おすだけノーマット アース 虫よけ 虫除け スプレー テント内 蚊" },
  { name: "パワー森林香", brand: "富士錦", category_id: "tools", weight_g: 230, search: "パワー森林香 富士錦 蚊取り線香 虫よけ アウトドア 防虫 強力" },
  // 洗面・衛生
  { name: "Pocket Soap 50枚", brand: "Sea to Summit", category_id: "tools", weight_g: 25, search: "シートゥサミット ポケットソープ pocket soap 紙石鹸 携帯 衛生 軽量" },
  { name: "O.D.タオル M", brand: "mont-bell", category_id: "tools", weight_g: 42, search: "モンベル O.D.タオル OD towel 速乾 タオル コンパクト アウトドア" },
  // 熊鈴
  { name: "消音熊鈴", brand: "東京ベル", category_id: "tools", weight_g: 40, search: "熊鈴 くまよけ ベアベル 消音 東京ベル bear bell 野生動物" },
  { name: "熊よけ鈴 ガーディアン", brand: "mont-bell", category_id: "tools", weight_g: 50, search: "モンベル 熊鈴 熊よけ ベアベル ガーディアン guardian 消音" },
];
