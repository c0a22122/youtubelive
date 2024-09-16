VTuber 配信一覧表示 & 配信登録フォーム
このプロジェクトは、以下の2つの主要な機能を提供します：

配信一覧表示: YouTube APIを使用して現在配信中のVTuberチャンネルの情報を取得し、一覧で表示します。配信中のチャンネル情報は1時間ごとに更新されます。
配信登録フォーム: VTuberの配信情報を登録し、Google Sheetsに保存するためのフォームを提供します。ユーザーは、活動名、YouTube URL、およびX（旧Twitter）URLを入力して情報を送信できます。
機能
配信中のVTuberチャンネルの表示
YouTube APIを通じて取得: 現在配信中のVTuberチャンネルをリアルタイムで取得します。
情報表示: チャンネル名、配信タイトル、サムネイル画像を表示します。
自動更新: チャンネル情報は1時間ごとに自動更新されます。
配信登録フォーム
情報入力: 配信活動名、YouTube URL、X（旧Twitter）URLを入力して送信します。
Google Sheetsに保存: 入力された情報はGoogle Sheetsに保存されます。
必要なもの
Node.js
React
YouTube Data API v3
Google Apps Script
Google Sheets
