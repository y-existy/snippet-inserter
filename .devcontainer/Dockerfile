# Dockerfile
FROM node:18

# パッケージインストール
RUN apt-get update \
    && apt-get install -y git

# ユーザー設定
ARG USER="node"
USER $USER

# ワークスペース設定
WORKDIR /workspace

ENV NPM_CONFIG_PREFIX=/home/$USER/.npm-global
ENV PATH="/home/${USER}/.npm-global:${PATH}"

# エイリアス設定
RUN echo "alias ll='ls -al'" >> /home/$USER/.bashrc

# ライブラリインストール
RUN npm install -g npm \
    && npm install -g vsce generator-code yo