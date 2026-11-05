# 리컴프 로그북 (폰 설치용)

기록은 폰 안(브라우저 저장소)에만 저장되는 앱이에요. 서버도, 로그인도 없어요.

## 1. GitHub Pages에 올리기 (약 10분)

1. GitHub에서 새 저장소를 만들어요. 예: `recomp`
   - 무료 계정은 **Public**이어야 Pages가 켜져요. 코드만 공개되고 기록은 각자 폰에만 있으니 괜찮아요.
2. 이 폴더의 파일 전부를 저장소 맨 위(루트)에 올려요.
   - 웹에서: 저장소 → Add file → Upload files → 파일 전부 끌어다 놓기 → Commit
   - 터미널에서:
     ```
     git init && git add . && git commit -m "recomp logbook"
     git branch -M main
     git remote add origin https://github.com/<내아이디>/recomp.git
     git push -u origin main
     ```
3. 저장소 → Settings → Pages → Source를 **Deploy from a branch**, Branch를 **main / (root)**로 저장해요.
4. 1~2분 뒤 `https://<내아이디>.github.io/recomp/` 주소가 생겨요.

## 2. 폰에 설치하기

- **아이폰**: Safari로 주소 열기 → 공유 버튼 → **홈 화면에 추가**
  (Chrome 등 다른 브라우저 말고 Safari에서 해야 해요)
- **안드로이드**: Chrome으로 주소 열기 → 메뉴(⋮) → **앱 설치** 또는 **홈 화면에 추가**

설치 후에는 홈 화면 아이콘으로 열면 돼요. 한 번 열어두면 인터넷이 없어도 열려요.

## 3. 백업 (중요)

기록은 그 폰에만 있어요. 아래 경우에는 지워질 수 있어요.

- 폰을 바꿀 때
- 앱(홈 화면 아이콘)을 삭제할 때
- 브라우저의 사이트 데이터를 지울 때
- 아이폰에서 앱을 아주 오래 안 열었을 때

그래서 **한 달에 한 번, 인바디 재는 날** `변화` 탭 맨 아래에서 **백업 저장**을 눌러 파일을 카카오톡 나에게 보내기나 구글 드라이브에 저장해두세요. 새 폰에서는 **백업 불러오기**로 그대로 복원돼요. **엑셀용 CSV**는 기록을 엑셀에서 보고 싶을 때 써요.

## 4. 앱을 수정했을 때

`index.html`을 고쳐서 다시 올릴 때는 `sw.js` 맨 위의 `recomp-v1`을 `recomp-v2`처럼 올려주세요. 그래야 폰이 새 버전을 받아요. 기록은 그대로 남아요.

## 파일 구성

| 파일 | 역할 |
| --- | --- |
| index.html | 앱 전체 (화면, 기록, 백업) |
| manifest.webmanifest | 앱 이름, 아이콘, 설치 정보 |
| sw.js | 오프라인 실행용 캐시 |
| icon-*.png, apple-touch-icon.png | 홈 화면 아이콘 |
