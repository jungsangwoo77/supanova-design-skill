# CLAUDE.md

## 스킬 자동 적용 원칙

사용자는 `/스킬명` 명령을 입력하지 않는다. 요청 내용으로 적용할 스킬을 스스로 판단해, 답변·작업 전에 Skill 도구로 먼저 로드한다.

- `UserPromptSubmit` 훅(`.claude/hooks/skill-router.py`)이 키워드로 후보 스킬을 `[자동 스킬 라우팅]` 컨텍스트로 주입한다. 주입된 스킬은 순서대로 로드한다.
- 훅이 아무것도 주입하지 않아도, 아래 판단 기준이나 각 스킬 description에 해당하면 스킬을 로드한다.
- 스킬 사용 여부를 사용자에게 묻지 않는다. 단, `design-router`처럼 스킬 자체가 확인 질문을 요구하는 경우는 그 지침을 따른다.
- 여러 스킬이 겹치면 **더 구체적인 스킬**을 우선한다.

## 판단 기준 (구체적 → 일반적)

| 상황 | 우선 스킬 | 대체되는 일반 스킬 |
|---|---|---|
| 테크온·TECH-ON VINA 연결정산표 | `techon-consolidated` | `consolidated-fs` |
| 베트남 법인 제조원가명세서·TK627 | `vas-manufacturing-cost` | `vietnam-finance` |
| 베트남 법인 세무·VAS·송금·이전가격 | `vietnam-finance` | `korean-finance-expert` |
| 연결재무제표·지분법·내부거래 제거 | `consolidated-fs` | `korean-finance-expert` |
| 자금시제·자금수지·유동성 | `cash-management` | — |
| 경영실적·결산·예산 대비 보고서(1장) | `fin-report-a4` | `a4-onepager`, `design-router` |
| 주간회의자료·주간업무보고 | `weekly-meeting-deck` | `pptx`, `design-router` |
| NDA·JDA·기술계약 검토 | `nda-jda-rights-review` | — |
| K-IFRS/K-GAAP 해석, 밸류에이션, IPO, RCPS | `korean-finance-expert` | — |
| 공시·재무제표 조회 | `k-dart` | — |
| 법령·조문 근거 | `korean-law-search` | — |
| 산출물 형식(xlsx/pptx/docx/pdf/hwp) | 해당 파일 스킬 | 도메인 스킬과 **병행** |
| 랜딩페이지 신규 / 개선 | `supanova-design-engine` / `supanova-redesign-engine` | `design-router` |
| 형식 미정의 디자인·문서 산출물 | `design-router` | — |

도메인 스킬(무엇을 계산·판단할지)과 파일 형식 스킬(어떻게 산출할지)은 함께 로드한다. 예: 연결정산표 엑셀 작업 → `techon-consolidated` + `xlsx`.

## 규칙 관리

- 키워드·우선순위는 `.claude/skill-routes.json`에서 수정한다. `priority`가 높을수록 먼저, `suppresses`에 적힌 스킬은 해당 규칙이 매칭되면 제외된다.
- 영문 약어 키워드는 단어 경계로 매칭된다(`cit`가 `city`에 걸리지 않음).
- 이 저장소의 디자인 스킬 4종은 `.claude/skills/`에 심볼릭 링크로 등록되어 자동 탐지된다.
