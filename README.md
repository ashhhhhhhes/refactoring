# Refactoring

Refactoring 2판

Javascript + Typescript

```
// Typescript 빌드 및 변경 사항 실행
npm run watch 
```

package.json

```
{
    "scripts" {
        // watch - 성공시 실행할 파일 경로는 아래에서 설정 하세요.
        "watch": "tsc-watch --onSuccess \"node dist/src/CHAPTER_01/index.js\"", 
        ...
    }
}
```