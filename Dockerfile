# ベースイメージに軽量なNginxを使用
FROM nginx:alpine

# publicフォルダの中身をNginxのルートディレクトリへコピー
COPY ./public /usr/share/nginx/html
