---
title: "Minecraft Paper / Foliaで武器の「属性スワップ」を有効化・復活させる設定方法"
description: "PaperやFoliaサーバーにおいて、攻撃の瞬間に別アイテムへ持ち替えて効果を乗せる「属性スワップ（Attribute Swapping）」を有効化する設定手順と注意点を解説します。"
pubDate: 2026-10-23
heroImage: "/images/cover.jpg"
tags: ["Minecraft", "PaperMC", "Folia", "サーバー設定"]
pinned: true
likes: 0
---

MinecraftのPVPサーバーやテクニカルサーバーを運用していると、「PaperやFoliaにアップデートしたら、バニラで使えていた**属性スワップ（Attribute Swapping / 武器スワップ）**ができなくなった」という声に直面することがあります。

近年のPaperおよびFolia（バージョン26系以降の最新ビルド群）では、非同期マルチスレッド処理の安全性担保やエクスプロイト対策の統合が進み、従来の個別オプション（`legacy-item-attributes` など）が整理されました。その結果、デフォルトでは属性スワップがブロックされる挙動が標準となっています。

本記事では、最新のPaper / Folia環境において属性スワップを安全に有効化する設定手順と、アンチチートプラグイン等と連携する際の注意点について詳しく解説します。

---

## 1. 属性スワップとは？ なぜデフォルトで制限されるのか

### 属性スワップ（Attribute Swapping）の仕組み
属性スワップとは、攻撃やアクションを入力した**直後の極めて短いフレーム（ミリ秒単位）**でホットバーの別アイテムへ持ち替えることで、持ち替え前の武器が持つ攻撃力・属性・エンチャント効果やノックバックを攻撃判定に乗せるバニラの挙動・テクニックです。

メイスの落下ダメージや特定の特殊効果を組み合わせたコンボなど、PVPやテクニカルな戦闘コミュニティでは親しまれている仕様の一つです。

### Paper / Foliaで制限される背景
PaperやFoliaは、サーバーの高速化とバグ対策を徹底的に行うサーバーソフトウェアです。
プレイヤーがアイテムを高速で切り替えた際に発生するパケットの順序やタイミングのズレは、マルチスレッド環境（特にFoliaのリージョン分割非同期駆動）において**アイテム複製バグ**や**データ不整合**の引き金になり得ます。

そのため、Paperでは「プレイヤーのアクション発生時に装備ステータスを即座に再同期・検証するパッチ」が標準で有効化されており、この検証処理によって属性スワップが成立しなくなっています。

---

## 2. 解決策：`paper-global.yml` の設定変更

属性スワップを許可するには、グローバル設定ファイル内の「未サポート設定（unsupported-settings）」を1箇所変更するだけで対応可能です。

### 対象設定ファイル
サーバーディレクトリ直下の以下のファイルを開きます：

```text
config/paper-global.yml
```

### 変更する項目
`unsupported-settings` セクション内にある **`update-equipment-on-player-actions`** を `false` に変更します。

```yaml
unsupported-settings:
  update-equipment-on-player-actions: false
```

- **`true`（デフォルト）**：プレイヤーのアクション時に装備ステータスを厳格に更新・検証（属性スワップを防止）。
- **`false`**：検証をスキップし、バニラ通りの属性スワップや高速持ち替えの挙動を許可。

---

## 3. 具体的なYAML設定例

以下は、`config/paper-global.yml` 内の `unsupported-settings` ブロックの記述例です。

他の危険なエクスプロイト（TNT増殖や岩盤破壊バグなど）は安全に塞いだまま、**属性スワップのみをピンポイントで有効化**する推奨設定となっています。

```yaml
unsupported-settings:
  allow-headless-pistons: false
  allow-permanent-block-break-exploits: false
  allow-piston-duplication: false
  perform-username-validation: true
  update-equipment-on-player-actions: false
```

### 他の設定項目との兼ね合い

| 設定項目 | 推奨値 | 概要 |
| :--- | :---: | :--- |
| `update-equipment-on-player-actions` | **`false`** | **属性スワップの有効化**。PVPサーバーでスワップを許可する場合はこれのみを変更。 |
| `allow-piston-duplication` | `false` | ピストンによるTNT・レール・カーペットの増殖。許可しない場合は `false` のままに。 |
| `allow-headless-pistons` | `false` | ヘッドのないピストンによる岩盤・ポータル破壊。ワールド保護のため `false` 推奨。 |
| `allow-permanent-block-break-exploits` | `false` | エンドポータルや岩盤の破壊エクスプロイトの許可フラグ。通常は `false`。 |

> **Point:**  
> Paperでは「バニラのエクスプロイトや未検証の挙動」を意図的に復活させる設定がすべて `unsupported-settings` にまとめられています。不要な項目まで `true` にしてしまうとワールド破壊やサーバー負荷の原因になるため、必要な項目のみを切り替えるようにしましょう。

---

## 4. 注意点・トラブルシューティング

設定を変更した後は、以下の2点に注意してください。

### ① `/paper reload` ではなく「サーバーの完全再起動」が必要
`config/paper-global.yml` 内の設定（特に `unsupported-settings`）は、**サーバーの起動シーケンス時のみ**に読み込まれる内部コンポーネントと深く結びついています。

ゲーム内やコンソールから `/paper reload` を実行しても、この設定は反映されません。
必ずコンソールから `stop` または `restart` コマンドを実行し、サーバープロセスを一度終了させてから再起動してください。

```bash
# コンソールでの安全な再起動
stop
```

### ② アンチチートプラグイン（GrimAC等）による誤検知
サーバー側で Paper の制限を解除しても、導入しているアンチチートプラグインによって攻撃が無効化されるケースがあります。

特に **GrimAC** などの最新パケットベースのアンチチートでは、同一tick内や極端に短いパケット間隔での「スロット切り替え ＋ 攻撃」が以下のチェック項目に引っかかることがあります：

- **`FastClick` / `FastSwitch`**（異常に速いアイテム持ち替えやクリックの検知）
- **`BadPackets`**（不自然な順序で送られてきたパケットの破棄）
- **`Interact` / `Reach`**（攻撃判定の不整合によるキャンセル）

#### 対処法
もしプレイヤーが「属性スワップしようとすると攻撃が空振りする・ダメージが入らない・巻き戻る（Setback）」と報告してきた場合は、アンチチートのログを確認してください。

GrimAC を使用している場合は、`plugins/GrimAC/config.yml` 内で該当のチェック項目を緩和するか、PVPエリアや特定ゲームモードにおいて除外（exempt）設定を行う必要があります。

---

## まとめ

1. **設定場所**: `config/paper-global.yml`
2. **変更内容**: `unsupported-settings.update-equipment-on-player-actions` を `false` に設定
3. **反映方法**: サーバーを完全に再起動（`stop` ➔ 起動）
4. **注意点**: GrimAC等のアンチチートプラグインがスワップ動作を検知して遮断していないか確認

最新の Paper / Folia 環境でも、適切な設定を行うことでバニラ特有の奥深いPVPコンボやテクニカルな操作感を保ちながらサーバーを運用できます。サーバーのプレイスタイルに合わせてぜひ調整してみてください。
