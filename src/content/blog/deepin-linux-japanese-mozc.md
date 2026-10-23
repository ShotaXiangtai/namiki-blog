---
title: "Deepin Linuxで日本語入力（Mozc）と日本語キーボード配列を設定する"
description: "DeepinにMozcをインストールして日本語入力できるようにしたものの、再起動するたびにキーボード配列が英語（US）に戻ってしまう問題の解決策をまとめました。"
pubDate: 2026-04-02
tags: ["Linux", "Deepin", "Mozc"]
pinned: false
likes: 0
---

DeepinにMozcをインストールして日本語入力できるようにしたものの、再起動するたびにキーボード配列が英語（US）に戻ってしまう——そんな問題に遭遇したので、解決策も含めてまとめます。

---

## 環境

- **OS**：Deepin Linux（Debianベース）
- **入力フレームワーク**：fcitx5
- **日本語IME**：Mozc

---

## 1. Mozc（fcitx5）のインストール

まずパッケージを更新して、fcitx5とMozcをインストールします。

```bash
sudo apt update
sudo apt install fcitx5 fcitx5-mozc fcitx5-configtool
```

次に、システムの入力メソッドをfcitx5に設定します。

```bash
im-config -n fcitx5
```

### fcitx5の設定

ターミナルで設定ツールを起動します。

```bash
fcitx5-configtool
```

「入力メソッド」タブで「+」ボタンをクリックし、「Mozc」を追加します。リストの順番は **Mozc を上** にしておくと使いやすいです。

設定後、一度ログアウト＆ログインするか再起動します。

### 環境変数の設定（アプリで日本語入力できない場合）

`~/.xprofile` に以下を追記すると、GTKやQtアプリでもMozcが効くようになります。

```bash
echo 'export GTK_IM_MODULE=fcitx5
export QT_IM_MODULE=fcitx5
export XMODIFIERS=@im=fcitx5' >> ~/.xprofile
```

---

## 2. キーボード配列が再起動後に英語配列に戻る問題

ここが一番の罠でした。

### 原因

DeepinのDE（DDE）がログイン時にキーボード配列を上書きしてしまいます。そのため、autostart の `.desktop` ファイルや `~/.xprofile` に `setxkbmap` を書いても、DDEに上書きされて無効になります。

また、DebianベースのDeepinでは `localectl` によるX11設定もできません。

```bash
$ sudo localectl --no-convert set-x11-keymap jp jp106
Setting X11 and console keymaps is not supported in Debian.
```

### 解決策：systemdユーザーサービスで遅延実行する

DDEの初期化が完了した**あと**に `setxkbmap` を実行することで、上書きに勝てます。`sleep 5` で少し待ってから適用するのがポイントです。

```bash
mkdir -p ~/.config/systemd/user
cat > ~/.config/systemd/user/setxkbmap-jp.service << 'EOF'
[Unit]
Description=Force JP keyboard layout after DDE loads
After=graphical-session.target

[Service]
Type=oneshot
ExecStartPre=/bin/sleep 5
ExecStart=/usr/bin/setxkbmap -model jp106 -layout jp
RemainAfterExit=yes

[Install]
WantedBy=graphical-session.target
EOF

systemctl --user enable setxkbmap-jp.service
```

あとは再起動するだけで、ログインのたびに自動で日本語配列が適用されます。

> **Note:** 環境によっては `sleep 5` では短すぎることがあります。その場合は `sleep 10` に増やしてみてください。

---

## まとめ

| 問題 | 原因 | 解決策 |
| :--- | :--- | :--- |
| **日本語が入力できない** | fcitx5 / Mozcが未設定 | `apt install fcitx5 fcitx5-mozc` → `im-config -n fcitx5` |
| **再起動後に英語配列に戻る** | DDEがキーボード配列を上書き | systemdユーザーサービスで遅延実行 |
| **localectlが使えない** | Debianベースの制限 | xorg.conf.d または上記のsystemd方式で対処 |

Deepinのキーボード周りはバグが多く、DDEとの相性問題で単純な設定が効かないケースが多いです。同じ問題で困っている方の参考になれば幸いです。
