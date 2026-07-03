import re


def normalize_text(value: str) -> list[str]:
    return re.findall(r"[a-z0-9]+", value.lower())


def compute_relevancy_score(base_keyword: str, keyword: str) -> float:
    base_tokens = normalize_text(base_keyword)
    keyword_tokens = normalize_text(keyword)
    if not keyword_tokens:
        return 0.0

    matches = sum(1 for token in keyword_tokens if token in base_tokens)
    ratio = matches / len(keyword_tokens)
    return float(ratio * 100)
