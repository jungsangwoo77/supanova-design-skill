---
version: alpha
name: TECH-ON Approval Drawing
description: 제어반 승인도서 형식을 따르는 산업용 B2B 제조사 디자인 시스템
colors:
  paper: "#E9E6DE"
  paper-hi: "#F4F2EC"
  ink: "#15171A"
  ink-2: "#45474B"
  ink-3: "#62646A"
  rule: "#C9C5BC"
  accent: "#A83E1A"
  accent-ink: "#FBF7F4"
typography:
  h1:
    fontFamily: Pretendard
    fontSize: 72px
    fontWeight: 600
    lineHeight: 1.15
  body:
    fontFamily: Pretendard
    fontSize: 18px
    lineHeight: 1.7
  label-caps:
    fontFamily: Geist Mono
    fontSize: 12px
    letterSpacing: 0.15em
rounded:
  none: 0px
  frame: 4px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 32px
  xl: 64px
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-ink}"
    rounded: "{rounded.none}"
    padding: 16px
  caption:
    textColor: "{colors.ink-3}"
    typography: "{typography.label-caps}"
---

## Overview

제어반 승인도서(approval drawing set) 한 부처럼 — 표지·도번·개정란이 있고, 선은 얇고,
주장은 표로 증명된다. 지배 요소는 데이터(수치와 표)이고 타이포와 여백이 조연이다.

## Colors

그레이스케일이 위계를 담당하고, 액센트는 "지금 살아 있는 것"에만 쓴다.

- **paper (#E9E6DE):** 본문 용지. 순수 흰색을 쓰지 않는다.
- **ink (#15171A):** 제목과 수치. 순수 검정이 아니다.
- **ink-3 (#62646A):** 캡션·라벨. 용지 위에서 본문 대비를 유지한다.
- **accent (#A83E1A):** CTA·포커스·개정 마크에만. 지면의 1% 미만.

## Do's and Don'ts

- 그라디언트·그림자·카드 컴포넌트를 쓰지 않는다. 구획은 1px 규칙선과 여백으로만 만든다.
- 모서리 반경은 이미지 프레임 하나에만 허용한다.
- 액센트를 장식으로 쓰지 않는다. 판정·상태를 가리킬 때만 쓴다.
