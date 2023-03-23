# Dockerfile
FROM node:16

# 必要なパッケージをインストール
RUN apt-get update && apt-get install -y \
  curl \
  git \
  emacs-nox \
  && rm -rf /var/lib/apt/lists/*

# 作業ディレクトリの設定
WORKDIR /workspace
