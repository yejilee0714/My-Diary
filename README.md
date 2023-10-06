# 월간 스토리 (月間 story)
배포 링크 : https://bunnystory.netlify.app/

```
테스트 계정
ID : bunny@test.com
PW : bunny123
``` 

## 목차
1. [프로젝트 소개](#intro)
2. [기술 환경](#tech)
3. [작업 관리](#task)
4. [주요 기능](#mainFunction)
5. [페이지 기능](#pageFunction)
6. [개선 사항](#improvements)


## <span id = "intro">1. 프로젝트 소개
- 달에 살고 있는 토끼 이야기를 모티브로 한 달 동안의 **'월간(月間)'** 과 자신의 이야기를 기록하자는 **'스토리'** 를 합쳐서 월간스토리를 만들었습니다.
- 월간스토리는 한 달 동안의 자신의 이야기를 기록할 수 있는 다이어리 어플입니다. 일기 및 todo-list를 기록할 수 있습니다. 사용자들이 어플을 통해 매일 일상을 기록하고 할 일을 정리해서 목표 달성 및 계획 수립에 도움을 주기 위해 개발하였습니다.

## <span id = "tect">2. 기술 환경
### [개발 기간]
- 총 개발 기간 : 2023.08.13 ~ 2023.08.
- 프로젝트 기획 단계 : 2023.08.13 ~ 2023.08.15
- 개발 단계 : 2023.08.15 ~ 2023.09

### [기술 스택]
| 모듈명 | 용도  |
| --------------------- | ---------------------------|
| 프론트엔드  | <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black"> <img src="https://img.shields.io/badge/styled-components-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=pink">
| 백엔드  | <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=Firebase&logoColor=black">  |
| 도구 및 라이브러리  | <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white"> <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white"> <img src="https://img.shields.io/badge/Visual Studio Code-007ACC?style=for-the-badge&logo=Visual Studio Code&logoColor=white"> <img src="https://img.shields.io/badge/NPM-CB3837?style=for-the-badge&logo=NPM&logoColor=white"> 
| 디자인  | <img src="https://img.shields.io/badge/Figma-FBCEB1?style=for-the-badge&logo=Figma&logoColor=black">                                                                                                                                                                

## <span id = "task">3. 직업 관리
### [작업 관리]

### [커밋 컨벤션]
```
add : 새로운 기능 추가
fix : 버그 수정(단순 수정 X), 충돌 해결
docs : 문서 수정
chore : 코드의 논리에 영향이 없는 작업. 변수명 변경 등등
design : 마크업 및 디자인 구현, 변경
rename : 파일 이름의 변경 or 파일의 이동
remove : 파일의 삭제
refactor : 리팩토링
test : 테스트 관련 코드 추가 및 삭제 등
comment : 필요한 주석 추가 및 변경
```
### [코드 컨벤션]


## <span id = "mainFunction">4. 주요 기능
- 로그인 / 회원가입
    - 로그인
    - 회원가입
    - 유효성 검사
    - 프로필 설정
- 캘린더(홈)
    - 오늘의 일기, todo-list 미리 보기
    - 날짜 선택 시 선택된 날에 작성된 일기, todo-list 불러오기
- 일기
    - 오늘 경험한 일 작성
    - 오늘을 기억할 수 있는 하나의 사진 등록
    - 작성한 글 수정 및 삭제
- TODO-LIST
    - 오늘 할 일 작성
    - 작성한 글 수정 및 삭제
- 상단 탭
    - 프로필 미리보기
    - 모달창
        - 프로필 수정
        - 로그아웃
        - 모달창 닫기

## <span id = "pageFunction">5. 페이지 기능


## <span id = "improvements">6. 개선 사항
- Lighthouse를 통해 성능 개선하기
- 작성된 일기 혹은 todo-list가 있는 경우 해당 날짜에 표시하기
- 선택한 날짜에 해당하는 일기 혹은 todo-list 사항을 수정할 수 있도록