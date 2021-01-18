Build fe
```
npm run build
```
Start nginx
```
docker build . -t nginx-test && docker run -p 8000:80 nginx-test
```
