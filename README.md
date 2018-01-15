# Automatic bitcoin trader

## How to use

取引所としてCoincheckを使用しているため、Coincheckの登録等を済ませておいてください。

Coincheckの設定画面から  
`APIキー -> 新たにAPIキーを追加する`  
から、APIキーを作成してください。

パーミッションは以下を選択してください

* 注文
  * 新規注文
  * 未決済の注文一覧
  * 注文のキャンセル
  * 取引履歴
* アカウント
  * 残高

作成したAPIキーを`.env.sample`をコピーした`.env`に記入してください。

その後`npm start`を実行するとプログラムがスタートします。
