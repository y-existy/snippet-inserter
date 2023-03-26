# 使用するベースイメージ
FROM ubuntu:20.04

ENV DEBIAN_FRONTEND=noninteractive

# 必要なパッケージをインストール
RUN apt update
RUN apt install -y curl git emacs-nox
RUN curl -fsSL https://deb.nodesource.com/setup_current.x | bash -
RUN apt install -y nodejs
RUN apt clean && rm -rf /var/lib/apt/lists/*

# vsce インストール
RUN npm install -g vsce

# 作業ディレクトリを設定
WORKDIR /workspace

# Docker コンテナー内で使用するコマンド
CMD ["bash"]