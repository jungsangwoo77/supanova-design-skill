#!/usr/bin/env python3
"""UserPromptSubmit hook: 프롬프트 키워드로 적용할 스킬을 판단해 컨텍스트로 주입한다.

사용자가 /스킬명 을 입력하지 않아도 Claude가 해당 스킬을 먼저 로드하도록 안내한다.
규칙은 .claude/skill-routes.json 에서 관리한다. 오류 시 아무것도 출력하지 않고 종료해
프롬프트 처리를 막지 않는다.
"""
import json
import os
import re
import sys


def load_routes():
    base = os.environ.get("CLAUDE_PROJECT_DIR") or os.path.dirname(
        os.path.dirname(os.path.abspath(__file__))
    )
    path = os.path.join(base, ".claude", "skill-routes.json")
    if not os.path.exists(path):
        path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "skill-routes.json")
    with open(path, encoding="utf-8") as f:
        return json.load(f)


def contains(text, keyword):
    kw = keyword.lower().strip()
    if kw.isascii():
        # 영문 약어(cit, vas, per 등)가 단어 일부(city, canvas)에 오매칭되지 않도록 경계 검사
        return re.search(r"(?<![a-z0-9])" + re.escape(kw) + r"(?![a-z0-9])", text) is not None
    return kw in text


def match(prompt, config):
    text = prompt.lower()
    hits = []
    for route in config.get("routes", []):
        matched = [k for k in route.get("keywords", []) if contains(text, k)]
        if matched:
            hits.append((route, matched))

    suppressed = set()
    for route, _ in hits:
        suppressed.update(route.get("suppresses", []))

    hits = [h for h in hits if h[0]["skill"] not in suppressed]
    hits.sort(key=lambda h: (h[0].get("priority", 0), len(h[1])), reverse=True)
    return hits[: config.get("max_skills", 3)]


def main():
    try:
        payload = json.load(sys.stdin)
        prompt = payload.get("prompt", "")
        if not prompt or prompt.lstrip().startswith("/"):
            return
        hits = match(prompt, load_routes())
    except Exception:
        return
    if not hits:
        return

    lines = [
        "[자동 스킬 라우팅] 사용자는 슬래시 명령 없이 스킬이 자동 적용되기를 원한다.",
        "답변·작업 전에 아래 스킬을 우선순위 순서로 Skill 도구로 로드하고 그 지침을 따를 것.",
        "매칭이 맥락상 명백히 무관하면 건너뛰되, 건너뛴 이유를 내부적으로 판단할 것.",
    ]
    for i, (route, matched) in enumerate(hits, 1):
        lines.append(f"{i}. {route['skill']}  (매칭: {', '.join(matched[:4])})")

    print(json.dumps({
        "hookSpecificOutput": {
            "hookEventName": "UserPromptSubmit",
            "additionalContext": "\n".join(lines),
        }
    }, ensure_ascii=False))


if __name__ == "__main__":
    main()
