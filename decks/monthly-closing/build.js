const pptxgen = require("pptxgenjs");

// ── Palette: Midnight Executive (navy dominant) + gold accent ──
const NAVY = "1E2761";
const DEEP = "121A3E";
const ICE  = "CADCFC";
const ICE2 = "EDF2FB";
const GOLD = "C08A2E";
const WHITE= "FFFFFF";
const GRAY = "5C6472";
const LINE = "D8DEE9";
const RED  = "B23B3B";
const GREEN= "2E7D5B";

const F  = "Malgun Gothic";   // Korean-safe body/heading face
const W  = 13.3, H = 7.5, M = 0.62;

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";
pres.author = "경영지원본부";
pres.title  = "월결산 자동화 및 연결 경영실적 보고";

// ── helpers ────────────────────────────────────────────────
function titleBar(s, kicker, title) {
  s.addText(kicker, { x: M, y: 0.42, w: 8, h: 0.28, isTextBox: true, margin: 0,
    fontFace: F, fontSize: 12, bold: true, color: GOLD, charSpacing: 2 });
  s.addText(title, { x: M, y: 0.72, w: 12.06, h: 0.62, isTextBox: true, margin: 0,
    valign: "top", fontFace: F, fontSize: 30, bold: true, color: NAVY });
}
function badge(s, x, y, label, fill, txt) {
  s.addShape(pres.ShapeType.ellipse, { x, y, w: 0.46, h: 0.46, fill: { color: fill } });
  s.addText(label, { x, y, w: 0.46, h: 0.46, isTextBox: true, margin: 0, align: "center",
    valign: "middle", fontFace: F, fontSize: 14, bold: true, color: txt || WHITE });
}
function card(s, x, y, w, h, fill) {
  s.addShape(pres.ShapeType.roundRect, { x, y, w, h, rectRadius: 0.06,
    fill: { color: fill || ICE2 }, line: { color: LINE, width: 0.75 } });
}
function stat(s, x, y, w, value, label, color) {
  s.addText(value, { x, y, w, h: 0.72, isTextBox: true, margin: 0, align: "center",
    fontFace: F, fontSize: 34, bold: true, color: color || NAVY });
  s.addText(label, { x, y: y + 0.72, w, h: 0.3, isTextBox: true, margin: 0, align: "center",
    fontFace: F, fontSize: 11, color: GRAY });
}
function foot(s, txt) {
  s.addText(txt, { x: M, y: 6.92, w: 12.1, h: 0.28, isTextBox: true, margin: 0,
    fontFace: F, fontSize: 9.5, italic: true, color: GRAY });
}
const SAMPLE = "※ 계정 체계는 「더존위하고(iCUBE) 자료제출양식 v1.0」을 따릅니다. 수치는 구조 확인용 샘플이며, 위하고 출력 데이터 연동 시 자동 치환됩니다. (단위: 백만원)";

const tblOpt = {
  fontFace: F, fontSize: 11.5, color: "22262E", border: { type: "solid", color: LINE, pt: 0.5 },
  align: "right", valign: "middle",
};
const hdr = (t) => ({ text: t, options: { fill: { color: NAVY }, color: WHITE, bold: true, align: "center" } });
const lbl = (t, b) => ({ text: t, options: { align: "left", bold: !!b, fill: { color: b ? ICE2 : WHITE } } });
const num = (t, b, c) => ({ text: t, options: { bold: !!b, color: c || "22262E", fill: { color: b ? ICE2 : WHITE } } });

// ══ 1. 표지 ════════════════════════════════════════════════
let s = pres.addSlide();
s.background = { color: DEEP };
s.addShape(pres.ShapeType.ellipse, { x: 9.9, y: -1.5, w: 5.4, h: 5.4, fill: { color: NAVY } });
s.addShape(pres.ShapeType.ellipse, { x: 11.6, y: 4.6, w: 3.2, h: 3.2, fill: { color: NAVY } });
s.addText("2026년 8월 결산 · 경영진 보고", { x: M + 0.25, y: 2.05, w: 9, h: 0.34, isTextBox: true,
  margin: 0, fontFace: F, fontSize: 13.5, bold: true, color: GOLD, charSpacing: 2 });
s.addText("월결산 자동화 및\n연결 경영실적 보고", { x: M + 0.25, y: 2.5, w: 9.2, h: 1.9, isTextBox: true,
  margin: 0, fontFace: F, fontSize: 42, bold: true, color: WHITE, lineSpacing: 50 });
s.addText("테크온(한국 본사) · TECH-ON VINA(베트남 100% 자회사) 각사 손익 및 K-GAAP 연결손익",
  { x: M + 0.25, y: 4.5, w: 9.6, h: 0.4, isTextBox: true, margin: 0,
    fontFace: F, fontSize: 14, color: ICE });
s.addShape(pres.ShapeType.rect, { x: M + 0.25, y: 5.15, w: 1.1, h: 0.03, fill: { color: GOLD } });
s.addText("경영지원본부 재무팀   |   보고일 2026. 09. 04", { x: M + 0.25, y: 5.45, w: 8, h: 0.3,
  isTextBox: true, margin: 0, fontFace: F, fontSize: 11.5, color: "8FA2C4" });
s.addText(SAMPLE, { x: M + 0.25, y: 6.75, w: 11, h: 0.3, isTextBox: true, margin: 0,
  fontFace: F, fontSize: 9.5, italic: true, color: "6E7FA0" });
s.addNotes("월결산 자동화 과제 결과와 8월 연결 경영실적을 함께 보고합니다. 수치는 샘플이며 실제 정산표 연동 시 치환됩니다.");

// ══ 2. Executive Summary ═══════════════════════════════════
s = pres.addSlide();
titleBar(s, "EXECUTIVE SUMMARY", "핵심 요약 — 결산 5일 단축, 연결손익 자동 산출");
card(s, M, 1.62, 12.06, 1.5, ICE2);
stat(s, M + 0.15,  1.75, 2.85, "D+3", "결산 완료 시점 (기존 D+8)");
stat(s, M + 3.10,  1.75, 2.85, "5,640", "연결 매출액 (전월 +3.4%)", NAVY);
stat(s, M + 6.05,  1.75, 2.85, "10.3%", "연결 영업이익률 (전월 9.6%)", GREEN);
stat(s, M + 9.00,  1.75, 2.85, "△85%", "수작업 분개 감소 (420→65건)", GOLD);

const msgs = [
  ["01", "각사 손익 확정까지 D+2", "한국 더존, 베트남 MISA 원장을 자동 수집·검증하여 각사 별도 손익을 D+2에 확정합니다. VAS→K-GAAP 전환과 환산은 규칙 기반으로 자동 처리됩니다."],
  ["02", "연결조정 4단계 자동 생성", "지분법이익 취소 → 투자·자본 상계 → 채권채무 상계 → 수익·비용 상계를 시스템이 생성하고 차대균형을 자동 검증합니다."],
  ["03", "경영진 보고서까지 원클릭", "연결손익계산서·각사 비교·추이 차트가 확정 데이터에서 바로 생성되어, 재무팀은 수치 작성이 아닌 원인 분석에 집중합니다."],
];
let my = 3.4;
msgs.forEach(([n, t, d]) => {
  badge(s, M, my + 0.04, n, NAVY);
  s.addText(t, { x: M + 0.66, y: my, w: 11.4, h: 0.3, isTextBox: true, margin: 0,
    fontFace: F, fontSize: 15, bold: true, color: NAVY });
  s.addText(d, { x: M + 0.66, y: my + 0.32, w: 11.4, h: 0.62, isTextBox: true, margin: 0,
    fontFace: F, fontSize: 12, color: GRAY, lineSpacing: 17 });
  my += 1.12;
});
foot(s, SAMPLE);
s.addNotes("첫 장에서 결론을 먼저 제시합니다. 상세 근거는 이후 슬라이드에서 다룹니다.");

// ══ 3. As-Is 현황과 문제점 ═════════════════════════════════
s = pres.addSlide();
titleBar(s, "AS-IS", "현행 월결산 — 사람이 옮기고, 사람이 맞추고 있습니다");
const pains = [
  ["원장 수집 수작업", "한국·베트남 원장을 각각 내려받아 엑셀에 붙여넣기 (월 평균 4시간)"],
  ["계정 매핑 불일치", "VAS 계정코드(TT200)와 K-GAAP 계정 매핑이 담당자 기억에 의존"],
  ["환산 기준 혼용", "손익 월평균환율 / 자산·부채 기말환율 적용이 시트마다 상이"],
  ["연결조정 수기 분개", "내부거래·미실현손익 제거를 매월 수기 작성, 차대 불일치 빈발"],
  ["보고서 재작성", "확정 후 경영진 보고자료를 다시 수기로 작성 (월 6시간)"],
];
let py = 1.72;
pains.forEach(([t, d], i) => {
  badge(s, M, py + 0.02, String(i + 1), ICE, NAVY);
  s.addText(t, { x: M + 0.66, y: py, w: 6.9, h: 0.3, isTextBox: true, margin: 0,
    fontFace: F, fontSize: 14.5, bold: true, color: NAVY });
  s.addText(d, { x: M + 0.66, y: py + 0.31, w: 6.9, h: 0.34, isTextBox: true, margin: 0,
    fontFace: F, fontSize: 11.5, color: GRAY });
  py += 0.98;
});
card(s, 8.3, 1.72, 4.38, 4.62, NAVY);
s.addText("현행 결산 부담", { x: 8.55, y: 1.95, w: 3.9, h: 0.32, isTextBox: true, margin: 0,
  fontFace: F, fontSize: 14, bold: true, color: GOLD });
const burden = [["D+8", "결산 확정 시점"], ["420건", "월 수작업 분개"], ["16시간", "연결정산표 작성"], ["12건", "월 평균 오류 재작업"]];
let by = 2.45;
burden.forEach(([v, l]) => {
  s.addText(v, { x: 8.55, y: by, w: 3.9, h: 0.5, isTextBox: true, margin: 0,
    fontFace: F, fontSize: 26, bold: true, color: WHITE });
  s.addText(l, { x: 8.55, y: by + 0.48, w: 3.9, h: 0.28, isTextBox: true, margin: 0,
    fontFace: F, fontSize: 11, color: ICE });
  by += 0.95;
});
foot(s, "출처: 2026년 1~7월 결산 실적 집계 (샘플)");
s.addNotes("현행 프로세스의 병목은 데이터 이동과 연결조정 수기 작업 두 곳에 집중되어 있습니다.");

// ══ 4. To-Be 자동화 아키텍처 ═══════════════════════════════
s = pres.addSlide();
titleBar(s, "TO-BE ARCHITECTURE", "자동화 구조 — 원장에서 연결손익까지 6단계 파이프라인");
const steps = [
  ["01", "원장 자동 수집", "위하고 iCUBE 10종\nMISA(베트남)"],
  ["02", "계정 매핑", "VAS TT200\n→ K-GAAP"],
  ["03", "외화 환산", "손익 월평균\nBS 기말환율"],
  ["04", "자동 검증", "차대균형\n계정잔액 대사"],
  ["05", "연결조정 생성", "4단계 분개\n자동 생성"],
  ["06", "보고서 출력", "연결 P&L\n경영진 자료"],
];
const cw = 1.92, gap = 0.13;
steps.forEach(([n, t, d], i) => {
  const x = M + i * (cw + gap);
  card(s, x, 1.9, cw, 2.5, i >= 4 ? NAVY : ICE2);
  const on = i >= 4;
  badge(s, x + (cw - 0.46) / 2, 2.12, n, on ? GOLD : NAVY);
  s.addText(t, { x: x + 0.08, y: 2.72, w: cw - 0.16, h: 0.5, isTextBox: true, margin: 0,
    align: "center", fontFace: F, fontSize: 13, bold: true, color: on ? WHITE : NAVY });
  s.addText(d, { x: x + 0.08, y: 3.25, w: cw - 0.16, h: 0.85, isTextBox: true, margin: 0,
    align: "center", fontFace: F, fontSize: 10.5, color: on ? ICE : GRAY, lineSpacing: 14 });
  if (i < 5) s.addShape(pres.ShapeType.rightArrow,
    { x: x + cw + 0.005, y: 3.05, w: gap - 0.01, h: 0.16, fill: { color: GOLD } });
});
card(s, M, 4.68, 12.06, 1.6, WHITE);
s.addText("설계 원칙", { x: M + 0.25, y: 4.85, w: 3, h: 0.3, isTextBox: true, margin: 0,
  fontFace: F, fontSize: 13, bold: true, color: GOLD });
s.addText([
  { text: "단일 소스 원칙 — 모든 보고 수치는 확정 원장 1개에서만 파생되며, 중간 엑셀 수정은 허용하지 않습니다.", options: { bullet: true, breakLine: true } },
  { text: "규칙의 외부화 — 계정 매핑표·환율·연결 대상 지분율은 마스터 테이블에서 관리하여 담당자 변경에 영향받지 않습니다.", options: { bullet: true, breakLine: true } },
  { text: "검증 우선 — 차대균형·전월 잔액 연속성·내부거래 대사 3종 검증을 통과해야 다음 단계로 넘어갑니다.", options: { bullet: true } },
], { x: M + 0.25, y: 5.18, w: 11.5, h: 1.0, isTextBox: true, margin: 0,
  fontFace: F, fontSize: 11.5, color: "22262E", paraSpaceAfter: 4 });
s.addNotes("05·06 단계가 이번 자동화의 핵심 신규 영역입니다. 01~04는 기존 수작업의 자동 대체입니다.");

// ══ 5. 데이터 소스 맵 ═══════════════════════════════════════
s = pres.addSlide();
titleBar(s, "DATA SOURCE MAP", "데이터 소스 — 더존위하고(iCUBE) 10종 표준자료");
s.addTable([
  [hdr("시트"), hdr("자료 유형"), hdr("위하고 메뉴 경로"), hdr("연결 산출물")],
  [lbl("① 재무상태표"), lbl("B/S"), lbl("회계관리 > 결산/재무제표 > 재무상태표"), lbl("연결 재무상태표")],
  [lbl("② 손익계산서"), lbl("P&L (월 누계)"), lbl("회계관리 > 결산/재무제표 > 손익계산서"), lbl("각사·연결 손익")],
  [lbl("③ 현금흐름표"), lbl("C/F (간접법)"), lbl("회계관리 > 결산/재무제표 > 현금흐름표"), lbl("연결 현금흐름표")],
  [lbl("④ 합계잔액시산표"), lbl("T/B (계정코드)"), lbl("회계관리 > 장부조회 > 합계잔액시산표"), lbl("차대균형 검증")],
  [lbl("⑤ 매출채권"), lbl("거래처별 잔액·연령"), lbl("채권채무관리 > 채권현황 > 거래처별잔액"), lbl("채권채무 상계 ③")],
  [lbl("⑥ 매입채무"), lbl("거래처별 잔액·연령"), lbl("채권채무관리 > 채무현황 > 거래처별잔액"), lbl("채권채무 상계 ③")],
  [lbl("⑦ 차입금현황"), lbl("Debt Schedule"), lbl("자금관리 > 차입금관리 > 차입금현황"), lbl("금융비용 검증")],
  [lbl("⑧ 고정자산"), lbl("감가상각 명세"), lbl("고정자산관리 > 자산현황 > 자산명세서"), lbl("상각비·EBITDA")],
  [lbl("⑨ 세금계산서"), lbl("매출·매입 합계표"), lbl("세무관리 > 부가가치세 > 세금계산서합계표"), lbl("내부거래 대사 ④")],
  [lbl("⑩ 급여대장"), lbl("인원별 급여 (암호화)"), lbl("급여관리 > 급여대장 > 급여명세서"), lbl("인건비 배부")],
], { x: M, y: 1.66, w: 12.06, colW: [2.0, 2.5, 5.06, 2.5], rowH: 0.318, ...tblOpt, align: "left", fontSize: 10.5 });
card(s, M, 5.5, 5.9, 1.24, ICE2);
s.addText("자동 수집 대상", { x: M + 0.22, y: 5.62, w: 5.5, h: 0.28, isTextBox: true, margin: 0,
  fontFace: F, fontSize: 12, bold: true, color: NAVY });
s.addText("①~⑨는 위하고에서 Excel로 내보낸 뒤 값 붙여넣기하던 작업을 배치 수집으로 대체합니다. ⑩ 급여대장은 개인정보 자료이므로 암호화 채널로 별도 처리합니다.",
  { x: M + 0.22, y: 5.9, w: 5.5, h: 0.72, isTextBox: true, margin: 0,
    fontFace: F, fontSize: 10.5, color: GRAY, lineSpacing: 14 });
card(s, 6.78, 5.5, 5.9, 1.24, NAVY);
s.addText("베트남 법인 대응", { x: 7.0, y: 5.62, w: 5.5, h: 0.28, isTextBox: true, margin: 0,
  fontFace: F, fontSize: 12, bold: true, color: GOLD });
s.addText("VINA는 위하고를 쓰지 않으므로 MISA 원장을 동일한 10종 양식에 맞춰 정규화한 뒤, VAS(TT200) 계정을 K-GAAP 계정코드로 매핑합니다.",
  { x: 7.0, y: 5.9, w: 5.5, h: 0.72, isTextBox: true, margin: 0,
    fontFace: F, fontSize: 10.5, color: ICE, lineSpacing: 14 });
foot(s, "출처: 더존위하고(iCUBE) 자료제출양식 v1.0 — 시트 구성 및 메뉴 경로");
s.addNotes("결산 자동화의 입력이 무엇인지 명확히 하는 슬라이드입니다. 위하고 메뉴 경로는 자료제출양식 v1.0 기준입니다.");

// ══ 5. 결산 캘린더 ═════════════════════════════════════════
s = pres.addSlide();
titleBar(s, "CLOSING CALENDAR", "월결산 캘린더 — D+8에서 D+3으로");
s.addText("AS-IS", { x: M, y: 1.78, w: 1.2, h: 0.3, isTextBox: true, margin: 0,
  fontFace: F, fontSize: 12, bold: true, color: GRAY });
const asis = [["D+1~3", "원장 마감·수집"], ["D+4~5", "각사 손익 확정"], ["D+6~7", "연결조정 수기"], ["D+8", "보고서 작성"]];
asis.forEach(([d, t], i) => {
  const x = M + 1.35 + i * 2.72;
  card(s, x, 1.68, 2.6, 0.86, WHITE);
  s.addText(d, { x: x + 0.12, y: 1.76, w: 2.36, h: 0.28, isTextBox: true, margin: 0,
    fontFace: F, fontSize: 12, bold: true, color: GRAY });
  s.addText(t, { x: x + 0.12, y: 2.04, w: 2.36, h: 0.3, isTextBox: true, margin: 0,
    fontFace: F, fontSize: 11.5, color: "22262E" });
});
s.addText("TO-BE", { x: M, y: 3.28, w: 1.2, h: 0.3, isTextBox: true, margin: 0,
  fontFace: F, fontSize: 12, bold: true, color: GOLD });
const tobe = [
  ["D+1", "원장 자동 수집·매핑", "시스템"],
  ["D+2", "각사 손익 확정·검증", "각사 재무"],
  ["D+3", "연결조정·보고서 출력", "본사 재무"],
];
tobe.forEach(([d, t, o], i) => {
  const x = M + 1.35 + i * 3.65;
  card(s, x, 3.14, 3.5, 1.22, NAVY);
  s.addText(d, { x: x + 0.16, y: 3.26, w: 3.2, h: 0.34, isTextBox: true, margin: 0,
    fontFace: F, fontSize: 15, bold: true, color: GOLD });
  s.addText(t, { x: x + 0.16, y: 3.6, w: 3.2, h: 0.3, isTextBox: true, margin: 0,
    fontFace: F, fontSize: 12.5, bold: true, color: WHITE });
  s.addText("담당 " + o, { x: x + 0.16, y: 3.9, w: 3.2, h: 0.28, isTextBox: true, margin: 0,
    fontFace: F, fontSize: 10.5, color: ICE });
});
card(s, M, 4.72, 12.06, 1.55, ICE2);
s.addText("단축의 근거", { x: M + 0.25, y: 4.88, w: 3, h: 0.3, isTextBox: true, margin: 0,
  fontFace: F, fontSize: 13, bold: true, color: NAVY });
s.addText([
  { text: "수집·매핑 3일 → 1일: 원장 다운로드와 계정 재분류가 배치로 처리되어 담당자 대기시간이 사라집니다.", options: { bullet: true, breakLine: true } },
  { text: "연결조정 2일 → 0.5일: 내부거래 대사표가 각사 확정과 동시에 생성되어 차이 조회부터 시작합니다.", options: { bullet: true, breakLine: true } },
  { text: "보고서 1일 → 즉시: 확정 데이터가 곧 보고 양식이므로 별도 작성 단계가 없습니다.", options: { bullet: true } },
], { x: M + 0.25, y: 5.2, w: 11.5, h: 1.0, isTextBox: true, margin: 0,
  fontFace: F, fontSize: 11.5, color: "22262E", paraSpaceAfter: 4 });
s.addNotes("D+3 확정은 각사 원장 마감이 D+1에 완료된다는 전제 위에 성립합니다. 베트남 법인 마감 일정 협조가 전제 조건입니다.");

// ══ 6. 테크온(한국) 별도 손익 ══════════════════════════════
s = pres.addSlide();
titleBar(s, "STANDALONE · KOREA", "테크온(한국 본사) 별도 손익계산서");
s.addTable([
  [hdr("코드"), hdr("계정과목"), hdr("당월"), hdr("전월"), hdr("증감"), hdr("증감률")],
  [lbl("4000", true), lbl("매출액", true), num("4,820", true), num("4,655", true), num("+165", true, GREEN), num("+3.5%", true, GREEN)],
  [lbl("4010"), lbl("  제품매출"), num("3,910"), num("3,780"), num("+130"), num("+3.4%")],
  [lbl("4020"), lbl("  상품매출"), num("612"), num("592"), num("+20"), num("+3.4%")],
  [lbl("4030"), lbl("  서비스매출"), num("298"), num("283"), num("+15"), num("+5.3%")],
  [lbl("5000"), lbl("매출원가"), num("3,565"), num("3,470"), num("+95"), num("+2.7%")],
  [lbl("", true), lbl("매출총이익 (26.0%)", true), num("1,255", true), num("1,185", true), num("+70", true, GREEN), num("+5.9%", true, GREEN)],
  [lbl("6000"), lbl("판매비와관리비"), num("812"), num("798"), num("+14"), num("+1.8%")],
  [lbl("6010"), lbl("  인건비"), num("468"), num("461"), num("+7"), num("+1.5%")],
  [lbl("6020"), lbl("  감가상각비"), num("112"), num("112"), num("0"), num("—")],
  [lbl("", true), lbl("영업이익 (9.2%)", true), num("443", true), num("387", true), num("+56", true, GREEN), num("+14.5%", true, GREEN)],
  [lbl("7000~"), lbl("영업외손익 (지분법 117)"), num("82"), num("74"), num("+8"), num("+10.8%")],
  [lbl("8000"), lbl("법인세비용"), num("110"), num("96"), num("+14"), num("+14.6%")],
  [lbl("", true), lbl("당기순이익", true), num("415", true), num("365", true), num("+50", true, GREEN), num("+13.7%", true, GREEN)],
], { x: M, y: 1.66, w: 7.5, colW: [0.68, 2.02, 1.2, 1.2, 1.2, 1.2], rowH: 0.318, ...tblOpt });

s.addChart(pres.ChartType.bar, [
  { name: "당월", labels: ["매출총이익", "판매관리비", "영업이익"], values: [1255, 812, 443] },
  { name: "전월", labels: ["매출총이익", "판매관리비", "영업이익"], values: [1185, 798, 387] },
], {
  x: 8.32, y: 1.66, w: 4.36, h: 2.55, barDir: "col",
  showTitle: true, title: "주요 손익 항목 비교 (백만원)", titleFontFace: F, titleFontSize: 12, titleColor: NAVY,
  chartColors: [NAVY, ICE], showValue: true, dataLabelPosition: "outEnd",
  dataLabelFontFace: F, dataLabelFontSize: 9, dataLabelColor: GRAY,
  catAxisLabelColor: GRAY, catAxisLabelFontFace: F, catAxisLabelFontSize: 10,
  valAxisLabelColor: GRAY, valAxisLabelFontSize: 9, valAxisHidden: true,
  valGridLine: { color: LINE, size: 0.5 }, catGridLine: { style: "none" },
  showLegend: true, legendPos: "b", legendFontFace: F, legendFontSize: 10, legendColor: GRAY,
});
card(s, 8.32, 4.38, 4.36, 1.9, ICE2);
s.addText("변동 요인", { x: 8.55, y: 4.52, w: 3.9, h: 0.28, isTextBox: true, margin: 0,
  fontFace: F, fontSize: 12.5, bold: true, color: NAVY });
s.addText([
  { text: "주력 제품군 출하 증가로 매출 +165", options: { bullet: true, breakLine: true } },
  { text: "원자재 단가 안정으로 원가율 △0.5%p", options: { bullet: true, breakLine: true } },
  { text: "판관비는 전월 수준 유지 (증가율 매출 하회)", options: { bullet: true, breakLine: true } },
  { text: "지분법이익 117은 연결 시 전액 취소", options: { bullet: true } },
], { x: 8.55, y: 4.82, w: 3.9, h: 1.3, isTextBox: true, margin: 0,
  fontFace: F, fontSize: 10.5, color: "22262E", paraSpaceAfter: 3 });
foot(s, SAMPLE);
s.addNotes("한국 본사 별도 기준입니다. 지분법이익 117은 연결 단계에서 전액 취소되며 VINA 순이익으로 대체됩니다.");

// ══ 7. TECH-ON VINA 별도 손익 ══════════════════════════════
s = pres.addSlide();
titleBar(s, "STANDALONE · VIETNAM", "TECH-ON VINA 별도 손익계산서 (K-GAAP 전환 후)");
s.addTable([
  [hdr("코드"), hdr("계정과목"), hdr("당월"), hdr("전월"), hdr("증감"), hdr("증감률")],
  [lbl("4000", true), lbl("매출액", true), num("1,940", true), num("1,880", true), num("+60", true, GREEN), num("+3.2%", true, GREEN)],
  [lbl("4010"), lbl("  제품매출"), num("1,486"), num("1,442"), num("+44"), num("+3.1%")],
  [lbl("4030"), lbl("  서비스매출(가공용역)"), num("454"), num("438"), num("+16"), num("+3.7%")],
  [lbl("5000"), lbl("매출원가"), num("1,562"), num("1,528"), num("+34"), num("+2.2%")],
  [lbl("", true), lbl("매출총이익 (19.5%)", true), num("378", true), num("352", true), num("+26", true, GREEN), num("+7.4%", true, GREEN)],
  [lbl("6000"), lbl("판매비와관리비"), num("214"), num("209"), num("+5"), num("+2.4%")],
  [lbl("6010"), lbl("  인건비 (주재원 포함)"), num("126"), num("122"), num("+4"), num("+3.3%")],
  [lbl("", true), lbl("영업이익 (8.5%)", true), num("164", true), num("143", true), num("+21", true, GREEN), num("+14.7%", true, GREEN)],
  [lbl("7000~"), lbl("영업외손익"), num("△18", false, RED), num("△15", false, RED), num("△3", false, RED), num("—")],
  [lbl("8000"), lbl("법인세비용 (CIT 20%)"), num("29"), num("26"), num("+3"), num("+11.5%")],
  [lbl("", true), lbl("당기순이익", true), num("117", true), num("104", true), num("+13", true, GREEN), num("+12.5%", true, GREEN)],
], { x: M, y: 1.66, w: 7.5, colW: [0.68, 2.02, 1.2, 1.2, 1.2, 1.2], rowH: 0.318, ...tblOpt });

card(s, 8.32, 1.66, 4.36, 2.72, NAVY);
s.addText("VAS → K-GAAP 전환 조정", { x: 8.55, y: 1.82, w: 3.9, h: 0.3, isTextBox: true, margin: 0,
  fontFace: F, fontSize: 13, bold: true, color: GOLD });
const conv = [
  ["TK627 제조경비 재분류", "+0"], ["주재원 급여·PIT → 판관비", "△12"],
  ["감가상각 내용연수 차이", "△6"], ["퇴직급여충당 인식", "+4"],
];
let cy = 2.24;
conv.forEach(([t, v]) => {
  s.addText(t, { x: 8.55, y: cy, w: 3.0, h: 0.3, isTextBox: true, margin: 0,
    fontFace: F, fontSize: 11, color: WHITE });
  s.addText(v, { x: 11.55, y: cy, w: 0.9, h: 0.3, isTextBox: true, margin: 0, align: "right",
    fontFace: F, fontSize: 11, bold: true, color: ICE });
  cy += 0.42;
});
s.addShape(pres.ShapeType.rect, { x: 8.55, y: 3.94, w: 3.9, h: 0.015, fill: { color: "3B4A80" } });
s.addText("순이익 영향 합계", { x: 8.55, y: 4.0, w: 3.0, h: 0.28, isTextBox: true, margin: 0,
  fontFace: F, fontSize: 11.5, bold: true, color: WHITE });
s.addText("△14", { x: 11.55, y: 4.0, w: 0.9, h: 0.28, isTextBox: true, margin: 0, align: "right",
  fontFace: F, fontSize: 11.5, bold: true, color: GOLD });

card(s, 8.32, 4.54, 4.36, 1.74, ICE2);
s.addText("환산 기준", { x: 8.55, y: 4.68, w: 3.9, h: 0.28, isTextBox: true, margin: 0,
  fontFace: F, fontSize: 12.5, bold: true, color: NAVY });
s.addText([
  { text: "손익: 당월 평균환율 0.0538 KRW/VND", options: { bullet: true, breakLine: true } },
  { text: "자산·부채: 기말환율 0.0541 KRW/VND", options: { bullet: true, breakLine: true } },
  { text: "자본: 발생시점 환율 (해외사업환산차 자본 계상)", options: { bullet: true } },
], { x: 8.55, y: 4.98, w: 3.9, h: 1.2, isTextBox: true, margin: 0,
  fontFace: F, fontSize: 10.5, color: "22262E", paraSpaceAfter: 3 });
foot(s, "※ VAS 기준: Thông tư 200/2014/TT-BTC | 계정 체계: 더존위하고(iCUBE) 자료제출양식 v1.0 | 수치는 샘플 (단위: 백만원)");
s.addNotes("VAS 원장을 K-GAAP으로 전환한 후의 수치입니다. 전환 조정 항목은 마스터 규칙으로 관리되어 매월 동일하게 적용됩니다.");

// ══ 8. 연결조정 4단계 ══════════════════════════════════════
s = pres.addSlide();
titleBar(s, "CONSOLIDATION ADJUSTMENT", "연결조정분개 — 4단계 자동 생성 및 검증");
const adj = [
  ["①", "지분법이익 취소", "테크온 별도에 계상된 지분법이익을 전액 제거합니다.", "△117", "손익"],
  ["②", "투자·자본 상계", "종속기업투자주식과 VINA 자본을 상계합니다 (지분율 100%, 비지배지분 없음).", "재무상태표", "BS"],
  ["③", "채권·채무 상계", "본사-VINA 간 매출채권/매입채무를 상계합니다.", "△340", "BS"],
  ["④", "수익·비용 상계", "내부거래 매출·매입을 동액 상계하고, 재고 미실현손익을 제거합니다.", "△1,120 / +28", "손익"],
];
let ay = 1.72;
adj.forEach(([n, t, d, v, k]) => {
  card(s, M, ay, 12.06, 1.02, k === "손익" ? ICE2 : WHITE);
  badge(s, M + 0.22, ay + 0.28, n, k === "손익" ? NAVY : ICE, k === "손익" ? WHITE : NAVY);
  s.addText(t, { x: M + 0.86, y: ay + 0.16, w: 4.2, h: 0.32, isTextBox: true, margin: 0,
    fontFace: F, fontSize: 14.5, bold: true, color: NAVY });
  s.addText(d, { x: M + 0.86, y: ay + 0.5, w: 8.0, h: 0.4, isTextBox: true, margin: 0,
    fontFace: F, fontSize: 11.5, color: GRAY });
  s.addText(k, { x: M + 5.2, y: ay + 0.18, w: 1.0, h: 0.28, isTextBox: true, margin: 0,
    align: "center", fontFace: F, fontSize: 10, bold: true, color: k === "손익" ? GOLD : GRAY });
  s.addText(v, { x: M + 9.6, y: ay + 0.3, w: 2.2, h: 0.42, isTextBox: true, margin: 0,
    align: "right", fontFace: F, fontSize: 17, bold: true, color: k === "손익" ? NAVY : GRAY });
  ay += 1.12;
});
card(s, M, 6.22, 12.06, 0.62, NAVY);
s.addText("자동 검증 통과   ·   차대균형 0   ·   내부거래 대사 차이 0   ·   전월 잔액 연속성 일치   ·   검증 완료 2026-09-03 18:12",
  { x: M + 0.25, y: 6.34, w: 11.6, h: 0.38, isTextBox: true, margin: 0,
    fontFace: F, fontSize: 12, bold: true, color: WHITE });
s.addNotes("4단계는 K-GAAP 제5장 연결 기준에 따른 순서입니다. 지분율 100%이므로 비지배지분 계산은 발생하지 않습니다.");

// ══ 9. 연결손익계산서 ══════════════════════════════════════
s = pres.addSlide();
titleBar(s, "CONSOLIDATED P&L", "연결손익계산서 — 각사 합산에서 연결까지");
s.addTable([
  [hdr("구분"), hdr("테크온(한국)"), hdr("TECH-ON VINA"), hdr("단순합산"), hdr("연결조정"), hdr("연결")],
  [lbl("매출액", true), num("4,820", true), num("1,940", true), num("6,760", true), num("△1,120", true, RED), num("5,640", true)],
  [lbl("매출원가"), num("3,565"), num("1,562"), num("5,127"), num("△1,092", false, RED), num("4,035")],
  [lbl("매출총이익", true), num("1,255", true), num("378", true), num("1,633", true), num("△28", true, RED), num("1,605", true)],
  [lbl("  매출총이익률"), num("26.0%"), num("19.5%"), num("24.2%"), num("—"), num("28.5%", false, GREEN)],
  [lbl("판매관리비"), num("812"), num("214"), num("1,026"), num("—"), num("1,026")],
  [lbl("영업이익", true), num("443", true), num("164", true), num("607", true), num("△28", true, RED), num("579", true)],
  [lbl("  영업이익률"), num("9.2%"), num("8.5%"), num("9.0%"), num("—"), num("10.3%", false, GREEN)],
  [lbl("영업외손익"), num("82"), num("△18", false, RED), num("64"), num("△117", false, RED), num("△53", false, RED)],
  [lbl("법인세비용"), num("110"), num("29"), num("139"), num("—"), num("139")],
  [lbl("당기순이익", true), num("415", true), num("117", true), num("532", true), num("△145", true, RED), num("387", true)],
], { x: M, y: 1.66, w: 12.06, colW: [2.46, 1.92, 1.92, 1.92, 1.92, 1.92], rowH: 0.335, ...tblOpt });

card(s, M, 5.68, 5.9, 1.05, ICE2);
s.addText("연결 매출총이익률이 각사보다 높은 이유", { x: M + 0.22, y: 5.78, w: 5.5, h: 0.28, isTextBox: true,
  margin: 0, fontFace: F, fontSize: 12, bold: true, color: NAVY });
s.addText("내부거래 1,120이 매출·매출원가에서 동액 제거되면서, 마진이 없는 거래가 분모에서 빠져 연결 마진율이 상승합니다.",
  { x: M + 0.22, y: 6.08, w: 5.5, h: 0.56, isTextBox: true, margin: 0,
    fontFace: F, fontSize: 10.5, color: GRAY, lineSpacing: 14 });
card(s, 6.78, 5.68, 5.9, 1.05, ICE2);
s.addText("연결 순이익이 단순합산보다 145 적은 이유", { x: 7.0, y: 5.78, w: 5.5, h: 0.28, isTextBox: true,
  margin: 0, fontFace: F, fontSize: 12, bold: true, color: NAVY });
s.addText("지분법이익 117이 이중계상이라 취소되고, 재고에 남은 미실현이익 28이 제거되었습니다 (117 + 28 = 145).",
  { x: 7.0, y: 6.08, w: 5.5, h: 0.56, isTextBox: true, margin: 0,
    fontFace: F, fontSize: 10.5, color: GRAY, lineSpacing: 14 });
foot(s, SAMPLE);
s.addNotes("연결조정 열이 곧 연결정산표의 조정분개 합계이며, 시스템이 자동 생성한 값입니다.");

// ══ 10. 순이익 브릿지 ══════════════════════════════════════
s = pres.addSlide();
titleBar(s, "BRIDGE", "당기순이익 브릿지 — 별도에서 연결까지");
s.addChart(pres.ChartType.bar, [
  { name: "당기순이익", labels: ["테크온\n별도", "VINA\n별도", "지분법이익\n취소", "미실현손익\n제거", "연결\n순이익"],
    values: [415, 117, -117, -28, 387] },
], {
  x: M, y: 1.7, w: 7.7, h: 4.45, barDir: "col",
  showTitle: false, chartColors: [NAVY, NAVY, RED, RED, GOLD], varyColors: true,
  showValue: true, dataLabelPosition: "outEnd", dataLabelFontFace: F, dataLabelFontSize: 12,
  dataLabelColor: "22262E", dataLabelFormatCode: "#,##0;△#,##0",
  catAxisLabelColor: GRAY, catAxisLabelFontFace: F, catAxisLabelFontSize: 11,
  valAxisHidden: true, valGridLine: { color: LINE, size: 0.5 }, catGridLine: { style: "none" },
  showLegend: false, barGapWidthPct: 55,
});
card(s, 8.5, 1.7, 4.18, 2.1, NAVY);
s.addText("연결 당기순이익", { x: 8.72, y: 1.88, w: 3.74, h: 0.3, isTextBox: true, margin: 0,
  fontFace: F, fontSize: 13, color: ICE });
s.addText("387", { x: 8.72, y: 2.18, w: 3.74, h: 0.86, isTextBox: true, margin: 0,
  fontFace: F, fontSize: 52, bold: true, color: WHITE });
s.addText("백만원   |   전월 대비 +38 (+10.9%)", { x: 8.72, y: 3.12, w: 3.74, h: 0.3, isTextBox: true,
  margin: 0, fontFace: F, fontSize: 11.5, color: GOLD });
card(s, 8.5, 3.94, 4.18, 2.21, ICE2);
s.addText("읽는 법", { x: 8.72, y: 4.08, w: 3.74, h: 0.28, isTextBox: true, margin: 0,
  fontFace: F, fontSize: 12.5, bold: true, color: NAVY });
s.addText([
  { text: "앞의 두 막대는 각사가 벌어들인 실제 이익입니다.", options: { bullet: true, breakLine: true } },
  { text: "가운데 두 막대는 회계상 중복·미실현분을 덜어낸 것으로, 현금 유출이 아닙니다.", options: { bullet: true, breakLine: true } },
  { text: "미실현손익 28은 해당 재고가 외부에 판매되는 시점에 연결이익으로 환입됩니다.", options: { bullet: true } },
], { x: 8.72, y: 4.38, w: 3.74, h: 1.7, isTextBox: true, margin: 0,
  fontFace: F, fontSize: 10.5, color: "22262E", paraSpaceAfter: 4 });
foot(s, SAMPLE);
s.addNotes("경영진이 가장 궁금해하는 '왜 합산과 연결이 다른가'를 한 장으로 설명하는 슬라이드입니다.");

// ══ 11. 연결 실적 추이 ═════════════════════════════════════
s = pres.addSlide();
titleBar(s, "TREND", "연결 실적 추이 — 최근 6개월");
const mons = ["3월", "4월", "5월", "6월", "7월", "8월"];
s.addChart(pres.ChartType.bar, [
  { name: "연결 매출액", labels: mons, values: [4980, 5120, 5340, 5210, 5455, 5640] },
], {
  x: M, y: 1.72, w: 6.0, h: 3.35, barDir: "col",
  showTitle: true, title: "연결 매출액 (백만원)", titleFontFace: F, titleFontSize: 12.5, titleColor: NAVY,
  chartColors: [NAVY], showValue: true, dataLabelPosition: "outEnd",
  dataLabelFontFace: F, dataLabelFontSize: 9.5, dataLabelColor: GRAY,
  catAxisLabelColor: GRAY, catAxisLabelFontFace: F, catAxisLabelFontSize: 10.5,
  valAxisHidden: true, valGridLine: { color: LINE, size: 0.5 }, catGridLine: { style: "none" },
  showLegend: false, barGapWidthPct: 50,
});
s.addChart(pres.ChartType.line, [
  { name: "연결 영업이익률", labels: mons, values: [8.1, 8.6, 9.0, 8.4, 9.6, 10.3] },
], {
  x: 6.85, y: 1.72, w: 5.83, h: 3.35,
  showTitle: true, title: "연결 영업이익률 (%)", titleFontFace: F, titleFontSize: 12.5, titleColor: NAVY,
  chartColors: [GOLD], lineSize: 3, lineDataSymbol: "circle", lineDataSymbolSize: 8,
  showValue: true, dataLabelPosition: "t", dataLabelFontFace: F, dataLabelFontSize: 10, dataLabelColor: NAVY,
  dataLabelFormatCode: "0.0",
  catAxisLabelColor: GRAY, catAxisLabelFontFace: F, catAxisLabelFontSize: 10.5,
  valAxisLabelColor: GRAY, valAxisLabelFontSize: 9, valAxisMinVal: 7, valAxisMaxVal: 11,
  valGridLine: { color: LINE, size: 0.5 }, catGridLine: { style: "none" }, showLegend: false,
});
const tr = [
  ["3개월 연속 개선", "6월 일시 조정 이후 매출·마진이 함께 상승 추세로 복귀했습니다."],
  ["VINA 기여 확대", "베트남 법인 영업이익률이 7.6%→8.5%로 개선되며 연결 마진을 밀어올렸습니다."],
  ["내부거래 비중 안정", "연결 매출 대비 내부거래 비중은 19.9%로 전월(20.3%)과 유사한 수준입니다."],
];
let ty = 5.3;
tr.forEach(([t, d], i) => {
  const x = M + i * 4.09;
  card(s, x, ty, 3.88, 1.3, ICE2);
  s.addText(t, { x: x + 0.2, y: ty + 0.14, w: 3.5, h: 0.3, isTextBox: true, margin: 0,
    fontFace: F, fontSize: 12.5, bold: true, color: NAVY });
  s.addText(d, { x: x + 0.2, y: ty + 0.46, w: 3.5, h: 0.72, isTextBox: true, margin: 0,
    fontFace: F, fontSize: 10.5, color: GRAY, lineSpacing: 14 });
});
foot(s, SAMPLE);
s.addNotes("추이 차트는 확정 데이터에서 자동 갱신되므로 매월 재작성이 필요 없습니다.");

// ══ 12. 자동화 효과 ════════════════════════════════════════
s = pres.addSlide();
titleBar(s, "IMPACT", "자동화 도입 효과 — 정확도와 속도를 동시에");
const kpis = [
  ["결산 확정 시점", "D+8", "D+3", "5일 단축"],
  ["수작업 분개", "420건", "65건", "△85%"],
  ["연결정산표 작성", "16시간", "1.5시간", "△91%"],
  ["오류 재작업", "12건", "2건", "△83%"],
];
kpis.forEach(([t, a, b, d], i) => {
  const x = M + i * 3.07;
  card(s, x, 1.72, 2.88, 2.5, WHITE);
  s.addText(t, { x: x + 0.18, y: 1.88, w: 2.52, h: 0.3, isTextBox: true, margin: 0,
    fontFace: F, fontSize: 12.5, bold: true, color: NAVY });
  s.addText(a, { x: x + 0.18, y: 2.26, w: 2.52, h: 0.36, isTextBox: true, margin: 0,
    fontFace: F, fontSize: 17, color: GRAY, strike: "sngStrike" });
  s.addText(b, { x: x + 0.18, y: 2.66, w: 2.52, h: 0.62, isTextBox: true, margin: 0,
    fontFace: F, fontSize: 32, bold: true, color: NAVY });
  s.addShape(pres.ShapeType.roundRect, { x: x + 0.18, y: 3.42, w: 1.5, h: 0.42,
    rectRadius: 0.08, fill: { color: GOLD } });
  s.addText(d, { x: x + 0.18, y: 3.42, w: 1.5, h: 0.42, isTextBox: true, margin: 0, align: "center",
    valign: "middle", fontFace: F, fontSize: 13, bold: true, color: WHITE });
});
card(s, M, 4.44, 5.9, 1.95, ICE2);
s.addText("정량 효과", { x: M + 0.22, y: 4.58, w: 5.5, h: 0.3, isTextBox: true, margin: 0,
  fontFace: F, fontSize: 13, bold: true, color: NAVY });
s.addText([
  { text: "재무팀 결산 투입시간 월 62시간 → 21시간 (△41시간)", options: { bullet: true, breakLine: true } },
  { text: "연간 환산 약 492시간, 인건비 기준 약 34백만원 상당", options: { bullet: true, breakLine: true } },
  { text: "결산 조기화로 경영 의사결정 리드타임 5일 확보", options: { bullet: true } },
], { x: M + 0.22, y: 4.9, w: 5.5, h: 1.4, isTextBox: true, margin: 0,
  fontFace: F, fontSize: 11.5, color: "22262E", paraSpaceAfter: 4 });
card(s, 6.78, 4.44, 5.9, 1.95, NAVY);
s.addText("정성 효과", { x: 7.0, y: 4.58, w: 5.5, h: 0.3, isTextBox: true, margin: 0,
  fontFace: F, fontSize: 13, bold: true, color: GOLD });
s.addText([
  { text: "연결조정 근거가 시스템에 기록되어 감사 대응력이 향상됩니다.", options: { bullet: true, breakLine: true } },
  { text: "담당자 변경·부재 시에도 동일한 결산 품질이 유지됩니다.", options: { bullet: true, breakLine: true } },
  { text: "재무팀 역할이 수치 작성에서 차이 분석으로 이동합니다.", options: { bullet: true } },
], { x: 7.0, y: 4.9, w: 5.5, h: 1.4, isTextBox: true, margin: 0,
  fontFace: F, fontSize: 11.5, color: WHITE, paraSpaceAfter: 4 });
foot(s, "효과 수치는 2026년 1~7월 실적 대비 자동화 파일럿 기준 추정치입니다 (샘플).");
s.addNotes("정량 효과는 인건비 절감보다 결산 조기화에 따른 의사결정 리드타임 확보에 방점이 있습니다.");

// ══ 13. 로드맵 & 요청사항 ══════════════════════════════════
s = pres.addSlide();
s.background = { color: DEEP };
s.addText("ROADMAP & ASK", { x: M, y: 0.5, w: 8, h: 0.3, isTextBox: true, margin: 0,
  fontFace: F, fontSize: 12, bold: true, color: GOLD, charSpacing: 2 });
s.addText("향후 계획 및 경영진 요청사항", { x: M, y: 0.82, w: 11.6, h: 0.6, isTextBox: true, margin: 0,
  fontFace: F, fontSize: 30, bold: true, color: WHITE });
const phases = [
  ["PHASE 1", "~ 2026.10", "각사 손익 자동화 안정화", "원장 수집·계정 매핑·환산 자동화 정착\n2개월 병행 운영으로 수기 결과와 대사"],
  ["PHASE 2", "~ 2026.12", "연결조정·보고서 자동화", "연결조정 4단계 자동 생성 전면 적용\n경영진 보고서 원클릭 출력 전환"],
  ["PHASE 3", "2027 상반기", "예측·분석 확장", "월 마감 데이터 기반 분기 전망 자동 산출\n사업부·제품군별 수익성 분석 확대"],
];
phases.forEach(([p, d, t, x2], i) => {
  const x = M + i * 4.09;
  s.addShape(pres.ShapeType.roundRect, { x, y: 1.68, w: 3.88, h: 2.6, rectRadius: 0.06,
    fill: { color: NAVY } });
  s.addText(p, { x: x + 0.22, y: 1.86, w: 3.44, h: 0.28, isTextBox: true, margin: 0,
    fontFace: F, fontSize: 11.5, bold: true, color: GOLD, charSpacing: 1.5 });
  s.addText(d, { x: x + 0.22, y: 2.14, w: 3.44, h: 0.3, isTextBox: true, margin: 0,
    fontFace: F, fontSize: 13, color: ICE });
  s.addText(t, { x: x + 0.22, y: 2.52, w: 3.44, h: 0.58, isTextBox: true, margin: 0,
    fontFace: F, fontSize: 15, bold: true, color: WHITE });
  s.addText(x2, { x: x + 0.22, y: 3.14, w: 3.44, h: 0.95, isTextBox: true, margin: 0,
    fontFace: F, fontSize: 10.5, color: "AFC0DE", lineSpacing: 15 });
});
s.addShape(pres.ShapeType.roundRect, { x: M, y: 4.55, w: 12.06, h: 1.95, rectRadius: 0.06,
  fill: { color: NAVY } });
s.addText("경영진 요청사항", { x: M + 0.3, y: 4.72, w: 5, h: 0.32, isTextBox: true, margin: 0,
  fontFace: F, fontSize: 15, bold: true, color: GOLD });
const asks = [
  ["01", "베트남 법인 원장 마감 D+1 고정", "VINA 회계팀 마감 일정을 D+1로 확정해 주시기 바랍니다. D+3 결산의 전제 조건입니다."],
  ["02", "계정 매핑·환율 마스터 승인권 지정", "매핑표 변경 승인자를 재무팀장으로 지정하여 임의 변경을 차단하고자 합니다."],
];
let ky = 5.12;
asks.forEach(([n, t, d]) => {
  badge(s, M + 0.3, ky + 0.02, n, GOLD);
  s.addText(t, { x: M + 0.94, y: ky, w: 4.4, h: 0.3, isTextBox: true, margin: 0,
    fontFace: F, fontSize: 13, bold: true, color: WHITE });
  s.addText(d, { x: M + 5.5, y: ky + 0.02, w: 6.3, h: 0.5, isTextBox: true, margin: 0,
    fontFace: F, fontSize: 11, color: "AFC0DE" });
  ky += 0.72;
});
s.addText("경영지원본부 재무팀   |   문의 swjung770908@gmail.com", { x: M, y: 6.75, w: 8, h: 0.3,
  isTextBox: true, margin: 0, fontFace: F, fontSize: 10.5, color: "6E7FA0" });
s.addNotes("두 가지 요청사항은 D+3 결산 정착의 필수 전제입니다. 승인 여부를 이 자리에서 확정해 주시기 바랍니다.");

pres.writeFile({ fileName: process.argv[2] || "월결산_자동화_경영진보고.pptx" })
  .then(f => console.log("saved:", f));
